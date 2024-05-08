import { z } from 'zod';
import type { Prisma } from './prismaClient';
import { type TableSchema, DbSchema, Relation, ElectricClient, type HKT } from 'electric-sql/client/model';
import migrations from './migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null;


export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.null(),
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = JsonValue
  .nullable();

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.null(),
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const CommentsScalarFieldEnumSchema = z.enum(['id','body','username','issue_id','created_at']);

export const EmailsScalarFieldEnumSchema = z.enum(['id','created_at','email_address']);

export const IssuesScalarFieldEnumSchema = z.enum(['id','title','description','created_at','kanbanorder','username','external_urls','completed_at','status','priority','updated_at','project_id']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',])

export const OrgsScalarFieldEnumSchema = z.enum(['id','created_at','name','shortname','aliases','first_contact','updated_at','website','primary_email_address_id','primary_slack_channel_id','summary','note','missive_conversation_id','missive_label_id','history','github_id','linear_id','pivotal_tracker_id']);

export const ProjectsScalarFieldEnumSchema = z.enum(['id','created_at','name','shortname','aliases','summary','note','org_id','missive_conversation_id','missive_label_id','start_date','end_date','updated_at','history','status','linear_team_id','pivotal_tracker_id']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const Slack_channelsScalarFieldEnumSchema = z.enum(['id','created_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const project_statusSchema = z.enum(['active','paused','completed','archived']);

export type project_statusType = `${z.infer<typeof project_statusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// COMMENTS SCHEMA
/////////////////////////////////////////

export const CommentsSchema = z.object({
  id: z.string().uuid(),
  body: z.string(),
  username: z.string(),
  issue_id: z.string().uuid(),
  created_at: z.coerce.date(),
})

export type Comments = z.infer<typeof CommentsSchema>

/////////////////////////////////////////
// EMAILS SCHEMA
/////////////////////////////////////////

export const EmailsSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  email_address: z.string(),
})

export type Emails = z.infer<typeof EmailsSchema>

/////////////////////////////////////////
// ISSUES SCHEMA
/////////////////////////////////////////

export const IssuesSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  created_at: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string(),
  external_urls: z.string().nullable(),
  completed_at: z.coerce.date().nullable(),
  status: z.string(),
  priority: z.string(),
  updated_at: z.coerce.date().nullable(),
  project_id: z.string().uuid().nullable(),
})

export type Issues = z.infer<typeof IssuesSchema>

/////////////////////////////////////////
// ORGS SCHEMA
/////////////////////////////////////////

export const OrgsSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().nullable(),
  first_contact: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  website: z.string().nullable(),
  primary_email_address_id: z.string().uuid().nullable(),
  primary_slack_channel_id: z.string().uuid().nullable(),
  summary: z.string().nullable(),
  note: z.string().nullable(),
  missive_conversation_id: z.string().uuid(),
  missive_label_id: z.string().uuid(),
  history: NullableJsonValue.optional(),
  github_id: z.string().uuid().nullable(),
  linear_id: z.string().uuid().nullable(),
  pivotal_tracker_id: z.string().uuid().nullable(),
})

export type Orgs = z.infer<typeof OrgsSchema>

/////////////////////////////////////////
// PROJECTS SCHEMA
/////////////////////////////////////////

export const ProjectsSchema = z.object({
  status: project_statusSchema.nullable(),
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().nullable(),
  summary: z.string().nullable(),
  note: z.string().nullable(),
  org_id: z.string().uuid(),
  missive_conversation_id: z.string().uuid(),
  missive_label_id: z.string().uuid(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  history: NullableJsonValue.optional(),
  linear_team_id: z.string().uuid().nullable(),
  pivotal_tracker_id: z.bigint().nullable(),
})

export type Projects = z.infer<typeof ProjectsSchema>

/////////////////////////////////////////
// SLACK CHANNELS SCHEMA
/////////////////////////////////////////

export const Slack_channelsSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
})

export type Slack_channels = z.infer<typeof Slack_channelsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// COMMENTS
//------------------------------------------------------

export const CommentsIncludeSchema: z.ZodType<Prisma.CommentsInclude> = z.object({
  issues: z.union([z.boolean(),z.lazy(() => IssuesArgsSchema)]).optional(),
}).strict()

export const CommentsArgsSchema: z.ZodType<Prisma.CommentsArgs> = z.object({
  select: z.lazy(() => CommentsSelectSchema).optional(),
  include: z.lazy(() => CommentsIncludeSchema).optional(),
}).strict();

export const CommentsSelectSchema: z.ZodType<Prisma.CommentsSelect> = z.object({
  id: z.boolean().optional(),
  body: z.boolean().optional(),
  username: z.boolean().optional(),
  issue_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  issues: z.union([z.boolean(),z.lazy(() => IssuesArgsSchema)]).optional(),
}).strict()

// EMAILS
//------------------------------------------------------

export const EmailsIncludeSchema: z.ZodType<Prisma.EmailsInclude> = z.object({
  orgs: z.union([z.boolean(),z.lazy(() => OrgsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmailsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EmailsArgsSchema: z.ZodType<Prisma.EmailsArgs> = z.object({
  select: z.lazy(() => EmailsSelectSchema).optional(),
  include: z.lazy(() => EmailsIncludeSchema).optional(),
}).strict();

export const EmailsCountOutputTypeArgsSchema: z.ZodType<Prisma.EmailsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => EmailsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EmailsCountOutputTypeSelectSchema: z.ZodType<Prisma.EmailsCountOutputTypeSelect> = z.object({
  orgs: z.boolean().optional(),
}).strict();

export const EmailsSelectSchema: z.ZodType<Prisma.EmailsSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  email_address: z.boolean().optional(),
  orgs: z.union([z.boolean(),z.lazy(() => OrgsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EmailsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ISSUES
//------------------------------------------------------

export const IssuesIncludeSchema: z.ZodType<Prisma.IssuesInclude> = z.object({
  comments: z.union([z.boolean(),z.lazy(() => CommentsFindManyArgsSchema)]).optional(),
  projects: z.union([z.boolean(),z.lazy(() => ProjectsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IssuesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const IssuesArgsSchema: z.ZodType<Prisma.IssuesArgs> = z.object({
  select: z.lazy(() => IssuesSelectSchema).optional(),
  include: z.lazy(() => IssuesIncludeSchema).optional(),
}).strict();

export const IssuesCountOutputTypeArgsSchema: z.ZodType<Prisma.IssuesCountOutputTypeArgs> = z.object({
  select: z.lazy(() => IssuesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const IssuesCountOutputTypeSelectSchema: z.ZodType<Prisma.IssuesCountOutputTypeSelect> = z.object({
  comments: z.boolean().optional(),
}).strict();

export const IssuesSelectSchema: z.ZodType<Prisma.IssuesSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  created_at: z.boolean().optional(),
  kanbanorder: z.boolean().optional(),
  username: z.boolean().optional(),
  external_urls: z.boolean().optional(),
  completed_at: z.boolean().optional(),
  status: z.boolean().optional(),
  priority: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  project_id: z.boolean().optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentsFindManyArgsSchema)]).optional(),
  projects: z.union([z.boolean(),z.lazy(() => ProjectsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IssuesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ORGS
//------------------------------------------------------

export const OrgsIncludeSchema: z.ZodType<Prisma.OrgsInclude> = z.object({
  emails: z.union([z.boolean(),z.lazy(() => EmailsArgsSchema)]).optional(),
  slack_channels: z.union([z.boolean(),z.lazy(() => Slack_channelsArgsSchema)]).optional(),
  projects: z.union([z.boolean(),z.lazy(() => ProjectsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrgsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const OrgsArgsSchema: z.ZodType<Prisma.OrgsArgs> = z.object({
  select: z.lazy(() => OrgsSelectSchema).optional(),
  include: z.lazy(() => OrgsIncludeSchema).optional(),
}).strict();

export const OrgsCountOutputTypeArgsSchema: z.ZodType<Prisma.OrgsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => OrgsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const OrgsCountOutputTypeSelectSchema: z.ZodType<Prisma.OrgsCountOutputTypeSelect> = z.object({
  projects: z.boolean().optional(),
}).strict();

export const OrgsSelectSchema: z.ZodType<Prisma.OrgsSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  name: z.boolean().optional(),
  shortname: z.boolean().optional(),
  aliases: z.boolean().optional(),
  first_contact: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  website: z.boolean().optional(),
  primary_email_address_id: z.boolean().optional(),
  primary_slack_channel_id: z.boolean().optional(),
  summary: z.boolean().optional(),
  note: z.boolean().optional(),
  missive_conversation_id: z.boolean().optional(),
  missive_label_id: z.boolean().optional(),
  history: z.boolean().optional(),
  github_id: z.boolean().optional(),
  linear_id: z.boolean().optional(),
  pivotal_tracker_id: z.boolean().optional(),
  emails: z.union([z.boolean(),z.lazy(() => EmailsArgsSchema)]).optional(),
  slack_channels: z.union([z.boolean(),z.lazy(() => Slack_channelsArgsSchema)]).optional(),
  projects: z.union([z.boolean(),z.lazy(() => ProjectsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrgsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROJECTS
//------------------------------------------------------

export const ProjectsIncludeSchema: z.ZodType<Prisma.ProjectsInclude> = z.object({
  issues: z.union([z.boolean(),z.lazy(() => IssuesFindManyArgsSchema)]).optional(),
  orgs: z.union([z.boolean(),z.lazy(() => OrgsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProjectsArgsSchema: z.ZodType<Prisma.ProjectsArgs> = z.object({
  select: z.lazy(() => ProjectsSelectSchema).optional(),
  include: z.lazy(() => ProjectsIncludeSchema).optional(),
}).strict();

export const ProjectsCountOutputTypeArgsSchema: z.ZodType<Prisma.ProjectsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ProjectsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProjectsCountOutputTypeSelectSchema: z.ZodType<Prisma.ProjectsCountOutputTypeSelect> = z.object({
  issues: z.boolean().optional(),
}).strict();

export const ProjectsSelectSchema: z.ZodType<Prisma.ProjectsSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  name: z.boolean().optional(),
  shortname: z.boolean().optional(),
  aliases: z.boolean().optional(),
  summary: z.boolean().optional(),
  note: z.boolean().optional(),
  org_id: z.boolean().optional(),
  missive_conversation_id: z.boolean().optional(),
  missive_label_id: z.boolean().optional(),
  start_date: z.boolean().optional(),
  end_date: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  history: z.boolean().optional(),
  status: z.boolean().optional(),
  linear_team_id: z.boolean().optional(),
  pivotal_tracker_id: z.boolean().optional(),
  issues: z.union([z.boolean(),z.lazy(() => IssuesFindManyArgsSchema)]).optional(),
  orgs: z.union([z.boolean(),z.lazy(() => OrgsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SLACK CHANNELS
//------------------------------------------------------

export const Slack_channelsIncludeSchema: z.ZodType<Prisma.Slack_channelsInclude> = z.object({
  orgs: z.union([z.boolean(),z.lazy(() => OrgsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Slack_channelsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const Slack_channelsArgsSchema: z.ZodType<Prisma.Slack_channelsArgs> = z.object({
  select: z.lazy(() => Slack_channelsSelectSchema).optional(),
  include: z.lazy(() => Slack_channelsIncludeSchema).optional(),
}).strict();

export const Slack_channelsCountOutputTypeArgsSchema: z.ZodType<Prisma.Slack_channelsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => Slack_channelsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const Slack_channelsCountOutputTypeSelectSchema: z.ZodType<Prisma.Slack_channelsCountOutputTypeSelect> = z.object({
  orgs: z.boolean().optional(),
}).strict();

export const Slack_channelsSelectSchema: z.ZodType<Prisma.Slack_channelsSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  orgs: z.union([z.boolean(),z.lazy(() => OrgsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Slack_channelsCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CommentsWhereInputSchema: z.ZodType<Prisma.CommentsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentsWhereInputSchema),z.lazy(() => CommentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentsWhereInputSchema),z.lazy(() => CommentsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  issue_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  issues: z.union([ z.lazy(() => IssuesRelationFilterSchema),z.lazy(() => IssuesWhereInputSchema) ]).optional(),
}).strict();

export const CommentsOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  issue_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  issues: z.lazy(() => IssuesOrderByWithRelationInputSchema).optional()
}).strict();

export const CommentsWhereUniqueInputSchema: z.ZodType<Prisma.CommentsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const CommentsOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  issue_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentsMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommentsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentsScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentsScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  issue_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EmailsWhereInputSchema: z.ZodType<Prisma.EmailsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailsWhereInputSchema),z.lazy(() => EmailsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailsWhereInputSchema),z.lazy(() => EmailsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  email_address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  orgs: z.lazy(() => OrgsListRelationFilterSchema).optional()
}).strict();

export const EmailsOrderByWithRelationInputSchema: z.ZodType<Prisma.EmailsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  orgs: z.lazy(() => OrgsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const EmailsWhereUniqueInputSchema: z.ZodType<Prisma.EmailsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const EmailsOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmailsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmailsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmailsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmailsMinOrderByAggregateInputSchema).optional()
}).strict();

export const EmailsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmailsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EmailsScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailsScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  email_address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const IssuesWhereInputSchema: z.ZodType<Prisma.IssuesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IssuesWhereInputSchema),z.lazy(() => IssuesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IssuesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IssuesWhereInputSchema),z.lazy(() => IssuesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  kanbanorder: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  external_urls: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  completed_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  priority: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  project_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  comments: z.lazy(() => CommentsListRelationFilterSchema).optional(),
  projects: z.union([ z.lazy(() => ProjectsRelationFilterSchema),z.lazy(() => ProjectsWhereInputSchema) ]).optional().nullable(),
}).strict();

export const IssuesOrderByWithRelationInputSchema: z.ZodType<Prisma.IssuesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  kanbanorder: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  external_urls: z.lazy(() => SortOrderSchema).optional(),
  completed_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  project_id: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => CommentsOrderByRelationAggregateInputSchema).optional(),
  projects: z.lazy(() => ProjectsOrderByWithRelationInputSchema).optional()
}).strict();

export const IssuesWhereUniqueInputSchema: z.ZodType<Prisma.IssuesWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const IssuesOrderByWithAggregationInputSchema: z.ZodType<Prisma.IssuesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  kanbanorder: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  external_urls: z.lazy(() => SortOrderSchema).optional(),
  completed_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  project_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IssuesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IssuesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IssuesMinOrderByAggregateInputSchema).optional()
}).strict();

export const IssuesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IssuesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IssuesScalarWhereWithAggregatesInputSchema),z.lazy(() => IssuesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IssuesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IssuesScalarWhereWithAggregatesInputSchema),z.lazy(() => IssuesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  kanbanorder: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  external_urls: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  completed_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  priority: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  project_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const OrgsWhereInputSchema: z.ZodType<Prisma.OrgsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OrgsWhereInputSchema),z.lazy(() => OrgsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrgsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrgsWhereInputSchema),z.lazy(() => OrgsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shortname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  aliases: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  first_contact: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  primary_email_address_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  primary_slack_channel_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  summary: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  missive_conversation_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  missive_label_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  history: z.lazy(() => JsonNullableFilterSchema).optional(),
  github_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  linear_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  emails: z.union([ z.lazy(() => EmailsRelationFilterSchema),z.lazy(() => EmailsWhereInputSchema) ]).optional().nullable(),
  slack_channels: z.union([ z.lazy(() => Slack_channelsRelationFilterSchema),z.lazy(() => Slack_channelsWhereInputSchema) ]).optional().nullable(),
  projects: z.lazy(() => ProjectsListRelationFilterSchema).optional()
}).strict();

export const OrgsOrderByWithRelationInputSchema: z.ZodType<Prisma.OrgsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shortname: z.lazy(() => SortOrderSchema).optional(),
  aliases: z.lazy(() => SortOrderSchema).optional(),
  first_contact: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  primary_email_address_id: z.lazy(() => SortOrderSchema).optional(),
  primary_slack_channel_id: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  missive_conversation_id: z.lazy(() => SortOrderSchema).optional(),
  missive_label_id: z.lazy(() => SortOrderSchema).optional(),
  history: z.lazy(() => SortOrderSchema).optional(),
  github_id: z.lazy(() => SortOrderSchema).optional(),
  linear_id: z.lazy(() => SortOrderSchema).optional(),
  pivotal_tracker_id: z.lazy(() => SortOrderSchema).optional(),
  emails: z.lazy(() => EmailsOrderByWithRelationInputSchema).optional(),
  slack_channels: z.lazy(() => Slack_channelsOrderByWithRelationInputSchema).optional(),
  projects: z.lazy(() => ProjectsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const OrgsWhereUniqueInputSchema: z.ZodType<Prisma.OrgsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const OrgsOrderByWithAggregationInputSchema: z.ZodType<Prisma.OrgsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shortname: z.lazy(() => SortOrderSchema).optional(),
  aliases: z.lazy(() => SortOrderSchema).optional(),
  first_contact: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  primary_email_address_id: z.lazy(() => SortOrderSchema).optional(),
  primary_slack_channel_id: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  missive_conversation_id: z.lazy(() => SortOrderSchema).optional(),
  missive_label_id: z.lazy(() => SortOrderSchema).optional(),
  history: z.lazy(() => SortOrderSchema).optional(),
  github_id: z.lazy(() => SortOrderSchema).optional(),
  linear_id: z.lazy(() => SortOrderSchema).optional(),
  pivotal_tracker_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => OrgsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => OrgsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => OrgsMinOrderByAggregateInputSchema).optional()
}).strict();

export const OrgsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OrgsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => OrgsScalarWhereWithAggregatesInputSchema),z.lazy(() => OrgsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrgsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrgsScalarWhereWithAggregatesInputSchema),z.lazy(() => OrgsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  shortname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  aliases: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  first_contact: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  primary_email_address_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  primary_slack_channel_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  summary: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  missive_conversation_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  missive_label_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  history: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  github_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  linear_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ProjectsWhereInputSchema: z.ZodType<Prisma.ProjectsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectsWhereInputSchema),z.lazy(() => ProjectsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectsWhereInputSchema),z.lazy(() => ProjectsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shortname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  aliases: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  summary: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  org_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  missive_conversation_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  missive_label_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  start_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  end_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  history: z.lazy(() => JsonNullableFilterSchema).optional(),
  status: z.union([ z.lazy(() => Enumproject_statusNullableFilterSchema),z.lazy(() => project_statusSchema) ]).optional().nullable(),
  linear_team_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]) ]).optional().nullable(),
  issues: z.lazy(() => IssuesListRelationFilterSchema).optional(),
  orgs: z.union([ z.lazy(() => OrgsRelationFilterSchema),z.lazy(() => OrgsWhereInputSchema) ]).optional(),
}).strict();

export const ProjectsOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shortname: z.lazy(() => SortOrderSchema).optional(),
  aliases: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  org_id: z.lazy(() => SortOrderSchema).optional(),
  missive_conversation_id: z.lazy(() => SortOrderSchema).optional(),
  missive_label_id: z.lazy(() => SortOrderSchema).optional(),
  start_date: z.lazy(() => SortOrderSchema).optional(),
  end_date: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  history: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  linear_team_id: z.lazy(() => SortOrderSchema).optional(),
  pivotal_tracker_id: z.lazy(() => SortOrderSchema).optional(),
  issues: z.lazy(() => IssuesOrderByRelationAggregateInputSchema).optional(),
  orgs: z.lazy(() => OrgsOrderByWithRelationInputSchema).optional()
}).strict();

export const ProjectsWhereUniqueInputSchema: z.ZodType<Prisma.ProjectsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const ProjectsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shortname: z.lazy(() => SortOrderSchema).optional(),
  aliases: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  org_id: z.lazy(() => SortOrderSchema).optional(),
  missive_conversation_id: z.lazy(() => SortOrderSchema).optional(),
  missive_label_id: z.lazy(() => SortOrderSchema).optional(),
  start_date: z.lazy(() => SortOrderSchema).optional(),
  end_date: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  history: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  linear_team_id: z.lazy(() => SortOrderSchema).optional(),
  pivotal_tracker_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProjectsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProjectsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProjectsSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProjectsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectsScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectsScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  shortname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  aliases: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  summary: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  org_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  missive_conversation_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  missive_label_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  start_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  end_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  history: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  status: z.union([ z.lazy(() => Enumproject_statusNullableWithAggregatesFilterSchema),z.lazy(() => project_statusSchema) ]).optional().nullable(),
  linear_team_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema),z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]) ]).optional().nullable(),
}).strict();

export const Slack_channelsWhereInputSchema: z.ZodType<Prisma.Slack_channelsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Slack_channelsWhereInputSchema),z.lazy(() => Slack_channelsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Slack_channelsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Slack_channelsWhereInputSchema),z.lazy(() => Slack_channelsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  orgs: z.lazy(() => OrgsListRelationFilterSchema).optional()
}).strict();

export const Slack_channelsOrderByWithRelationInputSchema: z.ZodType<Prisma.Slack_channelsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  orgs: z.lazy(() => OrgsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const Slack_channelsWhereUniqueInputSchema: z.ZodType<Prisma.Slack_channelsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const Slack_channelsOrderByWithAggregationInputSchema: z.ZodType<Prisma.Slack_channelsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Slack_channelsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Slack_channelsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Slack_channelsMinOrderByAggregateInputSchema).optional()
}).strict();

export const Slack_channelsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Slack_channelsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Slack_channelsScalarWhereWithAggregatesInputSchema),z.lazy(() => Slack_channelsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Slack_channelsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Slack_channelsScalarWhereWithAggregatesInputSchema),z.lazy(() => Slack_channelsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentsCreateInputSchema: z.ZodType<Prisma.CommentsCreateInput> = z.object({
  id: z.string().uuid(),
  body: z.string(),
  username: z.string(),
  created_at: z.coerce.date(),
  issues: z.lazy(() => IssuesCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentsUncheckedCreateInputSchema: z.ZodType<Prisma.CommentsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  body: z.string(),
  username: z.string(),
  issue_id: z.string().uuid(),
  created_at: z.coerce.date()
}).strict();

export const CommentsUpdateInputSchema: z.ZodType<Prisma.CommentsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issues: z.lazy(() => IssuesUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentsUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issue_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentsCreateManyInputSchema: z.ZodType<Prisma.CommentsCreateManyInput> = z.object({
  id: z.string().uuid(),
  body: z.string(),
  username: z.string(),
  issue_id: z.string().uuid(),
  created_at: z.coerce.date()
}).strict();

export const CommentsUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issue_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailsCreateInputSchema: z.ZodType<Prisma.EmailsCreateInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  email_address: z.string(),
  orgs: z.lazy(() => OrgsCreateNestedManyWithoutEmailsInputSchema).optional()
}).strict();

export const EmailsUncheckedCreateInputSchema: z.ZodType<Prisma.EmailsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  email_address: z.string(),
  orgs: z.lazy(() => OrgsUncheckedCreateNestedManyWithoutEmailsInputSchema).optional()
}).strict();

export const EmailsUpdateInputSchema: z.ZodType<Prisma.EmailsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orgs: z.lazy(() => OrgsUpdateManyWithoutEmailsNestedInputSchema).optional()
}).strict();

export const EmailsUncheckedUpdateInputSchema: z.ZodType<Prisma.EmailsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orgs: z.lazy(() => OrgsUncheckedUpdateManyWithoutEmailsNestedInputSchema).optional()
}).strict();

export const EmailsCreateManyInputSchema: z.ZodType<Prisma.EmailsCreateManyInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  email_address: z.string()
}).strict();

export const EmailsUpdateManyMutationInputSchema: z.ZodType<Prisma.EmailsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EmailsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IssuesCreateInputSchema: z.ZodType<Prisma.IssuesCreateInput> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  created_at: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string(),
  external_urls: z.string().optional().nullable(),
  completed_at: z.coerce.date().optional().nullable(),
  status: z.string(),
  priority: z.string(),
  updated_at: z.coerce.date().optional().nullable(),
  comments: z.lazy(() => CommentsCreateNestedManyWithoutIssuesInputSchema).optional(),
  projects: z.lazy(() => ProjectsCreateNestedOneWithoutIssuesInputSchema).optional()
}).strict();

export const IssuesUncheckedCreateInputSchema: z.ZodType<Prisma.IssuesUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  created_at: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string(),
  external_urls: z.string().optional().nullable(),
  completed_at: z.coerce.date().optional().nullable(),
  status: z.string(),
  priority: z.string(),
  updated_at: z.coerce.date().optional().nullable(),
  project_id: z.string().uuid().optional().nullable(),
  comments: z.lazy(() => CommentsUncheckedCreateNestedManyWithoutIssuesInputSchema).optional()
}).strict();

export const IssuesUpdateInputSchema: z.ZodType<Prisma.IssuesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_urls: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.lazy(() => CommentsUpdateManyWithoutIssuesNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectsUpdateOneWithoutIssuesNestedInputSchema).optional()
}).strict();

export const IssuesUncheckedUpdateInputSchema: z.ZodType<Prisma.IssuesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_urls: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  project_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.lazy(() => CommentsUncheckedUpdateManyWithoutIssuesNestedInputSchema).optional()
}).strict();

export const IssuesCreateManyInputSchema: z.ZodType<Prisma.IssuesCreateManyInput> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  created_at: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string(),
  external_urls: z.string().optional().nullable(),
  completed_at: z.coerce.date().optional().nullable(),
  status: z.string(),
  priority: z.string(),
  updated_at: z.coerce.date().optional().nullable(),
  project_id: z.string().uuid().optional().nullable()
}).strict();

export const IssuesUpdateManyMutationInputSchema: z.ZodType<Prisma.IssuesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_urls: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IssuesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IssuesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_urls: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  project_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const OrgsCreateInputSchema: z.ZodType<Prisma.OrgsCreateInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  first_contact: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string().uuid(),
  missive_label_id: z.string().uuid(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.string().uuid().optional().nullable(),
  linear_id: z.string().uuid().optional().nullable(),
  pivotal_tracker_id: z.string().uuid().optional().nullable(),
  emails: z.lazy(() => EmailsCreateNestedOneWithoutOrgsInputSchema).optional(),
  slack_channels: z.lazy(() => Slack_channelsCreateNestedOneWithoutOrgsInputSchema).optional(),
  projects: z.lazy(() => ProjectsCreateNestedManyWithoutOrgsInputSchema).optional()
}).strict();

export const OrgsUncheckedCreateInputSchema: z.ZodType<Prisma.OrgsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  first_contact: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  primary_email_address_id: z.string().uuid().optional().nullable(),
  primary_slack_channel_id: z.string().uuid().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string().uuid(),
  missive_label_id: z.string().uuid(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.string().uuid().optional().nullable(),
  linear_id: z.string().uuid().optional().nullable(),
  pivotal_tracker_id: z.string().uuid().optional().nullable(),
  projects: z.lazy(() => ProjectsUncheckedCreateNestedManyWithoutOrgsInputSchema).optional()
}).strict();

export const OrgsUpdateInputSchema: z.ZodType<Prisma.OrgsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_contact: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emails: z.lazy(() => EmailsUpdateOneWithoutOrgsNestedInputSchema).optional(),
  slack_channels: z.lazy(() => Slack_channelsUpdateOneWithoutOrgsNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectsUpdateManyWithoutOrgsNestedInputSchema).optional()
}).strict();

export const OrgsUncheckedUpdateInputSchema: z.ZodType<Prisma.OrgsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_contact: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primary_email_address_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primary_slack_channel_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projects: z.lazy(() => ProjectsUncheckedUpdateManyWithoutOrgsNestedInputSchema).optional()
}).strict();

export const OrgsCreateManyInputSchema: z.ZodType<Prisma.OrgsCreateManyInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  first_contact: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  primary_email_address_id: z.string().uuid().optional().nullable(),
  primary_slack_channel_id: z.string().uuid().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string().uuid(),
  missive_label_id: z.string().uuid(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.string().uuid().optional().nullable(),
  linear_id: z.string().uuid().optional().nullable(),
  pivotal_tracker_id: z.string().uuid().optional().nullable()
}).strict();

export const OrgsUpdateManyMutationInputSchema: z.ZodType<Prisma.OrgsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_contact: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const OrgsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OrgsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_contact: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primary_email_address_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primary_slack_channel_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectsCreateInputSchema: z.ZodType<Prisma.ProjectsCreateInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string().uuid(),
  missive_label_id: z.string().uuid(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.lazy(() => project_statusSchema).optional().nullable(),
  linear_team_id: z.string().uuid().optional().nullable(),
  pivotal_tracker_id: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable(),
  issues: z.lazy(() => IssuesCreateNestedManyWithoutProjectsInputSchema).optional(),
  orgs: z.lazy(() => OrgsCreateNestedOneWithoutProjectsInputSchema)
}).strict();

export const ProjectsUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  org_id: z.string().uuid(),
  missive_conversation_id: z.string().uuid(),
  missive_label_id: z.string().uuid(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.lazy(() => project_statusSchema).optional().nullable(),
  linear_team_id: z.string().uuid().optional().nullable(),
  pivotal_tracker_id: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable(),
  issues: z.lazy(() => IssuesUncheckedCreateNestedManyWithoutProjectsInputSchema).optional()
}).strict();

export const ProjectsUpdateInputSchema: z.ZodType<Prisma.ProjectsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NullableEnumproject_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_team_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issues: z.lazy(() => IssuesUpdateManyWithoutProjectsNestedInputSchema).optional(),
  orgs: z.lazy(() => OrgsUpdateOneRequiredWithoutProjectsNestedInputSchema).optional()
}).strict();

export const ProjectsUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  org_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_conversation_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NullableEnumproject_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_team_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issues: z.lazy(() => IssuesUncheckedUpdateManyWithoutProjectsNestedInputSchema).optional()
}).strict();

export const ProjectsCreateManyInputSchema: z.ZodType<Prisma.ProjectsCreateManyInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  org_id: z.string().uuid(),
  missive_conversation_id: z.string().uuid(),
  missive_label_id: z.string().uuid(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.lazy(() => project_statusSchema).optional().nullable(),
  linear_team_id: z.string().uuid().optional().nullable(),
  pivotal_tracker_id: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable()
}).strict();

export const ProjectsUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NullableEnumproject_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_team_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  org_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_conversation_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NullableEnumproject_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_team_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Slack_channelsCreateInputSchema: z.ZodType<Prisma.Slack_channelsCreateInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  orgs: z.lazy(() => OrgsCreateNestedManyWithoutSlack_channelsInputSchema).optional()
}).strict();

export const Slack_channelsUncheckedCreateInputSchema: z.ZodType<Prisma.Slack_channelsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  orgs: z.lazy(() => OrgsUncheckedCreateNestedManyWithoutSlack_channelsInputSchema).optional()
}).strict();

export const Slack_channelsUpdateInputSchema: z.ZodType<Prisma.Slack_channelsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  orgs: z.lazy(() => OrgsUpdateManyWithoutSlack_channelsNestedInputSchema).optional()
}).strict();

export const Slack_channelsUncheckedUpdateInputSchema: z.ZodType<Prisma.Slack_channelsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  orgs: z.lazy(() => OrgsUncheckedUpdateManyWithoutSlack_channelsNestedInputSchema).optional()
}).strict();

export const Slack_channelsCreateManyInputSchema: z.ZodType<Prisma.Slack_channelsCreateManyInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date()
}).strict();

export const Slack_channelsUpdateManyMutationInputSchema: z.ZodType<Prisma.Slack_channelsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Slack_channelsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Slack_channelsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const IssuesRelationFilterSchema: z.ZodType<Prisma.IssuesRelationFilter> = z.object({
  is: z.lazy(() => IssuesWhereInputSchema).optional(),
  isNot: z.lazy(() => IssuesWhereInputSchema).optional()
}).strict();

export const CommentsCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  issue_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  issue_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentsMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  issue_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const OrgsListRelationFilterSchema: z.ZodType<Prisma.OrgsListRelationFilter> = z.object({
  every: z.lazy(() => OrgsWhereInputSchema).optional(),
  some: z.lazy(() => OrgsWhereInputSchema).optional(),
  none: z.lazy(() => OrgsWhereInputSchema).optional()
}).strict();

export const OrgsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.OrgsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailsCountOrderByAggregateInputSchema: z.ZodType<Prisma.EmailsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EmailsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailsMinOrderByAggregateInputSchema: z.ZodType<Prisma.EmailsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const CommentsListRelationFilterSchema: z.ZodType<Prisma.CommentsListRelationFilter> = z.object({
  every: z.lazy(() => CommentsWhereInputSchema).optional(),
  some: z.lazy(() => CommentsWhereInputSchema).optional(),
  none: z.lazy(() => CommentsWhereInputSchema).optional()
}).strict();

export const ProjectsRelationFilterSchema: z.ZodType<Prisma.ProjectsRelationFilter> = z.object({
  is: z.lazy(() => ProjectsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProjectsWhereInputSchema).optional().nullable()
}).strict();

export const CommentsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IssuesCountOrderByAggregateInputSchema: z.ZodType<Prisma.IssuesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  kanbanorder: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  external_urls: z.lazy(() => SortOrderSchema).optional(),
  completed_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  project_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IssuesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IssuesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  kanbanorder: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  external_urls: z.lazy(() => SortOrderSchema).optional(),
  completed_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  project_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IssuesMinOrderByAggregateInputSchema: z.ZodType<Prisma.IssuesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  kanbanorder: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  external_urls: z.lazy(() => SortOrderSchema).optional(),
  completed_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  project_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const EmailsRelationFilterSchema: z.ZodType<Prisma.EmailsRelationFilter> = z.object({
  is: z.lazy(() => EmailsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => EmailsWhereInputSchema).optional().nullable()
}).strict();

export const Slack_channelsRelationFilterSchema: z.ZodType<Prisma.Slack_channelsRelationFilter> = z.object({
  is: z.lazy(() => Slack_channelsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => Slack_channelsWhereInputSchema).optional().nullable()
}).strict();

export const ProjectsListRelationFilterSchema: z.ZodType<Prisma.ProjectsListRelationFilter> = z.object({
  every: z.lazy(() => ProjectsWhereInputSchema).optional(),
  some: z.lazy(() => ProjectsWhereInputSchema).optional(),
  none: z.lazy(() => ProjectsWhereInputSchema).optional()
}).strict();

export const ProjectsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProjectsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrgsCountOrderByAggregateInputSchema: z.ZodType<Prisma.OrgsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shortname: z.lazy(() => SortOrderSchema).optional(),
  aliases: z.lazy(() => SortOrderSchema).optional(),
  first_contact: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  primary_email_address_id: z.lazy(() => SortOrderSchema).optional(),
  primary_slack_channel_id: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  missive_conversation_id: z.lazy(() => SortOrderSchema).optional(),
  missive_label_id: z.lazy(() => SortOrderSchema).optional(),
  history: z.lazy(() => SortOrderSchema).optional(),
  github_id: z.lazy(() => SortOrderSchema).optional(),
  linear_id: z.lazy(() => SortOrderSchema).optional(),
  pivotal_tracker_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrgsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OrgsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shortname: z.lazy(() => SortOrderSchema).optional(),
  aliases: z.lazy(() => SortOrderSchema).optional(),
  first_contact: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  primary_email_address_id: z.lazy(() => SortOrderSchema).optional(),
  primary_slack_channel_id: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  missive_conversation_id: z.lazy(() => SortOrderSchema).optional(),
  missive_label_id: z.lazy(() => SortOrderSchema).optional(),
  github_id: z.lazy(() => SortOrderSchema).optional(),
  linear_id: z.lazy(() => SortOrderSchema).optional(),
  pivotal_tracker_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrgsMinOrderByAggregateInputSchema: z.ZodType<Prisma.OrgsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shortname: z.lazy(() => SortOrderSchema).optional(),
  aliases: z.lazy(() => SortOrderSchema).optional(),
  first_contact: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  primary_email_address_id: z.lazy(() => SortOrderSchema).optional(),
  primary_slack_channel_id: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  missive_conversation_id: z.lazy(() => SortOrderSchema).optional(),
  missive_label_id: z.lazy(() => SortOrderSchema).optional(),
  github_id: z.lazy(() => SortOrderSchema).optional(),
  linear_id: z.lazy(() => SortOrderSchema).optional(),
  pivotal_tracker_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const Enumproject_statusNullableFilterSchema: z.ZodType<Prisma.Enumproject_statusNullableFilter> = z.object({
  equals: z.lazy(() => project_statusSchema).optional().nullable(),
  in: z.lazy(() => project_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => project_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NestedEnumproject_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BigIntNullableFilterSchema: z.ZodType<Prisma.BigIntNullableFilter> = z.object({
  equals: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable(),
  in: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n).array(), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt).array() ]).optional().nullable(),
  notIn: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n).array(), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt).array() ]).optional().nullable(),
  lt: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  lte: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  gt: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  gte: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  not: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NestedBigIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IssuesListRelationFilterSchema: z.ZodType<Prisma.IssuesListRelationFilter> = z.object({
  every: z.lazy(() => IssuesWhereInputSchema).optional(),
  some: z.lazy(() => IssuesWhereInputSchema).optional(),
  none: z.lazy(() => IssuesWhereInputSchema).optional()
}).strict();

export const OrgsRelationFilterSchema: z.ZodType<Prisma.OrgsRelationFilter> = z.object({
  is: z.lazy(() => OrgsWhereInputSchema).optional(),
  isNot: z.lazy(() => OrgsWhereInputSchema).optional()
}).strict();

export const IssuesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IssuesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shortname: z.lazy(() => SortOrderSchema).optional(),
  aliases: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  org_id: z.lazy(() => SortOrderSchema).optional(),
  missive_conversation_id: z.lazy(() => SortOrderSchema).optional(),
  missive_label_id: z.lazy(() => SortOrderSchema).optional(),
  start_date: z.lazy(() => SortOrderSchema).optional(),
  end_date: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  history: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  linear_team_id: z.lazy(() => SortOrderSchema).optional(),
  pivotal_tracker_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectsAvgOrderByAggregateInput> = z.object({
  pivotal_tracker_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shortname: z.lazy(() => SortOrderSchema).optional(),
  aliases: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  org_id: z.lazy(() => SortOrderSchema).optional(),
  missive_conversation_id: z.lazy(() => SortOrderSchema).optional(),
  missive_label_id: z.lazy(() => SortOrderSchema).optional(),
  start_date: z.lazy(() => SortOrderSchema).optional(),
  end_date: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  linear_team_id: z.lazy(() => SortOrderSchema).optional(),
  pivotal_tracker_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  shortname: z.lazy(() => SortOrderSchema).optional(),
  aliases: z.lazy(() => SortOrderSchema).optional(),
  summary: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  org_id: z.lazy(() => SortOrderSchema).optional(),
  missive_conversation_id: z.lazy(() => SortOrderSchema).optional(),
  missive_label_id: z.lazy(() => SortOrderSchema).optional(),
  start_date: z.lazy(() => SortOrderSchema).optional(),
  end_date: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  linear_team_id: z.lazy(() => SortOrderSchema).optional(),
  pivotal_tracker_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectsSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectsSumOrderByAggregateInput> = z.object({
  pivotal_tracker_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumproject_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumproject_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => project_statusSchema).optional().nullable(),
  in: z.lazy(() => project_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => project_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NestedEnumproject_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumproject_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumproject_statusNullableFilterSchema).optional()
}).strict();

export const BigIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntNullableWithAggregatesFilter> = z.object({
  equals: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable(),
  in: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n).array(), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt).array() ]).optional().nullable(),
  notIn: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n).array(), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt).array() ]).optional().nullable(),
  lt: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  lte: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  gt: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  gte: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  not: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional()
}).strict();

export const Slack_channelsCountOrderByAggregateInputSchema: z.ZodType<Prisma.Slack_channelsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Slack_channelsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Slack_channelsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Slack_channelsMinOrderByAggregateInputSchema: z.ZodType<Prisma.Slack_channelsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IssuesCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.IssuesCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => IssuesCreateWithoutCommentsInputSchema),z.lazy(() => IssuesUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IssuesCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => IssuesWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const IssuesUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.IssuesUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => IssuesCreateWithoutCommentsInputSchema),z.lazy(() => IssuesUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IssuesCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => IssuesUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => IssuesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IssuesUpdateWithoutCommentsInputSchema),z.lazy(() => IssuesUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const OrgsCreateNestedManyWithoutEmailsInputSchema: z.ZodType<Prisma.OrgsCreateNestedManyWithoutEmailsInput> = z.object({
  create: z.union([ z.lazy(() => OrgsCreateWithoutEmailsInputSchema),z.lazy(() => OrgsCreateWithoutEmailsInputSchema).array(),z.lazy(() => OrgsUncheckedCreateWithoutEmailsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutEmailsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrgsCreateOrConnectWithoutEmailsInputSchema),z.lazy(() => OrgsCreateOrConnectWithoutEmailsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrgsCreateManyEmailsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrgsUncheckedCreateNestedManyWithoutEmailsInputSchema: z.ZodType<Prisma.OrgsUncheckedCreateNestedManyWithoutEmailsInput> = z.object({
  create: z.union([ z.lazy(() => OrgsCreateWithoutEmailsInputSchema),z.lazy(() => OrgsCreateWithoutEmailsInputSchema).array(),z.lazy(() => OrgsUncheckedCreateWithoutEmailsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutEmailsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrgsCreateOrConnectWithoutEmailsInputSchema),z.lazy(() => OrgsCreateOrConnectWithoutEmailsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrgsCreateManyEmailsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrgsUpdateManyWithoutEmailsNestedInputSchema: z.ZodType<Prisma.OrgsUpdateManyWithoutEmailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrgsCreateWithoutEmailsInputSchema),z.lazy(() => OrgsCreateWithoutEmailsInputSchema).array(),z.lazy(() => OrgsUncheckedCreateWithoutEmailsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutEmailsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrgsCreateOrConnectWithoutEmailsInputSchema),z.lazy(() => OrgsCreateOrConnectWithoutEmailsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrgsUpsertWithWhereUniqueWithoutEmailsInputSchema),z.lazy(() => OrgsUpsertWithWhereUniqueWithoutEmailsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrgsCreateManyEmailsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrgsUpdateWithWhereUniqueWithoutEmailsInputSchema),z.lazy(() => OrgsUpdateWithWhereUniqueWithoutEmailsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrgsUpdateManyWithWhereWithoutEmailsInputSchema),z.lazy(() => OrgsUpdateManyWithWhereWithoutEmailsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrgsScalarWhereInputSchema),z.lazy(() => OrgsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrgsUncheckedUpdateManyWithoutEmailsNestedInputSchema: z.ZodType<Prisma.OrgsUncheckedUpdateManyWithoutEmailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrgsCreateWithoutEmailsInputSchema),z.lazy(() => OrgsCreateWithoutEmailsInputSchema).array(),z.lazy(() => OrgsUncheckedCreateWithoutEmailsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutEmailsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrgsCreateOrConnectWithoutEmailsInputSchema),z.lazy(() => OrgsCreateOrConnectWithoutEmailsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrgsUpsertWithWhereUniqueWithoutEmailsInputSchema),z.lazy(() => OrgsUpsertWithWhereUniqueWithoutEmailsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrgsCreateManyEmailsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrgsUpdateWithWhereUniqueWithoutEmailsInputSchema),z.lazy(() => OrgsUpdateWithWhereUniqueWithoutEmailsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrgsUpdateManyWithWhereWithoutEmailsInputSchema),z.lazy(() => OrgsUpdateManyWithWhereWithoutEmailsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrgsScalarWhereInputSchema),z.lazy(() => OrgsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentsCreateNestedManyWithoutIssuesInputSchema: z.ZodType<Prisma.CommentsCreateNestedManyWithoutIssuesInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutIssuesInputSchema),z.lazy(() => CommentsCreateWithoutIssuesInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutIssuesInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutIssuesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyIssuesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectsCreateNestedOneWithoutIssuesInputSchema: z.ZodType<Prisma.ProjectsCreateNestedOneWithoutIssuesInput> = z.object({
  create: z.union([ z.lazy(() => ProjectsCreateWithoutIssuesInputSchema),z.lazy(() => ProjectsUncheckedCreateWithoutIssuesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectsCreateOrConnectWithoutIssuesInputSchema).optional(),
  connect: z.lazy(() => ProjectsWhereUniqueInputSchema).optional()
}).strict();

export const CommentsUncheckedCreateNestedManyWithoutIssuesInputSchema: z.ZodType<Prisma.CommentsUncheckedCreateNestedManyWithoutIssuesInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutIssuesInputSchema),z.lazy(() => CommentsCreateWithoutIssuesInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutIssuesInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutIssuesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyIssuesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const CommentsUpdateManyWithoutIssuesNestedInputSchema: z.ZodType<Prisma.CommentsUpdateManyWithoutIssuesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutIssuesInputSchema),z.lazy(() => CommentsCreateWithoutIssuesInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutIssuesInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutIssuesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentsUpsertWithWhereUniqueWithoutIssuesInputSchema),z.lazy(() => CommentsUpsertWithWhereUniqueWithoutIssuesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyIssuesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentsUpdateWithWhereUniqueWithoutIssuesInputSchema),z.lazy(() => CommentsUpdateWithWhereUniqueWithoutIssuesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentsUpdateManyWithWhereWithoutIssuesInputSchema),z.lazy(() => CommentsUpdateManyWithWhereWithoutIssuesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentsScalarWhereInputSchema),z.lazy(() => CommentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectsUpdateOneWithoutIssuesNestedInputSchema: z.ZodType<Prisma.ProjectsUpdateOneWithoutIssuesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectsCreateWithoutIssuesInputSchema),z.lazy(() => ProjectsUncheckedCreateWithoutIssuesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectsCreateOrConnectWithoutIssuesInputSchema).optional(),
  upsert: z.lazy(() => ProjectsUpsertWithoutIssuesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProjectsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectsUpdateWithoutIssuesInputSchema),z.lazy(() => ProjectsUncheckedUpdateWithoutIssuesInputSchema) ]).optional(),
}).strict();

export const CommentsUncheckedUpdateManyWithoutIssuesNestedInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateManyWithoutIssuesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutIssuesInputSchema),z.lazy(() => CommentsCreateWithoutIssuesInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutIssuesInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutIssuesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentsUpsertWithWhereUniqueWithoutIssuesInputSchema),z.lazy(() => CommentsUpsertWithWhereUniqueWithoutIssuesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyIssuesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentsUpdateWithWhereUniqueWithoutIssuesInputSchema),z.lazy(() => CommentsUpdateWithWhereUniqueWithoutIssuesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentsUpdateManyWithWhereWithoutIssuesInputSchema),z.lazy(() => CommentsUpdateManyWithWhereWithoutIssuesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentsScalarWhereInputSchema),z.lazy(() => CommentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EmailsCreateNestedOneWithoutOrgsInputSchema: z.ZodType<Prisma.EmailsCreateNestedOneWithoutOrgsInput> = z.object({
  create: z.union([ z.lazy(() => EmailsCreateWithoutOrgsInputSchema),z.lazy(() => EmailsUncheckedCreateWithoutOrgsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailsCreateOrConnectWithoutOrgsInputSchema).optional(),
  connect: z.lazy(() => EmailsWhereUniqueInputSchema).optional()
}).strict();

export const Slack_channelsCreateNestedOneWithoutOrgsInputSchema: z.ZodType<Prisma.Slack_channelsCreateNestedOneWithoutOrgsInput> = z.object({
  create: z.union([ z.lazy(() => Slack_channelsCreateWithoutOrgsInputSchema),z.lazy(() => Slack_channelsUncheckedCreateWithoutOrgsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Slack_channelsCreateOrConnectWithoutOrgsInputSchema).optional(),
  connect: z.lazy(() => Slack_channelsWhereUniqueInputSchema).optional()
}).strict();

export const ProjectsCreateNestedManyWithoutOrgsInputSchema: z.ZodType<Prisma.ProjectsCreateNestedManyWithoutOrgsInput> = z.object({
  create: z.union([ z.lazy(() => ProjectsCreateWithoutOrgsInputSchema),z.lazy(() => ProjectsCreateWithoutOrgsInputSchema).array(),z.lazy(() => ProjectsUncheckedCreateWithoutOrgsInputSchema),z.lazy(() => ProjectsUncheckedCreateWithoutOrgsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectsCreateOrConnectWithoutOrgsInputSchema),z.lazy(() => ProjectsCreateOrConnectWithoutOrgsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectsCreateManyOrgsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectsWhereUniqueInputSchema),z.lazy(() => ProjectsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectsUncheckedCreateNestedManyWithoutOrgsInputSchema: z.ZodType<Prisma.ProjectsUncheckedCreateNestedManyWithoutOrgsInput> = z.object({
  create: z.union([ z.lazy(() => ProjectsCreateWithoutOrgsInputSchema),z.lazy(() => ProjectsCreateWithoutOrgsInputSchema).array(),z.lazy(() => ProjectsUncheckedCreateWithoutOrgsInputSchema),z.lazy(() => ProjectsUncheckedCreateWithoutOrgsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectsCreateOrConnectWithoutOrgsInputSchema),z.lazy(() => ProjectsCreateOrConnectWithoutOrgsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectsCreateManyOrgsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectsWhereUniqueInputSchema),z.lazy(() => ProjectsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EmailsUpdateOneWithoutOrgsNestedInputSchema: z.ZodType<Prisma.EmailsUpdateOneWithoutOrgsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailsCreateWithoutOrgsInputSchema),z.lazy(() => EmailsUncheckedCreateWithoutOrgsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EmailsCreateOrConnectWithoutOrgsInputSchema).optional(),
  upsert: z.lazy(() => EmailsUpsertWithoutOrgsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => EmailsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EmailsUpdateWithoutOrgsInputSchema),z.lazy(() => EmailsUncheckedUpdateWithoutOrgsInputSchema) ]).optional(),
}).strict();

export const Slack_channelsUpdateOneWithoutOrgsNestedInputSchema: z.ZodType<Prisma.Slack_channelsUpdateOneWithoutOrgsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Slack_channelsCreateWithoutOrgsInputSchema),z.lazy(() => Slack_channelsUncheckedCreateWithoutOrgsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Slack_channelsCreateOrConnectWithoutOrgsInputSchema).optional(),
  upsert: z.lazy(() => Slack_channelsUpsertWithoutOrgsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => Slack_channelsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Slack_channelsUpdateWithoutOrgsInputSchema),z.lazy(() => Slack_channelsUncheckedUpdateWithoutOrgsInputSchema) ]).optional(),
}).strict();

export const ProjectsUpdateManyWithoutOrgsNestedInputSchema: z.ZodType<Prisma.ProjectsUpdateManyWithoutOrgsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectsCreateWithoutOrgsInputSchema),z.lazy(() => ProjectsCreateWithoutOrgsInputSchema).array(),z.lazy(() => ProjectsUncheckedCreateWithoutOrgsInputSchema),z.lazy(() => ProjectsUncheckedCreateWithoutOrgsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectsCreateOrConnectWithoutOrgsInputSchema),z.lazy(() => ProjectsCreateOrConnectWithoutOrgsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectsUpsertWithWhereUniqueWithoutOrgsInputSchema),z.lazy(() => ProjectsUpsertWithWhereUniqueWithoutOrgsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectsCreateManyOrgsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectsWhereUniqueInputSchema),z.lazy(() => ProjectsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectsWhereUniqueInputSchema),z.lazy(() => ProjectsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectsWhereUniqueInputSchema),z.lazy(() => ProjectsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectsWhereUniqueInputSchema),z.lazy(() => ProjectsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectsUpdateWithWhereUniqueWithoutOrgsInputSchema),z.lazy(() => ProjectsUpdateWithWhereUniqueWithoutOrgsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectsUpdateManyWithWhereWithoutOrgsInputSchema),z.lazy(() => ProjectsUpdateManyWithWhereWithoutOrgsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectsScalarWhereInputSchema),z.lazy(() => ProjectsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectsUncheckedUpdateManyWithoutOrgsNestedInputSchema: z.ZodType<Prisma.ProjectsUncheckedUpdateManyWithoutOrgsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectsCreateWithoutOrgsInputSchema),z.lazy(() => ProjectsCreateWithoutOrgsInputSchema).array(),z.lazy(() => ProjectsUncheckedCreateWithoutOrgsInputSchema),z.lazy(() => ProjectsUncheckedCreateWithoutOrgsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectsCreateOrConnectWithoutOrgsInputSchema),z.lazy(() => ProjectsCreateOrConnectWithoutOrgsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectsUpsertWithWhereUniqueWithoutOrgsInputSchema),z.lazy(() => ProjectsUpsertWithWhereUniqueWithoutOrgsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectsCreateManyOrgsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectsWhereUniqueInputSchema),z.lazy(() => ProjectsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectsWhereUniqueInputSchema),z.lazy(() => ProjectsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectsWhereUniqueInputSchema),z.lazy(() => ProjectsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectsWhereUniqueInputSchema),z.lazy(() => ProjectsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectsUpdateWithWhereUniqueWithoutOrgsInputSchema),z.lazy(() => ProjectsUpdateWithWhereUniqueWithoutOrgsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectsUpdateManyWithWhereWithoutOrgsInputSchema),z.lazy(() => ProjectsUpdateManyWithWhereWithoutOrgsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectsScalarWhereInputSchema),z.lazy(() => ProjectsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IssuesCreateNestedManyWithoutProjectsInputSchema: z.ZodType<Prisma.IssuesCreateNestedManyWithoutProjectsInput> = z.object({
  create: z.union([ z.lazy(() => IssuesCreateWithoutProjectsInputSchema),z.lazy(() => IssuesCreateWithoutProjectsInputSchema).array(),z.lazy(() => IssuesUncheckedCreateWithoutProjectsInputSchema),z.lazy(() => IssuesUncheckedCreateWithoutProjectsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IssuesCreateOrConnectWithoutProjectsInputSchema),z.lazy(() => IssuesCreateOrConnectWithoutProjectsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IssuesCreateManyProjectsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IssuesWhereUniqueInputSchema),z.lazy(() => IssuesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrgsCreateNestedOneWithoutProjectsInputSchema: z.ZodType<Prisma.OrgsCreateNestedOneWithoutProjectsInput> = z.object({
  create: z.union([ z.lazy(() => OrgsCreateWithoutProjectsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrgsCreateOrConnectWithoutProjectsInputSchema).optional(),
  connect: z.lazy(() => OrgsWhereUniqueInputSchema).optional()
}).strict();

export const IssuesUncheckedCreateNestedManyWithoutProjectsInputSchema: z.ZodType<Prisma.IssuesUncheckedCreateNestedManyWithoutProjectsInput> = z.object({
  create: z.union([ z.lazy(() => IssuesCreateWithoutProjectsInputSchema),z.lazy(() => IssuesCreateWithoutProjectsInputSchema).array(),z.lazy(() => IssuesUncheckedCreateWithoutProjectsInputSchema),z.lazy(() => IssuesUncheckedCreateWithoutProjectsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IssuesCreateOrConnectWithoutProjectsInputSchema),z.lazy(() => IssuesCreateOrConnectWithoutProjectsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IssuesCreateManyProjectsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IssuesWhereUniqueInputSchema),z.lazy(() => IssuesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableEnumproject_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumproject_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => project_statusSchema).optional().nullable()
}).strict();

export const NullableBigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBigIntFieldUpdateOperationsInput> = z.object({
  set: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable(),
  increment: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  decrement: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  multiply: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  divide: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional()
}).strict();

export const IssuesUpdateManyWithoutProjectsNestedInputSchema: z.ZodType<Prisma.IssuesUpdateManyWithoutProjectsNestedInput> = z.object({
  create: z.union([ z.lazy(() => IssuesCreateWithoutProjectsInputSchema),z.lazy(() => IssuesCreateWithoutProjectsInputSchema).array(),z.lazy(() => IssuesUncheckedCreateWithoutProjectsInputSchema),z.lazy(() => IssuesUncheckedCreateWithoutProjectsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IssuesCreateOrConnectWithoutProjectsInputSchema),z.lazy(() => IssuesCreateOrConnectWithoutProjectsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IssuesUpsertWithWhereUniqueWithoutProjectsInputSchema),z.lazy(() => IssuesUpsertWithWhereUniqueWithoutProjectsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IssuesCreateManyProjectsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IssuesWhereUniqueInputSchema),z.lazy(() => IssuesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IssuesWhereUniqueInputSchema),z.lazy(() => IssuesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IssuesWhereUniqueInputSchema),z.lazy(() => IssuesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IssuesWhereUniqueInputSchema),z.lazy(() => IssuesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IssuesUpdateWithWhereUniqueWithoutProjectsInputSchema),z.lazy(() => IssuesUpdateWithWhereUniqueWithoutProjectsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IssuesUpdateManyWithWhereWithoutProjectsInputSchema),z.lazy(() => IssuesUpdateManyWithWhereWithoutProjectsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IssuesScalarWhereInputSchema),z.lazy(() => IssuesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrgsUpdateOneRequiredWithoutProjectsNestedInputSchema: z.ZodType<Prisma.OrgsUpdateOneRequiredWithoutProjectsNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrgsCreateWithoutProjectsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrgsCreateOrConnectWithoutProjectsInputSchema).optional(),
  upsert: z.lazy(() => OrgsUpsertWithoutProjectsInputSchema).optional(),
  connect: z.lazy(() => OrgsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrgsUpdateWithoutProjectsInputSchema),z.lazy(() => OrgsUncheckedUpdateWithoutProjectsInputSchema) ]).optional(),
}).strict();

export const IssuesUncheckedUpdateManyWithoutProjectsNestedInputSchema: z.ZodType<Prisma.IssuesUncheckedUpdateManyWithoutProjectsNestedInput> = z.object({
  create: z.union([ z.lazy(() => IssuesCreateWithoutProjectsInputSchema),z.lazy(() => IssuesCreateWithoutProjectsInputSchema).array(),z.lazy(() => IssuesUncheckedCreateWithoutProjectsInputSchema),z.lazy(() => IssuesUncheckedCreateWithoutProjectsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IssuesCreateOrConnectWithoutProjectsInputSchema),z.lazy(() => IssuesCreateOrConnectWithoutProjectsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IssuesUpsertWithWhereUniqueWithoutProjectsInputSchema),z.lazy(() => IssuesUpsertWithWhereUniqueWithoutProjectsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IssuesCreateManyProjectsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IssuesWhereUniqueInputSchema),z.lazy(() => IssuesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IssuesWhereUniqueInputSchema),z.lazy(() => IssuesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IssuesWhereUniqueInputSchema),z.lazy(() => IssuesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IssuesWhereUniqueInputSchema),z.lazy(() => IssuesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IssuesUpdateWithWhereUniqueWithoutProjectsInputSchema),z.lazy(() => IssuesUpdateWithWhereUniqueWithoutProjectsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IssuesUpdateManyWithWhereWithoutProjectsInputSchema),z.lazy(() => IssuesUpdateManyWithWhereWithoutProjectsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IssuesScalarWhereInputSchema),z.lazy(() => IssuesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrgsCreateNestedManyWithoutSlack_channelsInputSchema: z.ZodType<Prisma.OrgsCreateNestedManyWithoutSlack_channelsInput> = z.object({
  create: z.union([ z.lazy(() => OrgsCreateWithoutSlack_channelsInputSchema),z.lazy(() => OrgsCreateWithoutSlack_channelsInputSchema).array(),z.lazy(() => OrgsUncheckedCreateWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutSlack_channelsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrgsCreateOrConnectWithoutSlack_channelsInputSchema),z.lazy(() => OrgsCreateOrConnectWithoutSlack_channelsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrgsCreateManySlack_channelsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrgsUncheckedCreateNestedManyWithoutSlack_channelsInputSchema: z.ZodType<Prisma.OrgsUncheckedCreateNestedManyWithoutSlack_channelsInput> = z.object({
  create: z.union([ z.lazy(() => OrgsCreateWithoutSlack_channelsInputSchema),z.lazy(() => OrgsCreateWithoutSlack_channelsInputSchema).array(),z.lazy(() => OrgsUncheckedCreateWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutSlack_channelsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrgsCreateOrConnectWithoutSlack_channelsInputSchema),z.lazy(() => OrgsCreateOrConnectWithoutSlack_channelsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrgsCreateManySlack_channelsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const OrgsUpdateManyWithoutSlack_channelsNestedInputSchema: z.ZodType<Prisma.OrgsUpdateManyWithoutSlack_channelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrgsCreateWithoutSlack_channelsInputSchema),z.lazy(() => OrgsCreateWithoutSlack_channelsInputSchema).array(),z.lazy(() => OrgsUncheckedCreateWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutSlack_channelsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrgsCreateOrConnectWithoutSlack_channelsInputSchema),z.lazy(() => OrgsCreateOrConnectWithoutSlack_channelsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrgsUpsertWithWhereUniqueWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUpsertWithWhereUniqueWithoutSlack_channelsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrgsCreateManySlack_channelsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrgsUpdateWithWhereUniqueWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUpdateWithWhereUniqueWithoutSlack_channelsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrgsUpdateManyWithWhereWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUpdateManyWithWhereWithoutSlack_channelsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrgsScalarWhereInputSchema),z.lazy(() => OrgsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrgsUncheckedUpdateManyWithoutSlack_channelsNestedInputSchema: z.ZodType<Prisma.OrgsUncheckedUpdateManyWithoutSlack_channelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrgsCreateWithoutSlack_channelsInputSchema),z.lazy(() => OrgsCreateWithoutSlack_channelsInputSchema).array(),z.lazy(() => OrgsUncheckedCreateWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutSlack_channelsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => OrgsCreateOrConnectWithoutSlack_channelsInputSchema),z.lazy(() => OrgsCreateOrConnectWithoutSlack_channelsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => OrgsUpsertWithWhereUniqueWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUpsertWithWhereUniqueWithoutSlack_channelsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => OrgsCreateManySlack_channelsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => OrgsWhereUniqueInputSchema),z.lazy(() => OrgsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => OrgsUpdateWithWhereUniqueWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUpdateWithWhereUniqueWithoutSlack_channelsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => OrgsUpdateManyWithWhereWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUpdateManyWithWhereWithoutSlack_channelsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => OrgsScalarWhereInputSchema),z.lazy(() => OrgsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NestedEnumproject_statusNullableFilterSchema: z.ZodType<Prisma.NestedEnumproject_statusNullableFilter> = z.object({
  equals: z.lazy(() => project_statusSchema).optional().nullable(),
  in: z.lazy(() => project_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => project_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NestedEnumproject_statusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBigIntNullableFilterSchema: z.ZodType<Prisma.NestedBigIntNullableFilter> = z.object({
  equals: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable(),
  in: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n).array(), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt).array() ]).optional().nullable(),
  notIn: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n).array(), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt).array() ]).optional().nullable(),
  lt: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  lte: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  gt: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  gte: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  not: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NestedBigIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumproject_statusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumproject_statusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => project_statusSchema).optional().nullable(),
  in: z.lazy(() => project_statusSchema).array().optional().nullable(),
  notIn: z.lazy(() => project_statusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NestedEnumproject_statusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumproject_statusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumproject_statusNullableFilterSchema).optional()
}).strict();

export const NestedBigIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntNullableWithAggregatesFilter> = z.object({
  equals: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable(),
  in: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n).array(), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt).array() ]).optional().nullable(),
  notIn: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n).array(), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt).array() ]).optional().nullable(),
  lt: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  lte: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  gt: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  gte: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional(),
  not: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IssuesCreateWithoutCommentsInputSchema: z.ZodType<Prisma.IssuesCreateWithoutCommentsInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  created_at: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string(),
  external_urls: z.string().optional().nullable(),
  completed_at: z.coerce.date().optional().nullable(),
  status: z.string(),
  priority: z.string(),
  updated_at: z.coerce.date().optional().nullable(),
  projects: z.lazy(() => ProjectsCreateNestedOneWithoutIssuesInputSchema).optional()
}).strict();

export const IssuesUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.IssuesUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  created_at: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string(),
  external_urls: z.string().optional().nullable(),
  completed_at: z.coerce.date().optional().nullable(),
  status: z.string(),
  priority: z.string(),
  updated_at: z.coerce.date().optional().nullable(),
  project_id: z.string().optional().nullable()
}).strict();

export const IssuesCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.IssuesCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => IssuesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IssuesCreateWithoutCommentsInputSchema),z.lazy(() => IssuesUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const IssuesUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.IssuesUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => IssuesUpdateWithoutCommentsInputSchema),z.lazy(() => IssuesUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => IssuesCreateWithoutCommentsInputSchema),z.lazy(() => IssuesUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const IssuesUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.IssuesUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_urls: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projects: z.lazy(() => ProjectsUpdateOneWithoutIssuesNestedInputSchema).optional()
}).strict();

export const IssuesUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.IssuesUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_urls: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  project_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const OrgsCreateWithoutEmailsInputSchema: z.ZodType<Prisma.OrgsCreateWithoutEmailsInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  first_contact: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string(),
  missive_label_id: z.string(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.string().optional().nullable(),
  linear_id: z.string().optional().nullable(),
  pivotal_tracker_id: z.string().optional().nullable(),
  slack_channels: z.lazy(() => Slack_channelsCreateNestedOneWithoutOrgsInputSchema).optional(),
  projects: z.lazy(() => ProjectsCreateNestedManyWithoutOrgsInputSchema).optional()
}).strict();

export const OrgsUncheckedCreateWithoutEmailsInputSchema: z.ZodType<Prisma.OrgsUncheckedCreateWithoutEmailsInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  first_contact: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  primary_slack_channel_id: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string(),
  missive_label_id: z.string(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.string().optional().nullable(),
  linear_id: z.string().optional().nullable(),
  pivotal_tracker_id: z.string().optional().nullable(),
  projects: z.lazy(() => ProjectsUncheckedCreateNestedManyWithoutOrgsInputSchema).optional()
}).strict();

export const OrgsCreateOrConnectWithoutEmailsInputSchema: z.ZodType<Prisma.OrgsCreateOrConnectWithoutEmailsInput> = z.object({
  where: z.lazy(() => OrgsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrgsCreateWithoutEmailsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutEmailsInputSchema) ]),
}).strict();

export const OrgsCreateManyEmailsInputEnvelopeSchema: z.ZodType<Prisma.OrgsCreateManyEmailsInputEnvelope> = z.object({
  data: z.lazy(() => OrgsCreateManyEmailsInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const OrgsUpsertWithWhereUniqueWithoutEmailsInputSchema: z.ZodType<Prisma.OrgsUpsertWithWhereUniqueWithoutEmailsInput> = z.object({
  where: z.lazy(() => OrgsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => OrgsUpdateWithoutEmailsInputSchema),z.lazy(() => OrgsUncheckedUpdateWithoutEmailsInputSchema) ]),
  create: z.union([ z.lazy(() => OrgsCreateWithoutEmailsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutEmailsInputSchema) ]),
}).strict();

export const OrgsUpdateWithWhereUniqueWithoutEmailsInputSchema: z.ZodType<Prisma.OrgsUpdateWithWhereUniqueWithoutEmailsInput> = z.object({
  where: z.lazy(() => OrgsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => OrgsUpdateWithoutEmailsInputSchema),z.lazy(() => OrgsUncheckedUpdateWithoutEmailsInputSchema) ]),
}).strict();

export const OrgsUpdateManyWithWhereWithoutEmailsInputSchema: z.ZodType<Prisma.OrgsUpdateManyWithWhereWithoutEmailsInput> = z.object({
  where: z.lazy(() => OrgsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => OrgsUpdateManyMutationInputSchema),z.lazy(() => OrgsUncheckedUpdateManyWithoutOrgsInputSchema) ]),
}).strict();

export const OrgsScalarWhereInputSchema: z.ZodType<Prisma.OrgsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OrgsScalarWhereInputSchema),z.lazy(() => OrgsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrgsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrgsScalarWhereInputSchema),z.lazy(() => OrgsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shortname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  aliases: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  first_contact: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  primary_email_address_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  primary_slack_channel_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  summary: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  missive_conversation_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  missive_label_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  history: z.lazy(() => JsonNullableFilterSchema).optional(),
  github_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  linear_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CommentsCreateWithoutIssuesInputSchema: z.ZodType<Prisma.CommentsCreateWithoutIssuesInput> = z.object({
  id: z.string(),
  body: z.string(),
  username: z.string(),
  created_at: z.coerce.date()
}).strict();

export const CommentsUncheckedCreateWithoutIssuesInputSchema: z.ZodType<Prisma.CommentsUncheckedCreateWithoutIssuesInput> = z.object({
  id: z.string(),
  body: z.string(),
  username: z.string(),
  created_at: z.coerce.date()
}).strict();

export const CommentsCreateOrConnectWithoutIssuesInputSchema: z.ZodType<Prisma.CommentsCreateOrConnectWithoutIssuesInput> = z.object({
  where: z.lazy(() => CommentsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentsCreateWithoutIssuesInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema) ]),
}).strict();

export const CommentsCreateManyIssuesInputEnvelopeSchema: z.ZodType<Prisma.CommentsCreateManyIssuesInputEnvelope> = z.object({
  data: z.lazy(() => CommentsCreateManyIssuesInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProjectsCreateWithoutIssuesInputSchema: z.ZodType<Prisma.ProjectsCreateWithoutIssuesInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string(),
  missive_label_id: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.lazy(() => project_statusSchema).optional().nullable(),
  linear_team_id: z.string().optional().nullable(),
  pivotal_tracker_id: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable(),
  orgs: z.lazy(() => OrgsCreateNestedOneWithoutProjectsInputSchema)
}).strict();

export const ProjectsUncheckedCreateWithoutIssuesInputSchema: z.ZodType<Prisma.ProjectsUncheckedCreateWithoutIssuesInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  org_id: z.string(),
  missive_conversation_id: z.string(),
  missive_label_id: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.lazy(() => project_statusSchema).optional().nullable(),
  linear_team_id: z.string().optional().nullable(),
  pivotal_tracker_id: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable()
}).strict();

export const ProjectsCreateOrConnectWithoutIssuesInputSchema: z.ZodType<Prisma.ProjectsCreateOrConnectWithoutIssuesInput> = z.object({
  where: z.lazy(() => ProjectsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectsCreateWithoutIssuesInputSchema),z.lazy(() => ProjectsUncheckedCreateWithoutIssuesInputSchema) ]),
}).strict();

export const CommentsUpsertWithWhereUniqueWithoutIssuesInputSchema: z.ZodType<Prisma.CommentsUpsertWithWhereUniqueWithoutIssuesInput> = z.object({
  where: z.lazy(() => CommentsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentsUpdateWithoutIssuesInputSchema),z.lazy(() => CommentsUncheckedUpdateWithoutIssuesInputSchema) ]),
  create: z.union([ z.lazy(() => CommentsCreateWithoutIssuesInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema) ]),
}).strict();

export const CommentsUpdateWithWhereUniqueWithoutIssuesInputSchema: z.ZodType<Prisma.CommentsUpdateWithWhereUniqueWithoutIssuesInput> = z.object({
  where: z.lazy(() => CommentsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentsUpdateWithoutIssuesInputSchema),z.lazy(() => CommentsUncheckedUpdateWithoutIssuesInputSchema) ]),
}).strict();

export const CommentsUpdateManyWithWhereWithoutIssuesInputSchema: z.ZodType<Prisma.CommentsUpdateManyWithWhereWithoutIssuesInput> = z.object({
  where: z.lazy(() => CommentsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentsUpdateManyMutationInputSchema),z.lazy(() => CommentsUncheckedUpdateManyWithoutCommentsInputSchema) ]),
}).strict();

export const CommentsScalarWhereInputSchema: z.ZodType<Prisma.CommentsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentsScalarWhereInputSchema),z.lazy(() => CommentsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentsScalarWhereInputSchema),z.lazy(() => CommentsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  issue_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProjectsUpsertWithoutIssuesInputSchema: z.ZodType<Prisma.ProjectsUpsertWithoutIssuesInput> = z.object({
  update: z.union([ z.lazy(() => ProjectsUpdateWithoutIssuesInputSchema),z.lazy(() => ProjectsUncheckedUpdateWithoutIssuesInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectsCreateWithoutIssuesInputSchema),z.lazy(() => ProjectsUncheckedCreateWithoutIssuesInputSchema) ]),
}).strict();

export const ProjectsUpdateWithoutIssuesInputSchema: z.ZodType<Prisma.ProjectsUpdateWithoutIssuesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NullableEnumproject_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_team_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  orgs: z.lazy(() => OrgsUpdateOneRequiredWithoutProjectsNestedInputSchema).optional()
}).strict();

export const ProjectsUncheckedUpdateWithoutIssuesInputSchema: z.ZodType<Prisma.ProjectsUncheckedUpdateWithoutIssuesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  org_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_conversation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NullableEnumproject_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_team_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EmailsCreateWithoutOrgsInputSchema: z.ZodType<Prisma.EmailsCreateWithoutOrgsInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  email_address: z.string()
}).strict();

export const EmailsUncheckedCreateWithoutOrgsInputSchema: z.ZodType<Prisma.EmailsUncheckedCreateWithoutOrgsInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  email_address: z.string()
}).strict();

export const EmailsCreateOrConnectWithoutOrgsInputSchema: z.ZodType<Prisma.EmailsCreateOrConnectWithoutOrgsInput> = z.object({
  where: z.lazy(() => EmailsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailsCreateWithoutOrgsInputSchema),z.lazy(() => EmailsUncheckedCreateWithoutOrgsInputSchema) ]),
}).strict();

export const Slack_channelsCreateWithoutOrgsInputSchema: z.ZodType<Prisma.Slack_channelsCreateWithoutOrgsInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date()
}).strict();

export const Slack_channelsUncheckedCreateWithoutOrgsInputSchema: z.ZodType<Prisma.Slack_channelsUncheckedCreateWithoutOrgsInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date()
}).strict();

export const Slack_channelsCreateOrConnectWithoutOrgsInputSchema: z.ZodType<Prisma.Slack_channelsCreateOrConnectWithoutOrgsInput> = z.object({
  where: z.lazy(() => Slack_channelsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Slack_channelsCreateWithoutOrgsInputSchema),z.lazy(() => Slack_channelsUncheckedCreateWithoutOrgsInputSchema) ]),
}).strict();

export const ProjectsCreateWithoutOrgsInputSchema: z.ZodType<Prisma.ProjectsCreateWithoutOrgsInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string(),
  missive_label_id: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.lazy(() => project_statusSchema).optional().nullable(),
  linear_team_id: z.string().optional().nullable(),
  pivotal_tracker_id: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable(),
  issues: z.lazy(() => IssuesCreateNestedManyWithoutProjectsInputSchema).optional()
}).strict();

export const ProjectsUncheckedCreateWithoutOrgsInputSchema: z.ZodType<Prisma.ProjectsUncheckedCreateWithoutOrgsInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string(),
  missive_label_id: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.lazy(() => project_statusSchema).optional().nullable(),
  linear_team_id: z.string().optional().nullable(),
  pivotal_tracker_id: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable(),
  issues: z.lazy(() => IssuesUncheckedCreateNestedManyWithoutProjectsInputSchema).optional()
}).strict();

export const ProjectsCreateOrConnectWithoutOrgsInputSchema: z.ZodType<Prisma.ProjectsCreateOrConnectWithoutOrgsInput> = z.object({
  where: z.lazy(() => ProjectsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectsCreateWithoutOrgsInputSchema),z.lazy(() => ProjectsUncheckedCreateWithoutOrgsInputSchema) ]),
}).strict();

export const ProjectsCreateManyOrgsInputEnvelopeSchema: z.ZodType<Prisma.ProjectsCreateManyOrgsInputEnvelope> = z.object({
  data: z.lazy(() => ProjectsCreateManyOrgsInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EmailsUpsertWithoutOrgsInputSchema: z.ZodType<Prisma.EmailsUpsertWithoutOrgsInput> = z.object({
  update: z.union([ z.lazy(() => EmailsUpdateWithoutOrgsInputSchema),z.lazy(() => EmailsUncheckedUpdateWithoutOrgsInputSchema) ]),
  create: z.union([ z.lazy(() => EmailsCreateWithoutOrgsInputSchema),z.lazy(() => EmailsUncheckedCreateWithoutOrgsInputSchema) ]),
}).strict();

export const EmailsUpdateWithoutOrgsInputSchema: z.ZodType<Prisma.EmailsUpdateWithoutOrgsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailsUncheckedUpdateWithoutOrgsInputSchema: z.ZodType<Prisma.EmailsUncheckedUpdateWithoutOrgsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Slack_channelsUpsertWithoutOrgsInputSchema: z.ZodType<Prisma.Slack_channelsUpsertWithoutOrgsInput> = z.object({
  update: z.union([ z.lazy(() => Slack_channelsUpdateWithoutOrgsInputSchema),z.lazy(() => Slack_channelsUncheckedUpdateWithoutOrgsInputSchema) ]),
  create: z.union([ z.lazy(() => Slack_channelsCreateWithoutOrgsInputSchema),z.lazy(() => Slack_channelsUncheckedCreateWithoutOrgsInputSchema) ]),
}).strict();

export const Slack_channelsUpdateWithoutOrgsInputSchema: z.ZodType<Prisma.Slack_channelsUpdateWithoutOrgsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Slack_channelsUncheckedUpdateWithoutOrgsInputSchema: z.ZodType<Prisma.Slack_channelsUncheckedUpdateWithoutOrgsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectsUpsertWithWhereUniqueWithoutOrgsInputSchema: z.ZodType<Prisma.ProjectsUpsertWithWhereUniqueWithoutOrgsInput> = z.object({
  where: z.lazy(() => ProjectsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProjectsUpdateWithoutOrgsInputSchema),z.lazy(() => ProjectsUncheckedUpdateWithoutOrgsInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectsCreateWithoutOrgsInputSchema),z.lazy(() => ProjectsUncheckedCreateWithoutOrgsInputSchema) ]),
}).strict();

export const ProjectsUpdateWithWhereUniqueWithoutOrgsInputSchema: z.ZodType<Prisma.ProjectsUpdateWithWhereUniqueWithoutOrgsInput> = z.object({
  where: z.lazy(() => ProjectsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProjectsUpdateWithoutOrgsInputSchema),z.lazy(() => ProjectsUncheckedUpdateWithoutOrgsInputSchema) ]),
}).strict();

export const ProjectsUpdateManyWithWhereWithoutOrgsInputSchema: z.ZodType<Prisma.ProjectsUpdateManyWithWhereWithoutOrgsInput> = z.object({
  where: z.lazy(() => ProjectsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProjectsUpdateManyMutationInputSchema),z.lazy(() => ProjectsUncheckedUpdateManyWithoutProjectsInputSchema) ]),
}).strict();

export const ProjectsScalarWhereInputSchema: z.ZodType<Prisma.ProjectsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectsScalarWhereInputSchema),z.lazy(() => ProjectsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectsScalarWhereInputSchema),z.lazy(() => ProjectsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shortname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  aliases: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  summary: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  org_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  missive_conversation_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  missive_label_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  start_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  end_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  history: z.lazy(() => JsonNullableFilterSchema).optional(),
  status: z.union([ z.lazy(() => Enumproject_statusNullableFilterSchema),z.lazy(() => project_statusSchema) ]).optional().nullable(),
  linear_team_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]) ]).optional().nullable(),
}).strict();

export const IssuesCreateWithoutProjectsInputSchema: z.ZodType<Prisma.IssuesCreateWithoutProjectsInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  created_at: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string(),
  external_urls: z.string().optional().nullable(),
  completed_at: z.coerce.date().optional().nullable(),
  status: z.string(),
  priority: z.string(),
  updated_at: z.coerce.date().optional().nullable(),
  comments: z.lazy(() => CommentsCreateNestedManyWithoutIssuesInputSchema).optional()
}).strict();

export const IssuesUncheckedCreateWithoutProjectsInputSchema: z.ZodType<Prisma.IssuesUncheckedCreateWithoutProjectsInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  created_at: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string(),
  external_urls: z.string().optional().nullable(),
  completed_at: z.coerce.date().optional().nullable(),
  status: z.string(),
  priority: z.string(),
  updated_at: z.coerce.date().optional().nullable(),
  comments: z.lazy(() => CommentsUncheckedCreateNestedManyWithoutIssuesInputSchema).optional()
}).strict();

export const IssuesCreateOrConnectWithoutProjectsInputSchema: z.ZodType<Prisma.IssuesCreateOrConnectWithoutProjectsInput> = z.object({
  where: z.lazy(() => IssuesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IssuesCreateWithoutProjectsInputSchema),z.lazy(() => IssuesUncheckedCreateWithoutProjectsInputSchema) ]),
}).strict();

export const IssuesCreateManyProjectsInputEnvelopeSchema: z.ZodType<Prisma.IssuesCreateManyProjectsInputEnvelope> = z.object({
  data: z.lazy(() => IssuesCreateManyProjectsInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const OrgsCreateWithoutProjectsInputSchema: z.ZodType<Prisma.OrgsCreateWithoutProjectsInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  first_contact: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string(),
  missive_label_id: z.string(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.string().optional().nullable(),
  linear_id: z.string().optional().nullable(),
  pivotal_tracker_id: z.string().optional().nullable(),
  emails: z.lazy(() => EmailsCreateNestedOneWithoutOrgsInputSchema).optional(),
  slack_channels: z.lazy(() => Slack_channelsCreateNestedOneWithoutOrgsInputSchema).optional()
}).strict();

export const OrgsUncheckedCreateWithoutProjectsInputSchema: z.ZodType<Prisma.OrgsUncheckedCreateWithoutProjectsInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  first_contact: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  primary_email_address_id: z.string().optional().nullable(),
  primary_slack_channel_id: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string(),
  missive_label_id: z.string(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.string().optional().nullable(),
  linear_id: z.string().optional().nullable(),
  pivotal_tracker_id: z.string().optional().nullable()
}).strict();

export const OrgsCreateOrConnectWithoutProjectsInputSchema: z.ZodType<Prisma.OrgsCreateOrConnectWithoutProjectsInput> = z.object({
  where: z.lazy(() => OrgsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrgsCreateWithoutProjectsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutProjectsInputSchema) ]),
}).strict();

export const IssuesUpsertWithWhereUniqueWithoutProjectsInputSchema: z.ZodType<Prisma.IssuesUpsertWithWhereUniqueWithoutProjectsInput> = z.object({
  where: z.lazy(() => IssuesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IssuesUpdateWithoutProjectsInputSchema),z.lazy(() => IssuesUncheckedUpdateWithoutProjectsInputSchema) ]),
  create: z.union([ z.lazy(() => IssuesCreateWithoutProjectsInputSchema),z.lazy(() => IssuesUncheckedCreateWithoutProjectsInputSchema) ]),
}).strict();

export const IssuesUpdateWithWhereUniqueWithoutProjectsInputSchema: z.ZodType<Prisma.IssuesUpdateWithWhereUniqueWithoutProjectsInput> = z.object({
  where: z.lazy(() => IssuesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IssuesUpdateWithoutProjectsInputSchema),z.lazy(() => IssuesUncheckedUpdateWithoutProjectsInputSchema) ]),
}).strict();

export const IssuesUpdateManyWithWhereWithoutProjectsInputSchema: z.ZodType<Prisma.IssuesUpdateManyWithWhereWithoutProjectsInput> = z.object({
  where: z.lazy(() => IssuesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IssuesUpdateManyMutationInputSchema),z.lazy(() => IssuesUncheckedUpdateManyWithoutIssuesInputSchema) ]),
}).strict();

export const IssuesScalarWhereInputSchema: z.ZodType<Prisma.IssuesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IssuesScalarWhereInputSchema),z.lazy(() => IssuesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IssuesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IssuesScalarWhereInputSchema),z.lazy(() => IssuesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  kanbanorder: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  external_urls: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  completed_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  priority: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  project_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const OrgsUpsertWithoutProjectsInputSchema: z.ZodType<Prisma.OrgsUpsertWithoutProjectsInput> = z.object({
  update: z.union([ z.lazy(() => OrgsUpdateWithoutProjectsInputSchema),z.lazy(() => OrgsUncheckedUpdateWithoutProjectsInputSchema) ]),
  create: z.union([ z.lazy(() => OrgsCreateWithoutProjectsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutProjectsInputSchema) ]),
}).strict();

export const OrgsUpdateWithoutProjectsInputSchema: z.ZodType<Prisma.OrgsUpdateWithoutProjectsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_contact: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emails: z.lazy(() => EmailsUpdateOneWithoutOrgsNestedInputSchema).optional(),
  slack_channels: z.lazy(() => Slack_channelsUpdateOneWithoutOrgsNestedInputSchema).optional()
}).strict();

export const OrgsUncheckedUpdateWithoutProjectsInputSchema: z.ZodType<Prisma.OrgsUncheckedUpdateWithoutProjectsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_contact: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primary_email_address_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primary_slack_channel_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const OrgsCreateWithoutSlack_channelsInputSchema: z.ZodType<Prisma.OrgsCreateWithoutSlack_channelsInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  first_contact: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string(),
  missive_label_id: z.string(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.string().optional().nullable(),
  linear_id: z.string().optional().nullable(),
  pivotal_tracker_id: z.string().optional().nullable(),
  emails: z.lazy(() => EmailsCreateNestedOneWithoutOrgsInputSchema).optional(),
  projects: z.lazy(() => ProjectsCreateNestedManyWithoutOrgsInputSchema).optional()
}).strict();

export const OrgsUncheckedCreateWithoutSlack_channelsInputSchema: z.ZodType<Prisma.OrgsUncheckedCreateWithoutSlack_channelsInput> = z.object({
  id: z.string(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  first_contact: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  primary_email_address_id: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string(),
  missive_label_id: z.string(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.string().optional().nullable(),
  linear_id: z.string().optional().nullable(),
  pivotal_tracker_id: z.string().optional().nullable(),
  projects: z.lazy(() => ProjectsUncheckedCreateNestedManyWithoutOrgsInputSchema).optional()
}).strict();

export const OrgsCreateOrConnectWithoutSlack_channelsInputSchema: z.ZodType<Prisma.OrgsCreateOrConnectWithoutSlack_channelsInput> = z.object({
  where: z.lazy(() => OrgsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrgsCreateWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutSlack_channelsInputSchema) ]),
}).strict();

export const OrgsCreateManySlack_channelsInputEnvelopeSchema: z.ZodType<Prisma.OrgsCreateManySlack_channelsInputEnvelope> = z.object({
  data: z.lazy(() => OrgsCreateManySlack_channelsInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const OrgsUpsertWithWhereUniqueWithoutSlack_channelsInputSchema: z.ZodType<Prisma.OrgsUpsertWithWhereUniqueWithoutSlack_channelsInput> = z.object({
  where: z.lazy(() => OrgsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => OrgsUpdateWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUncheckedUpdateWithoutSlack_channelsInputSchema) ]),
  create: z.union([ z.lazy(() => OrgsCreateWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUncheckedCreateWithoutSlack_channelsInputSchema) ]),
}).strict();

export const OrgsUpdateWithWhereUniqueWithoutSlack_channelsInputSchema: z.ZodType<Prisma.OrgsUpdateWithWhereUniqueWithoutSlack_channelsInput> = z.object({
  where: z.lazy(() => OrgsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => OrgsUpdateWithoutSlack_channelsInputSchema),z.lazy(() => OrgsUncheckedUpdateWithoutSlack_channelsInputSchema) ]),
}).strict();

export const OrgsUpdateManyWithWhereWithoutSlack_channelsInputSchema: z.ZodType<Prisma.OrgsUpdateManyWithWhereWithoutSlack_channelsInput> = z.object({
  where: z.lazy(() => OrgsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => OrgsUpdateManyMutationInputSchema),z.lazy(() => OrgsUncheckedUpdateManyWithoutOrgsInputSchema) ]),
}).strict();

export const OrgsCreateManyEmailsInputSchema: z.ZodType<Prisma.OrgsCreateManyEmailsInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  first_contact: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  primary_slack_channel_id: z.string().uuid().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string().uuid(),
  missive_label_id: z.string().uuid(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.string().uuid().optional().nullable(),
  linear_id: z.string().uuid().optional().nullable(),
  pivotal_tracker_id: z.string().uuid().optional().nullable()
}).strict();

export const OrgsUpdateWithoutEmailsInputSchema: z.ZodType<Prisma.OrgsUpdateWithoutEmailsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_contact: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slack_channels: z.lazy(() => Slack_channelsUpdateOneWithoutOrgsNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectsUpdateManyWithoutOrgsNestedInputSchema).optional()
}).strict();

export const OrgsUncheckedUpdateWithoutEmailsInputSchema: z.ZodType<Prisma.OrgsUncheckedUpdateWithoutEmailsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_contact: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primary_slack_channel_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projects: z.lazy(() => ProjectsUncheckedUpdateManyWithoutOrgsNestedInputSchema).optional()
}).strict();

export const OrgsUncheckedUpdateManyWithoutOrgsInputSchema: z.ZodType<Prisma.OrgsUncheckedUpdateManyWithoutOrgsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_contact: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primary_slack_channel_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CommentsCreateManyIssuesInputSchema: z.ZodType<Prisma.CommentsCreateManyIssuesInput> = z.object({
  id: z.string().uuid(),
  body: z.string(),
  username: z.string(),
  created_at: z.coerce.date()
}).strict();

export const CommentsUpdateWithoutIssuesInputSchema: z.ZodType<Prisma.CommentsUpdateWithoutIssuesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentsUncheckedUpdateWithoutIssuesInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateWithoutIssuesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentsUncheckedUpdateManyWithoutCommentsInputSchema: z.ZodType<Prisma.CommentsUncheckedUpdateManyWithoutCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectsCreateManyOrgsInputSchema: z.ZodType<Prisma.ProjectsCreateManyOrgsInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string().uuid(),
  missive_label_id: z.string().uuid(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.lazy(() => project_statusSchema).optional().nullable(),
  linear_team_id: z.string().uuid().optional().nullable(),
  pivotal_tracker_id: z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]).optional().nullable()
}).strict();

export const ProjectsUpdateWithoutOrgsInputSchema: z.ZodType<Prisma.ProjectsUpdateWithoutOrgsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NullableEnumproject_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_team_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issues: z.lazy(() => IssuesUpdateManyWithoutProjectsNestedInputSchema).optional()
}).strict();

export const ProjectsUncheckedUpdateWithoutOrgsInputSchema: z.ZodType<Prisma.ProjectsUncheckedUpdateWithoutOrgsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NullableEnumproject_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_team_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issues: z.lazy(() => IssuesUncheckedUpdateManyWithoutProjectsNestedInputSchema).optional()
}).strict();

export const ProjectsUncheckedUpdateManyWithoutProjectsInputSchema: z.ZodType<Prisma.ProjectsUncheckedUpdateManyWithoutProjectsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  start_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.lazy(() => project_statusSchema),z.lazy(() => NullableEnumproject_statusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_team_id: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.union([ z.bigint().gte(-9223372036854775808n).lte(9223372036854775807n), z.number().int().gte(Number.MIN_SAFE_INTEGER).lte(Number.MAX_SAFE_INTEGER).transform(BigInt) ]),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IssuesCreateManyProjectsInputSchema: z.ZodType<Prisma.IssuesCreateManyProjectsInput> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  created_at: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string(),
  external_urls: z.string().optional().nullable(),
  completed_at: z.coerce.date().optional().nullable(),
  status: z.string(),
  priority: z.string(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const IssuesUpdateWithoutProjectsInputSchema: z.ZodType<Prisma.IssuesUpdateWithoutProjectsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_urls: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.lazy(() => CommentsUpdateManyWithoutIssuesNestedInputSchema).optional()
}).strict();

export const IssuesUncheckedUpdateWithoutProjectsInputSchema: z.ZodType<Prisma.IssuesUncheckedUpdateWithoutProjectsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_urls: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.lazy(() => CommentsUncheckedUpdateManyWithoutIssuesNestedInputSchema).optional()
}).strict();

export const IssuesUncheckedUpdateManyWithoutIssuesInputSchema: z.ZodType<Prisma.IssuesUncheckedUpdateManyWithoutIssuesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  external_urls: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completed_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const OrgsCreateManySlack_channelsInputSchema: z.ZodType<Prisma.OrgsCreateManySlack_channelsInput> = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  name: z.string(),
  shortname: z.string(),
  aliases: z.string().optional().nullable(),
  first_contact: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  website: z.string().optional().nullable(),
  primary_email_address_id: z.string().uuid().optional().nullable(),
  summary: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  missive_conversation_id: z.string().uuid(),
  missive_label_id: z.string().uuid(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.string().uuid().optional().nullable(),
  linear_id: z.string().uuid().optional().nullable(),
  pivotal_tracker_id: z.string().uuid().optional().nullable()
}).strict();

export const OrgsUpdateWithoutSlack_channelsInputSchema: z.ZodType<Prisma.OrgsUpdateWithoutSlack_channelsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_contact: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emails: z.lazy(() => EmailsUpdateOneWithoutOrgsNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectsUpdateManyWithoutOrgsNestedInputSchema).optional()
}).strict();

export const OrgsUncheckedUpdateWithoutSlack_channelsInputSchema: z.ZodType<Prisma.OrgsUncheckedUpdateWithoutSlack_channelsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  aliases: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_contact: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primary_email_address_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  summary: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  missive_conversation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  missive_label_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  history: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  github_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linear_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pivotal_tracker_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projects: z.lazy(() => ProjectsUncheckedUpdateManyWithoutOrgsNestedInputSchema).optional()
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CommentsFindFirstArgsSchema: z.ZodType<Prisma.CommentsFindFirstArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereInputSchema.optional(),
  orderBy: z.union([ CommentsOrderByWithRelationInputSchema.array(),CommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CommentsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.CommentsFindFirstArgs>

export const CommentsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentsFindFirstOrThrowArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereInputSchema.optional(),
  orderBy: z.union([ CommentsOrderByWithRelationInputSchema.array(),CommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CommentsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.CommentsFindFirstOrThrowArgs>

export const CommentsFindManyArgsSchema: z.ZodType<Prisma.CommentsFindManyArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereInputSchema.optional(),
  orderBy: z.union([ CommentsOrderByWithRelationInputSchema.array(),CommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CommentsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.CommentsFindManyArgs>

export const CommentsAggregateArgsSchema: z.ZodType<Prisma.CommentsAggregateArgs> = z.object({
  where: CommentsWhereInputSchema.optional(),
  orderBy: z.union([ CommentsOrderByWithRelationInputSchema.array(),CommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CommentsAggregateArgs>

export const CommentsGroupByArgsSchema: z.ZodType<Prisma.CommentsGroupByArgs> = z.object({
  where: CommentsWhereInputSchema.optional(),
  orderBy: z.union([ CommentsOrderByWithAggregationInputSchema.array(),CommentsOrderByWithAggregationInputSchema ]).optional(),
  by: CommentsScalarFieldEnumSchema.array(),
  having: CommentsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CommentsGroupByArgs>

export const CommentsFindUniqueArgsSchema: z.ZodType<Prisma.CommentsFindUniqueArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CommentsFindUniqueArgs>

export const CommentsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentsFindUniqueOrThrowArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CommentsFindUniqueOrThrowArgs>

export const EmailsFindFirstArgsSchema: z.ZodType<Prisma.EmailsFindFirstArgs> = z.object({
  select: EmailsSelectSchema.optional(),
  include: EmailsIncludeSchema.optional(),
  where: EmailsWhereInputSchema.optional(),
  orderBy: z.union([ EmailsOrderByWithRelationInputSchema.array(),EmailsOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: EmailsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.EmailsFindFirstArgs>

export const EmailsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EmailsFindFirstOrThrowArgs> = z.object({
  select: EmailsSelectSchema.optional(),
  include: EmailsIncludeSchema.optional(),
  where: EmailsWhereInputSchema.optional(),
  orderBy: z.union([ EmailsOrderByWithRelationInputSchema.array(),EmailsOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: EmailsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.EmailsFindFirstOrThrowArgs>

export const EmailsFindManyArgsSchema: z.ZodType<Prisma.EmailsFindManyArgs> = z.object({
  select: EmailsSelectSchema.optional(),
  include: EmailsIncludeSchema.optional(),
  where: EmailsWhereInputSchema.optional(),
  orderBy: z.union([ EmailsOrderByWithRelationInputSchema.array(),EmailsOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: EmailsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.EmailsFindManyArgs>

export const EmailsAggregateArgsSchema: z.ZodType<Prisma.EmailsAggregateArgs> = z.object({
  where: EmailsWhereInputSchema.optional(),
  orderBy: z.union([ EmailsOrderByWithRelationInputSchema.array(),EmailsOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.EmailsAggregateArgs>

export const EmailsGroupByArgsSchema: z.ZodType<Prisma.EmailsGroupByArgs> = z.object({
  where: EmailsWhereInputSchema.optional(),
  orderBy: z.union([ EmailsOrderByWithAggregationInputSchema.array(),EmailsOrderByWithAggregationInputSchema ]).optional(),
  by: EmailsScalarFieldEnumSchema.array(),
  having: EmailsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.EmailsGroupByArgs>

export const EmailsFindUniqueArgsSchema: z.ZodType<Prisma.EmailsFindUniqueArgs> = z.object({
  select: EmailsSelectSchema.optional(),
  include: EmailsIncludeSchema.optional(),
  where: EmailsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.EmailsFindUniqueArgs>

export const EmailsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EmailsFindUniqueOrThrowArgs> = z.object({
  select: EmailsSelectSchema.optional(),
  include: EmailsIncludeSchema.optional(),
  where: EmailsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.EmailsFindUniqueOrThrowArgs>

export const IssuesFindFirstArgsSchema: z.ZodType<Prisma.IssuesFindFirstArgs> = z.object({
  select: IssuesSelectSchema.optional(),
  include: IssuesIncludeSchema.optional(),
  where: IssuesWhereInputSchema.optional(),
  orderBy: z.union([ IssuesOrderByWithRelationInputSchema.array(),IssuesOrderByWithRelationInputSchema ]).optional(),
  cursor: IssuesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IssuesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.IssuesFindFirstArgs>

export const IssuesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IssuesFindFirstOrThrowArgs> = z.object({
  select: IssuesSelectSchema.optional(),
  include: IssuesIncludeSchema.optional(),
  where: IssuesWhereInputSchema.optional(),
  orderBy: z.union([ IssuesOrderByWithRelationInputSchema.array(),IssuesOrderByWithRelationInputSchema ]).optional(),
  cursor: IssuesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IssuesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.IssuesFindFirstOrThrowArgs>

export const IssuesFindManyArgsSchema: z.ZodType<Prisma.IssuesFindManyArgs> = z.object({
  select: IssuesSelectSchema.optional(),
  include: IssuesIncludeSchema.optional(),
  where: IssuesWhereInputSchema.optional(),
  orderBy: z.union([ IssuesOrderByWithRelationInputSchema.array(),IssuesOrderByWithRelationInputSchema ]).optional(),
  cursor: IssuesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IssuesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.IssuesFindManyArgs>

export const IssuesAggregateArgsSchema: z.ZodType<Prisma.IssuesAggregateArgs> = z.object({
  where: IssuesWhereInputSchema.optional(),
  orderBy: z.union([ IssuesOrderByWithRelationInputSchema.array(),IssuesOrderByWithRelationInputSchema ]).optional(),
  cursor: IssuesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.IssuesAggregateArgs>

export const IssuesGroupByArgsSchema: z.ZodType<Prisma.IssuesGroupByArgs> = z.object({
  where: IssuesWhereInputSchema.optional(),
  orderBy: z.union([ IssuesOrderByWithAggregationInputSchema.array(),IssuesOrderByWithAggregationInputSchema ]).optional(),
  by: IssuesScalarFieldEnumSchema.array(),
  having: IssuesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.IssuesGroupByArgs>

export const IssuesFindUniqueArgsSchema: z.ZodType<Prisma.IssuesFindUniqueArgs> = z.object({
  select: IssuesSelectSchema.optional(),
  include: IssuesIncludeSchema.optional(),
  where: IssuesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.IssuesFindUniqueArgs>

export const IssuesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IssuesFindUniqueOrThrowArgs> = z.object({
  select: IssuesSelectSchema.optional(),
  include: IssuesIncludeSchema.optional(),
  where: IssuesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.IssuesFindUniqueOrThrowArgs>

export const OrgsFindFirstArgsSchema: z.ZodType<Prisma.OrgsFindFirstArgs> = z.object({
  select: OrgsSelectSchema.optional(),
  include: OrgsIncludeSchema.optional(),
  where: OrgsWhereInputSchema.optional(),
  orderBy: z.union([ OrgsOrderByWithRelationInputSchema.array(),OrgsOrderByWithRelationInputSchema ]).optional(),
  cursor: OrgsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: OrgsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.OrgsFindFirstArgs>

export const OrgsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OrgsFindFirstOrThrowArgs> = z.object({
  select: OrgsSelectSchema.optional(),
  include: OrgsIncludeSchema.optional(),
  where: OrgsWhereInputSchema.optional(),
  orderBy: z.union([ OrgsOrderByWithRelationInputSchema.array(),OrgsOrderByWithRelationInputSchema ]).optional(),
  cursor: OrgsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: OrgsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.OrgsFindFirstOrThrowArgs>

export const OrgsFindManyArgsSchema: z.ZodType<Prisma.OrgsFindManyArgs> = z.object({
  select: OrgsSelectSchema.optional(),
  include: OrgsIncludeSchema.optional(),
  where: OrgsWhereInputSchema.optional(),
  orderBy: z.union([ OrgsOrderByWithRelationInputSchema.array(),OrgsOrderByWithRelationInputSchema ]).optional(),
  cursor: OrgsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: OrgsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.OrgsFindManyArgs>

export const OrgsAggregateArgsSchema: z.ZodType<Prisma.OrgsAggregateArgs> = z.object({
  where: OrgsWhereInputSchema.optional(),
  orderBy: z.union([ OrgsOrderByWithRelationInputSchema.array(),OrgsOrderByWithRelationInputSchema ]).optional(),
  cursor: OrgsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.OrgsAggregateArgs>

export const OrgsGroupByArgsSchema: z.ZodType<Prisma.OrgsGroupByArgs> = z.object({
  where: OrgsWhereInputSchema.optional(),
  orderBy: z.union([ OrgsOrderByWithAggregationInputSchema.array(),OrgsOrderByWithAggregationInputSchema ]).optional(),
  by: OrgsScalarFieldEnumSchema.array(),
  having: OrgsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.OrgsGroupByArgs>

export const OrgsFindUniqueArgsSchema: z.ZodType<Prisma.OrgsFindUniqueArgs> = z.object({
  select: OrgsSelectSchema.optional(),
  include: OrgsIncludeSchema.optional(),
  where: OrgsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.OrgsFindUniqueArgs>

export const OrgsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OrgsFindUniqueOrThrowArgs> = z.object({
  select: OrgsSelectSchema.optional(),
  include: OrgsIncludeSchema.optional(),
  where: OrgsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.OrgsFindUniqueOrThrowArgs>

export const ProjectsFindFirstArgsSchema: z.ZodType<Prisma.ProjectsFindFirstArgs> = z.object({
  select: ProjectsSelectSchema.optional(),
  include: ProjectsIncludeSchema.optional(),
  where: ProjectsWhereInputSchema.optional(),
  orderBy: z.union([ ProjectsOrderByWithRelationInputSchema.array(),ProjectsOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProjectsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ProjectsFindFirstArgs>

export const ProjectsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectsFindFirstOrThrowArgs> = z.object({
  select: ProjectsSelectSchema.optional(),
  include: ProjectsIncludeSchema.optional(),
  where: ProjectsWhereInputSchema.optional(),
  orderBy: z.union([ ProjectsOrderByWithRelationInputSchema.array(),ProjectsOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProjectsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ProjectsFindFirstOrThrowArgs>

export const ProjectsFindManyArgsSchema: z.ZodType<Prisma.ProjectsFindManyArgs> = z.object({
  select: ProjectsSelectSchema.optional(),
  include: ProjectsIncludeSchema.optional(),
  where: ProjectsWhereInputSchema.optional(),
  orderBy: z.union([ ProjectsOrderByWithRelationInputSchema.array(),ProjectsOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProjectsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ProjectsFindManyArgs>

export const ProjectsAggregateArgsSchema: z.ZodType<Prisma.ProjectsAggregateArgs> = z.object({
  where: ProjectsWhereInputSchema.optional(),
  orderBy: z.union([ ProjectsOrderByWithRelationInputSchema.array(),ProjectsOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ProjectsAggregateArgs>

export const ProjectsGroupByArgsSchema: z.ZodType<Prisma.ProjectsGroupByArgs> = z.object({
  where: ProjectsWhereInputSchema.optional(),
  orderBy: z.union([ ProjectsOrderByWithAggregationInputSchema.array(),ProjectsOrderByWithAggregationInputSchema ]).optional(),
  by: ProjectsScalarFieldEnumSchema.array(),
  having: ProjectsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ProjectsGroupByArgs>

export const ProjectsFindUniqueArgsSchema: z.ZodType<Prisma.ProjectsFindUniqueArgs> = z.object({
  select: ProjectsSelectSchema.optional(),
  include: ProjectsIncludeSchema.optional(),
  where: ProjectsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ProjectsFindUniqueArgs>

export const ProjectsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectsFindUniqueOrThrowArgs> = z.object({
  select: ProjectsSelectSchema.optional(),
  include: ProjectsIncludeSchema.optional(),
  where: ProjectsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ProjectsFindUniqueOrThrowArgs>

export const Slack_channelsFindFirstArgsSchema: z.ZodType<Prisma.Slack_channelsFindFirstArgs> = z.object({
  select: Slack_channelsSelectSchema.optional(),
  include: Slack_channelsIncludeSchema.optional(),
  where: Slack_channelsWhereInputSchema.optional(),
  orderBy: z.union([ Slack_channelsOrderByWithRelationInputSchema.array(),Slack_channelsOrderByWithRelationInputSchema ]).optional(),
  cursor: Slack_channelsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Slack_channelsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Slack_channelsFindFirstArgs>

export const Slack_channelsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Slack_channelsFindFirstOrThrowArgs> = z.object({
  select: Slack_channelsSelectSchema.optional(),
  include: Slack_channelsIncludeSchema.optional(),
  where: Slack_channelsWhereInputSchema.optional(),
  orderBy: z.union([ Slack_channelsOrderByWithRelationInputSchema.array(),Slack_channelsOrderByWithRelationInputSchema ]).optional(),
  cursor: Slack_channelsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Slack_channelsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Slack_channelsFindFirstOrThrowArgs>

export const Slack_channelsFindManyArgsSchema: z.ZodType<Prisma.Slack_channelsFindManyArgs> = z.object({
  select: Slack_channelsSelectSchema.optional(),
  include: Slack_channelsIncludeSchema.optional(),
  where: Slack_channelsWhereInputSchema.optional(),
  orderBy: z.union([ Slack_channelsOrderByWithRelationInputSchema.array(),Slack_channelsOrderByWithRelationInputSchema ]).optional(),
  cursor: Slack_channelsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Slack_channelsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Slack_channelsFindManyArgs>

export const Slack_channelsAggregateArgsSchema: z.ZodType<Prisma.Slack_channelsAggregateArgs> = z.object({
  where: Slack_channelsWhereInputSchema.optional(),
  orderBy: z.union([ Slack_channelsOrderByWithRelationInputSchema.array(),Slack_channelsOrderByWithRelationInputSchema ]).optional(),
  cursor: Slack_channelsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Slack_channelsAggregateArgs>

export const Slack_channelsGroupByArgsSchema: z.ZodType<Prisma.Slack_channelsGroupByArgs> = z.object({
  where: Slack_channelsWhereInputSchema.optional(),
  orderBy: z.union([ Slack_channelsOrderByWithAggregationInputSchema.array(),Slack_channelsOrderByWithAggregationInputSchema ]).optional(),
  by: Slack_channelsScalarFieldEnumSchema.array(),
  having: Slack_channelsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Slack_channelsGroupByArgs>

export const Slack_channelsFindUniqueArgsSchema: z.ZodType<Prisma.Slack_channelsFindUniqueArgs> = z.object({
  select: Slack_channelsSelectSchema.optional(),
  include: Slack_channelsIncludeSchema.optional(),
  where: Slack_channelsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Slack_channelsFindUniqueArgs>

export const Slack_channelsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Slack_channelsFindUniqueOrThrowArgs> = z.object({
  select: Slack_channelsSelectSchema.optional(),
  include: Slack_channelsIncludeSchema.optional(),
  where: Slack_channelsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Slack_channelsFindUniqueOrThrowArgs>

export const CommentsCreateArgsSchema: z.ZodType<Prisma.CommentsCreateArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  data: z.union([ CommentsCreateInputSchema,CommentsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CommentsCreateArgs>

export const CommentsUpsertArgsSchema: z.ZodType<Prisma.CommentsUpsertArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereUniqueInputSchema,
  create: z.union([ CommentsCreateInputSchema,CommentsUncheckedCreateInputSchema ]),
  update: z.union([ CommentsUpdateInputSchema,CommentsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CommentsUpsertArgs>

export const CommentsCreateManyArgsSchema: z.ZodType<Prisma.CommentsCreateManyArgs> = z.object({
  data: CommentsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CommentsCreateManyArgs>

export const CommentsDeleteArgsSchema: z.ZodType<Prisma.CommentsDeleteArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  where: CommentsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CommentsDeleteArgs>

export const CommentsUpdateArgsSchema: z.ZodType<Prisma.CommentsUpdateArgs> = z.object({
  select: CommentsSelectSchema.optional(),
  include: CommentsIncludeSchema.optional(),
  data: z.union([ CommentsUpdateInputSchema,CommentsUncheckedUpdateInputSchema ]),
  where: CommentsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CommentsUpdateArgs>

export const CommentsUpdateManyArgsSchema: z.ZodType<Prisma.CommentsUpdateManyArgs> = z.object({
  data: z.union([ CommentsUpdateManyMutationInputSchema,CommentsUncheckedUpdateManyInputSchema ]),
  where: CommentsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CommentsUpdateManyArgs>

export const CommentsDeleteManyArgsSchema: z.ZodType<Prisma.CommentsDeleteManyArgs> = z.object({
  where: CommentsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CommentsDeleteManyArgs>

export const EmailsCreateArgsSchema: z.ZodType<Prisma.EmailsCreateArgs> = z.object({
  select: EmailsSelectSchema.optional(),
  include: EmailsIncludeSchema.optional(),
  data: z.union([ EmailsCreateInputSchema,EmailsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.EmailsCreateArgs>

export const EmailsUpsertArgsSchema: z.ZodType<Prisma.EmailsUpsertArgs> = z.object({
  select: EmailsSelectSchema.optional(),
  include: EmailsIncludeSchema.optional(),
  where: EmailsWhereUniqueInputSchema,
  create: z.union([ EmailsCreateInputSchema,EmailsUncheckedCreateInputSchema ]),
  update: z.union([ EmailsUpdateInputSchema,EmailsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.EmailsUpsertArgs>

export const EmailsCreateManyArgsSchema: z.ZodType<Prisma.EmailsCreateManyArgs> = z.object({
  data: EmailsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.EmailsCreateManyArgs>

export const EmailsDeleteArgsSchema: z.ZodType<Prisma.EmailsDeleteArgs> = z.object({
  select: EmailsSelectSchema.optional(),
  include: EmailsIncludeSchema.optional(),
  where: EmailsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.EmailsDeleteArgs>

export const EmailsUpdateArgsSchema: z.ZodType<Prisma.EmailsUpdateArgs> = z.object({
  select: EmailsSelectSchema.optional(),
  include: EmailsIncludeSchema.optional(),
  data: z.union([ EmailsUpdateInputSchema,EmailsUncheckedUpdateInputSchema ]),
  where: EmailsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.EmailsUpdateArgs>

export const EmailsUpdateManyArgsSchema: z.ZodType<Prisma.EmailsUpdateManyArgs> = z.object({
  data: z.union([ EmailsUpdateManyMutationInputSchema,EmailsUncheckedUpdateManyInputSchema ]),
  where: EmailsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.EmailsUpdateManyArgs>

export const EmailsDeleteManyArgsSchema: z.ZodType<Prisma.EmailsDeleteManyArgs> = z.object({
  where: EmailsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.EmailsDeleteManyArgs>

export const IssuesCreateArgsSchema: z.ZodType<Prisma.IssuesCreateArgs> = z.object({
  select: IssuesSelectSchema.optional(),
  include: IssuesIncludeSchema.optional(),
  data: z.union([ IssuesCreateInputSchema,IssuesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.IssuesCreateArgs>

export const IssuesUpsertArgsSchema: z.ZodType<Prisma.IssuesUpsertArgs> = z.object({
  select: IssuesSelectSchema.optional(),
  include: IssuesIncludeSchema.optional(),
  where: IssuesWhereUniqueInputSchema,
  create: z.union([ IssuesCreateInputSchema,IssuesUncheckedCreateInputSchema ]),
  update: z.union([ IssuesUpdateInputSchema,IssuesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.IssuesUpsertArgs>

export const IssuesCreateManyArgsSchema: z.ZodType<Prisma.IssuesCreateManyArgs> = z.object({
  data: IssuesCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.IssuesCreateManyArgs>

export const IssuesDeleteArgsSchema: z.ZodType<Prisma.IssuesDeleteArgs> = z.object({
  select: IssuesSelectSchema.optional(),
  include: IssuesIncludeSchema.optional(),
  where: IssuesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.IssuesDeleteArgs>

export const IssuesUpdateArgsSchema: z.ZodType<Prisma.IssuesUpdateArgs> = z.object({
  select: IssuesSelectSchema.optional(),
  include: IssuesIncludeSchema.optional(),
  data: z.union([ IssuesUpdateInputSchema,IssuesUncheckedUpdateInputSchema ]),
  where: IssuesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.IssuesUpdateArgs>

export const IssuesUpdateManyArgsSchema: z.ZodType<Prisma.IssuesUpdateManyArgs> = z.object({
  data: z.union([ IssuesUpdateManyMutationInputSchema,IssuesUncheckedUpdateManyInputSchema ]),
  where: IssuesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.IssuesUpdateManyArgs>

export const IssuesDeleteManyArgsSchema: z.ZodType<Prisma.IssuesDeleteManyArgs> = z.object({
  where: IssuesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.IssuesDeleteManyArgs>

export const OrgsCreateArgsSchema: z.ZodType<Prisma.OrgsCreateArgs> = z.object({
  select: OrgsSelectSchema.optional(),
  include: OrgsIncludeSchema.optional(),
  data: z.union([ OrgsCreateInputSchema,OrgsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.OrgsCreateArgs>

export const OrgsUpsertArgsSchema: z.ZodType<Prisma.OrgsUpsertArgs> = z.object({
  select: OrgsSelectSchema.optional(),
  include: OrgsIncludeSchema.optional(),
  where: OrgsWhereUniqueInputSchema,
  create: z.union([ OrgsCreateInputSchema,OrgsUncheckedCreateInputSchema ]),
  update: z.union([ OrgsUpdateInputSchema,OrgsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.OrgsUpsertArgs>

export const OrgsCreateManyArgsSchema: z.ZodType<Prisma.OrgsCreateManyArgs> = z.object({
  data: OrgsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.OrgsCreateManyArgs>

export const OrgsDeleteArgsSchema: z.ZodType<Prisma.OrgsDeleteArgs> = z.object({
  select: OrgsSelectSchema.optional(),
  include: OrgsIncludeSchema.optional(),
  where: OrgsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.OrgsDeleteArgs>

export const OrgsUpdateArgsSchema: z.ZodType<Prisma.OrgsUpdateArgs> = z.object({
  select: OrgsSelectSchema.optional(),
  include: OrgsIncludeSchema.optional(),
  data: z.union([ OrgsUpdateInputSchema,OrgsUncheckedUpdateInputSchema ]),
  where: OrgsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.OrgsUpdateArgs>

export const OrgsUpdateManyArgsSchema: z.ZodType<Prisma.OrgsUpdateManyArgs> = z.object({
  data: z.union([ OrgsUpdateManyMutationInputSchema,OrgsUncheckedUpdateManyInputSchema ]),
  where: OrgsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.OrgsUpdateManyArgs>

export const OrgsDeleteManyArgsSchema: z.ZodType<Prisma.OrgsDeleteManyArgs> = z.object({
  where: OrgsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.OrgsDeleteManyArgs>

export const ProjectsCreateArgsSchema: z.ZodType<Prisma.ProjectsCreateArgs> = z.object({
  select: ProjectsSelectSchema.optional(),
  include: ProjectsIncludeSchema.optional(),
  data: z.union([ ProjectsCreateInputSchema,ProjectsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ProjectsCreateArgs>

export const ProjectsUpsertArgsSchema: z.ZodType<Prisma.ProjectsUpsertArgs> = z.object({
  select: ProjectsSelectSchema.optional(),
  include: ProjectsIncludeSchema.optional(),
  where: ProjectsWhereUniqueInputSchema,
  create: z.union([ ProjectsCreateInputSchema,ProjectsUncheckedCreateInputSchema ]),
  update: z.union([ ProjectsUpdateInputSchema,ProjectsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ProjectsUpsertArgs>

export const ProjectsCreateManyArgsSchema: z.ZodType<Prisma.ProjectsCreateManyArgs> = z.object({
  data: ProjectsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ProjectsCreateManyArgs>

export const ProjectsDeleteArgsSchema: z.ZodType<Prisma.ProjectsDeleteArgs> = z.object({
  select: ProjectsSelectSchema.optional(),
  include: ProjectsIncludeSchema.optional(),
  where: ProjectsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ProjectsDeleteArgs>

export const ProjectsUpdateArgsSchema: z.ZodType<Prisma.ProjectsUpdateArgs> = z.object({
  select: ProjectsSelectSchema.optional(),
  include: ProjectsIncludeSchema.optional(),
  data: z.union([ ProjectsUpdateInputSchema,ProjectsUncheckedUpdateInputSchema ]),
  where: ProjectsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ProjectsUpdateArgs>

export const ProjectsUpdateManyArgsSchema: z.ZodType<Prisma.ProjectsUpdateManyArgs> = z.object({
  data: z.union([ ProjectsUpdateManyMutationInputSchema,ProjectsUncheckedUpdateManyInputSchema ]),
  where: ProjectsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ProjectsUpdateManyArgs>

export const ProjectsDeleteManyArgsSchema: z.ZodType<Prisma.ProjectsDeleteManyArgs> = z.object({
  where: ProjectsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ProjectsDeleteManyArgs>

export const Slack_channelsCreateArgsSchema: z.ZodType<Prisma.Slack_channelsCreateArgs> = z.object({
  select: Slack_channelsSelectSchema.optional(),
  include: Slack_channelsIncludeSchema.optional(),
  data: z.union([ Slack_channelsCreateInputSchema,Slack_channelsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.Slack_channelsCreateArgs>

export const Slack_channelsUpsertArgsSchema: z.ZodType<Prisma.Slack_channelsUpsertArgs> = z.object({
  select: Slack_channelsSelectSchema.optional(),
  include: Slack_channelsIncludeSchema.optional(),
  where: Slack_channelsWhereUniqueInputSchema,
  create: z.union([ Slack_channelsCreateInputSchema,Slack_channelsUncheckedCreateInputSchema ]),
  update: z.union([ Slack_channelsUpdateInputSchema,Slack_channelsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.Slack_channelsUpsertArgs>

export const Slack_channelsCreateManyArgsSchema: z.ZodType<Prisma.Slack_channelsCreateManyArgs> = z.object({
  data: Slack_channelsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.Slack_channelsCreateManyArgs>

export const Slack_channelsDeleteArgsSchema: z.ZodType<Prisma.Slack_channelsDeleteArgs> = z.object({
  select: Slack_channelsSelectSchema.optional(),
  include: Slack_channelsIncludeSchema.optional(),
  where: Slack_channelsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Slack_channelsDeleteArgs>

export const Slack_channelsUpdateArgsSchema: z.ZodType<Prisma.Slack_channelsUpdateArgs> = z.object({
  select: Slack_channelsSelectSchema.optional(),
  include: Slack_channelsIncludeSchema.optional(),
  data: z.union([ Slack_channelsUpdateInputSchema,Slack_channelsUncheckedUpdateInputSchema ]),
  where: Slack_channelsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Slack_channelsUpdateArgs>

export const Slack_channelsUpdateManyArgsSchema: z.ZodType<Prisma.Slack_channelsUpdateManyArgs> = z.object({
  data: z.union([ Slack_channelsUpdateManyMutationInputSchema,Slack_channelsUncheckedUpdateManyInputSchema ]),
  where: Slack_channelsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Slack_channelsUpdateManyArgs>

export const Slack_channelsDeleteManyArgsSchema: z.ZodType<Prisma.Slack_channelsDeleteManyArgs> = z.object({
  where: Slack_channelsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Slack_channelsDeleteManyArgs>

interface CommentsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.CommentsArgs
  readonly type: Prisma.CommentsGetPayload<this['_A']>
}

interface EmailsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.EmailsArgs
  readonly type: Prisma.EmailsGetPayload<this['_A']>
}

interface IssuesGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.IssuesArgs
  readonly type: Prisma.IssuesGetPayload<this['_A']>
}

interface OrgsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.OrgsArgs
  readonly type: Prisma.OrgsGetPayload<this['_A']>
}

interface ProjectsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ProjectsArgs
  readonly type: Prisma.ProjectsGetPayload<this['_A']>
}

interface Slack_channelsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Slack_channelsArgs
  readonly type: Prisma.Slack_channelsGetPayload<this['_A']>
}

export const tableSchemas = {
  comments: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "body",
        "TEXT"
      ],
      [
        "username",
        "TEXT"
      ],
      [
        "issue_id",
        "UUID"
      ],
      [
        "created_at",
        "TIMESTAMPTZ"
      ]
    ]),
    relations: [
      new Relation("issues", "issue_id", "id", "issues", "CommentsToIssues", "one"),
    ],
    modelSchema: (CommentsCreateInputSchema as any)
      .partial()
      .or((CommentsUncheckedCreateInputSchema as any).partial()),
    createSchema: CommentsCreateArgsSchema,
    createManySchema: CommentsCreateManyArgsSchema,
    findUniqueSchema: CommentsFindUniqueArgsSchema,
    findSchema: CommentsFindFirstArgsSchema,
    updateSchema: CommentsUpdateArgsSchema,
    updateManySchema: CommentsUpdateManyArgsSchema,
    upsertSchema: CommentsUpsertArgsSchema,
    deleteSchema: CommentsDeleteArgsSchema,
    deleteManySchema: CommentsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof CommentsCreateInputSchema>,
    Prisma.CommentsCreateArgs['data'],
    Prisma.CommentsUpdateArgs['data'],
    Prisma.CommentsFindFirstArgs['select'],
    Prisma.CommentsFindFirstArgs['where'],
    Prisma.CommentsFindUniqueArgs['where'],
    Omit<Prisma.CommentsInclude, '_count'>,
    Prisma.CommentsFindFirstArgs['orderBy'],
    Prisma.CommentsScalarFieldEnum,
    CommentsGetPayload
  >,
  emails: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "created_at",
        "TIMESTAMPTZ"
      ],
      [
        "email_address",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("orgs", "", "", "orgs", "EmailsToOrgs", "many"),
    ],
    modelSchema: (EmailsCreateInputSchema as any)
      .partial()
      .or((EmailsUncheckedCreateInputSchema as any).partial()),
    createSchema: EmailsCreateArgsSchema,
    createManySchema: EmailsCreateManyArgsSchema,
    findUniqueSchema: EmailsFindUniqueArgsSchema,
    findSchema: EmailsFindFirstArgsSchema,
    updateSchema: EmailsUpdateArgsSchema,
    updateManySchema: EmailsUpdateManyArgsSchema,
    upsertSchema: EmailsUpsertArgsSchema,
    deleteSchema: EmailsDeleteArgsSchema,
    deleteManySchema: EmailsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof EmailsCreateInputSchema>,
    Prisma.EmailsCreateArgs['data'],
    Prisma.EmailsUpdateArgs['data'],
    Prisma.EmailsFindFirstArgs['select'],
    Prisma.EmailsFindFirstArgs['where'],
    Prisma.EmailsFindUniqueArgs['where'],
    Omit<Prisma.EmailsInclude, '_count'>,
    Prisma.EmailsFindFirstArgs['orderBy'],
    Prisma.EmailsScalarFieldEnum,
    EmailsGetPayload
  >,
  issues: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "title",
        "TEXT"
      ],
      [
        "description",
        "TEXT"
      ],
      [
        "created_at",
        "TIMESTAMPTZ"
      ],
      [
        "kanbanorder",
        "TEXT"
      ],
      [
        "username",
        "TEXT"
      ],
      [
        "external_urls",
        "TEXT"
      ],
      [
        "completed_at",
        "TIMESTAMPTZ"
      ],
      [
        "status",
        "TEXT"
      ],
      [
        "priority",
        "TEXT"
      ],
      [
        "updated_at",
        "TIMESTAMPTZ"
      ],
      [
        "project_id",
        "UUID"
      ]
    ]),
    relations: [
      new Relation("comments", "", "", "comments", "CommentsToIssues", "many"),
      new Relation("projects", "project_id", "id", "projects", "IssuesToProjects", "one"),
    ],
    modelSchema: (IssuesCreateInputSchema as any)
      .partial()
      .or((IssuesUncheckedCreateInputSchema as any).partial()),
    createSchema: IssuesCreateArgsSchema,
    createManySchema: IssuesCreateManyArgsSchema,
    findUniqueSchema: IssuesFindUniqueArgsSchema,
    findSchema: IssuesFindFirstArgsSchema,
    updateSchema: IssuesUpdateArgsSchema,
    updateManySchema: IssuesUpdateManyArgsSchema,
    upsertSchema: IssuesUpsertArgsSchema,
    deleteSchema: IssuesDeleteArgsSchema,
    deleteManySchema: IssuesDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof IssuesCreateInputSchema>,
    Prisma.IssuesCreateArgs['data'],
    Prisma.IssuesUpdateArgs['data'],
    Prisma.IssuesFindFirstArgs['select'],
    Prisma.IssuesFindFirstArgs['where'],
    Prisma.IssuesFindUniqueArgs['where'],
    Omit<Prisma.IssuesInclude, '_count'>,
    Prisma.IssuesFindFirstArgs['orderBy'],
    Prisma.IssuesScalarFieldEnum,
    IssuesGetPayload
  >,
  orgs: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "created_at",
        "TIMESTAMPTZ"
      ],
      [
        "name",
        "TEXT"
      ],
      [
        "shortname",
        "TEXT"
      ],
      [
        "aliases",
        "TEXT"
      ],
      [
        "first_contact",
        "TIMESTAMPTZ"
      ],
      [
        "updated_at",
        "TIMESTAMPTZ"
      ],
      [
        "website",
        "TEXT"
      ],
      [
        "primary_email_address_id",
        "UUID"
      ],
      [
        "primary_slack_channel_id",
        "UUID"
      ],
      [
        "summary",
        "TEXT"
      ],
      [
        "note",
        "TEXT"
      ],
      [
        "missive_conversation_id",
        "UUID"
      ],
      [
        "missive_label_id",
        "UUID"
      ],
      [
        "history",
        "JSONB"
      ],
      [
        "github_id",
        "UUID"
      ],
      [
        "linear_id",
        "UUID"
      ],
      [
        "pivotal_tracker_id",
        "UUID"
      ]
    ]),
    relations: [
      new Relation("emails", "primary_email_address_id", "id", "emails", "EmailsToOrgs", "one"),
      new Relation("slack_channels", "primary_slack_channel_id", "id", "slack_channels", "OrgsToSlack_channels", "one"),
      new Relation("projects", "", "", "projects", "OrgsToProjects", "many"),
    ],
    modelSchema: (OrgsCreateInputSchema as any)
      .partial()
      .or((OrgsUncheckedCreateInputSchema as any).partial()),
    createSchema: OrgsCreateArgsSchema,
    createManySchema: OrgsCreateManyArgsSchema,
    findUniqueSchema: OrgsFindUniqueArgsSchema,
    findSchema: OrgsFindFirstArgsSchema,
    updateSchema: OrgsUpdateArgsSchema,
    updateManySchema: OrgsUpdateManyArgsSchema,
    upsertSchema: OrgsUpsertArgsSchema,
    deleteSchema: OrgsDeleteArgsSchema,
    deleteManySchema: OrgsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof OrgsCreateInputSchema>,
    Prisma.OrgsCreateArgs['data'],
    Prisma.OrgsUpdateArgs['data'],
    Prisma.OrgsFindFirstArgs['select'],
    Prisma.OrgsFindFirstArgs['where'],
    Prisma.OrgsFindUniqueArgs['where'],
    Omit<Prisma.OrgsInclude, '_count'>,
    Prisma.OrgsFindFirstArgs['orderBy'],
    Prisma.OrgsScalarFieldEnum,
    OrgsGetPayload
  >,
  projects: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "created_at",
        "TIMESTAMPTZ"
      ],
      [
        "name",
        "TEXT"
      ],
      [
        "shortname",
        "TEXT"
      ],
      [
        "aliases",
        "TEXT"
      ],
      [
        "summary",
        "TEXT"
      ],
      [
        "note",
        "TEXT"
      ],
      [
        "org_id",
        "UUID"
      ],
      [
        "missive_conversation_id",
        "UUID"
      ],
      [
        "missive_label_id",
        "UUID"
      ],
      [
        "start_date",
        "TIMESTAMPTZ"
      ],
      [
        "end_date",
        "TIMESTAMPTZ"
      ],
      [
        "updated_at",
        "TIMESTAMPTZ"
      ],
      [
        "history",
        "JSONB"
      ],
      [
        "status",
        "TEXT"
      ],
      [
        "linear_team_id",
        "UUID"
      ],
      [
        "pivotal_tracker_id",
        "INT8"
      ]
    ]),
    relations: [
      new Relation("issues", "", "", "issues", "IssuesToProjects", "many"),
      new Relation("orgs", "org_id", "id", "orgs", "OrgsToProjects", "one"),
    ],
    modelSchema: (ProjectsCreateInputSchema as any)
      .partial()
      .or((ProjectsUncheckedCreateInputSchema as any).partial()),
    createSchema: ProjectsCreateArgsSchema,
    createManySchema: ProjectsCreateManyArgsSchema,
    findUniqueSchema: ProjectsFindUniqueArgsSchema,
    findSchema: ProjectsFindFirstArgsSchema,
    updateSchema: ProjectsUpdateArgsSchema,
    updateManySchema: ProjectsUpdateManyArgsSchema,
    upsertSchema: ProjectsUpsertArgsSchema,
    deleteSchema: ProjectsDeleteArgsSchema,
    deleteManySchema: ProjectsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ProjectsCreateInputSchema>,
    Prisma.ProjectsCreateArgs['data'],
    Prisma.ProjectsUpdateArgs['data'],
    Prisma.ProjectsFindFirstArgs['select'],
    Prisma.ProjectsFindFirstArgs['where'],
    Prisma.ProjectsFindUniqueArgs['where'],
    Omit<Prisma.ProjectsInclude, '_count'>,
    Prisma.ProjectsFindFirstArgs['orderBy'],
    Prisma.ProjectsScalarFieldEnum,
    ProjectsGetPayload
  >,
  slack_channels: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "created_at",
        "TIMESTAMPTZ"
      ]
    ]),
    relations: [
      new Relation("orgs", "", "", "orgs", "OrgsToSlack_channels", "many"),
    ],
    modelSchema: (Slack_channelsCreateInputSchema as any)
      .partial()
      .or((Slack_channelsUncheckedCreateInputSchema as any).partial()),
    createSchema: Slack_channelsCreateArgsSchema,
    createManySchema: Slack_channelsCreateManyArgsSchema,
    findUniqueSchema: Slack_channelsFindUniqueArgsSchema,
    findSchema: Slack_channelsFindFirstArgsSchema,
    updateSchema: Slack_channelsUpdateArgsSchema,
    updateManySchema: Slack_channelsUpdateManyArgsSchema,
    upsertSchema: Slack_channelsUpsertArgsSchema,
    deleteSchema: Slack_channelsDeleteArgsSchema,
    deleteManySchema: Slack_channelsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof Slack_channelsCreateInputSchema>,
    Prisma.Slack_channelsCreateArgs['data'],
    Prisma.Slack_channelsUpdateArgs['data'],
    Prisma.Slack_channelsFindFirstArgs['select'],
    Prisma.Slack_channelsFindFirstArgs['where'],
    Prisma.Slack_channelsFindUniqueArgs['where'],
    Omit<Prisma.Slack_channelsInclude, '_count'>,
    Prisma.Slack_channelsFindFirstArgs['orderBy'],
    Prisma.Slack_channelsScalarFieldEnum,
    Slack_channelsGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>
export const JsonNull = { __is_electric_json_null__: true }
