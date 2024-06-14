const { parseJSONArg } = require('../helpers')
const { createSharedLabel, createPost } = require('../src/missive')
const { ORG_TABLE_NAME } = require('./manageorgs')
const { supabase } = require('../src/supabaseclient')
const { supabase: supabaseCron } = require('./pgcron')
const { invokeBiWeeklyBriefing, generateBiWeeklyBriefingJobName, invokeProjectBriefing } = require('../src/cron-job')
const { updateJob } = require('./pgcron')
const { PROJECT_TABLE_NAME } = require("../src/constants");
require('dotenv').config()

/**
 * Creates a new project of an organization
 *
 * @param {string} orgName - The name of the organization to which project belongs.
 * @param {string} projectName - The name of the project.
 * @param {string} shortname - The short name of the project. If not provided, the name is used and spaces are replaced with hyphens.
 * @param {string} aliases - a string in JSON format of an array that represents a list of aliases for the project.
 * @param {string} summary - The summary of the project.
 * @param {string} note - The note for the project.
 * @param {string} status - The status of the project, defaults to 'active'. Can be 'active', 'paused', 'completed', or 'archived'.
 * @param {string} startDate - The start date of the project.
 * @param {string} endDate - The end date of the project.
 * @param {string} linearTeamId - The Linear team ID of the project.
 * @param {string} pivotalTrackerId - The Pivotal tracker ID of the project.
 * @param {string} githubRepositoryUrls - A string in JSON format of an array that represents a list of GitHub repository that is linked to the project.
 * @returns {Promise<string>} A promise that resolves to a string message indicating the result of the operation.
 *
 * @throws {Error} If there is an error with the Supabase operations.
 */
async function createProject({
                               orgName,
                               projectName,
                               shortname,
                               aliases,
                               summary,
                               note,
                               status,
                               startDate,
                               endDate,
                               linearTeamId,
                               githubRepositoryUrls,
                               pivotalTrackerId
                             }) {
  if (!orgName || !projectName) throw new Error('Missing required fields')

  const { data: [org], error } = await supabase
    .from(ORG_TABLE_NAME)
    .select('id, missive_label_id')
    .match({ name: orgName })
  if (error) throw new Error(error.message)
  if (!org) throw new Error(`Org not found: ${orgName}`)

  const { data: existingProject } = await supabase
    .from(PROJECT_TABLE_NAME)
    .select('id')
    .or(`name.eq.${projectName},shortname.eq.${shortname}`)
  // ElectricSQL does not support unique constraints, so we need to do this manually
  if (existingProject.length > 0) throw new Error('Project already exists')

  const newLabel = await createSharedLabel({
    name: projectName,
    parent: org.missive_label_id,
    organization: process.env.MISSIVE_ORGANIZATION
  })
  const labelId = newLabel.shared_labels[0].id

  const newPost = await createPost({
    addSharedLabels: [labelId, process.env.MISSIVE_SHARED_LABEL],
    conversationSubject: projectName,
    username: process.env.BOT_NAME,
    usernameIcon: process.env.TACHIO_ICON,
    organization: process.env.MISSIVE_ORGANIZATION,
    notificationTitle: 'New project created',
    notificationBody: projectName,
    text: projectName
  })
  const conversationId = newPost.posts.conversation
  const newProjectID = crypto.randomUUID()
  const { error: errAddProject } = await supabase.from(PROJECT_TABLE_NAME).insert([
    {
      id: newProjectID,
      name: projectName,
      org_id: org.id,
      shortname: shortname || projectName.replace(/\s/g, '-'),
      aliases,
      summary,
      note,
      status: status || 'active',
      missive_conversation_id: conversationId,
      missive_label_id: labelId,
      start_date: startDate || new Date(),
      end_date: endDate,
      linear_team_id: linearTeamId,
      github_repository_urls: githubRepositoryUrls,
      pivotal_tracker_id: pivotalTrackerId,
      created_at: new Date() // ElectricSQL does not support default values
    }
  ])
  if (errAddProject) throw new Error(errAddProject.message)
  await invokeBiWeeklyBriefing(newProjectID)
  await invokeProjectBriefing(newProjectID)
  return `Successfully added project: ${projectName}`
}

