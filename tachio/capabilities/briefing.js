const dotenv = require('dotenv')
const dateFns = require('date-fns')
dotenv.config()
const {
  getRelevantMemories,
  getMemoriesBetweenDates,
  getMemoriesByString, getMemoriesByConversationID, getChannelMessageHistory
} = require('../src/remember')
const logger = require('../src/logger')('briefing')
const { listEventsBetweenDates } = require('./calendar.js') // Adjust the path as necessary

const { destructureArgs, countTokens } = require('../helpers')
const { supabase } = require('../src/supabaseclient')
const { PROJECT_TABLE_NAME, getActiveProjects } = require('./manageprojects')
const { DAILY_REPORT_TABLE_NAME } = require('../src/missive')
const { createChatCompletion } = require('../helpers')
const { addDays, addWeeks, subWeeks } = require("date-fns")

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
    // look for feedback on previous weekly summaries
    // const feedback = await retrieveFeedback();
    // TODO: Figure out the best way to incorporate this feedback into the summary generation

    // List all todo changes from this week (added, edited, deleted)
    const now = new Date();
    const weekLater = addWeeks(now, 1);
    const weekBefore = subWeeks(now, 1);
    const todoChanges = await listTodoChanges({ startDate: weekBefore, endDate: now });
    logger.info(`Found ${todoChanges.length} todo changes this week`);

    // Read the calendar for the upcoming week
    const calendarEntries = await readCalendar({ startDate: now, endDate: weekLater });
    logger.info(`Found ${calendarEntries.length} calendar entries this week`);

    const activeProjects = await getActiveProjects()
    return await generateMetaSummary({
      projectSummaries: activeProjects,
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
  try {
    return 'Daily briefing done!'
  } catch (error) {
    throw new Error(
      `Error occurred while trying to make daily briefing: ${error}`
    )
  }
}

/**
 * Makes a briefing on one particular project.
 * @param {String} projectName - The project name to make a briefing on.
 */
async function makeProjectBriefing(projectName) {
  const { data, error } = await supabase
    .from(PROJECT_TABLE_NAME)
    .select('id')
    .eq('name', projectName)
    .limit(1)
  if (error) throw new Error(`Error occurred while trying to fetch project in making project briefing ${projectName}: ${error.message}`)
  if (!data || data.length === 0) throw new Error(`Error occurred while trying to make project briefing: Project not found, ${projectName}`)
  const project = data[0]

  try {
    // Placeholder for project briefing logic
    const todoChanges = await listTodoChanges()
    const conversationMessages = await getChannelMessageHistory(project.id)
    const processedMemories = await getMemoriesByConversationID(project.id) // this includes attachments
    const calendarEntries = await readCalendarByProject({ name: projectName })
    const projectMemoryMap =
      await identifyProjectsInMemories(processedMemories)

    return await generateProjectSummary({
      projectName,
      projectMemoryMap,
      todoChanges,
      calendarEntries,
      memoriesMentioningProject
    })
  } catch (error) {
    throw new Error(
      `Error occurred while trying to make project briefing: ${error}`
    )
  }
}

/**
 * Makes a biweekly briefing.
 * @param {Array} projectName - The name of the project.
 * @returns {Promise<String>} A promise that resolves to a string indicating the status of the weekly briefing.
 * @example await makeWeeklyBriefing();
 */
async function makeBiweeklyProjectBriefing(projectName) {
  const { data: dataFetchProject, error } = await supabase
    .from(PROJECT_TABLE_NAME)
    .select('id, missive_conversation_id,shortname,aliases')
    .eq('name', projectName)
    .limit(1)
  if (error) throw new Error(`Error occurred while trying to fetch project in making biweekly project briefing ${projectName}: ${error.message}`)
  if (!dataFetchProject || dataFetchProject.length === 0) throw new Error(`Error occurred while trying to make biweekly project briefing ${projectName}: Project not found`)
  const project = dataFetchProject[0]

  const memoriesInProjectConversation = await getMemoriesByConversationID(project.missive_conversation_id)
  let projectAliases
  try {
    projectAliases = JSON.parse(project.aliases)
  } catch (e) {
    logger.error(`Error parsing project aliases: ${e} ${projectName} ${project.aliases}`)
  }

  const calendarEntries = await readCalendarByProject({
    name: projectName,
    shortname: project.shortname,
    aliases: projectAliases
  })
  const { data, errorFetchDailyReports } = await supabase
    .from(DAILY_REPORT_TABLE_NAME)
    .select('subject, content')
    .eq('project_id', project.id)
  if (errorFetchDailyReports) throw new Error(`Error occurred while trying to fetch daily reports in making biweekly project briefing: ${error.message}`)
  const dailyReports = data?.map(report => `Subject: ${report.subject}\nContent: ${report.content}`).join('\n\n') || ''

  return await generateProjectSummary({
    projectName: projectName,
    calendarEntries,
    memoriesInProjectConversation,
    dailyReports
  })
}

/**
 * Retrieves feedback on previous weekly summaries.
 * @returns {Promise<Array>} A promise that resolves to an array of feedback items.
 */
async function retrieveFeedback() {
  // Placeholder for feedback retrieval logic

  // query supabase for all memories with the feedback tag
  const { supabase } = require('../helpers')
  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .eq('tags', 'feedback')

  if (error) {
    console.error('Error retrieving feedback', error)
    return []
  }

  return data
}

/**
 * Identifies projects, project IDs, or project slugs mentioned in the memories.
 * @param {Array} processedMemories - The processed memories to identify projects in.
 * @returns {Promise<Array>} A promise that resolves to an array of project identifiers.
 */
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
      content: `We should add a new issue to coachartie - we had three conversations about it in #23ij2329, #sdijs, and #studio. We also had a long conversation about Project 2 in #studio.

In the previous message I just sent, please identify any GitHub Repos, Issues, Missive Conversations, or Projects. Please respond in the following format, newline-delimited with no other text:

- Discussion on Project 1: Missive#fkdf993ek9k93k
- Discussion on Project 2: Missive#fkdf993ek9k93k
      `
    },
    {
      role: 'assistant',
      content: `- Discussion on GitHub repo: GitHub#coachartie
- Discussion on Coach Artie: Missive#23ij2329
- Discussion on Coach Artie: Missive#sdijs
- Discussion on Coach Artie: Discord#studio
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

/**
 * Lists all todo changes from this week (added, edited, deleted).
 * @param {Date | undefined} startDate - A optional start date for the todo changes. Leave it empty to default to the current week.
 * @param {Date | undefined} endDate - A optional end date for the todo changes. Leave it empty to default to the current week.
 * @returns {Promise<Array>} A promise that resolves to an array of todo changes.
 */
async function listTodoChanges({ startDate, endDate } = {}) {
  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .gte('updated_at', startDate?.toISOString() || dateFns.startOfWeek(new Date()))
    .lte('updated_at', endDate?.toISOString() || dateFns.endOfWeek(new Date()))

  if (error) {
    logger.error(`Error retrieving todo changes: ${JSON.stringify(error)}`)
    return []
  }

  return data
}

/**
 * Reads the calendar for the current week.
 * @param {Date | undefined} startDate - An optional start date for the calendar entries, leave it empty to default to the current week.
 * @param {Date | undefined} endDate - An optional end date for the calendar entries, leave it empty to default to the current week.
 *
 * @returns {Promise<array>} A promise that resolves to an object containing calendar entries.
 */
async function readCalendar({ startDate, endDate }) {
  try {
    // Assuming you have a way to determine the calendarId. It could be an environment variable or a fixed value.
    const calendarIds = process.env.CALENDAR_IDS.split(',')
    const promises = calendarIds.map(async (calendarId) => {
      const events = await listEventsBetweenDates(
        calendarId,
        startDate || dateFns.subWeeks(new Date(), 1),
        endDate || dateFns.addWeeks(new Date(), 1)
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

/**
 * Generates summary by project.
 * @param {Object} worldInfoObject - An object containing information about the various projects.
 * @param {Array} worldInfoObject.projectName - The name of the project
 * @param {Array} worldInfoObject.todoChanges - An array of todo changes.
 * @param {Object} worldInfoObject.calendarEntries - An object containing calendar entries.
 * @param {Object} worldInfoObject.memoriesMentioningProject - A list of object containing relevant memories.
 * @param {Object} worldInfoObject.memoriesInProjectConversation - A list of object containing memories in the project conversation.
 * @param {String} worldInfoObject.dailyReports - A string aggregator of all daily reports of this project
 * @returns {Promise<String>} A promise that resolves to an array of project summaries.
 * @example await generateProjectSummary({ project, projectMemoryMap, todoChanges, calendarEntries });
 */
async function generateProjectSummary({
                                        projectName,
                                        projectMemoryMap,
                                        todoChanges,
                                        calendarEntries,
                                        memoriesMentioningProject,
                                        memoriesInProjectConversation,
                                        dailyReports
                                      }) {
  // Placeholder for project summary generation logic
  let messages = []

  if (projectName) {
    messages.push({
      role: 'user',
      content: `I want to generate a summary for project ${projectName}`
    })
  }

  if (projectMemoryMap && projectMemoryMap[projectName]) {
    messages.push({
      role: 'user',
      content: `Here are the memories for project ${
        projectName
      }: ${projectMemoryMap[projectName]
        .map((memory) => memory.value)
        .join('\n')}`
    })
  }

  if (todoChanges && todoChanges.length > 0) {
    messages.push({
      role: 'user',
      content: `Here are the todo changes for project ${
        projectName
      }: ${todoChanges.map((todo) => todo.content).join('\n')}`
    })
  }

  if (memoriesMentioningProject && memoriesMentioningProject.length > 0) {
    messages.push({
      role: 'user',
      content: `These memories reference the project: ${memoriesMentioningProject
        .map((memory) => memory.value)
        .join('\n')}`
    })
  }

  if (memoriesInProjectConversation && memoriesInProjectConversation.length > 0) {
    messages.push({
      role: 'user',
      content: `These memories in the project's conversation: ${memoriesInProjectConversation
        .map((memory) => memory.value)
        .join('\n')}`
    })
  }

  if (calendarEntries && Object.keys(calendarEntries).length > 0) {
    messages.push({
      role: 'user',
      content: `Here are the calendar entries for project ${
        projectName
      }: ${JSON.stringify(calendarEntries)}`
    })
  }

  if (dailyReports) {
    messages.push({
      role: 'user',
      content: `Here are daily reports for project ${dailyReports}`
    })
  }

  messages.push({
    role: 'user',
    content: `Can you please generate a detailed summary for Project ${projectName} based on your own analysis and understanding? Focus solely on creating the summary without utilizing any other capabilities. Be as detailed as possible.`
  })

  return await createChatCompletion(messages)
}

/**
 * Generates a meta-summary based on project summaries.
 * @param {Array} projectSummaries - The project summaries to base the meta-summary on.
 * @returns {Promise<String>} A promise that resolves to a string containing the meta-summary.
 */
async function generateMetaSummary({
                                     weekMemories,
                                     projectSummaries,
                                     todoChanges,
                                     calendarEntries
                                   }) {
  logger.info(`Generating meta-summary for projectSummaries: ${projectSummaries?.length}`)
  const messages = []
  if (weekMemories && weekMemories.length > 0) {
    logger.info(`First memory: ${JSON.stringify(weekMemories[0])}`)
    messages.push({
      role: 'user',
      content: `Here are all the memories from this week: ${weekMemories
        .map((memory) => {
          return `${memory.created_at}: ${memory.value}`
        })
        .join('\n')}`
    })
  }
  if (calendarEntries && calendarEntries.length > 0) {
    messages.push({
      role: 'user',
      content: `Here are the calendar entries for the upcoming week: ${JSON.stringify(calendarEntries)}`
    })
  }
  if (todoChanges && todoChanges.length > 0) {
    messages.push({
      role: 'user',
      content: `Here are todo changes from last week (added, edited, deleted): ${JSON.stringify(todoChanges)}`
    })
  }
  messages.push({
    role: 'user',
    content: `Here are the active projects with their to-dos. Each to-do has its own rank in terms of urgency: ${JSON.stringify(projectSummaries)}`
  })
  return await createChatCompletion([
    // {
    //   role: "user",
    //   content: `I want to generate a meta-summary based on the project summaries: ${projectSummaries.join("\n")}`,
    // // },
    // {
    //   role: "user",
    //   content: `Here are the todo changes: ${todoChanges.map((todo) => todo.content).join("\n")}`,
    // },
    // {
    //   role: "user",
    //   content: `Here are the calendar entries: ${JSON.stringify(calendarEntries)}`,
    // },
    ...messages,
    {
      role: 'user',
      content: `Can you please generate a meta-summary of this week? Be as detailed as possible.`
    }
  ])


  // return metaSummaryCompletion;
  // extract the response text from the openai chat completion
}

/**
 * Formats the fact-based summary through a weekly summary prompt/template.
 * @param {String} summary - The summary to format.
 * @returns {Promise<String>} A promise that resolves to a string containing the formatted summary.
 */
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

/**
 * Creates new posts or threads in communication platforms.
 * @param {String} message - The message to post.
 * @param {String} service - The service to post the message to - could be either `discord` or `missive` so far
 * @returns {Promise<void>}
 */
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

/**
 * Saves an archived copy of the weekly summary.
 * @param {String} summary - The summary to archive.
 * @returns {Promise<void>}
 */
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

// Helper functions
async function readCalendarByProject({ name, shortname, aliases }) {
  const events = await readCalendar({})
  if (!name && !shortname && !aliases) return events
  return events.filter(event => {
    const summary = event.summary.toLowerCase()
    return summary.includes(name?.toLowerCase()) || summary.includes(shortname?.toLowerCase()) || aliases?.some(alias => summary.includes(alias?.toLowerCase()))
  })
}

module.exports = {
  handleCapabilityMethod,
  makeBiweeklyProjectBriefing,
  makeWeeklyBriefing
}
