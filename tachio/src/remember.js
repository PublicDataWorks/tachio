const dotenv = require("dotenv");

const logger = require("../src/logger.js")("remember");
dotenv.config();

const { MEMORIES_TABLE_NAME, MESSAGES_TABLE_NAME } = require("../config");
const { supabase } = require("./supabaseclient.js");
const VOYAGE_AI = 'https://api.voyageai.com/v1/embeddings'

/**
 * Retrieves user memories from the database.
 * @param {string} userId - The ID of the user.
 * @param {number} [limit=5] - The maximum number of memories to retrieve (default: 5).
 * @returns {Promise<Array>} - A promise that resolves to an array of user memories.
 */
async function getUserMemory(userId, limit = 5) {
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
 * Retrieves memories between two dates.
 * @param {string} startDate - The start date in ISO format.
 * @param {string} endDate - The end date in ISO format.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of memory objects.
 */
async function getMemoriesBetweenDates(startDate, endDate) {
  logger.info(`Looking for memories between ${startDate} and ${endDate}`);
  logger.info(
    `Looking for memories between ${startDate} and ${endDate}`
  );

  const response = await supabase
    .from(MEMORIES_TABLE_NAME)
    .select("*")
    .gte("created_at", startDate)
    .lte("created_at", endDate)
    .order("created_at", { ascending: true });

  const { data, error } = response;

  if (error) {
    logger.info("Error fetching memories between dates:", error);
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
 * @param {string | null} resourceId
 * @returns {Promise<void>}
 */
async function storeUserMemory(
  { username, guild, conversationId, relatedMessageId },
  value,
  memoryType = "user",
  resourceId = null
) {
  // first we do some checks to make sure we have the right types of data
  if (!username) {
    logger.warn("No username provided to storeUserMemory");
  }

  // if the user id is not a string, we need to error out
  if (typeof username !== "string") {
    logger.warn("username provided to storeUserMemory is not a string");
  }

  // if the value is not a string, we need to error out
  if (typeof value !== "string") {
    logger.warn("value provided to storeUserMemory is not a string");
  }

  if (!conversationId) {
    logger.warn("No conversationId provided to storeUserMemory");
  }

  if (!guild) {
    logger.warn("No guild provided to storeUserMemory");
  }

  if (!relatedMessageId) {
    logger.warn("No relatedMessageId provided to storeUserMemory");
  }

  if (!memoryType) {
    logger.warn("No memoryType provided to storeUserMemory");
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
    `Storing memory for ${username}: ${value} in ${memoryType} memory`
  );

  // const { embedding1: embedding, embedding2, embedding3, embedding4 } = embeddings;
  let embedding;
  try {
    const embeddingResponse = await voyageEmbedding(value)
    const [{ embedding: fetchedEmbedding }] = embeddingResponse.data
    embedding = fetchedEmbedding // Assign the fetched embedding to the outer scope variable
    // logger.info(`Embedding length: ${embedding.length}`)
  } catch (error) {
    logger.info(`Error fetching embedding: ${error.message}`);
    embedding = null; // Ensure embedding is null if there was an error
  }

  let validatedRelatedMessageId = null;
  if (relatedMessageId && !isNaN(parseInt(relatedMessageId))) {
    validatedRelatedMessageId = parseInt(relatedMessageId);
  }

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
      conversation_id: conversationId,
      related_message_id: validatedRelatedMessageId
    });

  // logger.info(
  //   `Stored memory for ${username}: ${value} in ${memoryType} memory -- ${resourceId}`,
  //   data,
  // );

  logger.info(`Stored memory for ${username}: ${value} in ${memoryType} memory ${JSON.stringify(data)}`);

  if (error) {
    logger.info(`Error storing user memory: ${error.message}`);
  }

  // TODO: Call LLM to generate 3 suggestions and store in db
}


/**
 * Retrieve memories associated with a specific file ID
 * @param {string} resourceId - The ID of the file
 * @param {number} [limit=5] - The maximum number of memories to retrieve. Default is 5.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of memory objects.
 **/
async function getResourceMemories(resourceId, limit = 5) {
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

// /**
//  * Checks if there is a recent memory of the file based on its resource ID, where "recent" is defined by the caller.
//  *
//  * @param {string} resourceId - The ID of the resource (file) to check.
//  * @param {number} recencyHours - The number of hours to consider a memory recent.
//  * @returns {Promise<boolean>} - True if there is a recent memory of the file, false otherwise.
//  */
// async function hasRecentMemoryOfResource(resourceId, recencyHours = 24) {
//   const hasMemory = await hasMemoryOfResource(resourceId);
//
//   if (!hasMemory) {
//     return false;
//   }
//
//   const { supabase } = require("./supabaseclient.js");
//
//   const { data, error } = await supabase
//     .from(MEMORIES_TABLE_NAME)
//     .select("created_at")
//     .eq("resource_id", resourceId)
//     .order("created_at", { ascending: false })
//     .limit(1);
//
//   if (error) {
//     logger.error("Error fetching the most recent memory of the file:", error);
//     return false; // Consider the absence of data as no recent memory exists.
//   }
//
//   // const hoursSinceLastMemory = differenceInHours(
//   //   new Date(),
//   //   new Date(data[0].created_at)
//   // );
//   // we need to remove the date-fns dependency
//   // and do this with plain ol' date objects
//   const hoursSinceLastMemory =
//     (new Date().getTime() - new Date(data[0].created_at).getTime()) /
//     1000 /
//     60 /
//     60;
//
//   return hoursSinceLastMemory <= recencyHours;
// }

/**
 * Deletes memories associated with a specific resource ID.
 * @param {string} resourceId - The ID of the resource.
 * @returns {Promise<string>} - A promise that resolves to a message indicating the number of memories deleted.
 * @throws {Error} - If there is an error deleting the memories.
 **/
async function deleteMemoriesOfResource(resourceId) {
  const { data, error } = await supabase
    .from(MEMORIES_TABLE_NAME)
    .delete()
    .eq("resource_id", resourceId);

  if (error) {
    logger.info(`Error deleting memories of resource: ${error.message}`);
    return `Error deleting memories of resource: ${error.message}`;
  }

  return `Deleted ${data?.length} memories of resource ${resourceId}`;
}

/**
 * Stores a user message in the database.
 *
 * @param {string} username - The ID of the user who sent the message.
 * @param {string} value - The content of the message.
 * @param {string} conversationId - The ID of the conversation where the message was sent.
 * @param {string | undefined} response - The assistant response to the message.
 * @param {string} guild - The ID of the guild where the message was sent.
 * @returns {Promise<string>} - A promise that resolves to the stored message data.
 */
async function storeUserMessage({ username, guild, conversationId, response }, value) {
  const { supabase } = require("./supabaseclient.js");
  const { data, error } = await supabase
    // .from("messages")
    .from(MESSAGES_TABLE_NAME)
    .insert({
      user_id: username,
      guild_id: guild,
      conversation_id: conversationId,
      assistant_response: response,
      value
    })
    .select()

  if (error) {
    logger.info(`Error storing user message: ${error.message}`);
  }

  return data[0].id
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

 * @param {number} [limit=20] - The maximum number of messages to retrieve. Default is 20.
 * @param {string} startDate - A optional start date in ISO format for the retrieval.
 * @param {string} endDate - A optional end date in ISO format for the retrieval.

 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of message objects.
 */
async function getChannelMessageHistory({ channelId, limit, startDate, endDate }) {
  const query = supabase
    .from(MESSAGES_TABLE_NAME)
    .select("*")
    .order("created_at", { ascending: false })
    .eq("conversation_id", channelId);

  if (limit) {
    query.limit(limit);
  }
  if (startDate && endDate) {
    query
      .gte("created_at", startDate)
      .lte("created_at", endDate);
  }

  const { data, error } = await query

  if (error) {
    logger.info("Error fetching channel message:", error);
    return [];
  }

  return data;
}

/**
 * Embeds a string using the Voyage AI API.
 * @param {string} input - The input string to embed.
 * @param {string} [model="voyage-large-2-instruct"] - The model to use for embedding (default: "voyage-large-2-instruct").
 * @returns {Promise<object>} - A promise that resolves to the response data from the API.
 */
async function voyageEmbedding(input, model = "voyage-large-2-instruct") {
  const response = await fetch(VOYAGE_AI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`
    },
    body: JSON.stringify({
      input,
      model,
      input_type: 'document'
    })
  })
  logger.info(`Voyage response post status: ${response.status}`)
  return response.json()
}

// /**
//  * Converts a string into three different embeddings using different models.
//  * @param {string} string - The input string to convert into embeddings.
//  * @returns {Promise<object>} - A promise that resolves to an object containing the three embeddings: embedding1, embedding2, and embedding3.
//  * @throws {Error} If there is an error generating any of the embeddings.
//  */
// async function stringToEmbedding(string) {
//   const openAiEmbeddingResponse = await openai.embeddings.create({
//     model: "text-embedding-ada-002",
//     input: string,
//   });
//
//   const [{ embedding: embedding1 }] = openAiEmbeddingResponse.data.data;
//   if (embedding1) logger.info(`Embedding 1 length: ${embedding1.length}`);
//
//   let embedding2 = null;
//   try {
//     if (process.env.COHERE_API_KEY) {
//       const embed = await cohere.embed({
//         texts: [string],
//         model: "embed-english-v3.0",
//         inputType: "search_document",
//       });
//       embedding2 = embed.embeddings ? embed.embeddings[0] : null;
//       logger.info(`Embedding 2 length: ${embedding2.length}`);
//     }
//   } catch (error) {
//     console.error("Error generating embedding2:", error);
//   }
//
//   let embedding3 = null;
//   try {
//     if (process.env.VOYAGE_API_KEY) {
//       const embed = await voyageEmbedding(string, "voyage-large-2");
//       embedding3 = embed.embedding ? embed.embedding : null;
//       logger.info(`Embedding 3 length: ${embedding3.length}`);
//     }
//   } catch (error) {
//     console.error("Error generating embedding3:", error);
//     return {
//       embedding1: embedding1 || null,
//       embedding2: embedding2 || null,
//       embedding3: embedding3 || null,
//     };
//   }
//
//   const openAiLargeEmbeddingResponse = await openai.embeddings.create({
//     model: "text-embedding-large",
//     input: string,
//   });
//   const [{ embedding }] = openAiLargeEmbeddingResponse.data.data;
//   const embedding4 = embedding || null;
//   if (embedding4) logger.info(`Embedding 4 length: ${embedding4.length}`);
//
//   return {
//     embedding1: embedding1 || null,
//     embedding2: embedding2 || null,
//     embedding3: embedding3 || null,
//     embedding4: embedding4 || null,
//   };
// }

// /**
//  * Converts a memory into an embedding using OpenAI's text-embedding-ada-002 model.
//  * @param {string} memory - The memory to convert into an embedding.
//  * @returns {Promise<number[]>} - The embedding representing the memory.
//  */
// async function memoryToEmbedding(memory) {
//   if (!memory) {
//     return logger.info("No memory provided to memoryToEmbedding");
//   }
//
//   // const embeddingResponse = await openai.embeddings.create({
//   //   model: "text-embedding-ada-002",
//   //   input: memory,
//   // });
//
//   // const [{ embedding }] = embeddingResponse.data.data;
//
//   const {
//     embedding1: embedding,
//     embedding2,
//     embedding3,
//     embedding4,
//   } = await stringToEmbedding(memory);
//
//   return { embedding, embedding2, embedding3, embedding4 };
// }

/**
 * Retrieves relevant memories based on a query string.
 * @param {string} queryString - The query string to search for relevant memories.
 * @param {number} [limit=20] - The maximum number of memories to retrieve (default: 5).
 * @returns {Promise<Array>} - A promise that resolves to an array of relevant memories.
 */
async function getRelevantMemories(queryString, limit = 20) {
  // make sure queryString is a string
  if (typeof queryString !== "string") {
    logger.info("No query string provided to getRelevantMemories");
    return []
  }
  // queryStrings look like: <@1086489885269037128> What you do remember about to-do lists?
  // we need to clean the query string so that it's not too long
  let cleanQueryString = queryString.replace(/<@.*>/, "").trim();
  cleanQueryString = cleanQueryString.replace(/<.*>/, "").trim();
  cleanQueryString = cleanQueryString.replace(/\?/, "").trim();
  cleanQueryString = cleanQueryString.replace(/!/, "").trim();
  cleanQueryString = cleanQueryString.replace(/:/, "").trim();
  cleanQueryString = cleanQueryString.replace(/\./, "").trim();
  cleanQueryString = cleanQueryString.replace(/,/, "").trim();

  logger.info("Looking for memories relevant to " + cleanQueryString);
  // turn the cleanQueryString into an embedding
  if (!cleanQueryString) {
    return [];
  }

  // const { embedding1: embedding } = await stringToEmbedding(queryString);

  const embeddingResponse = await voyageEmbedding(queryString)
  const [{ embedding }] = embeddingResponse.data


  // query the database for the most relevant memories, currently this is only supported on the openai embeddings
  const { data, error } = await supabase.rpc("match_memories", {
    query_embedding: embedding,
    // match_threshold: 0.78,
    match_threshold: 0.85,
    match_count: limit
  });

  if (error) {
    logger.error(`Error fetching relevant user memory: ${error.message}`);
    return [];
  }

  // if data is an empty object, make it an empty array
  if (Object.keys(data).length === 0) {
    return [];
  }

  return data;
}

/**
 * A plain old string search across memories
 * @param {string} queryString - The query string to search for relevant memories.
 */
async function getMemoriesByString(queryString) {
  if (typeof queryString !== "string") {
    return logger.info("No query string provided to getRelevantMemories");
  }
  const { data, error } = await supabase
    .from(MEMORIES_TABLE_NAME)
    .select("*")
    .ilike("value", `%${queryString}%`);

  if (error) {
    logger.error(`Error fetching relevant user memory: ${error.message}`);
    return null;
  }

  return data;
}

/**
 * Search for memories of a specific conversation
 * @param {string} conversationID - The conversationID to search for relevant memories.
 * @param {string} startDate - A optional start date in ISO format for the retrieval.
 * @param {string} endDate - A optional end date in ISO format for the retrieval.
 */
async function getMemoriesByConversationID({ conversationID, startDate, endDate }) {
  const query = supabase
    .from(MEMORIES_TABLE_NAME)
    .select("*")
    .eq("conversation_id", conversationID);
  if (startDate && endDate) {
    query
      .gte("created_at", startDate)
      .lte("created_at", endDate);
  }

  const { data, error } = await query

  if (error) {
    logger.error(`Error fetching relevant user memory: ${error.message}`);
    return null;
  }

  return data || [];
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
  deleteMemoriesOfResource,
  getMemoriesBetweenDates,
  getMemoriesByString,
  getMemoriesByConversationID
};
