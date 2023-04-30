/*
🚀 Welcome to the Cyberpunk Future of Discord Bots! 🤖
In this realm, we import the necessary modules, packages, 
and wire up our bot's brain to bring it to life. Let's go!
*/

// 🧩 Importing essential building blocks from the Discord package
const { Client, GatewayIntentBits, Events } = require("discord.js");

// 🌿 dotenv: a lifeline for using environment variables
const dotenv = require("dotenv");

// 📚 GPT-3 token-encoder: our linguistic enigma machine
const { encode, decode } = require("@nem035/gpt-3-encoder");

// ⚡ OpenAI API: connecting to the almighty AI powerhouse
const { Configuration, OpenAIApi } = require("openai");

// ❓ Chance: a randomizer to keep our bot from being boring
const { Chance } = require("chance");
const chance = new Chance();

// 📜 prompts: our guidebook of conversational cues
const prompts = require("./prompts");

/*
💾 Memory Lane: the 'remember' capability for our bot.
The ability to store and retrieve memories and message history.
*/
const {
  assembleMemory,
  getUserMessageHistory,
  getUserMemory,
  storeUserMessage,
  storeUserMemory,
} = require("./capabilities/remember.js");

/*
🌐 Our trusty browsing companion! The 'chrome_gpt_browser' module,
giving us fetching and parsing superpowers for URLs.
*/
const {
  fetchAndParseURL,
  generateSummary,
} = require("./chrome_gpt_browser.js");

// 💪 Flexin' on 'em with our list of cool capabilities!
const capabilities = require("./capabilities/_manifest.js").capabilities;

// capability prompt
// to tell the robot all the capabilities it has and what they do
const capabilityPrompt = `You have a limited number of capabilities that let you do things by asking the system to do them.

If you want to use a capability's method, you can ask the system to do it by making sure you are on a newline, and saying "<SYSTEM, CAPABILITY, METHOD>". For example, if you want to use the "remember" capability's "store" method, you can say:
"\\n<SYSTEM, REMEMBER, STORE, The value of the memory>"
and the system will store the memory for you. You may only use one capability at a time.

Not all capabilities require arguments, for example:
"\\n<SYSTEM, REMEMBER, ASSEMBLEMEMORY>" will assemble your memories for you.

The responses to these capabilities will appear as system messages in your conversation.

These are all of your capabilities:
${capabilities
  .map((capability) => {
    return `* ${capability.slug}: ${
      capability.description
    }, methods: ${capability.methods
      ?.map((method) => {
        return method.name;
      })
      .join(", ")}`;
  })
  .join("\n")}
`;

// 🍃 Breathe some life into our dotenv configuration
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_API_ORGANIZATION,
});
const openai = new OpenAIApi(configuration);

// 🚦 Constants Corner: prepping our prompts and error message
const {
  PROMPT_SYSTEM,
  PROMPT_REMEMBER,
  PROMPT_REMEMBER_INTRO,
  PROMPT_CONVO_EVALUATE_FOR_TWEET,
  PROMPT_CONVO_EVALUATE_INSTRUCTIONS,
  PROMPT_TWEET_REQUEST,
} = prompts;
const ERROR_MSG = `I am so sorry, there was some sort of problem. Feel free to ask me again, or try again later.`;

/*
🤖 Assemble! The Discord client creation begins here.
We plug in our intents for listening to the digital whispers of the servers.
*/
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});
client.login(process.env.DISCORD_BOT_TOKEN);

// 🎉 Event handlers: a lineup of our bot's finest functions
client.once(Events.ClientReady, onClientReady);
client.on(Events.InteractionCreate, onInteractionCreate);
client.on("debug", onDebug);
client.on("error", onError);
client.on("messageCreate", onMessageCreate);

// 🌈 onClientReady: our bot's grand entrance to the stage
function onClientReady(c) {
  console.log(`⭐️ Ready! Logged in as ${c.user.username}`);
  logGuildsAndChannels();
  scheduleRandomMessage();
}

// 🎭 onInteractionCreate: a silent observer of interactions
function onInteractionCreate(interaction) {
  // Log every interaction we see (uncomment the line below if needed)
  // console.log(interaction);
}

// 🔍 onDebug: our bot's little magnifying glass for problem-solving
function onDebug(info) {
  // console.log(`Debug info: ${info}`);
}

// ⚠️ onError: a sentinel standing guard against pesky errors
function onError(error) {
  console.error(`Client error: ${error}`);
}

