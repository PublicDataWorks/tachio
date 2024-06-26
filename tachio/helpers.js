const { Chance } = require("chance");
const chance = new Chance();
const dotenv = require("dotenv");
const fs = require("fs");
const convert = require("xml-js");
const { openai } = require("./src/openai");
dotenv.config();
const { encode } = require("@nem035/gpt-3-encoder");
// TODO: Swap out for getConfigFromSupabase
const { TOKEN_LIMIT } = require("./config");
const {
  getUserMemory,
  getUserMessageHistory,
  getAllMemories,
  getRelevantMemories
} = require("./src/remember.js");
const logger = require("./src/logger.js")("helpers");

const completionLogger = process.env.COMPLETION_LOGGING_DISABLED
  ? {
    info: () => {
    },
    error: () => {
    }
  }
  : require("./src/logger.js")("completion");

const { supabase } = require("./src/supabaseclient.js");
const Anthropic = require("@anthropic-ai/sdk");
const anthropic = new Anthropic();

const capabilityRegex = /(\w+):(\w+)\(([^]*?)\)/; // captures newlines in the third argument
const toolUseCapabilityRegex = /(toolu_[a-zA-Z0-9_-]{1,64})-(\w+)-(\w+)\(([^]*?)\)/;
const notificationRegex = /<notification>(.*?)<\/notification>/s;

const TODO_TABLE_NAME = 'issues'

/**
 * Retrieves prompts from Supabase.
 * @returns {Promise<Object>} An object containing different prompts.
 * @example {
 *  PROMPT_REMEMBER: "In order to remember, you must first forget.",
 *  PROMPT_CAPABILITY_REMEMBER: "I remember that I can",
 *
 */
async function getPromptsFromSupabase() {
  const { data: promptArray } = await supabase.from("prompts").select()
  const promptKeys = promptArray.map((prompt) => prompt.prompt_name);
  const promptValues = promptArray.map((prompt) => prompt.prompt_text);
  // return an object with all the keys and values
  return Object.fromEntries(
    promptKeys.map((_, i) => [promptKeys[i], promptValues[i]])
  );
}

/**
 * Retrieves configuration data from Supabase.
 * @returns {Promise<Object>} An object containing the configuration keys and values.
 */
async function getConfigFromSupabase() {
  const { data, error } = await supabase.from("config").select("config_key, config_value");

  // turn the array of objects into a big object that can be destructured
  const configArray = data;
  // get all the keys and values
  const configKeys = configArray.map((config) => config.config_key);
  const configValues = configArray.map((config) => config.config_value);
  // return an object with all the keys and values
  return Object.fromEntries(
    configKeys.map((_, i) => [configKeys[i], configValues[i]])
  );
}

/**
 * Counts the number of tokens in a string.
 * @param {object} str - The string to count the tokens in.
 * @returns {number} - The number of tokens in the string.
 */
function countTokens(str) {
  const encodedMessage = encode(JSON.stringify(str));
  return encodedMessage.length;
}

/**
 * Counts the number of tokens in an array of messages.
 * @param {Array} messageArray - The array of messages to count the tokens in.
 * @returns {number} - The number of tokens in the array of messages.
 */
function countTokensInMessageArray(messageArray = []) {
  let totalTokens = 0;
  if (!messageArray || messageArray.length === 0) {
    return totalTokens;
  }
  return countTokensInArray(messageArray);
}

/**
 * Counts the number of tokens in an array of messages.
 * @param {Array} messageArray - The array of messages to count the tokens in.
 * @returns {number} - The number of tokens in the array of messages.
 */
function countTokensInArray(messageArray) {
  let totalTokens = 0;
  for (let i = 0; i < messageArray.length; i++) {
    totalTokens += countTokensInMessage(messageArray[i]);
  }
  return totalTokens;
}

/**
 * Counts the number of tokens in a message.
 * @param {object} message - The message to count the tokens in.
 * @returns {number} - The number of tokens in the message.
 */
function countTokensInMessage(message) {
  const encodedMessage = encode(JSON.stringify(message));
  return encodedMessage.length;
}

/**
 * Removes a mention from a message.
 * @param {string} message - The message to remove the mention from.
 * @param {string} mention - The mention to remove.
 * @returns {string} - The message with the mention removed.
 */
function removeMentionFromMessage(message, mention) {
  const mentionRegex = new RegExp(`<@${mention}>`, "g"); // Modify the regular expression to include the <@> section
  return message.replace(mentionRegex, "").trim();
}

/**
 * Generates a hexagram.
 * @returns {string} - The generated hexagram.
 */
function generateHexagram() {
  const hexagramNumber = chance.integer({ min: 1, max: 64 });
  return `${hexagramNumber}. ${getHexName(hexagramNumber)}`;
}

/**
 * Gets the name of a hexagram.
 * @param {number} hexagramNumber - The number of the hexagram.
 * @returns {string} - The name of the hexagram.
 */
function getHexName(hexagramNumber) {
  const hexNameMap = getHexNameMap();
  return hexNameMap[hexagramNumber];
}

/**
 * Gets a map of hexagram numbers to names.
 * @returns {object} - The map of hexagram numbers to names.
 */
