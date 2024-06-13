const dotenv = require('dotenv')
const dateFns = require('date-fns')
dotenv.config()
const {
  getMemoriesByString, getMemoriesByConversationID, getChannelMessageHistory, getMemoriesBetweenDates
} = require('../src/remember')
const logger = require('../src/logger')('briefing')
const { listEventsBetweenDates } = require('./calendar.js') // Adjust the path as necessary

const { destructureArgs, getPromptsFromSupabase } = require('../helpers')
const { supabase } = require('../src/supabaseclient')
const { getActiveProjects } = require('./manageprojects')
const { createChatCompletion } = require('../helpers')
const { addWeeks, subWeeks } = require('date-fns')
const { createDateInTimeZone } = require('../src/dateUtils')
const { INGEST_MEMORY_TYPE } = require('./ingest')
const { getGithubWebhooks } = require('../src/github')
const { getLinearWebhooks } = require('../src/linear')
const {
  PROJECT_TABLE_NAME,
  DAILY_REPORT_TABLE_NAME,
  MISSIVE_CONVERSATIONS_TABLE_NAME,
  NO_PROJECT_UPDATE
} = require('../src/constants');

const MISSIVE_CONVERSATION_URL_REGEX = /https:\/\/mail\.missiveapp\.com\/[^ ]*\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})\/?/

async function handleCapabilityMethod(method, args) {
  const [arg1] = destructureArgs(args)

  if (method === 'makeWeeklyBriefing') {
    return await makeWeeklyBriefing()
  } else if (method === 'makeDailyBriefing') {
    return await makeDailyBriefing()
  } else if (method === 'makeProjectBriefing') {
    return await makeProjectBriefing(arg1)
  } else if (method === 'makeBiweeklyProjectBriefing') {
    return await makeBiweeklyProjectBriefing(arg1)
  } else {
    throw new Error(`Method ${method} not supported by this capability.`)
  }
}

/**
 * Makes a weekly briefing.
 * @returns {Promise<String>} A promise that resolves to a string indicating the status of the weekly briefing.
 * @example await makeWeeklyBriefing();
 */
async function makeWeeklyBriefing() {
  try {
    const now = new Date();
    const nowISO = now.toISOString()
    const weekLater = addWeeks(now, 1).toISOString();
    const weekBefore = subWeeks(now, 1).toISOString();
    // Can't annotate projectId as potentially undefined because it would break _persist-manifest
    const todoChanges = await listTodoChanges({ startDate: weekBefore, endDate: nowISO, projectId: undefined });
    const calendarEntries = await readCalendar({ startDate: nowISO, endDate: weekLater });
    const weekMemories = await getMemoriesBetweenDates(weekBefore, nowISO)
    const activeProjects = await getActiveProjects()
    return await generateMetaSummary({
      projectSummaries: activeProjects,
      weekMemories,
      todoChanges,
      calendarEntries
    })
  } catch (error) {
    throw new Error(`Error occurred while making external request: ${error}, ${error.stack}`)
  }
}

/**
 * Makes a daily briefing across all projects
 * @returns {Promise<String>} A promise that resolves to a string indicating the status of the daily briefing.
 */
async function makeDailyBriefing() {
  const startDate = createDateInTimeZone(6, 0, 'America/Los_Angeles', -1).toISOString();
  const endDate = createDateInTimeZone(6, 0, 'America/Los_Angeles', 2).toISOString();

  const calendarEntries = await readCalendar({ startDate, endDate })
  const pendingTodos = await listPendingTodos()
  const { data, error } = await supabase.from('project_briefings')
    .select('content, projects (name)')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
  if (error) logger.error(`Error fetching project briefings in makeDailyBriefing: ${error.message}`)
  return await generateDailyBriefing(calendarEntries, pendingTodos, data)
}

/**
 * Makes a briefing on one particular project.
 * @param {String} projectName - The project name to make a briefing on.
 */