// 💌 onMessageCreate: where the magic of conversation begins
async function onMessageCreate(message) {
  try {
    const botMentioned = message.mentions.has(client.user);

    if (!message.author.bot && botMentioned) {
      const typingInterval = setInterval(
        () => message.channel.sendTyping(),
        5000
      );
      const prompt = removeMentionFromMessage(message.content, "@coachartie");

      generateResponse(prompt, message.author.username).then(
        async ({ response }) => {
          clearInterval(typingInterval);
          splitAndSendMessage(response, message);

          const rememberMessage = await generateAndStoreRememberCompletion(
            prompt,
            response,
            message.author.username
          );
          storeUserMessage(message.author.username, message.content);
          storeUserMemory(message.author.username, rememberMessage);
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// 🎬 Utility functions: the unsung heroes of our code

// 🔪 removeMentionFromMessage: slice out the mention from the message
function removeMentionFromMessage(message, mention) {
  return message.replace(mention, "").trim();
}

// 💬 generateResponse: a masterful weaver of AI-generated replies
async function generateResponse(prompt, username) {
  try {
    const response = await handleMessage(prompt, username);
    return { response };
  } catch (error) {
    console.error("Error generating response:", error);
    // return "Sorry, I could not generate a response... there was an error.";
    return { response: ERROR_MSG };
  }
}

// 📤 splitAndSendMessage: a reliable mailman for handling lengthy messages
function splitAndSendMessage(message, messageObject) {
  if (!message) return messageObject.channel.send(ERROR_MSG);

  if (message.length < 2000) {
    messageObject.channel.send(message);
  } else {
    let responseArray = message.split(" ");
    let responseString = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (responseString.length + responseArray[i].length < 2000) {
        responseString += responseArray[i] + " ";
      } else {
        messageObject.channel.send(responseString);
        responseString = responseArray[i] + " ";
      }
    }
    messageObject.channel.send(responseString);
  }
}

// 🧠 generateAndStoreRememberCompletion: the architect of our bot's memory palace
async function generateAndStoreRememberCompletion(prompt, response, username) {
  const rememberCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.75,
    max_tokens: 320,
    messages: [
      {
        role: "system",
        content: PROMPT_REMEMBER_INTRO,
      },
      {
        role: "system",
        content: PROMPT_REMEMBER(username),
      },
      {
        role: "user",
        content: prompt,
      },
      {
        role: "assistant",
        content: response,
      },
    ],
  });

  return rememberCompletion.data.choices[0].message.content;
}

// 📨 handleMessage: the brain center for processing user messages
async function handleMessage(userMessage, username) {
  const messages = [];

  const msg = replaceRobotIdWithName(userMessage);

  // add the current date and time as a system message
  messages.push({
    role: "system",
    content: `Today is ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
  });

  const messageHistory = await getUserMessageHistory(username);

  // do a beautiful log of the user's message
  console.log(`\n👤 <${username}>: ${msg}`);

  // add all the system prompts to the messsage
  messages.push({
    role: "user",
    content: PROMPT_SYSTEM,
  });

  messages.push({
    role: "assistant",
    content: `Hello, I'm Coach Artie, the hyper-intelligent virtual AI coach and assistant for Room 302 Studio!

My primary goal is to support our amazing studio members, EJ, Ian, and Curran, by providing resources, answering questions, and facilitating collaboration. 🎨🎶💡

Please feel free to ask any questions or request assistance, and I'll be more than happy to help. I'll prioritize information I remember from my interactions with our studio members, and if you're a student from The Birch School, I welcome your inquiries as well! 🌳👋

Remember, I'm here to foster a positive environment that encourages growth, learning, and exploration.`,
  });

  const capabilityMessage = {
    role: "system",
    content: capabilityPrompt,
  };

  messages.push(capabilityMessage);

  const memories = await assembleMemory(username, getRandomInt(3, 20));

  // add the messagehistory to the memories
  messageHistory.forEach((message) => {
    memories.push(`previously this user said: <${message.user_id}>: ${message.value}`);
  });

  // turn memories into chatbot messages for completion
  memories.forEach((memory) => {
    console.log("memory -->", memory);
    messages.push({
      role: "system",
      content: `You remember ${memory}`,
    });
  });

  messages.push({
    role: "user",
    content: msg,
  });

  // use chance to make a temperature between 0.7 and 0.99
  const temperature = chance.floating({ min: 0.7, max: 0.99 });

  // console.log the messages for debugging
  messages.forEach((message) => {
    const roleEmoji = (message) => {
      if (message.role === "system") {
        return "🔦";
      } else if (message.role === "user") {
        return "👤";
      } else if (message.role === "assistant") {
        return "🤖";
      }
    };

    console.log(`${roleEmoji(message)} <${message.role}>: ${message.content}`);
  });

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-4",
    temperature,
    max_tokens: 900,
    messages: messages,
  });

  // do a beautiful log of the chatbot's response
  console.log(
    `🤖 <Coach Artie>: ${chatCompletion.data.choices[0].message.content}`
  );

  return chatCompletion.data.choices[0].message.content;
}

