const { JSDOM } = require('jsdom')
const { supabase } = require('./supabaseclient')
const { anthropicThinkingRegex, notificationRegex } = require('../helpers')
const { PROJECT_TABLE_NAME, DAILY_REPORT_TABLE_NAME } = require("./constants");
const logger = require('./logger.js')('missive')
const DAILY_REPORT_REGEX = /Hi.*What has the team done since the last call\/email regarding this project\??(.*)What will the team do between now and the next call\/email regarding this project\??(.*)What impedes the team from performing their work as effectively as possible\??(.*)How much time have we spent today\??(.*)How much time have we spent this week.*How much time have we spent this month.*Our team today:?(.*)Regards/
const DESIGN_REGEX = /\[Design].*?billable (?:hour|day)\(s\)/
const DONE_TODAY_DESIGN_REGEX = /(?:\[?Design]?|\[?Designer]?).*/
/*

You must transmit your Missive user token as a Bearer token in the Authorization HTTP header.

You must explicitly send POST requests with Content-Type: application/json.

To interact with resources via the API, you will need those resource's ID. For instance, if you want to apply a label to a conversation when creating a post, you will need the label ID. You can get those resources IDs by opening the API settings and clicking on the Resource IDs tab.

To maintain the performance and reliability of our API we enforce the following rate limits on API requests:

Maximum of 5 concurrent requests at any given time
300 requests per minute (equivalent to 5 requests per second)
900 requests per 15 minutes (equivalent to 1 request per second)
When a rate limit is reached, Missive API will return the following HTTP error status code: 429 Too Many Requests with the following headers:

Resource IDs
Missive users: d27bfe89-c97c-449b-a1aa-f5895fd8e809
Accounts: 3f0c1186-c96a-488b-88b9-1e450c32679c
Organizations: 60461c87-dc2b-4a77-85e6-60b1a5012379



API Token:
${apiKey}


*/

/*
List conversations visible to the user who owns the API token. Must be filtered by mailbox, shared label or team.

Returns conversations ordered from newest to oldest activity. To paginate, pass an until param equal to the last_activity_at of the oldest conversation returned in the previous page. The last page is reached when fewer conversations than limit are returned or if all conversations in a page have the same last_activity_at.

Note that a page may return more conversations than limit.

{
  "conversations": [
    {
      "id": "6d3c9b1c-7067-4a28-8ea6-ea91340b67cc",
      "created_at": 1654544954,
      "subject": null,
      "latest_message_subject": "Question?",
      "organization": {
        "id": "96cafdc6-ec6a-4439-9b0c-f55a1133b1e7",
        "name": "Conference Badge"
      },
      "color": null,
      "assignees": [],
      "users": [
        {
          "id": "dc3c4104-eced-4206-b532-ef84b331778a",
          "name": "Chad Zemlak",
          "email": "chad@conferencebade.com",
          "unassigned": false,
          "closed": false,
          "archived": false,
          "trashed": false,
          "junked": false,
          "assigned": false,
          "flagged": true,
          "snoozed": false
        }
      ],
      "attachments_count": 0,
      "messages_count": 1,
      "authors": [],
      "drafts_count": 0,
      "send_later_messages_count": 0,
      "tasks_count": 0,
      "completed_tasks_count": 0,
      "web_url": "https://mail.missiveapp.com/#inbox/conversations/6d3c9b1c-7067-4a28-8ea6-ea91340b67cc",
      "app_url": "missive://mail.missiveapp.com/#inbox/conversations/6d3c9b1c-7067-4a28-8ea6-ea91340b67cc",
      "assignee_names": "",
      "assignee_emails": "",
      "shared_label_names": "",
      "last_activity_at": 1654544954,
      "team": {
        "id": "f36b7570-078e-408e-9cb8-2b4441ad93c0",
        "name": "Team 1",
        "organization": "96cafdc6-ec6a-4439-9b0c-f55a1133b1e7"
      },
      "shared_labels": []
    }
  ]
}

# Params

Name	Description
limit	Number of conversations returned. Default: 25. Max: 50
until	Timestamp value in Unix time used to paginate. Use the last_activity_at of the oldest conversation from previous page.
inbox	Pass true to list conversations in the Inbox.
all	Pass true to list conversations in the All mailbox.
assigned	Pass true to list conversations in Assigned to me.
closed	Pass true to list conversations in Closed.
snoozed	Pass true to list conversations in Snoozed.
flagged	Pass true to list conversations in Starred.
trashed	Pass true to list conversations in Trash.
junked	Pass true to list conversations in Spam.
shared_label	Shared label ID. List conversations in the shared label.
team_inbox	Team ID. List conversations in the team’s Inbox.
team_closed	Team ID. List conversations in the team’s Closed mailbox.
team_all	Team ID. List conversations in the team’s All mailbox.
organization	Organization ID. Filter conversations to only those shared with the organization.

There is no use to the organization param when passing a shared_label or team_ param.
*/

