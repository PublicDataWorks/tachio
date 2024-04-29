CREATE TABLE IF NOT EXISTS "issues" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "modified" TIMESTAMPTZ NOT NULL,
    "created" TIMESTAMPTZ NOT NULL,
    "kanbanorder" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "external_urls" TEXT,
    "completed_at" TIMESTAMPTZ,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "project_id" UUID,
    CONSTRAINT "issue_pkey" PRIMARY KEY ("id")
);

alter table "public"."issues" enable row level security;

grant update on table "public"."issues" to "postgres";

CREATE TRIGGER handle_updated_at_issue BEFORE UPDATE ON public.issues FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');

alter table "public"."issues" add constraint "public_issues_project_id_fkey" FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE not valid;

alter table "public"."issues" validate constraint "public_issues_project_id_fkey";


CREATE TABLE  IF NOT EXISTS "comments" (
    "id" UUID NOT NULL,
    "body" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "issue_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    CONSTRAINT "comment_pkey" PRIMARY KEY ("id"),
    FOREIGN KEY (issue_id) REFERENCES issues(id)
);
