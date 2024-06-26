create table "public"."biweekly_briefings" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "content" text not null,
    "project_id" uuid
);

alter table "public"."biweekly_briefings" enable row level security;

create table "public"."missive_conversations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "label_ids" uuid[] not null default '{}'::uuid[]
);

alter table "public"."missive_conversations" enable row level security;

alter table "public"."project_briefings" drop column "briefing";

alter table "public"."project_briefings" add column "content" text not null;

alter table "public"."projects" add column "github_repository_url" text;

alter table "public"."weekly_conversations" add column "briefing" text not null;

CREATE UNIQUE INDEX biweekly_briefings_pkey ON public.biweekly_briefings USING btree (id);

CREATE UNIQUE INDEX missive_conversations_pkey ON public.missive_conversations USING btree (id);

CREATE UNIQUE INDEX weekly_conversations_week_of_year_key ON public.weekly_conversations USING btree (week_of_year);

alter table "public"."biweekly_briefings" add constraint "biweekly_briefings_pkey" PRIMARY KEY using index "biweekly_briefings_pkey";

alter table "public"."missive_conversations" add constraint "missive_conversations_pkey" PRIMARY KEY using index "missive_conversations_pkey";

alter table "public"."biweekly_briefings" add constraint "public_biweekly_briefings_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."biweekly_briefings" validate constraint "public_biweekly_briefings_project_id_fkey";

alter table "public"."weekly_conversations" add constraint "weekly_conversations_week_of_year_key" UNIQUE using index "weekly_conversations_week_of_year_key";

grant delete on table "public"."biweekly_briefings" to "postgres";

grant insert on table "public"."biweekly_briefings" to "postgres";

grant references on table "public"."biweekly_briefings" to "postgres";

grant select on table "public"."biweekly_briefings" to "postgres";

grant trigger on table "public"."biweekly_briefings" to "postgres";

grant truncate on table "public"."biweekly_briefings" to "postgres";

grant update on table "public"."biweekly_briefings" to "postgres";

grant delete on table "public"."biweekly_briefings" to "service_role";

grant insert on table "public"."biweekly_briefings" to "service_role";

grant references on table "public"."biweekly_briefings" to "service_role";

grant select on table "public"."biweekly_briefings" to "service_role";

grant trigger on table "public"."biweekly_briefings" to "service_role";

grant truncate on table "public"."biweekly_briefings" to "service_role";

grant update on table "public"."biweekly_briefings" to "service_role";

grant delete on table "public"."missive_conversations" to "postgres";

grant insert on table "public"."missive_conversations" to "postgres";

grant references on table "public"."missive_conversations" to "postgres";

grant select on table "public"."missive_conversations" to "postgres";

grant trigger on table "public"."missive_conversations" to "postgres";

grant truncate on table "public"."missive_conversations" to "postgres";

grant update on table "public"."missive_conversations" to "postgres";

grant delete on table "public"."missive_conversations" to "service_role";

grant insert on table "public"."missive_conversations" to "service_role";

grant references on table "public"."missive_conversations" to "service_role";

grant select on table "public"."missive_conversations" to "service_role";

grant trigger on table "public"."missive_conversations" to "service_role";

grant truncate on table "public"."missive_conversations" to "service_role";

grant update on table "public"."missive_conversations" to "service_role";

create table "public"."daily_briefings" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "content" text not null
);


alter table "public"."daily_briefings" enable row level security;

CREATE UNIQUE INDEX daily_briefing_pkey ON public.daily_briefings USING btree (id);

alter table "public"."daily_briefings" add constraint "daily_briefing_pkey" PRIMARY KEY using index "daily_briefing_pkey";

grant delete on table "public"."biweekly_briefings" to "postgres";

grant insert on table "public"."biweekly_briefings" to "postgres";

grant references on table "public"."biweekly_briefings" to "postgres";

grant select on table "public"."biweekly_briefings" to "postgres";

grant trigger on table "public"."biweekly_briefings" to "postgres";

grant truncate on table "public"."biweekly_briefings" to "postgres";

grant update on table "public"."biweekly_briefings" to "postgres";

grant delete on table "public"."daily_briefings" to "postgres";

grant insert on table "public"."daily_briefings" to "postgres";

grant references on table "public"."daily_briefings" to "postgres";

grant select on table "public"."daily_briefings" to "postgres";

grant trigger on table "public"."daily_briefings" to "postgres";

grant truncate on table "public"."daily_briefings" to "postgres";

grant update on table "public"."daily_briefings" to "postgres";

grant delete on table "public"."daily_briefings" to "service_role";

grant insert on table "public"."daily_briefings" to "service_role";

grant references on table "public"."daily_briefings" to "service_role";

grant select on table "public"."daily_briefings" to "service_role";

grant trigger on table "public"."daily_briefings" to "service_role";

grant truncate on table "public"."daily_briefings" to "service_role";

grant update on table "public"."daily_briefings" to "service_role";

grant delete on table "public"."missive_conversations" to "postgres";

grant insert on table "public"."missive_conversations" to "postgres";

grant references on table "public"."missive_conversations" to "postgres";

grant select on table "public"."missive_conversations" to "postgres";

grant trigger on table "public"."missive_conversations" to "postgres";

grant truncate on table "public"."missive_conversations" to "postgres";

grant update on table "public"."missive_conversations" to "postgres";