// require dotenv
require('dotenv').config()
const apiFront = 'https://public.missiveapp.com/v1'
const apiKey = process.env.MISSIVE_API_KEY
const BOT_NAME = process.env.BOT_NAME

async function listConversations() {
  let url = `${apiFront}/conversations`

  // add params
  const params = {
    limit: 50,
    all: true
  }

  url += '?'
  for (let key in params) {
    url += `${key}=${params[key]}&`
  }

  const options = {
    method: 'GET',

    headers: {
      // "Content-Type": "application/json",
      Host: 'public.missiveapp.com',
      Authorization: `Bearer ${apiKey}`
    }
  }

  const response = await fetch(url, options)
  const data = await response.json()
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return data
}

/*
GET /v1/messages?email_message_id=Message-ID

Fetch messages matching an email Message-ID.
*/

async function listConversationMessages(emailMessageId) {
  let url = `${apiFront}/conversations/${emailMessageId}/messages`
  const response = await fetch(url, missiveOptions())
  const data = await response.json()
  // add a 1ms delay to avoid rate limiting
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return data
}

// const messages = listConversationMessages(conversationId).then((data) => {
//   console.log(data);
// });

/*
GET /v1/messages/id

Fetch a specific message headers, body and attachments using the message id.

{
  "messages": {
    "id": "3fa4bcf5-e57e-47a4-9422-de2cce5f802e",
    "subject": "A Message",
    "preview": "A message from Sam",
    "type": "email",
    "delivered_at": 1563806347,
    "updated_at": 1563807320,
    "created_at": 1563807320,
    "email_message_id": "<0f1ab2d8-cd90-4dd1-a861-ef7e31fb3cdd@missiveapp.com>",
    "in_reply_to": [],
    "references": [],
    "body": "<div>A message from Sam</div><br><img style=\"max-width: 100%\" alt=\"inline-image.png\" data-missive-attachment-id=\"81eed561-4908-4738-9a9f-2da886b1de43\">",
    "from_field": {
      "name": "Samwise Gamgee",
      "address": "sam@fellowship.org"
    },
    "to_fields": [
      {
        "name": "Phil Smith",
        "address": "phil.smith@fakemail.com"
      }
    ],
    "cc_fields": [],
    "bcc_fields": [],
    "reply_to_fields": [],
    "attachments": [
      {
        "id": "81eed561-4908-4738-9a9f-2da886b1de43",
        "filename": "inline-image.png",
        "extension": "png",
        "url": "https://...",
        "media_type": "image",
        "sub_type": "png",
        "size": 114615,
        "width": 668,
        "height": 996
      }
    ],
    "conversation": {
      "id": "47a57b76-df42-4d8k-927x-80dbe5d87191",
      "subject": null,
      "latest_message_subject": "A Message",
      "organization": {
        "id": "93e5e5d5-11a2-4c9b-80b8-94f3c08068cf",
        "name": "Fellowship"
      },
      "team": {
        "id": "2f618f9e-d3d4-4a01-b7d5-57124ab366b8",
        "name": "Hobbits",
        "organization": "93e5e5d5-11a2-4c9b-80b8-94f3c08068cf"
      },
      "color": null,
      "assignees": [
        {
          "id": "6b52b6b9-9b51-46ad-a4e3-82ef3c45512c",
          "name": "Frodo Baggins",
          "email": "frodo@fellowship.org",
          "unassigned": false,
          "closed": false,
          "archived": false,
          "trashed": false,
          "junked": false,
          "assigned": true,
          "flagged": false,
          "snoozed": true
        }
      ],
      "assignee_names": "Frodo Baggins",
      "assignee_emails": "frodo@fellowship.org",
      "users": [
        {
          "id": "6b52b6b9-9b51-46ad-a4e3-82ef3c45512c",
          "name": "Frodo Baggins",
          "email": "frodo@fellowship.org",
          "unassigned": false,
          "closed": false,
          "archived": false,
          "trashed": false,
          "junked": false,
          "assigned": true,
          "flagged": false,
          "snoozed": true
        }
      ],
      "attachments_count": 0,
      "messages_count": 1,
      "authors": [
        {
          "name": "Samwise Gamgee",
          "address": "sam@fellowship.org"
        }
      ],
      "drafts_count": 0,
      "send_later_messages_count": 0,
      "tasks_count": 0,
      "completed_tasks_count": 0,
      "shared_labels": [
        {
          "id": "146ff5c4-d5la-3b63-b994-76711fn790lq",
          "name": "Elfs"
        }
      ],
      "shared_label_names": "Elfs",
      "app_url": "missive://mail.missiveapp.com/#inbox/conversations/47a57b76-df42-4d8k-927x-80dbe5d87191",
      "web_url": "https://mail.missiveapp.com/#inbox/conversations/47a57b76-df42-4d8k-927x-80dbe5d87191"
    }
  }
}
*/

