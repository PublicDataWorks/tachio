const dotenv = require("dotenv");

const { openai } = require("./openai");
const { CohereClient } = require("cohere-ai");
const logger = require("../src/logger.js")("remember");
const { differenceInHours } = require("date-fns");
const axios = require("axios");
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});
const port = process.env.EXPRESS_PORT;
dotenv.config();

const { MEMORIES_TABLE_NAME, MESSAGES_TABLE_NAME } = require("../config");
const { supabase } = require("../helpers");

/**
 * Retrieves user memories from the database.
 * @param {string} userId - The ID of the user.
 * @param {number} [limit=5] - The maximum number of memories to retrieve (default: 5).
 * @returns {Promise<Array>} - A promise that resolves to an array of user memories.
 */
async function getUserMemory(userId, limit = 5) {
  const { supabase } = require("../helpers");
  if (!userId) {
    logger.info("No userId provided to getUserMemory");
    return [];
  }
  logger.info("💾 Querying database for memories related to user:", userId);
  
  const { data, error } = await supabase
    .from(MEMORIES_TABLE_NAME)
    .select("*")
    .limit(limit)
    .order("created_at", { ascending: false })
    .eq("user_id", userId)
    .neq("value", "✨");

  if (error) {
    logger.info("Error fetching user memory:", error);
    return [];
  }

  return data;
}

/**
 * Retrieves a specified number of memories from the database.
 *
 * @param {number} [limit=5] - The maximum number of memories to retrieve. Default is 5.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of memory objects.
 */
async function getAllMemories(limit = 5) {
  const { supabase } = require("../helpers");
  const { data, error } = await supabase
    .from(MEMORIES_TABLE_NAME)
    .select("*")
    .limit(limit)
    .order("created_at", { ascending: false })
    .neq("value", "✨");

  if (error) {
    logger.info("Error fetching memories:", error);
    return [];
  }

  return data;
}

/**
 * Stores a memory in the database
 * @param {string} userId
 * @param {string} value
 * @param {string} memoryType
 * @param {string} resourceId
 * @returns {Promise<void>}
 */
async function storeUserMemory(
  { username, channel, guild },
  value,
  memoryType = "user",
  resourceId = null,
) {
  // first we do some checks to make sure we have the right types of data
  if (!username) {
    return logger.info("No username provided to storeUserMemory");
  }

  // if the user id is not a string, we need to error out
  if (typeof username !== "string") {
    return logger.info("username provided to storeUserMemory is not a string");
  }

  // if the value is not a string, we need to error out
  if (typeof value !== "string") {
    return logger.info("value provided to storeUserMemory is not a string");
  }

  // TODO: Check .env for any non-openAI embedding models
  // Cohere, Voyage, etc

  // If the API keys are defined in the .env, then we should get embeddings from them and store those as well

  // let embedding, embedding2, embedding3;
  // try {
  //   ({ embedding, embedding2, embedding3 } = await memoryToEmbedding(value));
  // } catch (e) {
  //   logger.info(e.message);
  // }

  // let embeddings
  // try {
  //   embeddings = await stringToEmbedding(value);
  // } catch (e) {
  //   logger.info(`Error making embeddings: ${e.message}`);
  // }

  logger.info(
    `Storing memory for ${username}: ${value} in ${memoryType} memory`,
  );

  // const { embedding1: embedding, embedding2, embedding3, embedding4 } = embeddings;
  const openAiEmbeddingResponse = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: value,
  });

  const [{ embedding }] = openAiEmbeddingResponse.data.data;
  logger.info(`Embedding length: ${embedding.length}`);

  const { supabase } = require("../helpers");
  const { data, error } = await supabase
    // .from("storage")
    .from(MEMORIES_TABLE_NAME)
    .insert({
      user_id: username,
      value,
      embedding: embedding || null,
      // embedding2: embedding2 || null,
      // embedding3: embedding3 || null,
      memory_type: memoryType,
      resource_id: resourceId,
    });

  logger.info(
    `Stored memory for ${username}: ${value} in ${memoryType} memory ${JSON.stringify(
      data,
    )}`,
  );

  if (error) {
    logger.info(`Error storing user memory: ${error.message}`);
  }
}

/**
 * Retrieve memories associated with a specific file ID
 * @param {string} resourceId - The ID of the file
 * @param {number} [limit=5] - The maximum number of memories to retrieve. Default is 5.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of memory objects.
 **/
async function getResourceMemories(resourceId, limit = 5) {
  const { supabase } = require("../helpers");
  const { data, error } = await supabase
    .from(MEMORIES_TABLE_NAME)
    .select("*")
    .limit(limit)
    .order("created_at", { ascending: false })
    .eq("resource_id", resourceId);

  if (error) {
    logger.info("Error fetching resource memories:", error);
    return null;
  }

  return data;
}

