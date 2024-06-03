const { createJob } = require('../capabilities/pgcron')
const { BIWEEKLY_BRIEFING, PROJECT_BRIEFING } = require("./constants")

const invokeWeeklyBriefing = async (projectId) => {
  const now = new Date();
  const everyWeekFromNow = `${now.getMinutes()} ${now.getHours()} * * ${now.getDay()}`;
  await createJob(
    everyWeekFromNow,
    `
      SELECT
        net.http_post(
            url:='${process.env.BACKEND_URL}${BIWEEKLY_BRIEFING}',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${process.env.SUPABASE_API_KEY}"}'::jsonb,
            body:=concat('{ "projectId": ', '"${projectId}" }')::jsonb
        ) AS request_id;
    `,
    generateWeeklyBriefingJobName(projectId)
  );
}

const invokeProjectBriefing = async (projectId) => {
  const cronExpression = '30 13 * * *'; // 5:30 AM PT every day
  await createJob(
    cronExpression,
    `
      SELECT
        net.http_post(
            url:='${process.env.BACKEND_URL}${PROJECT_BRIEFING}',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${process.env.SUPABASE_API_KEY}"}'::jsonb,
            body:=concat('{ "projectId": ', '"${projectId}" }')::jsonb
        ) AS request_id;
    `,
    `job-${projectId}-project-briefing`
  );
}

const generateWeeklyBriefingJobName = (projectId) => `job-${projectId}-weekly-briefing`;

module.exports = { invokeWeeklyBriefing, generateWeeklyBriefingJobName, invokeProjectBriefing }