async function getMessage(messageId) {
  const url = `${apiFront}/messages/${messageId}`
  const response = await fetch(url, missiveOptions())
  return response.json()
}

/*
GET /v1/shared_labels

List shared labels in organizations the authenticated user is part of.

{
  "shared_labels": [
    {
      "id": "b45a00fd-353s-89l2-a487-2465c35c3r91",
      "color": null,
      "name": "Invoices",
      "name_with_parent_names": "Invoices",
      "organization": "0d9bab85-a74f-4ece-9142-0f9b9f36ff92"
    }
  ]
}
*/
async function listSharedLabels() {
  const url = `${apiFront}/shared_labels`
  const response = await fetch(url, missiveOptions())
  return response.json()
}

async function createSharedLabel({ name, organization, parent, shareWithOrganization }) {
  const url = `${apiFront}/shared_labels`
  const body = JSON.stringify({
    shared_labels: [{
      name,
      organization,
      parent,
      share_with_organization: shareWithOrganization
    }]
  })
  const response = await fetch(url, missiveOptions(body, 'POST'))
  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Error creating shared label. HTTP status: ${response.status}, status text: ${response.statusText}, body: ${errorBody}`)
  }
  const responseBody = await response.json()
  logger.info(`Response createPost status: ${response.status}`)
  logger.info(`Response createPost body: ${JSON.stringify(responseBody)}`)
  return responseBody
}


async function createPost({
                            conversationSubject,
                            username,
                            usernameIcon,
                            organization,
                            addSharedLabels,
                            notificationTitle,
                            notificationBody = '',
                            text,
                            markdown,
                            conversation,
                            add_users,
                            add_assignees
                          }) {
  const url = `${apiFront}/posts`
  const body = JSON.stringify({
    posts: {
      conversation_subject: conversationSubject,
      username,
      organization,
      username_icon: usernameIcon,
      add_shared_labels: addSharedLabels,
      text,
      markdown,
      conversation,
      add_users,
      add_assignees,
      notification: {
        title: notificationTitle,
        body: notificationBody
      }
    }
  })
  const response = await fetch(url, missiveOptions(body, 'POST'))
  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Error creating post. HTTP status: ${response.status}, status text: ${response.statusText}, body: ${errorBody}`)
  }
  const responseBody = await response.json()
  logger.info(`Response createPost status: ${response.status}`)
  logger.info(`Response createPost body: ${JSON.stringify(responseBody)}`)
  return responseBody
}

/*
GET /v1/users

List users in organizations the authenticated user is part of.

Response example:

{
  "users": [
    {
      "id": "a41a00fd-453d-49d7-a487-9765c35a3b70",
      "me": true,
      "email": "philippe@missiveapp.com",
      "name": "Philippe Lehoux",
      "avatar_url": "https://...",
    }
  ]
}
*/

async function listUsers() {
  const url = `${apiFront}/users`
  const response = await fetch(url, missiveOptions())
  return response.json()
}

