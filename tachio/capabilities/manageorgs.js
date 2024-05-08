const { parseJSONArg } = require('../helpers')
const { createSharedLabel, createPost } = require('../src/missive')
const { supabase } = require('../src/supabaseclient')
require('dotenv').config()

const ORG_TABLE_NAME = 'orgs'
const EMAIL_TABLE_NAME = 'emails'
const ORG_EMAIL_TABLE_NAME = 'org_secondary_emails'

/**
 * Creates a new organization, label and post
 *
 * @param {string} name - The name of the organization.
 * @param {string} shortname - The short name of the organization. If not provided, the name is used and spaces are replaced with hyphens.
 * @param {string} aliases - a string in JSON format of an array that represents a list of aliases for an organization.
 * @param {string} summary - The summary of the organization.
 * @param {string} note - The note for the organization.
 * @param {string} firstContact - The date of the first contact with the organization. If not provided, the current date is used.
 * @param {string} primaryEmailAddress - The primary email address of the organization.
 * @param {Array} secondaryEmailAddresses - The email addresses of the organization.
 * @param {string} linearId - The Linear ID of the organization.
 * @param {string} githubId - The GitHub ID of the organization.
 * @param {string} pivotalTrackerId - The Pivotal Tracker ID of the organization.
 *
 * @returns {Promise<string>} A promise that resolves to a string message indicating the result of the operation.
 *
 * @throws {Error} If there is an error with the Supabase operations.
 */
async function createOrg({
                           name,
                           shortname,
                           aliases,
                           summary,
                           note,
                           firstContact,
                           primaryEmailAddress,
                           secondaryEmailAddresses,
                           linearId,
                           githubId,
                           pivotalTrackerId
                         }) {
  if (!name) throw new Error('Missing required fields')
  const { data: existingOrg } = await supabase
    .from(ORG_TABLE_NAME)
    .select('id')
    .or(`name.eq.${name},shortname.eq.${shortname}`)
  // ElectricSQL does not support unique constraints, so we need to do this manually
  if (existingOrg.length > 0) throw new Error('Organization already exists')

  const newLabel = await createSharedLabel({
    name,
    shareWithOrganization: true,
    organization: process.env.MISSIVE_ORGANIZATION
  })
  const labelId = newLabel.shared_labels[0].id

  const newPost = await createPost({
    addSharedLabels: [labelId, process.env.MISSIVE_SHARED_LABEL],
    conversationSubject: name,
    username: process.env.BOT_NAME,
    usernameIcon: process.env.TACHIO_ICON,
    organization: process.env.MISSIVE_ORGANIZATION,
    notificationTitle: 'New org',
    notificationBody: name,
    text: name
  })

  let addedEmails = []
  if (primaryEmailAddress || secondaryEmailAddresses) {
    const emailAddresses = [primaryEmailAddress, ...(secondaryEmailAddresses || [])]
    // ElectricSQL does not support unique constraints, so we need to do this manually
    const { data: existingEmails } = await supabase
      .from(EMAIL_TABLE_NAME)
      .select('id, email_address')
      .in('email_address', emailAddresses)

    // Get the email addresses that are not already in the database
    const newEmailAddresses = emailAddresses.filter(
      newEmail => !existingEmails.some(existingEmail => existingEmail.email_address === newEmail)
    ).map(emailAddress => ({ id: crypto.randomUUID(), email_address: emailAddress, created_at: new Date() }))

    const { data, error } = await supabase
      .from(EMAIL_TABLE_NAME)
      .insert(newEmailAddresses)
      .select('id, email_address')
    if (error) throw new Error(error.message)
    addedEmails = [...existingEmails, ...data]
  }

  let primaryEmailId = addedEmails.find(email => email.email_address === primaryEmailAddress)?.id
  if (!primaryEmailId) {
    // If the primary email address is not in the newly added emails, it must already exist
    const { data: primaryEmail } = await supabase.from(EMAIL_TABLE_NAME).select('id').eq('email_address', primaryEmailAddress)
    primaryEmailId = primaryEmail[0].id
  }
  const { data, error } = await supabase.from(ORG_TABLE_NAME).insert([
    {
      id: crypto.randomUUID(),
      name,
      shortname: shortname || name.replace(/\s/g, '-'),
      aliases,
      summary,
      note,
      missive_conversation_id: newPost.posts.conversation,
      missive_label_id: labelId,
      first_contact: firstContact || new Date(),
      primary_email_address_id: primaryEmailId,
      linear_id: linearId,
      github_id: githubId,
      pivotal_tracker_id: pivotalTrackerId,
      created_at: new Date()
    }
  ]).select('id')
  if (error) throw new Error(error.message)

  const orgEmails = addedEmails.filter(email => email.email_address !== primaryEmailAddress).map(email => ({
    email_id: email.id,
    org_id: data[0].id
  }))
  if (orgEmails.length > 0) {
    const { error: orgEmailError } = await supabase.from(ORG_EMAIL_TABLE_NAME).insert(orgEmails)
    if (orgEmailError) throw new Error(orgEmailError.message)
  }
  return `Successfully added org: ${name}`
}


