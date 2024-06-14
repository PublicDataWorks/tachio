const { supabase } = require('./supabaseclient')
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


async function getPTWebhooks(pivotalTrackerId, startDate, endDate) {
  if (!pivotalTrackerId) return []
  const { data, error } = await supabase
    .from(WEBHOOK_TABLE_NAME)
    .select('kind, message, highlight, changes, primary_resources, performed_by')
    .eq('project_id', pivotalTrackerId)
    .gte('created_at', startDate)
    .lte('created_at', endDate)
  if (error) throw new Error(`Error occurred while trying to fetch Pivotal tracker webhook ${error.message}, ${startDate}`)
  return data || []
}

module.exports = {
  processPTRequest, getPTWebhooks
};
