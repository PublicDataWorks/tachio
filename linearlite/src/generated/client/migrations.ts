export default [
  {
    "statements": [
      "CREATE TABLE \"slack_channels\" (\n  \"id\" TEXT NOT NULL,\n  \"created_at\" TEXT NOT NULL,\n  CONSTRAINT \"slack_channels_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"emails\" (\n  \"id\" TEXT NOT NULL,\n  \"created_at\" TEXT NOT NULL,\n  \"email_address\" TEXT NOT NULL,\n  CONSTRAINT \"emails_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"orgs\" (\n  \"id\" TEXT NOT NULL,\n  \"created_at\" TEXT NOT NULL,\n  \"name\" TEXT NOT NULL,\n  \"shortname\" TEXT NOT NULL,\n  \"aliases\" TEXT,\n  \"first_contact\" TEXT NOT NULL,\n  \"updated_at\" TEXT,\n  \"website\" TEXT,\n  \"primary_email_address_id\" TEXT,\n  \"primary_slack_channel_id\" TEXT,\n  \"summary\" TEXT,\n  \"note\" TEXT,\n  \"missive_conversation_id\" TEXT NOT NULL,\n  \"missive_label_id\" TEXT NOT NULL,\n  \"history\" TEXT_JSON,\n  \"github_id\" TEXT,\n  \"linear_id\" TEXT,\n  \"pivotal_tracker_id\" TEXT,\n  CONSTRAINT \"public_orgs_primary_email_address_fkey\" FOREIGN KEY (\"primary_email_address_id\") REFERENCES \"emails\" (\"id\") ON DELETE SET NULL,\n  CONSTRAINT \"public_orgs_primary_slack_channel_id_fkey\" FOREIGN KEY (\"primary_slack_channel_id\") REFERENCES \"slack_channels\" (\"id\") ON DELETE SET NULL,\n  CONSTRAINT \"orgs_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"projects\" (\n  \"id\" TEXT NOT NULL,\n  \"created_at\" TEXT NOT NULL,\n  \"name\" TEXT NOT NULL,\n  \"shortname\" TEXT NOT NULL,\n  \"aliases\" TEXT,\n  \"summary\" TEXT,\n  \"note\" TEXT,\n  \"org_id\" TEXT NOT NULL,\n  \"missive_conversation_id\" TEXT NOT NULL,\n  \"missive_label_id\" TEXT NOT NULL,\n  \"start_date\" TEXT NOT NULL,\n  \"end_date\" TEXT,\n  \"updated_at\" TEXT,\n  \"history\" TEXT_JSON,\n  \"status\" TEXT,\n  \"linear_team_id\" TEXT,\n  \"pivotal_tracker_id\" INTEGER,\n  CONSTRAINT \"public_projects_org_id_fkey\" FOREIGN KEY (\"org_id\") REFERENCES \"orgs\" (\"id\") ON DELETE CASCADE,\n  CONSTRAINT \"projects_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"issues\" (\n  \"id\" TEXT NOT NULL,\n  \"title\" TEXT NOT NULL,\n  \"description\" TEXT NOT NULL,\n  \"modified\" TEXT NOT NULL,\n  \"created\" TEXT NOT NULL,\n  \"kanbanorder\" TEXT NOT NULL,\n  \"username\" TEXT NOT NULL,\n  \"external_urls\" TEXT,\n  \"completed_at\" TEXT,\n  \"status\" TEXT NOT NULL,\n  \"priority\" TEXT NOT NULL,\n  \"updated_at\" TEXT,\n  \"project_id\" TEXT,\n  CONSTRAINT \"public_issues_project_id_fkey\" FOREIGN KEY (\"project_id\") REFERENCES \"projects\" (\"id\") ON DELETE CASCADE,\n  CONSTRAINT \"issue_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"comments\" (\n  \"id\" TEXT NOT NULL,\n  \"body\" TEXT NOT NULL,\n  \"username\" TEXT NOT NULL,\n  \"issue_id\" TEXT NOT NULL,\n  \"created_at\" TEXT NOT NULL,\n  CONSTRAINT \"comments_issue_id_fkey\" FOREIGN KEY (\"issue_id\") REFERENCES \"issues\" (\"id\"),\n  CONSTRAINT \"comment_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.slack_channels', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_slack_channels_primarykey;",
      "CREATE TRIGGER update_ensure_main_slack_channels_primarykey\n  BEFORE UPDATE ON \"main\".\"slack_channels\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_slack_channels_into_oplog;",
      "CREATE TRIGGER insert_main_slack_channels_into_oplog\n   AFTER INSERT ON \"main\".\"slack_channels\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.slack_channels')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'slack_channels', 'INSERT', json_object('id', new.\"id\"), json_object('created_at', new.\"created_at\", 'id', new.\"id\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_slack_channels_into_oplog;",
      "CREATE TRIGGER update_main_slack_channels_into_oplog\n   AFTER UPDATE ON \"main\".\"slack_channels\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.slack_channels')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'slack_channels', 'UPDATE', json_object('id', new.\"id\"), json_object('created_at', new.\"created_at\", 'id', new.\"id\"), json_object('created_at', old.\"created_at\", 'id', old.\"id\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_slack_channels_into_oplog;",
      "CREATE TRIGGER delete_main_slack_channels_into_oplog\n   AFTER DELETE ON \"main\".\"slack_channels\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.slack_channels')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'slack_channels', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('created_at', old.\"created_at\", 'id', old.\"id\"), NULL);\nEND;",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.emails', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_emails_primarykey;",
      "CREATE TRIGGER update_ensure_main_emails_primarykey\n  BEFORE UPDATE ON \"main\".\"emails\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_emails_into_oplog;",
      "CREATE TRIGGER insert_main_emails_into_oplog\n   AFTER INSERT ON \"main\".\"emails\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.emails')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'emails', 'INSERT', json_object('id', new.\"id\"), json_object('created_at', new.\"created_at\", 'email_address', new.\"email_address\", 'id', new.\"id\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_emails_into_oplog;",
      "CREATE TRIGGER update_main_emails_into_oplog\n   AFTER UPDATE ON \"main\".\"emails\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.emails')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'emails', 'UPDATE', json_object('id', new.\"id\"), json_object('created_at', new.\"created_at\", 'email_address', new.\"email_address\", 'id', new.\"id\"), json_object('created_at', old.\"created_at\", 'email_address', old.\"email_address\", 'id', old.\"id\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_emails_into_oplog;",
      "CREATE TRIGGER delete_main_emails_into_oplog\n   AFTER DELETE ON \"main\".\"emails\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.emails')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'emails', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('created_at', old.\"created_at\", 'email_address', old.\"email_address\", 'id', old.\"id\"), NULL);\nEND;",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.orgs', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_orgs_primarykey;",
      "CREATE TRIGGER update_ensure_main_orgs_primarykey\n  BEFORE UPDATE ON \"main\".\"orgs\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_orgs_into_oplog;",
      "CREATE TRIGGER insert_main_orgs_into_oplog\n   AFTER INSERT ON \"main\".\"orgs\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.orgs')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'orgs', 'INSERT', json_object('id', new.\"id\"), json_object('aliases', new.\"aliases\", 'created_at', new.\"created_at\", 'first_contact', new.\"first_contact\", 'github_id', new.\"github_id\", 'history', new.\"history\", 'id', new.\"id\", 'linear_id', new.\"linear_id\", 'missive_conversation_id', new.\"missive_conversation_id\", 'missive_label_id', new.\"missive_label_id\", 'name', new.\"name\", 'note', new.\"note\", 'pivotal_tracker_id', new.\"pivotal_tracker_id\", 'primary_email_address_id', new.\"primary_email_address_id\", 'primary_slack_channel_id', new.\"primary_slack_channel_id\", 'shortname', new.\"shortname\", 'summary', new.\"summary\", 'updated_at', new.\"updated_at\", 'website', new.\"website\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_orgs_into_oplog;",
      "CREATE TRIGGER update_main_orgs_into_oplog\n   AFTER UPDATE ON \"main\".\"orgs\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.orgs')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'orgs', 'UPDATE', json_object('id', new.\"id\"), json_object('aliases', new.\"aliases\", 'created_at', new.\"created_at\", 'first_contact', new.\"first_contact\", 'github_id', new.\"github_id\", 'history', new.\"history\", 'id', new.\"id\", 'linear_id', new.\"linear_id\", 'missive_conversation_id', new.\"missive_conversation_id\", 'missive_label_id', new.\"missive_label_id\", 'name', new.\"name\", 'note', new.\"note\", 'pivotal_tracker_id', new.\"pivotal_tracker_id\", 'primary_email_address_id', new.\"primary_email_address_id\", 'primary_slack_channel_id', new.\"primary_slack_channel_id\", 'shortname', new.\"shortname\", 'summary', new.\"summary\", 'updated_at', new.\"updated_at\", 'website', new.\"website\"), json_object('aliases', old.\"aliases\", 'created_at', old.\"created_at\", 'first_contact', old.\"first_contact\", 'github_id', old.\"github_id\", 'history', old.\"history\", 'id', old.\"id\", 'linear_id', old.\"linear_id\", 'missive_conversation_id', old.\"missive_conversation_id\", 'missive_label_id', old.\"missive_label_id\", 'name', old.\"name\", 'note', old.\"note\", 'pivotal_tracker_id', old.\"pivotal_tracker_id\", 'primary_email_address_id', old.\"primary_email_address_id\", 'primary_slack_channel_id', old.\"primary_slack_channel_id\", 'shortname', old.\"shortname\", 'summary', old.\"summary\", 'updated_at', old.\"updated_at\", 'website', old.\"website\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_orgs_into_oplog;",
      "CREATE TRIGGER delete_main_orgs_into_oplog\n   AFTER DELETE ON \"main\".\"orgs\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.orgs')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'orgs', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('aliases', old.\"aliases\", 'created_at', old.\"created_at\", 'first_contact', old.\"first_contact\", 'github_id', old.\"github_id\", 'history', old.\"history\", 'id', old.\"id\", 'linear_id', old.\"linear_id\", 'missive_conversation_id', old.\"missive_conversation_id\", 'missive_label_id', old.\"missive_label_id\", 'name', old.\"name\", 'note', old.\"note\", 'pivotal_tracker_id', old.\"pivotal_tracker_id\", 'primary_email_address_id', old.\"primary_email_address_id\", 'primary_slack_channel_id', old.\"primary_slack_channel_id\", 'shortname', old.\"shortname\", 'summary', old.\"summary\", 'updated_at', old.\"updated_at\", 'website', old.\"website\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS compensation_insert_main_orgs_primary_email_address_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_orgs_primary_email_address_id_into_oplog\n  AFTER INSERT ON \"main\".\"orgs\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.emails') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'emails', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"emails\" WHERE \"id\" = new.\"primary_email_address_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_orgs_primary_email_address_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_orgs_primary_email_address_id_into_oplog\n   AFTER UPDATE ON \"main\".\"orgs\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.emails') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'emails', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"emails\" WHERE \"id\" = new.\"primary_email_address_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_insert_main_orgs_primary_slack_channel_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_orgs_primary_slack_channel_id_into_oplog\n  AFTER INSERT ON \"main\".\"orgs\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.slack_channels') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'slack_channels', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"slack_channels\" WHERE \"id\" = new.\"primary_slack_channel_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_orgs_primary_slack_channel_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_orgs_primary_slack_channel_id_into_oplog\n   AFTER UPDATE ON \"main\".\"orgs\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.slack_channels') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'slack_channels', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"slack_channels\" WHERE \"id\" = new.\"primary_slack_channel_id\";\nEND;",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.projects', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_projects_primarykey;",
      "CREATE TRIGGER update_ensure_main_projects_primarykey\n  BEFORE UPDATE ON \"main\".\"projects\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_projects_into_oplog;",
      "CREATE TRIGGER insert_main_projects_into_oplog\n   AFTER INSERT ON \"main\".\"projects\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.projects')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'projects', 'INSERT', json_object('id', new.\"id\"), json_object('aliases', new.\"aliases\", 'created_at', new.\"created_at\", 'end_date', new.\"end_date\", 'history', new.\"history\", 'id', new.\"id\", 'linear_team_id', new.\"linear_team_id\", 'missive_conversation_id', new.\"missive_conversation_id\", 'missive_label_id', new.\"missive_label_id\", 'name', new.\"name\", 'note', new.\"note\", 'org_id', new.\"org_id\", 'pivotal_tracker_id', cast(new.\"pivotal_tracker_id\" as TEXT), 'shortname', new.\"shortname\", 'start_date', new.\"start_date\", 'status', new.\"status\", 'summary', new.\"summary\", 'updated_at', new.\"updated_at\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_projects_into_oplog;",
      "CREATE TRIGGER update_main_projects_into_oplog\n   AFTER UPDATE ON \"main\".\"projects\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.projects')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'projects', 'UPDATE', json_object('id', new.\"id\"), json_object('aliases', new.\"aliases\", 'created_at', new.\"created_at\", 'end_date', new.\"end_date\", 'history', new.\"history\", 'id', new.\"id\", 'linear_team_id', new.\"linear_team_id\", 'missive_conversation_id', new.\"missive_conversation_id\", 'missive_label_id', new.\"missive_label_id\", 'name', new.\"name\", 'note', new.\"note\", 'org_id', new.\"org_id\", 'pivotal_tracker_id', cast(new.\"pivotal_tracker_id\" as TEXT), 'shortname', new.\"shortname\", 'start_date', new.\"start_date\", 'status', new.\"status\", 'summary', new.\"summary\", 'updated_at', new.\"updated_at\"), json_object('aliases', old.\"aliases\", 'created_at', old.\"created_at\", 'end_date', old.\"end_date\", 'history', old.\"history\", 'id', old.\"id\", 'linear_team_id', old.\"linear_team_id\", 'missive_conversation_id', old.\"missive_conversation_id\", 'missive_label_id', old.\"missive_label_id\", 'name', old.\"name\", 'note', old.\"note\", 'org_id', old.\"org_id\", 'pivotal_tracker_id', cast(old.\"pivotal_tracker_id\" as TEXT), 'shortname', old.\"shortname\", 'start_date', old.\"start_date\", 'status', old.\"status\", 'summary', old.\"summary\", 'updated_at', old.\"updated_at\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_projects_into_oplog;",
      "CREATE TRIGGER delete_main_projects_into_oplog\n   AFTER DELETE ON \"main\".\"projects\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.projects')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'projects', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('aliases', old.\"aliases\", 'created_at', old.\"created_at\", 'end_date', old.\"end_date\", 'history', old.\"history\", 'id', old.\"id\", 'linear_team_id', old.\"linear_team_id\", 'missive_conversation_id', old.\"missive_conversation_id\", 'missive_label_id', old.\"missive_label_id\", 'name', old.\"name\", 'note', old.\"note\", 'org_id', old.\"org_id\", 'pivotal_tracker_id', cast(old.\"pivotal_tracker_id\" as TEXT), 'shortname', old.\"shortname\", 'start_date', old.\"start_date\", 'status', old.\"status\", 'summary', old.\"summary\", 'updated_at', old.\"updated_at\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS compensation_insert_main_projects_org_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_projects_org_id_into_oplog\n  AFTER INSERT ON \"main\".\"projects\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.orgs') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'orgs', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"orgs\" WHERE \"id\" = new.\"org_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_projects_org_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_projects_org_id_into_oplog\n   AFTER UPDATE ON \"main\".\"projects\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.orgs') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'orgs', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"orgs\" WHERE \"id\" = new.\"org_id\";\nEND;",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.issues', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_issues_primarykey;",
      "CREATE TRIGGER update_ensure_main_issues_primarykey\n  BEFORE UPDATE ON \"main\".\"issues\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_issues_into_oplog;",
      "CREATE TRIGGER insert_main_issues_into_oplog\n   AFTER INSERT ON \"main\".\"issues\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.issues')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'issues', 'INSERT', json_object('id', new.\"id\"), json_object('completed_at', new.\"completed_at\", 'created', new.\"created\", 'description', new.\"description\", 'external_urls', new.\"external_urls\", 'id', new.\"id\", 'kanbanorder', new.\"kanbanorder\", 'modified', new.\"modified\", 'priority', new.\"priority\", 'project_id', new.\"project_id\", 'status', new.\"status\", 'title', new.\"title\", 'updated_at', new.\"updated_at\", 'username', new.\"username\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_issues_into_oplog;",
      "CREATE TRIGGER update_main_issues_into_oplog\n   AFTER UPDATE ON \"main\".\"issues\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.issues')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'issues', 'UPDATE', json_object('id', new.\"id\"), json_object('completed_at', new.\"completed_at\", 'created', new.\"created\", 'description', new.\"description\", 'external_urls', new.\"external_urls\", 'id', new.\"id\", 'kanbanorder', new.\"kanbanorder\", 'modified', new.\"modified\", 'priority', new.\"priority\", 'project_id', new.\"project_id\", 'status', new.\"status\", 'title', new.\"title\", 'updated_at', new.\"updated_at\", 'username', new.\"username\"), json_object('completed_at', old.\"completed_at\", 'created', old.\"created\", 'description', old.\"description\", 'external_urls', old.\"external_urls\", 'id', old.\"id\", 'kanbanorder', old.\"kanbanorder\", 'modified', old.\"modified\", 'priority', old.\"priority\", 'project_id', old.\"project_id\", 'status', old.\"status\", 'title', old.\"title\", 'updated_at', old.\"updated_at\", 'username', old.\"username\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_issues_into_oplog;",
      "CREATE TRIGGER delete_main_issues_into_oplog\n   AFTER DELETE ON \"main\".\"issues\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.issues')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'issues', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('completed_at', old.\"completed_at\", 'created', old.\"created\", 'description', old.\"description\", 'external_urls', old.\"external_urls\", 'id', old.\"id\", 'kanbanorder', old.\"kanbanorder\", 'modified', old.\"modified\", 'priority', old.\"priority\", 'project_id', old.\"project_id\", 'status', old.\"status\", 'title', old.\"title\", 'updated_at', old.\"updated_at\", 'username', old.\"username\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS compensation_insert_main_issues_project_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_issues_project_id_into_oplog\n  AFTER INSERT ON \"main\".\"issues\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.projects') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'projects', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"projects\" WHERE \"id\" = new.\"project_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_issues_project_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_issues_project_id_into_oplog\n   AFTER UPDATE ON \"main\".\"issues\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.projects') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'projects', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"projects\" WHERE \"id\" = new.\"project_id\";\nEND;",
      "INSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.comments', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_comments_primarykey;",
      "CREATE TRIGGER update_ensure_main_comments_primarykey\n  BEFORE UPDATE ON \"main\".\"comments\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_comments_into_oplog;",
      "CREATE TRIGGER insert_main_comments_into_oplog\n   AFTER INSERT ON \"main\".\"comments\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.comments')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'comments', 'INSERT', json_object('id', new.\"id\"), json_object('body', new.\"body\", 'created_at', new.\"created_at\", 'id', new.\"id\", 'issue_id', new.\"issue_id\", 'username', new.\"username\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_comments_into_oplog;",
      "CREATE TRIGGER update_main_comments_into_oplog\n   AFTER UPDATE ON \"main\".\"comments\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.comments')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'comments', 'UPDATE', json_object('id', new.\"id\"), json_object('body', new.\"body\", 'created_at', new.\"created_at\", 'id', new.\"id\", 'issue_id', new.\"issue_id\", 'username', new.\"username\"), json_object('body', old.\"body\", 'created_at', old.\"created_at\", 'id', old.\"id\", 'issue_id', old.\"issue_id\", 'username', old.\"username\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_comments_into_oplog;",
      "CREATE TRIGGER delete_main_comments_into_oplog\n   AFTER DELETE ON \"main\".\"comments\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.comments')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'comments', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('body', old.\"body\", 'created_at', old.\"created_at\", 'id', old.\"id\", 'issue_id', old.\"issue_id\", 'username', old.\"username\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS compensation_insert_main_comments_issue_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_comments_issue_id_into_oplog\n  AFTER INSERT ON \"main\".\"comments\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.issues') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'issues', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"issues\" WHERE \"id\" = new.\"issue_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_comments_issue_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_comments_issue_id_into_oplog\n   AFTER UPDATE ON \"main\".\"comments\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.issues') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'issues', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"issues\" WHERE \"id\" = new.\"issue_id\";\nEND;"
    ],
    "version": "1"
  }
]