async function makeProjectBriefing(projectName) {
  const { data, error } = await supabase
    .from(PROJECT_TABLE_NAME)
    .select('id, missive_conversation_id, missive_label_id, github_repository_urls, linear_team_id')
    .eq('name', projectName)
    .limit(1)
  if (error || !data || data.length === 0) throw new Error(`Error occurred while trying to fetch project in making project briefing ${projectName}: ${error?.message} ${data}`)
  const project = data[0]

  const { data: labeledConversations, error: fetchConversationError } = await supabase
    .from(MISSIVE_CONVERSATIONS_TABLE_NAME)
    .select('id')
    .contains('label_ids', [project.missive_label_id])
  if (fetchConversationError) throw new Error(`Error occurred while trying to fetch ${MISSIVE_CONVERSATIONS_TABLE_NAME} in making project briefing ${projectName}: ${fetchConversationError?.message}`)
  const labelConversationIds = []
  if (labeledConversations.length > 0) {
    labelConversationIds.push(
      ...labeledConversations
        .filter(conversation => conversation.id !== project.id)
        .map(conversation => conversation.id)
    )
  }
  const startDate = createDateInTimeZone(5, 30, 'America/Los_Angeles', -1).toISOString();
  const endDate = createDateInTimeZone(21, 30, 'America/Los_Angeles').toISOString();

  // Can't annotate projectId as potentially undefined because it would break _persist-manifest
  const todoChanges = await listTodoChanges({ startDate, endDate, projectId: undefined })
  const conversationMessages = await getChannelMessageHistory({
    channelId: project.missive_conversation_id,
    startDate,
    endDate,
    limit: 30
  })
  const importedConversationIds = conversationMessages.map(message => {
    const match = message.value.match(MISSIVE_CONVERSATION_URL_REGEX);
    return match ? match[1] : null;
  }).filter(uuid => uuid !== null);
  const {
    messages: importedMessages,
    memories: importedMemories
  } = await processImportedConversations([...importedConversationIds, ...labelConversationIds])

  // const relevantMemories = await getRelevantMemories(projectName) // TODO: TBD
  const memoriesMentioningProject = await getMemoriesByString(projectName)
  const memoriesInProjectConversation = await getMemoriesByConversationID({
    conversationID: project.missive_conversation_id,
    startDate,
    endDate
  })

  let githubUrls
  try {
    githubUrls = JSON.parse(project.github_repository_urls)
  } catch (e) {
    logger.error(`Error parsing github repository urls: ${e.message} ${projectName} ${project.github_repository_urls}`)
  }
  const githubWebhooks = await getGithubWebhooks(githubUrls, startDate, endDate)
  const linearWebhooks = await getLinearWebhooks(project.linear_team_id, startDate, endDate)
  // TODO: Get PT
  const { PROJECT_BRIEFING_TEMPLATE } = await getPromptsFromSupabase();
  if (todoChanges.length > 0 || conversationMessages.length > 0 || importedMessages.length > 0 || importedMemories.length > 0 || memoriesInProjectConversation.length > 0 || githubWebhooks.length > 0 || linearWebhooks.length > 0 || memoriesMentioningProject.length > 0) {
    return await generateProjectSummary({
      projectName,
      startDate,
      endDate,
      todoChanges,
      conversationMessages,
      memoriesMentioningProject,
      importedMemories,
      importedMessages,
      githubWebhooks,
      linearWebhooks,
      template: PROJECT_BRIEFING_TEMPLATE
    })
  } else {
    return NO_PROJECT_UPDATE
  }

}

/**
 * Makes a biweekly briefing.
 * @param {string} projectName - The name of the project.
 * @returns {Promise<String>} A promise that resolves to a string indicating the status of the weekly briefing.
 * @example await makeWeeklyBriefing();
 */