/**
 * Updates an existing organization in the database and sends a notification.
 *
 * @param {string} name - The current name of the organization.
 * @param {string} newName - The new name of the organization.
 * @param {string} newAliases - a string in JSON format of an array that represents a list of new aliases for the organization
 * @param {string} newFirstContact - The new date of the first contact with the organization.
 *
 * @returns {Promise<string>} A promise that resolves to a string message indicating the result of the operation.
 *
 * @throws {Error} If there is an error with the Supabase operations.
 */
async function updateOrg({ name, newName, newAliases, newFirstContact }) {
  if (!newName && !newAliases && !newFirstContact) return 'No changes made'

  const { data: [orgBefore], error: errorGetOrg } = await supabase
    .from(ORG_TABLE_NAME)
    .select('name, aliases, first_contact, missive_conversation_id')
    .match({ name })
  if (errorGetOrg) throw new Error(errorGetOrg.message)
  if (
    (!newName || newName === name) &&
    (!newAliases || JSON.stringify(newAliases) === JSON.stringify(orgBefore.aliases)) &&
    (!newFirstContact || newFirstContact === orgBefore.first_contact)
  ) return 'No changes made'

  const { error } = await supabase
    .from(ORG_TABLE_NAME)
    .update({ name: newName, aliases: newAliases, first_contact: newFirstContact, updated_at: new Date() })
    .match({ name })
  if (error) throw new Error(error.message)

  const updateNotificationParts = []
  if (newName) {
    name = newName
    updateNotificationParts.push(`- Org updated: ${orgBefore.name} changed to ${newName}`)
  }
  if (newAliases) {
    updateNotificationParts.push(`- ${name} alias added: ${newAliases}`)
    updateNotificationParts.push(`- ${name} alias removed: ${orgBefore.aliases}`)
  }
  if (newFirstContact) {
    updateNotificationParts.push(`- First contact with ${name} on ${newFirstContact}`)
  }
  const updateNotificationMarkdown = updateNotificationParts.join('\n')
  await createPost({
    notificationTitle: 'Update org',
    notificationBody: 'Update org',
    markdown: updateNotificationMarkdown,
    conversation: orgBefore.missive_conversation_id
  })
  return updateNotificationMarkdown
}

module.exports = {
  handleCapabilityMethod: async (method, args) => {
    console.log(`⚡️ Calling capability method: manageorgs.${method}`)
    const arg = parseJSONArg(args)
    if (method === 'createOrg') {
      return await createOrg(arg)
    } else if (method === 'updateOrg') {
      return await updateOrg(arg)
    } else {
      throw new Error(`Invalid method: ${method}`)
    }
  },
  ORG_TABLE_NAME
}
