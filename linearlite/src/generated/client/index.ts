import { z } from 'zod';
import type { Prisma } from './prismaClient';
import { type TableSchema, DbSchema, Relation, ElectricClient, type HKT } from 'electric-sql/client/model';
import migrations from './migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const CommentsScalarFieldEnumSchema = z.enum(['id','body','username','issue_id','created_at']);

export const IssuesScalarFieldEnumSchema = z.enum(['id','title','description','priority','status','modified','created','kanbanorder','username']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);
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
// ISSUES SCHEMA
/////////////////////////////////////////

export const IssuesSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  status: z.string(),
  modified: z.coerce.date(),
  created: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string(),
})

export type Issues = z.infer<typeof IssuesSchema>

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

// ISSUES
//------------------------------------------------------

export const IssuesIncludeSchema: z.ZodType<Prisma.IssuesInclude> = z.object({
  comments: z.union([z.boolean(),z.lazy(() => CommentsFindManyArgsSchema)]).optional(),
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
  priority: z.boolean().optional(),
  status: z.boolean().optional(),
  modified: z.boolean().optional(),
  created: z.boolean().optional(),
  kanbanorder: z.boolean().optional(),
  username: z.boolean().optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IssuesCountOutputTypeArgsSchema)]).optional(),
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

export const IssuesWhereInputSchema: z.ZodType<Prisma.IssuesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IssuesWhereInputSchema),z.lazy(() => IssuesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IssuesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IssuesWhereInputSchema),z.lazy(() => IssuesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  priority: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  modified: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  kanbanorder: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comments: z.lazy(() => CommentsListRelationFilterSchema).optional()
}).strict();

export const IssuesOrderByWithRelationInputSchema: z.ZodType<Prisma.IssuesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  modified: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  kanbanorder: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => CommentsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const IssuesWhereUniqueInputSchema: z.ZodType<Prisma.IssuesWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const IssuesOrderByWithAggregationInputSchema: z.ZodType<Prisma.IssuesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  modified: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  kanbanorder: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
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
  priority: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  modified: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  kanbanorder: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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

export const IssuesCreateInputSchema: z.ZodType<Prisma.IssuesCreateInput> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  status: z.string(),
  modified: z.coerce.date(),
  created: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string(),
  comments: z.lazy(() => CommentsCreateNestedManyWithoutIssuesInputSchema).optional()
}).strict();

export const IssuesUncheckedCreateInputSchema: z.ZodType<Prisma.IssuesUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  status: z.string(),
  modified: z.coerce.date(),
  created: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string(),
  comments: z.lazy(() => CommentsUncheckedCreateNestedManyWithoutIssuesInputSchema).optional()
}).strict();

export const IssuesUpdateInputSchema: z.ZodType<Prisma.IssuesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentsUpdateManyWithoutIssuesNestedInputSchema).optional()
}).strict();

export const IssuesUncheckedUpdateInputSchema: z.ZodType<Prisma.IssuesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentsUncheckedUpdateManyWithoutIssuesNestedInputSchema).optional()
}).strict();

export const IssuesCreateManyInputSchema: z.ZodType<Prisma.IssuesCreateManyInput> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  status: z.string(),
  modified: z.coerce.date(),
  created: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string()
}).strict();

export const IssuesUpdateManyMutationInputSchema: z.ZodType<Prisma.IssuesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IssuesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IssuesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const CommentsListRelationFilterSchema: z.ZodType<Prisma.CommentsListRelationFilter> = z.object({
  every: z.lazy(() => CommentsWhereInputSchema).optional(),
  some: z.lazy(() => CommentsWhereInputSchema).optional(),
  none: z.lazy(() => CommentsWhereInputSchema).optional()
}).strict();

export const CommentsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IssuesCountOrderByAggregateInputSchema: z.ZodType<Prisma.IssuesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  modified: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  kanbanorder: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IssuesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IssuesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  modified: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  kanbanorder: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IssuesMinOrderByAggregateInputSchema: z.ZodType<Prisma.IssuesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  modified: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  kanbanorder: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional()
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

export const CommentsCreateNestedManyWithoutIssuesInputSchema: z.ZodType<Prisma.CommentsCreateNestedManyWithoutIssuesInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutIssuesInputSchema),z.lazy(() => CommentsCreateWithoutIssuesInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutIssuesInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutIssuesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyIssuesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentsUncheckedCreateNestedManyWithoutIssuesInputSchema: z.ZodType<Prisma.CommentsUncheckedCreateNestedManyWithoutIssuesInput> = z.object({
  create: z.union([ z.lazy(() => CommentsCreateWithoutIssuesInputSchema),z.lazy(() => CommentsCreateWithoutIssuesInputSchema).array(),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema),z.lazy(() => CommentsUncheckedCreateWithoutIssuesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentsCreateOrConnectWithoutIssuesInputSchema),z.lazy(() => CommentsCreateOrConnectWithoutIssuesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentsCreateManyIssuesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentsWhereUniqueInputSchema),z.lazy(() => CommentsWhereUniqueInputSchema).array() ]).optional(),
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

export const IssuesCreateWithoutCommentsInputSchema: z.ZodType<Prisma.IssuesCreateWithoutCommentsInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  status: z.string(),
  modified: z.coerce.date(),
  created: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string()
}).strict();

export const IssuesUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.IssuesUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  status: z.string(),
  modified: z.coerce.date(),
  created: z.coerce.date(),
  kanbanorder: z.string(),
  username: z.string()
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
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IssuesUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.IssuesUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modified: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  kanbanorder: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

interface CommentsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.CommentsArgs
  readonly type: Prisma.CommentsGetPayload<this['_A']>
}

interface IssuesGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.IssuesArgs
  readonly type: Prisma.IssuesGetPayload<this['_A']>
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
        "priority",
        "TEXT"
      ],
      [
        "status",
        "TEXT"
      ],
      [
        "modified",
        "TIMESTAMPTZ"
      ],
      [
        "created",
        "TIMESTAMPTZ"
      ],
      [
        "kanbanorder",
        "TEXT"
      ],
      [
        "username",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("comments", "", "", "comments", "CommentsToIssues", "many"),
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
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>