function getHexNameMap() {
  return {
    1: "The Creative",
    2: "The Receptive",
    3: "Difficulty at the Beginning",
    4: "Youthful Folly",
    5: "Waiting",
    6: "Conflict",
    7: "The Army",
    8: "Holding Together",
    9: "The Taming Power of the Small",
    10: "Treading",
    11: "Peace",
    12: "Standstill",
    13: "Fellowship with Men",
    14: "Possession in Great Measure",
    15: "Modesty",
    16: "Enthusiasm",
    17: "Following",
    18: "Work on What Has Been Spoiled",
    19: "Approach",
    20: "Contemplation",
    21: "Biting Through",
    22: "Grace",
    23: "Splitting Apart",
    24: "Return",
    25: "Innocence",
    26: "The Taming Power of the Great",
    27: "The Corners of the Mouth",
    28: "Preponderance of the Great",
    29: "The Abysmal",
    30: "The Clinging",
    31: "Influence",
    32: "Duration",
    33: "Retreat",
    34: "The Power of the Great",
    35: "Progress",
    36: "Darkening of the Light",
    37: "The Family",
    38: "Opposition",
    39: "Obstruction",
    40: "Deliverance",
    41: "Decrease",
    42: "Increase",
    43: "Breakthrough",
    44: "Coming to Meet",
    45: "Gathering Together",
    46: "Pushing Upward",
    47: "Oppression",
    48: "The Well",
    49: "Revolution",
    50: "The Cauldron",
    51: "The Arousing (Shock, Thunder)",
    52: "Keeping Still (Mountain)",
    53: "Development (Gradual Progress)",
    54: "The Marrying Maiden",
    55: "Abundance (Fullness)",
    56: "The Wanderer",
    57: "The Gentle (Wind)",
    58: "The Joyous (Lake)",
    59: "Dispersion (Dissolution)",
    60: "Limitation",
    61: "Inner Truth",
    62: "Preponderance of the Small",
    63: "After Completion",
    64: "Before Completion"
  };
}

/**
 * Checks if a message contains a capability.
 * @param {string} message - The message to check.
 * @returns {boolean} - True if the message contains a capability, false otherwise.
 */
function doesMessageContainCapability(message) {
  return !!(message?.match(capabilityRegex) || message?.match(toolUseCapabilityRegex));
}

/**
 * Finds the last message in the array with the user role.
 *
 * @param {Array} messagesArray - The array of messages.
 * @returns {string} - The last message with the user role.
 */
function lastUserMessage(messagesArray) {
  // find the last message in the array with the user role
  // return that message
  const userMessages = messagesArray.filter((message) => {
    return message.role === "user";
  });

  return userMessages[userMessages.length - 1].content;
}

/**
 * Checks if a message is breaking the message chain.
 * @param {string} capabilityMatch - The capability match.
 * @param {object} lastMessage - The last message.
 * @returns {boolean} - True if the message is breaking the chain, false otherwise.
 */
function isBreakingMessageChain(capabilityMatch, lastMessage) {
  return (
    !capabilityMatch &&
    lastMessage.role !== "user" &&
    lastMessage.role !== "system"
  );
}

/**
 * Trims a response if it exceeds the limit.
 * @param {string} capabilityResponse - The response to trim.
 * @returns {string} - The trimmed response.
 */
// function trimResponseIfNeeded(capabilityResponse) {
//   while (isResponseExceedingLimit(capabilityResponse)) {
//     capabilityResponse = trimResponseByLineCount(
//       capabilityResponse,
//       countTokens(capabilityResponse),
//     );
//   }
//   return capabilityResponse;
// }

/**
 * Generates parameters for AI completion.
 * @returns {object} - The generated parameters.
 */
function generateAiCompletionParams() {
  return {
    temperature: generateTemperature(),
    presence_penalty: generatePresencePenalty(),
    frequency_penalty: generateFrequencyPenalty()
  };
}

/**
 * Generates a temperature value.
 * @returns {number} - The generated temperature value.
 */
function generateTemperature() {
  return chance.floating({ min: 0.88, max: 1.2 });
}

/**
 * Generates a presence penalty value.
 * @returns {number} - The generated presence penalty value.
 */
function generatePresencePenalty() {
  return chance.floating({ min: -0.05, max: 0.1 });
}

/**
 * Generates a frequency penalty value.
 * @returns {number} - The generated frequency penalty value.
 */
function generateFrequencyPenalty() {
  return chance.floating({ min: 0.0, max: 0.1 });
}

/**
 * Trims a message chain until it's under max tokens.
 * @param {Array} messages - The message chain to trim.
 * @param {number} maxTokens - The maximum number of tokens.
 * @returns {Array} - The trimmed message chain.
 */
function trimMessageChain(messages, maxTokens = 10000) {
  while (isMessageChainExceedingLimit(messages, maxTokens)) {
    messages = trimMessages(messages);
  }
  logger.info("Message chain trimmed.");
  return messages;
}

/**
 * Checks if a message chain exceeds the limit.
 * @param {Array} messages - The message chain to check.
 * @param {number} maxTokens - The maximum number of tokens.
 * @returns {boolean} - True if the message chain exceeds the limit, false otherwise.
 */
function isMessageChainExceedingLimit(messages, maxTokens) {
  return countTokensInMessageArray(messages) > maxTokens;
}

/**
 * Trims messages.
 * @param {Array} messages - The messages to trim.
 * @returns {Array} - The trimmed messages.
 */
function trimMessages(messages) {
  const messageToRemove = selectRandomMessage(messages);
  const trimmedMessageContent = trimMessageContent(messageToRemove);
  messageToRemove.content = trimmedMessageContent;
  if (isMessageEmpty(messageToRemove)) {
    messages = removeEmptyMessage(messages, messageToRemove);
  }
  if (isMessagesEmpty(messages)) {
    return logger.warn("All messages are empty.");
  }
  return messages;
}

/**
 * Selects a random message.
 * @param {Array} messages - The messages to select from.
 * @returns {object} - The selected message.
 */
function selectRandomMessage(messages) {
  return chance.pickone(messages);
}

/**
 * Trims the content of a message.
 * @param {object} message - The message to trim the content of.
 * @returns {string} - The trimmed content.
 */
