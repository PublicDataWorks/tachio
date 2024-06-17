alter table "public"."daily_reports" add column "project_id" uuid;

alter table "public"."daily_reports" add constraint "public_daily_reports_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."daily_reports" validate constraint "public_daily_reports_project_id_fkey";

alter table "public"."projects" add column "last_sent_biweekly_briefing" timestamp with time zone;
