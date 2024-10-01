const { supabase } = require('./supabaseclient')
const { PROJECT_TABLE_NAME } = require('./constants')
const { getPromptsFromSupabase, createChatCompletion } = require('../helpers')
const { sendMissiveResponse } = require('./missive')
const logger = require('./logger.js')('rememberizer');
const { storeUserMessage } = require('./remember');

const RETRIEVE_DOCUMENTS_URL = 'https://api.rememberizer.ai/api/v1/documents?integration_type=slack&page_size=1000'

const crawlSlack = async () => {
  const { data, error } = await supabase
    .from(PROJECT_TABLE_NAME)
    .select('rememberizer_key, name, missive_conversation_id')
    .not('rememberizer_key', 'is', null)
  if (error) {
    logger.error('Failed to retrieve projects with Rememberizer key')
    return
  }
  await Promise
    .all(data.map(project => retrieveSlackContent(project.rememberizer_key, project.name, project.missive_conversation_id)))
    .catch(error => logger.error(error.stack))
}

const retrieveSlackContent = async (apiKey, projectName, conversationId) => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));

  // Convert to ISO 8601 format
  const startDate = twentyFourHoursAgo.toISOString().slice(0, 19) + 'Z';
  const endDate = now.toISOString().slice(0, 19) + 'Z';

  console.log('Start Date:', startDate);
  console.log('End Date:', endDate);

  const ids = await retrieveSlackIds(apiKey); // each id is a slack channel
  const content = []
  while (ids.length > 0) {
    const promises = []
    for (let i = 0; i < 10; i++) {
      const document = ids.pop();
      if (!document) break;
      const { id: documentId, name: documentName } = document;
      const { data } = await supabase
        .from('slack_messages')
        .select('id')
        .eq('rememberizer_document_id', documentId)
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .limit(1)
      if (data && data.length > 0) {
        logger.info(`DocumentId: ${documentId} ${documentName} already exists in the database. Skipping...`)
        continue
      }
      if (documentId) promises.push(retrieveSlackContentByDocumentId(apiKey, documentId, documentName, startDate, endDate))
    }
    await Promise.all(promises).then(results => content.push(...results.flat())).catch(error => logger.error(error.message))
  }
  if (content.length > 0) {
    const { REMEMBERIZER_TEMPLATE } = await getPromptsFromSupabase();
    const messages = [
      {
        role: 'user',
        content: REMEMBERIZER_TEMPLATE
      },
      {
        role: 'user',
        content: `Here are Slack messages for the ${projectName} project in the last 24 hours:\n${JSON.stringify(content)}`
      }
    ]
    const completion = await createChatCompletion(messages)
    logger.info(`Text completion for the ${projectName} project:\n${completion}`)

    const storedMessageId = await storeUserMessage(
      { username: 'rememberizer', conversationId, guild: 'missive', response: completion },
      JSON.stringify(content)
    );

    logger.info(`Stored Message ID: ${storedMessageId}`);

    await sendMissiveResponse({
      message: completion,
      conversationId,
      notificationTitle: `Daily slack summary for ${projectName}`,
      organization: process.env.MISSIVE_ORGANIZATION,
      addSharedLabels: [process.env.MISSIVE_SHARED_LABEL],
      addToInbox: true
    })
  }
  return content
}

const retrieveSlackContentByDocumentId = async (apiKey, documentId, documentName, startDate, endDate) => {
  logger.info(`Retrieving content for documentId: ${documentId}`)
  const processedMessages = []
  let startChunk = 0
  do {
    const response = await fetch(`https://api.rememberizer.ai/api/v1/discussions/${documentId}/contents/?integration_type=slack&start_chunk=${startChunk}&from=${startDate}&to=${endDate}`, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey
      }
    });
    const data = await response.json();
    if (!response.ok) {
      logger.error(`Failed to retrieve slack content for documentId: ${documentId}. Status: ${response.status}, chunk ${startChunk}`)
      return
    }
    // e.g. data = <s>User: abc, Time: 2023-09-26 01:58:45:727359, Message: So if you want to sign in with email &amp; password, please reset your password following</s>
    const items = data.discussion_content.split(/<\/s>\s*<s>/)
      .filter(item => item.trim() !== '')
      .map(item => {
        const cleaned = item.trim().replace('<s>', '').replace('</s>', '')
        return {
          message: cleaned,
          rememberizer_document_id: documentId,
          sent_at: parseDateString(cleaned),
          channel_name: documentName
        }
      })
    if (items.length > 0) {
      const { error } = await supabase
        .from('slack_messages')
        .insert(items)
      if (error) {
        logger.error(`Failed to insert content for documentId: ${documentId}. Error: ${error.message}, data: ${JSON.stringify(items).substring(0, 100)}`)
      } else {
        processedMessages.push(...items.map(item => item.message))
      }
    }
    startChunk = (data.end_chunk && data.end_chunk >= startChunk) ? data.end_chunk + 1 : -1
  } while (startChunk >= 0)
  return processedMessages
}

const retrieveSlackIds = async (apiKey) => {
  const response = await fetch(`${RETRIEVE_DOCUMENTS_URL}&page=1`, {
    method: 'GET',
    headers: {
      'X-API-Key': apiKey
    }
  });
  const data = await response.json();
  if (!response.ok) {
    logger.error(`Failed to retrieve documents from Rememberizer. Status: ${response.status}, data ${JSON.stringify(data)}`)
    return []
  }
  const documentIds = data.results.map(document => ({ id: document.pk, name: document.name }))
  const count = data.count
  // maximum page_size
  if (count > 1000) {
    const pages = Math.ceil(count / 1000);
    const promises = []
    for (let i = 2; i <= pages; i++) {
      promises.push(retrieveSlackIdsByPage(apiKey, i));
    }
    await Promise.all(promises).then(results => {
      results.forEach(documentIdsByPage => {
        documentIds.push(...documentIdsByPage);
      });
    });
  }
  return [...new Set(documentIds)];
}

const retrieveSlackIdsByPage = async (apiKey, page = 1) => {
  const response = await fetch(`${RETRIEVE_DOCUMENTS_URL}&page=${page}`, {
    method: 'GET',
    headers: {
      'X-API-Key': process.env.REMEMBERIZER_API_KEY
    }
  });
  const data = await response.json();
  if (!response.ok) {
    logger.error(`Failed to retrieve documents from page ${page}. Status: ${response.status}, data ${JSON.stringify(data)}`)
    return []
  }
  return data.results.map(document => ({ id: document.id, name: document.name }));
}

const parseDateString = (text) => {
  const match = text.match(/Time: (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}):(\d{6})/);
  if (match) {
    const [, dateTime, microseconds] = match;
    const ms = Math.floor(parseInt(microseconds) / 1000);
    return `${dateTime}.${ms.toString().padStart(3, '0')}Z`;
  }
  return null;
}

module.exports = {
  crawlSlack
}