function trimMessageContent(message) {
  return message.content.slice(0, message.content.length / 2);
}

/**
 * Checks if a message is empty.
 * @param {object} message - The message to check.
 * @returns {boolean} - True if the message is empty, false otherwise.
 */
function isMessageEmpty(message) {
  return message.content.length === 0;
}

/**
 * Removes an empty message.
 * @param {Array} messages - The messages to remove the empty message from.
 * @param {object} messageToRemove - The empty message to remove.
 * @returns {Array} - The messages with the empty message removed.
 */
function removeEmptyMessage(messages, messageToRemove) {
  return messages.filter((message) => {
    return message !== messageToRemove;
  });
}

/**
 * Checks if messages are empty.
 * @param {Array} messages - The messages to check.
 * @returns {boolean} - True if the messages are empty, false otherwise.
 */
function isMessagesEmpty(messages) {
  return messages.length === 0;
}

/**
 * Trims a response by a certain percentage.
 * @param {array} response - The response to trim.
 * @param {number} trimAmount - The percentage to trim by.
 * @returns {array} - The trimmed response.
 */
function trimResponseByLineCount(response, trimAmount = 0.1) {
  const lineCount = response.length;
  const linesToRemove = calculateLinesToRemove(lineCount, trimAmount);
  const randomLines = selectRandomLines(response, linesToRemove);
  return removeRandomLines(response, randomLines);
}

// /**
//  * Splits a response into lines.
//  * @param {string} response - The response to split.
//  * @returns {Array} - The lines of the response.
//  */
// function splitResponseIntoLines(response) {
//   const parsed = JSON.parse(response)
//   if (Array.isArray(parsed)) {
//     return parsed;
//   }
//   return response.split("\n");
// }

/**
 * Calculates the number of lines to remove.
 * @param {number} lineCount - The number of lines in the response.
 * @param {number} trimAmount - The percentage to trim by.
 * @returns {number} - The number of lines to remove.
 */
function calculateLinesToRemove(lineCount, trimAmount) {
  return Math.floor(lineCount * trimAmount);
}

/**
 * Selects random lines from a response.
 * @param {Array} lines - The lines of the response.
 * @param {number} linesToRemove - The number of lines to remove.
 * @returns {Array} - The selected lines.
 */
function selectRandomLines(lines, linesToRemove) {
  return chance.pickset(lines, linesToRemove);
}

/**
 * Removes random lines from an array of lines.
 * @param {string[]} lines - The array of lines.
 * @param {string[]} randomLines - The array of random lines to be removed.
 * @returns {string[]} - The filtered array of lines.
 */
function removeRandomLines(lines, randomLines) {
  return lines.filter((line) => {
    return !randomLines.includes(line);
  });
}

/**
 * Joins an array of trimmed lines into a single string response.
 *
 * @param {string[]} trimmedLines - The array of trimmed lines to join.
 * @returns {string} The joined string response.
 */
function joinLinesIntoResponse(trimmedLines) {
  return trimmedLines.join("\n");
}

/**
 * Displays a typing indicator for the given message.
 * @param {string} message - The message to display the typing indicator for.
 * @returns {number} - The interval ID for the typing indicator.
 */
function displayTypingIndicator(message) {
  startTypingIndicator(message);
  const typingInterval = setTypingInterval(message);
  return typingInterval; // To allow for clearing the interval outside of this function
}

/**
 * Starts the typing indicator in the specified message's channel.
 * @param {Message} message - The message object.
 */
function startTypingIndicator(message) {
  message.channel.sendTyping();
}

/**
 * Sets an interval to send typing indicator in a channel.
 * @param {Message} message - The message object.
 * @returns {number} - The ID of the interval.
 */
function setTypingInterval(message) {
  return setInterval(() => message.channel.sendTyping(), 5000);
}

/**
 * Generates an AI completion based on the given prompt, username, messages, and config.
 * @param {string} prompt - The prompt for the AI completion.
 * @param {string} username - The username associated with the AI completion.
 * @param {Array} messages - The array of messages.
 * @param {Object} config - The configuration object containing temperature and presence_penalty.
 * @returns {Promise<{ messages: Array<Object>, aiResponse: string | null }>} - An object containing the updated messages array and the AI response.
 */
async function generateAiCompletion(prompt, username, messages, config) {
  let { temperature, presence_penalty, max_tokens } = config;
  if (!temperature) temperature = 1;
  if (!presence_penalty) presence_penalty = 0;
  if (!max_tokens) max_tokens = 800;


  // if the last message has .image, delete it that property off it
  if (messages[messages.length - 1].image) {
    delete messages[messages.length - 1].image;
  }

  logger.info(`🤖 Generating AI completion for <${username}> ${prompt}`);
  logger.info(`${messages.length} messages`);

  messages = await addPreambleToMessages(username, messages);
  let completion = null;

  // remove any messages that do not have values
  messages = messages.filter((message) => message.content);

  try {
    logger.info(`🔧 Chat completion parameters:
    - Temperature: ${temperature}
    - Presence Penalty: ${presence_penalty}`);
    logger.info("🔧 Messages:");
    logger.info(`Creating chat completion with ${messages.length} messages`);

    completion = await createChatCompletion(
      messages,
      {
        temperature,
        presence_penalty,
        max_tokens
      }
    );
    logger.info(`🔧 Chat completion created:\n- Completion: ${completion}`);
  } catch (err) {
    logger.info(`Error creating chat completion ${err}`);
  }

  const aiResponse = completion; //.choices[0].message.content;

  logger.info("🔧 AI Response: " + aiResponse);
  completionLogger.info("🔧 AI Response: " + aiResponse);
  messages.push(aiResponse);
  return { messages, aiResponse };
}

