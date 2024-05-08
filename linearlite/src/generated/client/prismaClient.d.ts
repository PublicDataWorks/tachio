
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Comments
 * 
 */
export type Comments = {
  /**
   * @zod.string.uuid()
   */
  id: string
  body: string
  username: string
  /**
   * @zod.string.uuid()
   */
  issue_id: string
  created_at: Date
}

/**
 * Model Emails
 * 
 */
export type Emails = {
  /**
   * @zod.string.uuid()
   */
  id: string
  created_at: Date
  email_address: string
}

/**
 * Model Issues
 * 
 */
export type Issues = {
  /**
   * @zod.string.uuid()
   */
  id: string
  title: string
  description: string
  created_at: Date
  kanbanorder: string
  username: string
  external_urls: string | null
  completed_at: Date | null
  status: string
  priority: string
  updated_at: Date | null
  /**
   * @zod.string.uuid()
   */
  project_id: string | null
}

/**
 * Model Orgs
 * 
 */
export type Orgs = {
  /**
   * @zod.string.uuid()
   */
  id: string
  created_at: Date
  name: string
  shortname: string
  aliases: string | null
  first_contact: Date
  updated_at: Date | null
  website: string | null
  /**
   * @zod.string.uuid()
   */
  primary_email_address_id: string | null
  /**
   * @zod.string.uuid()
   */
  primary_slack_channel_id: string | null
  summary: string | null
  note: string | null
  /**
   * @zod.string.uuid()
   */
  missive_conversation_id: string
  /**
   * @zod.string.uuid()
   */
  missive_label_id: string
  history: Prisma.JsonValue | null
  /**
   * @zod.string.uuid()
   */
  github_id: string | null
  /**
   * @zod.string.uuid()
   */
  linear_id: string | null
  /**
   * @zod.string.uuid()
   */
  pivotal_tracker_id: string | null
}

/**
 * Model Projects
 * 
 */
export type Projects = {
  /**
   * @zod.string.uuid()
   */
  id: string
  created_at: Date
  name: string
  shortname: string
  aliases: string | null
  summary: string | null
  note: string | null
  /**
   * @zod.string.uuid()
   */
  org_id: string
  /**
   * @zod.string.uuid()
   */
  missive_conversation_id: string
  /**
   * @zod.string.uuid()
   */
  missive_label_id: string
  start_date: Date
  end_date: Date | null
  updated_at: Date | null
  history: Prisma.JsonValue | null
  status: project_status | null
  /**
   * @zod.string.uuid()
   */
  linear_team_id: string | null
  pivotal_tracker_id: bigint | null
}

/**
 * Model Slack_channels
 * 
 */
