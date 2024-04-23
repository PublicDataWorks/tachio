-- Create the tables for the linearlite example
CREATE TABLE IF NOT EXISTS "issues" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "modified" TIMESTAMPTZ NOT NULL,
    "created" TIMESTAMPTZ NOT NULL,
    "kanbanorder" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    CONSTRAINT "issue_pkey" PRIMARY KEY ("id")
);

-- CREATE TABLE IF NOT EXISTS "user" (
--     "username" TEXT NOT NULL,
--     "avatar" TEXT,
--     CONSTRAINT "user_pkey" PRIMARY KEY ("username")
-- );

CREATE TABLE  IF NOT EXISTS "comments" (
    "id" UUID NOT NULL,
    "body" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "issue_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    CONSTRAINT "comment_pkey" PRIMARY KEY ("id"),
    -- FOREIGN KEY (username) REFERENCES "user"(username),
    FOREIGN KEY (issue_id) REFERENCES issues(id)
);

-- ⚡
-- Electrify the tables
ALTER TABLE issues ENABLE ELECTRIC;
-- ALTER TABLE user ENABLE ELECTRIC;
ALTER TABLE comments ENABLE ELECTRIC;