/**
 * Creates a chat completion using the specified messages, temperature, and presence penalty.
 * @param {Array} messages - The array of messages in the chat.
 * @param {number} temperature - The temperature value for generating diverse completions.
 * @param {number} presence_penalty - The presence penalty value for controlling response length.
 * @returns {Promise} - A promise that resolves to the chat completion result.
 */
async function createChatCompletion(
  messages,
  config = {}
) {
  const defaultConfig = {
    temperature: 0.5,
    presence_penalty: 0,
    max_tokens: 800
  };

  config = Object.assign({}, defaultConfig, config);
  // look through the messages and make sure they all have a content property
  // and console.error if they don't
  messages.forEach((message) => {
    if (!message.content) {
      logger.error(`Message is missing content: ${JSON.stringify(message)}`);
    }
  });

  const {
    CHAT_MODEL,
    OPENAI_COMPLETION_MODEL
  } = await getConfigFromSupabase();
  const completionModel = CHAT_MODEL || "openai";
  logger.info(`createChatCompletion Config: ${JSON.stringify(config, null, 2)}`);

  if (completionModel === "openai") {
    logger.info(
      `Using OpenAI for chat completion\nModel: ${OPENAI_COMPLETION_MODEL}\nTemperature: ${config.temperature}\nPresence Penalty: ${config.presence_penalty}\nMax Tokens: ${config.max_tokens}\nMessage Count: ${messages.length}`
    );

    try {
      logger.info(
        `Creating OpenAI chat completion with ${messages.length} messages`
      );
      const res = await openai.chat.completions.create({
        model: OPENAI_COMPLETION_MODEL,
        temperature: config.temperature,
        presence_penalty: config.presence_penalty,
        // max_tokens,
        max_tokens: config.max_tokens,
        messages
      });
      // OpenAI's responses contain the tokens used in the response, we should log that
      logger.log(JSON.stringify(res));
      const promptTokens = res.usage.prompt_tokens;
      const completionTokens = res.usage.completion_tokens;
      const totalTokens = res.usage.total_tokens;
      logger.info(
        `Completion used ${totalTokens} tokens (${promptTokens} prompt tokens, ${completionTokens} completion tokens)`
      );

      if (res.choices && res.choices.length > 0) {
        const completion = res.choices[0].message.content;
        if (completion) {
          // If everything has gone properly, log the completion and return it
          logger.info(`Chat completion response: ${completion}`);
          return completion;
        } else {
          logger.info(
            `Chat completion response is missing content: ${JSON.stringify(
              res
            )}`
          );
          return null;
        }
      } else {
        logger.info(
          `Chat completion response is missing choices: ${JSON.stringify(res)}`
        );
        return null;
      }
    } catch (error) {
      logger.error("Error creating chat completion:", error.message);
      // return `Error creating chat completion: ${error}`;
      throw new Error(`Error creating chat completion: ${error.message}`);
    }
  } else if (completionModel === "claude") {
    const res = await createClaudeCompletion(messages, {
      temperature: config.temperature,
      max_tokens: +config.max_tokens
    });
    logger.log(`Claude response: ${JSON.stringify(res)}`);
    if (res.content.length > 1 && res.content[1].type === 'tool_use') {
      const toolUse = res.content[1];
      return `${toolUse.id}-${toolUse.name}(${JSON.stringify(toolUse.input)})`;
    }
    return res.content[0].text;
  }
}

async function createClaudeCompletion(messages, config) {
  const { CLAUDE_COMPLETION_MODEL } = await getConfigFromSupabase();
  // convert the messages into a xml format for claude, sent as a single well-formatted user message
  const xmlMessages = convertMessagesToXML(messages);
  // completionLogger.info(`xmlMessages: ${xmlMessages}`);
  const { data, error } = await supabase
    .from("config")
    .select("config_value")
    .match({ config_key: "MANIFEST" })
  if (error) throw new Error(error.message);

  return anthropic.beta.tools.messages.create({
    model: CLAUDE_COMPLETION_MODEL,
    max_tokens: config.max_tokens,
    tools: JSON.parse(data[0].config_value),
    messages: [{ role: "user", content: xmlMessages }]
  });
}

/**
 * Adds a preamble to an array of messages.
 * @param {string} username - The username.
 * @param {Array<Array<string>>} messages - The array of messages.
 * @returns {Promise<Array<string>>} - The array of messages with the preamble added.
 */
async function addPreambleToMessages(username, messages) {
  const preamble = await assembleMessagePreamble(username);
  return [...preamble, ...messages.flat()];
}

// const { listTodos } = require("./capabilities/todos.js")

/**
 * Assembles the message preamble for a given username.
 * @param {string} username - The username for which the message preamble is being assembled.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of messages representing the preamble.
 */
async function assembleMessagePreamble(username) {
  logger.info(`🔧 Assembling message preamble for <${username}> message`);
  const messages = [];
  addCurrentDateTime(messages);
  await addHexagramPrompt(messages);
  await addTodosToMessages(messages);
  await addUserMessages(username, messages);
  await addUserMemories(username, messages);
  // add memories relevant to the user's message
  await addRelevantMemories(username, messages);
  await addCapabilityPromptIntro(messages);
  await addCapabilityManifestMessage(messages);
  // add some general memories from all interactions
  await addGeneralMemories(messages);

  await addSystemPrompt(messages);
  return messages;
}

async function listTodos() {
  const { data, error } = await supabase.from(TODO_TABLE_NAME).select("*");

  if (error) throw new Error(error.message);
  return data;
}