/**
 * Checks if there is a memory of the file based on its resource ID.
 *
 * @param {string} resourceId - The ID of the resource (file) to check.
 * @returns {Promise<boolean>} - True if there is a memory of the file, false otherwise.
 */
async function hasMemoryOfResource(resourceId) {
  const { supabase } = require("../helpers");
  const { data, error } = await supabase
    .from(MEMORIES_TABLE_NAME)
    .select("created_at")
    .eq("resource_id", resourceId)
    .limit(1);

  if (error) {
    logger.error(`Error checking for memories of resource: ${error.message}`);
    return false; // Consider the absence of data as no memory exists.
  }

  return data.length > 0;
}

/**
 * Checks if there is a recent memory of the file based on its resource ID, where "recent" is defined by the caller.
 *
 * @param {string} resourceId - The ID of the resource (file) to check.
 * @param {number} recencyHours - The number of hours to consider a memory recent.
 * @returns {Promise<boolean>} - True if there is a recent memory of the file, false otherwise.
 */
async function hasRecentMemoryOfResource(resourceId, recencyHours = 24) {
  const hasMemory = await hasMemoryOfResource(resourceId);

  if (!hasMemory) {
    return false;
  }

  const { supabase } = require("../helpers");

  const { data, error } = await supabase
    .from(MEMORIES_TABLE_NAME)
    .select("created_at")
    .eq("resource_id", resourceId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    logger.error("Error fetching the most recent memory of the file:", error);
    return false; // Consider the absence of data as no recent memory exists.
  }

  // const hoursSinceLastMemory = differenceInHours(
  //   new Date(),
  //   new Date(data[0].created_at)
  // );
  // we need to remove the date-fns dependency
  // and do this with plain ol' date objects
  const hoursSinceLastMemory =
    (new Date().getTime() - new Date(data[0].created_at).getTime()) /
    1000 /
    60 /
    60;

  return hoursSinceLastMemory <= recencyHours;
}

/**
 * Stores a user message in the database.
 *
 * @param {string} username - The ID of the user who sent the message.
 * @param {string} value - The content of the message.
 * @param {string} channelId - The ID of the channel where the message was sent.
 * @param {string} guildId - The ID of the guild where the message was sent.
 * @returns {Promise<object>} - A promise that resolves to the stored message data.
 */
async function storeUserMessage({ username, channel, guild }, value) {
  const { supabase } = require("../helpers");
  console.log("does supabase exist?", supabase);
  const { data, error } = await supabase
    // .from("messages")
    .from(MESSAGES_TABLE_NAME)
    .insert({
      user_id: username,
      channel_id: channel,
      guild_id: guild,
      value,
    });

  if (error) {
    logger.info(`Error storing user message: ${error.message}`);
  }

  return data;
}

/**
 * Retrieves the message history of a user.
 * @param {string} userId - The ID of the user.
 * @param {number} [limit=5] - The maximum number of messages to retrieve. Default is 5.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of message objects.
 */
async function getUserMessageHistory(userId, limit = 5) {
  const { data, error } = await supabase
    // .from("messages")
    .from(MESSAGES_TABLE_NAME)
    .select("*")
    .limit(limit)
    .order("created_at", { ascending: false })
    .eq("user_id", userId);

  if (error) {
    logger.info("Error fetching user message:", error);
    return null;
  }

  return data;
}

/**
 * Retrieves message history for a specific channel_id
 * @param {string} channelId - The ID of the channel.
 * @param {number} [limit=5] - The maximum number of messages to retrieve. Default is 5.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of message objects.
 */
async function getChannelMessageHistory(channelId, limit = 5) {
  const { data, error } = await supabase
    // .from("messages")
    .from(MESSAGES_TABLE_NAME)
    .select("*")
    .limit(limit)
    .order("created_at", { ascending: false })
    .eq("channel_id", channelId);

  if (error) {
    logger.info("Error fetching channel message:", error);
    return null;
  }

  return data;
}

/**
 * Embeds a string using the Voyage AI API.
 * @param {string} string - The input string to embed.
 * @param {string} [model="voyage-large-2"] - The model to use for embedding (default: "voyage-large-2").
 * @returns {Promise<object>} - A promise that resolves to the response data from the API.
 */
async function voyageEmbedding(string, model = "voyage-large-2") {
  const response = await axios.post(
    "https://api.voyageai.com/v1/embeddings",
    {
      input: string,
      model,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
      },
    },
  );
  return response.data;
}

/**
 * Converts a string into three different embeddings using different models.
 * @param {string} string - The input string to convert into embeddings.
 * @returns {Promise<object>} - A promise that resolves to an object containing the three embeddings: embedding1, embedding2, and embedding3.
 * @throws {Error} If there is an error generating any of the embeddings.
 */