async function makeBiweeklyProjectBriefing(projectName) {
  const { data, error } = await supabase
    .from(PROJECT_TABLE_NAME)
    .select('id, missive_conversation_id,shortname,aliases')
    .eq('name', projectName)
    .limit(1)
  if (error || !data || data.length === 0) throw new Error(`Error occurred while trying to fetch project in making biweekly project briefing ${projectName}: ${error.message}`)
  const project = data[0]
  const startDate = createDateInTimeZone(0, 0, 'America/Los_Angeles', -14).toISOString()
  const endDate = createDateInTimeZone(0, 0, 'America/Los_Angeles').toISOString()

  // const relevantMemories = await getRelevantMemories(projectName) // TODO: TBD
  const memoriesMentioningProject = await getMemoriesByString(projectName)
  const memoriesInProjectConversation = await getMemoriesByConversationID({
    conversationID: project.missive_conversation_id,
    startDate,
    endDate
  })
  const conversationMessages = await getChannelMessageHistory({
    channelId: project.missive_conversation_id,
    startDate,
    endDate,
    limit: 30
  })
  let projectAliases
  try {
    projectAliases = JSON.parse(project.aliases)
  } catch (e) {
    logger.error(`Error parsing project aliases: ${e} ${projectName} ${project.aliases}`)
  }

  const calendarEntries = await readCalendarByProject({
    name: projectName,
    shortname: project.shortname,
    aliases: projectAliases,
    startDate,
    endDate
  })

  const { data: dailyReports, errorFetchDailyReports } = await supabase
    .from(DAILY_REPORT_TABLE_NAME)
    .select('subject, content')
    .eq('project_id', project.id)
    .gte('created_at', startDate)
    .lte('created_at', endDate)

  if (errorFetchDailyReports) throw new Error(`Error occurred while trying to fetch daily reports in making biweekly project briefing: ${error.message}`)
  const { BIWEEKLY_BRIEFING_TEMPLATE } = await getPromptsFromSupabase();

  return await generateProjectSummary({
    startDate,
    endDate,
    projectName,
    calendarEntries,
    conversationMessages,
    memoriesMentioningProject,
    memoriesInProjectConversation,
    dailyReports,
    template: BIWEEKLY_BRIEFING_TEMPLATE
  })
}

async function retrieveFeedback() {
  // Placeholder for feedback retrieval logic

  // query supabase for all memories with the feedback tag
  const { supabase } = require('../helpers')
  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .eq('tags', 'feedback')

  if (error) {
    logger.error('Error retrieving feedback', error)
    return []
  }

  return data
}

async function identifyProjectsInMemories(processedMemories) {
  // Placeholder for project identification logic
  // We are going to get a bunch of memory objects
  // First let's extract all the content

  // make sure processedMemories is an array of objects with a content property
  if (!Array.isArray(processedMemories) || processedMemories.length === 0) {
    logger.error(`No memories found to identify projects in`)
    return []
  }

  if (!processedMemories[0].content) {
    logger.error(`No content found in memories to identify projects in`)
    return []
  }

  const memoryContentOnly = processedMemories.map((memory) => memory.content)

  // Then we can look for any project slugs or project IDs in the content
  const bigMemoryString = memoryContentOnly.join('\n')

  // create some messages with the string and some instructions
  const messages = [
    {
      role: 'user',
      // this is an example message to extract IDs out of
      content: `We should add a new issue to tachio - we had three conversations about it in #23ij2329, #sdijs, and #studio. We also had a long conversation about Project 2 in #studio.

In the previous message I just sent, please identify any GitHub Repos, Issues, Missive Conversations, or Projects. Please respond in the following format, newline-delimited with no other text:

- Discussion on Project 1: Missive#fkdf993ek9k93k
- Discussion on Project 2: Missive#fkdf993ek9k93k
      `
    },
    {
      role: 'assistant',
      content: `- Discussion on GitHub repo: GitHub#tachio
- Discussion on Tachio: Missive#23ij2329
- Discussion on Tachio: Missive#sdijs
- Discussion on Tachio: Discord#studio
- Discussion on Project 2: Discord#studio`
    },
    {
      role: 'user',
      content: `Perfect! Thank you!`
    },
    {
      role: 'user',
      content: bigMemoryString
    },
    {
      role: 'user',
      content: `In the previous message I just sent, please identify any GitHub Repos, Issues, Missive Conversations, or Projects. Please respond in the following format, newline-delimited with no other text:

- Discussion on Project 1: Missive#fkdf993ek9k93k
- Discussion on Project 2: Missive#fkdf993ek9k93k
- Discussion on Project 3 in #studio: Discord#studio
`
    }
  ]

  // we can send the big string to an LLM and ask it to look for the "needles" of various IDs for conversations, repos, and projects
  // And just ask it to return it in a standard JSON format
  // that we can pass down to the next function
  const response = await createChatCompletion(messages, [
    'missive',
    'repo',
    'project'
  ])

  // Let's assume & hope the robot returns the format we requested:
  // A newline delimited list of each ID with a little label
  // Like:
  //  - Discussion on Project 1: Missive#fkdf993ek9k93k
  //  - Discussion on Project 2: Missive#fkdf993ek9k93k
  //  - Discussion on Project 3 in #studio: Discord#studio
  //  - Discussion on repo-name Issue 123: GitHub#repo-name/issue/123

  const parsedResponse = response.split('\n').map((line) => {
    const [label, id] = line.split(': ')
    const [type, value] = id.split('#')
    return { label, type, value, id }
  })

  logger.info(
    `Parsed ID extraction from memories: ${JSON.stringify(
      parsedResponse,
      null,
      2
    )}`
  )

  // make sure the parsedResponse has a length, if it doesn't, error out
  if (parsedResponse.length === 0) {
    logger.error(
      `No project slugs or IDs found in the memories ${JSON.stringify(
        response
      )}`
    )
    return []
  }

  return parsedResponse
}

