create extension if not exists "fuzzystrmatch" with schema "extensions";

create extension if not exists "http" with schema "extensions";

create extension if not exists "insert_username" with schema "extensions";

create extension if not exists "moddatetime" with schema "extensions";

create extension if not exists "pg_cron" with schema "extensions";

create extension if not exists "pgaudit" with schema "extensions";

create extension if not exists "unaccent" with schema "extensions";

create extension if not exists "vector" with schema "extensions";


create table "public"."config" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "config_key" text not null,
    "config_value" text not null,
    "history" jsonb default '[]'::jsonb
);


create table "public"."memories" (
    "id" bigint generated by default as identity not null,
    "embedding" vector(1536),
    "embedding2" vector(1024),
    "embedding3" vector(1536),
    "created_at" timestamp with time zone default now(),
    "key" text,
    "value" text,
    "user_id" text,
    "resource_id" text,
    "memory_type" text,
    "related_message_id" bigint,
    "conversation_id" text
);


create table "public"."messages" (
    "id" bigint generated by default as identity not null,
    "embedding" vector(1536),
    "created_at" timestamp with time zone default now(),
    "key" text,
    "value" text,
    "user_id" text,
    "channel_id" text,
    "guild_id" text,
    "conversation_id" text,
    "response_id" bigint
);


create table "public"."prompts" (
    "id" integer generated by default as identity not null,
    "prompt_name" text,
    "prompt_text" text,
    "notes" text,
    "type" text,
    "active" boolean,
    "updated_at" timestamp with time zone not null default now(),
    "archived" boolean default false,
    "history" jsonb default '[]'::jsonb,
    "created_at" timestamp with time zone not null default now()
);


CREATE UNIQUE INDEX config_config_key_key ON public.config USING btree (config_key);

CREATE UNIQUE INDEX config_pkey ON public.config USING btree (id);

CREATE UNIQUE INDEX memories_pkey ON public.memories USING btree (id);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id);

CREATE UNIQUE INDEX prompts_pkey ON public.prompts USING btree (id);

alter table "public"."config" add constraint "config_pkey" PRIMARY KEY using index "config_pkey";

alter table "public"."memories" add constraint "memories_pkey" PRIMARY KEY using index "memories_pkey";

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."prompts" add constraint "prompts_pkey" PRIMARY KEY using index "prompts_pkey";

alter table "public"."config" add constraint "config_config_key_key" UNIQUE using index "config_config_key_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.ddlx_get_dependants(oid, OUT depth integer, OUT classid regclass, OUT objid oid)
 RETURNS SETOF record
 LANGUAGE sql
AS $function$
with recursive
  tree(depth,classid,objid,objsubid,refclassid,refobjid,refobjsubid,deptype,edges)
as (
select 1,
       case when r.oid is not null then 'pg_class'::regclass
            else d.classid::regclass
       end as classid,
       coalesce(r.ev_class,d.objid) as objid,
       d.objsubid, d.refclassid, d.refobjid,d.refobjsubid, d.deptype,
       array[array[d.refobjid::int,d.objid::int]]
  from pg_depend d
  left join pg_rewrite r on
       (r.oid = d.objid and r.ev_type = '1' and r.rulename = '_RETURN')
 where d.refobjid = $1 and r.ev_class is distinct from d.refobjid
 union all
select depth+1,
       case when r.oid is not null then 'pg_class'::regclass
            else d.classid::regclass
       end as classid,
       coalesce(r.ev_class,d.objid) as objid,
       d.objsubid, d.refclassid, d.refobjid, d.refobjsubid, d.deptype,
       t.edges || array[array[d.refobjid::int,d.objid::int]]
  from tree t
  join pg_depend d on (d.refobjid=t.objid)
  left join pg_rewrite r on
       (r.oid = d.objid and r.ev_type = '1' and r.rulename = '_RETURN')
 where r.ev_class is distinct from d.refobjid
   and not ( t.edges @> array[array[d.refobjid::int,d.objid::int]] )
),
ddlx_get_dependants_recursive as (
select distinct
       depth,
       classid,objid,objsubid,
       refclassid,refobjid,refobjsubid,
       deptype
  from tree
),
q as (
  select distinct depth,classid,objid
    from ddlx_get_dependants_recursive
   where deptype = 'n'
)
select depth,classid,objid
  from q
 where (objid,depth) in (select objid,max(depth) from q group by objid)
 order by depth,objid