async function processDailyReport(payload) {
  if (!payload.rule.description.toLowerCase().includes('daily report')) return

  const { id: messageId, subject } = payload.message
  // Body payload is only a summary of the content, we need to fetch the full message
  const message = await getMessage(messageId)
  // It's in HTML format
  const dom = new JSDOM(message.messages.body)
  const listItems = dom.window.document.querySelectorAll('li')
  // Append a space after each list item, otherwise the text will be concatenated
  listItems.forEach(li => {
    const space = dom.window.document.createTextNode('. ')
    li.appendChild(space)
  })
  const text = dom.window.document.body.textContent
  const match = text.match(DAILY_REPORT_REGEX)

  const doneToday = match ? match[1].trim() : ''
  const designerDoneTodayMatch = doneToday.match(DONE_TODAY_DESIGN_REGEX)
  const designerDoneToday = designerDoneTodayMatch ? designerDoneTodayMatch[0] : ''
  const otherDoneToday = doneToday.replace(designerDoneToday, '')

  const willDo = match ? match[2].trim() : ''
  const designerWillDoMatch = willDo.match(DONE_TODAY_DESIGN_REGEX)
  const designerWillDo = designerWillDoMatch ? designerWillDoMatch[0] : ''
  const otherWillDo = willDo.replace(designerWillDo, '')

  const impedes = match ? match[3].trim() : ''
  const teamToday = match ? match[5].trim() : ''

  const timeSpentToday = match ? match[4].trim() : ''
  const designMatch = timeSpentToday.match(DESIGN_REGEX)
  const designerTimeSpentToday = designMatch ? designMatch[0] : ''
  const developerTimeSpentToday = timeSpentToday.replace(designerTimeSpentToday, '')

  const sharedLabelIDs = payload.conversation.shared_labels?.map(label => label.id)
  const { data } = await supabase
    .from(PROJECT_TABLE_NAME)
    .select('id')
    .in('missive_label_id', sharedLabelIDs)
    .limit(1)
  const projectId = data?.[0]?.id

  const { error } = await supabase.from(DAILY_REPORT_TABLE_NAME).insert([
    {
      subject,
      developer_done_today: otherDoneToday,
      designer_done_today: designerDoneToday,
      developer_will_do: otherWillDo,
      designer_will_do: designerWillDo,
      impedes,
      developer_time_spent_today: developerTimeSpentToday,
      designer_time_spent_today: designerTimeSpentToday,
      team_today: teamToday,
      content: text,
      project_id: projectId
    }
  ])
  if (error) throw new Error(error.message)
}

async function sendMissiveResponse({ message, conversationId, notificationTitle, conversationSubject, organization, addToInbox, requestQuery }) {
  // Separate thinking part out of result part of Claude's message
  const messageMatches = message.match(anthropicThinkingRegex)
  let notification = {
    title: notificationTitle || BOT_NAME,
    body: ''
  }
  const attachments = []
  if (messageMatches && messageMatches.length > 2) {
    // Thinking part is always presented
    attachments.push({
      'text': messageMatches[1].trim(),
      'timestamp': Math.floor(Date.now() / 1000)
    })
    let resultPart = messageMatches[2]
    const notificationMatches = resultPart.match(notificationRegex)
    if (notificationMatches) {
      resultPart = resultPart.replace(notificationMatches[0], '').trim()
      try {
        notification = JSON.parse(notificationMatches[1])
      } catch (error) {
        logger.error('Error parsing notification:', error, notificationMatches[1])
      }
    }
    // Add result part
    resultPart.trim().split('---')
      .filter(paragraph => paragraph.trim())
      .forEach((paragraph, index) => {
        attachments.push({
          'color': '#2266ED',
          'text': paragraph.trim(), // TODO: replace with markdown
          'timestamp': Math.floor(Date.now() / 1000) + 1 + index // Add index to avoid duplicate timestamps // TODO: removeme
        })
      })
  }
  const token = (requestQuery?.token?.length === 36) ? requestQuery.token : apiKey
  const responsePost = await fetch(`${apiFront}/posts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      posts: {
        conversation_subject: conversationSubject,
        conversation: conversationId,
        notification,
        username: BOT_NAME,
        attachments,
        markdown: attachments.length > 0 ? undefined : message,
        organization,
        add_to_inbox: addToInbox
      }
    })
  })
  const response = await responsePost.json()
  // Log the response status and body from the Missive API
  logger.info(`Response post status: ${responsePost.status}`)
  logger.info(`Response post body: ${JSON.stringify(response)}`)
  return response
}

function missiveOptions(body = undefined, method = 'GET') {
  return {
    body,
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }
}

module.exports = {
  createSharedLabel, createPost, processDailyReport, sendMissiveResponse
}