async function stringToEmbedding(string) {
  const openAiEmbeddingResponse = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: string,
  });

  const [{ embedding: embedding1 }] = openAiEmbeddingResponse.data.data;
  if (embedding1) logger.info(`Embedding 1 length: ${embedding1.length}`);

  let embedding2 = null;
  try {
    if (process.env.COHERE_API_KEY) {
      const embed = await cohere.embed({
        texts: [string],
        model: "embed-english-v3.0",
        inputType: "search_document",
      });
      embedding2 = embed.embeddings ? embed.embeddings[0] : null;
      logger.info(`Embedding 2 length: ${embedding2.length}`);
    }
  } catch (error) {
    console.error("Error generating embedding2:", error);
  }

  let embedding3 = null;
  try {
    if (process.env.VOYAGE_API_KEY) {
      const embed = await voyageEmbedding(string, "voyage-large-2");
      embedding3 = embed.embedding ? embed.embedding : null;
      logger.info(`Embedding 3 length: ${embedding3.length}`);
    }
  } catch (error) {
    console.error("Error generating embedding3:", error);
    return {
      embedding1: embedding1 || null,
      embedding2: embedding2 || null,
      embedding3: embedding3 || null,
    };
  }

  const openAiLargeEmbeddingResponse = await openai.createEmbedding({
    model: "text-embedding-large",
    input: string,
  });
  const [{ embedding }] = openAiLargeEmbeddingResponse.data.data;
  const embedding4 = embedding || null;
  if (embedding4) logger.info(`Embedding 4 length: ${embedding4.length}`);

  return {
    embedding1: embedding1 || null,
    embedding2: embedding2 || null,
    embedding3: embedding3 || null,
    embedding4: embedding4 || null,
  };
}

/**
 * Converts a memory into an embedding using OpenAI's text-embedding-ada-002 model.
 * @param {string} memory - The memory to convert into an embedding.
 * @returns {Promise<number[]>} - The embedding representing the memory.
 */
async function memoryToEmbedding(memory) {
  if (!memory) {
    return logger.info("No memory provided to memoryToEmbedding");
  }

  // const embeddingResponse = await openai.createEmbedding({
  //   model: "text-embedding-ada-002",
  //   input: memory,
  // });

  // const [{ embedding }] = embeddingResponse.data.data;

  const {
    embedding1: embedding,
    embedding2,
    embedding3,
    embedding4,
  } = await stringToEmbedding(memory);

  return { embedding, embedding2, embedding3, embedding4 };
}

/**
 * Retrieves relevant memories based on a query string.
 * @param {string} queryString - The query string to search for relevant memories.
 * @param {number} [limit=5] - The maximum number of memories to retrieve (default: 5).
 * @returns {Promise<Array>} - A promise that resolves to an array of relevant memories.
 */
async function getRelevantMemories(queryString, limit = 5) {
  // queryStrings look like: <@1086489885269037128> What you do remember about to-do lists?
  // we need to clean the query string so that it's not too long
  let cleanQueryString = queryString.replace(/<@.*>/, "").trim();
  cleanQueryString = cleanQueryString.replace(/<.*>/, "").trim();
  cleanQueryString = cleanQueryString.replace(/\?/, "").trim();
  cleanQueryString = cleanQueryString.replace(/!/, "").trim();
  cleanQueryString = cleanQueryString.replace(/:/, "").trim();
  cleanQueryString = cleanQueryString.replace(/\./, "").trim();
  cleanQueryString = cleanQueryString.replace(/,/, "").trim();

  logger.info("Looking for memories relevant to" + cleanQueryString);
  // turn the cleanQueryString into an embedding
  if (!cleanQueryString) {
    return [];
  }

  // const { embedding1: embedding } = await stringToEmbedding(queryString);

  const openAiEmbeddingResponse = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: queryString,
  });

  const [{ embedding }] = openAiEmbeddingResponse.data.data;

  // query the database for the most relevant memories, currently this is only supported on the openai embeddings
  const { data, error } = await supabase.rpc("match_memories", {
    query_embedding: embedding,
    // match_threshold: 0.78,
    match_threshold: 0.85,
    match_count: limit,
  });

  if (error) {
    logger.info("Error fetching relevant user memory:", error);
    return null;
  }

  return data;
}

module.exports = {
  getUserMemory,
  getUserMessageHistory,
  storeUserMemory,
  getAllMemories,
  storeUserMessage,
  getRelevantMemories,
  getChannelMessageHistory,
  getResourceMemories,
  hasMemoryOfResource,
  hasRecentMemoryOfResource,
};
