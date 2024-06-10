const { createJob } = require('../capabilities/pgcron')
const { BIWEEKLY_BRIEFING, PROJECT_BRIEFING, WEEKLY_BRIEFING, DAILY_BRIEFING } = require("./constants")

// Used to trigger biweekly briefing
const invokeBiWeeklyBriefing = async (projectId) => {
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
    generateBiWeeklyBriefingJobName(projectId)
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
    `project-briefing-${projectId}`
  );
}

const invokeWeeklyBriefing = async () => {
  const cronExpression = '0 6 * * 0'; // 6:00 AM PT every Sunday
  // Removing the Content-Type header causes it to not work
  await createJob(
    cronExpression,
    `
      SELECT
        net.http_post(
            url:='${process.env.BACKEND_URL}${WEEKLY_BRIEFING}',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${process.env.SUPABASE_API_KEY}"}'::jsonb
        ) AS request_id;
    `,
    'weekly-briefing'
  );
}

const invokeDailyBriefing = async () => {
  const cronExpression = '0 6 * * *'; // 6:00 AM PT every day
  await createJob(
    cronExpression,
    `
      SELECT
        net.http_post(
            url:='${process.env.BACKEND_URL}${DAILY_BRIEFING}',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${process.env.SUPABASE_API_KEY}"}'::jsonb
        ) AS request_id;
    `,
    'daily-briefing'
  );
}

const generateBiWeeklyBriefingJobName = (projectId) => `biweekly-briefing-${projectId}`;

module.exports = { invokeBiWeeklyBriefing, generateBiWeeklyBriefingJobName, invokeProjectBriefing, invokeWeeklyBriefing, invokeDailyBriefing }