async function formatSummary(summary) {
  const formattedCompletion = await createChatCompletion([
    {
      role: 'user',
      content: `I want to format the summary: ${summary}`
    },
    {
      role: 'user',
      content: `Can you please re-write this summary of facts into a well-architected summary document? Wherever possible, summarize related facts into a single sentence or paragraph. Use bullet points for lists. Be as detailed as possible and surface specific links, dates, projects, and names.`
    }
  ])

  return formattedCompletion
}

async function communicateSummary(message, service) {
  // Placeholder for communication logic
  if (service === 'discord') {
    // Look up the ID of the weekly summary from the config
    // then send a message to that channel
    // figure out the correct Discord channel to post to
    // post to discord
  } else if (service === 'api') {
    // AKA Missive
    //
    // Create a new conversation with a title like "Weekly Summary - Week of [date]"
    // post to missive
  } else if (service === 'github') {
    // figure out any relevant repos / issues
    // and send response there
  }
}

async function archiveSummary(summary) {
  // Placeholder for archiving logic
  // we will save a special type of memory that is tagged as a weekly summary archive
  const { supabase } = require('../helpers')
  const { data, error } = await supabase.from('memories').insert([
    {
      content: summary,
      tags: ['weekly_summary']
    }
  ])

  if (error) {
    logger.error('Error archiving summary', error)
  }

  return data
}

async function listTodoChanges({ startDate, endDate, projectId }) {
  const query = supabase
    .from('issues')
    .select('*')
    .gte('updated_at', startDate || dateFns.startOfWeek(new Date()).toISOString())
    .lte('updated_at', endDate || dateFns.endOfWeek(new Date()).toISOString())
  if (projectId) {
    query.eq('project_id', projectId)
  }
  const { data, error } = await query
  if (error) {
    logger.error(`Error retrieving todo changes: ${JSON.stringify(error)}`)
    return []
  }

  return data
}

async function readCalendar({ startDate, endDate }) {
  try {
    // Assuming you have a way to determine the calendarId. It could be an environment variable or a fixed value.
    const calendarIds = process.env.CALENDAR_IDS.split(',')
    const promises = calendarIds.map(async (calendarId) => {
      const events = await listEventsBetweenDates(
        calendarId,
        startDate || dateFns.subWeeks(new Date(), 1).toISOString(),
        endDate || dateFns.addWeeks(new Date(), 1).toISOString()
      )
      return JSON.parse(events)
    })
    const events = await Promise.all(promises)
    return events.flat()
  } catch (error) {
    logger.error(`Error reading calendar: ${error}`)
    return [] // Return an empty object or handle the error as appropriate
  }
}

