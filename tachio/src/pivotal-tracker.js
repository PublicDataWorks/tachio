const { supabase } = require('./supabaseclient')
const { PROJECT_TABLE_NAME } = require("./constants");

const WEBHOOK_TABLE_NAME = "pivotal_tracker_webhooks";

async function processPTRequest(payload) {
  const { error: errorInsertWebhook } = await supabase.from(WEBHOOK_TABLE_NAME).insert(processWebhookPayload(payload));
  if (errorInsertWebhook) throw new Error(errorInsertWebhook.message)
}

function processWebhookPayload(payload) {
  return {
    occurred_at: new Date(payload.occurred_at),
    highlight: payload.highlight,
    primary_resources: payload.primary_resources,
    changes: payload.changes,
    message: payload.message,
    project_version: payload.project_version,
    performed_by: payload.performed_by,
    guid: payload.guid,
    kind: payload.kind,
    project_id: payload.project.id,
  }
}

module.exports = {
  processPTRequest,
};
