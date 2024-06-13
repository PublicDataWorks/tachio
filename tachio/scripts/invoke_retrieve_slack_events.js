const logger = require('../src/logger.js')('init_briefings')
const { supabase: supabaseCron } = require('../capabilities/pgcron');
const { invokeRememberizer } = require('../src/cron-job');

const handler = async () => {
  const { data, error } = await supabaseCron
    .from('job')
    .select('jobid')
    .eq('jobname', 'rememberizer')
  if (error) throw new Error(error.message)
  if (data.length > 0) {
    throw new Error('Rememberizer job is already running')
  }
  await invokeRememberizer()
}

handler().then(() => {
  logger.info('Successfully initialized rememberizer job')
  process.exit(0)
}).catch((err) => {
  logger.error(err.message)
  process.exit(1)
})
