const invokeWeeklyBriefing = (projectID, path) => {
  const now = new Date();
  const everyWeekFromNow = `${now.getMinutes()} ${now.getHours()} * * ${now.getDay()}`;
  return `
    SELECT cron.schedule(
      'invoke-biweekly-briefing',
      '${everyWeekFromNow}',
      $$
        SELECT net.http_get(
          url:='${process.env.BACKEND_URL}${path}?projectID=${projectID}',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${process.env.SUPABASE_API_KEY}"}'::jsonb) as request_id;
      $$
    );
  `
}

export { invokeWeeklyBriefing }