$function$
;

CREATE OR REPLACE FUNCTION public.fn_record_prompt_history()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Handling updates
    IF TG_OP = 'UPDATE' THEN
        -- Prepend the current version to the history with timestamps
        -- 'valid_to' is NOW(), and 'valid_from' is the last update's 'valid_to'
        NEW.history := jsonb_insert(NEW.history, '{0}', jsonb_build_object(
            'version', OLD,
            'timestamp', NOW() -- Current timestamp marks the end of the validity for the previous version
        ));
    ELSIF TG_OP = 'INSERT' THEN
        -- For inserts, initialize the history with the version being inserted
        -- No 'valid_from' or 'valid_to', just a 'timestamp' marking when it was created
        NEW.history := jsonb_build_array(jsonb_build_object(
            'version', NEW,
            'timestamp', NOW() -- Timestamp of when this version (initial) was created
        ));
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.match_memories(query_embedding vector, match_threshold double precision, match_count integer)
 RETURNS TABLE(id bigint, key text, value text, user_id text, related_message_id bigint, similarity double precision)
 LANGUAGE sql
 STABLE
AS $function$
select
  memories.id,
  memories.key,
  memories.value,
  memories.user_id,
  memories.related_message_id,
  1 - (memories.embedding <=> query_embedding) as similarity
from memories
where 1 - (memories.embedding <=> query_embedding) > match_threshold
order by similarity desc
limit match_count;
$function$
;

CREATE OR REPLACE FUNCTION public.track_changes_as_jsonb_in_history()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    row_data JSONB;
BEGIN
    -- Create a JSONB representation of the row, excluding the 'history' column
    row_data := to_jsonb(NEW) - 'history'; -- Removes the 'history' column

    -- Handling updates
    IF TG_OP = 'UPDATE' THEN
        -- Update the 'valid_to' timestamp of the latest entry in the history
        NEW.history = jsonb_set(
            NEW.history,
            '{0,valid_to}',
            to_jsonb(NOW())
        );

        -- Prepend the new version to the history with 'valid_from' as NOW(),
        -- and 'valid_to' as NULL indicating it's the current version
        -- Use 'row_data' which excludes the 'history' column
        NEW.history = jsonb_insert(
            NEW.history,
            '{0}', -- Insert at the start of the array
            jsonb_build_object(
                'version', row_data, -- Using 'row_data' here
                'valid_from', (NEW.history -> 0 ->> 'valid_to')::timestamp,
                'valid_to', NULL
            )
        );
    ELSIF TG_OP = 'INSERT' THEN
        -- For inserts, initialize the history with the version being inserted,
        -- 'valid_from' as NOW(), and 'valid_to' as NULL since it's the current version
        -- Use 'row_data' which excludes the 'history' column
        NEW.history = jsonb_build_array(
            jsonb_build_object(
                'version', row_data, -- Using 'row_data' here
                'valid_from', NOW(),
                'valid_to', NULL
            )
        );
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_modified_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$function$
;

grant delete on table "public"."config" to "service_role";

grant insert on table "public"."config" to "service_role";

grant references on table "public"."config" to "service_role";

grant select on table "public"."config" to "service_role";

grant trigger on table "public"."config" to "service_role";

grant truncate on table "public"."config" to "service_role";

grant update on table "public"."config" to "service_role";

grant delete on table "public"."memories" to "service_role";

grant insert on table "public"."memories" to "service_role";

grant references on table "public"."memories" to "service_role";

grant select on table "public"."memories" to "service_role";

grant trigger on table "public"."memories" to "service_role";

grant truncate on table "public"."memories" to "service_role";

grant update on table "public"."memories" to "service_role";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";

grant delete on table "public"."prompts" to "service_role";

grant insert on table "public"."prompts" to "service_role";

grant references on table "public"."prompts" to "service_role";

