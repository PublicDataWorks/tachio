GRANT USAGE ON SCHEMA cron TO service_role;
GRANT all privileges ON all tables IN SCHEMA cron TO service_role;
GRANT EXECUTE ON FUNCTION cron.alter_job TO service_role;