/**
 * Update a project
 *
 * @param {string} projectName - The name of the project.
 * @param {string} newProjectName - The new name of the project.
 * @param {string} newAliases - a string in JSON format of an array that represents a list of new aliases for the project.
 * @param {string} newStatus - The new status of the project. Can be 'active', 'paused', 'completed', or 'archived'.
 * @param {string} newStartDate - The new start date of the project.
 * @param {string} newEndDate - The new end date of the project.
 * @param {string} newLinearTeamId - The new Linear team ID of the project.
 * @param {string} newPivotalTrackerId - The new Pivotal tracker ID of the project.
 * @param {string} newGithubRepositoryUrls - A string in JSON format of an array that represents a list of GitHub repository that is linked to the project.
 *
 * @returns {Promise<string>} A promise that resolves to a string message indicating the result of the operation.
 *
 * @throws {Error} If there is an error with the Supabase operations.
 */
async function updateProject({
                               projectName,
                               newProjectName,
                               newAliases,
                               newStatus,
                               newStartDate,
                               newEndDate,
                               newLinearTeamId,
                               newPivotalTrackerId,
                               newGithubRepositoryUrls
                             }) {
  if (!newProjectName && !newAliases && !newStatus && !newStartDate && !newEndDate && !newGithubRepositoryUrls && !newPivotalTrackerId)
    throw new Error('No changes made')

  const { data: existingProject } = await supabase
    .from(PROJECT_TABLE_NAME)
    .select('id')
    .eq('name', newProjectName)
  // ElectricSQL does not support unique constraints, so we need to do this manually
  if (existingProject.length > 0) throw new Error('Project already exists')

  const { data: [projectBefore], error } = await supabase
    .from(PROJECT_TABLE_NAME)
    .select('org_id, aliases, status, start_date, end_date')
    .match({ name: projectName })
  if (error) throw new Error(error.message)
  if (!projectBefore || projectBefore.length === 0) throw new Error('Project not found')
  const { error: errUpdateProject } = await supabase
    .from(PROJECT_TABLE_NAME)
    .update({
      name: newProjectName,
      aliases: newAliases,
      status: newStatus,
      start_date: newStartDate,
      end_date: newEndDate,
      updated_at: new Date(),
      linear_team_id: newLinearTeamId,
      pivotal_tracker_id: newPivotalTrackerId,
      github_repository_urls: newGithubRepositoryUrls
    })
    .match({ name: projectName })
  if (errUpdateProject) throw new Error(errUpdateProject.message)
  return `Successfully updated project: ${projectName}`
}

/**
 * Updates the status of a project.
 *
 * @param {string} name - The name of the project.
 * @param {string} newStatus - The new status of the project.
 *
 * @throws {Error} If the required fields are missing.
 *
 * @returns {Promise<string>} A promise that resolves to a string message indicating the result of the operation.
 */
async function updateProjectStatus({ name, newStatus }) {
  if (!name || !newStatus) throw new Error('Missing required fields')
  const { data: existingProject, error } = await supabase
    .from(PROJECT_TABLE_NAME)
    .select('id, status')
    .eq('name', name)
  if (error) throw new Error(error.message)
  if (existingProject.length === 0) throw new Error('Project not found')
  if (existingProject[0].status === newStatus) throw new Error(`Project already ${newStatus}`)

  const { error: errorUpdate } = await supabase
    .from(PROJECT_TABLE_NAME)
    .update({ status: newStatus })
    .eq('name', name)

  if (error) throw new Error(errorUpdate.message)
  if (newStatus === 'paused') {
    const { data, error } = await supabaseCron
      .from('job')
      .select('jobid')
      .eq('jobname', generateBiWeeklyBriefingJobName(existingProject[0].id))
    if (error) throw new Error(error.message)
    if (data.length === 0) throw new Error('Job not found')

    await updateJob(data[0].jobid, undefined, undefined, false)
  }
  return `Successfully ${newStatus} project: ${name}`
}

// Helper functions
async function getActiveProjects() {
  // Do not add JSdoc here, as this function is not exposed
  const { data, error } = await supabase
    .from(PROJECT_TABLE_NAME)
    .select('name, issues (*)')
    .eq('status', 'active')
  if (error) throw new Error(error.message)
  return data
}

module.exports = {
  handleCapabilityMethod: async (method, args) => {
    console.log(`⚡️ Calling capability method: manageprojects.${method}`)
    const arg = parseJSONArg(args)
    if (method === 'createProject') {
      return await createProject(arg)
    } else if (method === 'updateProject') {
      return await updateProject(arg)
    } else if (method === 'updateProjectStatus') {
      return await updateProjectStatus(arg)
    } else {
      throw new Error(`Invalid method: ${method}`)
    }
  },
  getActiveProjects
}
