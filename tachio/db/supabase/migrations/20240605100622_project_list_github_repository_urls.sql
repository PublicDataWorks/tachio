alter table "public"."messages" add column "assistant_response" text;

ALTER TABLE "public"."projects" RENAME COLUMN "github_repository_url" TO "github_repository_urls";

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

grant delete on table "public"."missive_conversations" to "postgres";

grant insert on table "public"."missive_conversations" to "postgres";

grant references on table "public"."missive_conversations" to "postgres";

grant select on table "public"."missive_conversations" to "postgres";

grant trigger on table "public"."missive_conversations" to "postgres";

grant truncate on table "public"."missive_conversations" to "postgres";

grant update on table "public"."missive_conversations" to "postgres";