async function generateProjectSummary({
  projectName,
  startDate,
  endDate,
  relevantMemories,
  todoChanges,
  calendarEntries,
  conversationMessages,
  memoriesMentioningProject,
  memoriesInProjectConversation,
  importedMemories,
  importedMessages,
  githubWebhooks,
  linearWebhooks,
  dailyReports,
  template
}) {
  logger.info(`Generating project summary for: ${projectName}`)
  const messages = []

  messages.push({
    role: 'user',
    content: `Can you please generate a detailed summary for the ${projectName} project from ${startDate} to ${endDate} based on your own analysis and understanding?
     Focus solely on creating the summary without utilizing any other capabilities. Please do the best you can using only the data I provide, do not mention or comment on any missing data or gaps.
     Be as detailed as possible based on this: ${template}`
  })

  messages.push({
    role: 'user',
    content: `I want to generate a summary of the recent progress in the ${projectName} project`
  })

  messages.push({
    role: 'user',
    content: `Here are the relevant memories for the ${projectName} project: ${
      relevantMemories?.map(memory => memory.value).join('\n')}`
  })

  messages.push({
    role: 'user',
    content: `Here are comments written by users into the ${projectName} project: ${
      conversationMessages?.map(message => `${message.value} with assistant response ${message.assistant_response}`).join('\n')}`
  })

  messages.push({
    role: 'user',
    content: `Here are the todo changes for the ${projectName} project: ${JSON.stringify(todoChanges)}`
  })

  messages.push({
    role: 'user',
    content: `These memories reference the the ${projectName} project: ${
      memoriesMentioningProject?.map(memory => memory.value).join('\n')
    }`
  })

  const attachmentMemories = memoriesInProjectConversation?.filter(memory => memory.memory_type === 'attachment' || memory.memory_type === INGEST_MEMORY_TYPE)
  const messageMemories = memoriesInProjectConversation?.filter(memory => memory.memory_type !== 'attachment' && memory.memory_type !== INGEST_MEMORY_TYPE)
  messages.push({
    role: 'user',
    content: `These attachment memories in the ${projectName} project's conversation: ${
      attachmentMemories?.map((memory) => memory.value).join('\n')}`
  })
  messages.push({
    role: 'user',
    content: `These message memories in the ${projectName} project's conversation: ${
      messageMemories?.map((memory) => memory.value).join('\n')
    }`
  })

  messages.push({
    role: 'user',
    content: `These new memories are related to the ${projectName} project: ${JSON.stringify(importedMemories)}`
  })

  messages.push({
    role: 'user',
    content: `These new messages are related to the ${projectName} project: ${JSON.stringify(importedMessages)}`
  })

  messages.push({
    role: 'user',
    content: `Here are the Github webhook history for the ${projectName} project: ${
      githubWebhooks?.map(data => JSON.stringify(data)).join('\n')
    }`
  })

  messages.push({
    role: 'user',
    content: `Here are the Linear webhook history for the ${projectName} project: ${
      linearWebhooks?.map(data => JSON.stringify(data)).join('\n')
    }`
  })

  messages.push({
    role: 'user',
    content: `Here are the calendar entries for the ${projectName} project: ${JSON.stringify(calendarEntries)}`
  })

  messages.push({
    role: 'user',
    content: `Here are daily reports for the ${projectName} project: ${JSON.stringify(dailyReports)}`
  })

  return await createChatCompletion(messages)
}