grant select on table "public"."prompts" to "service_role";

grant trigger on table "public"."prompts" to "service_role";

grant truncate on table "public"."prompts" to "service_role";

grant update on table "public"."prompts" to "service_role";

create policy "Enable read access for all users"
on "public"."messages"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."prompts"
as permissive
for insert
to authenticated
with check (true);


CREATE TRIGGER trigger_to_track_changes BEFORE UPDATE ON public.config FOR EACH ROW EXECUTE FUNCTION track_changes_as_jsonb_in_history();

CREATE TRIGGER trigger_to_track_changes BEFORE UPDATE ON public.memories FOR EACH ROW EXECUTE FUNCTION track_changes_as_jsonb_in_history();

CREATE TRIGGER trigger_to_track_changes BEFORE UPDATE ON public.messages FOR EACH ROW EXECUTE FUNCTION track_changes_as_jsonb_in_history();

CREATE TRIGGER trg_record_prompt_history BEFORE INSERT OR UPDATE ON public.prompts FOR EACH ROW EXECUTE FUNCTION fn_record_prompt_history();

CREATE TRIGGER trigger_to_track_changes BEFORE UPDATE ON public.prompts FOR EACH ROW EXECUTE FUNCTION track_changes_as_jsonb_in_history();

CREATE TRIGGER update_dimensions_modtime BEFORE UPDATE ON public.prompts FOR EACH ROW EXECUTE FUNCTION update_modified_column();


create type "public"."linear_action" as enum ('remove', 'update', 'create', 'set', 'highRisk', 'breached', 'restore');

create type "public"."member_role" as enum ('developer', 'designer');

create type "public"."project_status" as enum ('active', 'paused', 'completed', 'archived');

create sequence "public"."table_change_log_id_seq";

create table "public"."daily_reports" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "subject" text not null,
    "developer_done_today" text,
    "designer_done_today" text,
    "developer_will_do" text,
    "designer_will_do" text,
    "impedes" text,
    "developer_time_spent_today" text,
    "designer_time_spent_today" text,
    "team_today" text,
    "content" text not null
);


alter table "public"."daily_reports" enable row level security;

create table "public"."emails" (
    "id" uuid primary key,
    "created_at" timestamp with time zone not null,
    "email_address" text not null
);


alter table "public"."emails" enable row level security;

create table "public"."github_webhooks" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "type" text not null,
    "action" text,
    "target_type" text not null,
    "repository_url" text not null,
    "title" text,
    "body" text,
    "issue_id" bigint,
    "sender_id" bigint not null,
    "repository_created_at" timestamp with time zone,
    "repository_updated_at" timestamp with time zone
);


create table "public"."linear_projects" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "updated_at" timestamp with time zone not null default now(),
    "team_id" uuid
);


create table "public"."linear_teams" (
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "key" text not null,
    "name" text not null,
    "id" uuid not null default gen_random_uuid()
);


create table "public"."linear_webhooks" (
    "created_at" timestamp with time zone not null default now(),
    "type" text not null,
    "data" jsonb,
    "url" text,
    "updated_from" jsonb,
    "webhook_timestamp" timestamp with time zone not null,
    "action" public.linear_action not null,
    "organization_id" uuid not null,
    "actor" jsonb,
    "id" bigint generated by default as identity not null,
    "webhook_id" uuid not null default gen_random_uuid(),
    "project_id" uuid,
    "team_id" uuid
);


create table "public"."members" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "email" text not null,
    "updated_at" timestamp with time zone not null default now(),
    "role" public.member_role
);


alter table "public"."members" enable row level security;

create table "public"."org_primary_emails" (
    "created_at" timestamp with time zone not null default now(),
    "org_id" uuid not null,
    "email_id" uuid not null
);


alter table "public"."org_primary_emails" enable row level security;

create table "public"."org_slack_channels" (
    "created_at" timestamp with time zone not null default now(),
    "org_id" uuid not null,
    "slack_channel_id" uuid not null
);


alter table "public"."org_slack_channels" enable row level security;

