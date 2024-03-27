const { supabaseTachio } = require("./supabaseclient");

const LINEAR_TABLE_NAME = "linear_webhooks";

async function processLinearRequest(body) {
  const { error } = await supabaseTachio.from(LINEAR_TABLE_NAME).insert(processWebhookPayload(body));
  if (error) throw new Error(error.message)
}

function processWebhookPayload(payload) {
  return {
    updated_from: payload.updatedFrom,
    action: payload.action,
    actor: payload.actor,
    created_at: payload.createdAt,
    data: payload.data,
    type: payload.type,
    organization_id: payload.organizationId,
    webhook_timestamp: new Date(payload.webhookTimestamp),
    webhook_id: payload.webhookId,
  }
}

module.exports = {
  processLinearRequest,
};