export type Slack_channels = {
  /**
   * @zod.string.uuid()
   */
  id: string
  created_at: Date
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const project_status: {
  active: 'active',
  paused: 'paused',
  completed: 'completed',
  archived: 'archived'
};

export type project_status = (typeof project_status)[keyof typeof project_status]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Comments
 * const comments = await prisma.comments.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Comments
   * const comments = await prisma.comments.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.comments`: Exposes CRUD operations for the **Comments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comments.findMany()
    * ```
    */
  get comments(): Prisma.CommentsDelegate<GlobalReject>;

  /**
   * `prisma.emails`: Exposes CRUD operations for the **Emails** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Emails
    * const emails = await prisma.emails.findMany()
    * ```
    */
  get emails(): Prisma.EmailsDelegate<GlobalReject>;

  /**
   * `prisma.issues`: Exposes CRUD operations for the **Issues** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Issues
    * const issues = await prisma.issues.findMany()
    * ```
    */
  get issues(): Prisma.IssuesDelegate<GlobalReject>;

  /**
   * `prisma.orgs`: Exposes CRUD operations for the **Orgs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orgs
    * const orgs = await prisma.orgs.findMany()
    * ```
    */
  get orgs(): Prisma.OrgsDelegate<GlobalReject>;

  /**
   * `prisma.projects`: Exposes CRUD operations for the **Projects** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.projects.findMany()
    * ```
    */
  get projects(): Prisma.ProjectsDelegate<GlobalReject>;

  /**
   * `prisma.slack_channels`: Exposes CRUD operations for the **Slack_channels** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Slack_channels
    * const slack_channels = await prisma.slack_channels.findMany()
    * ```
    */
  get slack_channels(): Prisma.Slack_channelsDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.8.1
   * Query Engine version: d6e67a83f971b175a593ccc12e15c4a757f93ffe
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
export type InputJsonValue = null | string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Comments: 'Comments',
    Emails: 'Emails',
    Issues: 'Issues',
    Orgs: 'Orgs',
    Projects: 'Projects',
    Slack_channels: 'Slack_channels'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EmailsCountOutputType
   */


  export type EmailsCountOutputType = {
    orgs: number
  }

  export type EmailsCountOutputTypeSelect = {
    orgs?: boolean
  }

  export type EmailsCountOutputTypeGetPayload<S extends boolean | null | undefined | EmailsCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? EmailsCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (EmailsCountOutputTypeArgs)
    ? EmailsCountOutputType 
    : S extends { select: any } & (EmailsCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof EmailsCountOutputType ? EmailsCountOutputType[P] : never
  } 
      : EmailsCountOutputType




  // Custom InputTypes

  /**
   * EmailsCountOutputType without action
   */
  export type EmailsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the EmailsCountOutputType
     * 
    **/
    select?: EmailsCountOutputTypeSelect | null
  }



  /**
   * Count Type IssuesCountOutputType
   */


  export type IssuesCountOutputType = {
    comments: number
  }

  export type IssuesCountOutputTypeSelect = {
    comments?: boolean
  }

  export type IssuesCountOutputTypeGetPayload<S extends boolean | null | undefined | IssuesCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? IssuesCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (IssuesCountOutputTypeArgs)
    ? IssuesCountOutputType 
    : S extends { select: any } & (IssuesCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof IssuesCountOutputType ? IssuesCountOutputType[P] : never
  } 
      : IssuesCountOutputType




  // Custom InputTypes

  /**
   * IssuesCountOutputType without action
   */
  export type IssuesCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the IssuesCountOutputType
     * 
    **/
    select?: IssuesCountOutputTypeSelect | null
  }



  /**
   * Count Type OrgsCountOutputType
   */


  export type OrgsCountOutputType = {
    projects: number
  }

  export type OrgsCountOutputTypeSelect = {
    projects?: boolean
  }

  export type OrgsCountOutputTypeGetPayload<S extends boolean | null | undefined | OrgsCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? OrgsCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (OrgsCountOutputTypeArgs)
    ? OrgsCountOutputType 
    : S extends { select: any } & (OrgsCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof OrgsCountOutputType ? OrgsCountOutputType[P] : never
  } 
      : OrgsCountOutputType




  // Custom InputTypes

  /**
   * OrgsCountOutputType without action
   */
  export type OrgsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the OrgsCountOutputType
     * 
    **/
    select?: OrgsCountOutputTypeSelect | null
  }



  /**
   * Count Type ProjectsCountOutputType
   */


  export type ProjectsCountOutputType = {
    issues: number
  }

  export type ProjectsCountOutputTypeSelect = {
    issues?: boolean
  }

  export type ProjectsCountOutputTypeGetPayload<S extends boolean | null | undefined | ProjectsCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ProjectsCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ProjectsCountOutputTypeArgs)
    ? ProjectsCountOutputType 
    : S extends { select: any } & (ProjectsCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ProjectsCountOutputType ? ProjectsCountOutputType[P] : never
  } 
      : ProjectsCountOutputType




  // Custom InputTypes

  /**
   * ProjectsCountOutputType without action
   */
  export type ProjectsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProjectsCountOutputType
     * 
    **/
    select?: ProjectsCountOutputTypeSelect | null
  }



  /**
   * Count Type Slack_channelsCountOutputType
   */


  export type Slack_channelsCountOutputType = {
    orgs: number
  }

  export type Slack_channelsCountOutputTypeSelect = {
    orgs?: boolean
  }

  export type Slack_channelsCountOutputTypeGetPayload<S extends boolean | null | undefined | Slack_channelsCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Slack_channelsCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (Slack_channelsCountOutputTypeArgs)
    ? Slack_channelsCountOutputType 
    : S extends { select: any } & (Slack_channelsCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Slack_channelsCountOutputType ? Slack_channelsCountOutputType[P] : never
  } 
      : Slack_channelsCountOutputType




  // Custom InputTypes

  /**
   * Slack_channelsCountOutputType without action
   */
  export type Slack_channelsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the Slack_channelsCountOutputType
     * 
    **/
    select?: Slack_channelsCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Comments
   */


  export type AggregateComments = {
    _count: CommentsCountAggregateOutputType | null
    _min: CommentsMinAggregateOutputType | null
    _max: CommentsMaxAggregateOutputType | null
  }

  export type CommentsMinAggregateOutputType = {
    id: string | null
    body: string | null
    username: string | null
    issue_id: string | null
    created_at: Date | null
  }

  export type CommentsMaxAggregateOutputType = {
    id: string | null
    body: string | null
    username: string | null
    issue_id: string | null
    created_at: Date | null
  }

  export type CommentsCountAggregateOutputType = {
    id: number
    body: number
    username: number
    issue_id: number
    created_at: number
    _all: number
  }


  export type CommentsMinAggregateInputType = {
    id?: true
    body?: true
    username?: true
    issue_id?: true
    created_at?: true
  }

  export type CommentsMaxAggregateInputType = {
    id?: true
    body?: true
    username?: true
    issue_id?: true
    created_at?: true
  }

  export type CommentsCountAggregateInputType = {
    id?: true
    body?: true
    username?: true
    issue_id?: true
    created_at?: true
    _all?: true
  }

  export type CommentsAggregateArgs = {
    /**
     * Filter which Comments to aggregate.
     * 
    **/
    where?: CommentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     * 
    **/
    orderBy?: Enumerable<CommentsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CommentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentsMaxAggregateInputType
  }

  export type GetCommentsAggregateType<T extends CommentsAggregateArgs> = {
        [P in keyof T & keyof AggregateComments]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComments[P]>
      : GetScalarType<T[P], AggregateComments[P]>
  }




  export type CommentsGroupByArgs = {
    where?: CommentsWhereInput
    orderBy?: Enumerable<CommentsOrderByWithAggregationInput>
    by: Array<CommentsScalarFieldEnum>
    having?: CommentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentsCountAggregateInputType | true
    _min?: CommentsMinAggregateInputType
    _max?: CommentsMaxAggregateInputType
  }


  export type CommentsGroupByOutputType = {
    id: string
    body: string
    username: string
    issue_id: string
    created_at: Date
    _count: CommentsCountAggregateOutputType | null
    _min: CommentsMinAggregateOutputType | null
    _max: CommentsMaxAggregateOutputType | null
  }

  type GetCommentsGroupByPayload<T extends CommentsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CommentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentsGroupByOutputType[P]>
            : GetScalarType<T[P], CommentsGroupByOutputType[P]>
        }
      >
    >


  export type CommentsSelect = {
    id?: boolean
    body?: boolean
    username?: boolean
    issue_id?: boolean
    created_at?: boolean
    issues?: boolean | IssuesArgs
  }


  export type CommentsInclude = {
    issues?: boolean | IssuesArgs
  } 

  export type CommentsGetPayload<S extends boolean | null | undefined | CommentsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Comments :
    S extends undefined ? never :
    S extends { include: any } & (CommentsArgs | CommentsFindManyArgs)
    ? Comments  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'issues' ? IssuesGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (CommentsArgs | CommentsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'issues' ? IssuesGetPayload<S['select'][P]> :  P extends keyof Comments ? Comments[P] : never
  } 
      : Comments


  type CommentsCountArgs = Merge<
    Omit<CommentsFindManyArgs, 'select' | 'include'> & {
      select?: CommentsCountAggregateInputType | true
    }
  >

  export interface CommentsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Comments that matches the filter.
     * @param {CommentsFindUniqueArgs} args - Arguments to find a Comments
     * @example
     * // Get one Comments
     * const comments = await prisma.comments.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CommentsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CommentsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Comments'> extends True ? Prisma__CommentsClient<CommentsGetPayload<T>> : Prisma__CommentsClient<CommentsGetPayload<T> | null, null>

    /**
     * Find one Comments that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CommentsFindUniqueOrThrowArgs} args - Arguments to find a Comments
     * @example
     * // Get one Comments
     * const comments = await prisma.comments.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CommentsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CommentsFindUniqueOrThrowArgs>
    ): Prisma__CommentsClient<CommentsGetPayload<T>>

    /**
     * Find the first Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentsFindFirstArgs} args - Arguments to find a Comments
     * @example
     * // Get one Comments
     * const comments = await prisma.comments.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CommentsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CommentsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Comments'> extends True ? Prisma__CommentsClient<CommentsGetPayload<T>> : Prisma__CommentsClient<CommentsGetPayload<T> | null, null>

    /**
     * Find the first Comments that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentsFindFirstOrThrowArgs} args - Arguments to find a Comments
     * @example
     * // Get one Comments
     * const comments = await prisma.comments.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CommentsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CommentsFindFirstOrThrowArgs>
    ): Prisma__CommentsClient<CommentsGetPayload<T>>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comments.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comments.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentsWithIdOnly = await prisma.comments.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CommentsFindManyArgs>(
      args?: SelectSubset<T, CommentsFindManyArgs>
    ): PrismaPromise<Array<CommentsGetPayload<T>>>

    /**
     * Create a Comments.
     * @param {CommentsCreateArgs} args - Arguments to create a Comments.
     * @example
     * // Create one Comments
     * const Comments = await prisma.comments.create({
     *   data: {
     *     // ... data to create a Comments
     *   }
     * })
     * 
    **/
    create<T extends CommentsCreateArgs>(
      args: SelectSubset<T, CommentsCreateArgs>
    ): Prisma__CommentsClient<CommentsGetPayload<T>>

    /**
     * Create many Comments.
     *     @param {CommentsCreateManyArgs} args - Arguments to create many Comments.
     *     @example
     *     // Create many Comments
     *     const comments = await prisma.comments.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CommentsCreateManyArgs>(
      args?: SelectSubset<T, CommentsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Comments.
     * @param {CommentsDeleteArgs} args - Arguments to delete one Comments.
     * @example
     * // Delete one Comments
     * const Comments = await prisma.comments.delete({
     *   where: {
     *     // ... filter to delete one Comments
     *   }
     * })
     * 
    **/
    delete<T extends CommentsDeleteArgs>(
      args: SelectSubset<T, CommentsDeleteArgs>
    ): Prisma__CommentsClient<CommentsGetPayload<T>>

    /**
     * Update one Comments.
     * @param {CommentsUpdateArgs} args - Arguments to update one Comments.
     * @example
     * // Update one Comments
     * const comments = await prisma.comments.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CommentsUpdateArgs>(
      args: SelectSubset<T, CommentsUpdateArgs>
    ): Prisma__CommentsClient<CommentsGetPayload<T>>

    /**
     * Delete zero or more Comments.
     * @param {CommentsDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comments.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CommentsDeleteManyArgs>(
      args?: SelectSubset<T, CommentsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comments = await prisma.comments.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CommentsUpdateManyArgs>(
      args: SelectSubset<T, CommentsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Comments.
     * @param {CommentsUpsertArgs} args - Arguments to update or create a Comments.
     * @example
     * // Update or create a Comments
     * const comments = await prisma.comments.upsert({
     *   create: {
     *     // ... data to create a Comments
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comments we want to update
     *   }
     * })
    **/
    upsert<T extends CommentsUpsertArgs>(
      args: SelectSubset<T, CommentsUpsertArgs>
    ): Prisma__CommentsClient<CommentsGetPayload<T>>

    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentsCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comments.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentsCountArgs>(
      args?: Subset<T, CommentsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentsAggregateArgs>(args: Subset<T, CommentsAggregateArgs>): PrismaPromise<GetCommentsAggregateType<T>>

    /**
     * Group by Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentsGroupByArgs['orderBy'] }
        : { orderBy?: CommentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Comments.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CommentsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    issues<T extends IssuesArgs= {}>(args?: Subset<T, IssuesArgs>): Prisma__IssuesClient<IssuesGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Comments base type for findUnique actions
   */
  export type CommentsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Comments
     * 
    **/
    select?: CommentsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentsInclude | null
    /**
     * Filter, which Comments to fetch.
     * 
    **/
    where: CommentsWhereUniqueInput
  }

  /**
   * Comments findUnique
   */
  export interface CommentsFindUniqueArgs extends CommentsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Comments findUniqueOrThrow
   */
  export type CommentsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Comments
     * 
    **/
    select?: CommentsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentsInclude | null
    /**
     * Filter, which Comments to fetch.
     * 
    **/
    where: CommentsWhereUniqueInput
  }


  /**
   * Comments base type for findFirst actions
   */
  export type CommentsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Comments
     * 
    **/
    select?: CommentsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentsInclude | null
    /**
     * Filter, which Comments to fetch.
     * 
    **/
    where?: CommentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     * 
    **/
    orderBy?: Enumerable<CommentsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     * 
    **/
    cursor?: CommentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     * 
    **/
    distinct?: Enumerable<CommentsScalarFieldEnum>
  }

  /**
   * Comments findFirst
   */
  export interface CommentsFindFirstArgs extends CommentsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Comments findFirstOrThrow
   */
  export type CommentsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Comments
     * 
    **/
    select?: CommentsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentsInclude | null
    /**
     * Filter, which Comments to fetch.
     * 
    **/
    where?: CommentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     * 
    **/
    orderBy?: Enumerable<CommentsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     * 
    **/
    cursor?: CommentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     * 
    **/
    distinct?: Enumerable<CommentsScalarFieldEnum>
  }


  /**
   * Comments findMany
   */
  export type CommentsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Comments
     * 
    **/
    select?: CommentsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentsInclude | null
    /**
     * Filter, which Comments to fetch.
     * 
    **/
    where?: CommentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     * 
    **/
    orderBy?: Enumerable<CommentsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     * 
    **/
    cursor?: CommentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CommentsScalarFieldEnum>
  }


  /**
   * Comments create
   */
  export type CommentsCreateArgs = {
    /**
     * Select specific fields to fetch from the Comments
     * 
    **/
    select?: CommentsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentsInclude | null
    /**
     * The data needed to create a Comments.
     * 
    **/
    data: XOR<CommentsCreateInput, CommentsUncheckedCreateInput>
  }


  /**
   * Comments createMany
   */
  export type CommentsCreateManyArgs = {
    /**
     * The data used to create many Comments.
     * 
    **/
    data: Enumerable<CommentsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Comments update
   */
  export type CommentsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Comments
     * 
    **/
    select?: CommentsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentsInclude | null
    /**
     * The data needed to update a Comments.
     * 
    **/
    data: XOR<CommentsUpdateInput, CommentsUncheckedUpdateInput>
    /**
     * Choose, which Comments to update.
     * 
    **/
    where: CommentsWhereUniqueInput
  }


  /**
   * Comments updateMany
   */
  export type CommentsUpdateManyArgs = {
    /**
     * The data used to update Comments.
     * 
    **/
    data: XOR<CommentsUpdateManyMutationInput, CommentsUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     * 
    **/
    where?: CommentsWhereInput
  }


  /**
   * Comments upsert
   */
  export type CommentsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Comments
     * 
    **/
    select?: CommentsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentsInclude | null
    /**
     * The filter to search for the Comments to update in case it exists.
     * 
    **/
    where: CommentsWhereUniqueInput
    /**
     * In case the Comments found by the `where` argument doesn't exist, create a new Comments with this data.
     * 
    **/
    create: XOR<CommentsCreateInput, CommentsUncheckedCreateInput>
    /**
     * In case the Comments was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CommentsUpdateInput, CommentsUncheckedUpdateInput>
  }


  /**
   * Comments delete
   */
  export type CommentsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Comments
     * 
    **/
    select?: CommentsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentsInclude | null
    /**
     * Filter which Comments to delete.
     * 
    **/
    where: CommentsWhereUniqueInput
  }


  /**
   * Comments deleteMany
   */
  export type CommentsDeleteManyArgs = {
    /**
     * Filter which Comments to delete
     * 
    **/
    where?: CommentsWhereInput
  }


  /**
   * Comments without action
   */
  export type CommentsArgs = {
    /**
     * Select specific fields to fetch from the Comments
     * 
    **/
    select?: CommentsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentsInclude | null
  }



  /**
   * Model Emails
   */


  export type AggregateEmails = {
    _count: EmailsCountAggregateOutputType | null
    _min: EmailsMinAggregateOutputType | null
    _max: EmailsMaxAggregateOutputType | null
  }

  export type EmailsMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    email_address: string | null
  }

  export type EmailsMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    email_address: string | null
  }

  export type EmailsCountAggregateOutputType = {
    id: number
    created_at: number
    email_address: number
    _all: number
  }


  export type EmailsMinAggregateInputType = {
    id?: true
    created_at?: true
    email_address?: true
  }

  export type EmailsMaxAggregateInputType = {
    id?: true
    created_at?: true
    email_address?: true
  }

  export type EmailsCountAggregateInputType = {
    id?: true
    created_at?: true
    email_address?: true
    _all?: true
  }

  export type EmailsAggregateArgs = {
    /**
     * Filter which Emails to aggregate.
     * 
    **/
    where?: EmailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     * 
    **/
    orderBy?: Enumerable<EmailsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EmailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Emails
    **/
    _count?: true | EmailsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailsMaxAggregateInputType
  }

  export type GetEmailsAggregateType<T extends EmailsAggregateArgs> = {
        [P in keyof T & keyof AggregateEmails]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmails[P]>
      : GetScalarType<T[P], AggregateEmails[P]>
  }




  export type EmailsGroupByArgs = {
    where?: EmailsWhereInput
    orderBy?: Enumerable<EmailsOrderByWithAggregationInput>
    by: Array<EmailsScalarFieldEnum>
    having?: EmailsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailsCountAggregateInputType | true
    _min?: EmailsMinAggregateInputType
    _max?: EmailsMaxAggregateInputType
  }


  export type EmailsGroupByOutputType = {
    id: string
    created_at: Date
    email_address: string
    _count: EmailsCountAggregateOutputType | null
    _min: EmailsMinAggregateOutputType | null
    _max: EmailsMaxAggregateOutputType | null
  }

  type GetEmailsGroupByPayload<T extends EmailsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<EmailsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailsGroupByOutputType[P]>
            : GetScalarType<T[P], EmailsGroupByOutputType[P]>
        }
      >
    >


  export type EmailsSelect = {
    id?: boolean
    created_at?: boolean
    email_address?: boolean
    orgs?: boolean | Emails$orgsArgs
    _count?: boolean | EmailsCountOutputTypeArgs
  }


  export type EmailsInclude = {
    orgs?: boolean | Emails$orgsArgs
    _count?: boolean | EmailsCountOutputTypeArgs
  } 

  export type EmailsGetPayload<S extends boolean | null | undefined | EmailsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Emails :
    S extends undefined ? never :
    S extends { include: any } & (EmailsArgs | EmailsFindManyArgs)
    ? Emails  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'orgs' ? Array < OrgsGetPayload<S['include'][P]>>  :
        P extends '_count' ? EmailsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (EmailsArgs | EmailsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'orgs' ? Array < OrgsGetPayload<S['select'][P]>>  :
        P extends '_count' ? EmailsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Emails ? Emails[P] : never
  } 
      : Emails


  type EmailsCountArgs = Merge<
    Omit<EmailsFindManyArgs, 'select' | 'include'> & {
      select?: EmailsCountAggregateInputType | true
    }
  >

  export interface EmailsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Emails that matches the filter.
     * @param {EmailsFindUniqueArgs} args - Arguments to find a Emails
     * @example
     * // Get one Emails
     * const emails = await prisma.emails.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EmailsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EmailsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Emails'> extends True ? Prisma__EmailsClient<EmailsGetPayload<T>> : Prisma__EmailsClient<EmailsGetPayload<T> | null, null>

    /**
     * Find one Emails that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {EmailsFindUniqueOrThrowArgs} args - Arguments to find a Emails
     * @example
     * // Get one Emails
     * const emails = await prisma.emails.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EmailsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, EmailsFindUniqueOrThrowArgs>
    ): Prisma__EmailsClient<EmailsGetPayload<T>>

    /**
     * Find the first Emails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailsFindFirstArgs} args - Arguments to find a Emails
     * @example
     * // Get one Emails
     * const emails = await prisma.emails.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EmailsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EmailsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Emails'> extends True ? Prisma__EmailsClient<EmailsGetPayload<T>> : Prisma__EmailsClient<EmailsGetPayload<T> | null, null>

    /**
     * Find the first Emails that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailsFindFirstOrThrowArgs} args - Arguments to find a Emails
     * @example
     * // Get one Emails
     * const emails = await prisma.emails.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EmailsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EmailsFindFirstOrThrowArgs>
    ): Prisma__EmailsClient<EmailsGetPayload<T>>

    /**
     * Find zero or more Emails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Emails
     * const emails = await prisma.emails.findMany()
     * 
     * // Get first 10 Emails
     * const emails = await prisma.emails.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailsWithIdOnly = await prisma.emails.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EmailsFindManyArgs>(
      args?: SelectSubset<T, EmailsFindManyArgs>
    ): PrismaPromise<Array<EmailsGetPayload<T>>>

    /**
     * Create a Emails.
     * @param {EmailsCreateArgs} args - Arguments to create a Emails.
     * @example
     * // Create one Emails
     * const Emails = await prisma.emails.create({
     *   data: {
     *     // ... data to create a Emails
     *   }
     * })
     * 
    **/
    create<T extends EmailsCreateArgs>(
      args: SelectSubset<T, EmailsCreateArgs>
    ): Prisma__EmailsClient<EmailsGetPayload<T>>

    /**
     * Create many Emails.
     *     @param {EmailsCreateManyArgs} args - Arguments to create many Emails.
     *     @example
     *     // Create many Emails
     *     const emails = await prisma.emails.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EmailsCreateManyArgs>(
      args?: SelectSubset<T, EmailsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Emails.
     * @param {EmailsDeleteArgs} args - Arguments to delete one Emails.
     * @example
     * // Delete one Emails
     * const Emails = await prisma.emails.delete({
     *   where: {
     *     // ... filter to delete one Emails
     *   }
     * })
     * 
    **/
    delete<T extends EmailsDeleteArgs>(
      args: SelectSubset<T, EmailsDeleteArgs>
    ): Prisma__EmailsClient<EmailsGetPayload<T>>

    /**
     * Update one Emails.
     * @param {EmailsUpdateArgs} args - Arguments to update one Emails.
     * @example
     * // Update one Emails
     * const emails = await prisma.emails.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EmailsUpdateArgs>(
      args: SelectSubset<T, EmailsUpdateArgs>
    ): Prisma__EmailsClient<EmailsGetPayload<T>>

    /**
     * Delete zero or more Emails.
     * @param {EmailsDeleteManyArgs} args - Arguments to filter Emails to delete.
     * @example
     * // Delete a few Emails
     * const { count } = await prisma.emails.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EmailsDeleteManyArgs>(
      args?: SelectSubset<T, EmailsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Emails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Emails
     * const emails = await prisma.emails.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EmailsUpdateManyArgs>(
      args: SelectSubset<T, EmailsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Emails.
     * @param {EmailsUpsertArgs} args - Arguments to update or create a Emails.
     * @example
     * // Update or create a Emails
     * const emails = await prisma.emails.upsert({
     *   create: {
     *     // ... data to create a Emails
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Emails we want to update
     *   }
     * })
    **/
    upsert<T extends EmailsUpsertArgs>(
      args: SelectSubset<T, EmailsUpsertArgs>
    ): Prisma__EmailsClient<EmailsGetPayload<T>>

    /**
     * Count the number of Emails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailsCountArgs} args - Arguments to filter Emails to count.
     * @example
     * // Count the number of Emails
     * const count = await prisma.emails.count({
     *   where: {
     *     // ... the filter for the Emails we want to count
     *   }
     * })
    **/
    count<T extends EmailsCountArgs>(
      args?: Subset<T, EmailsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Emails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailsAggregateArgs>(args: Subset<T, EmailsAggregateArgs>): PrismaPromise<GetEmailsAggregateType<T>>

    /**
     * Group by Emails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailsGroupByArgs['orderBy'] }
        : { orderBy?: EmailsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Emails.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EmailsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    orgs<T extends Emails$orgsArgs= {}>(args?: Subset<T, Emails$orgsArgs>): PrismaPromise<Array<OrgsGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Emails base type for findUnique actions
   */
  export type EmailsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Emails
     * 
    **/
    select?: EmailsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmailsInclude | null
    /**
     * Filter, which Emails to fetch.
     * 
    **/
    where: EmailsWhereUniqueInput
  }

  /**
   * Emails findUnique
   */
  export interface EmailsFindUniqueArgs extends EmailsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Emails findUniqueOrThrow
   */
  export type EmailsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Emails
     * 
    **/
    select?: EmailsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmailsInclude | null
    /**
     * Filter, which Emails to fetch.
     * 
    **/
    where: EmailsWhereUniqueInput
  }


  /**
   * Emails base type for findFirst actions
   */
  export type EmailsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Emails
     * 
    **/
    select?: EmailsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmailsInclude | null
    /**
     * Filter, which Emails to fetch.
     * 
    **/
    where?: EmailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     * 
    **/
    orderBy?: Enumerable<EmailsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emails.
     * 
    **/
    cursor?: EmailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emails.
     * 
    **/
    distinct?: Enumerable<EmailsScalarFieldEnum>
  }

  /**
   * Emails findFirst
   */
  export interface EmailsFindFirstArgs extends EmailsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Emails findFirstOrThrow
   */
  export type EmailsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Emails
     * 
    **/
    select?: EmailsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmailsInclude | null
    /**
     * Filter, which Emails to fetch.
     * 
    **/
    where?: EmailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     * 
    **/
    orderBy?: Enumerable<EmailsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emails.
     * 
    **/
    cursor?: EmailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emails.
     * 
    **/
    distinct?: Enumerable<EmailsScalarFieldEnum>
  }


  /**
   * Emails findMany
   */
  export type EmailsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Emails
     * 
    **/
    select?: EmailsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmailsInclude | null
    /**
     * Filter, which Emails to fetch.
     * 
    **/
    where?: EmailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     * 
    **/
    orderBy?: Enumerable<EmailsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Emails.
     * 
    **/
    cursor?: EmailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EmailsScalarFieldEnum>
  }


  /**
   * Emails create
   */
  export type EmailsCreateArgs = {
    /**
     * Select specific fields to fetch from the Emails
     * 
    **/
    select?: EmailsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmailsInclude | null
    /**
     * The data needed to create a Emails.
     * 
    **/
    data: XOR<EmailsCreateInput, EmailsUncheckedCreateInput>
  }


  /**
   * Emails createMany
   */
  export type EmailsCreateManyArgs = {
    /**
     * The data used to create many Emails.
     * 
    **/
    data: Enumerable<EmailsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Emails update
   */
  export type EmailsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Emails
     * 
    **/
    select?: EmailsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmailsInclude | null
    /**
     * The data needed to update a Emails.
     * 
    **/
    data: XOR<EmailsUpdateInput, EmailsUncheckedUpdateInput>
    /**
     * Choose, which Emails to update.
     * 
    **/
    where: EmailsWhereUniqueInput
  }


  /**
   * Emails updateMany
   */
  export type EmailsUpdateManyArgs = {
    /**
     * The data used to update Emails.
     * 
    **/
    data: XOR<EmailsUpdateManyMutationInput, EmailsUncheckedUpdateManyInput>
    /**
     * Filter which Emails to update
     * 
    **/
    where?: EmailsWhereInput
  }


  /**
   * Emails upsert
   */
  export type EmailsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Emails
     * 
    **/
    select?: EmailsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmailsInclude | null
    /**
     * The filter to search for the Emails to update in case it exists.
     * 
    **/
    where: EmailsWhereUniqueInput
    /**
     * In case the Emails found by the `where` argument doesn't exist, create a new Emails with this data.
     * 
    **/
    create: XOR<EmailsCreateInput, EmailsUncheckedCreateInput>
    /**
     * In case the Emails was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EmailsUpdateInput, EmailsUncheckedUpdateInput>
  }


  /**
   * Emails delete
   */
  export type EmailsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Emails
     * 
    **/
    select?: EmailsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmailsInclude | null
    /**
     * Filter which Emails to delete.
     * 
    **/
    where: EmailsWhereUniqueInput
  }


  /**
   * Emails deleteMany
   */
  export type EmailsDeleteManyArgs = {
    /**
     * Filter which Emails to delete
     * 
    **/
    where?: EmailsWhereInput
  }


  /**
   * Emails.orgs
   */
  export type Emails$orgsArgs = {
    /**
     * Select specific fields to fetch from the Orgs
     * 
    **/
    select?: OrgsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OrgsInclude | null
    where?: OrgsWhereInput
    orderBy?: Enumerable<OrgsOrderByWithRelationInput>
    cursor?: OrgsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<OrgsScalarFieldEnum>
  }


  /**
   * Emails without action
   */
  export type EmailsArgs = {
    /**
     * Select specific fields to fetch from the Emails
     * 
    **/
    select?: EmailsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmailsInclude | null
  }



  /**
   * Model Issues
   */


  export type AggregateIssues = {
    _count: IssuesCountAggregateOutputType | null
    _min: IssuesMinAggregateOutputType | null
    _max: IssuesMaxAggregateOutputType | null
  }

  export type IssuesMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    created_at: Date | null
    kanbanorder: string | null
    username: string | null
    external_urls: string | null
    completed_at: Date | null
    status: string | null
    priority: string | null
    updated_at: Date | null
    project_id: string | null
  }

  export type IssuesMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    created_at: Date | null
    kanbanorder: string | null
    username: string | null
    external_urls: string | null
    completed_at: Date | null
    status: string | null
    priority: string | null
    updated_at: Date | null
    project_id: string | null
  }

  export type IssuesCountAggregateOutputType = {
    id: number
    title: number
    description: number
    created_at: number
    kanbanorder: number
    username: number
    external_urls: number
    completed_at: number
    status: number
    priority: number
    updated_at: number
    project_id: number
    _all: number
  }


  export type IssuesMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    created_at?: true
    kanbanorder?: true
    username?: true
    external_urls?: true
    completed_at?: true
    status?: true
    priority?: true
    updated_at?: true
    project_id?: true
  }

  export type IssuesMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    created_at?: true
    kanbanorder?: true
    username?: true
    external_urls?: true
    completed_at?: true
    status?: true
    priority?: true
    updated_at?: true
    project_id?: true
  }

  export type IssuesCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    created_at?: true
    kanbanorder?: true
    username?: true
    external_urls?: true
    completed_at?: true
    status?: true
    priority?: true
    updated_at?: true
    project_id?: true
    _all?: true
  }

  export type IssuesAggregateArgs = {
    /**
     * Filter which Issues to aggregate.
     * 
    **/
    where?: IssuesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Issues to fetch.
     * 
    **/
    orderBy?: Enumerable<IssuesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: IssuesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Issues from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Issues.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Issues
    **/
    _count?: true | IssuesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IssuesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IssuesMaxAggregateInputType
  }

  export type GetIssuesAggregateType<T extends IssuesAggregateArgs> = {
        [P in keyof T & keyof AggregateIssues]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIssues[P]>
      : GetScalarType<T[P], AggregateIssues[P]>
  }




  export type IssuesGroupByArgs = {
    where?: IssuesWhereInput
    orderBy?: Enumerable<IssuesOrderByWithAggregationInput>
    by: Array<IssuesScalarFieldEnum>
    having?: IssuesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IssuesCountAggregateInputType | true
    _min?: IssuesMinAggregateInputType
    _max?: IssuesMaxAggregateInputType
  }


  export type IssuesGroupByOutputType = {
    id: string
    title: string
    description: string
    created_at: Date
    kanbanorder: string
    username: string
    external_urls: string | null
    completed_at: Date | null
    status: string
    priority: string
    updated_at: Date | null
    project_id: string | null
    _count: IssuesCountAggregateOutputType | null
    _min: IssuesMinAggregateOutputType | null
    _max: IssuesMaxAggregateOutputType | null
  }

  type GetIssuesGroupByPayload<T extends IssuesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<IssuesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IssuesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IssuesGroupByOutputType[P]>
            : GetScalarType<T[P], IssuesGroupByOutputType[P]>
        }
      >
    >


  export type IssuesSelect = {
    id?: boolean
    title?: boolean
    description?: boolean
    created_at?: boolean
    kanbanorder?: boolean
    username?: boolean
    external_urls?: boolean
    completed_at?: boolean
    status?: boolean
    priority?: boolean
    updated_at?: boolean
    project_id?: boolean
    comments?: boolean | Issues$commentsArgs
    projects?: boolean | ProjectsArgs
    _count?: boolean | IssuesCountOutputTypeArgs
  }


  export type IssuesInclude = {
    comments?: boolean | Issues$commentsArgs
    projects?: boolean | ProjectsArgs
    _count?: boolean | IssuesCountOutputTypeArgs
  } 

  export type IssuesGetPayload<S extends boolean | null | undefined | IssuesArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Issues :
    S extends undefined ? never :
    S extends { include: any } & (IssuesArgs | IssuesFindManyArgs)
    ? Issues  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'comments' ? Array < CommentsGetPayload<S['include'][P]>>  :
        P extends 'projects' ? ProjectsGetPayload<S['include'][P]> | null :
        P extends '_count' ? IssuesCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (IssuesArgs | IssuesFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'comments' ? Array < CommentsGetPayload<S['select'][P]>>  :
        P extends 'projects' ? ProjectsGetPayload<S['select'][P]> | null :
        P extends '_count' ? IssuesCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Issues ? Issues[P] : never
  } 
      : Issues


  type IssuesCountArgs = Merge<
    Omit<IssuesFindManyArgs, 'select' | 'include'> & {
      select?: IssuesCountAggregateInputType | true
    }
  >

  export interface IssuesDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Issues that matches the filter.
     * @param {IssuesFindUniqueArgs} args - Arguments to find a Issues
     * @example
     * // Get one Issues
     * const issues = await prisma.issues.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends IssuesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, IssuesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Issues'> extends True ? Prisma__IssuesClient<IssuesGetPayload<T>> : Prisma__IssuesClient<IssuesGetPayload<T> | null, null>

    /**
     * Find one Issues that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {IssuesFindUniqueOrThrowArgs} args - Arguments to find a Issues
     * @example
     * // Get one Issues
     * const issues = await prisma.issues.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends IssuesFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, IssuesFindUniqueOrThrowArgs>
    ): Prisma__IssuesClient<IssuesGetPayload<T>>

    /**
     * Find the first Issues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuesFindFirstArgs} args - Arguments to find a Issues
     * @example
     * // Get one Issues
     * const issues = await prisma.issues.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends IssuesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, IssuesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Issues'> extends True ? Prisma__IssuesClient<IssuesGetPayload<T>> : Prisma__IssuesClient<IssuesGetPayload<T> | null, null>

    /**
     * Find the first Issues that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuesFindFirstOrThrowArgs} args - Arguments to find a Issues
     * @example
     * // Get one Issues
     * const issues = await prisma.issues.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends IssuesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, IssuesFindFirstOrThrowArgs>
    ): Prisma__IssuesClient<IssuesGetPayload<T>>

    /**
     * Find zero or more Issues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Issues
     * const issues = await prisma.issues.findMany()
     * 
     * // Get first 10 Issues
     * const issues = await prisma.issues.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const issuesWithIdOnly = await prisma.issues.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends IssuesFindManyArgs>(
      args?: SelectSubset<T, IssuesFindManyArgs>
    ): PrismaPromise<Array<IssuesGetPayload<T>>>

    /**
     * Create a Issues.
     * @param {IssuesCreateArgs} args - Arguments to create a Issues.
     * @example
     * // Create one Issues
     * const Issues = await prisma.issues.create({
     *   data: {
     *     // ... data to create a Issues
     *   }
     * })
     * 
    **/
    create<T extends IssuesCreateArgs>(
      args: SelectSubset<T, IssuesCreateArgs>
    ): Prisma__IssuesClient<IssuesGetPayload<T>>

    /**
     * Create many Issues.
     *     @param {IssuesCreateManyArgs} args - Arguments to create many Issues.
     *     @example
     *     // Create many Issues
     *     const issues = await prisma.issues.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends IssuesCreateManyArgs>(
      args?: SelectSubset<T, IssuesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Issues.
     * @param {IssuesDeleteArgs} args - Arguments to delete one Issues.
     * @example
     * // Delete one Issues
     * const Issues = await prisma.issues.delete({
     *   where: {
     *     // ... filter to delete one Issues
     *   }
     * })
     * 
    **/
    delete<T extends IssuesDeleteArgs>(
      args: SelectSubset<T, IssuesDeleteArgs>
    ): Prisma__IssuesClient<IssuesGetPayload<T>>

    /**
     * Update one Issues.
     * @param {IssuesUpdateArgs} args - Arguments to update one Issues.
     * @example
     * // Update one Issues
     * const issues = await prisma.issues.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends IssuesUpdateArgs>(
      args: SelectSubset<T, IssuesUpdateArgs>
    ): Prisma__IssuesClient<IssuesGetPayload<T>>

    /**
     * Delete zero or more Issues.
     * @param {IssuesDeleteManyArgs} args - Arguments to filter Issues to delete.
     * @example
     * // Delete a few Issues
     * const { count } = await prisma.issues.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends IssuesDeleteManyArgs>(
      args?: SelectSubset<T, IssuesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Issues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Issues
     * const issues = await prisma.issues.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends IssuesUpdateManyArgs>(
      args: SelectSubset<T, IssuesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Issues.
     * @param {IssuesUpsertArgs} args - Arguments to update or create a Issues.
     * @example
     * // Update or create a Issues
     * const issues = await prisma.issues.upsert({
     *   create: {
     *     // ... data to create a Issues
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Issues we want to update
     *   }
     * })
    **/
    upsert<T extends IssuesUpsertArgs>(
      args: SelectSubset<T, IssuesUpsertArgs>
    ): Prisma__IssuesClient<IssuesGetPayload<T>>

    /**
     * Count the number of Issues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuesCountArgs} args - Arguments to filter Issues to count.
     * @example
     * // Count the number of Issues
     * const count = await prisma.issues.count({
     *   where: {
     *     // ... the filter for the Issues we want to count
     *   }
     * })
    **/
    count<T extends IssuesCountArgs>(
      args?: Subset<T, IssuesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IssuesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Issues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IssuesAggregateArgs>(args: Subset<T, IssuesAggregateArgs>): PrismaPromise<GetIssuesAggregateType<T>>

    /**
     * Group by Issues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssuesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IssuesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IssuesGroupByArgs['orderBy'] }
        : { orderBy?: IssuesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IssuesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIssuesGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Issues.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__IssuesClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    comments<T extends Issues$commentsArgs= {}>(args?: Subset<T, Issues$commentsArgs>): PrismaPromise<Array<CommentsGetPayload<T>>| Null>;

    projects<T extends ProjectsArgs= {}>(args?: Subset<T, ProjectsArgs>): Prisma__ProjectsClient<ProjectsGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Issues base type for findUnique actions
   */
  export type IssuesFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Issues
     * 
    **/
    select?: IssuesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IssuesInclude | null
    /**
     * Filter, which Issues to fetch.
     * 
    **/
    where: IssuesWhereUniqueInput
  }

  /**
   * Issues findUnique
   */
  export interface IssuesFindUniqueArgs extends IssuesFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Issues findUniqueOrThrow
   */
  export type IssuesFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Issues
     * 
    **/
    select?: IssuesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IssuesInclude | null
    /**
     * Filter, which Issues to fetch.
     * 
    **/
    where: IssuesWhereUniqueInput
  }


  /**
   * Issues base type for findFirst actions
   */
  export type IssuesFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Issues
     * 
    **/
    select?: IssuesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IssuesInclude | null
    /**
     * Filter, which Issues to fetch.
     * 
    **/
    where?: IssuesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Issues to fetch.
     * 
    **/
    orderBy?: Enumerable<IssuesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Issues.
     * 
    **/
    cursor?: IssuesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Issues from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Issues.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Issues.
     * 
    **/
    distinct?: Enumerable<IssuesScalarFieldEnum>
  }

  /**
   * Issues findFirst
   */
  export interface IssuesFindFirstArgs extends IssuesFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Issues findFirstOrThrow
   */
  export type IssuesFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Issues
     * 
    **/
    select?: IssuesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IssuesInclude | null
    /**
     * Filter, which Issues to fetch.
     * 
    **/
    where?: IssuesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Issues to fetch.
     * 
    **/
    orderBy?: Enumerable<IssuesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Issues.
     * 
    **/
    cursor?: IssuesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Issues from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Issues.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Issues.
     * 
    **/
    distinct?: Enumerable<IssuesScalarFieldEnum>
  }


  /**
   * Issues findMany
   */
  export type IssuesFindManyArgs = {
    /**
     * Select specific fields to fetch from the Issues
     * 
    **/
    select?: IssuesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IssuesInclude | null
    /**
     * Filter, which Issues to fetch.
     * 
    **/
    where?: IssuesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Issues to fetch.
     * 
    **/
    orderBy?: Enumerable<IssuesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Issues.
     * 
    **/
    cursor?: IssuesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Issues from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Issues.
     * 
    **/
    skip?: number
    distinct?: Enumerable<IssuesScalarFieldEnum>
  }


  /**
   * Issues create
   */
  export type IssuesCreateArgs = {
    /**
     * Select specific fields to fetch from the Issues
     * 
    **/
    select?: IssuesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IssuesInclude | null
    /**
     * The data needed to create a Issues.
     * 
    **/
    data: XOR<IssuesCreateInput, IssuesUncheckedCreateInput>
  }


  /**
   * Issues createMany
   */
  export type IssuesCreateManyArgs = {
    /**
     * The data used to create many Issues.
     * 
    **/
    data: Enumerable<IssuesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Issues update
   */
  export type IssuesUpdateArgs = {
    /**
     * Select specific fields to fetch from the Issues
     * 
    **/
    select?: IssuesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IssuesInclude | null
    /**
     * The data needed to update a Issues.
     * 
    **/
    data: XOR<IssuesUpdateInput, IssuesUncheckedUpdateInput>
    /**
     * Choose, which Issues to update.
     * 
    **/
    where: IssuesWhereUniqueInput
  }


  /**
   * Issues updateMany
   */
  export type IssuesUpdateManyArgs = {
    /**
     * The data used to update Issues.
     * 
    **/
    data: XOR<IssuesUpdateManyMutationInput, IssuesUncheckedUpdateManyInput>
    /**
     * Filter which Issues to update
     * 
    **/
    where?: IssuesWhereInput
  }


  /**
   * Issues upsert
   */
  export type IssuesUpsertArgs = {
    /**
     * Select specific fields to fetch from the Issues
     * 
    **/
    select?: IssuesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IssuesInclude | null
    /**
     * The filter to search for the Issues to update in case it exists.
     * 
    **/
    where: IssuesWhereUniqueInput
    /**
     * In case the Issues found by the `where` argument doesn't exist, create a new Issues with this data.
     * 
    **/
    create: XOR<IssuesCreateInput, IssuesUncheckedCreateInput>
    /**
     * In case the Issues was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<IssuesUpdateInput, IssuesUncheckedUpdateInput>
  }


  /**
   * Issues delete
   */
  export type IssuesDeleteArgs = {
    /**
     * Select specific fields to fetch from the Issues
     * 
    **/
    select?: IssuesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IssuesInclude | null
    /**
     * Filter which Issues to delete.
     * 
    **/
    where: IssuesWhereUniqueInput
  }


  /**
   * Issues deleteMany
   */
  export type IssuesDeleteManyArgs = {
    /**
     * Filter which Issues to delete
     * 
    **/
    where?: IssuesWhereInput
  }


  /**
   * Issues.comments
   */
  export type Issues$commentsArgs = {
    /**
     * Select specific fields to fetch from the Comments
     * 
    **/
    select?: CommentsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentsInclude | null
    where?: CommentsWhereInput
    orderBy?: Enumerable<CommentsOrderByWithRelationInput>
    cursor?: CommentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<CommentsScalarFieldEnum>
  }


  /**
   * Issues without action
   */
  export type IssuesArgs = {
    /**
     * Select specific fields to fetch from the Issues
     * 
    **/
    select?: IssuesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IssuesInclude | null
  }



  /**
   * Model Orgs
   */


  export type AggregateOrgs = {
    _count: OrgsCountAggregateOutputType | null
    _min: OrgsMinAggregateOutputType | null
    _max: OrgsMaxAggregateOutputType | null
  }

  export type OrgsMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    name: string | null
    shortname: string | null
    aliases: string | null
    first_contact: Date | null
    updated_at: Date | null
    website: string | null
    primary_email_address_id: string | null
    primary_slack_channel_id: string | null
    summary: string | null
    note: string | null
    missive_conversation_id: string | null
    missive_label_id: string | null
    github_id: string | null
    linear_id: string | null
    pivotal_tracker_id: string | null
  }

  export type OrgsMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    name: string | null
    shortname: string | null
    aliases: string | null
    first_contact: Date | null
    updated_at: Date | null
    website: string | null
    primary_email_address_id: string | null
    primary_slack_channel_id: string | null
    summary: string | null
    note: string | null
    missive_conversation_id: string | null
    missive_label_id: string | null
    github_id: string | null
    linear_id: string | null
    pivotal_tracker_id: string | null
  }

  export type OrgsCountAggregateOutputType = {
    id: number
    created_at: number
    name: number
    shortname: number
    aliases: number
    first_contact: number
    updated_at: number
    website: number
    primary_email_address_id: number
    primary_slack_channel_id: number
    summary: number
    note: number
    missive_conversation_id: number
    missive_label_id: number
    history: number
    github_id: number
    linear_id: number
    pivotal_tracker_id: number
    _all: number
  }


  export type OrgsMinAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    shortname?: true
    aliases?: true
    first_contact?: true
    updated_at?: true
    website?: true
    primary_email_address_id?: true
    primary_slack_channel_id?: true
    summary?: true
    note?: true
    missive_conversation_id?: true
    missive_label_id?: true
    github_id?: true
    linear_id?: true
    pivotal_tracker_id?: true
  }

  export type OrgsMaxAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    shortname?: true
    aliases?: true
    first_contact?: true
    updated_at?: true
    website?: true
    primary_email_address_id?: true
    primary_slack_channel_id?: true
    summary?: true
    note?: true
    missive_conversation_id?: true
    missive_label_id?: true
    github_id?: true
    linear_id?: true
    pivotal_tracker_id?: true
  }

  export type OrgsCountAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    shortname?: true
    aliases?: true
    first_contact?: true
    updated_at?: true
    website?: true
    primary_email_address_id?: true
    primary_slack_channel_id?: true
    summary?: true
    note?: true
    missive_conversation_id?: true
    missive_label_id?: true
    history?: true
    github_id?: true
    linear_id?: true
    pivotal_tracker_id?: true
    _all?: true
  }

  export type OrgsAggregateArgs = {
    /**
     * Filter which Orgs to aggregate.
     * 
    **/
    where?: OrgsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orgs to fetch.
     * 
    **/
    orderBy?: Enumerable<OrgsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: OrgsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orgs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orgs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orgs
    **/
    _count?: true | OrgsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrgsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrgsMaxAggregateInputType
  }

  export type GetOrgsAggregateType<T extends OrgsAggregateArgs> = {
        [P in keyof T & keyof AggregateOrgs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrgs[P]>
      : GetScalarType<T[P], AggregateOrgs[P]>
  }




  export type OrgsGroupByArgs = {
    where?: OrgsWhereInput
    orderBy?: Enumerable<OrgsOrderByWithAggregationInput>
    by: Array<OrgsScalarFieldEnum>
    having?: OrgsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrgsCountAggregateInputType | true
    _min?: OrgsMinAggregateInputType
    _max?: OrgsMaxAggregateInputType
  }


  export type OrgsGroupByOutputType = {
    id: string
    created_at: Date
    name: string
    shortname: string
    aliases: string | null
    first_contact: Date
    updated_at: Date | null
    website: string | null
    primary_email_address_id: string | null
    primary_slack_channel_id: string | null
    summary: string | null
    note: string | null
    missive_conversation_id: string
    missive_label_id: string
    history: JsonValue | null
    github_id: string | null
    linear_id: string | null
    pivotal_tracker_id: string | null
    _count: OrgsCountAggregateOutputType | null
    _min: OrgsMinAggregateOutputType | null
    _max: OrgsMaxAggregateOutputType | null
  }

  type GetOrgsGroupByPayload<T extends OrgsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<OrgsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrgsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrgsGroupByOutputType[P]>
            : GetScalarType<T[P], OrgsGroupByOutputType[P]>
        }
      >
    >


  export type OrgsSelect = {
    id?: boolean
    created_at?: boolean
    name?: boolean
    shortname?: boolean
    aliases?: boolean
    first_contact?: boolean
    updated_at?: boolean
    website?: boolean
    primary_email_address_id?: boolean
    primary_slack_channel_id?: boolean
    summary?: boolean
    note?: boolean
    missive_conversation_id?: boolean
    missive_label_id?: boolean
    history?: boolean
    github_id?: boolean
    linear_id?: boolean
    pivotal_tracker_id?: boolean
    emails?: boolean | EmailsArgs
    slack_channels?: boolean | Slack_channelsArgs
    projects?: boolean | Orgs$projectsArgs
    _count?: boolean | OrgsCountOutputTypeArgs
  }


  export type OrgsInclude = {
    emails?: boolean | EmailsArgs
    slack_channels?: boolean | Slack_channelsArgs
    projects?: boolean | Orgs$projectsArgs
    _count?: boolean | OrgsCountOutputTypeArgs
  } 

  export type OrgsGetPayload<S extends boolean | null | undefined | OrgsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Orgs :
    S extends undefined ? never :
    S extends { include: any } & (OrgsArgs | OrgsFindManyArgs)
    ? Orgs  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'emails' ? EmailsGetPayload<S['include'][P]> | null :
        P extends 'slack_channels' ? Slack_channelsGetPayload<S['include'][P]> | null :
        P extends 'projects' ? Array < ProjectsGetPayload<S['include'][P]>>  :
        P extends '_count' ? OrgsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (OrgsArgs | OrgsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'emails' ? EmailsGetPayload<S['select'][P]> | null :
        P extends 'slack_channels' ? Slack_channelsGetPayload<S['select'][P]> | null :
        P extends 'projects' ? Array < ProjectsGetPayload<S['select'][P]>>  :
        P extends '_count' ? OrgsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Orgs ? Orgs[P] : never
  } 
      : Orgs


  type OrgsCountArgs = Merge<
    Omit<OrgsFindManyArgs, 'select' | 'include'> & {
      select?: OrgsCountAggregateInputType | true
    }
  >

  export interface OrgsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Orgs that matches the filter.
     * @param {OrgsFindUniqueArgs} args - Arguments to find a Orgs
     * @example
     * // Get one Orgs
     * const orgs = await prisma.orgs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OrgsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, OrgsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Orgs'> extends True ? Prisma__OrgsClient<OrgsGetPayload<T>> : Prisma__OrgsClient<OrgsGetPayload<T> | null, null>

    /**
     * Find one Orgs that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {OrgsFindUniqueOrThrowArgs} args - Arguments to find a Orgs
     * @example
     * // Get one Orgs
     * const orgs = await prisma.orgs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends OrgsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, OrgsFindUniqueOrThrowArgs>
    ): Prisma__OrgsClient<OrgsGetPayload<T>>

    /**
     * Find the first Orgs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgsFindFirstArgs} args - Arguments to find a Orgs
     * @example
     * // Get one Orgs
     * const orgs = await prisma.orgs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OrgsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, OrgsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Orgs'> extends True ? Prisma__OrgsClient<OrgsGetPayload<T>> : Prisma__OrgsClient<OrgsGetPayload<T> | null, null>

    /**
     * Find the first Orgs that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgsFindFirstOrThrowArgs} args - Arguments to find a Orgs
     * @example
     * // Get one Orgs
     * const orgs = await prisma.orgs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends OrgsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OrgsFindFirstOrThrowArgs>
    ): Prisma__OrgsClient<OrgsGetPayload<T>>

    /**
     * Find zero or more Orgs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orgs
     * const orgs = await prisma.orgs.findMany()
     * 
     * // Get first 10 Orgs
     * const orgs = await prisma.orgs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orgsWithIdOnly = await prisma.orgs.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends OrgsFindManyArgs>(
      args?: SelectSubset<T, OrgsFindManyArgs>
    ): PrismaPromise<Array<OrgsGetPayload<T>>>

    /**
     * Create a Orgs.
     * @param {OrgsCreateArgs} args - Arguments to create a Orgs.
     * @example
     * // Create one Orgs
     * const Orgs = await prisma.orgs.create({
     *   data: {
     *     // ... data to create a Orgs
     *   }
     * })
     * 
    **/
    create<T extends OrgsCreateArgs>(
      args: SelectSubset<T, OrgsCreateArgs>
    ): Prisma__OrgsClient<OrgsGetPayload<T>>

    /**
     * Create many Orgs.
     *     @param {OrgsCreateManyArgs} args - Arguments to create many Orgs.
     *     @example
     *     // Create many Orgs
     *     const orgs = await prisma.orgs.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends OrgsCreateManyArgs>(
      args?: SelectSubset<T, OrgsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Orgs.
     * @param {OrgsDeleteArgs} args - Arguments to delete one Orgs.
     * @example
     * // Delete one Orgs
     * const Orgs = await prisma.orgs.delete({
     *   where: {
     *     // ... filter to delete one Orgs
     *   }
     * })
     * 
    **/
    delete<T extends OrgsDeleteArgs>(
      args: SelectSubset<T, OrgsDeleteArgs>
    ): Prisma__OrgsClient<OrgsGetPayload<T>>

    /**
     * Update one Orgs.
     * @param {OrgsUpdateArgs} args - Arguments to update one Orgs.
     * @example
     * // Update one Orgs
     * const orgs = await prisma.orgs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OrgsUpdateArgs>(
      args: SelectSubset<T, OrgsUpdateArgs>
    ): Prisma__OrgsClient<OrgsGetPayload<T>>

    /**
     * Delete zero or more Orgs.
     * @param {OrgsDeleteManyArgs} args - Arguments to filter Orgs to delete.
     * @example
     * // Delete a few Orgs
     * const { count } = await prisma.orgs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OrgsDeleteManyArgs>(
      args?: SelectSubset<T, OrgsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orgs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orgs
     * const orgs = await prisma.orgs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OrgsUpdateManyArgs>(
      args: SelectSubset<T, OrgsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Orgs.
     * @param {OrgsUpsertArgs} args - Arguments to update or create a Orgs.
     * @example
     * // Update or create a Orgs
     * const orgs = await prisma.orgs.upsert({
     *   create: {
     *     // ... data to create a Orgs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Orgs we want to update
     *   }
     * })
    **/
    upsert<T extends OrgsUpsertArgs>(
      args: SelectSubset<T, OrgsUpsertArgs>
    ): Prisma__OrgsClient<OrgsGetPayload<T>>

    /**
     * Count the number of Orgs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgsCountArgs} args - Arguments to filter Orgs to count.
     * @example
     * // Count the number of Orgs
     * const count = await prisma.orgs.count({
     *   where: {
     *     // ... the filter for the Orgs we want to count
     *   }
     * })
    **/
    count<T extends OrgsCountArgs>(
      args?: Subset<T, OrgsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrgsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Orgs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrgsAggregateArgs>(args: Subset<T, OrgsAggregateArgs>): PrismaPromise<GetOrgsAggregateType<T>>

    /**
     * Group by Orgs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrgsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrgsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrgsGroupByArgs['orderBy'] }
        : { orderBy?: OrgsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrgsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrgsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Orgs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__OrgsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    emails<T extends EmailsArgs= {}>(args?: Subset<T, EmailsArgs>): Prisma__EmailsClient<EmailsGetPayload<T> | Null>;

    slack_channels<T extends Slack_channelsArgs= {}>(args?: Subset<T, Slack_channelsArgs>): Prisma__Slack_channelsClient<Slack_channelsGetPayload<T> | Null>;

    projects<T extends Orgs$projectsArgs= {}>(args?: Subset<T, Orgs$projectsArgs>): PrismaPromise<Array<ProjectsGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Orgs base type for findUnique actions
   */
  export type OrgsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Orgs
     * 
    **/
    select?: OrgsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OrgsInclude | null
    /**
     * Filter, which Orgs to fetch.
     * 
    **/
    where: OrgsWhereUniqueInput
  }

  /**
   * Orgs findUnique
   */
  export interface OrgsFindUniqueArgs extends OrgsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Orgs findUniqueOrThrow
   */
  export type OrgsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Orgs
     * 
    **/
    select?: OrgsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OrgsInclude | null
    /**
     * Filter, which Orgs to fetch.
     * 
    **/
    where: OrgsWhereUniqueInput
  }


  /**
   * Orgs base type for findFirst actions
   */
  export type OrgsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Orgs
     * 
    **/
    select?: OrgsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OrgsInclude | null
    /**
     * Filter, which Orgs to fetch.
     * 
    **/
    where?: OrgsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orgs to fetch.
     * 
    **/
    orderBy?: Enumerable<OrgsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orgs.
     * 
    **/
    cursor?: OrgsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orgs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orgs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orgs.
     * 
    **/
    distinct?: Enumerable<OrgsScalarFieldEnum>
  }

  /**
   * Orgs findFirst
   */
  export interface OrgsFindFirstArgs extends OrgsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Orgs findFirstOrThrow
   */
  export type OrgsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Orgs
     * 
    **/
    select?: OrgsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OrgsInclude | null
    /**
     * Filter, which Orgs to fetch.
     * 
    **/
    where?: OrgsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orgs to fetch.
     * 
    **/
    orderBy?: Enumerable<OrgsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orgs.
     * 
    **/
    cursor?: OrgsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orgs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orgs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orgs.
     * 
    **/
    distinct?: Enumerable<OrgsScalarFieldEnum>
  }


  /**
   * Orgs findMany
   */
  export type OrgsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Orgs
     * 
    **/
    select?: OrgsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OrgsInclude | null
    /**
     * Filter, which Orgs to fetch.
     * 
    **/
    where?: OrgsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orgs to fetch.
     * 
    **/
    orderBy?: Enumerable<OrgsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orgs.
     * 
    **/
    cursor?: OrgsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orgs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orgs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<OrgsScalarFieldEnum>
  }


  /**
   * Orgs create
   */
  export type OrgsCreateArgs = {
    /**
     * Select specific fields to fetch from the Orgs
     * 
    **/
    select?: OrgsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OrgsInclude | null
    /**
     * The data needed to create a Orgs.
     * 
    **/
    data: XOR<OrgsCreateInput, OrgsUncheckedCreateInput>
  }


  /**
   * Orgs createMany
   */
  export type OrgsCreateManyArgs = {
    /**
     * The data used to create many Orgs.
     * 
    **/
    data: Enumerable<OrgsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Orgs update
   */
  export type OrgsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Orgs
     * 
    **/
    select?: OrgsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OrgsInclude | null
    /**
     * The data needed to update a Orgs.
     * 
    **/
    data: XOR<OrgsUpdateInput, OrgsUncheckedUpdateInput>
    /**
     * Choose, which Orgs to update.
     * 
    **/
    where: OrgsWhereUniqueInput
  }


  /**
   * Orgs updateMany
   */
  export type OrgsUpdateManyArgs = {
    /**
     * The data used to update Orgs.
     * 
    **/
    data: XOR<OrgsUpdateManyMutationInput, OrgsUncheckedUpdateManyInput>
    /**
     * Filter which Orgs to update
     * 
    **/
    where?: OrgsWhereInput
  }


  /**
   * Orgs upsert
   */
  export type OrgsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Orgs
     * 
    **/
    select?: OrgsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OrgsInclude | null
    /**
     * The filter to search for the Orgs to update in case it exists.
     * 
    **/
    where: OrgsWhereUniqueInput
    /**
     * In case the Orgs found by the `where` argument doesn't exist, create a new Orgs with this data.
     * 
    **/
    create: XOR<OrgsCreateInput, OrgsUncheckedCreateInput>
    /**
     * In case the Orgs was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<OrgsUpdateInput, OrgsUncheckedUpdateInput>
  }


  /**
   * Orgs delete
   */
  export type OrgsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Orgs
     * 
    **/
    select?: OrgsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OrgsInclude | null
    /**
     * Filter which Orgs to delete.
     * 
    **/
    where: OrgsWhereUniqueInput
  }


  /**
   * Orgs deleteMany
   */
  export type OrgsDeleteManyArgs = {
    /**
     * Filter which Orgs to delete
     * 
    **/
    where?: OrgsWhereInput
  }


  /**
   * Orgs.projects
   */
  export type Orgs$projectsArgs = {
    /**
     * Select specific fields to fetch from the Projects
     * 
    **/
    select?: ProjectsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectsInclude | null
    where?: ProjectsWhereInput
    orderBy?: Enumerable<ProjectsOrderByWithRelationInput>
    cursor?: ProjectsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ProjectsScalarFieldEnum>
  }


  /**
   * Orgs without action
   */
  export type OrgsArgs = {
    /**
     * Select specific fields to fetch from the Orgs
     * 
    **/
    select?: OrgsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OrgsInclude | null
  }



  /**
   * Model Projects
   */


  export type AggregateProjects = {
    _count: ProjectsCountAggregateOutputType | null
    _avg: ProjectsAvgAggregateOutputType | null
    _sum: ProjectsSumAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  export type ProjectsAvgAggregateOutputType = {
    pivotal_tracker_id: number | null
  }

  export type ProjectsSumAggregateOutputType = {
    pivotal_tracker_id: bigint | null
  }

  export type ProjectsMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    name: string | null
    shortname: string | null
    aliases: string | null
    summary: string | null
    note: string | null
    org_id: string | null
    missive_conversation_id: string | null
    missive_label_id: string | null
    start_date: Date | null
    end_date: Date | null
    updated_at: Date | null
    status: project_status | null
    linear_team_id: string | null
    pivotal_tracker_id: bigint | null
  }

  export type ProjectsMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    name: string | null
    shortname: string | null
    aliases: string | null
    summary: string | null
    note: string | null
    org_id: string | null
    missive_conversation_id: string | null
    missive_label_id: string | null
    start_date: Date | null
    end_date: Date | null
    updated_at: Date | null
    status: project_status | null
    linear_team_id: string | null
    pivotal_tracker_id: bigint | null
  }

  export type ProjectsCountAggregateOutputType = {
    id: number
    created_at: number
    name: number
    shortname: number
    aliases: number
    summary: number
    note: number
    org_id: number
    missive_conversation_id: number
    missive_label_id: number
    start_date: number
    end_date: number
    updated_at: number
    history: number
    status: number
    linear_team_id: number
    pivotal_tracker_id: number
    _all: number
  }


  export type ProjectsAvgAggregateInputType = {
    pivotal_tracker_id?: true
  }

  export type ProjectsSumAggregateInputType = {
    pivotal_tracker_id?: true
  }

  export type ProjectsMinAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    shortname?: true
    aliases?: true
    summary?: true
    note?: true
    org_id?: true
    missive_conversation_id?: true
    missive_label_id?: true
    start_date?: true
    end_date?: true
    updated_at?: true
    status?: true
    linear_team_id?: true
    pivotal_tracker_id?: true
  }

  export type ProjectsMaxAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    shortname?: true
    aliases?: true
    summary?: true
    note?: true
    org_id?: true
    missive_conversation_id?: true
    missive_label_id?: true
    start_date?: true
    end_date?: true
    updated_at?: true
    status?: true
    linear_team_id?: true
    pivotal_tracker_id?: true
  }

  export type ProjectsCountAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    shortname?: true
    aliases?: true
    summary?: true
    note?: true
    org_id?: true
    missive_conversation_id?: true
    missive_label_id?: true
    start_date?: true
    end_date?: true
    updated_at?: true
    history?: true
    status?: true
    linear_team_id?: true
    pivotal_tracker_id?: true
    _all?: true
  }

  export type ProjectsAggregateArgs = {
    /**
     * Filter which Projects to aggregate.
     * 
    **/
    where?: ProjectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     * 
    **/
    orderBy?: Enumerable<ProjectsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProjectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectsMaxAggregateInputType
  }

  export type GetProjectsAggregateType<T extends ProjectsAggregateArgs> = {
        [P in keyof T & keyof AggregateProjects]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjects[P]>
      : GetScalarType<T[P], AggregateProjects[P]>
  }




  export type ProjectsGroupByArgs = {
    where?: ProjectsWhereInput
    orderBy?: Enumerable<ProjectsOrderByWithAggregationInput>
    by: Array<ProjectsScalarFieldEnum>
    having?: ProjectsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectsCountAggregateInputType | true
    _avg?: ProjectsAvgAggregateInputType
    _sum?: ProjectsSumAggregateInputType
    _min?: ProjectsMinAggregateInputType
    _max?: ProjectsMaxAggregateInputType
  }


  export type ProjectsGroupByOutputType = {
    id: string
    created_at: Date
    name: string
    shortname: string
    aliases: string | null
    summary: string | null
    note: string | null
    org_id: string
    missive_conversation_id: string
    missive_label_id: string
    start_date: Date
    end_date: Date | null
    updated_at: Date | null
    history: JsonValue | null
    status: project_status | null
    linear_team_id: string | null
    pivotal_tracker_id: bigint | null
    _count: ProjectsCountAggregateOutputType | null
    _avg: ProjectsAvgAggregateOutputType | null
    _sum: ProjectsSumAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  type GetProjectsGroupByPayload<T extends ProjectsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ProjectsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
        }
      >
    >


  export type ProjectsSelect = {
    id?: boolean
    created_at?: boolean
    name?: boolean
    shortname?: boolean
    aliases?: boolean
    summary?: boolean
    note?: boolean
    org_id?: boolean
    missive_conversation_id?: boolean
    missive_label_id?: boolean
    start_date?: boolean
    end_date?: boolean
    updated_at?: boolean
    history?: boolean
    status?: boolean
    linear_team_id?: boolean
    pivotal_tracker_id?: boolean
    issues?: boolean | Projects$issuesArgs
    orgs?: boolean | OrgsArgs
    _count?: boolean | ProjectsCountOutputTypeArgs
  }


  export type ProjectsInclude = {
    issues?: boolean | Projects$issuesArgs
    orgs?: boolean | OrgsArgs
    _count?: boolean | ProjectsCountOutputTypeArgs
  } 

  export type ProjectsGetPayload<S extends boolean | null | undefined | ProjectsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Projects :
    S extends undefined ? never :
    S extends { include: any } & (ProjectsArgs | ProjectsFindManyArgs)
    ? Projects  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'issues' ? Array < IssuesGetPayload<S['include'][P]>>  :
        P extends 'orgs' ? OrgsGetPayload<S['include'][P]> :
        P extends '_count' ? ProjectsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ProjectsArgs | ProjectsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'issues' ? Array < IssuesGetPayload<S['select'][P]>>  :
        P extends 'orgs' ? OrgsGetPayload<S['select'][P]> :
        P extends '_count' ? ProjectsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Projects ? Projects[P] : never
  } 
      : Projects


  type ProjectsCountArgs = Merge<
    Omit<ProjectsFindManyArgs, 'select' | 'include'> & {
      select?: ProjectsCountAggregateInputType | true
    }
  >

  export interface ProjectsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Projects that matches the filter.
     * @param {ProjectsFindUniqueArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProjectsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProjectsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Projects'> extends True ? Prisma__ProjectsClient<ProjectsGetPayload<T>> : Prisma__ProjectsClient<ProjectsGetPayload<T> | null, null>

    /**
     * Find one Projects that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ProjectsFindUniqueOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProjectsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProjectsFindUniqueOrThrowArgs>
    ): Prisma__ProjectsClient<ProjectsGetPayload<T>>

    /**
     * Find the first Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsFindFirstArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProjectsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProjectsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Projects'> extends True ? Prisma__ProjectsClient<ProjectsGetPayload<T>> : Prisma__ProjectsClient<ProjectsGetPayload<T> | null, null>

    /**
     * Find the first Projects that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsFindFirstOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProjectsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProjectsFindFirstOrThrowArgs>
    ): Prisma__ProjectsClient<ProjectsGetPayload<T>>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.projects.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.projects.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectsWithIdOnly = await prisma.projects.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProjectsFindManyArgs>(
      args?: SelectSubset<T, ProjectsFindManyArgs>
    ): PrismaPromise<Array<ProjectsGetPayload<T>>>

    /**
     * Create a Projects.
     * @param {ProjectsCreateArgs} args - Arguments to create a Projects.
     * @example
     * // Create one Projects
     * const Projects = await prisma.projects.create({
     *   data: {
     *     // ... data to create a Projects
     *   }
     * })
     * 
    **/
    create<T extends ProjectsCreateArgs>(
      args: SelectSubset<T, ProjectsCreateArgs>
    ): Prisma__ProjectsClient<ProjectsGetPayload<T>>

    /**
     * Create many Projects.
     *     @param {ProjectsCreateManyArgs} args - Arguments to create many Projects.
     *     @example
     *     // Create many Projects
     *     const projects = await prisma.projects.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProjectsCreateManyArgs>(
      args?: SelectSubset<T, ProjectsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Projects.
     * @param {ProjectsDeleteArgs} args - Arguments to delete one Projects.
     * @example
     * // Delete one Projects
     * const Projects = await prisma.projects.delete({
     *   where: {
     *     // ... filter to delete one Projects
     *   }
     * })
     * 
    **/
    delete<T extends ProjectsDeleteArgs>(
      args: SelectSubset<T, ProjectsDeleteArgs>
    ): Prisma__ProjectsClient<ProjectsGetPayload<T>>

    /**
     * Update one Projects.
     * @param {ProjectsUpdateArgs} args - Arguments to update one Projects.
     * @example
     * // Update one Projects
     * const projects = await prisma.projects.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProjectsUpdateArgs>(
      args: SelectSubset<T, ProjectsUpdateArgs>
    ): Prisma__ProjectsClient<ProjectsGetPayload<T>>

    /**
     * Delete zero or more Projects.
     * @param {ProjectsDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.projects.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProjectsDeleteManyArgs>(
      args?: SelectSubset<T, ProjectsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const projects = await prisma.projects.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProjectsUpdateManyArgs>(
      args: SelectSubset<T, ProjectsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Projects.
     * @param {ProjectsUpsertArgs} args - Arguments to update or create a Projects.
     * @example
     * // Update or create a Projects
     * const projects = await prisma.projects.upsert({
     *   create: {
     *     // ... data to create a Projects
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Projects we want to update
     *   }
     * })
    **/
    upsert<T extends ProjectsUpsertArgs>(
      args: SelectSubset<T, ProjectsUpsertArgs>
    ): Prisma__ProjectsClient<ProjectsGetPayload<T>>

    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.projects.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectsCountArgs>(
      args?: Subset<T, ProjectsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectsAggregateArgs>(args: Subset<T, ProjectsAggregateArgs>): PrismaPromise<GetProjectsAggregateType<T>>

    /**
     * Group by Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectsGroupByArgs['orderBy'] }
        : { orderBy?: ProjectsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Projects.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProjectsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    issues<T extends Projects$issuesArgs= {}>(args?: Subset<T, Projects$issuesArgs>): PrismaPromise<Array<IssuesGetPayload<T>>| Null>;

    orgs<T extends OrgsArgs= {}>(args?: Subset<T, OrgsArgs>): Prisma__OrgsClient<OrgsGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Projects base type for findUnique actions
   */
  export type ProjectsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Projects
     * 
    **/
    select?: ProjectsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectsInclude | null
    /**
     * Filter, which Projects to fetch.
     * 
    **/
    where: ProjectsWhereUniqueInput
  }

  /**
   * Projects findUnique
   */
  export interface ProjectsFindUniqueArgs extends ProjectsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Projects findUniqueOrThrow
   */
  export type ProjectsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Projects
     * 
    **/
    select?: ProjectsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectsInclude | null
    /**
     * Filter, which Projects to fetch.
     * 
    **/
    where: ProjectsWhereUniqueInput
  }


  /**
   * Projects base type for findFirst actions
   */
  export type ProjectsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Projects
     * 
    **/
    select?: ProjectsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectsInclude | null
    /**
     * Filter, which Projects to fetch.
     * 
    **/
    where?: ProjectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     * 
    **/
    orderBy?: Enumerable<ProjectsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     * 
    **/
    cursor?: ProjectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     * 
    **/
    distinct?: Enumerable<ProjectsScalarFieldEnum>
  }

  /**
   * Projects findFirst
   */
  export interface ProjectsFindFirstArgs extends ProjectsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Projects findFirstOrThrow
   */
  export type ProjectsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Projects
     * 
    **/
    select?: ProjectsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectsInclude | null
    /**
     * Filter, which Projects to fetch.
     * 
    **/
    where?: ProjectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     * 
    **/
    orderBy?: Enumerable<ProjectsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     * 
    **/
    cursor?: ProjectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     * 
    **/
    distinct?: Enumerable<ProjectsScalarFieldEnum>
  }


  /**
   * Projects findMany
   */
  export type ProjectsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Projects
     * 
    **/
    select?: ProjectsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectsInclude | null
    /**
     * Filter, which Projects to fetch.
     * 
    **/
    where?: ProjectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     * 
    **/
    orderBy?: Enumerable<ProjectsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     * 
    **/
    cursor?: ProjectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProjectsScalarFieldEnum>
  }


  /**
   * Projects create
   */
  export type ProjectsCreateArgs = {
    /**
     * Select specific fields to fetch from the Projects
     * 
    **/
    select?: ProjectsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectsInclude | null
    /**
     * The data needed to create a Projects.
     * 
    **/
    data: XOR<ProjectsCreateInput, ProjectsUncheckedCreateInput>
  }


  /**
   * Projects createMany
   */
  export type ProjectsCreateManyArgs = {
    /**
     * The data used to create many Projects.
     * 
    **/
    data: Enumerable<ProjectsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Projects update
   */
  export type ProjectsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Projects
     * 
    **/
    select?: ProjectsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectsInclude | null
    /**
     * The data needed to update a Projects.
     * 
    **/
    data: XOR<ProjectsUpdateInput, ProjectsUncheckedUpdateInput>
    /**
     * Choose, which Projects to update.
     * 
    **/
    where: ProjectsWhereUniqueInput
  }


  /**
   * Projects updateMany
   */
  export type ProjectsUpdateManyArgs = {
    /**
     * The data used to update Projects.
     * 
    **/
    data: XOR<ProjectsUpdateManyMutationInput, ProjectsUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     * 
    **/
    where?: ProjectsWhereInput
  }


  /**
   * Projects upsert
   */
  export type ProjectsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Projects
     * 
    **/
    select?: ProjectsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectsInclude | null
    /**
     * The filter to search for the Projects to update in case it exists.
     * 
    **/
    where: ProjectsWhereUniqueInput
    /**
     * In case the Projects found by the `where` argument doesn't exist, create a new Projects with this data.
     * 
    **/
    create: XOR<ProjectsCreateInput, ProjectsUncheckedCreateInput>
    /**
     * In case the Projects was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProjectsUpdateInput, ProjectsUncheckedUpdateInput>
  }


  /**
   * Projects delete
   */
  export type ProjectsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Projects
     * 
    **/
    select?: ProjectsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectsInclude | null
    /**
     * Filter which Projects to delete.
     * 
    **/
    where: ProjectsWhereUniqueInput
  }


  /**
   * Projects deleteMany
   */
  export type ProjectsDeleteManyArgs = {
    /**
     * Filter which Projects to delete
     * 
    **/
    where?: ProjectsWhereInput
  }


  /**
   * Projects.issues
   */
  export type Projects$issuesArgs = {
    /**
     * Select specific fields to fetch from the Issues
     * 
    **/
    select?: IssuesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IssuesInclude | null
    where?: IssuesWhereInput
    orderBy?: Enumerable<IssuesOrderByWithRelationInput>
    cursor?: IssuesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<IssuesScalarFieldEnum>
  }


  /**
   * Projects without action
   */
  export type ProjectsArgs = {
    /**
     * Select specific fields to fetch from the Projects
     * 
    **/
    select?: ProjectsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectsInclude | null
  }



  /**
   * Model Slack_channels
   */


  export type AggregateSlack_channels = {
    _count: Slack_channelsCountAggregateOutputType | null
    _min: Slack_channelsMinAggregateOutputType | null
    _max: Slack_channelsMaxAggregateOutputType | null
  }

  export type Slack_channelsMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
  }

  export type Slack_channelsMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
  }

  export type Slack_channelsCountAggregateOutputType = {
    id: number
    created_at: number
    _all: number
  }


  export type Slack_channelsMinAggregateInputType = {
    id?: true
    created_at?: true
  }

  export type Slack_channelsMaxAggregateInputType = {
    id?: true
    created_at?: true
  }

  export type Slack_channelsCountAggregateInputType = {
    id?: true
    created_at?: true
    _all?: true
  }

  export type Slack_channelsAggregateArgs = {
    /**
     * Filter which Slack_channels to aggregate.
     * 
    **/
    where?: Slack_channelsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slack_channels to fetch.
     * 
    **/
    orderBy?: Enumerable<Slack_channelsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: Slack_channelsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slack_channels from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slack_channels.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Slack_channels
    **/
    _count?: true | Slack_channelsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Slack_channelsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Slack_channelsMaxAggregateInputType
  }

  export type GetSlack_channelsAggregateType<T extends Slack_channelsAggregateArgs> = {
        [P in keyof T & keyof AggregateSlack_channels]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSlack_channels[P]>
      : GetScalarType<T[P], AggregateSlack_channels[P]>
  }




  export type Slack_channelsGroupByArgs = {
    where?: Slack_channelsWhereInput
    orderBy?: Enumerable<Slack_channelsOrderByWithAggregationInput>
    by: Array<Slack_channelsScalarFieldEnum>
    having?: Slack_channelsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Slack_channelsCountAggregateInputType | true
    _min?: Slack_channelsMinAggregateInputType
    _max?: Slack_channelsMaxAggregateInputType
  }


  export type Slack_channelsGroupByOutputType = {
    id: string
    created_at: Date
    _count: Slack_channelsCountAggregateOutputType | null
    _min: Slack_channelsMinAggregateOutputType | null
    _max: Slack_channelsMaxAggregateOutputType | null
  }

  type GetSlack_channelsGroupByPayload<T extends Slack_channelsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Slack_channelsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Slack_channelsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Slack_channelsGroupByOutputType[P]>
            : GetScalarType<T[P], Slack_channelsGroupByOutputType[P]>
        }
      >
    >


  export type Slack_channelsSelect = {
    id?: boolean
    created_at?: boolean
    orgs?: boolean | Slack_channels$orgsArgs
    _count?: boolean | Slack_channelsCountOutputTypeArgs
  }


  export type Slack_channelsInclude = {
    orgs?: boolean | Slack_channels$orgsArgs
    _count?: boolean | Slack_channelsCountOutputTypeArgs
  } 

  export type Slack_channelsGetPayload<S extends boolean | null | undefined | Slack_channelsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Slack_channels :
    S extends undefined ? never :
    S extends { include: any } & (Slack_channelsArgs | Slack_channelsFindManyArgs)
    ? Slack_channels  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'orgs' ? Array < OrgsGetPayload<S['include'][P]>>  :
        P extends '_count' ? Slack_channelsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (Slack_channelsArgs | Slack_channelsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'orgs' ? Array < OrgsGetPayload<S['select'][P]>>  :
        P extends '_count' ? Slack_channelsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Slack_channels ? Slack_channels[P] : never
  } 
      : Slack_channels


  type Slack_channelsCountArgs = Merge<
    Omit<Slack_channelsFindManyArgs, 'select' | 'include'> & {
      select?: Slack_channelsCountAggregateInputType | true
    }
  >

  export interface Slack_channelsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Slack_channels that matches the filter.
     * @param {Slack_channelsFindUniqueArgs} args - Arguments to find a Slack_channels
     * @example
     * // Get one Slack_channels
     * const slack_channels = await prisma.slack_channels.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Slack_channelsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Slack_channelsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Slack_channels'> extends True ? Prisma__Slack_channelsClient<Slack_channelsGetPayload<T>> : Prisma__Slack_channelsClient<Slack_channelsGetPayload<T> | null, null>

    /**
     * Find one Slack_channels that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Slack_channelsFindUniqueOrThrowArgs} args - Arguments to find a Slack_channels
     * @example
     * // Get one Slack_channels
     * const slack_channels = await prisma.slack_channels.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Slack_channelsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Slack_channelsFindUniqueOrThrowArgs>
    ): Prisma__Slack_channelsClient<Slack_channelsGetPayload<T>>

    /**
     * Find the first Slack_channels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Slack_channelsFindFirstArgs} args - Arguments to find a Slack_channels
     * @example
     * // Get one Slack_channels
     * const slack_channels = await prisma.slack_channels.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Slack_channelsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Slack_channelsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Slack_channels'> extends True ? Prisma__Slack_channelsClient<Slack_channelsGetPayload<T>> : Prisma__Slack_channelsClient<Slack_channelsGetPayload<T> | null, null>

    /**
     * Find the first Slack_channels that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Slack_channelsFindFirstOrThrowArgs} args - Arguments to find a Slack_channels
     * @example
     * // Get one Slack_channels
     * const slack_channels = await prisma.slack_channels.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Slack_channelsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Slack_channelsFindFirstOrThrowArgs>
    ): Prisma__Slack_channelsClient<Slack_channelsGetPayload<T>>

    /**
     * Find zero or more Slack_channels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Slack_channelsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Slack_channels
     * const slack_channels = await prisma.slack_channels.findMany()
     * 
     * // Get first 10 Slack_channels
     * const slack_channels = await prisma.slack_channels.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const slack_channelsWithIdOnly = await prisma.slack_channels.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Slack_channelsFindManyArgs>(
      args?: SelectSubset<T, Slack_channelsFindManyArgs>
    ): PrismaPromise<Array<Slack_channelsGetPayload<T>>>

    /**
     * Create a Slack_channels.
     * @param {Slack_channelsCreateArgs} args - Arguments to create a Slack_channels.
     * @example
     * // Create one Slack_channels
     * const Slack_channels = await prisma.slack_channels.create({
     *   data: {
     *     // ... data to create a Slack_channels
     *   }
     * })
     * 
    **/
    create<T extends Slack_channelsCreateArgs>(
      args: SelectSubset<T, Slack_channelsCreateArgs>
    ): Prisma__Slack_channelsClient<Slack_channelsGetPayload<T>>

    /**
     * Create many Slack_channels.
     *     @param {Slack_channelsCreateManyArgs} args - Arguments to create many Slack_channels.
     *     @example
     *     // Create many Slack_channels
     *     const slack_channels = await prisma.slack_channels.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Slack_channelsCreateManyArgs>(
      args?: SelectSubset<T, Slack_channelsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Slack_channels.
     * @param {Slack_channelsDeleteArgs} args - Arguments to delete one Slack_channels.
     * @example
     * // Delete one Slack_channels
     * const Slack_channels = await prisma.slack_channels.delete({
     *   where: {
     *     // ... filter to delete one Slack_channels
     *   }
     * })
     * 
    **/
    delete<T extends Slack_channelsDeleteArgs>(
      args: SelectSubset<T, Slack_channelsDeleteArgs>
    ): Prisma__Slack_channelsClient<Slack_channelsGetPayload<T>>

    /**
     * Update one Slack_channels.
     * @param {Slack_channelsUpdateArgs} args - Arguments to update one Slack_channels.
     * @example
     * // Update one Slack_channels
     * const slack_channels = await prisma.slack_channels.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Slack_channelsUpdateArgs>(
      args: SelectSubset<T, Slack_channelsUpdateArgs>
    ): Prisma__Slack_channelsClient<Slack_channelsGetPayload<T>>

    /**
     * Delete zero or more Slack_channels.
     * @param {Slack_channelsDeleteManyArgs} args - Arguments to filter Slack_channels to delete.
     * @example
     * // Delete a few Slack_channels
     * const { count } = await prisma.slack_channels.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Slack_channelsDeleteManyArgs>(
      args?: SelectSubset<T, Slack_channelsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slack_channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Slack_channelsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Slack_channels
     * const slack_channels = await prisma.slack_channels.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Slack_channelsUpdateManyArgs>(
      args: SelectSubset<T, Slack_channelsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Slack_channels.
     * @param {Slack_channelsUpsertArgs} args - Arguments to update or create a Slack_channels.
     * @example
     * // Update or create a Slack_channels
     * const slack_channels = await prisma.slack_channels.upsert({
     *   create: {
     *     // ... data to create a Slack_channels
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Slack_channels we want to update
     *   }
     * })
    **/
    upsert<T extends Slack_channelsUpsertArgs>(
      args: SelectSubset<T, Slack_channelsUpsertArgs>
    ): Prisma__Slack_channelsClient<Slack_channelsGetPayload<T>>

    /**
     * Count the number of Slack_channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Slack_channelsCountArgs} args - Arguments to filter Slack_channels to count.
     * @example
     * // Count the number of Slack_channels
     * const count = await prisma.slack_channels.count({
     *   where: {
     *     // ... the filter for the Slack_channels we want to count
     *   }
     * })
    **/
    count<T extends Slack_channelsCountArgs>(
      args?: Subset<T, Slack_channelsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Slack_channelsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Slack_channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Slack_channelsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Slack_channelsAggregateArgs>(args: Subset<T, Slack_channelsAggregateArgs>): PrismaPromise<GetSlack_channelsAggregateType<T>>

    /**
     * Group by Slack_channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Slack_channelsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Slack_channelsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Slack_channelsGroupByArgs['orderBy'] }
        : { orderBy?: Slack_channelsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Slack_channelsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSlack_channelsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Slack_channels.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Slack_channelsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    orgs<T extends Slack_channels$orgsArgs= {}>(args?: Subset<T, Slack_channels$orgsArgs>): PrismaPromise<Array<OrgsGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Slack_channels base type for findUnique actions
   */
  export type Slack_channelsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Slack_channels
     * 
    **/
    select?: Slack_channelsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Slack_channelsInclude | null
    /**
     * Filter, which Slack_channels to fetch.
     * 
    **/
    where: Slack_channelsWhereUniqueInput
  }

  /**
   * Slack_channels findUnique
   */
  export interface Slack_channelsFindUniqueArgs extends Slack_channelsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Slack_channels findUniqueOrThrow
   */
  export type Slack_channelsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Slack_channels
     * 
    **/
    select?: Slack_channelsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Slack_channelsInclude | null
    /**
     * Filter, which Slack_channels to fetch.
     * 
    **/
    where: Slack_channelsWhereUniqueInput
  }


  /**
   * Slack_channels base type for findFirst actions
   */
  export type Slack_channelsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Slack_channels
     * 
    **/
    select?: Slack_channelsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Slack_channelsInclude | null
    /**
     * Filter, which Slack_channels to fetch.
     * 
    **/
    where?: Slack_channelsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slack_channels to fetch.
     * 
    **/
    orderBy?: Enumerable<Slack_channelsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Slack_channels.
     * 
    **/
    cursor?: Slack_channelsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slack_channels from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slack_channels.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Slack_channels.
     * 
    **/
    distinct?: Enumerable<Slack_channelsScalarFieldEnum>
  }

  /**
   * Slack_channels findFirst
   */
  export interface Slack_channelsFindFirstArgs extends Slack_channelsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Slack_channels findFirstOrThrow
   */
  export type Slack_channelsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Slack_channels
     * 
    **/
    select?: Slack_channelsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Slack_channelsInclude | null
    /**
     * Filter, which Slack_channels to fetch.
     * 
    **/
    where?: Slack_channelsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slack_channels to fetch.
     * 
    **/
    orderBy?: Enumerable<Slack_channelsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Slack_channels.
     * 
    **/
    cursor?: Slack_channelsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slack_channels from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slack_channels.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Slack_channels.
     * 
    **/
    distinct?: Enumerable<Slack_channelsScalarFieldEnum>
  }


  /**
   * Slack_channels findMany
   */
  export type Slack_channelsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Slack_channels
     * 
    **/
    select?: Slack_channelsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Slack_channelsInclude | null
    /**
     * Filter, which Slack_channels to fetch.
     * 
    **/
    where?: Slack_channelsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Slack_channels to fetch.
     * 
    **/
    orderBy?: Enumerable<Slack_channelsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Slack_channels.
     * 
    **/
    cursor?: Slack_channelsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Slack_channels from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Slack_channels.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Slack_channelsScalarFieldEnum>
  }


  /**
   * Slack_channels create
   */
  export type Slack_channelsCreateArgs = {
    /**
     * Select specific fields to fetch from the Slack_channels
     * 
    **/
    select?: Slack_channelsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Slack_channelsInclude | null
    /**
     * The data needed to create a Slack_channels.
     * 
    **/
    data: XOR<Slack_channelsCreateInput, Slack_channelsUncheckedCreateInput>
  }


  /**
   * Slack_channels createMany
   */
  export type Slack_channelsCreateManyArgs = {
    /**
     * The data used to create many Slack_channels.
     * 
    **/
    data: Enumerable<Slack_channelsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Slack_channels update
   */
  export type Slack_channelsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Slack_channels
     * 
    **/
    select?: Slack_channelsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Slack_channelsInclude | null
    /**
     * The data needed to update a Slack_channels.
     * 
    **/
    data: XOR<Slack_channelsUpdateInput, Slack_channelsUncheckedUpdateInput>
    /**
     * Choose, which Slack_channels to update.
     * 
    **/
    where: Slack_channelsWhereUniqueInput
  }


  /**
   * Slack_channels updateMany
   */
  export type Slack_channelsUpdateManyArgs = {
    /**
     * The data used to update Slack_channels.
     * 
    **/
    data: XOR<Slack_channelsUpdateManyMutationInput, Slack_channelsUncheckedUpdateManyInput>
    /**
     * Filter which Slack_channels to update
     * 
    **/
    where?: Slack_channelsWhereInput
  }


  /**
   * Slack_channels upsert
   */
  export type Slack_channelsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Slack_channels
     * 
    **/
    select?: Slack_channelsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Slack_channelsInclude | null
    /**
     * The filter to search for the Slack_channels to update in case it exists.
     * 
    **/
    where: Slack_channelsWhereUniqueInput
    /**
     * In case the Slack_channels found by the `where` argument doesn't exist, create a new Slack_channels with this data.
     * 
    **/
    create: XOR<Slack_channelsCreateInput, Slack_channelsUncheckedCreateInput>
    /**
     * In case the Slack_channels was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<Slack_channelsUpdateInput, Slack_channelsUncheckedUpdateInput>
  }


  /**
   * Slack_channels delete
   */
  export type Slack_channelsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Slack_channels
     * 
    **/
    select?: Slack_channelsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Slack_channelsInclude | null
    /**
     * Filter which Slack_channels to delete.
     * 
    **/
    where: Slack_channelsWhereUniqueInput
  }


  /**
   * Slack_channels deleteMany
   */
  export type Slack_channelsDeleteManyArgs = {
    /**
     * Filter which Slack_channels to delete
     * 
    **/
    where?: Slack_channelsWhereInput
  }


  /**
   * Slack_channels.orgs
   */
  export type Slack_channels$orgsArgs = {
    /**
     * Select specific fields to fetch from the Orgs
     * 
    **/
    select?: OrgsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: OrgsInclude | null
    where?: OrgsWhereInput
    orderBy?: Enumerable<OrgsOrderByWithRelationInput>
    cursor?: OrgsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<OrgsScalarFieldEnum>
  }


  /**
   * Slack_channels without action
   */
  export type Slack_channelsArgs = {
    /**
     * Select specific fields to fetch from the Slack_channels
     * 
    **/
    select?: Slack_channelsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Slack_channelsInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const CommentsScalarFieldEnum: {
    id: 'id',
    body: 'body',
    username: 'username',
    issue_id: 'issue_id',
    created_at: 'created_at'
  };

  export type CommentsScalarFieldEnum = (typeof CommentsScalarFieldEnum)[keyof typeof CommentsScalarFieldEnum]


  export const EmailsScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    email_address: 'email_address'
  };

  export type EmailsScalarFieldEnum = (typeof EmailsScalarFieldEnum)[keyof typeof EmailsScalarFieldEnum]


  export const IssuesScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    created_at: 'created_at',
    kanbanorder: 'kanbanorder',
    username: 'username',
    external_urls: 'external_urls',
    completed_at: 'completed_at',
    status: 'status',
    priority: 'priority',
    updated_at: 'updated_at',
    project_id: 'project_id'
  };

  export type IssuesScalarFieldEnum = (typeof IssuesScalarFieldEnum)[keyof typeof IssuesScalarFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const OrgsScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    name: 'name',
    shortname: 'shortname',
    aliases: 'aliases',
    first_contact: 'first_contact',
    updated_at: 'updated_at',
    website: 'website',
    primary_email_address_id: 'primary_email_address_id',
    primary_slack_channel_id: 'primary_slack_channel_id',
    summary: 'summary',
    note: 'note',
    missive_conversation_id: 'missive_conversation_id',
    missive_label_id: 'missive_label_id',
    history: 'history',
    github_id: 'github_id',
    linear_id: 'linear_id',
    pivotal_tracker_id: 'pivotal_tracker_id'
  };

  export type OrgsScalarFieldEnum = (typeof OrgsScalarFieldEnum)[keyof typeof OrgsScalarFieldEnum]


  export const ProjectsScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    name: 'name',
    shortname: 'shortname',
    aliases: 'aliases',
    summary: 'summary',
    note: 'note',
    org_id: 'org_id',
    missive_conversation_id: 'missive_conversation_id',
    missive_label_id: 'missive_label_id',
    start_date: 'start_date',
    end_date: 'end_date',
    updated_at: 'updated_at',
    history: 'history',
    status: 'status',
    linear_team_id: 'linear_team_id',
    pivotal_tracker_id: 'pivotal_tracker_id'
  };

  export type ProjectsScalarFieldEnum = (typeof ProjectsScalarFieldEnum)[keyof typeof ProjectsScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const Slack_channelsScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at'
  };

  export type Slack_channelsScalarFieldEnum = (typeof Slack_channelsScalarFieldEnum)[keyof typeof Slack_channelsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  /**
   * Deep Input Types
   */


  export type CommentsWhereInput = {
    AND?: Enumerable<CommentsWhereInput>
    OR?: Enumerable<CommentsWhereInput>
    NOT?: Enumerable<CommentsWhereInput>
    id?: UuidFilter | string
    body?: StringFilter | string
    username?: StringFilter | string
    issue_id?: UuidFilter | string
    created_at?: DateTimeFilter | Date | string
    issues?: XOR<IssuesRelationFilter, IssuesWhereInput>
  }

  export type CommentsOrderByWithRelationInput = {
    id?: SortOrder
    body?: SortOrder
    username?: SortOrder
    issue_id?: SortOrder
    created_at?: SortOrder
    issues?: IssuesOrderByWithRelationInput
  }

  export type CommentsWhereUniqueInput = {
    id?: string
  }

  export type CommentsOrderByWithAggregationInput = {
    id?: SortOrder
    body?: SortOrder
    username?: SortOrder
    issue_id?: SortOrder
    created_at?: SortOrder
    _count?: CommentsCountOrderByAggregateInput
    _max?: CommentsMaxOrderByAggregateInput
    _min?: CommentsMinOrderByAggregateInput
  }

  export type CommentsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CommentsScalarWhereWithAggregatesInput>
    OR?: Enumerable<CommentsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CommentsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    body?: StringWithAggregatesFilter | string
    username?: StringWithAggregatesFilter | string
    issue_id?: UuidWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
  }

  export type EmailsWhereInput = {
    AND?: Enumerable<EmailsWhereInput>
    OR?: Enumerable<EmailsWhereInput>
    NOT?: Enumerable<EmailsWhereInput>
    id?: UuidFilter | string
    created_at?: DateTimeFilter | Date | string
    email_address?: StringFilter | string
    orgs?: OrgsListRelationFilter
  }

  export type EmailsOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    email_address?: SortOrder
    orgs?: OrgsOrderByRelationAggregateInput
  }

  export type EmailsWhereUniqueInput = {
    id?: string
  }

  export type EmailsOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    email_address?: SortOrder
    _count?: EmailsCountOrderByAggregateInput
    _max?: EmailsMaxOrderByAggregateInput
    _min?: EmailsMinOrderByAggregateInput
  }

  export type EmailsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EmailsScalarWhereWithAggregatesInput>
    OR?: Enumerable<EmailsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EmailsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    email_address?: StringWithAggregatesFilter | string
  }

  export type IssuesWhereInput = {
    AND?: Enumerable<IssuesWhereInput>
    OR?: Enumerable<IssuesWhereInput>
    NOT?: Enumerable<IssuesWhereInput>
    id?: UuidFilter | string
    title?: StringFilter | string
    description?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    kanbanorder?: StringFilter | string
    username?: StringFilter | string
    external_urls?: StringNullableFilter | string | null
    completed_at?: DateTimeNullableFilter | Date | string | null
    status?: StringFilter | string
    priority?: StringFilter | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    project_id?: UuidNullableFilter | string | null
    comments?: CommentsListRelationFilter
    projects?: XOR<ProjectsRelationFilter, ProjectsWhereInput> | null
  }

  export type IssuesOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    kanbanorder?: SortOrder
    username?: SortOrder
    external_urls?: SortOrder
    completed_at?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    updated_at?: SortOrder
    project_id?: SortOrder
    comments?: CommentsOrderByRelationAggregateInput
    projects?: ProjectsOrderByWithRelationInput
  }

  export type IssuesWhereUniqueInput = {
    id?: string
  }

  export type IssuesOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    kanbanorder?: SortOrder
    username?: SortOrder
    external_urls?: SortOrder
    completed_at?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    updated_at?: SortOrder
    project_id?: SortOrder
    _count?: IssuesCountOrderByAggregateInput
    _max?: IssuesMaxOrderByAggregateInput
    _min?: IssuesMinOrderByAggregateInput
  }

  export type IssuesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<IssuesScalarWhereWithAggregatesInput>
    OR?: Enumerable<IssuesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<IssuesScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    kanbanorder?: StringWithAggregatesFilter | string
    username?: StringWithAggregatesFilter | string
    external_urls?: StringNullableWithAggregatesFilter | string | null
    completed_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    status?: StringWithAggregatesFilter | string
    priority?: StringWithAggregatesFilter | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    project_id?: UuidNullableWithAggregatesFilter | string | null
  }

  export type OrgsWhereInput = {
    AND?: Enumerable<OrgsWhereInput>
    OR?: Enumerable<OrgsWhereInput>
    NOT?: Enumerable<OrgsWhereInput>
    id?: UuidFilter | string
    created_at?: DateTimeFilter | Date | string
    name?: StringFilter | string
    shortname?: StringFilter | string
    aliases?: StringNullableFilter | string | null
    first_contact?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    website?: StringNullableFilter | string | null
    primary_email_address_id?: UuidNullableFilter | string | null
    primary_slack_channel_id?: UuidNullableFilter | string | null
    summary?: StringNullableFilter | string | null
    note?: StringNullableFilter | string | null
    missive_conversation_id?: UuidFilter | string
    missive_label_id?: UuidFilter | string
    history?: JsonNullableFilter
    github_id?: UuidNullableFilter | string | null
    linear_id?: UuidNullableFilter | string | null
    pivotal_tracker_id?: UuidNullableFilter | string | null
    emails?: XOR<EmailsRelationFilter, EmailsWhereInput> | null
    slack_channels?: XOR<Slack_channelsRelationFilter, Slack_channelsWhereInput> | null
    projects?: ProjectsListRelationFilter
  }

  export type OrgsOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    shortname?: SortOrder
    aliases?: SortOrder
    first_contact?: SortOrder
    updated_at?: SortOrder
    website?: SortOrder
    primary_email_address_id?: SortOrder
    primary_slack_channel_id?: SortOrder
    summary?: SortOrder
    note?: SortOrder
    missive_conversation_id?: SortOrder
    missive_label_id?: SortOrder
    history?: SortOrder
    github_id?: SortOrder
    linear_id?: SortOrder
    pivotal_tracker_id?: SortOrder
    emails?: EmailsOrderByWithRelationInput
    slack_channels?: Slack_channelsOrderByWithRelationInput
    projects?: ProjectsOrderByRelationAggregateInput
  }

  export type OrgsWhereUniqueInput = {
    id?: string
  }

  export type OrgsOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    shortname?: SortOrder
    aliases?: SortOrder
    first_contact?: SortOrder
    updated_at?: SortOrder
    website?: SortOrder
    primary_email_address_id?: SortOrder
    primary_slack_channel_id?: SortOrder
    summary?: SortOrder
    note?: SortOrder
    missive_conversation_id?: SortOrder
    missive_label_id?: SortOrder
    history?: SortOrder
    github_id?: SortOrder
    linear_id?: SortOrder
    pivotal_tracker_id?: SortOrder
    _count?: OrgsCountOrderByAggregateInput
    _max?: OrgsMaxOrderByAggregateInput
    _min?: OrgsMinOrderByAggregateInput
  }

  export type OrgsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<OrgsScalarWhereWithAggregatesInput>
    OR?: Enumerable<OrgsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<OrgsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    name?: StringWithAggregatesFilter | string
    shortname?: StringWithAggregatesFilter | string
    aliases?: StringNullableWithAggregatesFilter | string | null
    first_contact?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    website?: StringNullableWithAggregatesFilter | string | null
    primary_email_address_id?: UuidNullableWithAggregatesFilter | string | null
    primary_slack_channel_id?: UuidNullableWithAggregatesFilter | string | null
    summary?: StringNullableWithAggregatesFilter | string | null
    note?: StringNullableWithAggregatesFilter | string | null
    missive_conversation_id?: UuidWithAggregatesFilter | string
    missive_label_id?: UuidWithAggregatesFilter | string
    history?: JsonNullableWithAggregatesFilter
    github_id?: UuidNullableWithAggregatesFilter | string | null
    linear_id?: UuidNullableWithAggregatesFilter | string | null
    pivotal_tracker_id?: UuidNullableWithAggregatesFilter | string | null
  }

  export type ProjectsWhereInput = {
    AND?: Enumerable<ProjectsWhereInput>
    OR?: Enumerable<ProjectsWhereInput>
    NOT?: Enumerable<ProjectsWhereInput>
    id?: UuidFilter | string
    created_at?: DateTimeFilter | Date | string
    name?: StringFilter | string
    shortname?: StringFilter | string
    aliases?: StringNullableFilter | string | null
    summary?: StringNullableFilter | string | null
    note?: StringNullableFilter | string | null
    org_id?: UuidFilter | string
    missive_conversation_id?: UuidFilter | string
    missive_label_id?: UuidFilter | string
    start_date?: DateTimeFilter | Date | string
    end_date?: DateTimeNullableFilter | Date | string | null
    updated_at?: DateTimeNullableFilter | Date | string | null
    history?: JsonNullableFilter
    status?: Enumproject_statusNullableFilter | project_status | null
    linear_team_id?: UuidNullableFilter | string | null
    pivotal_tracker_id?: BigIntNullableFilter | bigint | number | null
    issues?: IssuesListRelationFilter
    orgs?: XOR<OrgsRelationFilter, OrgsWhereInput>
  }

  export type ProjectsOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    shortname?: SortOrder
    aliases?: SortOrder
    summary?: SortOrder
    note?: SortOrder
    org_id?: SortOrder
    missive_conversation_id?: SortOrder
    missive_label_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    updated_at?: SortOrder
    history?: SortOrder
    status?: SortOrder
    linear_team_id?: SortOrder
    pivotal_tracker_id?: SortOrder
    issues?: IssuesOrderByRelationAggregateInput
    orgs?: OrgsOrderByWithRelationInput
  }

  export type ProjectsWhereUniqueInput = {
    id?: string
  }

  export type ProjectsOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    shortname?: SortOrder
    aliases?: SortOrder
    summary?: SortOrder
    note?: SortOrder
    org_id?: SortOrder
    missive_conversation_id?: SortOrder
    missive_label_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    updated_at?: SortOrder
    history?: SortOrder
    status?: SortOrder
    linear_team_id?: SortOrder
    pivotal_tracker_id?: SortOrder
    _count?: ProjectsCountOrderByAggregateInput
    _avg?: ProjectsAvgOrderByAggregateInput
    _max?: ProjectsMaxOrderByAggregateInput
    _min?: ProjectsMinOrderByAggregateInput
    _sum?: ProjectsSumOrderByAggregateInput
  }

  export type ProjectsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProjectsScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProjectsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProjectsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    name?: StringWithAggregatesFilter | string
    shortname?: StringWithAggregatesFilter | string
    aliases?: StringNullableWithAggregatesFilter | string | null
    summary?: StringNullableWithAggregatesFilter | string | null
    note?: StringNullableWithAggregatesFilter | string | null
    org_id?: UuidWithAggregatesFilter | string
    missive_conversation_id?: UuidWithAggregatesFilter | string
    missive_label_id?: UuidWithAggregatesFilter | string
    start_date?: DateTimeWithAggregatesFilter | Date | string
    end_date?: DateTimeNullableWithAggregatesFilter | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    history?: JsonNullableWithAggregatesFilter
    status?: Enumproject_statusNullableWithAggregatesFilter | project_status | null
    linear_team_id?: UuidNullableWithAggregatesFilter | string | null
    pivotal_tracker_id?: BigIntNullableWithAggregatesFilter | bigint | number | null
  }

  export type Slack_channelsWhereInput = {
    AND?: Enumerable<Slack_channelsWhereInput>
    OR?: Enumerable<Slack_channelsWhereInput>
    NOT?: Enumerable<Slack_channelsWhereInput>
    id?: UuidFilter | string
    created_at?: DateTimeFilter | Date | string
    orgs?: OrgsListRelationFilter
  }

  export type Slack_channelsOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    orgs?: OrgsOrderByRelationAggregateInput
  }

  export type Slack_channelsWhereUniqueInput = {
    id?: string
  }

  export type Slack_channelsOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    _count?: Slack_channelsCountOrderByAggregateInput
    _max?: Slack_channelsMaxOrderByAggregateInput
    _min?: Slack_channelsMinOrderByAggregateInput
  }

  export type Slack_channelsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Slack_channelsScalarWhereWithAggregatesInput>
    OR?: Enumerable<Slack_channelsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Slack_channelsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
  }

  export type CommentsCreateInput = {
    id: string
    body: string
    username: string
    created_at: Date | string
    issues: IssuesCreateNestedOneWithoutCommentsInput
  }

  export type CommentsUncheckedCreateInput = {
    id: string
    body: string
    username: string
    issue_id: string
    created_at: Date | string
  }

  export type CommentsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    issues?: IssuesUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    issue_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentsCreateManyInput = {
    id: string
    body: string
    username: string
    issue_id: string
    created_at: Date | string
  }

  export type CommentsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    issue_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailsCreateInput = {
    id: string
    created_at: Date | string
    email_address: string
    orgs?: OrgsCreateNestedManyWithoutEmailsInput
  }

  export type EmailsUncheckedCreateInput = {
    id: string
    created_at: Date | string
    email_address: string
    orgs?: OrgsUncheckedCreateNestedManyWithoutEmailsInput
  }

  export type EmailsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_address?: StringFieldUpdateOperationsInput | string
    orgs?: OrgsUpdateManyWithoutEmailsNestedInput
  }

  export type EmailsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_address?: StringFieldUpdateOperationsInput | string
    orgs?: OrgsUncheckedUpdateManyWithoutEmailsNestedInput
  }

  export type EmailsCreateManyInput = {
    id: string
    created_at: Date | string
    email_address: string
  }

  export type EmailsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_address?: StringFieldUpdateOperationsInput | string
  }

  export type EmailsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_address?: StringFieldUpdateOperationsInput | string
  }

  export type IssuesCreateInput = {
    id: string
    title: string
    description: string
    created_at: Date | string
    kanbanorder: string
    username: string
    external_urls?: string | null
    completed_at?: Date | string | null
    status: string
    priority: string
    updated_at?: Date | string | null
    comments?: CommentsCreateNestedManyWithoutIssuesInput
    projects?: ProjectsCreateNestedOneWithoutIssuesInput
  }

  export type IssuesUncheckedCreateInput = {
    id: string
    title: string
    description: string
    created_at: Date | string
    kanbanorder: string
    username: string
    external_urls?: string | null
    completed_at?: Date | string | null
    status: string
    priority: string
    updated_at?: Date | string | null
    project_id?: string | null
    comments?: CommentsUncheckedCreateNestedManyWithoutIssuesInput
  }

  export type IssuesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    external_urls?: NullableStringFieldUpdateOperationsInput | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: CommentsUpdateManyWithoutIssuesNestedInput
    projects?: ProjectsUpdateOneWithoutIssuesNestedInput
  }

  export type IssuesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    external_urls?: NullableStringFieldUpdateOperationsInput | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: CommentsUncheckedUpdateManyWithoutIssuesNestedInput
  }

  export type IssuesCreateManyInput = {
    id: string
    title: string
    description: string
    created_at: Date | string
    kanbanorder: string
    username: string
    external_urls?: string | null
    completed_at?: Date | string | null
    status: string
    priority: string
    updated_at?: Date | string | null
    project_id?: string | null
  }

  export type IssuesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    external_urls?: NullableStringFieldUpdateOperationsInput | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IssuesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    external_urls?: NullableStringFieldUpdateOperationsInput | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrgsCreateInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    first_contact: Date | string
    updated_at?: Date | string | null
    website?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: string | null
    linear_id?: string | null
    pivotal_tracker_id?: string | null
    emails?: EmailsCreateNestedOneWithoutOrgsInput
    slack_channels?: Slack_channelsCreateNestedOneWithoutOrgsInput
    projects?: ProjectsCreateNestedManyWithoutOrgsInput
  }

  export type OrgsUncheckedCreateInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    first_contact: Date | string
    updated_at?: Date | string | null
    website?: string | null
    primary_email_address_id?: string | null
    primary_slack_channel_id?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: string | null
    linear_id?: string | null
    pivotal_tracker_id?: string | null
    projects?: ProjectsUncheckedCreateNestedManyWithoutOrgsInput
  }

  export type OrgsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    first_contact?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: NullableStringFieldUpdateOperationsInput | string | null
    linear_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: EmailsUpdateOneWithoutOrgsNestedInput
    slack_channels?: Slack_channelsUpdateOneWithoutOrgsNestedInput
    projects?: ProjectsUpdateManyWithoutOrgsNestedInput
  }

  export type OrgsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    first_contact?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    primary_email_address_id?: NullableStringFieldUpdateOperationsInput | string | null
    primary_slack_channel_id?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: NullableStringFieldUpdateOperationsInput | string | null
    linear_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableStringFieldUpdateOperationsInput | string | null
    projects?: ProjectsUncheckedUpdateManyWithoutOrgsNestedInput
  }

  export type OrgsCreateManyInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    first_contact: Date | string
    updated_at?: Date | string | null
    website?: string | null
    primary_email_address_id?: string | null
    primary_slack_channel_id?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: string | null
    linear_id?: string | null
    pivotal_tracker_id?: string | null
  }

  export type OrgsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    first_contact?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: NullableStringFieldUpdateOperationsInput | string | null
    linear_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrgsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    first_contact?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    primary_email_address_id?: NullableStringFieldUpdateOperationsInput | string | null
    primary_slack_channel_id?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: NullableStringFieldUpdateOperationsInput | string | null
    linear_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectsCreateInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    start_date: Date | string
    end_date?: Date | string | null
    updated_at?: Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: project_status | null
    linear_team_id?: string | null
    pivotal_tracker_id?: bigint | number | null
    issues?: IssuesCreateNestedManyWithoutProjectsInput
    orgs: OrgsCreateNestedOneWithoutProjectsInput
  }

  export type ProjectsUncheckedCreateInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    summary?: string | null
    note?: string | null
    org_id: string
    missive_conversation_id: string
    missive_label_id: string
    start_date: Date | string
    end_date?: Date | string | null
    updated_at?: Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: project_status | null
    linear_team_id?: string | null
    pivotal_tracker_id?: bigint | number | null
    issues?: IssuesUncheckedCreateNestedManyWithoutProjectsInput
  }

  export type ProjectsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableEnumproject_statusFieldUpdateOperationsInput | project_status | null
    linear_team_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    issues?: IssuesUpdateManyWithoutProjectsNestedInput
    orgs?: OrgsUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    org_id?: StringFieldUpdateOperationsInput | string
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableEnumproject_statusFieldUpdateOperationsInput | project_status | null
    linear_team_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    issues?: IssuesUncheckedUpdateManyWithoutProjectsNestedInput
  }

  export type ProjectsCreateManyInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    summary?: string | null
    note?: string | null
    org_id: string
    missive_conversation_id: string
    missive_label_id: string
    start_date: Date | string
    end_date?: Date | string | null
    updated_at?: Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: project_status | null
    linear_team_id?: string | null
    pivotal_tracker_id?: bigint | number | null
  }

  export type ProjectsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableEnumproject_statusFieldUpdateOperationsInput | project_status | null
    linear_team_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type ProjectsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    org_id?: StringFieldUpdateOperationsInput | string
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableEnumproject_statusFieldUpdateOperationsInput | project_status | null
    linear_team_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type Slack_channelsCreateInput = {
    id: string
    created_at: Date | string
    orgs?: OrgsCreateNestedManyWithoutSlack_channelsInput
  }

  export type Slack_channelsUncheckedCreateInput = {
    id: string
    created_at: Date | string
    orgs?: OrgsUncheckedCreateNestedManyWithoutSlack_channelsInput
  }

  export type Slack_channelsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orgs?: OrgsUpdateManyWithoutSlack_channelsNestedInput
  }

  export type Slack_channelsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orgs?: OrgsUncheckedUpdateManyWithoutSlack_channelsNestedInput
  }

  export type Slack_channelsCreateManyInput = {
    id: string
    created_at: Date | string
  }

  export type Slack_channelsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Slack_channelsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidFilter | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type IssuesRelationFilter = {
    is?: IssuesWhereInput
    isNot?: IssuesWhereInput
  }

  export type CommentsCountOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    username?: SortOrder
    issue_id?: SortOrder
    created_at?: SortOrder
  }

  export type CommentsMaxOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    username?: SortOrder
    issue_id?: SortOrder
    created_at?: SortOrder
  }

  export type CommentsMinOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    username?: SortOrder
    issue_id?: SortOrder
    created_at?: SortOrder
  }

  export type UuidWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type OrgsListRelationFilter = {
    every?: OrgsWhereInput
    some?: OrgsWhereInput
    none?: OrgsWhereInput
  }

  export type OrgsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailsCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    email_address?: SortOrder
  }

  export type EmailsMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    email_address?: SortOrder
  }

  export type EmailsMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    email_address?: SortOrder
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type UuidNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidNullableFilter | string | null
  }

  export type CommentsListRelationFilter = {
    every?: CommentsWhereInput
    some?: CommentsWhereInput
    none?: CommentsWhereInput
  }

  export type ProjectsRelationFilter = {
    is?: ProjectsWhereInput | null
    isNot?: ProjectsWhereInput | null
  }

  export type CommentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IssuesCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    kanbanorder?: SortOrder
    username?: SortOrder
    external_urls?: SortOrder
    completed_at?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    updated_at?: SortOrder
    project_id?: SortOrder
  }

  export type IssuesMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    kanbanorder?: SortOrder
    username?: SortOrder
    external_urls?: SortOrder
    completed_at?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    updated_at?: SortOrder
    project_id?: SortOrder
  }

  export type IssuesMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    kanbanorder?: SortOrder
    username?: SortOrder
    external_urls?: SortOrder
    completed_at?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    updated_at?: SortOrder
    project_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type UuidNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }
  export type JsonNullableFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase>, Exclude<keyof Required<JsonNullableFilterBase>, 'path'>>,
        Required<JsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase>, 'path'>>

  export type JsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type EmailsRelationFilter = {
    is?: EmailsWhereInput | null
    isNot?: EmailsWhereInput | null
  }

  export type Slack_channelsRelationFilter = {
    is?: Slack_channelsWhereInput | null
    isNot?: Slack_channelsWhereInput | null
  }

  export type ProjectsListRelationFilter = {
    every?: ProjectsWhereInput
    some?: ProjectsWhereInput
    none?: ProjectsWhereInput
  }

  export type ProjectsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrgsCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    shortname?: SortOrder
    aliases?: SortOrder
    first_contact?: SortOrder
    updated_at?: SortOrder
    website?: SortOrder
    primary_email_address_id?: SortOrder
    primary_slack_channel_id?: SortOrder
    summary?: SortOrder
    note?: SortOrder
    missive_conversation_id?: SortOrder
    missive_label_id?: SortOrder
    history?: SortOrder
    github_id?: SortOrder
    linear_id?: SortOrder
    pivotal_tracker_id?: SortOrder
  }

  export type OrgsMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    shortname?: SortOrder
    aliases?: SortOrder
    first_contact?: SortOrder
    updated_at?: SortOrder
    website?: SortOrder
    primary_email_address_id?: SortOrder
    primary_slack_channel_id?: SortOrder
    summary?: SortOrder
    note?: SortOrder
    missive_conversation_id?: SortOrder
    missive_label_id?: SortOrder
    github_id?: SortOrder
    linear_id?: SortOrder
    pivotal_tracker_id?: SortOrder
  }

  export type OrgsMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    shortname?: SortOrder
    aliases?: SortOrder
    first_contact?: SortOrder
    updated_at?: SortOrder
    website?: SortOrder
    primary_email_address_id?: SortOrder
    primary_slack_channel_id?: SortOrder
    summary?: SortOrder
    note?: SortOrder
    missive_conversation_id?: SortOrder
    missive_label_id?: SortOrder
    github_id?: SortOrder
    linear_id?: SortOrder
    pivotal_tracker_id?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntNullableFilter
    _min?: NestedJsonNullableFilter
    _max?: NestedJsonNullableFilter
  }

  export type Enumproject_statusNullableFilter = {
    equals?: project_status | null
    in?: Enumerable<project_status> | null
    notIn?: Enumerable<project_status> | null
    not?: NestedEnumproject_statusNullableFilter | project_status | null
  }

  export type BigIntNullableFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableFilter | bigint | number | null
  }

  export type IssuesListRelationFilter = {
    every?: IssuesWhereInput
    some?: IssuesWhereInput
    none?: IssuesWhereInput
  }

  export type OrgsRelationFilter = {
    is?: OrgsWhereInput
    isNot?: OrgsWhereInput
  }

  export type IssuesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectsCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    shortname?: SortOrder
    aliases?: SortOrder
    summary?: SortOrder
    note?: SortOrder
    org_id?: SortOrder
    missive_conversation_id?: SortOrder
    missive_label_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    updated_at?: SortOrder
    history?: SortOrder
    status?: SortOrder
    linear_team_id?: SortOrder
    pivotal_tracker_id?: SortOrder
  }

  export type ProjectsAvgOrderByAggregateInput = {
    pivotal_tracker_id?: SortOrder
  }

  export type ProjectsMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    shortname?: SortOrder
    aliases?: SortOrder
    summary?: SortOrder
    note?: SortOrder
    org_id?: SortOrder
    missive_conversation_id?: SortOrder
    missive_label_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    updated_at?: SortOrder
    status?: SortOrder
    linear_team_id?: SortOrder
    pivotal_tracker_id?: SortOrder
  }

  export type ProjectsMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    shortname?: SortOrder
    aliases?: SortOrder
    summary?: SortOrder
    note?: SortOrder
    org_id?: SortOrder
    missive_conversation_id?: SortOrder
    missive_label_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    updated_at?: SortOrder
    status?: SortOrder
    linear_team_id?: SortOrder
    pivotal_tracker_id?: SortOrder
  }

  export type ProjectsSumOrderByAggregateInput = {
    pivotal_tracker_id?: SortOrder
  }

  export type Enumproject_statusNullableWithAggregatesFilter = {
    equals?: project_status | null
    in?: Enumerable<project_status> | null
    notIn?: Enumerable<project_status> | null
    not?: NestedEnumproject_statusNullableWithAggregatesFilter | project_status | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumproject_statusNullableFilter
    _max?: NestedEnumproject_statusNullableFilter
  }

  export type BigIntNullableWithAggregatesFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableWithAggregatesFilter | bigint | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedBigIntNullableFilter
    _min?: NestedBigIntNullableFilter
    _max?: NestedBigIntNullableFilter
  }

  export type Slack_channelsCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
  }

  export type Slack_channelsMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
  }

  export type Slack_channelsMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
  }

  export type IssuesCreateNestedOneWithoutCommentsInput = {
    create?: XOR<IssuesCreateWithoutCommentsInput, IssuesUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: IssuesCreateOrConnectWithoutCommentsInput
    connect?: IssuesWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IssuesUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<IssuesCreateWithoutCommentsInput, IssuesUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: IssuesCreateOrConnectWithoutCommentsInput
    upsert?: IssuesUpsertWithoutCommentsInput
    connect?: IssuesWhereUniqueInput
    update?: XOR<IssuesUpdateWithoutCommentsInput, IssuesUncheckedUpdateWithoutCommentsInput>
  }

  export type OrgsCreateNestedManyWithoutEmailsInput = {
    create?: XOR<Enumerable<OrgsCreateWithoutEmailsInput>, Enumerable<OrgsUncheckedCreateWithoutEmailsInput>>
    connectOrCreate?: Enumerable<OrgsCreateOrConnectWithoutEmailsInput>
    createMany?: OrgsCreateManyEmailsInputEnvelope
    connect?: Enumerable<OrgsWhereUniqueInput>
  }

  export type OrgsUncheckedCreateNestedManyWithoutEmailsInput = {
    create?: XOR<Enumerable<OrgsCreateWithoutEmailsInput>, Enumerable<OrgsUncheckedCreateWithoutEmailsInput>>
    connectOrCreate?: Enumerable<OrgsCreateOrConnectWithoutEmailsInput>
    createMany?: OrgsCreateManyEmailsInputEnvelope
    connect?: Enumerable<OrgsWhereUniqueInput>
  }

  export type OrgsUpdateManyWithoutEmailsNestedInput = {
    create?: XOR<Enumerable<OrgsCreateWithoutEmailsInput>, Enumerable<OrgsUncheckedCreateWithoutEmailsInput>>
    connectOrCreate?: Enumerable<OrgsCreateOrConnectWithoutEmailsInput>
    upsert?: Enumerable<OrgsUpsertWithWhereUniqueWithoutEmailsInput>
    createMany?: OrgsCreateManyEmailsInputEnvelope
    set?: Enumerable<OrgsWhereUniqueInput>
    disconnect?: Enumerable<OrgsWhereUniqueInput>
    delete?: Enumerable<OrgsWhereUniqueInput>
    connect?: Enumerable<OrgsWhereUniqueInput>
    update?: Enumerable<OrgsUpdateWithWhereUniqueWithoutEmailsInput>
    updateMany?: Enumerable<OrgsUpdateManyWithWhereWithoutEmailsInput>
    deleteMany?: Enumerable<OrgsScalarWhereInput>
  }

  export type OrgsUncheckedUpdateManyWithoutEmailsNestedInput = {
    create?: XOR<Enumerable<OrgsCreateWithoutEmailsInput>, Enumerable<OrgsUncheckedCreateWithoutEmailsInput>>
    connectOrCreate?: Enumerable<OrgsCreateOrConnectWithoutEmailsInput>
    upsert?: Enumerable<OrgsUpsertWithWhereUniqueWithoutEmailsInput>
    createMany?: OrgsCreateManyEmailsInputEnvelope
    set?: Enumerable<OrgsWhereUniqueInput>
    disconnect?: Enumerable<OrgsWhereUniqueInput>
    delete?: Enumerable<OrgsWhereUniqueInput>
    connect?: Enumerable<OrgsWhereUniqueInput>
    update?: Enumerable<OrgsUpdateWithWhereUniqueWithoutEmailsInput>
    updateMany?: Enumerable<OrgsUpdateManyWithWhereWithoutEmailsInput>
    deleteMany?: Enumerable<OrgsScalarWhereInput>
  }

  export type CommentsCreateNestedManyWithoutIssuesInput = {
    create?: XOR<Enumerable<CommentsCreateWithoutIssuesInput>, Enumerable<CommentsUncheckedCreateWithoutIssuesInput>>
    connectOrCreate?: Enumerable<CommentsCreateOrConnectWithoutIssuesInput>
    createMany?: CommentsCreateManyIssuesInputEnvelope
    connect?: Enumerable<CommentsWhereUniqueInput>
  }

  export type ProjectsCreateNestedOneWithoutIssuesInput = {
    create?: XOR<ProjectsCreateWithoutIssuesInput, ProjectsUncheckedCreateWithoutIssuesInput>
    connectOrCreate?: ProjectsCreateOrConnectWithoutIssuesInput
    connect?: ProjectsWhereUniqueInput
  }

  export type CommentsUncheckedCreateNestedManyWithoutIssuesInput = {
    create?: XOR<Enumerable<CommentsCreateWithoutIssuesInput>, Enumerable<CommentsUncheckedCreateWithoutIssuesInput>>
    connectOrCreate?: Enumerable<CommentsCreateOrConnectWithoutIssuesInput>
    createMany?: CommentsCreateManyIssuesInputEnvelope
    connect?: Enumerable<CommentsWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CommentsUpdateManyWithoutIssuesNestedInput = {
    create?: XOR<Enumerable<CommentsCreateWithoutIssuesInput>, Enumerable<CommentsUncheckedCreateWithoutIssuesInput>>
    connectOrCreate?: Enumerable<CommentsCreateOrConnectWithoutIssuesInput>
    upsert?: Enumerable<CommentsUpsertWithWhereUniqueWithoutIssuesInput>
    createMany?: CommentsCreateManyIssuesInputEnvelope
    set?: Enumerable<CommentsWhereUniqueInput>
    disconnect?: Enumerable<CommentsWhereUniqueInput>
    delete?: Enumerable<CommentsWhereUniqueInput>
    connect?: Enumerable<CommentsWhereUniqueInput>
    update?: Enumerable<CommentsUpdateWithWhereUniqueWithoutIssuesInput>
    updateMany?: Enumerable<CommentsUpdateManyWithWhereWithoutIssuesInput>
    deleteMany?: Enumerable<CommentsScalarWhereInput>
  }

  export type ProjectsUpdateOneWithoutIssuesNestedInput = {
    create?: XOR<ProjectsCreateWithoutIssuesInput, ProjectsUncheckedCreateWithoutIssuesInput>
    connectOrCreate?: ProjectsCreateOrConnectWithoutIssuesInput
    upsert?: ProjectsUpsertWithoutIssuesInput
    disconnect?: boolean
    delete?: boolean
    connect?: ProjectsWhereUniqueInput
    update?: XOR<ProjectsUpdateWithoutIssuesInput, ProjectsUncheckedUpdateWithoutIssuesInput>
  }

  export type CommentsUncheckedUpdateManyWithoutIssuesNestedInput = {
    create?: XOR<Enumerable<CommentsCreateWithoutIssuesInput>, Enumerable<CommentsUncheckedCreateWithoutIssuesInput>>
    connectOrCreate?: Enumerable<CommentsCreateOrConnectWithoutIssuesInput>
    upsert?: Enumerable<CommentsUpsertWithWhereUniqueWithoutIssuesInput>
    createMany?: CommentsCreateManyIssuesInputEnvelope
    set?: Enumerable<CommentsWhereUniqueInput>
    disconnect?: Enumerable<CommentsWhereUniqueInput>
    delete?: Enumerable<CommentsWhereUniqueInput>
    connect?: Enumerable<CommentsWhereUniqueInput>
    update?: Enumerable<CommentsUpdateWithWhereUniqueWithoutIssuesInput>
    updateMany?: Enumerable<CommentsUpdateManyWithWhereWithoutIssuesInput>
    deleteMany?: Enumerable<CommentsScalarWhereInput>
  }

  export type EmailsCreateNestedOneWithoutOrgsInput = {
    create?: XOR<EmailsCreateWithoutOrgsInput, EmailsUncheckedCreateWithoutOrgsInput>
    connectOrCreate?: EmailsCreateOrConnectWithoutOrgsInput
    connect?: EmailsWhereUniqueInput
  }

  export type Slack_channelsCreateNestedOneWithoutOrgsInput = {
    create?: XOR<Slack_channelsCreateWithoutOrgsInput, Slack_channelsUncheckedCreateWithoutOrgsInput>
    connectOrCreate?: Slack_channelsCreateOrConnectWithoutOrgsInput
    connect?: Slack_channelsWhereUniqueInput
  }

  export type ProjectsCreateNestedManyWithoutOrgsInput = {
    create?: XOR<Enumerable<ProjectsCreateWithoutOrgsInput>, Enumerable<ProjectsUncheckedCreateWithoutOrgsInput>>
    connectOrCreate?: Enumerable<ProjectsCreateOrConnectWithoutOrgsInput>
    createMany?: ProjectsCreateManyOrgsInputEnvelope
    connect?: Enumerable<ProjectsWhereUniqueInput>
  }

  export type ProjectsUncheckedCreateNestedManyWithoutOrgsInput = {
    create?: XOR<Enumerable<ProjectsCreateWithoutOrgsInput>, Enumerable<ProjectsUncheckedCreateWithoutOrgsInput>>
    connectOrCreate?: Enumerable<ProjectsCreateOrConnectWithoutOrgsInput>
    createMany?: ProjectsCreateManyOrgsInputEnvelope
    connect?: Enumerable<ProjectsWhereUniqueInput>
  }

  export type EmailsUpdateOneWithoutOrgsNestedInput = {
    create?: XOR<EmailsCreateWithoutOrgsInput, EmailsUncheckedCreateWithoutOrgsInput>
    connectOrCreate?: EmailsCreateOrConnectWithoutOrgsInput
    upsert?: EmailsUpsertWithoutOrgsInput
    disconnect?: boolean
    delete?: boolean
    connect?: EmailsWhereUniqueInput
    update?: XOR<EmailsUpdateWithoutOrgsInput, EmailsUncheckedUpdateWithoutOrgsInput>
  }

  export type Slack_channelsUpdateOneWithoutOrgsNestedInput = {
    create?: XOR<Slack_channelsCreateWithoutOrgsInput, Slack_channelsUncheckedCreateWithoutOrgsInput>
    connectOrCreate?: Slack_channelsCreateOrConnectWithoutOrgsInput
    upsert?: Slack_channelsUpsertWithoutOrgsInput
    disconnect?: boolean
    delete?: boolean
    connect?: Slack_channelsWhereUniqueInput
    update?: XOR<Slack_channelsUpdateWithoutOrgsInput, Slack_channelsUncheckedUpdateWithoutOrgsInput>
  }

  export type ProjectsUpdateManyWithoutOrgsNestedInput = {
    create?: XOR<Enumerable<ProjectsCreateWithoutOrgsInput>, Enumerable<ProjectsUncheckedCreateWithoutOrgsInput>>
    connectOrCreate?: Enumerable<ProjectsCreateOrConnectWithoutOrgsInput>
    upsert?: Enumerable<ProjectsUpsertWithWhereUniqueWithoutOrgsInput>
    createMany?: ProjectsCreateManyOrgsInputEnvelope
    set?: Enumerable<ProjectsWhereUniqueInput>
    disconnect?: Enumerable<ProjectsWhereUniqueInput>
    delete?: Enumerable<ProjectsWhereUniqueInput>
    connect?: Enumerable<ProjectsWhereUniqueInput>
    update?: Enumerable<ProjectsUpdateWithWhereUniqueWithoutOrgsInput>
    updateMany?: Enumerable<ProjectsUpdateManyWithWhereWithoutOrgsInput>
    deleteMany?: Enumerable<ProjectsScalarWhereInput>
  }

  export type ProjectsUncheckedUpdateManyWithoutOrgsNestedInput = {
    create?: XOR<Enumerable<ProjectsCreateWithoutOrgsInput>, Enumerable<ProjectsUncheckedCreateWithoutOrgsInput>>
    connectOrCreate?: Enumerable<ProjectsCreateOrConnectWithoutOrgsInput>
    upsert?: Enumerable<ProjectsUpsertWithWhereUniqueWithoutOrgsInput>
    createMany?: ProjectsCreateManyOrgsInputEnvelope
    set?: Enumerable<ProjectsWhereUniqueInput>
    disconnect?: Enumerable<ProjectsWhereUniqueInput>
    delete?: Enumerable<ProjectsWhereUniqueInput>
    connect?: Enumerable<ProjectsWhereUniqueInput>
    update?: Enumerable<ProjectsUpdateWithWhereUniqueWithoutOrgsInput>
    updateMany?: Enumerable<ProjectsUpdateManyWithWhereWithoutOrgsInput>
    deleteMany?: Enumerable<ProjectsScalarWhereInput>
  }

  export type IssuesCreateNestedManyWithoutProjectsInput = {
    create?: XOR<Enumerable<IssuesCreateWithoutProjectsInput>, Enumerable<IssuesUncheckedCreateWithoutProjectsInput>>
    connectOrCreate?: Enumerable<IssuesCreateOrConnectWithoutProjectsInput>
    createMany?: IssuesCreateManyProjectsInputEnvelope
    connect?: Enumerable<IssuesWhereUniqueInput>
  }

  export type OrgsCreateNestedOneWithoutProjectsInput = {
    create?: XOR<OrgsCreateWithoutProjectsInput, OrgsUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: OrgsCreateOrConnectWithoutProjectsInput
    connect?: OrgsWhereUniqueInput
  }

  export type IssuesUncheckedCreateNestedManyWithoutProjectsInput = {
    create?: XOR<Enumerable<IssuesCreateWithoutProjectsInput>, Enumerable<IssuesUncheckedCreateWithoutProjectsInput>>
    connectOrCreate?: Enumerable<IssuesCreateOrConnectWithoutProjectsInput>
    createMany?: IssuesCreateManyProjectsInputEnvelope
    connect?: Enumerable<IssuesWhereUniqueInput>
  }

  export type NullableEnumproject_statusFieldUpdateOperationsInput = {
    set?: project_status | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type IssuesUpdateManyWithoutProjectsNestedInput = {
    create?: XOR<Enumerable<IssuesCreateWithoutProjectsInput>, Enumerable<IssuesUncheckedCreateWithoutProjectsInput>>
    connectOrCreate?: Enumerable<IssuesCreateOrConnectWithoutProjectsInput>
    upsert?: Enumerable<IssuesUpsertWithWhereUniqueWithoutProjectsInput>
    createMany?: IssuesCreateManyProjectsInputEnvelope
    set?: Enumerable<IssuesWhereUniqueInput>
    disconnect?: Enumerable<IssuesWhereUniqueInput>
    delete?: Enumerable<IssuesWhereUniqueInput>
    connect?: Enumerable<IssuesWhereUniqueInput>
    update?: Enumerable<IssuesUpdateWithWhereUniqueWithoutProjectsInput>
    updateMany?: Enumerable<IssuesUpdateManyWithWhereWithoutProjectsInput>
    deleteMany?: Enumerable<IssuesScalarWhereInput>
  }

  export type OrgsUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<OrgsCreateWithoutProjectsInput, OrgsUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: OrgsCreateOrConnectWithoutProjectsInput
    upsert?: OrgsUpsertWithoutProjectsInput
    connect?: OrgsWhereUniqueInput
    update?: XOR<OrgsUpdateWithoutProjectsInput, OrgsUncheckedUpdateWithoutProjectsInput>
  }

  export type IssuesUncheckedUpdateManyWithoutProjectsNestedInput = {
    create?: XOR<Enumerable<IssuesCreateWithoutProjectsInput>, Enumerable<IssuesUncheckedCreateWithoutProjectsInput>>
    connectOrCreate?: Enumerable<IssuesCreateOrConnectWithoutProjectsInput>
    upsert?: Enumerable<IssuesUpsertWithWhereUniqueWithoutProjectsInput>
    createMany?: IssuesCreateManyProjectsInputEnvelope
    set?: Enumerable<IssuesWhereUniqueInput>
    disconnect?: Enumerable<IssuesWhereUniqueInput>
    delete?: Enumerable<IssuesWhereUniqueInput>
    connect?: Enumerable<IssuesWhereUniqueInput>
    update?: Enumerable<IssuesUpdateWithWhereUniqueWithoutProjectsInput>
    updateMany?: Enumerable<IssuesUpdateManyWithWhereWithoutProjectsInput>
    deleteMany?: Enumerable<IssuesScalarWhereInput>
  }

  export type OrgsCreateNestedManyWithoutSlack_channelsInput = {
    create?: XOR<Enumerable<OrgsCreateWithoutSlack_channelsInput>, Enumerable<OrgsUncheckedCreateWithoutSlack_channelsInput>>
    connectOrCreate?: Enumerable<OrgsCreateOrConnectWithoutSlack_channelsInput>
    createMany?: OrgsCreateManySlack_channelsInputEnvelope
    connect?: Enumerable<OrgsWhereUniqueInput>
  }

  export type OrgsUncheckedCreateNestedManyWithoutSlack_channelsInput = {
    create?: XOR<Enumerable<OrgsCreateWithoutSlack_channelsInput>, Enumerable<OrgsUncheckedCreateWithoutSlack_channelsInput>>
    connectOrCreate?: Enumerable<OrgsCreateOrConnectWithoutSlack_channelsInput>
    createMany?: OrgsCreateManySlack_channelsInputEnvelope
    connect?: Enumerable<OrgsWhereUniqueInput>
  }

  export type OrgsUpdateManyWithoutSlack_channelsNestedInput = {
    create?: XOR<Enumerable<OrgsCreateWithoutSlack_channelsInput>, Enumerable<OrgsUncheckedCreateWithoutSlack_channelsInput>>
    connectOrCreate?: Enumerable<OrgsCreateOrConnectWithoutSlack_channelsInput>
    upsert?: Enumerable<OrgsUpsertWithWhereUniqueWithoutSlack_channelsInput>
    createMany?: OrgsCreateManySlack_channelsInputEnvelope
    set?: Enumerable<OrgsWhereUniqueInput>
    disconnect?: Enumerable<OrgsWhereUniqueInput>
    delete?: Enumerable<OrgsWhereUniqueInput>
    connect?: Enumerable<OrgsWhereUniqueInput>
    update?: Enumerable<OrgsUpdateWithWhereUniqueWithoutSlack_channelsInput>
    updateMany?: Enumerable<OrgsUpdateManyWithWhereWithoutSlack_channelsInput>
    deleteMany?: Enumerable<OrgsScalarWhereInput>
  }

  export type OrgsUncheckedUpdateManyWithoutSlack_channelsNestedInput = {
    create?: XOR<Enumerable<OrgsCreateWithoutSlack_channelsInput>, Enumerable<OrgsUncheckedCreateWithoutSlack_channelsInput>>
    connectOrCreate?: Enumerable<OrgsCreateOrConnectWithoutSlack_channelsInput>
    upsert?: Enumerable<OrgsUpsertWithWhereUniqueWithoutSlack_channelsInput>
    createMany?: OrgsCreateManySlack_channelsInputEnvelope
    set?: Enumerable<OrgsWhereUniqueInput>
    disconnect?: Enumerable<OrgsWhereUniqueInput>
    delete?: Enumerable<OrgsWhereUniqueInput>
    connect?: Enumerable<OrgsWhereUniqueInput>
    update?: Enumerable<OrgsUpdateWithWhereUniqueWithoutSlack_channelsInput>
    updateMany?: Enumerable<OrgsUpdateManyWithWhereWithoutSlack_channelsInput>
    deleteMany?: Enumerable<OrgsScalarWhereInput>
  }

  export type NestedUuidFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidFilter | string
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedUuidWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedUuidNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedUuidNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }
  export type NestedJsonNullableFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase>, Exclude<keyof Required<NestedJsonNullableFilterBase>, 'path'>>,
        Required<NestedJsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase>, 'path'>>

  export type NestedJsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type NestedEnumproject_statusNullableFilter = {
    equals?: project_status | null
    in?: Enumerable<project_status> | null
    notIn?: Enumerable<project_status> | null
    not?: NestedEnumproject_statusNullableFilter | project_status | null
  }

  export type NestedBigIntNullableFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableFilter | bigint | number | null
  }

  export type NestedEnumproject_statusNullableWithAggregatesFilter = {
    equals?: project_status | null
    in?: Enumerable<project_status> | null
    notIn?: Enumerable<project_status> | null
    not?: NestedEnumproject_statusNullableWithAggregatesFilter | project_status | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumproject_statusNullableFilter
    _max?: NestedEnumproject_statusNullableFilter
  }

  export type NestedBigIntNullableWithAggregatesFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableWithAggregatesFilter | bigint | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedBigIntNullableFilter
    _min?: NestedBigIntNullableFilter
    _max?: NestedBigIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type IssuesCreateWithoutCommentsInput = {
    id: string
    title: string
    description: string
    created_at: Date | string
    kanbanorder: string
    username: string
    external_urls?: string | null
    completed_at?: Date | string | null
    status: string
    priority: string
    updated_at?: Date | string | null
    projects?: ProjectsCreateNestedOneWithoutIssuesInput
  }

  export type IssuesUncheckedCreateWithoutCommentsInput = {
    id: string
    title: string
    description: string
    created_at: Date | string
    kanbanorder: string
    username: string
    external_urls?: string | null
    completed_at?: Date | string | null
    status: string
    priority: string
    updated_at?: Date | string | null
    project_id?: string | null
  }

  export type IssuesCreateOrConnectWithoutCommentsInput = {
    where: IssuesWhereUniqueInput
    create: XOR<IssuesCreateWithoutCommentsInput, IssuesUncheckedCreateWithoutCommentsInput>
  }

  export type IssuesUpsertWithoutCommentsInput = {
    update: XOR<IssuesUpdateWithoutCommentsInput, IssuesUncheckedUpdateWithoutCommentsInput>
    create: XOR<IssuesCreateWithoutCommentsInput, IssuesUncheckedCreateWithoutCommentsInput>
  }

  export type IssuesUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    external_urls?: NullableStringFieldUpdateOperationsInput | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: ProjectsUpdateOneWithoutIssuesNestedInput
  }

  export type IssuesUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    external_urls?: NullableStringFieldUpdateOperationsInput | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrgsCreateWithoutEmailsInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    first_contact: Date | string
    updated_at?: Date | string | null
    website?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: string | null
    linear_id?: string | null
    pivotal_tracker_id?: string | null
    slack_channels?: Slack_channelsCreateNestedOneWithoutOrgsInput
    projects?: ProjectsCreateNestedManyWithoutOrgsInput
  }

  export type OrgsUncheckedCreateWithoutEmailsInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    first_contact: Date | string
    updated_at?: Date | string | null
    website?: string | null
    primary_slack_channel_id?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: string | null
    linear_id?: string | null
    pivotal_tracker_id?: string | null
    projects?: ProjectsUncheckedCreateNestedManyWithoutOrgsInput
  }

  export type OrgsCreateOrConnectWithoutEmailsInput = {
    where: OrgsWhereUniqueInput
    create: XOR<OrgsCreateWithoutEmailsInput, OrgsUncheckedCreateWithoutEmailsInput>
  }

  export type OrgsCreateManyEmailsInputEnvelope = {
    data: Enumerable<OrgsCreateManyEmailsInput>
    skipDuplicates?: boolean
  }

  export type OrgsUpsertWithWhereUniqueWithoutEmailsInput = {
    where: OrgsWhereUniqueInput
    update: XOR<OrgsUpdateWithoutEmailsInput, OrgsUncheckedUpdateWithoutEmailsInput>
    create: XOR<OrgsCreateWithoutEmailsInput, OrgsUncheckedCreateWithoutEmailsInput>
  }

  export type OrgsUpdateWithWhereUniqueWithoutEmailsInput = {
    where: OrgsWhereUniqueInput
    data: XOR<OrgsUpdateWithoutEmailsInput, OrgsUncheckedUpdateWithoutEmailsInput>
  }

  export type OrgsUpdateManyWithWhereWithoutEmailsInput = {
    where: OrgsScalarWhereInput
    data: XOR<OrgsUpdateManyMutationInput, OrgsUncheckedUpdateManyWithoutOrgsInput>
  }

  export type OrgsScalarWhereInput = {
    AND?: Enumerable<OrgsScalarWhereInput>
    OR?: Enumerable<OrgsScalarWhereInput>
    NOT?: Enumerable<OrgsScalarWhereInput>
    id?: UuidFilter | string
    created_at?: DateTimeFilter | Date | string
    name?: StringFilter | string
    shortname?: StringFilter | string
    aliases?: StringNullableFilter | string | null
    first_contact?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    website?: StringNullableFilter | string | null
    primary_email_address_id?: UuidNullableFilter | string | null
    primary_slack_channel_id?: UuidNullableFilter | string | null
    summary?: StringNullableFilter | string | null
    note?: StringNullableFilter | string | null
    missive_conversation_id?: UuidFilter | string
    missive_label_id?: UuidFilter | string
    history?: JsonNullableFilter
    github_id?: UuidNullableFilter | string | null
    linear_id?: UuidNullableFilter | string | null
    pivotal_tracker_id?: UuidNullableFilter | string | null
  }

  export type CommentsCreateWithoutIssuesInput = {
    id: string
    body: string
    username: string
    created_at: Date | string
  }

  export type CommentsUncheckedCreateWithoutIssuesInput = {
    id: string
    body: string
    username: string
    created_at: Date | string
  }

  export type CommentsCreateOrConnectWithoutIssuesInput = {
    where: CommentsWhereUniqueInput
    create: XOR<CommentsCreateWithoutIssuesInput, CommentsUncheckedCreateWithoutIssuesInput>
  }

  export type CommentsCreateManyIssuesInputEnvelope = {
    data: Enumerable<CommentsCreateManyIssuesInput>
    skipDuplicates?: boolean
  }

  export type ProjectsCreateWithoutIssuesInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    start_date: Date | string
    end_date?: Date | string | null
    updated_at?: Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: project_status | null
    linear_team_id?: string | null
    pivotal_tracker_id?: bigint | number | null
    orgs: OrgsCreateNestedOneWithoutProjectsInput
  }

  export type ProjectsUncheckedCreateWithoutIssuesInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    summary?: string | null
    note?: string | null
    org_id: string
    missive_conversation_id: string
    missive_label_id: string
    start_date: Date | string
    end_date?: Date | string | null
    updated_at?: Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: project_status | null
    linear_team_id?: string | null
    pivotal_tracker_id?: bigint | number | null
  }

  export type ProjectsCreateOrConnectWithoutIssuesInput = {
    where: ProjectsWhereUniqueInput
    create: XOR<ProjectsCreateWithoutIssuesInput, ProjectsUncheckedCreateWithoutIssuesInput>
  }

  export type CommentsUpsertWithWhereUniqueWithoutIssuesInput = {
    where: CommentsWhereUniqueInput
    update: XOR<CommentsUpdateWithoutIssuesInput, CommentsUncheckedUpdateWithoutIssuesInput>
    create: XOR<CommentsCreateWithoutIssuesInput, CommentsUncheckedCreateWithoutIssuesInput>
  }

  export type CommentsUpdateWithWhereUniqueWithoutIssuesInput = {
    where: CommentsWhereUniqueInput
    data: XOR<CommentsUpdateWithoutIssuesInput, CommentsUncheckedUpdateWithoutIssuesInput>
  }

  export type CommentsUpdateManyWithWhereWithoutIssuesInput = {
    where: CommentsScalarWhereInput
    data: XOR<CommentsUpdateManyMutationInput, CommentsUncheckedUpdateManyWithoutCommentsInput>
  }

  export type CommentsScalarWhereInput = {
    AND?: Enumerable<CommentsScalarWhereInput>
    OR?: Enumerable<CommentsScalarWhereInput>
    NOT?: Enumerable<CommentsScalarWhereInput>
    id?: UuidFilter | string
    body?: StringFilter | string
    username?: StringFilter | string
    issue_id?: UuidFilter | string
    created_at?: DateTimeFilter | Date | string
  }

  export type ProjectsUpsertWithoutIssuesInput = {
    update: XOR<ProjectsUpdateWithoutIssuesInput, ProjectsUncheckedUpdateWithoutIssuesInput>
    create: XOR<ProjectsCreateWithoutIssuesInput, ProjectsUncheckedCreateWithoutIssuesInput>
  }

  export type ProjectsUpdateWithoutIssuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableEnumproject_statusFieldUpdateOperationsInput | project_status | null
    linear_team_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    orgs?: OrgsUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectsUncheckedUpdateWithoutIssuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    org_id?: StringFieldUpdateOperationsInput | string
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableEnumproject_statusFieldUpdateOperationsInput | project_status | null
    linear_team_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type EmailsCreateWithoutOrgsInput = {
    id: string
    created_at: Date | string
    email_address: string
  }

  export type EmailsUncheckedCreateWithoutOrgsInput = {
    id: string
    created_at: Date | string
    email_address: string
  }

  export type EmailsCreateOrConnectWithoutOrgsInput = {
    where: EmailsWhereUniqueInput
    create: XOR<EmailsCreateWithoutOrgsInput, EmailsUncheckedCreateWithoutOrgsInput>
  }

  export type Slack_channelsCreateWithoutOrgsInput = {
    id: string
    created_at: Date | string
  }

  export type Slack_channelsUncheckedCreateWithoutOrgsInput = {
    id: string
    created_at: Date | string
  }

  export type Slack_channelsCreateOrConnectWithoutOrgsInput = {
    where: Slack_channelsWhereUniqueInput
    create: XOR<Slack_channelsCreateWithoutOrgsInput, Slack_channelsUncheckedCreateWithoutOrgsInput>
  }

  export type ProjectsCreateWithoutOrgsInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    start_date: Date | string
    end_date?: Date | string | null
    updated_at?: Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: project_status | null
    linear_team_id?: string | null
    pivotal_tracker_id?: bigint | number | null
    issues?: IssuesCreateNestedManyWithoutProjectsInput
  }

  export type ProjectsUncheckedCreateWithoutOrgsInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    start_date: Date | string
    end_date?: Date | string | null
    updated_at?: Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: project_status | null
    linear_team_id?: string | null
    pivotal_tracker_id?: bigint | number | null
    issues?: IssuesUncheckedCreateNestedManyWithoutProjectsInput
  }

  export type ProjectsCreateOrConnectWithoutOrgsInput = {
    where: ProjectsWhereUniqueInput
    create: XOR<ProjectsCreateWithoutOrgsInput, ProjectsUncheckedCreateWithoutOrgsInput>
  }

  export type ProjectsCreateManyOrgsInputEnvelope = {
    data: Enumerable<ProjectsCreateManyOrgsInput>
    skipDuplicates?: boolean
  }

  export type EmailsUpsertWithoutOrgsInput = {
    update: XOR<EmailsUpdateWithoutOrgsInput, EmailsUncheckedUpdateWithoutOrgsInput>
    create: XOR<EmailsCreateWithoutOrgsInput, EmailsUncheckedCreateWithoutOrgsInput>
  }

  export type EmailsUpdateWithoutOrgsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_address?: StringFieldUpdateOperationsInput | string
  }

  export type EmailsUncheckedUpdateWithoutOrgsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email_address?: StringFieldUpdateOperationsInput | string
  }

  export type Slack_channelsUpsertWithoutOrgsInput = {
    update: XOR<Slack_channelsUpdateWithoutOrgsInput, Slack_channelsUncheckedUpdateWithoutOrgsInput>
    create: XOR<Slack_channelsCreateWithoutOrgsInput, Slack_channelsUncheckedCreateWithoutOrgsInput>
  }

  export type Slack_channelsUpdateWithoutOrgsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Slack_channelsUncheckedUpdateWithoutOrgsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectsUpsertWithWhereUniqueWithoutOrgsInput = {
    where: ProjectsWhereUniqueInput
    update: XOR<ProjectsUpdateWithoutOrgsInput, ProjectsUncheckedUpdateWithoutOrgsInput>
    create: XOR<ProjectsCreateWithoutOrgsInput, ProjectsUncheckedCreateWithoutOrgsInput>
  }

  export type ProjectsUpdateWithWhereUniqueWithoutOrgsInput = {
    where: ProjectsWhereUniqueInput
    data: XOR<ProjectsUpdateWithoutOrgsInput, ProjectsUncheckedUpdateWithoutOrgsInput>
  }

  export type ProjectsUpdateManyWithWhereWithoutOrgsInput = {
    where: ProjectsScalarWhereInput
    data: XOR<ProjectsUpdateManyMutationInput, ProjectsUncheckedUpdateManyWithoutProjectsInput>
  }

  export type ProjectsScalarWhereInput = {
    AND?: Enumerable<ProjectsScalarWhereInput>
    OR?: Enumerable<ProjectsScalarWhereInput>
    NOT?: Enumerable<ProjectsScalarWhereInput>
    id?: UuidFilter | string
    created_at?: DateTimeFilter | Date | string
    name?: StringFilter | string
    shortname?: StringFilter | string
    aliases?: StringNullableFilter | string | null
    summary?: StringNullableFilter | string | null
    note?: StringNullableFilter | string | null
    org_id?: UuidFilter | string
    missive_conversation_id?: UuidFilter | string
    missive_label_id?: UuidFilter | string
    start_date?: DateTimeFilter | Date | string
    end_date?: DateTimeNullableFilter | Date | string | null
    updated_at?: DateTimeNullableFilter | Date | string | null
    history?: JsonNullableFilter
    status?: Enumproject_statusNullableFilter | project_status | null
    linear_team_id?: UuidNullableFilter | string | null
    pivotal_tracker_id?: BigIntNullableFilter | bigint | number | null
  }

  export type IssuesCreateWithoutProjectsInput = {
    id: string
    title: string
    description: string
    created_at: Date | string
    kanbanorder: string
    username: string
    external_urls?: string | null
    completed_at?: Date | string | null
    status: string
    priority: string
    updated_at?: Date | string | null
    comments?: CommentsCreateNestedManyWithoutIssuesInput
  }

  export type IssuesUncheckedCreateWithoutProjectsInput = {
    id: string
    title: string
    description: string
    created_at: Date | string
    kanbanorder: string
    username: string
    external_urls?: string | null
    completed_at?: Date | string | null
    status: string
    priority: string
    updated_at?: Date | string | null
    comments?: CommentsUncheckedCreateNestedManyWithoutIssuesInput
  }

  export type IssuesCreateOrConnectWithoutProjectsInput = {
    where: IssuesWhereUniqueInput
    create: XOR<IssuesCreateWithoutProjectsInput, IssuesUncheckedCreateWithoutProjectsInput>
  }

  export type IssuesCreateManyProjectsInputEnvelope = {
    data: Enumerable<IssuesCreateManyProjectsInput>
    skipDuplicates?: boolean
  }

  export type OrgsCreateWithoutProjectsInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    first_contact: Date | string
    updated_at?: Date | string | null
    website?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: string | null
    linear_id?: string | null
    pivotal_tracker_id?: string | null
    emails?: EmailsCreateNestedOneWithoutOrgsInput
    slack_channels?: Slack_channelsCreateNestedOneWithoutOrgsInput
  }

  export type OrgsUncheckedCreateWithoutProjectsInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    first_contact: Date | string
    updated_at?: Date | string | null
    website?: string | null
    primary_email_address_id?: string | null
    primary_slack_channel_id?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: string | null
    linear_id?: string | null
    pivotal_tracker_id?: string | null
  }

  export type OrgsCreateOrConnectWithoutProjectsInput = {
    where: OrgsWhereUniqueInput
    create: XOR<OrgsCreateWithoutProjectsInput, OrgsUncheckedCreateWithoutProjectsInput>
  }

  export type IssuesUpsertWithWhereUniqueWithoutProjectsInput = {
    where: IssuesWhereUniqueInput
    update: XOR<IssuesUpdateWithoutProjectsInput, IssuesUncheckedUpdateWithoutProjectsInput>
    create: XOR<IssuesCreateWithoutProjectsInput, IssuesUncheckedCreateWithoutProjectsInput>
  }

  export type IssuesUpdateWithWhereUniqueWithoutProjectsInput = {
    where: IssuesWhereUniqueInput
    data: XOR<IssuesUpdateWithoutProjectsInput, IssuesUncheckedUpdateWithoutProjectsInput>
  }

  export type IssuesUpdateManyWithWhereWithoutProjectsInput = {
    where: IssuesScalarWhereInput
    data: XOR<IssuesUpdateManyMutationInput, IssuesUncheckedUpdateManyWithoutIssuesInput>
  }

  export type IssuesScalarWhereInput = {
    AND?: Enumerable<IssuesScalarWhereInput>
    OR?: Enumerable<IssuesScalarWhereInput>
    NOT?: Enumerable<IssuesScalarWhereInput>
    id?: UuidFilter | string
    title?: StringFilter | string
    description?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    kanbanorder?: StringFilter | string
    username?: StringFilter | string
    external_urls?: StringNullableFilter | string | null
    completed_at?: DateTimeNullableFilter | Date | string | null
    status?: StringFilter | string
    priority?: StringFilter | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    project_id?: UuidNullableFilter | string | null
  }

  export type OrgsUpsertWithoutProjectsInput = {
    update: XOR<OrgsUpdateWithoutProjectsInput, OrgsUncheckedUpdateWithoutProjectsInput>
    create: XOR<OrgsCreateWithoutProjectsInput, OrgsUncheckedCreateWithoutProjectsInput>
  }

  export type OrgsUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    first_contact?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: NullableStringFieldUpdateOperationsInput | string | null
    linear_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: EmailsUpdateOneWithoutOrgsNestedInput
    slack_channels?: Slack_channelsUpdateOneWithoutOrgsNestedInput
  }

  export type OrgsUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    first_contact?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    primary_email_address_id?: NullableStringFieldUpdateOperationsInput | string | null
    primary_slack_channel_id?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: NullableStringFieldUpdateOperationsInput | string | null
    linear_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrgsCreateWithoutSlack_channelsInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    first_contact: Date | string
    updated_at?: Date | string | null
    website?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: string | null
    linear_id?: string | null
    pivotal_tracker_id?: string | null
    emails?: EmailsCreateNestedOneWithoutOrgsInput
    projects?: ProjectsCreateNestedManyWithoutOrgsInput
  }

  export type OrgsUncheckedCreateWithoutSlack_channelsInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    first_contact: Date | string
    updated_at?: Date | string | null
    website?: string | null
    primary_email_address_id?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: string | null
    linear_id?: string | null
    pivotal_tracker_id?: string | null
    projects?: ProjectsUncheckedCreateNestedManyWithoutOrgsInput
  }

  export type OrgsCreateOrConnectWithoutSlack_channelsInput = {
    where: OrgsWhereUniqueInput
    create: XOR<OrgsCreateWithoutSlack_channelsInput, OrgsUncheckedCreateWithoutSlack_channelsInput>
  }

  export type OrgsCreateManySlack_channelsInputEnvelope = {
    data: Enumerable<OrgsCreateManySlack_channelsInput>
    skipDuplicates?: boolean
  }

  export type OrgsUpsertWithWhereUniqueWithoutSlack_channelsInput = {
    where: OrgsWhereUniqueInput
    update: XOR<OrgsUpdateWithoutSlack_channelsInput, OrgsUncheckedUpdateWithoutSlack_channelsInput>
    create: XOR<OrgsCreateWithoutSlack_channelsInput, OrgsUncheckedCreateWithoutSlack_channelsInput>
  }

  export type OrgsUpdateWithWhereUniqueWithoutSlack_channelsInput = {
    where: OrgsWhereUniqueInput
    data: XOR<OrgsUpdateWithoutSlack_channelsInput, OrgsUncheckedUpdateWithoutSlack_channelsInput>
  }

  export type OrgsUpdateManyWithWhereWithoutSlack_channelsInput = {
    where: OrgsScalarWhereInput
    data: XOR<OrgsUpdateManyMutationInput, OrgsUncheckedUpdateManyWithoutOrgsInput>
  }

  export type OrgsCreateManyEmailsInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    first_contact: Date | string
    updated_at?: Date | string | null
    website?: string | null
    primary_slack_channel_id?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: string | null
    linear_id?: string | null
    pivotal_tracker_id?: string | null
  }

  export type OrgsUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    first_contact?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: NullableStringFieldUpdateOperationsInput | string | null
    linear_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableStringFieldUpdateOperationsInput | string | null
    slack_channels?: Slack_channelsUpdateOneWithoutOrgsNestedInput
    projects?: ProjectsUpdateManyWithoutOrgsNestedInput
  }

  export type OrgsUncheckedUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    first_contact?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    primary_slack_channel_id?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: NullableStringFieldUpdateOperationsInput | string | null
    linear_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableStringFieldUpdateOperationsInput | string | null
    projects?: ProjectsUncheckedUpdateManyWithoutOrgsNestedInput
  }

  export type OrgsUncheckedUpdateManyWithoutOrgsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    first_contact?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    primary_slack_channel_id?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: NullableStringFieldUpdateOperationsInput | string | null
    linear_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentsCreateManyIssuesInput = {
    id: string
    body: string
    username: string
    created_at: Date | string
  }

  export type CommentsUpdateWithoutIssuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentsUncheckedUpdateWithoutIssuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentsUncheckedUpdateManyWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectsCreateManyOrgsInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    start_date: Date | string
    end_date?: Date | string | null
    updated_at?: Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: project_status | null
    linear_team_id?: string | null
    pivotal_tracker_id?: bigint | number | null
  }

  export type ProjectsUpdateWithoutOrgsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableEnumproject_statusFieldUpdateOperationsInput | project_status | null
    linear_team_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    issues?: IssuesUpdateManyWithoutProjectsNestedInput
  }

  export type ProjectsUncheckedUpdateWithoutOrgsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableEnumproject_statusFieldUpdateOperationsInput | project_status | null
    linear_team_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    issues?: IssuesUncheckedUpdateManyWithoutProjectsNestedInput
  }

  export type ProjectsUncheckedUpdateManyWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    history?: NullableJsonNullValueInput | InputJsonValue
    status?: NullableEnumproject_statusFieldUpdateOperationsInput | project_status | null
    linear_team_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type IssuesCreateManyProjectsInput = {
    id: string
    title: string
    description: string
    created_at: Date | string
    kanbanorder: string
    username: string
    external_urls?: string | null
    completed_at?: Date | string | null
    status: string
    priority: string
    updated_at?: Date | string | null
  }

  export type IssuesUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    external_urls?: NullableStringFieldUpdateOperationsInput | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: CommentsUpdateManyWithoutIssuesNestedInput
  }

  export type IssuesUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    external_urls?: NullableStringFieldUpdateOperationsInput | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comments?: CommentsUncheckedUpdateManyWithoutIssuesNestedInput
  }

  export type IssuesUncheckedUpdateManyWithoutIssuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    external_urls?: NullableStringFieldUpdateOperationsInput | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrgsCreateManySlack_channelsInput = {
    id: string
    created_at: Date | string
    name: string
    shortname: string
    aliases?: string | null
    first_contact: Date | string
    updated_at?: Date | string | null
    website?: string | null
    primary_email_address_id?: string | null
    summary?: string | null
    note?: string | null
    missive_conversation_id: string
    missive_label_id: string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: string | null
    linear_id?: string | null
    pivotal_tracker_id?: string | null
  }

  export type OrgsUpdateWithoutSlack_channelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    first_contact?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: NullableStringFieldUpdateOperationsInput | string | null
    linear_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: EmailsUpdateOneWithoutOrgsNestedInput
    projects?: ProjectsUpdateManyWithoutOrgsNestedInput
  }

  export type OrgsUncheckedUpdateWithoutSlack_channelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    shortname?: StringFieldUpdateOperationsInput | string
    aliases?: NullableStringFieldUpdateOperationsInput | string | null
    first_contact?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    primary_email_address_id?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    missive_conversation_id?: StringFieldUpdateOperationsInput | string
    missive_label_id?: StringFieldUpdateOperationsInput | string
    history?: NullableJsonNullValueInput | InputJsonValue
    github_id?: NullableStringFieldUpdateOperationsInput | string | null
    linear_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivotal_tracker_id?: NullableStringFieldUpdateOperationsInput | string | null
    projects?: ProjectsUncheckedUpdateManyWithoutOrgsNestedInput
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}