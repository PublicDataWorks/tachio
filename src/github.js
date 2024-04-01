const { supabaseTachio } = require("./supabaseclient");

const WEBHOOK_TABLE_NAME = "github_webhooks";

async function processGithubRequest(req) {
  const { error } = await supabaseTachio.from(WEBHOOK_TABLE_NAME).insert(processWebhookPayload(req));
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
    repository_updated_at: payload.repository?.updated_at,
  }
}

let encoder = new TextEncoder();

async function verifyGithubSignature(secret, header, payload) {
  let parts = header.split("=");
  let sigHex = parts[1];

  let algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };

  let keyBytes = encoder.encode(secret);
  let extractable = false;
  let key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    algorithm,
    extractable,
    ["sign", "verify"],
  );

  let sigBytes = hexToBytes(sigHex);
  let dataBytes = encoder.encode(payload);
  return await crypto.subtle.verify(
    algorithm.name,
    key,
    sigBytes,
    dataBytes,
  );
}

function hexToBytes(hex) {
  let len = hex.length / 2;
  let bytes = new Uint8Array(len);

  let index = 0;
  for (let i = 0; i < hex.length; i += 2) {
    let c = hex.slice(i, i + 2);
    let b = parseInt(c, 16);
    bytes[index] = b;
    index += 1;
  }

  return bytes;
}

module.exports = {
  processGithubRequest,
  verifyGithubSignature,
};