create table "public"."orgs" (
    "id" uuid primary key,
    "created_at" timestamp with time zone not null,
    "name" text not null,
    "shortname" text not null,
    "aliases" text,
    "first_contact" timestamp with time zone not null,
    "updated_at" timestamp with time zone,
    "website" text,
    "primary_email_address_id" uuid,
    "primary_slack_channel_id" uuid,
    "summary" text,
    "note" text,
    "missive_conversation_id" uuid not null,
    "missive_label_id" uuid not null,
    "history" jsonb,
    "github_id" uuid,
    "linear_id" uuid,
    "pivotal_tracker_id" uuid
);

alter table "public"."orgs" enable row level security;

create table "public"."pivotal_tracker_webhooks" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "kind" text,
    "guid" text,
    "project_version" integer,
    "message" text,
    "highlight" text,
    "changes" jsonb[],
    "primary_resources" jsonb[],
    "secondary_resources" jsonb[],
    "project_id" bigint not null,
    "performed_by" jsonb,
    "occurred_at" timestamp with time zone not null
);


alter table "public"."pivotal_tracker_webhooks" enable row level security;

create table "public"."projects" (
    "id" uuid primary key,
    "created_at" timestamp with time zone not null,
    "name" text not null,
    "shortname" text not null,
    "aliases" text,
    "summary" text,
    "note" text,
    "org_id" uuid not null,
    "missive_conversation_id" uuid not null,
    "missive_label_id" uuid not null,
    "start_date" timestamp with time zone not null,
    "end_date" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "history" jsonb,
    "status" public.project_status,
    "linear_team_id" uuid,
    "pivotal_tracker_id" bigint
);


alter table "public"."projects" enable row level security;

create table "public"."slack_channels" (
    "id" uuid primary key,
    "created_at" timestamp with time zone not null
);


alter table "public"."slack_channels" enable row level security;

create table "public"."table_change_log" (
    "id" integer not null default nextval('public.table_change_log_id_seq'::regclass),
    "command_tag" text,
    "object_type" text,
    "schema_name" text,
    "object_identity" text,
    "in_extension" boolean,
    "change_timestamp" timestamp without time zone
);


alter sequence "public"."table_change_log_id_seq" owned by "public"."table_change_log"."id";

CREATE UNIQUE INDEX daily_reports_pkey ON public.daily_reports USING btree (id);

CREATE UNIQUE INDEX github_webhooks_pkey ON public.github_webhooks USING btree (id);

CREATE UNIQUE INDEX linear_projects_pkey ON public.linear_projects USING btree (id);

CREATE UNIQUE INDEX linear_teams_pkey ON public.linear_teams USING btree (id);

CREATE UNIQUE INDEX linear_webhooks_pkey ON public.linear_webhooks USING btree (id);

CREATE UNIQUE INDEX members_pkey ON public.members USING btree (id);

CREATE UNIQUE INDEX org_primary_emails_pkey ON public.org_primary_emails USING btree (org_id, email_id);

CREATE UNIQUE INDEX org_slack_channels_pkey ON public.org_slack_channels USING btree (org_id, slack_channel_id);

CREATE UNIQUE INDEX pivotal_tracker_webhooks_pkey ON public.pivotal_tracker_webhooks USING btree (id);

CREATE UNIQUE INDEX table_change_log_pkey ON public.table_change_log USING btree (id);

alter table "public"."daily_reports" add constraint "daily_reports_pkey" PRIMARY KEY using index "daily_reports_pkey";

alter table "public"."github_webhooks" add constraint "github_webhooks_pkey" PRIMARY KEY using index "github_webhooks_pkey";

alter table "public"."linear_projects" add constraint "linear_projects_pkey" PRIMARY KEY using index "linear_projects_pkey";

alter table "public"."linear_teams" add constraint "linear_teams_pkey" PRIMARY KEY using index "linear_teams_pkey";

alter table "public"."linear_webhooks" add constraint "linear_webhooks_pkey" PRIMARY KEY using index "linear_webhooks_pkey";

alter table "public"."members" add constraint "members_pkey" PRIMARY KEY using index "members_pkey";

alter table "public"."org_primary_emails" add constraint "org_primary_emails_pkey" PRIMARY KEY using index "org_primary_emails_pkey";

