const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const dotenv = require('dotenv');
dotenv.config();
const { webPageToText, webpageToHTML } = require('./web.js'); // Adjust the path as necessary
const { destructureArgs, createChatCompletion, getPromptsFromSupabase, getConfigFromSupabase } = require('../helpers');
const {
  storeUserMemory,
  hasMemoryOfResource,
  deleteMemoriesOfResource,
  getResourceMemories
} = require('../src/remember');
const logger = require('../src/logger.js')('ingest-capability');
const { convert } = require('html-to-text');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MEMORY_TYPE = 'capability-read'
const cacheDir = path.join(__dirname, 'cache');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

async function handleCapabilityMethod(method, args) {
  const [arg1, arg2] = destructureArgs(args);

  if (method === 'read') {
    return await read(arg1, arg2);
  } else {
    throw new Error(`Method ${method} not supported by this capability.`);
  }
}

/**
 * @async
 * @function read
 * @param {string} url - The arguments object that contains the URL or the text of the document to be ingested
 * @param {string} conversationId - The conversation ID to associate with the memory
 * @returns {Promise<string>} - The meta-summary of the document
 *
 */
async function read(url, conversationId) {
  // For testing:
  // node capability-player.js --runCapability="ingest:read(https://docs.pdw.co/tachio-overview)"
  const { PROMPT_DEEP_INGEST } = await getPromptsFromSupabase();
  const { TOKEN_LIMIT } = await getConfigFromSupabase();

  // Generate a hash for the URL to use as a cache identifier
  const urlHash = crypto.createHash('md5').update(url).digest('hex');
  const cacheFilePath = path.join(cacheDir, `${urlHash}.json`);

  // Check if cache exists and is recent (e.g., less than 1 hour old)
  let cachedData = null;
  if (
    fs.existsSync(cacheFilePath) &&
    Date.now() - fs.statSync(cacheFilePath).mtimeMs < 3600000
  ) {
    logger.log('Using cached data');
    cachedData = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
  }

  try {
    const { html } = await webpageToHTML(url);
    const document = convert(html.substring(0, TOKEN_LIMIT), {
      wordwrap: 130
    });
    // check if we have memories about this URL *already*
    const hasMemory = await hasMemoryOfResource(
      url
    );

    // if we DO have memories, delete them
    if (hasMemory) {
      // get the date of the previous ingest from created_at
      const resourceMemories = await getResourceMemories(url, 1);
      const prevImportDate = resourceMemories[0].created_at;


      // delete all the memories about this URL
      const memoryDeleteResult = await deleteMemoriesOfResource(url);
      logger.info(memoryDeleteResult);

      // make a new memory that the document was re-ingested
      const updateMessage = `We previously ingested this document on ${prevImportDate}. We re-ingested it at ${new Date().toISOString()} and removed our previous memories.`;
      await storeUserMemory(
        { username: MEMORY_TYPE, guild: '', conversationId },
        updateMessage,
        MEMORY_TYPE,
        url
      );

    }

    const messages = [
      {
        role: 'user',
        content: `Can you please write an extremely long and thorough reiteration of the following document:
${JSON.stringify(document, null, 2)}

${PROMPT_DEEP_INGEST}

Make separate sections of facts for each section of the document, using \`\`\`---\`\`\` between each section. Respond immediately, beginning with the first section, no introductions or confirmation.`
      }
    ];
    const completion = await createChatCompletion(messages, {
      max_tokens: 4000
    });

    const facts = completion.split('\n---\n');

    facts.forEach(async (fact, index) => {
      const factAsMemory = `Memory about RESOURCE_ID: ${url}\n${fact}
(${index + 1}/${facts.length})
      `;
      await storeUserMemory(
        { username: MEMORY_TYPE, guild: '' },
        factAsMemory,
        MEMORY_TYPE,
        url
      );
    });

    const metaSummaryMessages = [
      {
        role: 'user',
        content: `Can you please provide a high-level summary of the most important facts in this document:
  ${JSON.stringify(document, null, 2)}`
      }
    ];

    const metaSummaryCompletion = await createChatCompletion(metaSummaryMessages, {
      max_tokens: 2000
    });

    await storeUserMemory(
      { username: MEMORY_TYPE, guild: '' },
      metaSummaryCompletion,
      MEMORY_TYPE,
      url
    );

    // Cache the current document for future reference
    fs.writeFileSync(cacheFilePath, JSON.stringify({ document, facts, metaSummary: metaSummaryCompletion }), 'utf8');

    return `Document ingested successfully. The facts are as follows: \n${facts.join('\n')} from the ${url}.`;
  } catch (error) {
    logger.error(`Error occurred while making external request: ${error}`);
    throw error
  }
}

module.exports = {
  handleCapabilityMethod,
  INGEST_MEMORY_TYPE: MEMORY_TYPE
};