async function addTodosToMessages(messages) {
  const todos = await listTodos();
  logger.info(`🔧 Adding todos to messages: ${todos.length}`);
  const todoString = JSON.stringify(todos);
  messages.push({
    role: "system",
    content: `Here are your todos:
${todoString}`
  });
}

/**
 * Adds the current date and time to the messages array.
 * @param {Array} messages - The array of messages.
 * @returns {void}
 */
function addCurrentDateTime(messages) {
  messages.push({
    role: "system",
    content: `Today is ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`
  });
}

/**
 * Adds a hexagram prompt to the messages array.
 * @param {Array} messages - The array of messages.
 * @returns {Promise<void>} - A promise that resolves when the hexagram prompt is added.
 */
async function addHexagramPrompt(messages) {
  if (chance.bool({ likelihood: 50 })) {
    const hexagram = generateHexagram();
    logger.info(`🔧 Adding hexagram prompt to message ${hexagram}`);
    const hexagramPrompt = `Let this hexagram from the I Ching guide this interaction: ${hexagram}`;
    messages.push({
      role: "system",
      content: hexagramPrompt
    });
  }
}

/**
 * Adds a system prompt to the given array of messages.
 * @param {Array} messages - The array of messages to add the system prompt to.
 */
async function addSystemPrompt(messages) {
  const { PROMPT_SYSTEM } = await getPromptsFromSupabase();
  messages.push({
    role: "user",
    content: PROMPT_SYSTEM
  });
}

/**
 * Adds a capability prompt introduction message to the given array of messages.
 * @param {Array} messages - The array of messages to add the capability prompt introduction to.
 */
async function addCapabilityPromptIntro(messages) {
  const { CAPABILITY_PROMPT_INTRO } = await getPromptsFromSupabase();

  messages.push({
    role: "user",
    content: CAPABILITY_PROMPT_INTRO
  });
}

/**
 * Loads the capability manifest from the specified file path.
 * @returns {Object|null} The capability manifest object, or null if an error occurred.
 */
function loadCapabilityManifest() {
  const manifestPath = "./capabilities/_manifest.json";
  try {
    const manifestData = fs.readFileSync(manifestPath, "utf8");
    return JSON.parse(manifestData);
  } catch (error) {
    logger.info("Error loading capability manifest:", error);
    return null;
  }
}

/**
 * Adds a capability manifest message to the given array of messages.
 * @param {Array} messages - The array of messages to add the capability manifest message to.
 * @returns {Promise<Array>} - The updated array of messages.
 */
async function addCapabilityManifestMessage(messages) {
  const { CHAT_MODEL } = await getConfigFromSupabase();
  const manifest = loadCapabilityManifest();

  if (CHAT_MODEL !== "claude" && manifest) {
    messages.push({
      role: "user",
      // content: `Capability manifest: ${JSON.stringify(manifest)}`,
      content: `## CAPABILITY MANIFEST\n\n${formatCapabilityManifest(
        manifest
      )}`
    });
  }
  return messages;
}

/**
 * Formats the capability manifest into a structured and readable format.
 * @param {Object} manifest - The capability manifest object.
 * @returns {string} - The capability manifest in a structured and readable format.
 */
function formatCapabilityManifest(manifest) {
  let formattedManifest = "";

  for (const category in manifest) {
    formattedManifest += `## ${category.toUpperCase()} CAPABILITIES\n\n`;

    for (const capability of manifest[category]) {
      formattedManifest += `### ${capability.name}\n`;
      formattedManifest += `${capability.description}\n\n`;

      if (capability.parameters) {
        formattedManifest += "**Parameters:**\n\n";
        for (const parameter of capability.parameters) {
          formattedManifest += `- **${parameter.name}**: ${parameter.description}\n`;
        }
        formattedManifest += "\n";
      }

      if (capability.examples) {
        formattedManifest += "**Examples:**\n\n";
        for (const example of capability.examples) {
          formattedManifest += `${example}\n\n`;
        }
        formattedManifest += "\n";
      }
    }

    formattedManifest += "---\n\n"; // Separator between categories
  }

  return formattedManifest;
}

function convertMessagesToXML(messages) {
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  const messagesObj = { messages: { message: messages } };
  const xml = convert.js2xml(messagesObj, options);
  return xml;
}

/**
 * Converts the capability manifest to XML format.
 * @param {Object} manifest - The capability manifest object.
 * @returns {string} - The capability manifest in XML format.
 */
function convertCapabilityManifestToXML(manifest) {
  const capabilitiesXml = Object.values(manifest)
    .flatMap((category) =>
      category.map((capability) => {
        const nameXml = `    <name>${capability.name}</name>\n`;
        const descriptionXml = capability.description
          ? `    <description>${capability.description}</description>\n`
          : "";
        const parametersXml = capability.parameters
          ? `    <parameters>\n${capability.parameters
            .map(
              (parameter) =>
                `      <parameter>\n        <name>${parameter.name}</name>\n        <description>${parameter.description}</description>\n      </parameter>\n`
            )
            .join("")}    </parameters>\n`
          : "";

        return `  <capability>\n${nameXml}${descriptionXml}${parametersXml}  </capability>\n`;
      })
    )
    .join("");

  return `<capabilities>\n${capabilitiesXml}</capabilities>`;
}

/**
 * Retrieves previous messages for a user and adds them to the messages array.
 * @param {string} username - The username of the user.
 * @param {Array} messages - The array to which the user messages will be added.
 * @param {Object} options - The options for generating user messages.
 * @param {number} [options.minCount=1] - The minimum number of user messages to retrieve.
 * @param {number} [options.maxCount=10] - The maximum number of user messages to retrieve.
 * @returns {Promise<void>} - A promise that resolves when the user messages have been added to the array.
 */