alter table "public"."org_slack_channels" add constraint "org_slack_channels_pkey" PRIMARY KEY using index "org_slack_channels_pkey";

alter table "public"."pivotal_tracker_webhooks" add constraint "pivotal_tracker_webhooks_pkey" PRIMARY KEY using index "pivotal_tracker_webhooks_pkey";

alter table "public"."table_change_log" add constraint "table_change_log_pkey" PRIMARY KEY using index "table_change_log_pkey";

alter table "public"."org_primary_emails" add constraint "public_org_primary_emails_email_id_fkey" FOREIGN KEY (email_id) REFERENCES public.emails(id) ON DELETE CASCADE not valid;

alter table "public"."org_primary_emails" validate constraint "public_org_primary_emails_email_id_fkey";

alter table "public"."org_primary_emails" add constraint "public_org_primary_emails_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.orgs(id) ON DELETE CASCADE not valid;

alter table "public"."org_primary_emails" validate constraint "public_org_primary_emails_org_id_fkey";

alter table "public"."org_slack_channels" add constraint "public_org_slack_channels_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.orgs(id) ON DELETE CASCADE not valid;

alter table "public"."org_slack_channels" validate constraint "public_org_slack_channels_org_id_fkey";

alter table "public"."org_slack_channels" add constraint "public_org_slack_channels_slack_channel_id_fkey" FOREIGN KEY (slack_channel_id) REFERENCES public.slack_channels(id) ON DELETE CASCADE not valid;

alter table "public"."org_slack_channels" validate constraint "public_org_slack_channels_slack_channel_id_fkey";

alter table "public"."orgs" add constraint "public_orgs_primary_email_address_fkey" FOREIGN KEY (primary_email_address_id) REFERENCES public.emails(id) ON DELETE SET NULL not valid;

alter table "public"."orgs" validate constraint "public_orgs_primary_email_address_fkey";

alter table "public"."orgs" add constraint "public_orgs_primary_slack_channel_id_fkey" FOREIGN KEY (primary_slack_channel_id) REFERENCES public.slack_channels(id) ON DELETE SET NULL not valid;

alter table "public"."orgs" validate constraint "public_orgs_primary_slack_channel_id_fkey";

alter table "public"."projects" add constraint "public_projects_org_id_fkey" FOREIGN KEY (org_id) REFERENCES public.orgs(id) ON DELETE CASCADE not valid;

alter table "public"."projects" validate constraint "public_projects_org_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.store_history()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$DECLARE
    old_data JSONB;
BEGIN
    old_data = to_jsonb(OLD) - 'history' - 'created_at';

    IF NEW.history IS NULL THEN
        NEW.history := '[]';
    END IF;
    NEW.history = jsonb_insert(NEW.history, '{-1}', old_data);

    RETURN NEW;
END;$function$
;

grant delete on table "public"."emails" to "service_role";

grant insert on table "public"."emails" to "service_role";

grant references on table "public"."emails" to "service_role";

grant select on table "public"."emails" to "service_role";

grant trigger on table "public"."emails" to "service_role";

grant truncate on table "public"."emails" to "service_role";

grant update on table "public"."emails" to "service_role";

grant delete on table "public"."github_webhooks" to "service_role";

grant insert on table "public"."github_webhooks" to "service_role";

grant references on table "public"."github_webhooks" to "service_role";

grant select on table "public"."github_webhooks" to "service_role";

grant trigger on table "public"."github_webhooks" to "service_role";

grant truncate on table "public"."github_webhooks" to "service_role";

grant update on table "public"."github_webhooks" to "service_role";

grant delete on table "public"."linear_projects" to "service_role";

grant insert on table "public"."linear_projects" to "service_role";

grant references on table "public"."linear_projects" to "service_role";

grant select on table "public"."linear_projects" to "service_role";

grant trigger on table "public"."linear_projects" to "service_role";

grant truncate on table "public"."linear_projects" to "service_role";

grant update on table "public"."linear_projects" to "service_role";

grant delete on table "public"."linear_teams" to "service_role";

grant insert on table "public"."linear_teams" to "service_role";

