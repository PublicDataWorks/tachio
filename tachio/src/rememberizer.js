const { supabase } = require('./supabaseclient')
const { PROJECT_TABLE_NAME } = require('./constants')
const { getPromptsFromSupabase, createChatCompletion } = require('../helpers')
const { sendMissiveResponse } = require('./missive')
const logger = require('./logger.js')('rememberizer');

const RETRIEVE_DOCUMENTS_URL = 'https://api.rememberizer.ai/api/v1/documents?integration_type=slack&page_size=1000'
const TIME_REGEX = /\[ time ] (.*?) \[ message ]/

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
    .catch(error => logger.error(error.message))
}

const retrieveSlackContent = async (apiKey, projectName, conversationId) => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  const startDate = Math.floor(twentyFourHoursAgo.getTime() / 1000);
  const endDate = Math.floor(now.getTime() / 1000);

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
        .gte('created_at', twentyFourHoursAgo.toISOString())
        .lte('created_at', now.toISOString())
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
    await sendMissiveResponse({
      message: completion,
      conversationId,
      notificationTitle: `Summary of the response from rememberizer for the ${projectName} project`,
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
    const response = await fetch(`https://api.rememberizer.ai/api/v1/documents/${documentId}/contents?start_chunk=${startChunk}&from=${startDate}&to=${endDate}`, {
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
    // e.g. data = <s> [ user ] a [ time ] 2024 - 03 - 18 04 : 34 : 34 : 275879 [ message ] a has joined the channel </s>
    // <s> [ user ] b [ time ] 2024 - 03 - 18 04 : 34 : 42 : 143039 [ message ] b has joined the channel </s>
    const items = data.content.split(/<\/s>\s*<s>/)
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

  const documentIds = data.results.map(document => ({ id: document.id, name: document.name }))
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
  const timeMatch = text.match(TIME_REGEX); // e.g. <s> [ time ] 2024 - 03 - 18 04 : 34 : 34 : 275879 [ message ] or <s> [ time ] 2024-03-18 04:34:34:275879 [ message ]
  if (!timeMatch) {
    logger.error(`Time string not found in the text ${text}`);
    return null;
  }

  const timeString = timeMatch[1].trim();
  let formattedText = timeString.replace(/ - /g, '-').replace(/ : /g, ':').replace(/ /g, 'T');
  const millisMatch = formattedText.match(/:(\d{6})$/);
  if (millisMatch) {
    formattedText = formattedText.replace(/:(\d{6})$/, `.${millisMatch[1].slice(0, 3)}`);
  }

  if (!formattedText.endsWith('Z')) {
    formattedText += 'Z';
  }
  const date = new Date(formattedText);
  if (isNaN(date.getTime())) {
    logger.error(`Invalid date format ${formattedText}`);
    return null;
  }
  return date;
}

module.exports = {
  crawlSlack
}