async function addUserMessages(username, messages, options = {}) {
  const { minCount = 4, maxCount = 24 } = options;
  const userMessageCount = chance.integer({ min: minCount, max: maxCount });
  logger.info(
    `🔧 Retrieving ${userMessageCount} previous messages for ${username}`
  );
  try {
    const userMessages = await getUserMessageHistory(
      username,
      userMessageCount
    );
    if (!userMessages) {
      logger.info(`No previous messages found for ${username}`);
      return;
    }
    userMessages.reverse();
    userMessages.forEach((message) => {
      messages.push({
        role: "user",
        content: `${message.created_at}, in conversation ${message.conversation_id}: ${message.value}`
      });
    });
  } catch (error) {
    logger.info("Error getting previous user messages:", error);
  }
}

/**
 * Adds user memories to the messages array.
 * @param {string} username - The username of the user.
 * @param {Array} messages - The array of messages to add user memories to.
 * @param {Object} options - The options for retrieving user memories.
 * @param {number} [options.minCount=8] - The minimum number of user memories to retrieve.
 * @param {number} [options.maxCount=32] - The maximum number of user memories to retrieve.
 * @returns {Promise<void>} - A promise that resolves when the user memories are added to the messages array.
 */
async function addUserMemories(username, messages, options = {}) {
  const { minCount = 4, maxCount = 24 } = options;
  const userMemoryCount = chance.integer({ min: minCount, max: maxCount });
  try {
    const userMemories = await getUserMemory(username, userMemoryCount);
    logger.info(`🔧 Retrieving ${userMemoryCount} memories for ${username}`);
    userMemories.forEach((memory) => {
      messages.push({
        role: "system",
        content: `You remember from a previous interaction on ${memory.created_at}, in conversation: ${memory.conversation_id}: ${memory.value}`
      });
    });
  } catch (err) {
    logger.info(err);
  }
}

/**
 * Adds relevant memories to the messages array.
 * @param {string} username - The username of the user.
 * @param {Array} messages - The array of messages to add relevant memories to.
 * @param {Object} options - The options for retrieving relevant memories.
 * @param {number} [options.minCount=6] - The minimum number of relevant memories to retrieve.
 * @param {number} [options.maxCount=32] - The maximum number of relevant memories to retrieve.
 * @returns {Promise<void>} - A promise that resolves when the relevant memories are added to the messages array.
 */
async function addRelevantMemories(username, messages, options = {}) {
  const { minCount = 1, maxCount = 16 } = options;
  const relevantMemoryCount = chance.integer({ min: minCount, max: maxCount });

  // get the last user message to use as the query for relevant memories
  const lastUserMessage = messages
    .slice()
    .reverse()
    .find((message) => message.role === "user");

  if (!lastUserMessage) {
    logger.info(`No last user message found for ${username}`);
    return;
  }

  const queryString = lastUserMessage.content;
  logger.info(
    `🔧 Querying for relevant memories for ${username}: ${queryString}`
  );

  try {
    const relevantMemories = await getRelevantMemories(
      queryString,
      relevantMemoryCount
    );
    logger.info(
      `🔧 Retrieving ${relevantMemoryCount} relevant memories for ${queryString}`
    );

    relevantMemories?.forEach((memory) => {
      // log out the memories
      logger.info('relevant memory ' + JSON.stringify(memory))
      messages.push({
        role: 'system',
        content: `${memory.created_at}, in conversation: ${memory.conversation_id}: ${memory.value}`
      })
    })
  } catch (err) {
    logger.info(`${err} ${err.stack}`);
  }
}

/**
 * Adds general memories to the messages array.
 * @param {Array} messages - The array of messages to add general memories to.
 * @param {Object} options - The options for retrieving general memories.
 * @param {number} [options.minCount=2] - The minimum number of general memories to retrieve.
 * @param {number} [options.maxCount=8] - The maximum number of general memories to retrieve.
 * @returns {Promise<void>} - A promise that resolves when the general memories are added to the messages array.
 */
async function addGeneralMemories(messages, options = {}) {
  const { minCount = 3, maxCount = 20 } = options;
  const generalMemoryCount = chance.integer({ min: minCount, max: maxCount });
  try {
    const generalMemories = await getAllMemories(generalMemoryCount);
    logger.info(`🔧 Retrieving ${generalMemoryCount} general memories`);
    generalMemories.forEach((memory) => {
      messages.push({
        role: "system",
        content: `${memory.created_at} in conversation: ${memory.conversation_id}: ${memory.value}`
      });
    });
  } catch (err) {
    logger.info(err);
  }
}

/**
 * Splits a message string into chunks.
 * @param {string} messageString - The message string to be split.
 * @returns {Array<Array<string>>} - An array of arrays containing the chunks of the message.
 */
function splitMessageIntoChunks(messageString) {
  if (typeof messageString !== "string") {
    logger.info("splitMessageIntoChunks: messageString is not a string");
    return;
  }
  const messageArray = splitMessageIntoArray(messageString);
  return splitArrayIntoChunks(messageArray);
}

/**
 * Splits a message string into an array of words.
 * @param {string} messageString - The message string to be split.
 * @returns {string[]} - An array of words from the message string.
 */
function splitMessageIntoArray(messageString) {
  return messageString.split(" ");
}

/**
 * Splits an array of messages into chunks based on a maximum chunk size.
 * @param {string[]} messageArray - The array of messages to be split into chunks.
 * @returns {string[]} - The array of message chunks.
 */
