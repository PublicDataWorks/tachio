const { openai } = require("./openai");
const { supabase, getHexagram, replaceRobotIdWithName, getPromptsFromSupabase } = require("../helpers.js");
const {
  getUserMemory,
  getAllMemories,
  storeUserMemory,
  getRelevantMemories,
} = require("./remember.js");
const chance = require("chance").Chance();
const vision = require("./vision.js");
const logger = require("../src/logger.js")("memory");
const dotenv = require("dotenv");
dotenv.config();

const preambleLogger = require("../src/logger.js")("preamble");
const { REMEMBER_MODEL } = require("../config");

const { PROMPT_REMEMBER, PROMPT_CAPABILITY_REMEMBER, PROMPT_REMEMBER_INTRO } = await getPromptsFromSupabase()

/**
 * Generates a remember completion and stores it in the database
 * @param {string} prompt - The prompt to generate a response for
 * @param {string} response - The robot's response to the prompt
 * @param {string} username - The username of the user to generate a remember completion for
 * @param {Array} conversationHistory - The entire conversation history up to the point of the user's last message
 *
 * @returns {string} - The remember completion
 *
 */
async function generateAndStoreRememberCompletion(
  prompt,
  response,
  { username = "", channel = "", guild = "" },
  conversationHistory = []
) {
  // logger.info("🔧 Generating and storing remember completion", username);
  // logger.info("🔧 Prompt:", prompt);
  // logger.info("🔧 Response:", response);
  const userMemoryCount = chance.integer({ min: 4, max: 24 });
  const memoryMessages = [];

  // get user memories

  const userMemories = await getUserMemory(username, userMemoryCount);

  logger.info(
    `🔧 Enhancing memory with ${userMemoryCount} memories from ${username}`
  );

  const generalMemories = await getAllMemories(userMemoryCount);

  logger.info(
    `🔧 Enhancing memory with ${generalMemories.length} memories from all users`
  );

  // de-dupe memories
  const memories = [...userMemories, ...generalMemories];

  // turn user memories into chatbot messages
  memories.forEach((memory) => {
    memoryMessages.push({
      role: "system",
      content: `You remember from a previous interaction at ${memory.created_at}: ${memory.value}  `,
    });
  });

  // if the response has a .image, delete that
  if (response.image) {
    delete response.image;
  }

  // make sure none of the messages in conversation history have an image
  conversationHistory.forEach((message) => {
    if (message.image) {
      delete message.image;
    }
  });

  // make sure none of the memory messages have an image
  memoryMessages.forEach((message) => {
    if (message.image) {
      delete message.image;
    }
  });

  const completeMessages = [
    ...conversationHistory,
    ...memoryMessages,
    {
      role: "system",
      content: "---",
    },
    {
      role: "system",
      content: PROMPT_REMEMBER_INTRO,
    },
    {
      role: "user",
      content: `# User (${username}): ${prompt} \n # Robot (Artie): ${response}`,
    },
    {
      role: "user",
      content: `${PROMPT_REMEMBER}`,
    },
  ];

  preambleLogger.info(`📜 Preamble messages ${JSON.stringify(completeMessages)}`)

  const rememberCompletion = await openai.createChatCompletion({
    model: REMEMBER_MODEL,
    // temperature: 1.1,
    // top_p: 0.9,
    presence_penalty: 0.1,
    max_tokens: 256,
    messages: completeMessages,
  });

  const rememberText = rememberCompletion.data.choices[0].message.content;
  logger.info(`🧠 Interaction memory: ${rememberText} for ${username} in ${channel} in ${guild} `);
  // logger.info("🧠 Interaction memory", rememberText);

  // if the remember text is ✨ AKA empty, we don't wanna store it
  if (rememberText === "✨") return rememberText;
  // if remember text length is 0 or less, we don't wanna store it
  if (rememberText.length <= 0) return rememberText;
  await storeUserMemory({ username }, rememberText);

  return rememberText;
}

/**
 * Generates and stores capability completion.
 * @param {string} prompt - The prompt for the capability completion.
 * @param {string} capabilityResponse - The response generated by the capability.
 * @param {string} capabilityName - The name of the capability.
 * @param {Object} options - Additional options for generating and storing capability completion.
 * @param {string} options.username - The username associated with the capability completion.
 * @param {Array} conversationHistory - The conversation history.
 * @returns {Promise<string>} - The generated capability completion text.
 */
async function generateAndStoreCapabilityCompletion(
  prompt,
  capabilityResponse,
  capabilityName,
  { username = "", channel = "", guild = "" },
  conversationHistory = []
) {
  // logger.info("🔧 Generating and storing capability usage");
  // logger.info("🔧 Prompt:", prompt);
  // logger.info("🔧 Response:", capabilityResponse);
  const userMemoryCount = chance.integer({ min: 1, max: 6 });
  const memoryMessages = [];

  // get user memories
  logger.info(
    `🔧 Enhancing memory with ${userMemoryCount} memories from ${username}`
  );
  const userMemories = await getUserMemory(username, userMemoryCount);

  const generalMemories = await getAllMemories(userMemoryCount);

  const relevantMemories = await getRelevantMemories(capabilityName);

  // de-dupe memories
  const memories = [...userMemories, ...generalMemories];

  // turn user memories into chatbot messages
  memories.forEach((memory) => {
    memoryMessages.push({
      role: "system",
      content: `You remember from a previous interaction at ${memory.created_at}: ${memory.value}  `,
    });
  });

  // if the response has a .image, we need to send that through the vision API to see what it actually is
  if (capabilityResponse.image) {
    // const imageUrl = message.attachments.first().url;
    // logger.info(imageUrl);
    // vision.setImageUrl(imageUrl);
    // const imageDescription = await vision.fetchImageDescription();
    // return `${prompt}\n\nDescription of user-provided image: ${imageDescription}`;

    // first we need to turn the image into a base64 string
    const base64Image = capabilityResponse.image.split(";base64,").pop();
    // then we need to send it to the vision API
    vision.setImageBase64(base64Image);
    const imageDescription = await vision.fetchImageDescription();
    // then we need to add the description to the response
  }

  // make sure none of the messages in conversation history have an image
  conversationHistory.forEach((message) => {
    if (message.image) {
      delete message.image;
    }
  });

  // make sure none of the memory messages have an image
  memoryMessages.forEach((message) => {
    if (message.image) {
      delete message.image;
    }
  });

  const rememberCompletion = await openai.createChatCompletion({
    model: REMEMBER_MODEL,
    // temperature: 1.1,
    // top_p: 0.9,
    presence_penalty: 0.1,
    max_tokens: 256,
    messages: [
      ...memoryMessages,
      ...conversationHistory,
      {
        role: "system",
        content: "---",
      },
      {
        role: "system",
        content: `You remember from a previous interaction: ${capabilityName} ${capabilityResponse}`,
      },
      {
        role: "user",
        content: `${prompt}`,
      },
      {
        role: "assistant",
        content: `${capabilityResponse}`,
      },
      {
        role: "user",
        content: `${PROMPT_CAPABILITY_REMEMBER}`,
      },
    ],
  });

  const rememberText = rememberCompletion.data.choices[0].message.content;

  // if the remember text is ✨ AKA empty, we don't wanna store it
  if (rememberText === "✨") return rememberText;
  // if remember text length is 0 or less, we don't wanna store it
  if (rememberText.length <= 0) return rememberText;
  await storeUserMemory({ username: "capability" }, rememberText);

  return rememberText;
}

module.exports = {
  generateAndStoreRememberCompletion,
  generateAndStoreCapabilityCompletion,
};
