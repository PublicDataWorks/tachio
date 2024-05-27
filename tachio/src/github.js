const { supabase } = require("./supabaseclient");
const { PROJECT_TABLE_NAME } = require("../capabilities/manageprojects")
const dateFns = require("date-fns")

const WEBHOOK_TABLE_NAME = "github_webhooks";

async function processGithubRequest(req) {
  const { error } = await supabase.from(WEBHOOK_TABLE_NAME).insert(processWebhookPayload(req));
  if (error) throw new Error(error.message)
}

function processWebhookPayload(req) {
  const payload = req.body
  // repository.created_at is a number in some cases and a string representation of Date in others
  const repositoryCreatedAt = typeof (payload.repository?.created_at) === 'number' ? new Date(payload.repository.created_at * 1000) : payload.repository?.created_at
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
    repository_updated_at: payload.repository?.updated_at
  }
}

let encoder = new TextEncoder();

async function verifyGithubSignature(secret, header, payload) {
  const parts = header.split("=");
  const algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    algorithm,
    false,
    ["sign", "verify"]
  );

  const sigBytes = hexToBytes(parts[1]);
  const dataBytes = encoder.encode(payload);
  return await crypto.subtle.verify(
    algorithm.name,
    key,
    sigBytes,
    dataBytes
  );
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);

  let index = 0;
  for (let i = 0; i < hex.length; i += 2) {
    const c = hex.slice(i, i + 2);
    bytes[index] = parseInt(c, 16);
    index += 1;
  }
  return bytes;
}

async function getGithubWebhooks(repositoryUrl, startDate, endDate) {
  if (!repositoryUrl) return []
  const { data, error } = await supabase
    .from(WEBHOOK_TABLE_NAME)
    .select('type, action, target_type, repository_url, title, body')
    .eq('repository_url', repositoryUrl)
    .gte('created_at', startDate)
    .lte('created_at', endDate)
  if (error) throw new Error(`Error occurred while trying to fetch github webhook ${error.message}, ${repositoryUrl}`)
  return data || []
}

module.exports = {
  processGithubRequest,
  verifyGithubSignature,
  getGithubWebhooks
};