async function generateMetaSummary({
  weekMemories,
  projectSummaries,
  todoChanges,
  calendarEntries
}) {
  logger.info(`Generating meta-summary for projectSummaries: ${projectSummaries?.length}`)
  const { WEEKLY_BRIEFING_TEMPLATE } = await getPromptsFromSupabase();

  return await createChatCompletion([
    {
      role: 'user',
      content: `Can you please generate a detailed summary based on your own analysis and understanding?
     Focus solely on creating the summary without utilizing any other capabilities. Please do the best you can using only the data I provide, do not mention or comment on any missing data or gaps.
     ${WEEKLY_BRIEFING_TEMPLATE}
      `
    },
    {
      role: 'user',
      content: `Here are all the memories from last week: ${
        weekMemories.map(memory => `${memory.created_at}: ${memory.value}`).join('\n')}`
    },
    {
      role: 'user',
      content: `Here are the calendar entries for the upcoming week: ${JSON.stringify(calendarEntries)}`
    },
    {
      role: 'user',
      content: `Here are todo changes from last week: ${JSON.stringify(todoChanges)}`
    },
    {
      role: 'user',
      content: `Here are the active projects with their to-do list. Each to-do has its own rank in terms of urgency: ${JSON.stringify(projectSummaries)}`
    }
  ])
}

async function readCalendarByProject({ name, shortname, aliases, startDate, endDate }) {
  const events = await readCalendar({ startDate, endDate })
  if (!name && !shortname && !aliases) return events
  return events.filter(event => {
    const summary = event.summary.toLowerCase()
    return summary.includes(name?.toLowerCase()) || summary.includes(shortname?.toLowerCase()) || aliases?.some(alias => summary.includes(alias?.toLowerCase()))
  })
}

async function processImportedConversations(uuids, startDate, endDate) {
  const uniqueIds = [...new Set(uuids)]
  const messages = [];
  const memories = [];
  for (const uuid of uniqueIds) {
    try {
      const channelMessageHistory = await getChannelMessageHistory({ channelId: uuid, startDate, endDate, limit: 30 });
      const memoryHistory = await getMemoriesByConversationID({ conversationID: uuid, startDate, endDate });
      channelMessageHistory.length > 0 && messages.push(`ConversationID ${uuid}. Message history: ${channelMessageHistory.map(message => ({
        value: message.value,
        assistant_response: message.assistant_response
      }))}`)
      memoryHistory.length > 0 && memories.push(`ConversationID ${uuid}. Memories: ${JSON.stringify(memoryHistory.map(message => ({ value: message.value })))}`)
    } catch (error) {
      logger.error(`Error processing UUID ${uuid}: ${error} ${error.stack}`);
    }
  }
  return { messages, memories };
}

async function listPendingTodos() {
  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .in('status', ['todo', 'backlog'])

  if (error) {
    logger.error(`Error retrieving todo changes: ${JSON.stringify(error)}`)
    return []
  }

  return data
}

async function generateDailyBriefing(calendarEntries, pendingTodos, projectBriefings) {
  const { DAILY_BRIEFING_TEMPLATE } = await getPromptsFromSupabase();
  const today = new Date()
  logger.info(`Generating daily briefing for: ${today}`)
  const messages = []

  messages.push({
    role: 'user',
    content: `Can you please generate a detailed summary for today briefing ${today} based on your own analysis and understanding?
     Focus solely on creating the summary without utilizing any other capabilities. Please do the best you can using only the data I provide, do not mention or comment on any missing data or gaps.
     ${DAILY_BRIEFING_TEMPLATE}
     `
  })

  messages.push({
    role: 'user',
    content: `Here are the calendar entries: ${JSON.stringify(calendarEntries)}`
  })

  messages.push({
    role: 'user',
    content: `Here are the pending todo changes as of today ${new Date()}: ${JSON.stringify(pendingTodos)}`
  })

  messages.push({
    role: 'user',
    content: `Here are the project briefings for today: ${
      projectBriefings?.map(briefing => `${briefing.content} of ${briefing.projects.name} project`).join('\n')
    }`
  })

  return await createChatCompletion(messages)
}

module.exports = {
  handleCapabilityMethod,
  makeBiweeklyProjectBriefing,
  makeWeeklyBriefing,
  makeProjectBriefing,
  makeDailyBriefing
}