grant references on table "public"."linear_teams" to "service_role";

grant select on table "public"."linear_teams" to "service_role";

grant trigger on table "public"."linear_teams" to "service_role";

grant truncate on table "public"."linear_teams" to "service_role";

grant update on table "public"."linear_teams" to "service_role";

grant delete on table "public"."linear_webhooks" to "service_role";

grant insert on table "public"."linear_webhooks" to "service_role";

grant references on table "public"."linear_webhooks" to "service_role";

grant select on table "public"."linear_webhooks" to "service_role";

grant trigger on table "public"."linear_webhooks" to "service_role";

grant truncate on table "public"."linear_webhooks" to "service_role";

grant update on table "public"."linear_webhooks" to "service_role";

grant delete on table "public"."org_primary_emails" to "service_role";

grant insert on table "public"."org_primary_emails" to "service_role";

grant references on table "public"."org_primary_emails" to "service_role";

grant select on table "public"."org_primary_emails" to "service_role";

grant trigger on table "public"."org_primary_emails" to "service_role";

grant truncate on table "public"."org_primary_emails" to "service_role";

grant update on table "public"."org_primary_emails" to "service_role";

grant delete on table "public"."org_slack_channels" to "service_role";

grant insert on table "public"."org_slack_channels" to "service_role";

grant references on table "public"."org_slack_channels" to "service_role";

grant select on table "public"."org_slack_channels" to "service_role";

grant trigger on table "public"."org_slack_channels" to "service_role";

grant truncate on table "public"."org_slack_channels" to "service_role";

grant update on table "public"."org_slack_channels" to "service_role";

grant delete on table "public"."orgs" to "service_role";

grant insert on table "public"."orgs" to "service_role";

grant references on table "public"."orgs" to "service_role";

grant select on table "public"."orgs" to "service_role";

grant trigger on table "public"."orgs" to "service_role";

grant truncate on table "public"."orgs" to "service_role";

grant update on table "public"."orgs" to "service_role";

grant delete on table "public"."pivotal_tracker_webhooks" to "service_role";

grant insert on table "public"."pivotal_tracker_webhooks" to "service_role";

grant references on table "public"."pivotal_tracker_webhooks" to "service_role";

grant select on table "public"."pivotal_tracker_webhooks" to "service_role";

grant trigger on table "public"."pivotal_tracker_webhooks" to "service_role";

grant truncate on table "public"."pivotal_tracker_webhooks" to "service_role";

grant update on table "public"."pivotal_tracker_webhooks" to "service_role";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

grant delete on table "public"."slack_channels" to "service_role";

grant insert on table "public"."slack_channels" to "service_role";

grant references on table "public"."slack_channels" to "service_role";

grant select on table "public"."slack_channels" to "service_role";

grant trigger on table "public"."slack_channels" to "service_role";

grant truncate on table "public"."slack_channels" to "service_role";

grant update on table "public"."slack_channels" to "service_role";

grant delete on table "public"."table_change_log" to "service_role";

grant insert on table "public"."table_change_log" to "service_role";

grant references on table "public"."table_change_log" to "service_role";

grant select on table "public"."table_change_log" to "service_role";

grant trigger on table "public"."table_change_log" to "service_role";

grant truncate on table "public"."table_change_log" to "service_role";

grant update on table "public"."table_change_log" to "service_role";

CREATE TRIGGER handle_updated_at_daily_report BEFORE UPDATE ON public.daily_reports FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at_github_webhook BEFORE UPDATE ON public.github_webhooks FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at_linear_project BEFORE UPDATE ON public.linear_projects FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at_linear_team BEFORE UPDATE ON public.linear_teams FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at_linear_webhook BEFORE UPDATE ON public.linear_webhooks FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at_member BEFORE UPDATE ON public.members FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER handle_updated_at_org BEFORE UPDATE ON public.orgs FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER store_org_history BEFORE UPDATE ON public.orgs FOR EACH ROW EXECUTE FUNCTION public.store_history();

CREATE TRIGGER handle_updated_at_project BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

CREATE TRIGGER store_project_history BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.store_history();
