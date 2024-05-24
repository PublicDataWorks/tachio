const { supabase } = require("./supabaseclient");
const { PROJECT_TABLE_NAME } = require("../capabilities/manageprojects");

const WEBHOOK_TABLE_NAME = "linear_webhooks";
const LINEAR_PROJECT_TABLE_NAME = "linear_projects";

async function processLinearRequest(payload) {
  if (payload.data.project) {
    // Linear project is equivalent to a subproject in Tachio’s db
    const { error } = await supabase.from(LINEAR_PROJECT_TABLE_NAME).upsert({
      id: payload.data.project.id,
      name: payload.data.project.name,
      team_id: payload.data.team?.id,
    }, { onConflict: 'id', ignoreDuplicates: false });
    if (error) throw new Error(error.message)
  }
  if (payload.data.team) {
    // Linear team is equivalent to a project in Tachio’s db
    const { error } = await supabase
      .from(PROJECT_TABLE_NAME)
      .update({
        name: payload.data.team.name,
        shortname: payload.data.team.key,
      })
      .eq('linear_team_id', payload.data.team.id);
    if (error) throw new Error(error.message)
  }
  const { error } = await supabase.from(WEBHOOK_TABLE_NAME).insert(processWebhookPayload(payload));
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
    project_id: payload.data.project?.id,
    team_id: payload.data.team?.id,
  }
}

async function getLinearWebhooks(repositoryUrl, startDate, endDate) {
  const { data, error } = await supabase
    .from(WEBHOOK_TABLE_NAME)
    .select('type, data, url, updated_from, action, actor')
    .eq('repository_url', repositoryUrl)
    .gte('created_at', startDate)
    .lte('created_at', endDate)
  if (error) throw new Error(`Error occurred while trying to fetch linear webhook ${repositoryUrl}, ${startDate}, ${endDate}`)
  return data || []
}

module.exports = {
  processLinearRequest,
  getLinearWebhooks
};
