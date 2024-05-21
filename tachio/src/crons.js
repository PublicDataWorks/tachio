const { createJob } = require('../capabilities/pgcron')

const invokeWeeklyBriefing = async (projectID, path) => {
  const now = new Date();
  const everyWeekFromNow = `${now.getMinutes()} ${now.getHours()} * * ${now.getDay()}`;
  await createJob(
    everyWeekFromNow,
    `
      SELECT
        net.http_post(
            url:='${process.env.BACKEND_URL}${path}',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${process.env.SUPABASE_API_KEY}"}'::jsonb,
            body:=concat('{ "projectID": ', '"${projectID}" }')::jsonb
        ) AS request_id;
    `,
    generateJobName(projectID)
  );
}

const generateJobName = (projectID) => `job-${projectID}-weekly-briefing`;

module.exports = { invokeWeeklyBriefing, generateJobName }
