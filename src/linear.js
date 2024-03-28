const {supabaseTachio} = require("./supabaseclient");

const WEBHOOK_TABLE_NAME = "linear_webhooks";
const PROJECT_TABLE_NAME = "linear_projects";
const TEAM_TABLE_NAME = "linear_teams";

async function processLinearRequest(payload) {
    if (payload.data.project) {
        const {error} = await supabaseTachio.from(PROJECT_TABLE_NAME).upsert({
            id: payload.data.project.id,
            name: payload.data.project.name,
        }, {onConflict: 'id', ignoreDuplicates: true});
        if (error) throw new Error(error.message)
    }

    if (payload.data.team) {
        const {error} = await supabaseTachio.from(TEAM_TABLE_NAME).upsert({
            id: payload.data.team.id,
            key: payload.data.team.key,
            name: payload.data.team.name,
        }, {onConflict: 'id', ignoreDuplicates: true});
        if (error) throw new Error(error.message)
    }
    const {error} = await supabaseTachio.from(WEBHOOK_TABLE_NAME).insert(processWebhookPayload(payload));
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
        project_id: payload.data.project.id,
        team_id: payload.data.team.id,
    }
}

module.exports = {
    processLinearRequest,
};
