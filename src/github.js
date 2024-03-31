const {supabaseTachio} = require("./supabaseclient");

const WEBHOOK_TABLE_NAME = "github_webhooks";

async function processGithubRequest(req) {
    const {error} = await supabaseTachio.from(WEBHOOK_TABLE_NAME).insert(processWebhookPayload(req));
    if (error) throw new Error(error.message)
}

function processWebhookPayload(req) {
    const payload = req.body
    // repository.created_at is a number in some cases and a string representation of Date in others
    const repositoryCreatedAt =  typeof (payload.repository?.created_at) === 'number' ? new Date(payload.repository?.created_at * 1000) : payload.repository?.created_at
    return {
        type: req.headers['x-github-event'],
        action: payload.action,
        target_type: req.headers['x-github-hook-installation-target-type'],
        title: payload.issue?.title || payload.pull_request?.title,
        body: payload.body,
        issue_id: payload.issue?.id,
        sender_id: payload.sender.id,
        repository_url: payload.repository?.html_url || payload.issue?.repository_url,
        repository_created_at: repositoryCreatedAt,
        repository_updated_at: payload.repository?.updated_at,
    }
}

module.exports = {
    processGithubRequest,
};
