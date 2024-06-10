const logger = require('../src/logger.js')('init_briefings')
const { supabase: supabaseCron } = require("../capabilities/pgcron");
const {
  invokeWeeklyBriefing,
  invokeDailyBriefing
} = require("../src/cron-job");

const handler = async () => {
  const { data, error } = await supabaseCron
    .from('job')
    .select('jobid')
    .eq('jobname', 'weekly-briefing')
  if (error) throw new Error(error.message)
  if (data.length > 0) {
    throw new Error("Weekly briefing job is already running")
  }
  await invokeWeeklyBriefing()

  const { data: daily, error: errorDaily } = await supabaseCron
    .from('job')
    .select('jobid')
    .eq('jobname', 'daily-briefing')
  if (errorDaily) throw new Error(errorDaily.message)
  if (daily.length > 0) {
    throw new Error("Daily briefing job is already running")
  }
  await invokeDailyBriefing()
}

handler().then(() => {
  logger.info("Successfully initialized briefings")
  process.exit(0)
}).catch((err) => {
  logger.error(err.message)
  process.exit(1)
})