// 📦 logGuildsAndChannels: a handy helper for listing servers and channels
function logGuildsAndChannels() {
  console.log("\n🌐 Connected servers and channels:");
  client.guilds.cache.forEach((guild) => {
    console.log(` - ${guild.name}`);
    // guild.channels.cache.forEach((channel) => {
    //   console.log(`\t#${channel.name} (${channel.id}, type: ${channel.type})`);
    // });
  });
}

// ⏰ scheduleRandomMessage: a ticking time bomb of random messages
function scheduleRandomMessage() {
  const interval = getRandomInt(60000 * 20, 60000 * 60);
  setTimeout(() => {
    sendRandomMessageInRandomChannel();
    scheduleRandomMessage();
  }, interval);
}

// 🗃️ getRandomInt: a random number generator powered by chance.js
function getRandomInt(min, max) {
  return chance.integer({ min, max });
}

// 🤖 replaceRobotIdWithName: given a string, replace the robot id with the robot name
function replaceRobotIdWithName(string) {
  console.log('Replacing robot id with name');
  const coachArtieId = client.user.id;
  console.log('coachArtieId', coachArtieId);
  const coachArtieName = client.user.username;
  console.log('coachArtieName', coachArtieName);

  console.log('Before replace', string);
  const replaced = string.replace(`<@!${coachArtieId}>`, coachArtieName);
  console.log('After replace', replaced);
  return replaced
}

// 📝 callCapabilityMethod: a function for calling capability methods
async function callCapabilityMethod(capabilitySlug, methodName, args) {
  console.log(
    `Calling capability method: ${capabilitySlug}.${methodName} with args: ${args}`
  );

  let capabilityResponse = "";

  if (capabilitySlug === "remember") {
    if (methodName === "store") {
      // store the memory
      capabilityResponse = "Memory stored!";
    } else if (methodName === "assembleMemory") {
      // assemble the memory
      capabilityResponse = "Assembled memories!";
    } else if (methodName === "getRandomMemories") {
      // get random memories
      capabilityResponse = "Got random memories!";
    }
  }

  // You can replace this with actual capability method implementation.
  return `System response for ${capabilitySlug}.${methodName}: 
    ${capabilityResponse}`;
}

// 📝 processMessageChain: a function for processing message chains
async function processMessageChain(messages) {
  console.log("Processing message chain:", messages);
  console.log("Messages: ", messages.length);

  const lastMessage = messages[messages.length - 1];
  console.log("Last message: \n", lastMessage);
  const currentTokenCount = countMessageTokens(messages);
  console.log("Current token count: ", currentTokenCount);

  const apiTokenLimit = 8000;

  if (currentTokenCount >= apiTokenLimit - 900) {
    console.log(
      "Token limit reached, adding system message to the chain reminding the bot to wrap it up."
    );
    messages.push({
      role: "system",
      content:
        "You are reaching the token limit. In the next response, you may not use a capability but must use all of this information to respond to the user.",
    });
    return messages;
  }

  // const capabilityRegex = /\\n<SYSTEM, (.+?), (.+?)(?:, (.*?))?>/;
  // needs to handle `<SYSTEM, REMEMBER, STORE, EJ asked me to demonstrate the store method in the remember capability.>
  const capabilityRegex = /(?:\\n)?<SYSTEM, (.+?), (.+?)(?:, (.*?))?>/; // Remove the 'g' flag
  const capabilityMatch = capabilityRegex.exec(lastMessage.content); // Use 'exec' instead of 'match'

  console.log("Capability match: ", capabilityMatch);

  if (!capabilityMatch) {
    console.log("No capability found in the last message, breaking the chain.");
    return messages;
  }

  const [_, capSlug, capMethod, capArgs] = capabilityMatch;
  const capabilityResponse = await callCapabilityMethod(
    capSlug,
    capMethod,
    capArgs
  );

  const systemMessage = {
    role: "system",
    content: capabilityResponse,
  };

  console.log("Adding system message to the chain:", systemMessage);
  messages.push(systemMessage);

  // Call the OpenAI API to get the AI response based on the system message
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    temperature: 0.75,
    presence_penalty: 0.4,
    max_tokens: 900,
    messages: messages,
  });

  const aiResponse = completion.data.choices[0].message;

  messages.push(aiResponse);

  console.log("Continuing the message chain.");
  return processMessageChain(messages);
}
