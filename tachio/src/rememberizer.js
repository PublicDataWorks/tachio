const { supabase } = require('./supabaseclient')
const logger = require('./logger.js')('rememberizer');

const RETRIEVE_DOCUMENTS_URL = 'https://api.rememberizer.ai/api/v1/documents?integration_type=slack&page_size=1000'
const TIME_REGEX = /\[ time ] (.*?) \[ message ]/

const retrieveSlackContent = async () => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  const startDate = Math.floor(twentyFourHoursAgo.getTime() / 1000);
  const endDate = Math.floor(now.getTime() / 1000);

  const ids = await retrieveSlackIds();
  const content = []
  while (ids.length > 0) {
    const promises = []
    for (let i = 0; i < 10; i++) {
      const documentId = ids.pop()
      const { data, error } = await supabase
        .from('slack_messages')
        .select('id')
        .eq('rememberizer_document_id', documentId)
        .gte('created_at', twentyFourHoursAgo.toISOString())
        .lte('created_at', now.toISOString())
        .limit(1)
      if (data && data.length > 0) {
        logger.info(`DocumentId: ${documentId} already exists in the database. Skipping...`)
        continue
      }
      if (documentId) promises.push(retrieveSlackContentByDocumentId(documentId, startDate, endDate))
    }
    await Promise.all(promises).catch((error) => logger.error(error.message))
  }
  return content
}

const retrieveSlackContentByDocumentId = async (documentId, startDate, endDate) => {
  logger.info(`Retrieving content for documentId: ${documentId}`)
  let startChunk = 0
  do {
    const response = await fetch(`https://api.rememberizer.ai/api/v1/documents/${documentId}/contents?start_chunk=${startChunk}&from=${startDate}&to=${endDate}`, {
      method: 'GET',
      headers: {
        'X-API-Key': process.env.REMEMBERIZER_API_KEY
      }
    });
    const data = await response.json();
    if (!response.ok) {
      logger.error(`Failed to retrieve slack content for documentId: ${documentId}. Status: ${response.status}, chunk ${startChunk}`)
      return
    }

    const items = data.content.split(/<\/s>\s*<s>/)
      .filter(item => item.trim() !== '')
      .map(item => {
        const cleaned = item.trim().replace('<s>', '').replace('</s>', '')
        return {
          message: cleaned,
          rememberizer_document_id: documentId,
          sent_at: parseDateString(cleaned)
        }
      })
    if (items.length > 0) {
      const { error } = await supabase
        .from('slack_messages')
        .insert(items)
      if (error) logger.error(`Failed to insert content for documentId: ${documentId}. Error: ${error.message}, data: ${JSON.stringify(items).substring(0, 100)}`)
    }
    startChunk = (data.end_chunk && data.end_chunk >= startChunk) ? data.end_chunk + 1 : -1
  } while (startChunk >= 0)

}

const retrieveSlackIds = async () => {
  const response = await fetch(`${RETRIEVE_DOCUMENTS_URL}&page=1`, {
    method: 'GET',
    headers: {
      'X-API-Key': process.env.REMEMBERIZER_API_KEY
    }
  });
  const data = await response.json();
  if (!response.ok) {
    logger.error(`Failed to retrieve documents from Rememberizer. Status: ${response.status}, data ${JSON.stringify(data)}`)
    return []
  }

  const documentIds = data.results.map(document => document.id);
  const count = data.count
  // maximum page_size
  if (count > 1000) {
    const pages = Math.ceil(count / 1000);
    const promises = []
    for (let i = 2; i <= pages; i++) {
      promises.push(retrieveSlackIdsByPage(i));
    }
    await Promise.all(promises).then(results => {
      results.forEach(documentIdsByPage => {
        documentIds.push(...documentIdsByPage);
      });
    });
  }
  return [...new Set(documentIds)];
}

const retrieveSlackIdsByPage = async (page = 1) => {
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

  return data.results.map(document => document.id);
}

const parseDateString = (text) => {
  const timeMatch = text.match(TIME_REGEX); // e.g. <s> [ time ] 2024 - 03 - 18 04 : 34 : 34 : 275879 [ message ]
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
  retrieveSlackContent
}