function splitArrayIntoChunks(messageArray) {
  const messageChunks = [];
  let currentChunk = "";
  for (let i = 0; i < messageArray.length; i++) {
    const word = messageArray[i];
    if (isChunkSizeAcceptable(currentChunk, word)) {
      currentChunk += word + " ";
    } else {
      messageChunks.push(currentChunk);
      currentChunk = word + " ";
    }
  }
  messageChunks.push(currentChunk);
  return messageChunks;
}

/**
 * Checks if the current chunk size is acceptable for adding a word.
 * @param {string} currentChunk - The current chunk of text.
 * @param {string} word - The word to be added to the chunk.
 * @returns {boolean} - Returns true if the chunk size is acceptable, false otherwise.
 */
function isChunkSizeAcceptable(currentChunk, word) {
  return currentChunk.length + word.length < 2000;
}

/**
 * Splits a message into chunks and sends them as separate messages.
 *
 * @param {string} message - The message to be split and sent.
 * @param {object} channel - The channel to send the message to.
 * @returns {void}
 */
function splitAndSendMessage(message, channel) {
  if (!channel) {
    logger.info("splitAndSendMessage: messageObject is null or undefined");
    return;
  }
  if (typeof message !== "string") {
    logger.info("splitAndSendMessage: message is not a string");
    return;
  }

  logger.info(`splitAndSendMessage: message length: ${message.length}`);

  if (message.length < 2000) {
    try {
      channel.send(message);
    } catch (e) {
      logger.info(`Error sending message: ${e}`);
    }
  } else {
    const messageChunks = splitMessageIntoChunks(message);
    for (let i = 0; i < messageChunks.length; i++) {
      try {
        channel.send(messageChunks[i]);
      } catch (error) {
        logger.info(`Error sending message chunk ${i}: ${error}`);
      }
    }
  }
}

/**
 * Creates a token limit warning object in OpenAI chat message format
 * @returns {Object} An object in OpenAI chat message format with a token limit warning as the content
 */
function createTokenLimitWarning() {
  return {
    role: "user",
    content:
      "It looks like you are reaching the token limit. In the next response, please do not use a capability. Use all of this information to summarize a response."
  };
}

/**
 * Checks if the total number of tokens in the given messages exceeds the token limit.
 * @param {Array<string>} messages - The array of messages to count tokens from.
 * @returns {boolean} - True if the total number of tokens exceeds the token limit, false otherwise.
 */
function isExceedingTokenLimit(messages) {
  return countMessageTokens(messages) > TOKEN_LIMIT;
}

/**
 * Destructures a string of arguments into an array of trimmed arguments.
 *
 * @param {string} args - The string of arguments to destructure.
 * @returns {Array} - An array of trimmed arguments.
 */
function destructureArgs(args) {
  return args.split(",").map((arg) => arg.trim());
}

/**
 * Parses a JSON string into a JavaScript object.
 *
 * This function takes a JSON string as an argument, replaces single quotes with double quotes to ensure valid JSON format,
 * and then parses it into a JavaScript object.
 * If the input string is not a valid JSON, parseJSONArgs() will throw an error.
 *
 * @param {string} arg - The JSON string to be parsed.
 * @returns {Object} - The JavaScript object parsed from the input JSON string.
 * @throws {SyntaxError} If the input string is not a valid JSON.
 */
