
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
  priority: string
  status: string
  modified: Date
  created: Date
  kanbanorder: string
  username: string
}


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
   * `prisma.issues`: Exposes CRUD operations for the **Issues** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Issues
    * const issues = await prisma.issues.findMany()
    * ```
    */
  get issues(): Prisma.IssuesDelegate<GlobalReject>;
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
    Issues: 'Issues'
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
    priority: string | null
    status: string | null
    modified: Date | null
    created: Date | null
    kanbanorder: string | null
    username: string | null
  }

  export type IssuesMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    priority: string | null
    status: string | null
    modified: Date | null
    created: Date | null
    kanbanorder: string | null
    username: string | null
  }

  export type IssuesCountAggregateOutputType = {
    id: number
    title: number
    description: number
    priority: number
    status: number
    modified: number
    created: number
    kanbanorder: number
    username: number
    _all: number
  }


  export type IssuesMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    priority?: true
    status?: true
    modified?: true
    created?: true
    kanbanorder?: true
    username?: true
  }

  export type IssuesMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    priority?: true
    status?: true
    modified?: true
    created?: true
    kanbanorder?: true
    username?: true
  }

  export type IssuesCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    priority?: true
    status?: true
    modified?: true
    created?: true
    kanbanorder?: true
    username?: true
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
    priority: string
    status: string
    modified: Date
    created: Date
    kanbanorder: string
    username: string
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
    priority?: boolean
    status?: boolean
    modified?: boolean
    created?: boolean
    kanbanorder?: boolean
    username?: boolean
    comments?: boolean | Issues$commentsArgs
    _count?: boolean | IssuesCountOutputTypeArgs
  }


  export type IssuesInclude = {
    comments?: boolean | Issues$commentsArgs
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
        P extends '_count' ? IssuesCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (IssuesArgs | IssuesFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'comments' ? Array < CommentsGetPayload<S['select'][P]>>  :
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


  export const IssuesScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    priority: 'priority',
    status: 'status',
    modified: 'modified',
    created: 'created',
    kanbanorder: 'kanbanorder',
    username: 'username'
  };

  export type IssuesScalarFieldEnum = (typeof IssuesScalarFieldEnum)[keyof typeof IssuesScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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

  export type IssuesWhereInput = {
    AND?: Enumerable<IssuesWhereInput>
    OR?: Enumerable<IssuesWhereInput>
    NOT?: Enumerable<IssuesWhereInput>
    id?: UuidFilter | string
    title?: StringFilter | string
    description?: StringFilter | string
    priority?: StringFilter | string
    status?: StringFilter | string
    modified?: DateTimeFilter | Date | string
    created?: DateTimeFilter | Date | string
    kanbanorder?: StringFilter | string
    username?: StringFilter | string
    comments?: CommentsListRelationFilter
  }

  export type IssuesOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    modified?: SortOrder
    created?: SortOrder
    kanbanorder?: SortOrder
    username?: SortOrder
    comments?: CommentsOrderByRelationAggregateInput
  }

  export type IssuesWhereUniqueInput = {
    id?: string
  }

  export type IssuesOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    modified?: SortOrder
    created?: SortOrder
    kanbanorder?: SortOrder
    username?: SortOrder
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
    priority?: StringWithAggregatesFilter | string
    status?: StringWithAggregatesFilter | string
    modified?: DateTimeWithAggregatesFilter | Date | string
    created?: DateTimeWithAggregatesFilter | Date | string
    kanbanorder?: StringWithAggregatesFilter | string
    username?: StringWithAggregatesFilter | string
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

  export type IssuesCreateInput = {
    id: string
    title: string
    description: string
    priority: string
    status: string
    modified: Date | string
    created: Date | string
    kanbanorder: string
    username: string
    comments?: CommentsCreateNestedManyWithoutIssuesInput
  }

  export type IssuesUncheckedCreateInput = {
    id: string
    title: string
    description: string
    priority: string
    status: string
    modified: Date | string
    created: Date | string
    kanbanorder: string
    username: string
    comments?: CommentsUncheckedCreateNestedManyWithoutIssuesInput
  }

  export type IssuesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    comments?: CommentsUpdateManyWithoutIssuesNestedInput
  }

  export type IssuesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    comments?: CommentsUncheckedUpdateManyWithoutIssuesNestedInput
  }

  export type IssuesCreateManyInput = {
    id: string
    title: string
    description: string
    priority: string
    status: string
    modified: Date | string
    created: Date | string
    kanbanorder: string
    username: string
  }

  export type IssuesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type IssuesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
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

  export type CommentsListRelationFilter = {
    every?: CommentsWhereInput
    some?: CommentsWhereInput
    none?: CommentsWhereInput
  }

  export type CommentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IssuesCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    modified?: SortOrder
    created?: SortOrder
    kanbanorder?: SortOrder
    username?: SortOrder
  }

  export type IssuesMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    modified?: SortOrder
    created?: SortOrder
    kanbanorder?: SortOrder
    username?: SortOrder
  }

  export type IssuesMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    modified?: SortOrder
    created?: SortOrder
    kanbanorder?: SortOrder
    username?: SortOrder
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

  export type CommentsCreateNestedManyWithoutIssuesInput = {
    create?: XOR<Enumerable<CommentsCreateWithoutIssuesInput>, Enumerable<CommentsUncheckedCreateWithoutIssuesInput>>
    connectOrCreate?: Enumerable<CommentsCreateOrConnectWithoutIssuesInput>
    createMany?: CommentsCreateManyIssuesInputEnvelope
    connect?: Enumerable<CommentsWhereUniqueInput>
  }

  export type CommentsUncheckedCreateNestedManyWithoutIssuesInput = {
    create?: XOR<Enumerable<CommentsCreateWithoutIssuesInput>, Enumerable<CommentsUncheckedCreateWithoutIssuesInput>>
    connectOrCreate?: Enumerable<CommentsCreateOrConnectWithoutIssuesInput>
    createMany?: CommentsCreateManyIssuesInputEnvelope
    connect?: Enumerable<CommentsWhereUniqueInput>
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

  export type IssuesCreateWithoutCommentsInput = {
    id: string
    title: string
    description: string
    priority: string
    status: string
    modified: Date | string
    created: Date | string
    kanbanorder: string
    username: string
  }

  export type IssuesUncheckedCreateWithoutCommentsInput = {
    id: string
    title: string
    description: string
    priority: string
    status: string
    modified: Date | string
    created: Date | string
    kanbanorder: string
    username: string
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
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type IssuesUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    modified?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    kanbanorder?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
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