function parseJSONArg(arg) {
  return JSON.parse(arg.replace(/'/g, '"'));
}

/**
 * Generates a random hexagram number and returns its name.
 * @returns {string} The hexagram number and its corresponding name.
 */
function getHexagram() {
  const hexagramNumber = chance.integer({ min: 1, max: 64 });
  const hexNameMap = {
    1: "The Creative",
    2: "The Receptive",
    3: "Difficulty at the Beginning",
    4: "Youthful Folly",
    5: "Waiting",
    6: "Conflict",
    7: "The Army",
    8: "Holding Together",
    9: "The Taming Power of the Small",
    10: "Treading",
    11: "Peace",
    12: "Standstill",
    13: "Fellowship with Men",
    14: "Possession in Great Measure",
    15: "Modesty",
    16: "Enthusiasm",
    17: "Following",
    18: "Work on What Has Been Spoiled",
    19: "Approach",
    20: "Contemplation",
    21: "Biting Through",
    22: "Grace",
    23: "Splitting Apart",
    24: "Return",
    25: "Innocence",
    26: "The Taming Power of the Great",
    27: "The Corners of the Mouth",
    28: "Preponderance of the Great",
    29: "The Abysmal",
    30: "The Clinging",
    31: "Influence",
    32: "Duration",
    33: "Retreat",
    34: "The Power of the Great",
    35: "Progress",
    36: "Darkening of the Light",
    37: "The Family",
    38: "Opposition",
    39: "Obstruction",
    40: "Deliverance",
    41: "Decrease",
    42: "Increase",
    43: "Breakthrough",
    44: "Coming to Meet",
    45: "Gathering Together",
    46: "Pushing Upward",
    47: "Oppression",
    48: "The Well",
    49: "Revolution",
    50: "The Cauldron",
    51: "The Arousing (Shock, Thunder)",
    52: "Keeping Still (Mountain)",
    53: "Development (Gradual Progress)",
    54: "The Marrying Maiden",
    55: "Abundance (Fullness)",
    56: "The Wanderer",
    57: "The Gentle (Wind)",
    58: "The Joyous (Lake)",
    59: "Dispersion (Dissolution)",
    60: "Limitation",
    61: "Inner Truth",
    62: "Preponderance of the Small",
    63: "After Completion",
    64: "Before Completion"
  };

  return `${hexagramNumber}. ${hexNameMap[hexagramNumber]}`;
}

/**
 * Counts the number of tokens in an array of messages.
 * @param {Array} messageArray - The array of messages to count tokens from.
 * @returns {number} - The total number of tokens.
 */
function countMessageTokens(messageArray = []) {
  let totalTokens = 0;
  // logger.info("Message Array: ", messageArray);
  if (!messageArray) {
    return totalTokens;
  }
  if (messageArray.length === 0) {
    return totalTokens;
  }

  // for loop
  for (let i = 0; i < messageArray.length; i++) {
    const message = messageArray[i];
    // encode message.content
    const encodedMessage = encode(JSON.stringify(message));
    totalTokens += encodedMessage.length;
  }

  return totalTokens;
}

// Example array of animal emojis
const emojis = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐻‍❄️",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🙈",
  "🙉",
  "🙊",
  "🐒",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🐣",
  "🐥",
  "🦆",
  "🦅",
  "🦉",
  "🦇",
  "🐺",
  "🐗",
  "🐴",
  "🦄",
  "🐝",
  "🪱",
  "🐛",
  "🦋",
  "🐌",
  "🐞",
  "🐜",
  "🦟",
  "🦗",
  "🕷",
  "🕸",
  "🦂",
  "🐢",
  "🐍",
  "🦎",
  "🦖",
  "🦕",
  "🐙",
  "🦑",
  "🦐",
  "🦞",
  "🦀",
  "🐡",
  "🐠",
  "🐟",
  "🐬",
  "🐳",
  "🐋",
  "🦈",
  "🐊",
  "🐅",
  "🐆",
  "🦓",
  "🦍",
  "🦧",
  "🐘",
  "🦛",
  "🦏",
  "🐪",
  "🐫",
  "🦒",
  "🦘",
  "🦬",
  "🐃",
  "🐂",
  "🐄",
  "🐎",
  "🐖",
  "🐏",
  "🐑",
  "🦙",
  "🐐",
  "🦌",
  "🐕",
  "🐩",
  "🦮",
  "🐕‍🦺",
  "🐈",
  "🐈‍⬛",
  "🪶",
  "🐓",
  "🦃",
  "🦤",
  "🦚",
  "🦜",
  "🦢",
  "🦩",
  "🕊",
  "🐇",
  "🦝",
  "🦨",
  "🦡",
  "🦫",
  "🦦",
  "🦥",
  "🐁",
  "🐀",
  "🐿",
  "🦔"
];

// Set to store used emojis
const usedEmojis = new Set();

// Function to get a unique emoji
function getUniqueEmoji() {
  let emoji;
  do {
    emoji = emojis[Math.floor(Math.random() * emojis.length)];
  } while (usedEmojis.has(emoji));

  usedEmojis.add(emoji);

  if (usedEmojis.size === emojis.length) {
    usedEmojis.clear();
  }

  return emoji;
}

function cleanUrlForPuppeteer(dirtyUrl) {
  // if the url starts and ends with ' then remove them
  if (dirtyUrl.startsWith("'") && dirtyUrl.endsWith("'")) {
    dirtyUrl = dirtyUrl.slice(1, -1);
  }

  // if it starts with ' remove it
  if (dirtyUrl.startsWith("'")) {
    dirtyUrl = dirtyUrl.slice(1);
  }

  // if it ends with ' remove it
  if (dirtyUrl.endsWith("'")) {
    dirtyUrl = dirtyUrl.slice(0, -1);
  }

  // if the url starts and ends with " then remove them
  if (dirtyUrl.startsWith('"') && dirtyUrl.endsWith('"')) {
    dirtyUrl = dirtyUrl.slice(1, -1);
  }

  // if it starts with " remove it
  if (dirtyUrl.startsWith('"')) {
    dirtyUrl = dirtyUrl.slice(1);
  }

  // if it ends with " remove it
  if (dirtyUrl.endsWith('"')) {
    dirtyUrl = dirtyUrl.slice(0, -1);
  }

  // return the clean url
  return dirtyUrl;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Processes chunks of data asynchronously with a provided processing function.
 *
 * @param {Array} chunks - The data chunks to process.
 * @param {Function} processFunction - The function to process each chunk. Must return a Promise.
 * @param {number} [limit=2] - The number of chunks to process concurrently.
 * @param {Object} [options={}] - Additional options for the processing function.
 * @returns {Promise<Array>} - A promise that resolves to an array of processed chunk results.
 */
async function processChunks(chunks, processFunction, limit = 2, options = {}) {
  const results = [];
  const chunkLength = chunks.length;

  // Remove any empty or blank chunks
  chunks = chunks.filter((chunk) => chunk.length > 0);

  for (let i = 0; i < chunkLength; i += limit) {
    const chunkPromises = chunks
      .slice(i, i + limit)
      .map(async (chunk, index) => {
        // Sleep to avoid rate limits or to stagger requests
        await sleep(500);
        // Call the provided processFunction for each chunk
        return processFunction(chunk, options);
      });

    // Wait for all promises in the current batch to resolve
    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);
  }

  return results;
}

module.exports = {
  destructureArgs,
  getHexagram,
  countTokens,
  countMessageTokens,
  removeMentionFromMessage,
  doesMessageContainCapability,
  isBreakingMessageChain,
  generateAiCompletionParams,
  addSystemPrompt,
  addCurrentDateTime,
  displayTypingIndicator,
  generateAiCompletion,
  splitAndSendMessage,
  createTokenLimitWarning,
  isExceedingTokenLimit,
  getUniqueEmoji,
  getPromptsFromSupabase,
  getConfigFromSupabase,
  createChatCompletion,
  parseJSONArg,
  processChunks,
  trimResponseByLineCount,
  sleep,
  capabilityRegex,
  toolUseCapabilityRegex,
  notificationRegex,
  lastUserMessage,
  TODO_TABLE_NAME
};
