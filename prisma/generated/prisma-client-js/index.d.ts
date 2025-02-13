
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model PricingModule
 * 
 */
export type PricingModule = $Result.DefaultSelection<Prisma.$PricingModulePayload>
/**
 * Model PricingFeature
 * 
 */
export type PricingFeature = $Result.DefaultSelection<Prisma.$PricingFeaturePayload>
/**
 * Model PricingModuleFeature
 * 
 */
export type PricingModuleFeature = $Result.DefaultSelection<Prisma.$PricingModuleFeaturePayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model SubscriptionQuota
 * 
 */
export type SubscriptionQuota = $Result.DefaultSelection<Prisma.$SubscriptionQuotaPayload>
/**
 * Model UsageLog
 * 
 */
export type UsageLog = $Result.DefaultSelection<Prisma.$UsageLogPayload>
/**
 * Model PaymentLog
 * 
 */
export type PaymentLog = $Result.DefaultSelection<Prisma.$PaymentLogPayload>
/**
 * Model SourceProduct
 * 
 */
export type SourceProduct = $Result.DefaultSelection<Prisma.$SourceProductPayload>
/**
 * Model SourceCategory
 * 
 */
export type SourceCategory = $Result.DefaultSelection<Prisma.$SourceCategoryPayload>
/**
 * Model PlatformProduct
 * 
 */
export type PlatformProduct = $Result.DefaultSelection<Prisma.$PlatformProductPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const QuotaType: {
  SUBSCRIPTION: 'SUBSCRIPTION',
  EXTRA: 'EXTRA'
};

export type QuotaType = (typeof QuotaType)[keyof typeof QuotaType]


export const PaymentLogStatus: {
  CREATED: 'CREATED',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type PaymentLogStatus = (typeof PaymentLogStatus)[keyof typeof PaymentLogStatus]


export const Source: {
  ALIEXPRESS: 'ALIEXPRESS',
  SHOPIFY: 'SHOPIFY',
  EBAY: 'EBAY',
  AMAZON: 'AMAZON',
  WISH: 'WISH'
};

export type Source = (typeof Source)[keyof typeof Source]


export const SourceStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type SourceStatus = (typeof SourceStatus)[keyof typeof SourceStatus]

}

export type QuotaType = $Enums.QuotaType

export const QuotaType: typeof $Enums.QuotaType

export type PaymentLogStatus = $Enums.PaymentLogStatus

export const PaymentLogStatus: typeof $Enums.PaymentLogStatus

export type Source = $Enums.Source

export const Source: typeof $Enums.Source

export type SourceStatus = $Enums.SourceStatus

export const SourceStatus: typeof $Enums.SourceStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sessions
 * const sessions = await prisma.session.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
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
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.pricingModule`: Exposes CRUD operations for the **PricingModule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PricingModules
    * const pricingModules = await prisma.pricingModule.findMany()
    * ```
    */
  get pricingModule(): Prisma.PricingModuleDelegate<ExtArgs>;

  /**
   * `prisma.pricingFeature`: Exposes CRUD operations for the **PricingFeature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PricingFeatures
    * const pricingFeatures = await prisma.pricingFeature.findMany()
    * ```
    */
  get pricingFeature(): Prisma.PricingFeatureDelegate<ExtArgs>;

  /**
   * `prisma.pricingModuleFeature`: Exposes CRUD operations for the **PricingModuleFeature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PricingModuleFeatures
    * const pricingModuleFeatures = await prisma.pricingModuleFeature.findMany()
    * ```
    */
  get pricingModuleFeature(): Prisma.PricingModuleFeatureDelegate<ExtArgs>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs>;

  /**
   * `prisma.subscriptionQuota`: Exposes CRUD operations for the **SubscriptionQuota** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubscriptionQuotas
    * const subscriptionQuotas = await prisma.subscriptionQuota.findMany()
    * ```
    */
  get subscriptionQuota(): Prisma.SubscriptionQuotaDelegate<ExtArgs>;

  /**
   * `prisma.usageLog`: Exposes CRUD operations for the **UsageLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsageLogs
    * const usageLogs = await prisma.usageLog.findMany()
    * ```
    */
  get usageLog(): Prisma.UsageLogDelegate<ExtArgs>;

  /**
   * `prisma.paymentLog`: Exposes CRUD operations for the **PaymentLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentLogs
    * const paymentLogs = await prisma.paymentLog.findMany()
    * ```
    */
  get paymentLog(): Prisma.PaymentLogDelegate<ExtArgs>;

  /**
   * `prisma.sourceProduct`: Exposes CRUD operations for the **SourceProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SourceProducts
    * const sourceProducts = await prisma.sourceProduct.findMany()
    * ```
    */
  get sourceProduct(): Prisma.SourceProductDelegate<ExtArgs>;

  /**
   * `prisma.sourceCategory`: Exposes CRUD operations for the **SourceCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SourceCategories
    * const sourceCategories = await prisma.sourceCategory.findMany()
    * ```
    */
  get sourceCategory(): Prisma.SourceCategoryDelegate<ExtArgs>;

  /**
   * `prisma.platformProduct`: Exposes CRUD operations for the **PlatformProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlatformProducts
    * const platformProducts = await prisma.platformProduct.findMany()
    * ```
    */
  get platformProduct(): Prisma.PlatformProductDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Session: 'Session',
    PricingModule: 'PricingModule',
    PricingFeature: 'PricingFeature',
    PricingModuleFeature: 'PricingModuleFeature',
    Subscription: 'Subscription',
    SubscriptionQuota: 'SubscriptionQuota',
    UsageLog: 'UsageLog',
    PaymentLog: 'PaymentLog',
    SourceProduct: 'SourceProduct',
    SourceCategory: 'SourceCategory',
    PlatformProduct: 'PlatformProduct'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "session" | "pricingModule" | "pricingFeature" | "pricingModuleFeature" | "subscription" | "subscriptionQuota" | "usageLog" | "paymentLog" | "sourceProduct" | "sourceCategory" | "platformProduct"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      PricingModule: {
        payload: Prisma.$PricingModulePayload<ExtArgs>
        fields: Prisma.PricingModuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PricingModuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PricingModuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModulePayload>
          }
          findFirst: {
            args: Prisma.PricingModuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PricingModuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModulePayload>
          }
          findMany: {
            args: Prisma.PricingModuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModulePayload>[]
          }
          create: {
            args: Prisma.PricingModuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModulePayload>
          }
          createMany: {
            args: Prisma.PricingModuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PricingModuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModulePayload>
          }
          update: {
            args: Prisma.PricingModuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModulePayload>
          }
          deleteMany: {
            args: Prisma.PricingModuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PricingModuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PricingModuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModulePayload>
          }
          aggregate: {
            args: Prisma.PricingModuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePricingModule>
          }
          groupBy: {
            args: Prisma.PricingModuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PricingModuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PricingModuleCountArgs<ExtArgs>
            result: $Utils.Optional<PricingModuleCountAggregateOutputType> | number
          }
        }
      }
      PricingFeature: {
        payload: Prisma.$PricingFeaturePayload<ExtArgs>
        fields: Prisma.PricingFeatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PricingFeatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingFeaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PricingFeatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingFeaturePayload>
          }
          findFirst: {
            args: Prisma.PricingFeatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingFeaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PricingFeatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingFeaturePayload>
          }
          findMany: {
            args: Prisma.PricingFeatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingFeaturePayload>[]
          }
          create: {
            args: Prisma.PricingFeatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingFeaturePayload>
          }
          createMany: {
            args: Prisma.PricingFeatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PricingFeatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingFeaturePayload>
          }
          update: {
            args: Prisma.PricingFeatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingFeaturePayload>
          }
          deleteMany: {
            args: Prisma.PricingFeatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PricingFeatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PricingFeatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingFeaturePayload>
          }
          aggregate: {
            args: Prisma.PricingFeatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePricingFeature>
          }
          groupBy: {
            args: Prisma.PricingFeatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<PricingFeatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.PricingFeatureCountArgs<ExtArgs>
            result: $Utils.Optional<PricingFeatureCountAggregateOutputType> | number
          }
        }
      }
      PricingModuleFeature: {
        payload: Prisma.$PricingModuleFeaturePayload<ExtArgs>
        fields: Prisma.PricingModuleFeatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PricingModuleFeatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModuleFeaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PricingModuleFeatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModuleFeaturePayload>
          }
          findFirst: {
            args: Prisma.PricingModuleFeatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModuleFeaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PricingModuleFeatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModuleFeaturePayload>
          }
          findMany: {
            args: Prisma.PricingModuleFeatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModuleFeaturePayload>[]
          }
          create: {
            args: Prisma.PricingModuleFeatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModuleFeaturePayload>
          }
          createMany: {
            args: Prisma.PricingModuleFeatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PricingModuleFeatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModuleFeaturePayload>
          }
          update: {
            args: Prisma.PricingModuleFeatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModuleFeaturePayload>
          }
          deleteMany: {
            args: Prisma.PricingModuleFeatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PricingModuleFeatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PricingModuleFeatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModuleFeaturePayload>
          }
          aggregate: {
            args: Prisma.PricingModuleFeatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePricingModuleFeature>
          }
          groupBy: {
            args: Prisma.PricingModuleFeatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<PricingModuleFeatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.PricingModuleFeatureCountArgs<ExtArgs>
            result: $Utils.Optional<PricingModuleFeatureCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      SubscriptionQuota: {
        payload: Prisma.$SubscriptionQuotaPayload<ExtArgs>
        fields: Prisma.SubscriptionQuotaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionQuotaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionQuotaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionQuotaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionQuotaPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionQuotaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionQuotaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionQuotaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionQuotaPayload>
          }
          findMany: {
            args: Prisma.SubscriptionQuotaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionQuotaPayload>[]
          }
          create: {
            args: Prisma.SubscriptionQuotaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionQuotaPayload>
          }
          createMany: {
            args: Prisma.SubscriptionQuotaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SubscriptionQuotaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionQuotaPayload>
          }
          update: {
            args: Prisma.SubscriptionQuotaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionQuotaPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionQuotaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionQuotaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SubscriptionQuotaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionQuotaPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionQuotaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriptionQuota>
          }
          groupBy: {
            args: Prisma.SubscriptionQuotaGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionQuotaGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionQuotaCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionQuotaCountAggregateOutputType> | number
          }
        }
      }
      UsageLog: {
        payload: Prisma.$UsageLogPayload<ExtArgs>
        fields: Prisma.UsageLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsageLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsageLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          findFirst: {
            args: Prisma.UsageLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsageLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          findMany: {
            args: Prisma.UsageLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>[]
          }
          create: {
            args: Prisma.UsageLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          createMany: {
            args: Prisma.UsageLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UsageLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          update: {
            args: Prisma.UsageLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          deleteMany: {
            args: Prisma.UsageLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsageLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsageLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          aggregate: {
            args: Prisma.UsageLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsageLog>
          }
          groupBy: {
            args: Prisma.UsageLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsageLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsageLogCountArgs<ExtArgs>
            result: $Utils.Optional<UsageLogCountAggregateOutputType> | number
          }
        }
      }
      PaymentLog: {
        payload: Prisma.$PaymentLogPayload<ExtArgs>
        fields: Prisma.PaymentLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLogPayload>
          }
          findFirst: {
            args: Prisma.PaymentLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLogPayload>
          }
          findMany: {
            args: Prisma.PaymentLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLogPayload>[]
          }
          create: {
            args: Prisma.PaymentLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLogPayload>
          }
          createMany: {
            args: Prisma.PaymentLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PaymentLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLogPayload>
          }
          update: {
            args: Prisma.PaymentLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLogPayload>
          }
          deleteMany: {
            args: Prisma.PaymentLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLogPayload>
          }
          aggregate: {
            args: Prisma.PaymentLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentLog>
          }
          groupBy: {
            args: Prisma.PaymentLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentLogCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentLogCountAggregateOutputType> | number
          }
        }
      }
      SourceProduct: {
        payload: Prisma.$SourceProductPayload<ExtArgs>
        fields: Prisma.SourceProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SourceProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SourceProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceProductPayload>
          }
          findFirst: {
            args: Prisma.SourceProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SourceProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceProductPayload>
          }
          findMany: {
            args: Prisma.SourceProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceProductPayload>[]
          }
          create: {
            args: Prisma.SourceProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceProductPayload>
          }
          createMany: {
            args: Prisma.SourceProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SourceProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceProductPayload>
          }
          update: {
            args: Prisma.SourceProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceProductPayload>
          }
          deleteMany: {
            args: Prisma.SourceProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SourceProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SourceProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceProductPayload>
          }
          aggregate: {
            args: Prisma.SourceProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSourceProduct>
          }
          groupBy: {
            args: Prisma.SourceProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<SourceProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.SourceProductCountArgs<ExtArgs>
            result: $Utils.Optional<SourceProductCountAggregateOutputType> | number
          }
        }
      }
      SourceCategory: {
        payload: Prisma.$SourceCategoryPayload<ExtArgs>
        fields: Prisma.SourceCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SourceCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SourceCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceCategoryPayload>
          }
          findFirst: {
            args: Prisma.SourceCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SourceCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceCategoryPayload>
          }
          findMany: {
            args: Prisma.SourceCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceCategoryPayload>[]
          }
          create: {
            args: Prisma.SourceCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceCategoryPayload>
          }
          createMany: {
            args: Prisma.SourceCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SourceCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceCategoryPayload>
          }
          update: {
            args: Prisma.SourceCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceCategoryPayload>
          }
          deleteMany: {
            args: Prisma.SourceCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SourceCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SourceCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourceCategoryPayload>
          }
          aggregate: {
            args: Prisma.SourceCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSourceCategory>
          }
          groupBy: {
            args: Prisma.SourceCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<SourceCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.SourceCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<SourceCategoryCountAggregateOutputType> | number
          }
        }
      }
      PlatformProduct: {
        payload: Prisma.$PlatformProductPayload<ExtArgs>
        fields: Prisma.PlatformProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlatformProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlatformProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformProductPayload>
          }
          findFirst: {
            args: Prisma.PlatformProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlatformProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformProductPayload>
          }
          findMany: {
            args: Prisma.PlatformProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformProductPayload>[]
          }
          create: {
            args: Prisma.PlatformProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformProductPayload>
          }
          createMany: {
            args: Prisma.PlatformProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PlatformProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformProductPayload>
          }
          update: {
            args: Prisma.PlatformProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformProductPayload>
          }
          deleteMany: {
            args: Prisma.PlatformProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlatformProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlatformProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformProductPayload>
          }
          aggregate: {
            args: Prisma.PlatformProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatformProduct>
          }
          groupBy: {
            args: Prisma.PlatformProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatformProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlatformProductCountArgs<ExtArgs>
            result: $Utils.Optional<PlatformProductCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
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
    | 'groupBy'

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
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    Subscription: number
    SubscriptionQuota: number
    UsageLog: number
    PaymentLog: number
    PlatformProduct: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Subscription?: boolean | SessionCountOutputTypeCountSubscriptionArgs
    SubscriptionQuota?: boolean | SessionCountOutputTypeCountSubscriptionQuotaArgs
    UsageLog?: boolean | SessionCountOutputTypeCountUsageLogArgs
    PaymentLog?: boolean | SessionCountOutputTypeCountPaymentLogArgs
    PlatformProduct?: boolean | SessionCountOutputTypeCountPlatformProductArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountSubscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountSubscriptionQuotaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionQuotaWhereInput
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountUsageLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLogWhereInput
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountPaymentLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentLogWhereInput
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountPlatformProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformProductWhereInput
  }


  /**
   * Count Type PricingModuleCountOutputType
   */

  export type PricingModuleCountOutputType = {
    features: number
    Subscription: number
  }

  export type PricingModuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    features?: boolean | PricingModuleCountOutputTypeCountFeaturesArgs
    Subscription?: boolean | PricingModuleCountOutputTypeCountSubscriptionArgs
  }

  // Custom InputTypes
  /**
   * PricingModuleCountOutputType without action
   */
  export type PricingModuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleCountOutputType
     */
    select?: PricingModuleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PricingModuleCountOutputType without action
   */
  export type PricingModuleCountOutputTypeCountFeaturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingModuleFeatureWhereInput
  }

  /**
   * PricingModuleCountOutputType without action
   */
  export type PricingModuleCountOutputTypeCountSubscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }


  /**
   * Count Type PricingFeatureCountOutputType
   */

  export type PricingFeatureCountOutputType = {
    modules: number
    SubscriptionQuota: number
    UsageLog: number
  }

  export type PricingFeatureCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    modules?: boolean | PricingFeatureCountOutputTypeCountModulesArgs
    SubscriptionQuota?: boolean | PricingFeatureCountOutputTypeCountSubscriptionQuotaArgs
    UsageLog?: boolean | PricingFeatureCountOutputTypeCountUsageLogArgs
  }

  // Custom InputTypes
  /**
   * PricingFeatureCountOutputType without action
   */
  export type PricingFeatureCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeatureCountOutputType
     */
    select?: PricingFeatureCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PricingFeatureCountOutputType without action
   */
  export type PricingFeatureCountOutputTypeCountModulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingModuleFeatureWhereInput
  }

  /**
   * PricingFeatureCountOutputType without action
   */
  export type PricingFeatureCountOutputTypeCountSubscriptionQuotaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionQuotaWhereInput
  }

  /**
   * PricingFeatureCountOutputType without action
   */
  export type PricingFeatureCountOutputTypeCountUsageLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLogWhereInput
  }


  /**
   * Count Type SourceProductCountOutputType
   */

  export type SourceProductCountOutputType = {
    PlatformProduct: number
  }

  export type SourceProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PlatformProduct?: boolean | SourceProductCountOutputTypeCountPlatformProductArgs
  }

  // Custom InputTypes
  /**
   * SourceProductCountOutputType without action
   */
  export type SourceProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceProductCountOutputType
     */
    select?: SourceProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SourceProductCountOutputType without action
   */
  export type SourceProductCountOutputTypeCountPlatformProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformProductWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    userId: number | null
  }

  export type SessionSumAggregateOutputType = {
    userId: bigint | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    shop: string | null
    state: string | null
    isOnline: boolean | null
    scope: string | null
    expires: Date | null
    accessToken: string | null
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean | null
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    shop: string | null
    state: string | null
    isOnline: boolean | null
    scope: string | null
    expires: Date | null
    accessToken: string | null
    userId: bigint | null
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean | null
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    shop: number
    state: number
    isOnline: number
    scope: number
    expires: number
    accessToken: number
    userId: number
    firstName: number
    lastName: number
    email: number
    accountOwner: number
    locale: number
    collaborator: number
    emailVerified: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    userId?: true
  }

  export type SessionSumAggregateInputType = {
    userId?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    shop?: true
    state?: true
    isOnline?: true
    scope?: true
    expires?: true
    accessToken?: true
    userId?: true
    firstName?: true
    lastName?: true
    email?: true
    accountOwner?: true
    locale?: true
    collaborator?: true
    emailVerified?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    shop: string
    state: string
    isOnline: boolean
    scope: string | null
    expires: Date | null
    accessToken: string
    userId: bigint
    firstName: string | null
    lastName: string | null
    email: string | null
    accountOwner: boolean
    locale: string | null
    collaborator: boolean | null
    emailVerified: boolean | null
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
    Subscription?: boolean | Session$SubscriptionArgs<ExtArgs>
    SubscriptionQuota?: boolean | Session$SubscriptionQuotaArgs<ExtArgs>
    UsageLog?: boolean | Session$UsageLogArgs<ExtArgs>
    PaymentLog?: boolean | Session$PaymentLogArgs<ExtArgs>
    PlatformProduct?: boolean | Session$PlatformProductArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>


  export type SessionSelectScalar = {
    id?: boolean
    shop?: boolean
    state?: boolean
    isOnline?: boolean
    scope?: boolean
    expires?: boolean
    accessToken?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    accountOwner?: boolean
    locale?: boolean
    collaborator?: boolean
    emailVerified?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Subscription?: boolean | Session$SubscriptionArgs<ExtArgs>
    SubscriptionQuota?: boolean | Session$SubscriptionQuotaArgs<ExtArgs>
    UsageLog?: boolean | Session$UsageLogArgs<ExtArgs>
    PaymentLog?: boolean | Session$PaymentLogArgs<ExtArgs>
    PlatformProduct?: boolean | Session$PlatformProductArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      Subscription: Prisma.$SubscriptionPayload<ExtArgs>[]
      SubscriptionQuota: Prisma.$SubscriptionQuotaPayload<ExtArgs>[]
      UsageLog: Prisma.$UsageLogPayload<ExtArgs>[]
      PaymentLog: Prisma.$PaymentLogPayload<ExtArgs>[]
      PlatformProduct: Prisma.$PlatformProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shop: string
      state: string
      isOnline: boolean
      scope: string | null
      expires: Date | null
      accessToken: string
      userId: bigint
      firstName: string | null
      lastName: string | null
      email: string | null
      accountOwner: boolean
      locale: string | null
      collaborator: boolean | null
      emailVerified: boolean | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Subscription<T extends Session$SubscriptionArgs<ExtArgs> = {}>(args?: Subset<T, Session$SubscriptionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany"> | Null>
    SubscriptionQuota<T extends Session$SubscriptionQuotaArgs<ExtArgs> = {}>(args?: Subset<T, Session$SubscriptionQuotaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionQuotaPayload<ExtArgs>, T, "findMany"> | Null>
    UsageLog<T extends Session$UsageLogArgs<ExtArgs> = {}>(args?: Subset<T, Session$UsageLogArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findMany"> | Null>
    PaymentLog<T extends Session$PaymentLogArgs<ExtArgs> = {}>(args?: Subset<T, Session$PaymentLogArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentLogPayload<ExtArgs>, T, "findMany"> | Null>
    PlatformProduct<T extends Session$PlatformProductArgs<ExtArgs> = {}>(args?: Subset<T, Session$PlatformProductArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformProductPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly shop: FieldRef<"Session", 'String'>
    readonly state: FieldRef<"Session", 'String'>
    readonly isOnline: FieldRef<"Session", 'Boolean'>
    readonly scope: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
    readonly accessToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'BigInt'>
    readonly firstName: FieldRef<"Session", 'String'>
    readonly lastName: FieldRef<"Session", 'String'>
    readonly email: FieldRef<"Session", 'String'>
    readonly accountOwner: FieldRef<"Session", 'Boolean'>
    readonly locale: FieldRef<"Session", 'String'>
    readonly collaborator: FieldRef<"Session", 'Boolean'>
    readonly emailVerified: FieldRef<"Session", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    limit?: number
  }

  /**
   * Session.Subscription
   */
  export type Session$SubscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Session.SubscriptionQuota
   */
  export type Session$SubscriptionQuotaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionQuota
     */
    select?: SubscriptionQuotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionQuotaInclude<ExtArgs> | null
    where?: SubscriptionQuotaWhereInput
    orderBy?: SubscriptionQuotaOrderByWithRelationInput | SubscriptionQuotaOrderByWithRelationInput[]
    cursor?: SubscriptionQuotaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionQuotaScalarFieldEnum | SubscriptionQuotaScalarFieldEnum[]
  }

  /**
   * Session.UsageLog
   */
  export type Session$UsageLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    where?: UsageLogWhereInput
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    cursor?: UsageLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * Session.PaymentLog
   */
  export type Session$PaymentLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLog
     */
    select?: PaymentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLogInclude<ExtArgs> | null
    where?: PaymentLogWhereInput
    orderBy?: PaymentLogOrderByWithRelationInput | PaymentLogOrderByWithRelationInput[]
    cursor?: PaymentLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentLogScalarFieldEnum | PaymentLogScalarFieldEnum[]
  }

  /**
   * Session.PlatformProduct
   */
  export type Session$PlatformProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformProduct
     */
    select?: PlatformProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformProductInclude<ExtArgs> | null
    where?: PlatformProductWhereInput
    orderBy?: PlatformProductOrderByWithRelationInput | PlatformProductOrderByWithRelationInput[]
    cursor?: PlatformProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlatformProductScalarFieldEnum | PlatformProductScalarFieldEnum[]
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model PricingModule
   */

  export type AggregatePricingModule = {
    _count: PricingModuleCountAggregateOutputType | null
    _avg: PricingModuleAvgAggregateOutputType | null
    _sum: PricingModuleSumAggregateOutputType | null
    _min: PricingModuleMinAggregateOutputType | null
    _max: PricingModuleMaxAggregateOutputType | null
  }

  export type PricingModuleAvgAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type PricingModuleSumAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type PricingModuleMinAggregateOutputType = {
    id: number | null
    name: string | null
    key: string | null
    price: number | null
    is_default: boolean | null
    available: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PricingModuleMaxAggregateOutputType = {
    id: number | null
    name: string | null
    key: string | null
    price: number | null
    is_default: boolean | null
    available: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PricingModuleCountAggregateOutputType = {
    id: number
    name: number
    key: number
    price: number
    is_default: number
    available: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PricingModuleAvgAggregateInputType = {
    id?: true
    price?: true
  }

  export type PricingModuleSumAggregateInputType = {
    id?: true
    price?: true
  }

  export type PricingModuleMinAggregateInputType = {
    id?: true
    name?: true
    key?: true
    price?: true
    is_default?: true
    available?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PricingModuleMaxAggregateInputType = {
    id?: true
    name?: true
    key?: true
    price?: true
    is_default?: true
    available?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PricingModuleCountAggregateInputType = {
    id?: true
    name?: true
    key?: true
    price?: true
    is_default?: true
    available?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PricingModuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingModule to aggregate.
     */
    where?: PricingModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingModules to fetch.
     */
    orderBy?: PricingModuleOrderByWithRelationInput | PricingModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PricingModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PricingModules
    **/
    _count?: true | PricingModuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PricingModuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PricingModuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PricingModuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PricingModuleMaxAggregateInputType
  }

  export type GetPricingModuleAggregateType<T extends PricingModuleAggregateArgs> = {
        [P in keyof T & keyof AggregatePricingModule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePricingModule[P]>
      : GetScalarType<T[P], AggregatePricingModule[P]>
  }




  export type PricingModuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingModuleWhereInput
    orderBy?: PricingModuleOrderByWithAggregationInput | PricingModuleOrderByWithAggregationInput[]
    by: PricingModuleScalarFieldEnum[] | PricingModuleScalarFieldEnum
    having?: PricingModuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PricingModuleCountAggregateInputType | true
    _avg?: PricingModuleAvgAggregateInputType
    _sum?: PricingModuleSumAggregateInputType
    _min?: PricingModuleMinAggregateInputType
    _max?: PricingModuleMaxAggregateInputType
  }

  export type PricingModuleGroupByOutputType = {
    id: number
    name: string
    key: string
    price: number
    is_default: boolean | null
    available: boolean | null
    createdAt: Date
    updatedAt: Date
    _count: PricingModuleCountAggregateOutputType | null
    _avg: PricingModuleAvgAggregateOutputType | null
    _sum: PricingModuleSumAggregateOutputType | null
    _min: PricingModuleMinAggregateOutputType | null
    _max: PricingModuleMaxAggregateOutputType | null
  }

  type GetPricingModuleGroupByPayload<T extends PricingModuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PricingModuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PricingModuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PricingModuleGroupByOutputType[P]>
            : GetScalarType<T[P], PricingModuleGroupByOutputType[P]>
        }
      >
    >


  export type PricingModuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    key?: boolean
    price?: boolean
    is_default?: boolean
    available?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    features?: boolean | PricingModule$featuresArgs<ExtArgs>
    Subscription?: boolean | PricingModule$SubscriptionArgs<ExtArgs>
    _count?: boolean | PricingModuleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pricingModule"]>


  export type PricingModuleSelectScalar = {
    id?: boolean
    name?: boolean
    key?: boolean
    price?: boolean
    is_default?: boolean
    available?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PricingModuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    features?: boolean | PricingModule$featuresArgs<ExtArgs>
    Subscription?: boolean | PricingModule$SubscriptionArgs<ExtArgs>
    _count?: boolean | PricingModuleCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PricingModulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PricingModule"
    objects: {
      features: Prisma.$PricingModuleFeaturePayload<ExtArgs>[]
      Subscription: Prisma.$SubscriptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      key: string
      price: number
      is_default: boolean | null
      available: boolean | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pricingModule"]>
    composites: {}
  }

  type PricingModuleGetPayload<S extends boolean | null | undefined | PricingModuleDefaultArgs> = $Result.GetResult<Prisma.$PricingModulePayload, S>

  type PricingModuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PricingModuleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PricingModuleCountAggregateInputType | true
    }

  export interface PricingModuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PricingModule'], meta: { name: 'PricingModule' } }
    /**
     * Find zero or one PricingModule that matches the filter.
     * @param {PricingModuleFindUniqueArgs} args - Arguments to find a PricingModule
     * @example
     * // Get one PricingModule
     * const pricingModule = await prisma.pricingModule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PricingModuleFindUniqueArgs>(args: SelectSubset<T, PricingModuleFindUniqueArgs<ExtArgs>>): Prisma__PricingModuleClient<$Result.GetResult<Prisma.$PricingModulePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PricingModule that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PricingModuleFindUniqueOrThrowArgs} args - Arguments to find a PricingModule
     * @example
     * // Get one PricingModule
     * const pricingModule = await prisma.pricingModule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PricingModuleFindUniqueOrThrowArgs>(args: SelectSubset<T, PricingModuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PricingModuleClient<$Result.GetResult<Prisma.$PricingModulePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PricingModule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleFindFirstArgs} args - Arguments to find a PricingModule
     * @example
     * // Get one PricingModule
     * const pricingModule = await prisma.pricingModule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PricingModuleFindFirstArgs>(args?: SelectSubset<T, PricingModuleFindFirstArgs<ExtArgs>>): Prisma__PricingModuleClient<$Result.GetResult<Prisma.$PricingModulePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PricingModule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleFindFirstOrThrowArgs} args - Arguments to find a PricingModule
     * @example
     * // Get one PricingModule
     * const pricingModule = await prisma.pricingModule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PricingModuleFindFirstOrThrowArgs>(args?: SelectSubset<T, PricingModuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PricingModuleClient<$Result.GetResult<Prisma.$PricingModulePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PricingModules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PricingModules
     * const pricingModules = await prisma.pricingModule.findMany()
     * 
     * // Get first 10 PricingModules
     * const pricingModules = await prisma.pricingModule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pricingModuleWithIdOnly = await prisma.pricingModule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PricingModuleFindManyArgs>(args?: SelectSubset<T, PricingModuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingModulePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PricingModule.
     * @param {PricingModuleCreateArgs} args - Arguments to create a PricingModule.
     * @example
     * // Create one PricingModule
     * const PricingModule = await prisma.pricingModule.create({
     *   data: {
     *     // ... data to create a PricingModule
     *   }
     * })
     * 
     */
    create<T extends PricingModuleCreateArgs>(args: SelectSubset<T, PricingModuleCreateArgs<ExtArgs>>): Prisma__PricingModuleClient<$Result.GetResult<Prisma.$PricingModulePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PricingModules.
     * @param {PricingModuleCreateManyArgs} args - Arguments to create many PricingModules.
     * @example
     * // Create many PricingModules
     * const pricingModule = await prisma.pricingModule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PricingModuleCreateManyArgs>(args?: SelectSubset<T, PricingModuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PricingModule.
     * @param {PricingModuleDeleteArgs} args - Arguments to delete one PricingModule.
     * @example
     * // Delete one PricingModule
     * const PricingModule = await prisma.pricingModule.delete({
     *   where: {
     *     // ... filter to delete one PricingModule
     *   }
     * })
     * 
     */
    delete<T extends PricingModuleDeleteArgs>(args: SelectSubset<T, PricingModuleDeleteArgs<ExtArgs>>): Prisma__PricingModuleClient<$Result.GetResult<Prisma.$PricingModulePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PricingModule.
     * @param {PricingModuleUpdateArgs} args - Arguments to update one PricingModule.
     * @example
     * // Update one PricingModule
     * const pricingModule = await prisma.pricingModule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PricingModuleUpdateArgs>(args: SelectSubset<T, PricingModuleUpdateArgs<ExtArgs>>): Prisma__PricingModuleClient<$Result.GetResult<Prisma.$PricingModulePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PricingModules.
     * @param {PricingModuleDeleteManyArgs} args - Arguments to filter PricingModules to delete.
     * @example
     * // Delete a few PricingModules
     * const { count } = await prisma.pricingModule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PricingModuleDeleteManyArgs>(args?: SelectSubset<T, PricingModuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PricingModules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PricingModules
     * const pricingModule = await prisma.pricingModule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PricingModuleUpdateManyArgs>(args: SelectSubset<T, PricingModuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PricingModule.
     * @param {PricingModuleUpsertArgs} args - Arguments to update or create a PricingModule.
     * @example
     * // Update or create a PricingModule
     * const pricingModule = await prisma.pricingModule.upsert({
     *   create: {
     *     // ... data to create a PricingModule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PricingModule we want to update
     *   }
     * })
     */
    upsert<T extends PricingModuleUpsertArgs>(args: SelectSubset<T, PricingModuleUpsertArgs<ExtArgs>>): Prisma__PricingModuleClient<$Result.GetResult<Prisma.$PricingModulePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PricingModules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleCountArgs} args - Arguments to filter PricingModules to count.
     * @example
     * // Count the number of PricingModules
     * const count = await prisma.pricingModule.count({
     *   where: {
     *     // ... the filter for the PricingModules we want to count
     *   }
     * })
    **/
    count<T extends PricingModuleCountArgs>(
      args?: Subset<T, PricingModuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PricingModuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PricingModule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PricingModuleAggregateArgs>(args: Subset<T, PricingModuleAggregateArgs>): Prisma.PrismaPromise<GetPricingModuleAggregateType<T>>

    /**
     * Group by PricingModule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleGroupByArgs} args - Group by arguments.
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
      T extends PricingModuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PricingModuleGroupByArgs['orderBy'] }
        : { orderBy?: PricingModuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PricingModuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPricingModuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PricingModule model
   */
  readonly fields: PricingModuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PricingModule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PricingModuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    features<T extends PricingModule$featuresArgs<ExtArgs> = {}>(args?: Subset<T, PricingModule$featuresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingModuleFeaturePayload<ExtArgs>, T, "findMany"> | Null>
    Subscription<T extends PricingModule$SubscriptionArgs<ExtArgs> = {}>(args?: Subset<T, PricingModule$SubscriptionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PricingModule model
   */ 
  interface PricingModuleFieldRefs {
    readonly id: FieldRef<"PricingModule", 'Int'>
    readonly name: FieldRef<"PricingModule", 'String'>
    readonly key: FieldRef<"PricingModule", 'String'>
    readonly price: FieldRef<"PricingModule", 'Float'>
    readonly is_default: FieldRef<"PricingModule", 'Boolean'>
    readonly available: FieldRef<"PricingModule", 'Boolean'>
    readonly createdAt: FieldRef<"PricingModule", 'DateTime'>
    readonly updatedAt: FieldRef<"PricingModule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PricingModule findUnique
   */
  export type PricingModuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModule
     */
    select?: PricingModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleInclude<ExtArgs> | null
    /**
     * Filter, which PricingModule to fetch.
     */
    where: PricingModuleWhereUniqueInput
  }

  /**
   * PricingModule findUniqueOrThrow
   */
  export type PricingModuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModule
     */
    select?: PricingModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleInclude<ExtArgs> | null
    /**
     * Filter, which PricingModule to fetch.
     */
    where: PricingModuleWhereUniqueInput
  }

  /**
   * PricingModule findFirst
   */
  export type PricingModuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModule
     */
    select?: PricingModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleInclude<ExtArgs> | null
    /**
     * Filter, which PricingModule to fetch.
     */
    where?: PricingModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingModules to fetch.
     */
    orderBy?: PricingModuleOrderByWithRelationInput | PricingModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingModules.
     */
    cursor?: PricingModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingModules.
     */
    distinct?: PricingModuleScalarFieldEnum | PricingModuleScalarFieldEnum[]
  }

  /**
   * PricingModule findFirstOrThrow
   */
  export type PricingModuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModule
     */
    select?: PricingModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleInclude<ExtArgs> | null
    /**
     * Filter, which PricingModule to fetch.
     */
    where?: PricingModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingModules to fetch.
     */
    orderBy?: PricingModuleOrderByWithRelationInput | PricingModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingModules.
     */
    cursor?: PricingModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingModules.
     */
    distinct?: PricingModuleScalarFieldEnum | PricingModuleScalarFieldEnum[]
  }

  /**
   * PricingModule findMany
   */
  export type PricingModuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModule
     */
    select?: PricingModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleInclude<ExtArgs> | null
    /**
     * Filter, which PricingModules to fetch.
     */
    where?: PricingModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingModules to fetch.
     */
    orderBy?: PricingModuleOrderByWithRelationInput | PricingModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PricingModules.
     */
    cursor?: PricingModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingModules.
     */
    skip?: number
    distinct?: PricingModuleScalarFieldEnum | PricingModuleScalarFieldEnum[]
  }

  /**
   * PricingModule create
   */
  export type PricingModuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModule
     */
    select?: PricingModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleInclude<ExtArgs> | null
    /**
     * The data needed to create a PricingModule.
     */
    data: XOR<PricingModuleCreateInput, PricingModuleUncheckedCreateInput>
  }

  /**
   * PricingModule createMany
   */
  export type PricingModuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PricingModules.
     */
    data: PricingModuleCreateManyInput | PricingModuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PricingModule update
   */
  export type PricingModuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModule
     */
    select?: PricingModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleInclude<ExtArgs> | null
    /**
     * The data needed to update a PricingModule.
     */
    data: XOR<PricingModuleUpdateInput, PricingModuleUncheckedUpdateInput>
    /**
     * Choose, which PricingModule to update.
     */
    where: PricingModuleWhereUniqueInput
  }

  /**
   * PricingModule updateMany
   */
  export type PricingModuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PricingModules.
     */
    data: XOR<PricingModuleUpdateManyMutationInput, PricingModuleUncheckedUpdateManyInput>
    /**
     * Filter which PricingModules to update
     */
    where?: PricingModuleWhereInput
    limit?: number
  }

  /**
   * PricingModule upsert
   */
  export type PricingModuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModule
     */
    select?: PricingModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleInclude<ExtArgs> | null
    /**
     * The filter to search for the PricingModule to update in case it exists.
     */
    where: PricingModuleWhereUniqueInput
    /**
     * In case the PricingModule found by the `where` argument doesn't exist, create a new PricingModule with this data.
     */
    create: XOR<PricingModuleCreateInput, PricingModuleUncheckedCreateInput>
    /**
     * In case the PricingModule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PricingModuleUpdateInput, PricingModuleUncheckedUpdateInput>
  }

  /**
   * PricingModule delete
   */
  export type PricingModuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModule
     */
    select?: PricingModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleInclude<ExtArgs> | null
    /**
     * Filter which PricingModule to delete.
     */
    where: PricingModuleWhereUniqueInput
  }

  /**
   * PricingModule deleteMany
   */
  export type PricingModuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingModules to delete
     */
    where?: PricingModuleWhereInput
    limit?: number
  }

  /**
   * PricingModule.features
   */
  export type PricingModule$featuresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleFeature
     */
    select?: PricingModuleFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleFeatureInclude<ExtArgs> | null
    where?: PricingModuleFeatureWhereInput
    orderBy?: PricingModuleFeatureOrderByWithRelationInput | PricingModuleFeatureOrderByWithRelationInput[]
    cursor?: PricingModuleFeatureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PricingModuleFeatureScalarFieldEnum | PricingModuleFeatureScalarFieldEnum[]
  }

  /**
   * PricingModule.Subscription
   */
  export type PricingModule$SubscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * PricingModule without action
   */
  export type PricingModuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModule
     */
    select?: PricingModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleInclude<ExtArgs> | null
  }


  /**
   * Model PricingFeature
   */

  export type AggregatePricingFeature = {
    _count: PricingFeatureCountAggregateOutputType | null
    _avg: PricingFeatureAvgAggregateOutputType | null
    _sum: PricingFeatureSumAggregateOutputType | null
    _min: PricingFeatureMinAggregateOutputType | null
    _max: PricingFeatureMaxAggregateOutputType | null
  }

  export type PricingFeatureAvgAggregateOutputType = {
    cycle: number | null
  }

  export type PricingFeatureSumAggregateOutputType = {
    cycle: number | null
  }

  export type PricingFeatureMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    cycle: number | null
    is_active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PricingFeatureMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    cycle: number | null
    is_active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PricingFeatureCountAggregateOutputType = {
    id: number
    name: number
    description: number
    cycle: number
    is_active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PricingFeatureAvgAggregateInputType = {
    cycle?: true
  }

  export type PricingFeatureSumAggregateInputType = {
    cycle?: true
  }

  export type PricingFeatureMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    cycle?: true
    is_active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PricingFeatureMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    cycle?: true
    is_active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PricingFeatureCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    cycle?: true
    is_active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PricingFeatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingFeature to aggregate.
     */
    where?: PricingFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingFeatures to fetch.
     */
    orderBy?: PricingFeatureOrderByWithRelationInput | PricingFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PricingFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PricingFeatures
    **/
    _count?: true | PricingFeatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PricingFeatureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PricingFeatureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PricingFeatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PricingFeatureMaxAggregateInputType
  }

  export type GetPricingFeatureAggregateType<T extends PricingFeatureAggregateArgs> = {
        [P in keyof T & keyof AggregatePricingFeature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePricingFeature[P]>
      : GetScalarType<T[P], AggregatePricingFeature[P]>
  }




  export type PricingFeatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingFeatureWhereInput
    orderBy?: PricingFeatureOrderByWithAggregationInput | PricingFeatureOrderByWithAggregationInput[]
    by: PricingFeatureScalarFieldEnum[] | PricingFeatureScalarFieldEnum
    having?: PricingFeatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PricingFeatureCountAggregateInputType | true
    _avg?: PricingFeatureAvgAggregateInputType
    _sum?: PricingFeatureSumAggregateInputType
    _min?: PricingFeatureMinAggregateInputType
    _max?: PricingFeatureMaxAggregateInputType
  }

  export type PricingFeatureGroupByOutputType = {
    id: string
    name: string
    description: string
    cycle: number
    is_active: boolean | null
    createdAt: Date
    updatedAt: Date
    _count: PricingFeatureCountAggregateOutputType | null
    _avg: PricingFeatureAvgAggregateOutputType | null
    _sum: PricingFeatureSumAggregateOutputType | null
    _min: PricingFeatureMinAggregateOutputType | null
    _max: PricingFeatureMaxAggregateOutputType | null
  }

  type GetPricingFeatureGroupByPayload<T extends PricingFeatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PricingFeatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PricingFeatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PricingFeatureGroupByOutputType[P]>
            : GetScalarType<T[P], PricingFeatureGroupByOutputType[P]>
        }
      >
    >


  export type PricingFeatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    cycle?: boolean
    is_active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    modules?: boolean | PricingFeature$modulesArgs<ExtArgs>
    SubscriptionQuota?: boolean | PricingFeature$SubscriptionQuotaArgs<ExtArgs>
    UsageLog?: boolean | PricingFeature$UsageLogArgs<ExtArgs>
    _count?: boolean | PricingFeatureCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pricingFeature"]>


  export type PricingFeatureSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    cycle?: boolean
    is_active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PricingFeatureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    modules?: boolean | PricingFeature$modulesArgs<ExtArgs>
    SubscriptionQuota?: boolean | PricingFeature$SubscriptionQuotaArgs<ExtArgs>
    UsageLog?: boolean | PricingFeature$UsageLogArgs<ExtArgs>
    _count?: boolean | PricingFeatureCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PricingFeaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PricingFeature"
    objects: {
      modules: Prisma.$PricingModuleFeaturePayload<ExtArgs>[]
      SubscriptionQuota: Prisma.$SubscriptionQuotaPayload<ExtArgs>[]
      UsageLog: Prisma.$UsageLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      cycle: number
      is_active: boolean | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pricingFeature"]>
    composites: {}
  }

  type PricingFeatureGetPayload<S extends boolean | null | undefined | PricingFeatureDefaultArgs> = $Result.GetResult<Prisma.$PricingFeaturePayload, S>

  type PricingFeatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PricingFeatureFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PricingFeatureCountAggregateInputType | true
    }

  export interface PricingFeatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PricingFeature'], meta: { name: 'PricingFeature' } }
    /**
     * Find zero or one PricingFeature that matches the filter.
     * @param {PricingFeatureFindUniqueArgs} args - Arguments to find a PricingFeature
     * @example
     * // Get one PricingFeature
     * const pricingFeature = await prisma.pricingFeature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PricingFeatureFindUniqueArgs>(args: SelectSubset<T, PricingFeatureFindUniqueArgs<ExtArgs>>): Prisma__PricingFeatureClient<$Result.GetResult<Prisma.$PricingFeaturePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PricingFeature that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PricingFeatureFindUniqueOrThrowArgs} args - Arguments to find a PricingFeature
     * @example
     * // Get one PricingFeature
     * const pricingFeature = await prisma.pricingFeature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PricingFeatureFindUniqueOrThrowArgs>(args: SelectSubset<T, PricingFeatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PricingFeatureClient<$Result.GetResult<Prisma.$PricingFeaturePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PricingFeature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFeatureFindFirstArgs} args - Arguments to find a PricingFeature
     * @example
     * // Get one PricingFeature
     * const pricingFeature = await prisma.pricingFeature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PricingFeatureFindFirstArgs>(args?: SelectSubset<T, PricingFeatureFindFirstArgs<ExtArgs>>): Prisma__PricingFeatureClient<$Result.GetResult<Prisma.$PricingFeaturePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PricingFeature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFeatureFindFirstOrThrowArgs} args - Arguments to find a PricingFeature
     * @example
     * // Get one PricingFeature
     * const pricingFeature = await prisma.pricingFeature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PricingFeatureFindFirstOrThrowArgs>(args?: SelectSubset<T, PricingFeatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__PricingFeatureClient<$Result.GetResult<Prisma.$PricingFeaturePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PricingFeatures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFeatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PricingFeatures
     * const pricingFeatures = await prisma.pricingFeature.findMany()
     * 
     * // Get first 10 PricingFeatures
     * const pricingFeatures = await prisma.pricingFeature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pricingFeatureWithIdOnly = await prisma.pricingFeature.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PricingFeatureFindManyArgs>(args?: SelectSubset<T, PricingFeatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingFeaturePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PricingFeature.
     * @param {PricingFeatureCreateArgs} args - Arguments to create a PricingFeature.
     * @example
     * // Create one PricingFeature
     * const PricingFeature = await prisma.pricingFeature.create({
     *   data: {
     *     // ... data to create a PricingFeature
     *   }
     * })
     * 
     */
    create<T extends PricingFeatureCreateArgs>(args: SelectSubset<T, PricingFeatureCreateArgs<ExtArgs>>): Prisma__PricingFeatureClient<$Result.GetResult<Prisma.$PricingFeaturePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PricingFeatures.
     * @param {PricingFeatureCreateManyArgs} args - Arguments to create many PricingFeatures.
     * @example
     * // Create many PricingFeatures
     * const pricingFeature = await prisma.pricingFeature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PricingFeatureCreateManyArgs>(args?: SelectSubset<T, PricingFeatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PricingFeature.
     * @param {PricingFeatureDeleteArgs} args - Arguments to delete one PricingFeature.
     * @example
     * // Delete one PricingFeature
     * const PricingFeature = await prisma.pricingFeature.delete({
     *   where: {
     *     // ... filter to delete one PricingFeature
     *   }
     * })
     * 
     */
    delete<T extends PricingFeatureDeleteArgs>(args: SelectSubset<T, PricingFeatureDeleteArgs<ExtArgs>>): Prisma__PricingFeatureClient<$Result.GetResult<Prisma.$PricingFeaturePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PricingFeature.
     * @param {PricingFeatureUpdateArgs} args - Arguments to update one PricingFeature.
     * @example
     * // Update one PricingFeature
     * const pricingFeature = await prisma.pricingFeature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PricingFeatureUpdateArgs>(args: SelectSubset<T, PricingFeatureUpdateArgs<ExtArgs>>): Prisma__PricingFeatureClient<$Result.GetResult<Prisma.$PricingFeaturePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PricingFeatures.
     * @param {PricingFeatureDeleteManyArgs} args - Arguments to filter PricingFeatures to delete.
     * @example
     * // Delete a few PricingFeatures
     * const { count } = await prisma.pricingFeature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PricingFeatureDeleteManyArgs>(args?: SelectSubset<T, PricingFeatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PricingFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFeatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PricingFeatures
     * const pricingFeature = await prisma.pricingFeature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PricingFeatureUpdateManyArgs>(args: SelectSubset<T, PricingFeatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PricingFeature.
     * @param {PricingFeatureUpsertArgs} args - Arguments to update or create a PricingFeature.
     * @example
     * // Update or create a PricingFeature
     * const pricingFeature = await prisma.pricingFeature.upsert({
     *   create: {
     *     // ... data to create a PricingFeature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PricingFeature we want to update
     *   }
     * })
     */
    upsert<T extends PricingFeatureUpsertArgs>(args: SelectSubset<T, PricingFeatureUpsertArgs<ExtArgs>>): Prisma__PricingFeatureClient<$Result.GetResult<Prisma.$PricingFeaturePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PricingFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFeatureCountArgs} args - Arguments to filter PricingFeatures to count.
     * @example
     * // Count the number of PricingFeatures
     * const count = await prisma.pricingFeature.count({
     *   where: {
     *     // ... the filter for the PricingFeatures we want to count
     *   }
     * })
    **/
    count<T extends PricingFeatureCountArgs>(
      args?: Subset<T, PricingFeatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PricingFeatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PricingFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFeatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PricingFeatureAggregateArgs>(args: Subset<T, PricingFeatureAggregateArgs>): Prisma.PrismaPromise<GetPricingFeatureAggregateType<T>>

    /**
     * Group by PricingFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFeatureGroupByArgs} args - Group by arguments.
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
      T extends PricingFeatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PricingFeatureGroupByArgs['orderBy'] }
        : { orderBy?: PricingFeatureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PricingFeatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPricingFeatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PricingFeature model
   */
  readonly fields: PricingFeatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PricingFeature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PricingFeatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    modules<T extends PricingFeature$modulesArgs<ExtArgs> = {}>(args?: Subset<T, PricingFeature$modulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingModuleFeaturePayload<ExtArgs>, T, "findMany"> | Null>
    SubscriptionQuota<T extends PricingFeature$SubscriptionQuotaArgs<ExtArgs> = {}>(args?: Subset<T, PricingFeature$SubscriptionQuotaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionQuotaPayload<ExtArgs>, T, "findMany"> | Null>
    UsageLog<T extends PricingFeature$UsageLogArgs<ExtArgs> = {}>(args?: Subset<T, PricingFeature$UsageLogArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PricingFeature model
   */ 
  interface PricingFeatureFieldRefs {
    readonly id: FieldRef<"PricingFeature", 'String'>
    readonly name: FieldRef<"PricingFeature", 'String'>
    readonly description: FieldRef<"PricingFeature", 'String'>
    readonly cycle: FieldRef<"PricingFeature", 'Int'>
    readonly is_active: FieldRef<"PricingFeature", 'Boolean'>
    readonly createdAt: FieldRef<"PricingFeature", 'DateTime'>
    readonly updatedAt: FieldRef<"PricingFeature", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PricingFeature findUnique
   */
  export type PricingFeatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PricingFeature to fetch.
     */
    where: PricingFeatureWhereUniqueInput
  }

  /**
   * PricingFeature findUniqueOrThrow
   */
  export type PricingFeatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PricingFeature to fetch.
     */
    where: PricingFeatureWhereUniqueInput
  }

  /**
   * PricingFeature findFirst
   */
  export type PricingFeatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PricingFeature to fetch.
     */
    where?: PricingFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingFeatures to fetch.
     */
    orderBy?: PricingFeatureOrderByWithRelationInput | PricingFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingFeatures.
     */
    cursor?: PricingFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingFeatures.
     */
    distinct?: PricingFeatureScalarFieldEnum | PricingFeatureScalarFieldEnum[]
  }

  /**
   * PricingFeature findFirstOrThrow
   */
  export type PricingFeatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PricingFeature to fetch.
     */
    where?: PricingFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingFeatures to fetch.
     */
    orderBy?: PricingFeatureOrderByWithRelationInput | PricingFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingFeatures.
     */
    cursor?: PricingFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingFeatures.
     */
    distinct?: PricingFeatureScalarFieldEnum | PricingFeatureScalarFieldEnum[]
  }

  /**
   * PricingFeature findMany
   */
  export type PricingFeatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PricingFeatures to fetch.
     */
    where?: PricingFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingFeatures to fetch.
     */
    orderBy?: PricingFeatureOrderByWithRelationInput | PricingFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PricingFeatures.
     */
    cursor?: PricingFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingFeatures.
     */
    skip?: number
    distinct?: PricingFeatureScalarFieldEnum | PricingFeatureScalarFieldEnum[]
  }

  /**
   * PricingFeature create
   */
  export type PricingFeatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
    /**
     * The data needed to create a PricingFeature.
     */
    data: XOR<PricingFeatureCreateInput, PricingFeatureUncheckedCreateInput>
  }

  /**
   * PricingFeature createMany
   */
  export type PricingFeatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PricingFeatures.
     */
    data: PricingFeatureCreateManyInput | PricingFeatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PricingFeature update
   */
  export type PricingFeatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
    /**
     * The data needed to update a PricingFeature.
     */
    data: XOR<PricingFeatureUpdateInput, PricingFeatureUncheckedUpdateInput>
    /**
     * Choose, which PricingFeature to update.
     */
    where: PricingFeatureWhereUniqueInput
  }

  /**
   * PricingFeature updateMany
   */
  export type PricingFeatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PricingFeatures.
     */
    data: XOR<PricingFeatureUpdateManyMutationInput, PricingFeatureUncheckedUpdateManyInput>
    /**
     * Filter which PricingFeatures to update
     */
    where?: PricingFeatureWhereInput
    limit?: number
  }

  /**
   * PricingFeature upsert
   */
  export type PricingFeatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
    /**
     * The filter to search for the PricingFeature to update in case it exists.
     */
    where: PricingFeatureWhereUniqueInput
    /**
     * In case the PricingFeature found by the `where` argument doesn't exist, create a new PricingFeature with this data.
     */
    create: XOR<PricingFeatureCreateInput, PricingFeatureUncheckedCreateInput>
    /**
     * In case the PricingFeature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PricingFeatureUpdateInput, PricingFeatureUncheckedUpdateInput>
  }

  /**
   * PricingFeature delete
   */
  export type PricingFeatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
    /**
     * Filter which PricingFeature to delete.
     */
    where: PricingFeatureWhereUniqueInput
  }

  /**
   * PricingFeature deleteMany
   */
  export type PricingFeatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingFeatures to delete
     */
    where?: PricingFeatureWhereInput
    limit?: number
  }

  /**
   * PricingFeature.modules
   */
  export type PricingFeature$modulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleFeature
     */
    select?: PricingModuleFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleFeatureInclude<ExtArgs> | null
    where?: PricingModuleFeatureWhereInput
    orderBy?: PricingModuleFeatureOrderByWithRelationInput | PricingModuleFeatureOrderByWithRelationInput[]
    cursor?: PricingModuleFeatureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PricingModuleFeatureScalarFieldEnum | PricingModuleFeatureScalarFieldEnum[]
  }

  /**
   * PricingFeature.SubscriptionQuota
   */
  export type PricingFeature$SubscriptionQuotaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionQuota
     */
    select?: SubscriptionQuotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionQuotaInclude<ExtArgs> | null
    where?: SubscriptionQuotaWhereInput
    orderBy?: SubscriptionQuotaOrderByWithRelationInput | SubscriptionQuotaOrderByWithRelationInput[]
    cursor?: SubscriptionQuotaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionQuotaScalarFieldEnum | SubscriptionQuotaScalarFieldEnum[]
  }

  /**
   * PricingFeature.UsageLog
   */
  export type PricingFeature$UsageLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    where?: UsageLogWhereInput
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    cursor?: UsageLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * PricingFeature without action
   */
  export type PricingFeatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
  }


  /**
   * Model PricingModuleFeature
   */

  export type AggregatePricingModuleFeature = {
    _count: PricingModuleFeatureCountAggregateOutputType | null
    _avg: PricingModuleFeatureAvgAggregateOutputType | null
    _sum: PricingModuleFeatureSumAggregateOutputType | null
    _min: PricingModuleFeatureMinAggregateOutputType | null
    _max: PricingModuleFeatureMaxAggregateOutputType | null
  }

  export type PricingModuleFeatureAvgAggregateOutputType = {
    moduleId: number | null
    limit_quantity: number | null
    cycle: number | null
  }

  export type PricingModuleFeatureSumAggregateOutputType = {
    moduleId: number | null
    limit_quantity: number | null
    cycle: number | null
  }

  export type PricingModuleFeatureMinAggregateOutputType = {
    moduleId: number | null
    featureId: string | null
    limit_quantity: number | null
    cycle: number | null
    createdAt: Date | null
  }

  export type PricingModuleFeatureMaxAggregateOutputType = {
    moduleId: number | null
    featureId: string | null
    limit_quantity: number | null
    cycle: number | null
    createdAt: Date | null
  }

  export type PricingModuleFeatureCountAggregateOutputType = {
    moduleId: number
    featureId: number
    limit_quantity: number
    cycle: number
    createdAt: number
    _all: number
  }


  export type PricingModuleFeatureAvgAggregateInputType = {
    moduleId?: true
    limit_quantity?: true
    cycle?: true
  }

  export type PricingModuleFeatureSumAggregateInputType = {
    moduleId?: true
    limit_quantity?: true
    cycle?: true
  }

  export type PricingModuleFeatureMinAggregateInputType = {
    moduleId?: true
    featureId?: true
    limit_quantity?: true
    cycle?: true
    createdAt?: true
  }

  export type PricingModuleFeatureMaxAggregateInputType = {
    moduleId?: true
    featureId?: true
    limit_quantity?: true
    cycle?: true
    createdAt?: true
  }

  export type PricingModuleFeatureCountAggregateInputType = {
    moduleId?: true
    featureId?: true
    limit_quantity?: true
    cycle?: true
    createdAt?: true
    _all?: true
  }

  export type PricingModuleFeatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingModuleFeature to aggregate.
     */
    where?: PricingModuleFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingModuleFeatures to fetch.
     */
    orderBy?: PricingModuleFeatureOrderByWithRelationInput | PricingModuleFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PricingModuleFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingModuleFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingModuleFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PricingModuleFeatures
    **/
    _count?: true | PricingModuleFeatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PricingModuleFeatureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PricingModuleFeatureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PricingModuleFeatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PricingModuleFeatureMaxAggregateInputType
  }

  export type GetPricingModuleFeatureAggregateType<T extends PricingModuleFeatureAggregateArgs> = {
        [P in keyof T & keyof AggregatePricingModuleFeature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePricingModuleFeature[P]>
      : GetScalarType<T[P], AggregatePricingModuleFeature[P]>
  }




  export type PricingModuleFeatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingModuleFeatureWhereInput
    orderBy?: PricingModuleFeatureOrderByWithAggregationInput | PricingModuleFeatureOrderByWithAggregationInput[]
    by: PricingModuleFeatureScalarFieldEnum[] | PricingModuleFeatureScalarFieldEnum
    having?: PricingModuleFeatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PricingModuleFeatureCountAggregateInputType | true
    _avg?: PricingModuleFeatureAvgAggregateInputType
    _sum?: PricingModuleFeatureSumAggregateInputType
    _min?: PricingModuleFeatureMinAggregateInputType
    _max?: PricingModuleFeatureMaxAggregateInputType
  }

  export type PricingModuleFeatureGroupByOutputType = {
    moduleId: number
    featureId: string
    limit_quantity: number
    cycle: number
    createdAt: Date
    _count: PricingModuleFeatureCountAggregateOutputType | null
    _avg: PricingModuleFeatureAvgAggregateOutputType | null
    _sum: PricingModuleFeatureSumAggregateOutputType | null
    _min: PricingModuleFeatureMinAggregateOutputType | null
    _max: PricingModuleFeatureMaxAggregateOutputType | null
  }

  type GetPricingModuleFeatureGroupByPayload<T extends PricingModuleFeatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PricingModuleFeatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PricingModuleFeatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PricingModuleFeatureGroupByOutputType[P]>
            : GetScalarType<T[P], PricingModuleFeatureGroupByOutputType[P]>
        }
      >
    >


  export type PricingModuleFeatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    moduleId?: boolean
    featureId?: boolean
    limit_quantity?: boolean
    cycle?: boolean
    createdAt?: boolean
    module?: boolean | PricingModuleFeature$moduleArgs<ExtArgs>
    feature?: boolean | PricingModuleFeature$featureArgs<ExtArgs>
  }, ExtArgs["result"]["pricingModuleFeature"]>


  export type PricingModuleFeatureSelectScalar = {
    moduleId?: boolean
    featureId?: boolean
    limit_quantity?: boolean
    cycle?: boolean
    createdAt?: boolean
  }

  export type PricingModuleFeatureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    module?: boolean | PricingModuleFeature$moduleArgs<ExtArgs>
    feature?: boolean | PricingModuleFeature$featureArgs<ExtArgs>
  }

  export type $PricingModuleFeaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PricingModuleFeature"
    objects: {
      module: Prisma.$PricingModulePayload<ExtArgs> | null
      feature: Prisma.$PricingFeaturePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      moduleId: number
      featureId: string
      limit_quantity: number
      cycle: number
      createdAt: Date
    }, ExtArgs["result"]["pricingModuleFeature"]>
    composites: {}
  }

  type PricingModuleFeatureGetPayload<S extends boolean | null | undefined | PricingModuleFeatureDefaultArgs> = $Result.GetResult<Prisma.$PricingModuleFeaturePayload, S>

  type PricingModuleFeatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PricingModuleFeatureFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PricingModuleFeatureCountAggregateInputType | true
    }

  export interface PricingModuleFeatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PricingModuleFeature'], meta: { name: 'PricingModuleFeature' } }
    /**
     * Find zero or one PricingModuleFeature that matches the filter.
     * @param {PricingModuleFeatureFindUniqueArgs} args - Arguments to find a PricingModuleFeature
     * @example
     * // Get one PricingModuleFeature
     * const pricingModuleFeature = await prisma.pricingModuleFeature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PricingModuleFeatureFindUniqueArgs>(args: SelectSubset<T, PricingModuleFeatureFindUniqueArgs<ExtArgs>>): Prisma__PricingModuleFeatureClient<$Result.GetResult<Prisma.$PricingModuleFeaturePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PricingModuleFeature that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PricingModuleFeatureFindUniqueOrThrowArgs} args - Arguments to find a PricingModuleFeature
     * @example
     * // Get one PricingModuleFeature
     * const pricingModuleFeature = await prisma.pricingModuleFeature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PricingModuleFeatureFindUniqueOrThrowArgs>(args: SelectSubset<T, PricingModuleFeatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PricingModuleFeatureClient<$Result.GetResult<Prisma.$PricingModuleFeaturePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PricingModuleFeature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleFeatureFindFirstArgs} args - Arguments to find a PricingModuleFeature
     * @example
     * // Get one PricingModuleFeature
     * const pricingModuleFeature = await prisma.pricingModuleFeature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PricingModuleFeatureFindFirstArgs>(args?: SelectSubset<T, PricingModuleFeatureFindFirstArgs<ExtArgs>>): Prisma__PricingModuleFeatureClient<$Result.GetResult<Prisma.$PricingModuleFeaturePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PricingModuleFeature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleFeatureFindFirstOrThrowArgs} args - Arguments to find a PricingModuleFeature
     * @example
     * // Get one PricingModuleFeature
     * const pricingModuleFeature = await prisma.pricingModuleFeature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PricingModuleFeatureFindFirstOrThrowArgs>(args?: SelectSubset<T, PricingModuleFeatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__PricingModuleFeatureClient<$Result.GetResult<Prisma.$PricingModuleFeaturePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PricingModuleFeatures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleFeatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PricingModuleFeatures
     * const pricingModuleFeatures = await prisma.pricingModuleFeature.findMany()
     * 
     * // Get first 10 PricingModuleFeatures
     * const pricingModuleFeatures = await prisma.pricingModuleFeature.findMany({ take: 10 })
     * 
     * // Only select the `moduleId`
     * const pricingModuleFeatureWithModuleIdOnly = await prisma.pricingModuleFeature.findMany({ select: { moduleId: true } })
     * 
     */
    findMany<T extends PricingModuleFeatureFindManyArgs>(args?: SelectSubset<T, PricingModuleFeatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingModuleFeaturePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PricingModuleFeature.
     * @param {PricingModuleFeatureCreateArgs} args - Arguments to create a PricingModuleFeature.
     * @example
     * // Create one PricingModuleFeature
     * const PricingModuleFeature = await prisma.pricingModuleFeature.create({
     *   data: {
     *     // ... data to create a PricingModuleFeature
     *   }
     * })
     * 
     */
    create<T extends PricingModuleFeatureCreateArgs>(args: SelectSubset<T, PricingModuleFeatureCreateArgs<ExtArgs>>): Prisma__PricingModuleFeatureClient<$Result.GetResult<Prisma.$PricingModuleFeaturePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PricingModuleFeatures.
     * @param {PricingModuleFeatureCreateManyArgs} args - Arguments to create many PricingModuleFeatures.
     * @example
     * // Create many PricingModuleFeatures
     * const pricingModuleFeature = await prisma.pricingModuleFeature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PricingModuleFeatureCreateManyArgs>(args?: SelectSubset<T, PricingModuleFeatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PricingModuleFeature.
     * @param {PricingModuleFeatureDeleteArgs} args - Arguments to delete one PricingModuleFeature.
     * @example
     * // Delete one PricingModuleFeature
     * const PricingModuleFeature = await prisma.pricingModuleFeature.delete({
     *   where: {
     *     // ... filter to delete one PricingModuleFeature
     *   }
     * })
     * 
     */
    delete<T extends PricingModuleFeatureDeleteArgs>(args: SelectSubset<T, PricingModuleFeatureDeleteArgs<ExtArgs>>): Prisma__PricingModuleFeatureClient<$Result.GetResult<Prisma.$PricingModuleFeaturePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PricingModuleFeature.
     * @param {PricingModuleFeatureUpdateArgs} args - Arguments to update one PricingModuleFeature.
     * @example
     * // Update one PricingModuleFeature
     * const pricingModuleFeature = await prisma.pricingModuleFeature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PricingModuleFeatureUpdateArgs>(args: SelectSubset<T, PricingModuleFeatureUpdateArgs<ExtArgs>>): Prisma__PricingModuleFeatureClient<$Result.GetResult<Prisma.$PricingModuleFeaturePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PricingModuleFeatures.
     * @param {PricingModuleFeatureDeleteManyArgs} args - Arguments to filter PricingModuleFeatures to delete.
     * @example
     * // Delete a few PricingModuleFeatures
     * const { count } = await prisma.pricingModuleFeature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PricingModuleFeatureDeleteManyArgs>(args?: SelectSubset<T, PricingModuleFeatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PricingModuleFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleFeatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PricingModuleFeatures
     * const pricingModuleFeature = await prisma.pricingModuleFeature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PricingModuleFeatureUpdateManyArgs>(args: SelectSubset<T, PricingModuleFeatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PricingModuleFeature.
     * @param {PricingModuleFeatureUpsertArgs} args - Arguments to update or create a PricingModuleFeature.
     * @example
     * // Update or create a PricingModuleFeature
     * const pricingModuleFeature = await prisma.pricingModuleFeature.upsert({
     *   create: {
     *     // ... data to create a PricingModuleFeature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PricingModuleFeature we want to update
     *   }
     * })
     */
    upsert<T extends PricingModuleFeatureUpsertArgs>(args: SelectSubset<T, PricingModuleFeatureUpsertArgs<ExtArgs>>): Prisma__PricingModuleFeatureClient<$Result.GetResult<Prisma.$PricingModuleFeaturePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PricingModuleFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleFeatureCountArgs} args - Arguments to filter PricingModuleFeatures to count.
     * @example
     * // Count the number of PricingModuleFeatures
     * const count = await prisma.pricingModuleFeature.count({
     *   where: {
     *     // ... the filter for the PricingModuleFeatures we want to count
     *   }
     * })
    **/
    count<T extends PricingModuleFeatureCountArgs>(
      args?: Subset<T, PricingModuleFeatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PricingModuleFeatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PricingModuleFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleFeatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PricingModuleFeatureAggregateArgs>(args: Subset<T, PricingModuleFeatureAggregateArgs>): Prisma.PrismaPromise<GetPricingModuleFeatureAggregateType<T>>

    /**
     * Group by PricingModuleFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModuleFeatureGroupByArgs} args - Group by arguments.
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
      T extends PricingModuleFeatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PricingModuleFeatureGroupByArgs['orderBy'] }
        : { orderBy?: PricingModuleFeatureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PricingModuleFeatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPricingModuleFeatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PricingModuleFeature model
   */
  readonly fields: PricingModuleFeatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PricingModuleFeature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PricingModuleFeatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    module<T extends PricingModuleFeature$moduleArgs<ExtArgs> = {}>(args?: Subset<T, PricingModuleFeature$moduleArgs<ExtArgs>>): Prisma__PricingModuleClient<$Result.GetResult<Prisma.$PricingModulePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    feature<T extends PricingModuleFeature$featureArgs<ExtArgs> = {}>(args?: Subset<T, PricingModuleFeature$featureArgs<ExtArgs>>): Prisma__PricingFeatureClient<$Result.GetResult<Prisma.$PricingFeaturePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PricingModuleFeature model
   */ 
  interface PricingModuleFeatureFieldRefs {
    readonly moduleId: FieldRef<"PricingModuleFeature", 'Int'>
    readonly featureId: FieldRef<"PricingModuleFeature", 'String'>
    readonly limit_quantity: FieldRef<"PricingModuleFeature", 'Int'>
    readonly cycle: FieldRef<"PricingModuleFeature", 'Int'>
    readonly createdAt: FieldRef<"PricingModuleFeature", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PricingModuleFeature findUnique
   */
  export type PricingModuleFeatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleFeature
     */
    select?: PricingModuleFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PricingModuleFeature to fetch.
     */
    where: PricingModuleFeatureWhereUniqueInput
  }

  /**
   * PricingModuleFeature findUniqueOrThrow
   */
  export type PricingModuleFeatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleFeature
     */
    select?: PricingModuleFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PricingModuleFeature to fetch.
     */
    where: PricingModuleFeatureWhereUniqueInput
  }

  /**
   * PricingModuleFeature findFirst
   */
  export type PricingModuleFeatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleFeature
     */
    select?: PricingModuleFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PricingModuleFeature to fetch.
     */
    where?: PricingModuleFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingModuleFeatures to fetch.
     */
    orderBy?: PricingModuleFeatureOrderByWithRelationInput | PricingModuleFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingModuleFeatures.
     */
    cursor?: PricingModuleFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingModuleFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingModuleFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingModuleFeatures.
     */
    distinct?: PricingModuleFeatureScalarFieldEnum | PricingModuleFeatureScalarFieldEnum[]
  }

  /**
   * PricingModuleFeature findFirstOrThrow
   */
  export type PricingModuleFeatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleFeature
     */
    select?: PricingModuleFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PricingModuleFeature to fetch.
     */
    where?: PricingModuleFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingModuleFeatures to fetch.
     */
    orderBy?: PricingModuleFeatureOrderByWithRelationInput | PricingModuleFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingModuleFeatures.
     */
    cursor?: PricingModuleFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingModuleFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingModuleFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingModuleFeatures.
     */
    distinct?: PricingModuleFeatureScalarFieldEnum | PricingModuleFeatureScalarFieldEnum[]
  }

  /**
   * PricingModuleFeature findMany
   */
  export type PricingModuleFeatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleFeature
     */
    select?: PricingModuleFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PricingModuleFeatures to fetch.
     */
    where?: PricingModuleFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingModuleFeatures to fetch.
     */
    orderBy?: PricingModuleFeatureOrderByWithRelationInput | PricingModuleFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PricingModuleFeatures.
     */
    cursor?: PricingModuleFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingModuleFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingModuleFeatures.
     */
    skip?: number
    distinct?: PricingModuleFeatureScalarFieldEnum | PricingModuleFeatureScalarFieldEnum[]
  }

  /**
   * PricingModuleFeature create
   */
  export type PricingModuleFeatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleFeature
     */
    select?: PricingModuleFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleFeatureInclude<ExtArgs> | null
    /**
     * The data needed to create a PricingModuleFeature.
     */
    data: XOR<PricingModuleFeatureCreateInput, PricingModuleFeatureUncheckedCreateInput>
  }

  /**
   * PricingModuleFeature createMany
   */
  export type PricingModuleFeatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PricingModuleFeatures.
     */
    data: PricingModuleFeatureCreateManyInput | PricingModuleFeatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PricingModuleFeature update
   */
  export type PricingModuleFeatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleFeature
     */
    select?: PricingModuleFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleFeatureInclude<ExtArgs> | null
    /**
     * The data needed to update a PricingModuleFeature.
     */
    data: XOR<PricingModuleFeatureUpdateInput, PricingModuleFeatureUncheckedUpdateInput>
    /**
     * Choose, which PricingModuleFeature to update.
     */
    where: PricingModuleFeatureWhereUniqueInput
  }

  /**
   * PricingModuleFeature updateMany
   */
  export type PricingModuleFeatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PricingModuleFeatures.
     */
    data: XOR<PricingModuleFeatureUpdateManyMutationInput, PricingModuleFeatureUncheckedUpdateManyInput>
    /**
     * Filter which PricingModuleFeatures to update
     */
    where?: PricingModuleFeatureWhereInput
    limit?: number
  }

  /**
   * PricingModuleFeature upsert
   */
  export type PricingModuleFeatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleFeature
     */
    select?: PricingModuleFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleFeatureInclude<ExtArgs> | null
    /**
     * The filter to search for the PricingModuleFeature to update in case it exists.
     */
    where: PricingModuleFeatureWhereUniqueInput
    /**
     * In case the PricingModuleFeature found by the `where` argument doesn't exist, create a new PricingModuleFeature with this data.
     */
    create: XOR<PricingModuleFeatureCreateInput, PricingModuleFeatureUncheckedCreateInput>
    /**
     * In case the PricingModuleFeature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PricingModuleFeatureUpdateInput, PricingModuleFeatureUncheckedUpdateInput>
  }

  /**
   * PricingModuleFeature delete
   */
  export type PricingModuleFeatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleFeature
     */
    select?: PricingModuleFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleFeatureInclude<ExtArgs> | null
    /**
     * Filter which PricingModuleFeature to delete.
     */
    where: PricingModuleFeatureWhereUniqueInput
  }

  /**
   * PricingModuleFeature deleteMany
   */
  export type PricingModuleFeatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingModuleFeatures to delete
     */
    where?: PricingModuleFeatureWhereInput
    limit?: number
  }

  /**
   * PricingModuleFeature.module
   */
  export type PricingModuleFeature$moduleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModule
     */
    select?: PricingModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleInclude<ExtArgs> | null
    where?: PricingModuleWhereInput
  }

  /**
   * PricingModuleFeature.feature
   */
  export type PricingModuleFeature$featureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
    where?: PricingFeatureWhereInput
  }

  /**
   * PricingModuleFeature without action
   */
  export type PricingModuleFeatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModuleFeature
     */
    select?: PricingModuleFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleFeatureInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionAvgAggregateOutputType = {
    userId: number | null
    amount: number | null
    moduleId: number | null
  }

  export type SubscriptionSumAggregateOutputType = {
    userId: bigint | null
    amount: number | null
    moduleId: number | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    userId: bigint | null
    start_time: Date | null
    next_billing_time: Date | null
    external_subscription_id: string | null
    status: string | null
    amount: number | null
    moduleId: number | null
    is_trial: boolean | null
    is_test: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    userId: bigint | null
    start_time: Date | null
    next_billing_time: Date | null
    external_subscription_id: string | null
    status: string | null
    amount: number | null
    moduleId: number | null
    is_trial: boolean | null
    is_test: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    userId: number
    start_time: number
    next_billing_time: number
    external_subscription_id: number
    status: number
    amount: number
    moduleId: number
    is_trial: number
    is_test: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionAvgAggregateInputType = {
    userId?: true
    amount?: true
    moduleId?: true
  }

  export type SubscriptionSumAggregateInputType = {
    userId?: true
    amount?: true
    moduleId?: true
  }

  export type SubscriptionMinAggregateInputType = {
    id?: true
    userId?: true
    start_time?: true
    next_billing_time?: true
    external_subscription_id?: true
    status?: true
    amount?: true
    moduleId?: true
    is_trial?: true
    is_test?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    userId?: true
    start_time?: true
    next_billing_time?: true
    external_subscription_id?: true
    status?: true
    amount?: true
    moduleId?: true
    is_trial?: true
    is_test?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    userId?: true
    start_time?: true
    next_billing_time?: true
    external_subscription_id?: true
    status?: true
    amount?: true
    moduleId?: true
    is_trial?: true
    is_test?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _avg?: SubscriptionAvgAggregateInputType
    _sum?: SubscriptionSumAggregateInputType
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    userId: bigint
    start_time: Date | null
    next_billing_time: Date | null
    external_subscription_id: string
    status: string
    amount: number
    moduleId: number
    is_trial: boolean | null
    is_test: boolean | null
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    start_time?: boolean
    next_billing_time?: boolean
    external_subscription_id?: boolean
    status?: boolean
    amount?: boolean
    moduleId?: boolean
    is_trial?: boolean
    is_test?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    module?: boolean | Subscription$moduleArgs<ExtArgs>
    user?: boolean | Subscription$userArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>


  export type SubscriptionSelectScalar = {
    id?: boolean
    userId?: boolean
    start_time?: boolean
    next_billing_time?: boolean
    external_subscription_id?: boolean
    status?: boolean
    amount?: boolean
    moduleId?: boolean
    is_trial?: boolean
    is_test?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    module?: boolean | Subscription$moduleArgs<ExtArgs>
    user?: boolean | Subscription$userArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      module: Prisma.$PricingModulePayload<ExtArgs> | null
      user: Prisma.$SessionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: bigint
      start_time: Date | null
      next_billing_time: Date | null
      external_subscription_id: string
      status: string
      amount: number
      moduleId: number
      is_trial: boolean | null
      is_test: boolean | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
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
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    module<T extends Subscription$moduleArgs<ExtArgs> = {}>(args?: Subset<T, Subscription$moduleArgs<ExtArgs>>): Prisma__PricingModuleClient<$Result.GetResult<Prisma.$PricingModulePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    user<T extends Subscription$userArgs<ExtArgs> = {}>(args?: Subset<T, Subscription$userArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */ 
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly userId: FieldRef<"Subscription", 'BigInt'>
    readonly start_time: FieldRef<"Subscription", 'DateTime'>
    readonly next_billing_time: FieldRef<"Subscription", 'DateTime'>
    readonly external_subscription_id: FieldRef<"Subscription", 'String'>
    readonly status: FieldRef<"Subscription", 'String'>
    readonly amount: FieldRef<"Subscription", 'Float'>
    readonly moduleId: FieldRef<"Subscription", 'Int'>
    readonly is_trial: FieldRef<"Subscription", 'Boolean'>
    readonly is_test: FieldRef<"Subscription", 'Boolean'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    limit?: number
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    limit?: number
  }

  /**
   * Subscription.module
   */
  export type Subscription$moduleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModule
     */
    select?: PricingModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModuleInclude<ExtArgs> | null
    where?: PricingModuleWhereInput
  }

  /**
   * Subscription.user
   */
  export type Subscription$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model SubscriptionQuota
   */

  export type AggregateSubscriptionQuota = {
    _count: SubscriptionQuotaCountAggregateOutputType | null
    _avg: SubscriptionQuotaAvgAggregateOutputType | null
    _sum: SubscriptionQuotaSumAggregateOutputType | null
    _min: SubscriptionQuotaMinAggregateOutputType | null
    _max: SubscriptionQuotaMaxAggregateOutputType | null
  }

  export type SubscriptionQuotaAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    limit_quantity: number | null
    used_quantity: number | null
  }

  export type SubscriptionQuotaSumAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    limit_quantity: number | null
    used_quantity: number | null
  }

  export type SubscriptionQuotaMinAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    feature_id: string | null
    limit_quantity: number | null
    used_quantity: number | null
    type: $Enums.QuotaType | null
    createdAt: Date | null
  }

  export type SubscriptionQuotaMaxAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    feature_id: string | null
    limit_quantity: number | null
    used_quantity: number | null
    type: $Enums.QuotaType | null
    createdAt: Date | null
  }

  export type SubscriptionQuotaCountAggregateOutputType = {
    id: number
    userId: number
    feature_id: number
    limit_quantity: number
    used_quantity: number
    type: number
    createdAt: number
    _all: number
  }


  export type SubscriptionQuotaAvgAggregateInputType = {
    id?: true
    userId?: true
    limit_quantity?: true
    used_quantity?: true
  }

  export type SubscriptionQuotaSumAggregateInputType = {
    id?: true
    userId?: true
    limit_quantity?: true
    used_quantity?: true
  }

  export type SubscriptionQuotaMinAggregateInputType = {
    id?: true
    userId?: true
    feature_id?: true
    limit_quantity?: true
    used_quantity?: true
    type?: true
    createdAt?: true
  }

  export type SubscriptionQuotaMaxAggregateInputType = {
    id?: true
    userId?: true
    feature_id?: true
    limit_quantity?: true
    used_quantity?: true
    type?: true
    createdAt?: true
  }

  export type SubscriptionQuotaCountAggregateInputType = {
    id?: true
    userId?: true
    feature_id?: true
    limit_quantity?: true
    used_quantity?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type SubscriptionQuotaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionQuota to aggregate.
     */
    where?: SubscriptionQuotaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionQuotas to fetch.
     */
    orderBy?: SubscriptionQuotaOrderByWithRelationInput | SubscriptionQuotaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionQuotaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionQuotas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionQuotas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubscriptionQuotas
    **/
    _count?: true | SubscriptionQuotaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionQuotaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionQuotaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionQuotaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionQuotaMaxAggregateInputType
  }

  export type GetSubscriptionQuotaAggregateType<T extends SubscriptionQuotaAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriptionQuota]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriptionQuota[P]>
      : GetScalarType<T[P], AggregateSubscriptionQuota[P]>
  }




  export type SubscriptionQuotaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionQuotaWhereInput
    orderBy?: SubscriptionQuotaOrderByWithAggregationInput | SubscriptionQuotaOrderByWithAggregationInput[]
    by: SubscriptionQuotaScalarFieldEnum[] | SubscriptionQuotaScalarFieldEnum
    having?: SubscriptionQuotaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionQuotaCountAggregateInputType | true
    _avg?: SubscriptionQuotaAvgAggregateInputType
    _sum?: SubscriptionQuotaSumAggregateInputType
    _min?: SubscriptionQuotaMinAggregateInputType
    _max?: SubscriptionQuotaMaxAggregateInputType
  }

  export type SubscriptionQuotaGroupByOutputType = {
    id: bigint
    userId: bigint
    feature_id: string
    limit_quantity: number
    used_quantity: number
    type: $Enums.QuotaType
    createdAt: Date
    _count: SubscriptionQuotaCountAggregateOutputType | null
    _avg: SubscriptionQuotaAvgAggregateOutputType | null
    _sum: SubscriptionQuotaSumAggregateOutputType | null
    _min: SubscriptionQuotaMinAggregateOutputType | null
    _max: SubscriptionQuotaMaxAggregateOutputType | null
  }

  type GetSubscriptionQuotaGroupByPayload<T extends SubscriptionQuotaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionQuotaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionQuotaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionQuotaGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionQuotaGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionQuotaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    feature_id?: boolean
    limit_quantity?: boolean
    used_quantity?: boolean
    type?: boolean
    createdAt?: boolean
    user?: boolean | SubscriptionQuota$userArgs<ExtArgs>
    feature?: boolean | SubscriptionQuota$featureArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptionQuota"]>


  export type SubscriptionQuotaSelectScalar = {
    id?: boolean
    userId?: boolean
    feature_id?: boolean
    limit_quantity?: boolean
    used_quantity?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type SubscriptionQuotaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | SubscriptionQuota$userArgs<ExtArgs>
    feature?: boolean | SubscriptionQuota$featureArgs<ExtArgs>
  }

  export type $SubscriptionQuotaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubscriptionQuota"
    objects: {
      user: Prisma.$SessionPayload<ExtArgs> | null
      feature: Prisma.$PricingFeaturePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: bigint
      feature_id: string
      limit_quantity: number
      used_quantity: number
      type: $Enums.QuotaType
      createdAt: Date
    }, ExtArgs["result"]["subscriptionQuota"]>
    composites: {}
  }

  type SubscriptionQuotaGetPayload<S extends boolean | null | undefined | SubscriptionQuotaDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionQuotaPayload, S>

  type SubscriptionQuotaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SubscriptionQuotaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SubscriptionQuotaCountAggregateInputType | true
    }

  export interface SubscriptionQuotaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubscriptionQuota'], meta: { name: 'SubscriptionQuota' } }
    /**
     * Find zero or one SubscriptionQuota that matches the filter.
     * @param {SubscriptionQuotaFindUniqueArgs} args - Arguments to find a SubscriptionQuota
     * @example
     * // Get one SubscriptionQuota
     * const subscriptionQuota = await prisma.subscriptionQuota.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionQuotaFindUniqueArgs>(args: SelectSubset<T, SubscriptionQuotaFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionQuotaClient<$Result.GetResult<Prisma.$SubscriptionQuotaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SubscriptionQuota that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SubscriptionQuotaFindUniqueOrThrowArgs} args - Arguments to find a SubscriptionQuota
     * @example
     * // Get one SubscriptionQuota
     * const subscriptionQuota = await prisma.subscriptionQuota.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionQuotaFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionQuotaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionQuotaClient<$Result.GetResult<Prisma.$SubscriptionQuotaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SubscriptionQuota that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionQuotaFindFirstArgs} args - Arguments to find a SubscriptionQuota
     * @example
     * // Get one SubscriptionQuota
     * const subscriptionQuota = await prisma.subscriptionQuota.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionQuotaFindFirstArgs>(args?: SelectSubset<T, SubscriptionQuotaFindFirstArgs<ExtArgs>>): Prisma__SubscriptionQuotaClient<$Result.GetResult<Prisma.$SubscriptionQuotaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SubscriptionQuota that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionQuotaFindFirstOrThrowArgs} args - Arguments to find a SubscriptionQuota
     * @example
     * // Get one SubscriptionQuota
     * const subscriptionQuota = await prisma.subscriptionQuota.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionQuotaFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionQuotaFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionQuotaClient<$Result.GetResult<Prisma.$SubscriptionQuotaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SubscriptionQuotas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionQuotaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubscriptionQuotas
     * const subscriptionQuotas = await prisma.subscriptionQuota.findMany()
     * 
     * // Get first 10 SubscriptionQuotas
     * const subscriptionQuotas = await prisma.subscriptionQuota.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionQuotaWithIdOnly = await prisma.subscriptionQuota.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionQuotaFindManyArgs>(args?: SelectSubset<T, SubscriptionQuotaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionQuotaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SubscriptionQuota.
     * @param {SubscriptionQuotaCreateArgs} args - Arguments to create a SubscriptionQuota.
     * @example
     * // Create one SubscriptionQuota
     * const SubscriptionQuota = await prisma.subscriptionQuota.create({
     *   data: {
     *     // ... data to create a SubscriptionQuota
     *   }
     * })
     * 
     */
    create<T extends SubscriptionQuotaCreateArgs>(args: SelectSubset<T, SubscriptionQuotaCreateArgs<ExtArgs>>): Prisma__SubscriptionQuotaClient<$Result.GetResult<Prisma.$SubscriptionQuotaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SubscriptionQuotas.
     * @param {SubscriptionQuotaCreateManyArgs} args - Arguments to create many SubscriptionQuotas.
     * @example
     * // Create many SubscriptionQuotas
     * const subscriptionQuota = await prisma.subscriptionQuota.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionQuotaCreateManyArgs>(args?: SelectSubset<T, SubscriptionQuotaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SubscriptionQuota.
     * @param {SubscriptionQuotaDeleteArgs} args - Arguments to delete one SubscriptionQuota.
     * @example
     * // Delete one SubscriptionQuota
     * const SubscriptionQuota = await prisma.subscriptionQuota.delete({
     *   where: {
     *     // ... filter to delete one SubscriptionQuota
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionQuotaDeleteArgs>(args: SelectSubset<T, SubscriptionQuotaDeleteArgs<ExtArgs>>): Prisma__SubscriptionQuotaClient<$Result.GetResult<Prisma.$SubscriptionQuotaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SubscriptionQuota.
     * @param {SubscriptionQuotaUpdateArgs} args - Arguments to update one SubscriptionQuota.
     * @example
     * // Update one SubscriptionQuota
     * const subscriptionQuota = await prisma.subscriptionQuota.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionQuotaUpdateArgs>(args: SelectSubset<T, SubscriptionQuotaUpdateArgs<ExtArgs>>): Prisma__SubscriptionQuotaClient<$Result.GetResult<Prisma.$SubscriptionQuotaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SubscriptionQuotas.
     * @param {SubscriptionQuotaDeleteManyArgs} args - Arguments to filter SubscriptionQuotas to delete.
     * @example
     * // Delete a few SubscriptionQuotas
     * const { count } = await prisma.subscriptionQuota.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionQuotaDeleteManyArgs>(args?: SelectSubset<T, SubscriptionQuotaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriptionQuotas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionQuotaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubscriptionQuotas
     * const subscriptionQuota = await prisma.subscriptionQuota.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionQuotaUpdateManyArgs>(args: SelectSubset<T, SubscriptionQuotaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SubscriptionQuota.
     * @param {SubscriptionQuotaUpsertArgs} args - Arguments to update or create a SubscriptionQuota.
     * @example
     * // Update or create a SubscriptionQuota
     * const subscriptionQuota = await prisma.subscriptionQuota.upsert({
     *   create: {
     *     // ... data to create a SubscriptionQuota
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubscriptionQuota we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionQuotaUpsertArgs>(args: SelectSubset<T, SubscriptionQuotaUpsertArgs<ExtArgs>>): Prisma__SubscriptionQuotaClient<$Result.GetResult<Prisma.$SubscriptionQuotaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SubscriptionQuotas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionQuotaCountArgs} args - Arguments to filter SubscriptionQuotas to count.
     * @example
     * // Count the number of SubscriptionQuotas
     * const count = await prisma.subscriptionQuota.count({
     *   where: {
     *     // ... the filter for the SubscriptionQuotas we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionQuotaCountArgs>(
      args?: Subset<T, SubscriptionQuotaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionQuotaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubscriptionQuota.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionQuotaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubscriptionQuotaAggregateArgs>(args: Subset<T, SubscriptionQuotaAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionQuotaAggregateType<T>>

    /**
     * Group by SubscriptionQuota.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionQuotaGroupByArgs} args - Group by arguments.
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
      T extends SubscriptionQuotaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionQuotaGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionQuotaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, SubscriptionQuotaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionQuotaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubscriptionQuota model
   */
  readonly fields: SubscriptionQuotaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubscriptionQuota.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionQuotaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends SubscriptionQuota$userArgs<ExtArgs> = {}>(args?: Subset<T, SubscriptionQuota$userArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    feature<T extends SubscriptionQuota$featureArgs<ExtArgs> = {}>(args?: Subset<T, SubscriptionQuota$featureArgs<ExtArgs>>): Prisma__PricingFeatureClient<$Result.GetResult<Prisma.$PricingFeaturePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubscriptionQuota model
   */ 
  interface SubscriptionQuotaFieldRefs {
    readonly id: FieldRef<"SubscriptionQuota", 'BigInt'>
    readonly userId: FieldRef<"SubscriptionQuota", 'BigInt'>
    readonly feature_id: FieldRef<"SubscriptionQuota", 'String'>
    readonly limit_quantity: FieldRef<"SubscriptionQuota", 'Int'>
    readonly used_quantity: FieldRef<"SubscriptionQuota", 'Int'>
    readonly type: FieldRef<"SubscriptionQuota", 'QuotaType'>
    readonly createdAt: FieldRef<"SubscriptionQuota", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SubscriptionQuota findUnique
   */
  export type SubscriptionQuotaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionQuota
     */
    select?: SubscriptionQuotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionQuotaInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionQuota to fetch.
     */
    where: SubscriptionQuotaWhereUniqueInput
  }

  /**
   * SubscriptionQuota findUniqueOrThrow
   */
  export type SubscriptionQuotaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionQuota
     */
    select?: SubscriptionQuotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionQuotaInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionQuota to fetch.
     */
    where: SubscriptionQuotaWhereUniqueInput
  }

  /**
   * SubscriptionQuota findFirst
   */
  export type SubscriptionQuotaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionQuota
     */
    select?: SubscriptionQuotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionQuotaInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionQuota to fetch.
     */
    where?: SubscriptionQuotaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionQuotas to fetch.
     */
    orderBy?: SubscriptionQuotaOrderByWithRelationInput | SubscriptionQuotaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionQuotas.
     */
    cursor?: SubscriptionQuotaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionQuotas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionQuotas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionQuotas.
     */
    distinct?: SubscriptionQuotaScalarFieldEnum | SubscriptionQuotaScalarFieldEnum[]
  }

  /**
   * SubscriptionQuota findFirstOrThrow
   */
  export type SubscriptionQuotaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionQuota
     */
    select?: SubscriptionQuotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionQuotaInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionQuota to fetch.
     */
    where?: SubscriptionQuotaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionQuotas to fetch.
     */
    orderBy?: SubscriptionQuotaOrderByWithRelationInput | SubscriptionQuotaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionQuotas.
     */
    cursor?: SubscriptionQuotaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionQuotas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionQuotas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionQuotas.
     */
    distinct?: SubscriptionQuotaScalarFieldEnum | SubscriptionQuotaScalarFieldEnum[]
  }

  /**
   * SubscriptionQuota findMany
   */
  export type SubscriptionQuotaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionQuota
     */
    select?: SubscriptionQuotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionQuotaInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionQuotas to fetch.
     */
    where?: SubscriptionQuotaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionQuotas to fetch.
     */
    orderBy?: SubscriptionQuotaOrderByWithRelationInput | SubscriptionQuotaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubscriptionQuotas.
     */
    cursor?: SubscriptionQuotaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionQuotas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionQuotas.
     */
    skip?: number
    distinct?: SubscriptionQuotaScalarFieldEnum | SubscriptionQuotaScalarFieldEnum[]
  }

  /**
   * SubscriptionQuota create
   */
  export type SubscriptionQuotaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionQuota
     */
    select?: SubscriptionQuotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionQuotaInclude<ExtArgs> | null
    /**
     * The data needed to create a SubscriptionQuota.
     */
    data: XOR<SubscriptionQuotaCreateInput, SubscriptionQuotaUncheckedCreateInput>
  }

  /**
   * SubscriptionQuota createMany
   */
  export type SubscriptionQuotaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubscriptionQuotas.
     */
    data: SubscriptionQuotaCreateManyInput | SubscriptionQuotaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubscriptionQuota update
   */
  export type SubscriptionQuotaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionQuota
     */
    select?: SubscriptionQuotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionQuotaInclude<ExtArgs> | null
    /**
     * The data needed to update a SubscriptionQuota.
     */
    data: XOR<SubscriptionQuotaUpdateInput, SubscriptionQuotaUncheckedUpdateInput>
    /**
     * Choose, which SubscriptionQuota to update.
     */
    where: SubscriptionQuotaWhereUniqueInput
  }

  /**
   * SubscriptionQuota updateMany
   */
  export type SubscriptionQuotaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubscriptionQuotas.
     */
    data: XOR<SubscriptionQuotaUpdateManyMutationInput, SubscriptionQuotaUncheckedUpdateManyInput>
    /**
     * Filter which SubscriptionQuotas to update
     */
    where?: SubscriptionQuotaWhereInput
    limit?: number
  }

  /**
   * SubscriptionQuota upsert
   */
  export type SubscriptionQuotaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionQuota
     */
    select?: SubscriptionQuotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionQuotaInclude<ExtArgs> | null
    /**
     * The filter to search for the SubscriptionQuota to update in case it exists.
     */
    where: SubscriptionQuotaWhereUniqueInput
    /**
     * In case the SubscriptionQuota found by the `where` argument doesn't exist, create a new SubscriptionQuota with this data.
     */
    create: XOR<SubscriptionQuotaCreateInput, SubscriptionQuotaUncheckedCreateInput>
    /**
     * In case the SubscriptionQuota was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionQuotaUpdateInput, SubscriptionQuotaUncheckedUpdateInput>
  }

  /**
   * SubscriptionQuota delete
   */
  export type SubscriptionQuotaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionQuota
     */
    select?: SubscriptionQuotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionQuotaInclude<ExtArgs> | null
    /**
     * Filter which SubscriptionQuota to delete.
     */
    where: SubscriptionQuotaWhereUniqueInput
  }

  /**
   * SubscriptionQuota deleteMany
   */
  export type SubscriptionQuotaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionQuotas to delete
     */
    where?: SubscriptionQuotaWhereInput
    limit?: number
  }

  /**
   * SubscriptionQuota.user
   */
  export type SubscriptionQuota$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
  }

  /**
   * SubscriptionQuota.feature
   */
  export type SubscriptionQuota$featureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
    where?: PricingFeatureWhereInput
  }

  /**
   * SubscriptionQuota without action
   */
  export type SubscriptionQuotaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionQuota
     */
    select?: SubscriptionQuotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionQuotaInclude<ExtArgs> | null
  }


  /**
   * Model UsageLog
   */

  export type AggregateUsageLog = {
    _count: UsageLogCountAggregateOutputType | null
    _avg: UsageLogAvgAggregateOutputType | null
    _sum: UsageLogSumAggregateOutputType | null
    _min: UsageLogMinAggregateOutputType | null
    _max: UsageLogMaxAggregateOutputType | null
  }

  export type UsageLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    used_quantity: number | null
  }

  export type UsageLogSumAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    used_quantity: number | null
  }

  export type UsageLogMinAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    feature_id: string | null
    used_quantity: number | null
    createdAt: Date | null
  }

  export type UsageLogMaxAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    feature_id: string | null
    used_quantity: number | null
    createdAt: Date | null
  }

  export type UsageLogCountAggregateOutputType = {
    id: number
    userId: number
    feature_id: number
    used_quantity: number
    createdAt: number
    _all: number
  }


  export type UsageLogAvgAggregateInputType = {
    id?: true
    userId?: true
    used_quantity?: true
  }

  export type UsageLogSumAggregateInputType = {
    id?: true
    userId?: true
    used_quantity?: true
  }

  export type UsageLogMinAggregateInputType = {
    id?: true
    userId?: true
    feature_id?: true
    used_quantity?: true
    createdAt?: true
  }

  export type UsageLogMaxAggregateInputType = {
    id?: true
    userId?: true
    feature_id?: true
    used_quantity?: true
    createdAt?: true
  }

  export type UsageLogCountAggregateInputType = {
    id?: true
    userId?: true
    feature_id?: true
    used_quantity?: true
    createdAt?: true
    _all?: true
  }

  export type UsageLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageLog to aggregate.
     */
    where?: UsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLogs to fetch.
     */
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsageLogs
    **/
    _count?: true | UsageLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsageLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsageLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsageLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsageLogMaxAggregateInputType
  }

  export type GetUsageLogAggregateType<T extends UsageLogAggregateArgs> = {
        [P in keyof T & keyof AggregateUsageLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsageLog[P]>
      : GetScalarType<T[P], AggregateUsageLog[P]>
  }




  export type UsageLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLogWhereInput
    orderBy?: UsageLogOrderByWithAggregationInput | UsageLogOrderByWithAggregationInput[]
    by: UsageLogScalarFieldEnum[] | UsageLogScalarFieldEnum
    having?: UsageLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsageLogCountAggregateInputType | true
    _avg?: UsageLogAvgAggregateInputType
    _sum?: UsageLogSumAggregateInputType
    _min?: UsageLogMinAggregateInputType
    _max?: UsageLogMaxAggregateInputType
  }

  export type UsageLogGroupByOutputType = {
    id: bigint
    userId: bigint
    feature_id: string
    used_quantity: number
    createdAt: Date
    _count: UsageLogCountAggregateOutputType | null
    _avg: UsageLogAvgAggregateOutputType | null
    _sum: UsageLogSumAggregateOutputType | null
    _min: UsageLogMinAggregateOutputType | null
    _max: UsageLogMaxAggregateOutputType | null
  }

  type GetUsageLogGroupByPayload<T extends UsageLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsageLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsageLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsageLogGroupByOutputType[P]>
            : GetScalarType<T[P], UsageLogGroupByOutputType[P]>
        }
      >
    >


  export type UsageLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    feature_id?: boolean
    used_quantity?: boolean
    createdAt?: boolean
    user?: boolean | UsageLog$userArgs<ExtArgs>
    feature?: boolean | UsageLog$featureArgs<ExtArgs>
  }, ExtArgs["result"]["usageLog"]>


  export type UsageLogSelectScalar = {
    id?: boolean
    userId?: boolean
    feature_id?: boolean
    used_quantity?: boolean
    createdAt?: boolean
  }

  export type UsageLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsageLog$userArgs<ExtArgs>
    feature?: boolean | UsageLog$featureArgs<ExtArgs>
  }

  export type $UsageLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsageLog"
    objects: {
      user: Prisma.$SessionPayload<ExtArgs> | null
      feature: Prisma.$PricingFeaturePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: bigint
      feature_id: string
      used_quantity: number
      createdAt: Date
    }, ExtArgs["result"]["usageLog"]>
    composites: {}
  }

  type UsageLogGetPayload<S extends boolean | null | undefined | UsageLogDefaultArgs> = $Result.GetResult<Prisma.$UsageLogPayload, S>

  type UsageLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UsageLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UsageLogCountAggregateInputType | true
    }

  export interface UsageLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsageLog'], meta: { name: 'UsageLog' } }
    /**
     * Find zero or one UsageLog that matches the filter.
     * @param {UsageLogFindUniqueArgs} args - Arguments to find a UsageLog
     * @example
     * // Get one UsageLog
     * const usageLog = await prisma.usageLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageLogFindUniqueArgs>(args: SelectSubset<T, UsageLogFindUniqueArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UsageLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UsageLogFindUniqueOrThrowArgs} args - Arguments to find a UsageLog
     * @example
     * // Get one UsageLog
     * const usageLog = await prisma.usageLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageLogFindUniqueOrThrowArgs>(args: SelectSubset<T, UsageLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UsageLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogFindFirstArgs} args - Arguments to find a UsageLog
     * @example
     * // Get one UsageLog
     * const usageLog = await prisma.usageLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageLogFindFirstArgs>(args?: SelectSubset<T, UsageLogFindFirstArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UsageLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogFindFirstOrThrowArgs} args - Arguments to find a UsageLog
     * @example
     * // Get one UsageLog
     * const usageLog = await prisma.usageLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageLogFindFirstOrThrowArgs>(args?: SelectSubset<T, UsageLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UsageLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageLogs
     * const usageLogs = await prisma.usageLog.findMany()
     * 
     * // Get first 10 UsageLogs
     * const usageLogs = await prisma.usageLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usageLogWithIdOnly = await prisma.usageLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsageLogFindManyArgs>(args?: SelectSubset<T, UsageLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UsageLog.
     * @param {UsageLogCreateArgs} args - Arguments to create a UsageLog.
     * @example
     * // Create one UsageLog
     * const UsageLog = await prisma.usageLog.create({
     *   data: {
     *     // ... data to create a UsageLog
     *   }
     * })
     * 
     */
    create<T extends UsageLogCreateArgs>(args: SelectSubset<T, UsageLogCreateArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UsageLogs.
     * @param {UsageLogCreateManyArgs} args - Arguments to create many UsageLogs.
     * @example
     * // Create many UsageLogs
     * const usageLog = await prisma.usageLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsageLogCreateManyArgs>(args?: SelectSubset<T, UsageLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UsageLog.
     * @param {UsageLogDeleteArgs} args - Arguments to delete one UsageLog.
     * @example
     * // Delete one UsageLog
     * const UsageLog = await prisma.usageLog.delete({
     *   where: {
     *     // ... filter to delete one UsageLog
     *   }
     * })
     * 
     */
    delete<T extends UsageLogDeleteArgs>(args: SelectSubset<T, UsageLogDeleteArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UsageLog.
     * @param {UsageLogUpdateArgs} args - Arguments to update one UsageLog.
     * @example
     * // Update one UsageLog
     * const usageLog = await prisma.usageLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsageLogUpdateArgs>(args: SelectSubset<T, UsageLogUpdateArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UsageLogs.
     * @param {UsageLogDeleteManyArgs} args - Arguments to filter UsageLogs to delete.
     * @example
     * // Delete a few UsageLogs
     * const { count } = await prisma.usageLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsageLogDeleteManyArgs>(args?: SelectSubset<T, UsageLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageLogs
     * const usageLog = await prisma.usageLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsageLogUpdateManyArgs>(args: SelectSubset<T, UsageLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UsageLog.
     * @param {UsageLogUpsertArgs} args - Arguments to update or create a UsageLog.
     * @example
     * // Update or create a UsageLog
     * const usageLog = await prisma.usageLog.upsert({
     *   create: {
     *     // ... data to create a UsageLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageLog we want to update
     *   }
     * })
     */
    upsert<T extends UsageLogUpsertArgs>(args: SelectSubset<T, UsageLogUpsertArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogCountArgs} args - Arguments to filter UsageLogs to count.
     * @example
     * // Count the number of UsageLogs
     * const count = await prisma.usageLog.count({
     *   where: {
     *     // ... the filter for the UsageLogs we want to count
     *   }
     * })
    **/
    count<T extends UsageLogCountArgs>(
      args?: Subset<T, UsageLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsageLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsageLogAggregateArgs>(args: Subset<T, UsageLogAggregateArgs>): Prisma.PrismaPromise<GetUsageLogAggregateType<T>>

    /**
     * Group by UsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogGroupByArgs} args - Group by arguments.
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
      T extends UsageLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsageLogGroupByArgs['orderBy'] }
        : { orderBy?: UsageLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UsageLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsageLog model
   */
  readonly fields: UsageLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsageLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsageLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsageLog$userArgs<ExtArgs> = {}>(args?: Subset<T, UsageLog$userArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    feature<T extends UsageLog$featureArgs<ExtArgs> = {}>(args?: Subset<T, UsageLog$featureArgs<ExtArgs>>): Prisma__PricingFeatureClient<$Result.GetResult<Prisma.$PricingFeaturePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsageLog model
   */ 
  interface UsageLogFieldRefs {
    readonly id: FieldRef<"UsageLog", 'BigInt'>
    readonly userId: FieldRef<"UsageLog", 'BigInt'>
    readonly feature_id: FieldRef<"UsageLog", 'String'>
    readonly used_quantity: FieldRef<"UsageLog", 'Int'>
    readonly createdAt: FieldRef<"UsageLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageLog findUnique
   */
  export type UsageLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLog to fetch.
     */
    where: UsageLogWhereUniqueInput
  }

  /**
   * UsageLog findUniqueOrThrow
   */
  export type UsageLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLog to fetch.
     */
    where: UsageLogWhereUniqueInput
  }

  /**
   * UsageLog findFirst
   */
  export type UsageLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLog to fetch.
     */
    where?: UsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLogs to fetch.
     */
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageLogs.
     */
    cursor?: UsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageLogs.
     */
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * UsageLog findFirstOrThrow
   */
  export type UsageLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLog to fetch.
     */
    where?: UsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLogs to fetch.
     */
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageLogs.
     */
    cursor?: UsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageLogs.
     */
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * UsageLog findMany
   */
  export type UsageLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLogs to fetch.
     */
    where?: UsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLogs to fetch.
     */
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsageLogs.
     */
    cursor?: UsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLogs.
     */
    skip?: number
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * UsageLog create
   */
  export type UsageLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * The data needed to create a UsageLog.
     */
    data: XOR<UsageLogCreateInput, UsageLogUncheckedCreateInput>
  }

  /**
   * UsageLog createMany
   */
  export type UsageLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageLogs.
     */
    data: UsageLogCreateManyInput | UsageLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageLog update
   */
  export type UsageLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * The data needed to update a UsageLog.
     */
    data: XOR<UsageLogUpdateInput, UsageLogUncheckedUpdateInput>
    /**
     * Choose, which UsageLog to update.
     */
    where: UsageLogWhereUniqueInput
  }

  /**
   * UsageLog updateMany
   */
  export type UsageLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageLogs.
     */
    data: XOR<UsageLogUpdateManyMutationInput, UsageLogUncheckedUpdateManyInput>
    /**
     * Filter which UsageLogs to update
     */
    where?: UsageLogWhereInput
    limit?: number
  }

  /**
   * UsageLog upsert
   */
  export type UsageLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * The filter to search for the UsageLog to update in case it exists.
     */
    where: UsageLogWhereUniqueInput
    /**
     * In case the UsageLog found by the `where` argument doesn't exist, create a new UsageLog with this data.
     */
    create: XOR<UsageLogCreateInput, UsageLogUncheckedCreateInput>
    /**
     * In case the UsageLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsageLogUpdateInput, UsageLogUncheckedUpdateInput>
  }

  /**
   * UsageLog delete
   */
  export type UsageLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter which UsageLog to delete.
     */
    where: UsageLogWhereUniqueInput
  }

  /**
   * UsageLog deleteMany
   */
  export type UsageLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageLogs to delete
     */
    where?: UsageLogWhereInput
    limit?: number
  }

  /**
   * UsageLog.user
   */
  export type UsageLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
  }

  /**
   * UsageLog.feature
   */
  export type UsageLog$featureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingFeature
     */
    select?: PricingFeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingFeatureInclude<ExtArgs> | null
    where?: PricingFeatureWhereInput
  }

  /**
   * UsageLog without action
   */
  export type UsageLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
  }


  /**
   * Model PaymentLog
   */

  export type AggregatePaymentLog = {
    _count: PaymentLogCountAggregateOutputType | null
    _avg: PaymentLogAvgAggregateOutputType | null
    _sum: PaymentLogSumAggregateOutputType | null
    _min: PaymentLogMinAggregateOutputType | null
    _max: PaymentLogMaxAggregateOutputType | null
  }

  export type PaymentLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    amount: number | null
  }

  export type PaymentLogSumAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    amount: number | null
  }

  export type PaymentLogMinAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    action: string | null
    status: $Enums.PaymentLogStatus | null
    external_transaction_id: string | null
    amount: number | null
    createdAt: Date | null
  }

  export type PaymentLogMaxAggregateOutputType = {
    id: bigint | null
    userId: bigint | null
    action: string | null
    status: $Enums.PaymentLogStatus | null
    external_transaction_id: string | null
    amount: number | null
    createdAt: Date | null
  }

  export type PaymentLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    status: number
    external_transaction_id: number
    details: number
    amount: number
    createdAt: number
    _all: number
  }


  export type PaymentLogAvgAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
  }

  export type PaymentLogSumAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
  }

  export type PaymentLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    status?: true
    external_transaction_id?: true
    amount?: true
    createdAt?: true
  }

  export type PaymentLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    status?: true
    external_transaction_id?: true
    amount?: true
    createdAt?: true
  }

  export type PaymentLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    status?: true
    external_transaction_id?: true
    details?: true
    amount?: true
    createdAt?: true
    _all?: true
  }

  export type PaymentLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentLog to aggregate.
     */
    where?: PaymentLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentLogs to fetch.
     */
    orderBy?: PaymentLogOrderByWithRelationInput | PaymentLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentLogs
    **/
    _count?: true | PaymentLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentLogMaxAggregateInputType
  }

  export type GetPaymentLogAggregateType<T extends PaymentLogAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentLog[P]>
      : GetScalarType<T[P], AggregatePaymentLog[P]>
  }




  export type PaymentLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentLogWhereInput
    orderBy?: PaymentLogOrderByWithAggregationInput | PaymentLogOrderByWithAggregationInput[]
    by: PaymentLogScalarFieldEnum[] | PaymentLogScalarFieldEnum
    having?: PaymentLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentLogCountAggregateInputType | true
    _avg?: PaymentLogAvgAggregateInputType
    _sum?: PaymentLogSumAggregateInputType
    _min?: PaymentLogMinAggregateInputType
    _max?: PaymentLogMaxAggregateInputType
  }

  export type PaymentLogGroupByOutputType = {
    id: bigint
    userId: bigint
    action: string
    status: $Enums.PaymentLogStatus
    external_transaction_id: string | null
    details: JsonValue | null
    amount: number
    createdAt: Date
    _count: PaymentLogCountAggregateOutputType | null
    _avg: PaymentLogAvgAggregateOutputType | null
    _sum: PaymentLogSumAggregateOutputType | null
    _min: PaymentLogMinAggregateOutputType | null
    _max: PaymentLogMaxAggregateOutputType | null
  }

  type GetPaymentLogGroupByPayload<T extends PaymentLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentLogGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentLogGroupByOutputType[P]>
        }
      >
    >


  export type PaymentLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    status?: boolean
    external_transaction_id?: boolean
    details?: boolean
    amount?: boolean
    createdAt?: boolean
    user?: boolean | PaymentLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["paymentLog"]>


  export type PaymentLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    status?: boolean
    external_transaction_id?: boolean
    details?: boolean
    amount?: boolean
    createdAt?: boolean
  }

  export type PaymentLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | PaymentLog$userArgs<ExtArgs>
  }

  export type $PaymentLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentLog"
    objects: {
      user: Prisma.$SessionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: bigint
      action: string
      status: $Enums.PaymentLogStatus
      external_transaction_id: string | null
      details: Prisma.JsonValue | null
      amount: number
      createdAt: Date
    }, ExtArgs["result"]["paymentLog"]>
    composites: {}
  }

  type PaymentLogGetPayload<S extends boolean | null | undefined | PaymentLogDefaultArgs> = $Result.GetResult<Prisma.$PaymentLogPayload, S>

  type PaymentLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentLogCountAggregateInputType | true
    }

  export interface PaymentLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentLog'], meta: { name: 'PaymentLog' } }
    /**
     * Find zero or one PaymentLog that matches the filter.
     * @param {PaymentLogFindUniqueArgs} args - Arguments to find a PaymentLog
     * @example
     * // Get one PaymentLog
     * const paymentLog = await prisma.paymentLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentLogFindUniqueArgs>(args: SelectSubset<T, PaymentLogFindUniqueArgs<ExtArgs>>): Prisma__PaymentLogClient<$Result.GetResult<Prisma.$PaymentLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PaymentLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentLogFindUniqueOrThrowArgs} args - Arguments to find a PaymentLog
     * @example
     * // Get one PaymentLog
     * const paymentLog = await prisma.paymentLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentLogFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentLogClient<$Result.GetResult<Prisma.$PaymentLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PaymentLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLogFindFirstArgs} args - Arguments to find a PaymentLog
     * @example
     * // Get one PaymentLog
     * const paymentLog = await prisma.paymentLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentLogFindFirstArgs>(args?: SelectSubset<T, PaymentLogFindFirstArgs<ExtArgs>>): Prisma__PaymentLogClient<$Result.GetResult<Prisma.$PaymentLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PaymentLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLogFindFirstOrThrowArgs} args - Arguments to find a PaymentLog
     * @example
     * // Get one PaymentLog
     * const paymentLog = await prisma.paymentLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentLogFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentLogClient<$Result.GetResult<Prisma.$PaymentLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PaymentLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentLogs
     * const paymentLogs = await prisma.paymentLog.findMany()
     * 
     * // Get first 10 PaymentLogs
     * const paymentLogs = await prisma.paymentLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentLogWithIdOnly = await prisma.paymentLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentLogFindManyArgs>(args?: SelectSubset<T, PaymentLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PaymentLog.
     * @param {PaymentLogCreateArgs} args - Arguments to create a PaymentLog.
     * @example
     * // Create one PaymentLog
     * const PaymentLog = await prisma.paymentLog.create({
     *   data: {
     *     // ... data to create a PaymentLog
     *   }
     * })
     * 
     */
    create<T extends PaymentLogCreateArgs>(args: SelectSubset<T, PaymentLogCreateArgs<ExtArgs>>): Prisma__PaymentLogClient<$Result.GetResult<Prisma.$PaymentLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PaymentLogs.
     * @param {PaymentLogCreateManyArgs} args - Arguments to create many PaymentLogs.
     * @example
     * // Create many PaymentLogs
     * const paymentLog = await prisma.paymentLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentLogCreateManyArgs>(args?: SelectSubset<T, PaymentLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PaymentLog.
     * @param {PaymentLogDeleteArgs} args - Arguments to delete one PaymentLog.
     * @example
     * // Delete one PaymentLog
     * const PaymentLog = await prisma.paymentLog.delete({
     *   where: {
     *     // ... filter to delete one PaymentLog
     *   }
     * })
     * 
     */
    delete<T extends PaymentLogDeleteArgs>(args: SelectSubset<T, PaymentLogDeleteArgs<ExtArgs>>): Prisma__PaymentLogClient<$Result.GetResult<Prisma.$PaymentLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PaymentLog.
     * @param {PaymentLogUpdateArgs} args - Arguments to update one PaymentLog.
     * @example
     * // Update one PaymentLog
     * const paymentLog = await prisma.paymentLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentLogUpdateArgs>(args: SelectSubset<T, PaymentLogUpdateArgs<ExtArgs>>): Prisma__PaymentLogClient<$Result.GetResult<Prisma.$PaymentLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PaymentLogs.
     * @param {PaymentLogDeleteManyArgs} args - Arguments to filter PaymentLogs to delete.
     * @example
     * // Delete a few PaymentLogs
     * const { count } = await prisma.paymentLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentLogDeleteManyArgs>(args?: SelectSubset<T, PaymentLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentLogs
     * const paymentLog = await prisma.paymentLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentLogUpdateManyArgs>(args: SelectSubset<T, PaymentLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PaymentLog.
     * @param {PaymentLogUpsertArgs} args - Arguments to update or create a PaymentLog.
     * @example
     * // Update or create a PaymentLog
     * const paymentLog = await prisma.paymentLog.upsert({
     *   create: {
     *     // ... data to create a PaymentLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentLog we want to update
     *   }
     * })
     */
    upsert<T extends PaymentLogUpsertArgs>(args: SelectSubset<T, PaymentLogUpsertArgs<ExtArgs>>): Prisma__PaymentLogClient<$Result.GetResult<Prisma.$PaymentLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PaymentLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLogCountArgs} args - Arguments to filter PaymentLogs to count.
     * @example
     * // Count the number of PaymentLogs
     * const count = await prisma.paymentLog.count({
     *   where: {
     *     // ... the filter for the PaymentLogs we want to count
     *   }
     * })
    **/
    count<T extends PaymentLogCountArgs>(
      args?: Subset<T, PaymentLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentLogAggregateArgs>(args: Subset<T, PaymentLogAggregateArgs>): Prisma.PrismaPromise<GetPaymentLogAggregateType<T>>

    /**
     * Group by PaymentLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLogGroupByArgs} args - Group by arguments.
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
      T extends PaymentLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentLogGroupByArgs['orderBy'] }
        : { orderBy?: PaymentLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PaymentLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentLog model
   */
  readonly fields: PaymentLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends PaymentLog$userArgs<ExtArgs> = {}>(args?: Subset<T, PaymentLog$userArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentLog model
   */ 
  interface PaymentLogFieldRefs {
    readonly id: FieldRef<"PaymentLog", 'BigInt'>
    readonly userId: FieldRef<"PaymentLog", 'BigInt'>
    readonly action: FieldRef<"PaymentLog", 'String'>
    readonly status: FieldRef<"PaymentLog", 'PaymentLogStatus'>
    readonly external_transaction_id: FieldRef<"PaymentLog", 'String'>
    readonly details: FieldRef<"PaymentLog", 'Json'>
    readonly amount: FieldRef<"PaymentLog", 'Float'>
    readonly createdAt: FieldRef<"PaymentLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentLog findUnique
   */
  export type PaymentLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLog
     */
    select?: PaymentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLogInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLog to fetch.
     */
    where: PaymentLogWhereUniqueInput
  }

  /**
   * PaymentLog findUniqueOrThrow
   */
  export type PaymentLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLog
     */
    select?: PaymentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLogInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLog to fetch.
     */
    where: PaymentLogWhereUniqueInput
  }

  /**
   * PaymentLog findFirst
   */
  export type PaymentLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLog
     */
    select?: PaymentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLogInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLog to fetch.
     */
    where?: PaymentLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentLogs to fetch.
     */
    orderBy?: PaymentLogOrderByWithRelationInput | PaymentLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentLogs.
     */
    cursor?: PaymentLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentLogs.
     */
    distinct?: PaymentLogScalarFieldEnum | PaymentLogScalarFieldEnum[]
  }

  /**
   * PaymentLog findFirstOrThrow
   */
  export type PaymentLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLog
     */
    select?: PaymentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLogInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLog to fetch.
     */
    where?: PaymentLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentLogs to fetch.
     */
    orderBy?: PaymentLogOrderByWithRelationInput | PaymentLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentLogs.
     */
    cursor?: PaymentLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentLogs.
     */
    distinct?: PaymentLogScalarFieldEnum | PaymentLogScalarFieldEnum[]
  }

  /**
   * PaymentLog findMany
   */
  export type PaymentLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLog
     */
    select?: PaymentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLogInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLogs to fetch.
     */
    where?: PaymentLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentLogs to fetch.
     */
    orderBy?: PaymentLogOrderByWithRelationInput | PaymentLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentLogs.
     */
    cursor?: PaymentLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentLogs.
     */
    skip?: number
    distinct?: PaymentLogScalarFieldEnum | PaymentLogScalarFieldEnum[]
  }

  /**
   * PaymentLog create
   */
  export type PaymentLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLog
     */
    select?: PaymentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLogInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentLog.
     */
    data: XOR<PaymentLogCreateInput, PaymentLogUncheckedCreateInput>
  }

  /**
   * PaymentLog createMany
   */
  export type PaymentLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentLogs.
     */
    data: PaymentLogCreateManyInput | PaymentLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentLog update
   */
  export type PaymentLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLog
     */
    select?: PaymentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLogInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentLog.
     */
    data: XOR<PaymentLogUpdateInput, PaymentLogUncheckedUpdateInput>
    /**
     * Choose, which PaymentLog to update.
     */
    where: PaymentLogWhereUniqueInput
  }

  /**
   * PaymentLog updateMany
   */
  export type PaymentLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentLogs.
     */
    data: XOR<PaymentLogUpdateManyMutationInput, PaymentLogUncheckedUpdateManyInput>
    /**
     * Filter which PaymentLogs to update
     */
    where?: PaymentLogWhereInput
    limit?: number
  }

  /**
   * PaymentLog upsert
   */
  export type PaymentLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLog
     */
    select?: PaymentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLogInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentLog to update in case it exists.
     */
    where: PaymentLogWhereUniqueInput
    /**
     * In case the PaymentLog found by the `where` argument doesn't exist, create a new PaymentLog with this data.
     */
    create: XOR<PaymentLogCreateInput, PaymentLogUncheckedCreateInput>
    /**
     * In case the PaymentLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentLogUpdateInput, PaymentLogUncheckedUpdateInput>
  }

  /**
   * PaymentLog delete
   */
  export type PaymentLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLog
     */
    select?: PaymentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLogInclude<ExtArgs> | null
    /**
     * Filter which PaymentLog to delete.
     */
    where: PaymentLogWhereUniqueInput
  }

  /**
   * PaymentLog deleteMany
   */
  export type PaymentLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentLogs to delete
     */
    where?: PaymentLogWhereInput
    limit?: number
  }

  /**
   * PaymentLog.user
   */
  export type PaymentLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
  }

  /**
   * PaymentLog without action
   */
  export type PaymentLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLog
     */
    select?: PaymentLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLogInclude<ExtArgs> | null
  }


  /**
   * Model SourceProduct
   */

  export type AggregateSourceProduct = {
    _count: SourceProductCountAggregateOutputType | null
    _avg: SourceProductAvgAggregateOutputType | null
    _sum: SourceProductSumAggregateOutputType | null
    _min: SourceProductMinAggregateOutputType | null
    _max: SourceProductMaxAggregateOutputType | null
  }

  export type SourceProductAvgAggregateOutputType = {
    id: number | null
    price: number | null
    comparePrice: number | null
    estProfit: number | null
    rating: number | null
    totalRating: number | null
    like: number | null
    share: number | null
    comment: number | null
  }

  export type SourceProductSumAggregateOutputType = {
    id: bigint | null
    price: number | null
    comparePrice: number | null
    estProfit: number | null
    rating: number | null
    totalRating: number | null
    like: number | null
    share: number | null
    comment: number | null
  }

  export type SourceProductMinAggregateOutputType = {
    id: bigint | null
    title: string | null
    description: string | null
    image: string | null
    video: string | null
    price: number | null
    source: $Enums.Source | null
    sourceUrl: string | null
    sourceId: string | null
    comparePrice: number | null
    estProfit: number | null
    rating: number | null
    totalRating: number | null
    like: number | null
    share: number | null
    comment: number | null
    tiktokUrl: string | null
    status: $Enums.SourceStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SourceProductMaxAggregateOutputType = {
    id: bigint | null
    title: string | null
    description: string | null
    image: string | null
    video: string | null
    price: number | null
    source: $Enums.Source | null
    sourceUrl: string | null
    sourceId: string | null
    comparePrice: number | null
    estProfit: number | null
    rating: number | null
    totalRating: number | null
    like: number | null
    share: number | null
    comment: number | null
    tiktokUrl: string | null
    status: $Enums.SourceStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SourceProductCountAggregateOutputType = {
    id: number
    title: number
    description: number
    image: number
    video: number
    price: number
    source: number
    sourceUrl: number
    sourceId: number
    comparePrice: number
    estProfit: number
    rating: number
    totalRating: number
    like: number
    share: number
    comment: number
    tiktokUrl: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SourceProductAvgAggregateInputType = {
    id?: true
    price?: true
    comparePrice?: true
    estProfit?: true
    rating?: true
    totalRating?: true
    like?: true
    share?: true
    comment?: true
  }

  export type SourceProductSumAggregateInputType = {
    id?: true
    price?: true
    comparePrice?: true
    estProfit?: true
    rating?: true
    totalRating?: true
    like?: true
    share?: true
    comment?: true
  }

  export type SourceProductMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    image?: true
    video?: true
    price?: true
    source?: true
    sourceUrl?: true
    sourceId?: true
    comparePrice?: true
    estProfit?: true
    rating?: true
    totalRating?: true
    like?: true
    share?: true
    comment?: true
    tiktokUrl?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SourceProductMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    image?: true
    video?: true
    price?: true
    source?: true
    sourceUrl?: true
    sourceId?: true
    comparePrice?: true
    estProfit?: true
    rating?: true
    totalRating?: true
    like?: true
    share?: true
    comment?: true
    tiktokUrl?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SourceProductCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    image?: true
    video?: true
    price?: true
    source?: true
    sourceUrl?: true
    sourceId?: true
    comparePrice?: true
    estProfit?: true
    rating?: true
    totalRating?: true
    like?: true
    share?: true
    comment?: true
    tiktokUrl?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SourceProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SourceProduct to aggregate.
     */
    where?: SourceProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SourceProducts to fetch.
     */
    orderBy?: SourceProductOrderByWithRelationInput | SourceProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SourceProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SourceProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SourceProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SourceProducts
    **/
    _count?: true | SourceProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SourceProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SourceProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SourceProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SourceProductMaxAggregateInputType
  }

  export type GetSourceProductAggregateType<T extends SourceProductAggregateArgs> = {
        [P in keyof T & keyof AggregateSourceProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSourceProduct[P]>
      : GetScalarType<T[P], AggregateSourceProduct[P]>
  }




  export type SourceProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SourceProductWhereInput
    orderBy?: SourceProductOrderByWithAggregationInput | SourceProductOrderByWithAggregationInput[]
    by: SourceProductScalarFieldEnum[] | SourceProductScalarFieldEnum
    having?: SourceProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SourceProductCountAggregateInputType | true
    _avg?: SourceProductAvgAggregateInputType
    _sum?: SourceProductSumAggregateInputType
    _min?: SourceProductMinAggregateInputType
    _max?: SourceProductMaxAggregateInputType
  }

  export type SourceProductGroupByOutputType = {
    id: bigint
    title: string
    description: string | null
    image: string | null
    video: string | null
    price: number
    source: $Enums.Source
    sourceUrl: string
    sourceId: string | null
    comparePrice: number | null
    estProfit: number | null
    rating: number | null
    totalRating: number | null
    like: number | null
    share: number | null
    comment: number | null
    tiktokUrl: string | null
    status: $Enums.SourceStatus
    createdAt: Date
    updatedAt: Date
    _count: SourceProductCountAggregateOutputType | null
    _avg: SourceProductAvgAggregateOutputType | null
    _sum: SourceProductSumAggregateOutputType | null
    _min: SourceProductMinAggregateOutputType | null
    _max: SourceProductMaxAggregateOutputType | null
  }

  type GetSourceProductGroupByPayload<T extends SourceProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SourceProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SourceProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SourceProductGroupByOutputType[P]>
            : GetScalarType<T[P], SourceProductGroupByOutputType[P]>
        }
      >
    >


  export type SourceProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    video?: boolean
    price?: boolean
    source?: boolean
    sourceUrl?: boolean
    sourceId?: boolean
    comparePrice?: boolean
    estProfit?: boolean
    rating?: boolean
    totalRating?: boolean
    like?: boolean
    share?: boolean
    comment?: boolean
    tiktokUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    PlatformProduct?: boolean | SourceProduct$PlatformProductArgs<ExtArgs>
    _count?: boolean | SourceProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sourceProduct"]>


  export type SourceProductSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    video?: boolean
    price?: boolean
    source?: boolean
    sourceUrl?: boolean
    sourceId?: boolean
    comparePrice?: boolean
    estProfit?: boolean
    rating?: boolean
    totalRating?: boolean
    like?: boolean
    share?: boolean
    comment?: boolean
    tiktokUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SourceProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PlatformProduct?: boolean | SourceProduct$PlatformProductArgs<ExtArgs>
    _count?: boolean | SourceProductCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SourceProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SourceProduct"
    objects: {
      PlatformProduct: Prisma.$PlatformProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      title: string
      description: string | null
      image: string | null
      video: string | null
      price: number
      source: $Enums.Source
      sourceUrl: string
      sourceId: string | null
      comparePrice: number | null
      estProfit: number | null
      rating: number | null
      totalRating: number | null
      like: number | null
      share: number | null
      comment: number | null
      tiktokUrl: string | null
      status: $Enums.SourceStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sourceProduct"]>
    composites: {}
  }

  type SourceProductGetPayload<S extends boolean | null | undefined | SourceProductDefaultArgs> = $Result.GetResult<Prisma.$SourceProductPayload, S>

  type SourceProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SourceProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SourceProductCountAggregateInputType | true
    }

  export interface SourceProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SourceProduct'], meta: { name: 'SourceProduct' } }
    /**
     * Find zero or one SourceProduct that matches the filter.
     * @param {SourceProductFindUniqueArgs} args - Arguments to find a SourceProduct
     * @example
     * // Get one SourceProduct
     * const sourceProduct = await prisma.sourceProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SourceProductFindUniqueArgs>(args: SelectSubset<T, SourceProductFindUniqueArgs<ExtArgs>>): Prisma__SourceProductClient<$Result.GetResult<Prisma.$SourceProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SourceProduct that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SourceProductFindUniqueOrThrowArgs} args - Arguments to find a SourceProduct
     * @example
     * // Get one SourceProduct
     * const sourceProduct = await prisma.sourceProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SourceProductFindUniqueOrThrowArgs>(args: SelectSubset<T, SourceProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SourceProductClient<$Result.GetResult<Prisma.$SourceProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SourceProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceProductFindFirstArgs} args - Arguments to find a SourceProduct
     * @example
     * // Get one SourceProduct
     * const sourceProduct = await prisma.sourceProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SourceProductFindFirstArgs>(args?: SelectSubset<T, SourceProductFindFirstArgs<ExtArgs>>): Prisma__SourceProductClient<$Result.GetResult<Prisma.$SourceProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SourceProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceProductFindFirstOrThrowArgs} args - Arguments to find a SourceProduct
     * @example
     * // Get one SourceProduct
     * const sourceProduct = await prisma.sourceProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SourceProductFindFirstOrThrowArgs>(args?: SelectSubset<T, SourceProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__SourceProductClient<$Result.GetResult<Prisma.$SourceProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SourceProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SourceProducts
     * const sourceProducts = await prisma.sourceProduct.findMany()
     * 
     * // Get first 10 SourceProducts
     * const sourceProducts = await prisma.sourceProduct.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sourceProductWithIdOnly = await prisma.sourceProduct.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SourceProductFindManyArgs>(args?: SelectSubset<T, SourceProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourceProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SourceProduct.
     * @param {SourceProductCreateArgs} args - Arguments to create a SourceProduct.
     * @example
     * // Create one SourceProduct
     * const SourceProduct = await prisma.sourceProduct.create({
     *   data: {
     *     // ... data to create a SourceProduct
     *   }
     * })
     * 
     */
    create<T extends SourceProductCreateArgs>(args: SelectSubset<T, SourceProductCreateArgs<ExtArgs>>): Prisma__SourceProductClient<$Result.GetResult<Prisma.$SourceProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SourceProducts.
     * @param {SourceProductCreateManyArgs} args - Arguments to create many SourceProducts.
     * @example
     * // Create many SourceProducts
     * const sourceProduct = await prisma.sourceProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SourceProductCreateManyArgs>(args?: SelectSubset<T, SourceProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SourceProduct.
     * @param {SourceProductDeleteArgs} args - Arguments to delete one SourceProduct.
     * @example
     * // Delete one SourceProduct
     * const SourceProduct = await prisma.sourceProduct.delete({
     *   where: {
     *     // ... filter to delete one SourceProduct
     *   }
     * })
     * 
     */
    delete<T extends SourceProductDeleteArgs>(args: SelectSubset<T, SourceProductDeleteArgs<ExtArgs>>): Prisma__SourceProductClient<$Result.GetResult<Prisma.$SourceProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SourceProduct.
     * @param {SourceProductUpdateArgs} args - Arguments to update one SourceProduct.
     * @example
     * // Update one SourceProduct
     * const sourceProduct = await prisma.sourceProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SourceProductUpdateArgs>(args: SelectSubset<T, SourceProductUpdateArgs<ExtArgs>>): Prisma__SourceProductClient<$Result.GetResult<Prisma.$SourceProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SourceProducts.
     * @param {SourceProductDeleteManyArgs} args - Arguments to filter SourceProducts to delete.
     * @example
     * // Delete a few SourceProducts
     * const { count } = await prisma.sourceProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SourceProductDeleteManyArgs>(args?: SelectSubset<T, SourceProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SourceProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SourceProducts
     * const sourceProduct = await prisma.sourceProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SourceProductUpdateManyArgs>(args: SelectSubset<T, SourceProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SourceProduct.
     * @param {SourceProductUpsertArgs} args - Arguments to update or create a SourceProduct.
     * @example
     * // Update or create a SourceProduct
     * const sourceProduct = await prisma.sourceProduct.upsert({
     *   create: {
     *     // ... data to create a SourceProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SourceProduct we want to update
     *   }
     * })
     */
    upsert<T extends SourceProductUpsertArgs>(args: SelectSubset<T, SourceProductUpsertArgs<ExtArgs>>): Prisma__SourceProductClient<$Result.GetResult<Prisma.$SourceProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SourceProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceProductCountArgs} args - Arguments to filter SourceProducts to count.
     * @example
     * // Count the number of SourceProducts
     * const count = await prisma.sourceProduct.count({
     *   where: {
     *     // ... the filter for the SourceProducts we want to count
     *   }
     * })
    **/
    count<T extends SourceProductCountArgs>(
      args?: Subset<T, SourceProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SourceProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SourceProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SourceProductAggregateArgs>(args: Subset<T, SourceProductAggregateArgs>): Prisma.PrismaPromise<GetSourceProductAggregateType<T>>

    /**
     * Group by SourceProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceProductGroupByArgs} args - Group by arguments.
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
      T extends SourceProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SourceProductGroupByArgs['orderBy'] }
        : { orderBy?: SourceProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, SourceProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSourceProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SourceProduct model
   */
  readonly fields: SourceProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SourceProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SourceProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    PlatformProduct<T extends SourceProduct$PlatformProductArgs<ExtArgs> = {}>(args?: Subset<T, SourceProduct$PlatformProductArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformProductPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SourceProduct model
   */ 
  interface SourceProductFieldRefs {
    readonly id: FieldRef<"SourceProduct", 'BigInt'>
    readonly title: FieldRef<"SourceProduct", 'String'>
    readonly description: FieldRef<"SourceProduct", 'String'>
    readonly image: FieldRef<"SourceProduct", 'String'>
    readonly video: FieldRef<"SourceProduct", 'String'>
    readonly price: FieldRef<"SourceProduct", 'Float'>
    readonly source: FieldRef<"SourceProduct", 'Source'>
    readonly sourceUrl: FieldRef<"SourceProduct", 'String'>
    readonly sourceId: FieldRef<"SourceProduct", 'String'>
    readonly comparePrice: FieldRef<"SourceProduct", 'Float'>
    readonly estProfit: FieldRef<"SourceProduct", 'Float'>
    readonly rating: FieldRef<"SourceProduct", 'Float'>
    readonly totalRating: FieldRef<"SourceProduct", 'Int'>
    readonly like: FieldRef<"SourceProduct", 'Int'>
    readonly share: FieldRef<"SourceProduct", 'Int'>
    readonly comment: FieldRef<"SourceProduct", 'Int'>
    readonly tiktokUrl: FieldRef<"SourceProduct", 'String'>
    readonly status: FieldRef<"SourceProduct", 'SourceStatus'>
    readonly createdAt: FieldRef<"SourceProduct", 'DateTime'>
    readonly updatedAt: FieldRef<"SourceProduct", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SourceProduct findUnique
   */
  export type SourceProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceProduct
     */
    select?: SourceProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceProductInclude<ExtArgs> | null
    /**
     * Filter, which SourceProduct to fetch.
     */
    where: SourceProductWhereUniqueInput
  }

  /**
   * SourceProduct findUniqueOrThrow
   */
  export type SourceProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceProduct
     */
    select?: SourceProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceProductInclude<ExtArgs> | null
    /**
     * Filter, which SourceProduct to fetch.
     */
    where: SourceProductWhereUniqueInput
  }

  /**
   * SourceProduct findFirst
   */
  export type SourceProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceProduct
     */
    select?: SourceProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceProductInclude<ExtArgs> | null
    /**
     * Filter, which SourceProduct to fetch.
     */
    where?: SourceProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SourceProducts to fetch.
     */
    orderBy?: SourceProductOrderByWithRelationInput | SourceProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SourceProducts.
     */
    cursor?: SourceProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SourceProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SourceProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SourceProducts.
     */
    distinct?: SourceProductScalarFieldEnum | SourceProductScalarFieldEnum[]
  }

  /**
   * SourceProduct findFirstOrThrow
   */
  export type SourceProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceProduct
     */
    select?: SourceProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceProductInclude<ExtArgs> | null
    /**
     * Filter, which SourceProduct to fetch.
     */
    where?: SourceProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SourceProducts to fetch.
     */
    orderBy?: SourceProductOrderByWithRelationInput | SourceProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SourceProducts.
     */
    cursor?: SourceProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SourceProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SourceProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SourceProducts.
     */
    distinct?: SourceProductScalarFieldEnum | SourceProductScalarFieldEnum[]
  }

  /**
   * SourceProduct findMany
   */
  export type SourceProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceProduct
     */
    select?: SourceProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceProductInclude<ExtArgs> | null
    /**
     * Filter, which SourceProducts to fetch.
     */
    where?: SourceProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SourceProducts to fetch.
     */
    orderBy?: SourceProductOrderByWithRelationInput | SourceProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SourceProducts.
     */
    cursor?: SourceProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SourceProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SourceProducts.
     */
    skip?: number
    distinct?: SourceProductScalarFieldEnum | SourceProductScalarFieldEnum[]
  }

  /**
   * SourceProduct create
   */
  export type SourceProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceProduct
     */
    select?: SourceProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceProductInclude<ExtArgs> | null
    /**
     * The data needed to create a SourceProduct.
     */
    data: XOR<SourceProductCreateInput, SourceProductUncheckedCreateInput>
  }

  /**
   * SourceProduct createMany
   */
  export type SourceProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SourceProducts.
     */
    data: SourceProductCreateManyInput | SourceProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SourceProduct update
   */
  export type SourceProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceProduct
     */
    select?: SourceProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceProductInclude<ExtArgs> | null
    /**
     * The data needed to update a SourceProduct.
     */
    data: XOR<SourceProductUpdateInput, SourceProductUncheckedUpdateInput>
    /**
     * Choose, which SourceProduct to update.
     */
    where: SourceProductWhereUniqueInput
  }

  /**
   * SourceProduct updateMany
   */
  export type SourceProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SourceProducts.
     */
    data: XOR<SourceProductUpdateManyMutationInput, SourceProductUncheckedUpdateManyInput>
    /**
     * Filter which SourceProducts to update
     */
    where?: SourceProductWhereInput
    limit?: number
  }

  /**
   * SourceProduct upsert
   */
  export type SourceProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceProduct
     */
    select?: SourceProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceProductInclude<ExtArgs> | null
    /**
     * The filter to search for the SourceProduct to update in case it exists.
     */
    where: SourceProductWhereUniqueInput
    /**
     * In case the SourceProduct found by the `where` argument doesn't exist, create a new SourceProduct with this data.
     */
    create: XOR<SourceProductCreateInput, SourceProductUncheckedCreateInput>
    /**
     * In case the SourceProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SourceProductUpdateInput, SourceProductUncheckedUpdateInput>
  }

  /**
   * SourceProduct delete
   */
  export type SourceProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceProduct
     */
    select?: SourceProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceProductInclude<ExtArgs> | null
    /**
     * Filter which SourceProduct to delete.
     */
    where: SourceProductWhereUniqueInput
  }

  /**
   * SourceProduct deleteMany
   */
  export type SourceProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SourceProducts to delete
     */
    where?: SourceProductWhereInput
    limit?: number
  }

  /**
   * SourceProduct.PlatformProduct
   */
  export type SourceProduct$PlatformProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformProduct
     */
    select?: PlatformProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformProductInclude<ExtArgs> | null
    where?: PlatformProductWhereInput
    orderBy?: PlatformProductOrderByWithRelationInput | PlatformProductOrderByWithRelationInput[]
    cursor?: PlatformProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlatformProductScalarFieldEnum | PlatformProductScalarFieldEnum[]
  }

  /**
   * SourceProduct without action
   */
  export type SourceProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceProduct
     */
    select?: SourceProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceProductInclude<ExtArgs> | null
  }


  /**
   * Model SourceCategory
   */

  export type AggregateSourceCategory = {
    _count: SourceCategoryCountAggregateOutputType | null
    _avg: SourceCategoryAvgAggregateOutputType | null
    _sum: SourceCategorySumAggregateOutputType | null
    _min: SourceCategoryMinAggregateOutputType | null
    _max: SourceCategoryMaxAggregateOutputType | null
  }

  export type SourceCategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type SourceCategorySumAggregateOutputType = {
    id: bigint | null
  }

  export type SourceCategoryMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    source: $Enums.Source | null
    sourceId: string | null
    createdAt: Date | null
  }

  export type SourceCategoryMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    source: $Enums.Source | null
    sourceId: string | null
    createdAt: Date | null
  }

  export type SourceCategoryCountAggregateOutputType = {
    id: number
    name: number
    source: number
    sourceId: number
    createdAt: number
    _all: number
  }


  export type SourceCategoryAvgAggregateInputType = {
    id?: true
  }

  export type SourceCategorySumAggregateInputType = {
    id?: true
  }

  export type SourceCategoryMinAggregateInputType = {
    id?: true
    name?: true
    source?: true
    sourceId?: true
    createdAt?: true
  }

  export type SourceCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    source?: true
    sourceId?: true
    createdAt?: true
  }

  export type SourceCategoryCountAggregateInputType = {
    id?: true
    name?: true
    source?: true
    sourceId?: true
    createdAt?: true
    _all?: true
  }

  export type SourceCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SourceCategory to aggregate.
     */
    where?: SourceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SourceCategories to fetch.
     */
    orderBy?: SourceCategoryOrderByWithRelationInput | SourceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SourceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SourceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SourceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SourceCategories
    **/
    _count?: true | SourceCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SourceCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SourceCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SourceCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SourceCategoryMaxAggregateInputType
  }

  export type GetSourceCategoryAggregateType<T extends SourceCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateSourceCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSourceCategory[P]>
      : GetScalarType<T[P], AggregateSourceCategory[P]>
  }




  export type SourceCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SourceCategoryWhereInput
    orderBy?: SourceCategoryOrderByWithAggregationInput | SourceCategoryOrderByWithAggregationInput[]
    by: SourceCategoryScalarFieldEnum[] | SourceCategoryScalarFieldEnum
    having?: SourceCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SourceCategoryCountAggregateInputType | true
    _avg?: SourceCategoryAvgAggregateInputType
    _sum?: SourceCategorySumAggregateInputType
    _min?: SourceCategoryMinAggregateInputType
    _max?: SourceCategoryMaxAggregateInputType
  }

  export type SourceCategoryGroupByOutputType = {
    id: bigint
    name: string
    source: $Enums.Source
    sourceId: string | null
    createdAt: Date
    _count: SourceCategoryCountAggregateOutputType | null
    _avg: SourceCategoryAvgAggregateOutputType | null
    _sum: SourceCategorySumAggregateOutputType | null
    _min: SourceCategoryMinAggregateOutputType | null
    _max: SourceCategoryMaxAggregateOutputType | null
  }

  type GetSourceCategoryGroupByPayload<T extends SourceCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SourceCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SourceCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SourceCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], SourceCategoryGroupByOutputType[P]>
        }
      >
    >


  export type SourceCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    source?: boolean
    sourceId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sourceCategory"]>


  export type SourceCategorySelectScalar = {
    id?: boolean
    name?: boolean
    source?: boolean
    sourceId?: boolean
    createdAt?: boolean
  }


  export type $SourceCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SourceCategory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      source: $Enums.Source
      sourceId: string | null
      createdAt: Date
    }, ExtArgs["result"]["sourceCategory"]>
    composites: {}
  }

  type SourceCategoryGetPayload<S extends boolean | null | undefined | SourceCategoryDefaultArgs> = $Result.GetResult<Prisma.$SourceCategoryPayload, S>

  type SourceCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SourceCategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SourceCategoryCountAggregateInputType | true
    }

  export interface SourceCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SourceCategory'], meta: { name: 'SourceCategory' } }
    /**
     * Find zero or one SourceCategory that matches the filter.
     * @param {SourceCategoryFindUniqueArgs} args - Arguments to find a SourceCategory
     * @example
     * // Get one SourceCategory
     * const sourceCategory = await prisma.sourceCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SourceCategoryFindUniqueArgs>(args: SelectSubset<T, SourceCategoryFindUniqueArgs<ExtArgs>>): Prisma__SourceCategoryClient<$Result.GetResult<Prisma.$SourceCategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SourceCategory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SourceCategoryFindUniqueOrThrowArgs} args - Arguments to find a SourceCategory
     * @example
     * // Get one SourceCategory
     * const sourceCategory = await prisma.sourceCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SourceCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, SourceCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SourceCategoryClient<$Result.GetResult<Prisma.$SourceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SourceCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceCategoryFindFirstArgs} args - Arguments to find a SourceCategory
     * @example
     * // Get one SourceCategory
     * const sourceCategory = await prisma.sourceCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SourceCategoryFindFirstArgs>(args?: SelectSubset<T, SourceCategoryFindFirstArgs<ExtArgs>>): Prisma__SourceCategoryClient<$Result.GetResult<Prisma.$SourceCategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SourceCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceCategoryFindFirstOrThrowArgs} args - Arguments to find a SourceCategory
     * @example
     * // Get one SourceCategory
     * const sourceCategory = await prisma.sourceCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SourceCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, SourceCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__SourceCategoryClient<$Result.GetResult<Prisma.$SourceCategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SourceCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SourceCategories
     * const sourceCategories = await prisma.sourceCategory.findMany()
     * 
     * // Get first 10 SourceCategories
     * const sourceCategories = await prisma.sourceCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sourceCategoryWithIdOnly = await prisma.sourceCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SourceCategoryFindManyArgs>(args?: SelectSubset<T, SourceCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourceCategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SourceCategory.
     * @param {SourceCategoryCreateArgs} args - Arguments to create a SourceCategory.
     * @example
     * // Create one SourceCategory
     * const SourceCategory = await prisma.sourceCategory.create({
     *   data: {
     *     // ... data to create a SourceCategory
     *   }
     * })
     * 
     */
    create<T extends SourceCategoryCreateArgs>(args: SelectSubset<T, SourceCategoryCreateArgs<ExtArgs>>): Prisma__SourceCategoryClient<$Result.GetResult<Prisma.$SourceCategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SourceCategories.
     * @param {SourceCategoryCreateManyArgs} args - Arguments to create many SourceCategories.
     * @example
     * // Create many SourceCategories
     * const sourceCategory = await prisma.sourceCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SourceCategoryCreateManyArgs>(args?: SelectSubset<T, SourceCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SourceCategory.
     * @param {SourceCategoryDeleteArgs} args - Arguments to delete one SourceCategory.
     * @example
     * // Delete one SourceCategory
     * const SourceCategory = await prisma.sourceCategory.delete({
     *   where: {
     *     // ... filter to delete one SourceCategory
     *   }
     * })
     * 
     */
    delete<T extends SourceCategoryDeleteArgs>(args: SelectSubset<T, SourceCategoryDeleteArgs<ExtArgs>>): Prisma__SourceCategoryClient<$Result.GetResult<Prisma.$SourceCategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SourceCategory.
     * @param {SourceCategoryUpdateArgs} args - Arguments to update one SourceCategory.
     * @example
     * // Update one SourceCategory
     * const sourceCategory = await prisma.sourceCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SourceCategoryUpdateArgs>(args: SelectSubset<T, SourceCategoryUpdateArgs<ExtArgs>>): Prisma__SourceCategoryClient<$Result.GetResult<Prisma.$SourceCategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SourceCategories.
     * @param {SourceCategoryDeleteManyArgs} args - Arguments to filter SourceCategories to delete.
     * @example
     * // Delete a few SourceCategories
     * const { count } = await prisma.sourceCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SourceCategoryDeleteManyArgs>(args?: SelectSubset<T, SourceCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SourceCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SourceCategories
     * const sourceCategory = await prisma.sourceCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SourceCategoryUpdateManyArgs>(args: SelectSubset<T, SourceCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SourceCategory.
     * @param {SourceCategoryUpsertArgs} args - Arguments to update or create a SourceCategory.
     * @example
     * // Update or create a SourceCategory
     * const sourceCategory = await prisma.sourceCategory.upsert({
     *   create: {
     *     // ... data to create a SourceCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SourceCategory we want to update
     *   }
     * })
     */
    upsert<T extends SourceCategoryUpsertArgs>(args: SelectSubset<T, SourceCategoryUpsertArgs<ExtArgs>>): Prisma__SourceCategoryClient<$Result.GetResult<Prisma.$SourceCategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SourceCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceCategoryCountArgs} args - Arguments to filter SourceCategories to count.
     * @example
     * // Count the number of SourceCategories
     * const count = await prisma.sourceCategory.count({
     *   where: {
     *     // ... the filter for the SourceCategories we want to count
     *   }
     * })
    **/
    count<T extends SourceCategoryCountArgs>(
      args?: Subset<T, SourceCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SourceCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SourceCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SourceCategoryAggregateArgs>(args: Subset<T, SourceCategoryAggregateArgs>): Prisma.PrismaPromise<GetSourceCategoryAggregateType<T>>

    /**
     * Group by SourceCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceCategoryGroupByArgs} args - Group by arguments.
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
      T extends SourceCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SourceCategoryGroupByArgs['orderBy'] }
        : { orderBy?: SourceCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, SourceCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSourceCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SourceCategory model
   */
  readonly fields: SourceCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SourceCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SourceCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SourceCategory model
   */ 
  interface SourceCategoryFieldRefs {
    readonly id: FieldRef<"SourceCategory", 'BigInt'>
    readonly name: FieldRef<"SourceCategory", 'String'>
    readonly source: FieldRef<"SourceCategory", 'Source'>
    readonly sourceId: FieldRef<"SourceCategory", 'String'>
    readonly createdAt: FieldRef<"SourceCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SourceCategory findUnique
   */
  export type SourceCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCategory
     */
    select?: SourceCategorySelect<ExtArgs> | null
    /**
     * Filter, which SourceCategory to fetch.
     */
    where: SourceCategoryWhereUniqueInput
  }

  /**
   * SourceCategory findUniqueOrThrow
   */
  export type SourceCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCategory
     */
    select?: SourceCategorySelect<ExtArgs> | null
    /**
     * Filter, which SourceCategory to fetch.
     */
    where: SourceCategoryWhereUniqueInput
  }

  /**
   * SourceCategory findFirst
   */
  export type SourceCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCategory
     */
    select?: SourceCategorySelect<ExtArgs> | null
    /**
     * Filter, which SourceCategory to fetch.
     */
    where?: SourceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SourceCategories to fetch.
     */
    orderBy?: SourceCategoryOrderByWithRelationInput | SourceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SourceCategories.
     */
    cursor?: SourceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SourceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SourceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SourceCategories.
     */
    distinct?: SourceCategoryScalarFieldEnum | SourceCategoryScalarFieldEnum[]
  }

  /**
   * SourceCategory findFirstOrThrow
   */
  export type SourceCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCategory
     */
    select?: SourceCategorySelect<ExtArgs> | null
    /**
     * Filter, which SourceCategory to fetch.
     */
    where?: SourceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SourceCategories to fetch.
     */
    orderBy?: SourceCategoryOrderByWithRelationInput | SourceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SourceCategories.
     */
    cursor?: SourceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SourceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SourceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SourceCategories.
     */
    distinct?: SourceCategoryScalarFieldEnum | SourceCategoryScalarFieldEnum[]
  }

  /**
   * SourceCategory findMany
   */
  export type SourceCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCategory
     */
    select?: SourceCategorySelect<ExtArgs> | null
    /**
     * Filter, which SourceCategories to fetch.
     */
    where?: SourceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SourceCategories to fetch.
     */
    orderBy?: SourceCategoryOrderByWithRelationInput | SourceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SourceCategories.
     */
    cursor?: SourceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SourceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SourceCategories.
     */
    skip?: number
    distinct?: SourceCategoryScalarFieldEnum | SourceCategoryScalarFieldEnum[]
  }

  /**
   * SourceCategory create
   */
  export type SourceCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCategory
     */
    select?: SourceCategorySelect<ExtArgs> | null
    /**
     * The data needed to create a SourceCategory.
     */
    data: XOR<SourceCategoryCreateInput, SourceCategoryUncheckedCreateInput>
  }

  /**
   * SourceCategory createMany
   */
  export type SourceCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SourceCategories.
     */
    data: SourceCategoryCreateManyInput | SourceCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SourceCategory update
   */
  export type SourceCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCategory
     */
    select?: SourceCategorySelect<ExtArgs> | null
    /**
     * The data needed to update a SourceCategory.
     */
    data: XOR<SourceCategoryUpdateInput, SourceCategoryUncheckedUpdateInput>
    /**
     * Choose, which SourceCategory to update.
     */
    where: SourceCategoryWhereUniqueInput
  }

  /**
   * SourceCategory updateMany
   */
  export type SourceCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SourceCategories.
     */
    data: XOR<SourceCategoryUpdateManyMutationInput, SourceCategoryUncheckedUpdateManyInput>
    /**
     * Filter which SourceCategories to update
     */
    where?: SourceCategoryWhereInput
    limit?: number
  }

  /**
   * SourceCategory upsert
   */
  export type SourceCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCategory
     */
    select?: SourceCategorySelect<ExtArgs> | null
    /**
     * The filter to search for the SourceCategory to update in case it exists.
     */
    where: SourceCategoryWhereUniqueInput
    /**
     * In case the SourceCategory found by the `where` argument doesn't exist, create a new SourceCategory with this data.
     */
    create: XOR<SourceCategoryCreateInput, SourceCategoryUncheckedCreateInput>
    /**
     * In case the SourceCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SourceCategoryUpdateInput, SourceCategoryUncheckedUpdateInput>
  }

  /**
   * SourceCategory delete
   */
  export type SourceCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCategory
     */
    select?: SourceCategorySelect<ExtArgs> | null
    /**
     * Filter which SourceCategory to delete.
     */
    where: SourceCategoryWhereUniqueInput
  }

  /**
   * SourceCategory deleteMany
   */
  export type SourceCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SourceCategories to delete
     */
    where?: SourceCategoryWhereInput
    limit?: number
  }

  /**
   * SourceCategory without action
   */
  export type SourceCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCategory
     */
    select?: SourceCategorySelect<ExtArgs> | null
  }


  /**
   * Model PlatformProduct
   */

  export type AggregatePlatformProduct = {
    _count: PlatformProductCountAggregateOutputType | null
    _avg: PlatformProductAvgAggregateOutputType | null
    _sum: PlatformProductSumAggregateOutputType | null
    _min: PlatformProductMinAggregateOutputType | null
    _max: PlatformProductMaxAggregateOutputType | null
  }

  export type PlatformProductAvgAggregateOutputType = {
    id: number | null
    sourceProductId: number | null
    userId: number | null
  }

  export type PlatformProductSumAggregateOutputType = {
    id: bigint | null
    sourceProductId: bigint | null
    userId: bigint | null
  }

  export type PlatformProductMinAggregateOutputType = {
    id: bigint | null
    platformId: string | null
    sourceProductId: bigint | null
    userId: bigint | null
    title: string | null
    handle: string | null
    descriptionHtml: string | null
    featuredMedia: string | null
    createdAt: Date | null
  }

  export type PlatformProductMaxAggregateOutputType = {
    id: bigint | null
    platformId: string | null
    sourceProductId: bigint | null
    userId: bigint | null
    title: string | null
    handle: string | null
    descriptionHtml: string | null
    featuredMedia: string | null
    createdAt: Date | null
  }

  export type PlatformProductCountAggregateOutputType = {
    id: number
    platformId: number
    sourceProductId: number
    userId: number
    metafields: number
    title: number
    handle: number
    descriptionHtml: number
    featuredMedia: number
    createdAt: number
    _all: number
  }


  export type PlatformProductAvgAggregateInputType = {
    id?: true
    sourceProductId?: true
    userId?: true
  }

  export type PlatformProductSumAggregateInputType = {
    id?: true
    sourceProductId?: true
    userId?: true
  }

  export type PlatformProductMinAggregateInputType = {
    id?: true
    platformId?: true
    sourceProductId?: true
    userId?: true
    title?: true
    handle?: true
    descriptionHtml?: true
    featuredMedia?: true
    createdAt?: true
  }

  export type PlatformProductMaxAggregateInputType = {
    id?: true
    platformId?: true
    sourceProductId?: true
    userId?: true
    title?: true
    handle?: true
    descriptionHtml?: true
    featuredMedia?: true
    createdAt?: true
  }

  export type PlatformProductCountAggregateInputType = {
    id?: true
    platformId?: true
    sourceProductId?: true
    userId?: true
    metafields?: true
    title?: true
    handle?: true
    descriptionHtml?: true
    featuredMedia?: true
    createdAt?: true
    _all?: true
  }

  export type PlatformProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformProduct to aggregate.
     */
    where?: PlatformProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformProducts to fetch.
     */
    orderBy?: PlatformProductOrderByWithRelationInput | PlatformProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatformProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlatformProducts
    **/
    _count?: true | PlatformProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlatformProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlatformProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformProductMaxAggregateInputType
  }

  export type GetPlatformProductAggregateType<T extends PlatformProductAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatformProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatformProduct[P]>
      : GetScalarType<T[P], AggregatePlatformProduct[P]>
  }




  export type PlatformProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformProductWhereInput
    orderBy?: PlatformProductOrderByWithAggregationInput | PlatformProductOrderByWithAggregationInput[]
    by: PlatformProductScalarFieldEnum[] | PlatformProductScalarFieldEnum
    having?: PlatformProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformProductCountAggregateInputType | true
    _avg?: PlatformProductAvgAggregateInputType
    _sum?: PlatformProductSumAggregateInputType
    _min?: PlatformProductMinAggregateInputType
    _max?: PlatformProductMaxAggregateInputType
  }

  export type PlatformProductGroupByOutputType = {
    id: bigint
    platformId: string | null
    sourceProductId: bigint
    userId: bigint
    metafields: JsonValue | null
    title: string
    handle: string
    descriptionHtml: string | null
    featuredMedia: string | null
    createdAt: Date
    _count: PlatformProductCountAggregateOutputType | null
    _avg: PlatformProductAvgAggregateOutputType | null
    _sum: PlatformProductSumAggregateOutputType | null
    _min: PlatformProductMinAggregateOutputType | null
    _max: PlatformProductMaxAggregateOutputType | null
  }

  type GetPlatformProductGroupByPayload<T extends PlatformProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatformProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformProductGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformProductGroupByOutputType[P]>
        }
      >
    >


  export type PlatformProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platformId?: boolean
    sourceProductId?: boolean
    userId?: boolean
    metafields?: boolean
    title?: boolean
    handle?: boolean
    descriptionHtml?: boolean
    featuredMedia?: boolean
    createdAt?: boolean
    user?: boolean | PlatformProduct$userArgs<ExtArgs>
    sourceProduct?: boolean | PlatformProduct$sourceProductArgs<ExtArgs>
  }, ExtArgs["result"]["platformProduct"]>


  export type PlatformProductSelectScalar = {
    id?: boolean
    platformId?: boolean
    sourceProductId?: boolean
    userId?: boolean
    metafields?: boolean
    title?: boolean
    handle?: boolean
    descriptionHtml?: boolean
    featuredMedia?: boolean
    createdAt?: boolean
  }

  export type PlatformProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | PlatformProduct$userArgs<ExtArgs>
    sourceProduct?: boolean | PlatformProduct$sourceProductArgs<ExtArgs>
  }

  export type $PlatformProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlatformProduct"
    objects: {
      user: Prisma.$SessionPayload<ExtArgs> | null
      sourceProduct: Prisma.$SourceProductPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      platformId: string | null
      sourceProductId: bigint
      userId: bigint
      metafields: Prisma.JsonValue | null
      title: string
      handle: string
      descriptionHtml: string | null
      featuredMedia: string | null
      createdAt: Date
    }, ExtArgs["result"]["platformProduct"]>
    composites: {}
  }

  type PlatformProductGetPayload<S extends boolean | null | undefined | PlatformProductDefaultArgs> = $Result.GetResult<Prisma.$PlatformProductPayload, S>

  type PlatformProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlatformProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlatformProductCountAggregateInputType | true
    }

  export interface PlatformProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlatformProduct'], meta: { name: 'PlatformProduct' } }
    /**
     * Find zero or one PlatformProduct that matches the filter.
     * @param {PlatformProductFindUniqueArgs} args - Arguments to find a PlatformProduct
     * @example
     * // Get one PlatformProduct
     * const platformProduct = await prisma.platformProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlatformProductFindUniqueArgs>(args: SelectSubset<T, PlatformProductFindUniqueArgs<ExtArgs>>): Prisma__PlatformProductClient<$Result.GetResult<Prisma.$PlatformProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PlatformProduct that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlatformProductFindUniqueOrThrowArgs} args - Arguments to find a PlatformProduct
     * @example
     * // Get one PlatformProduct
     * const platformProduct = await prisma.platformProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlatformProductFindUniqueOrThrowArgs>(args: SelectSubset<T, PlatformProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlatformProductClient<$Result.GetResult<Prisma.$PlatformProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PlatformProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformProductFindFirstArgs} args - Arguments to find a PlatformProduct
     * @example
     * // Get one PlatformProduct
     * const platformProduct = await prisma.platformProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlatformProductFindFirstArgs>(args?: SelectSubset<T, PlatformProductFindFirstArgs<ExtArgs>>): Prisma__PlatformProductClient<$Result.GetResult<Prisma.$PlatformProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PlatformProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformProductFindFirstOrThrowArgs} args - Arguments to find a PlatformProduct
     * @example
     * // Get one PlatformProduct
     * const platformProduct = await prisma.platformProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlatformProductFindFirstOrThrowArgs>(args?: SelectSubset<T, PlatformProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlatformProductClient<$Result.GetResult<Prisma.$PlatformProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PlatformProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlatformProducts
     * const platformProducts = await prisma.platformProduct.findMany()
     * 
     * // Get first 10 PlatformProducts
     * const platformProducts = await prisma.platformProduct.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformProductWithIdOnly = await prisma.platformProduct.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlatformProductFindManyArgs>(args?: SelectSubset<T, PlatformProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PlatformProduct.
     * @param {PlatformProductCreateArgs} args - Arguments to create a PlatformProduct.
     * @example
     * // Create one PlatformProduct
     * const PlatformProduct = await prisma.platformProduct.create({
     *   data: {
     *     // ... data to create a PlatformProduct
     *   }
     * })
     * 
     */
    create<T extends PlatformProductCreateArgs>(args: SelectSubset<T, PlatformProductCreateArgs<ExtArgs>>): Prisma__PlatformProductClient<$Result.GetResult<Prisma.$PlatformProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PlatformProducts.
     * @param {PlatformProductCreateManyArgs} args - Arguments to create many PlatformProducts.
     * @example
     * // Create many PlatformProducts
     * const platformProduct = await prisma.platformProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlatformProductCreateManyArgs>(args?: SelectSubset<T, PlatformProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PlatformProduct.
     * @param {PlatformProductDeleteArgs} args - Arguments to delete one PlatformProduct.
     * @example
     * // Delete one PlatformProduct
     * const PlatformProduct = await prisma.platformProduct.delete({
     *   where: {
     *     // ... filter to delete one PlatformProduct
     *   }
     * })
     * 
     */
    delete<T extends PlatformProductDeleteArgs>(args: SelectSubset<T, PlatformProductDeleteArgs<ExtArgs>>): Prisma__PlatformProductClient<$Result.GetResult<Prisma.$PlatformProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PlatformProduct.
     * @param {PlatformProductUpdateArgs} args - Arguments to update one PlatformProduct.
     * @example
     * // Update one PlatformProduct
     * const platformProduct = await prisma.platformProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlatformProductUpdateArgs>(args: SelectSubset<T, PlatformProductUpdateArgs<ExtArgs>>): Prisma__PlatformProductClient<$Result.GetResult<Prisma.$PlatformProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PlatformProducts.
     * @param {PlatformProductDeleteManyArgs} args - Arguments to filter PlatformProducts to delete.
     * @example
     * // Delete a few PlatformProducts
     * const { count } = await prisma.platformProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlatformProductDeleteManyArgs>(args?: SelectSubset<T, PlatformProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlatformProducts
     * const platformProduct = await prisma.platformProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlatformProductUpdateManyArgs>(args: SelectSubset<T, PlatformProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlatformProduct.
     * @param {PlatformProductUpsertArgs} args - Arguments to update or create a PlatformProduct.
     * @example
     * // Update or create a PlatformProduct
     * const platformProduct = await prisma.platformProduct.upsert({
     *   create: {
     *     // ... data to create a PlatformProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlatformProduct we want to update
     *   }
     * })
     */
    upsert<T extends PlatformProductUpsertArgs>(args: SelectSubset<T, PlatformProductUpsertArgs<ExtArgs>>): Prisma__PlatformProductClient<$Result.GetResult<Prisma.$PlatformProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PlatformProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformProductCountArgs} args - Arguments to filter PlatformProducts to count.
     * @example
     * // Count the number of PlatformProducts
     * const count = await prisma.platformProduct.count({
     *   where: {
     *     // ... the filter for the PlatformProducts we want to count
     *   }
     * })
    **/
    count<T extends PlatformProductCountArgs>(
      args?: Subset<T, PlatformProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlatformProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlatformProductAggregateArgs>(args: Subset<T, PlatformProductAggregateArgs>): Prisma.PrismaPromise<GetPlatformProductAggregateType<T>>

    /**
     * Group by PlatformProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformProductGroupByArgs} args - Group by arguments.
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
      T extends PlatformProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatformProductGroupByArgs['orderBy'] }
        : { orderBy?: PlatformProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PlatformProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlatformProduct model
   */
  readonly fields: PlatformProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlatformProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlatformProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends PlatformProduct$userArgs<ExtArgs> = {}>(args?: Subset<T, PlatformProduct$userArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    sourceProduct<T extends PlatformProduct$sourceProductArgs<ExtArgs> = {}>(args?: Subset<T, PlatformProduct$sourceProductArgs<ExtArgs>>): Prisma__SourceProductClient<$Result.GetResult<Prisma.$SourceProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlatformProduct model
   */ 
  interface PlatformProductFieldRefs {
    readonly id: FieldRef<"PlatformProduct", 'BigInt'>
    readonly platformId: FieldRef<"PlatformProduct", 'String'>
    readonly sourceProductId: FieldRef<"PlatformProduct", 'BigInt'>
    readonly userId: FieldRef<"PlatformProduct", 'BigInt'>
    readonly metafields: FieldRef<"PlatformProduct", 'Json'>
    readonly title: FieldRef<"PlatformProduct", 'String'>
    readonly handle: FieldRef<"PlatformProduct", 'String'>
    readonly descriptionHtml: FieldRef<"PlatformProduct", 'String'>
    readonly featuredMedia: FieldRef<"PlatformProduct", 'String'>
    readonly createdAt: FieldRef<"PlatformProduct", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlatformProduct findUnique
   */
  export type PlatformProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformProduct
     */
    select?: PlatformProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformProductInclude<ExtArgs> | null
    /**
     * Filter, which PlatformProduct to fetch.
     */
    where: PlatformProductWhereUniqueInput
  }

  /**
   * PlatformProduct findUniqueOrThrow
   */
  export type PlatformProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformProduct
     */
    select?: PlatformProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformProductInclude<ExtArgs> | null
    /**
     * Filter, which PlatformProduct to fetch.
     */
    where: PlatformProductWhereUniqueInput
  }

  /**
   * PlatformProduct findFirst
   */
  export type PlatformProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformProduct
     */
    select?: PlatformProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformProductInclude<ExtArgs> | null
    /**
     * Filter, which PlatformProduct to fetch.
     */
    where?: PlatformProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformProducts to fetch.
     */
    orderBy?: PlatformProductOrderByWithRelationInput | PlatformProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformProducts.
     */
    cursor?: PlatformProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformProducts.
     */
    distinct?: PlatformProductScalarFieldEnum | PlatformProductScalarFieldEnum[]
  }

  /**
   * PlatformProduct findFirstOrThrow
   */
  export type PlatformProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformProduct
     */
    select?: PlatformProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformProductInclude<ExtArgs> | null
    /**
     * Filter, which PlatformProduct to fetch.
     */
    where?: PlatformProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformProducts to fetch.
     */
    orderBy?: PlatformProductOrderByWithRelationInput | PlatformProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformProducts.
     */
    cursor?: PlatformProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformProducts.
     */
    distinct?: PlatformProductScalarFieldEnum | PlatformProductScalarFieldEnum[]
  }

  /**
   * PlatformProduct findMany
   */
  export type PlatformProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformProduct
     */
    select?: PlatformProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformProductInclude<ExtArgs> | null
    /**
     * Filter, which PlatformProducts to fetch.
     */
    where?: PlatformProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformProducts to fetch.
     */
    orderBy?: PlatformProductOrderByWithRelationInput | PlatformProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlatformProducts.
     */
    cursor?: PlatformProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformProducts.
     */
    skip?: number
    distinct?: PlatformProductScalarFieldEnum | PlatformProductScalarFieldEnum[]
  }

  /**
   * PlatformProduct create
   */
  export type PlatformProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformProduct
     */
    select?: PlatformProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformProductInclude<ExtArgs> | null
    /**
     * The data needed to create a PlatformProduct.
     */
    data: XOR<PlatformProductCreateInput, PlatformProductUncheckedCreateInput>
  }

  /**
   * PlatformProduct createMany
   */
  export type PlatformProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlatformProducts.
     */
    data: PlatformProductCreateManyInput | PlatformProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlatformProduct update
   */
  export type PlatformProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformProduct
     */
    select?: PlatformProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformProductInclude<ExtArgs> | null
    /**
     * The data needed to update a PlatformProduct.
     */
    data: XOR<PlatformProductUpdateInput, PlatformProductUncheckedUpdateInput>
    /**
     * Choose, which PlatformProduct to update.
     */
    where: PlatformProductWhereUniqueInput
  }

  /**
   * PlatformProduct updateMany
   */
  export type PlatformProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlatformProducts.
     */
    data: XOR<PlatformProductUpdateManyMutationInput, PlatformProductUncheckedUpdateManyInput>
    /**
     * Filter which PlatformProducts to update
     */
    where?: PlatformProductWhereInput
    limit?: number
  }

  /**
   * PlatformProduct upsert
   */
  export type PlatformProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformProduct
     */
    select?: PlatformProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformProductInclude<ExtArgs> | null
    /**
     * The filter to search for the PlatformProduct to update in case it exists.
     */
    where: PlatformProductWhereUniqueInput
    /**
     * In case the PlatformProduct found by the `where` argument doesn't exist, create a new PlatformProduct with this data.
     */
    create: XOR<PlatformProductCreateInput, PlatformProductUncheckedCreateInput>
    /**
     * In case the PlatformProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatformProductUpdateInput, PlatformProductUncheckedUpdateInput>
  }

  /**
   * PlatformProduct delete
   */
  export type PlatformProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformProduct
     */
    select?: PlatformProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformProductInclude<ExtArgs> | null
    /**
     * Filter which PlatformProduct to delete.
     */
    where: PlatformProductWhereUniqueInput
  }

  /**
   * PlatformProduct deleteMany
   */
  export type PlatformProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformProducts to delete
     */
    where?: PlatformProductWhereInput
    limit?: number
  }

  /**
   * PlatformProduct.user
   */
  export type PlatformProduct$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
  }

  /**
   * PlatformProduct.sourceProduct
   */
  export type PlatformProduct$sourceProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceProduct
     */
    select?: SourceProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceProductInclude<ExtArgs> | null
    where?: SourceProductWhereInput
  }

  /**
   * PlatformProduct without action
   */
  export type PlatformProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformProduct
     */
    select?: PlatformProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformProductInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SessionScalarFieldEnum: {
    id: 'id',
    shop: 'shop',
    state: 'state',
    isOnline: 'isOnline',
    scope: 'scope',
    expires: 'expires',
    accessToken: 'accessToken',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    accountOwner: 'accountOwner',
    locale: 'locale',
    collaborator: 'collaborator',
    emailVerified: 'emailVerified'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const PricingModuleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    key: 'key',
    price: 'price',
    is_default: 'is_default',
    available: 'available',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PricingModuleScalarFieldEnum = (typeof PricingModuleScalarFieldEnum)[keyof typeof PricingModuleScalarFieldEnum]


  export const PricingFeatureScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    cycle: 'cycle',
    is_active: 'is_active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PricingFeatureScalarFieldEnum = (typeof PricingFeatureScalarFieldEnum)[keyof typeof PricingFeatureScalarFieldEnum]


  export const PricingModuleFeatureScalarFieldEnum: {
    moduleId: 'moduleId',
    featureId: 'featureId',
    limit_quantity: 'limit_quantity',
    cycle: 'cycle',
    createdAt: 'createdAt'
  };

  export type PricingModuleFeatureScalarFieldEnum = (typeof PricingModuleFeatureScalarFieldEnum)[keyof typeof PricingModuleFeatureScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    start_time: 'start_time',
    next_billing_time: 'next_billing_time',
    external_subscription_id: 'external_subscription_id',
    status: 'status',
    amount: 'amount',
    moduleId: 'moduleId',
    is_trial: 'is_trial',
    is_test: 'is_test',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const SubscriptionQuotaScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    feature_id: 'feature_id',
    limit_quantity: 'limit_quantity',
    used_quantity: 'used_quantity',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type SubscriptionQuotaScalarFieldEnum = (typeof SubscriptionQuotaScalarFieldEnum)[keyof typeof SubscriptionQuotaScalarFieldEnum]


  export const UsageLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    feature_id: 'feature_id',
    used_quantity: 'used_quantity',
    createdAt: 'createdAt'
  };

  export type UsageLogScalarFieldEnum = (typeof UsageLogScalarFieldEnum)[keyof typeof UsageLogScalarFieldEnum]


  export const PaymentLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    status: 'status',
    external_transaction_id: 'external_transaction_id',
    details: 'details',
    amount: 'amount',
    createdAt: 'createdAt'
  };

  export type PaymentLogScalarFieldEnum = (typeof PaymentLogScalarFieldEnum)[keyof typeof PaymentLogScalarFieldEnum]


  export const SourceProductScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    image: 'image',
    video: 'video',
    price: 'price',
    source: 'source',
    sourceUrl: 'sourceUrl',
    sourceId: 'sourceId',
    comparePrice: 'comparePrice',
    estProfit: 'estProfit',
    rating: 'rating',
    totalRating: 'totalRating',
    like: 'like',
    share: 'share',
    comment: 'comment',
    tiktokUrl: 'tiktokUrl',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SourceProductScalarFieldEnum = (typeof SourceProductScalarFieldEnum)[keyof typeof SourceProductScalarFieldEnum]


  export const SourceCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    source: 'source',
    sourceId: 'sourceId',
    createdAt: 'createdAt'
  };

  export type SourceCategoryScalarFieldEnum = (typeof SourceCategoryScalarFieldEnum)[keyof typeof SourceCategoryScalarFieldEnum]


  export const PlatformProductScalarFieldEnum: {
    id: 'id',
    platformId: 'platformId',
    sourceProductId: 'sourceProductId',
    userId: 'userId',
    metafields: 'metafields',
    title: 'title',
    handle: 'handle',
    descriptionHtml: 'descriptionHtml',
    featuredMedia: 'featuredMedia',
    createdAt: 'createdAt'
  };

  export type PlatformProductScalarFieldEnum = (typeof PlatformProductScalarFieldEnum)[keyof typeof PlatformProductScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const SessionOrderByRelevanceFieldEnum: {
    id: 'id',
    shop: 'shop',
    state: 'state',
    scope: 'scope',
    accessToken: 'accessToken',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    locale: 'locale'
  };

  export type SessionOrderByRelevanceFieldEnum = (typeof SessionOrderByRelevanceFieldEnum)[keyof typeof SessionOrderByRelevanceFieldEnum]


  export const PricingModuleOrderByRelevanceFieldEnum: {
    name: 'name',
    key: 'key'
  };

  export type PricingModuleOrderByRelevanceFieldEnum = (typeof PricingModuleOrderByRelevanceFieldEnum)[keyof typeof PricingModuleOrderByRelevanceFieldEnum]


  export const PricingFeatureOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type PricingFeatureOrderByRelevanceFieldEnum = (typeof PricingFeatureOrderByRelevanceFieldEnum)[keyof typeof PricingFeatureOrderByRelevanceFieldEnum]


  export const PricingModuleFeatureOrderByRelevanceFieldEnum: {
    featureId: 'featureId'
  };

  export type PricingModuleFeatureOrderByRelevanceFieldEnum = (typeof PricingModuleFeatureOrderByRelevanceFieldEnum)[keyof typeof PricingModuleFeatureOrderByRelevanceFieldEnum]


  export const SubscriptionOrderByRelevanceFieldEnum: {
    id: 'id',
    external_subscription_id: 'external_subscription_id',
    status: 'status'
  };

  export type SubscriptionOrderByRelevanceFieldEnum = (typeof SubscriptionOrderByRelevanceFieldEnum)[keyof typeof SubscriptionOrderByRelevanceFieldEnum]


  export const SubscriptionQuotaOrderByRelevanceFieldEnum: {
    feature_id: 'feature_id'
  };

  export type SubscriptionQuotaOrderByRelevanceFieldEnum = (typeof SubscriptionQuotaOrderByRelevanceFieldEnum)[keyof typeof SubscriptionQuotaOrderByRelevanceFieldEnum]


  export const UsageLogOrderByRelevanceFieldEnum: {
    feature_id: 'feature_id'
  };

  export type UsageLogOrderByRelevanceFieldEnum = (typeof UsageLogOrderByRelevanceFieldEnum)[keyof typeof UsageLogOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const PaymentLogOrderByRelevanceFieldEnum: {
    action: 'action',
    external_transaction_id: 'external_transaction_id'
  };

  export type PaymentLogOrderByRelevanceFieldEnum = (typeof PaymentLogOrderByRelevanceFieldEnum)[keyof typeof PaymentLogOrderByRelevanceFieldEnum]


  export const SourceProductOrderByRelevanceFieldEnum: {
    title: 'title',
    description: 'description',
    image: 'image',
    video: 'video',
    sourceUrl: 'sourceUrl',
    sourceId: 'sourceId',
    tiktokUrl: 'tiktokUrl'
  };

  export type SourceProductOrderByRelevanceFieldEnum = (typeof SourceProductOrderByRelevanceFieldEnum)[keyof typeof SourceProductOrderByRelevanceFieldEnum]


  export const SourceCategoryOrderByRelevanceFieldEnum: {
    name: 'name',
    sourceId: 'sourceId'
  };

  export type SourceCategoryOrderByRelevanceFieldEnum = (typeof SourceCategoryOrderByRelevanceFieldEnum)[keyof typeof SourceCategoryOrderByRelevanceFieldEnum]


  export const PlatformProductOrderByRelevanceFieldEnum: {
    platformId: 'platformId',
    title: 'title',
    handle: 'handle',
    descriptionHtml: 'descriptionHtml',
    featuredMedia: 'featuredMedia'
  };

  export type PlatformProductOrderByRelevanceFieldEnum = (typeof PlatformProductOrderByRelevanceFieldEnum)[keyof typeof PlatformProductOrderByRelevanceFieldEnum]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'QuotaType'
   */
  export type EnumQuotaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuotaType'>
    


  /**
   * Reference to a field of type 'PaymentLogStatus'
   */
  export type EnumPaymentLogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentLogStatus'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Source'
   */
  export type EnumSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Source'>
    


  /**
   * Reference to a field of type 'SourceStatus'
   */
  export type EnumSourceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceStatus'>
    
  /**
   * Deep Input Types
   */


  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    shop?: StringFilter<"Session"> | string
    state?: StringFilter<"Session"> | string
    isOnline?: BoolFilter<"Session"> | boolean
    scope?: StringNullableFilter<"Session"> | string | null
    expires?: DateTimeNullableFilter<"Session"> | Date | string | null
    accessToken?: StringFilter<"Session"> | string
    userId?: BigIntFilter<"Session"> | bigint | number
    firstName?: StringNullableFilter<"Session"> | string | null
    lastName?: StringNullableFilter<"Session"> | string | null
    email?: StringNullableFilter<"Session"> | string | null
    accountOwner?: BoolFilter<"Session"> | boolean
    locale?: StringNullableFilter<"Session"> | string | null
    collaborator?: BoolNullableFilter<"Session"> | boolean | null
    emailVerified?: BoolNullableFilter<"Session"> | boolean | null
    Subscription?: SubscriptionListRelationFilter
    SubscriptionQuota?: SubscriptionQuotaListRelationFilter
    UsageLog?: UsageLogListRelationFilter
    PaymentLog?: PaymentLogListRelationFilter
    PlatformProduct?: PlatformProductListRelationFilter
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrderInput | SortOrder
    expires?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    accountOwner?: SortOrder
    locale?: SortOrderInput | SortOrder
    collaborator?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    Subscription?: SubscriptionOrderByRelationAggregateInput
    SubscriptionQuota?: SubscriptionQuotaOrderByRelationAggregateInput
    UsageLog?: UsageLogOrderByRelationAggregateInput
    PaymentLog?: PaymentLogOrderByRelationAggregateInput
    PlatformProduct?: PlatformProductOrderByRelationAggregateInput
    _relevance?: SessionOrderByRelevanceInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: bigint | number
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    shop?: StringFilter<"Session"> | string
    state?: StringFilter<"Session"> | string
    isOnline?: BoolFilter<"Session"> | boolean
    scope?: StringNullableFilter<"Session"> | string | null
    expires?: DateTimeNullableFilter<"Session"> | Date | string | null
    accessToken?: StringFilter<"Session"> | string
    firstName?: StringNullableFilter<"Session"> | string | null
    lastName?: StringNullableFilter<"Session"> | string | null
    email?: StringNullableFilter<"Session"> | string | null
    accountOwner?: BoolFilter<"Session"> | boolean
    locale?: StringNullableFilter<"Session"> | string | null
    collaborator?: BoolNullableFilter<"Session"> | boolean | null
    emailVerified?: BoolNullableFilter<"Session"> | boolean | null
    Subscription?: SubscriptionListRelationFilter
    SubscriptionQuota?: SubscriptionQuotaListRelationFilter
    UsageLog?: UsageLogListRelationFilter
    PaymentLog?: PaymentLogListRelationFilter
    PlatformProduct?: PlatformProductListRelationFilter
  }, "id" | "userId">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrderInput | SortOrder
    expires?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    accountOwner?: SortOrder
    locale?: SortOrderInput | SortOrder
    collaborator?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    shop?: StringWithAggregatesFilter<"Session"> | string
    state?: StringWithAggregatesFilter<"Session"> | string
    isOnline?: BoolWithAggregatesFilter<"Session"> | boolean
    scope?: StringNullableWithAggregatesFilter<"Session"> | string | null
    expires?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    accessToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: BigIntWithAggregatesFilter<"Session"> | bigint | number
    firstName?: StringNullableWithAggregatesFilter<"Session"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"Session"> | string | null
    email?: StringNullableWithAggregatesFilter<"Session"> | string | null
    accountOwner?: BoolWithAggregatesFilter<"Session"> | boolean
    locale?: StringNullableWithAggregatesFilter<"Session"> | string | null
    collaborator?: BoolNullableWithAggregatesFilter<"Session"> | boolean | null
    emailVerified?: BoolNullableWithAggregatesFilter<"Session"> | boolean | null
  }

  export type PricingModuleWhereInput = {
    AND?: PricingModuleWhereInput | PricingModuleWhereInput[]
    OR?: PricingModuleWhereInput[]
    NOT?: PricingModuleWhereInput | PricingModuleWhereInput[]
    id?: IntFilter<"PricingModule"> | number
    name?: StringFilter<"PricingModule"> | string
    key?: StringFilter<"PricingModule"> | string
    price?: FloatFilter<"PricingModule"> | number
    is_default?: BoolNullableFilter<"PricingModule"> | boolean | null
    available?: BoolNullableFilter<"PricingModule"> | boolean | null
    createdAt?: DateTimeFilter<"PricingModule"> | Date | string
    updatedAt?: DateTimeFilter<"PricingModule"> | Date | string
    features?: PricingModuleFeatureListRelationFilter
    Subscription?: SubscriptionListRelationFilter
  }

  export type PricingModuleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    price?: SortOrder
    is_default?: SortOrderInput | SortOrder
    available?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    features?: PricingModuleFeatureOrderByRelationAggregateInput
    Subscription?: SubscriptionOrderByRelationAggregateInput
    _relevance?: PricingModuleOrderByRelevanceInput
  }

  export type PricingModuleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PricingModuleWhereInput | PricingModuleWhereInput[]
    OR?: PricingModuleWhereInput[]
    NOT?: PricingModuleWhereInput | PricingModuleWhereInput[]
    name?: StringFilter<"PricingModule"> | string
    key?: StringFilter<"PricingModule"> | string
    price?: FloatFilter<"PricingModule"> | number
    is_default?: BoolNullableFilter<"PricingModule"> | boolean | null
    available?: BoolNullableFilter<"PricingModule"> | boolean | null
    createdAt?: DateTimeFilter<"PricingModule"> | Date | string
    updatedAt?: DateTimeFilter<"PricingModule"> | Date | string
    features?: PricingModuleFeatureListRelationFilter
    Subscription?: SubscriptionListRelationFilter
  }, "id">

  export type PricingModuleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    price?: SortOrder
    is_default?: SortOrderInput | SortOrder
    available?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PricingModuleCountOrderByAggregateInput
    _avg?: PricingModuleAvgOrderByAggregateInput
    _max?: PricingModuleMaxOrderByAggregateInput
    _min?: PricingModuleMinOrderByAggregateInput
    _sum?: PricingModuleSumOrderByAggregateInput
  }

  export type PricingModuleScalarWhereWithAggregatesInput = {
    AND?: PricingModuleScalarWhereWithAggregatesInput | PricingModuleScalarWhereWithAggregatesInput[]
    OR?: PricingModuleScalarWhereWithAggregatesInput[]
    NOT?: PricingModuleScalarWhereWithAggregatesInput | PricingModuleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PricingModule"> | number
    name?: StringWithAggregatesFilter<"PricingModule"> | string
    key?: StringWithAggregatesFilter<"PricingModule"> | string
    price?: FloatWithAggregatesFilter<"PricingModule"> | number
    is_default?: BoolNullableWithAggregatesFilter<"PricingModule"> | boolean | null
    available?: BoolNullableWithAggregatesFilter<"PricingModule"> | boolean | null
    createdAt?: DateTimeWithAggregatesFilter<"PricingModule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PricingModule"> | Date | string
  }

  export type PricingFeatureWhereInput = {
    AND?: PricingFeatureWhereInput | PricingFeatureWhereInput[]
    OR?: PricingFeatureWhereInput[]
    NOT?: PricingFeatureWhereInput | PricingFeatureWhereInput[]
    id?: StringFilter<"PricingFeature"> | string
    name?: StringFilter<"PricingFeature"> | string
    description?: StringFilter<"PricingFeature"> | string
    cycle?: IntFilter<"PricingFeature"> | number
    is_active?: BoolNullableFilter<"PricingFeature"> | boolean | null
    createdAt?: DateTimeFilter<"PricingFeature"> | Date | string
    updatedAt?: DateTimeFilter<"PricingFeature"> | Date | string
    modules?: PricingModuleFeatureListRelationFilter
    SubscriptionQuota?: SubscriptionQuotaListRelationFilter
    UsageLog?: UsageLogListRelationFilter
  }

  export type PricingFeatureOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    cycle?: SortOrder
    is_active?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modules?: PricingModuleFeatureOrderByRelationAggregateInput
    SubscriptionQuota?: SubscriptionQuotaOrderByRelationAggregateInput
    UsageLog?: UsageLogOrderByRelationAggregateInput
    _relevance?: PricingFeatureOrderByRelevanceInput
  }

  export type PricingFeatureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PricingFeatureWhereInput | PricingFeatureWhereInput[]
    OR?: PricingFeatureWhereInput[]
    NOT?: PricingFeatureWhereInput | PricingFeatureWhereInput[]
    name?: StringFilter<"PricingFeature"> | string
    description?: StringFilter<"PricingFeature"> | string
    cycle?: IntFilter<"PricingFeature"> | number
    is_active?: BoolNullableFilter<"PricingFeature"> | boolean | null
    createdAt?: DateTimeFilter<"PricingFeature"> | Date | string
    updatedAt?: DateTimeFilter<"PricingFeature"> | Date | string
    modules?: PricingModuleFeatureListRelationFilter
    SubscriptionQuota?: SubscriptionQuotaListRelationFilter
    UsageLog?: UsageLogListRelationFilter
  }, "id">

  export type PricingFeatureOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    cycle?: SortOrder
    is_active?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PricingFeatureCountOrderByAggregateInput
    _avg?: PricingFeatureAvgOrderByAggregateInput
    _max?: PricingFeatureMaxOrderByAggregateInput
    _min?: PricingFeatureMinOrderByAggregateInput
    _sum?: PricingFeatureSumOrderByAggregateInput
  }

  export type PricingFeatureScalarWhereWithAggregatesInput = {
    AND?: PricingFeatureScalarWhereWithAggregatesInput | PricingFeatureScalarWhereWithAggregatesInput[]
    OR?: PricingFeatureScalarWhereWithAggregatesInput[]
    NOT?: PricingFeatureScalarWhereWithAggregatesInput | PricingFeatureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PricingFeature"> | string
    name?: StringWithAggregatesFilter<"PricingFeature"> | string
    description?: StringWithAggregatesFilter<"PricingFeature"> | string
    cycle?: IntWithAggregatesFilter<"PricingFeature"> | number
    is_active?: BoolNullableWithAggregatesFilter<"PricingFeature"> | boolean | null
    createdAt?: DateTimeWithAggregatesFilter<"PricingFeature"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PricingFeature"> | Date | string
  }

  export type PricingModuleFeatureWhereInput = {
    AND?: PricingModuleFeatureWhereInput | PricingModuleFeatureWhereInput[]
    OR?: PricingModuleFeatureWhereInput[]
    NOT?: PricingModuleFeatureWhereInput | PricingModuleFeatureWhereInput[]
    moduleId?: IntFilter<"PricingModuleFeature"> | number
    featureId?: StringFilter<"PricingModuleFeature"> | string
    limit_quantity?: IntFilter<"PricingModuleFeature"> | number
    cycle?: IntFilter<"PricingModuleFeature"> | number
    createdAt?: DateTimeFilter<"PricingModuleFeature"> | Date | string
    module?: XOR<PricingModuleNullableScalarRelationFilter, PricingModuleWhereInput> | null
    feature?: XOR<PricingFeatureNullableScalarRelationFilter, PricingFeatureWhereInput> | null
  }

  export type PricingModuleFeatureOrderByWithRelationInput = {
    moduleId?: SortOrder
    featureId?: SortOrder
    limit_quantity?: SortOrder
    cycle?: SortOrder
    createdAt?: SortOrder
    module?: PricingModuleOrderByWithRelationInput
    feature?: PricingFeatureOrderByWithRelationInput
    _relevance?: PricingModuleFeatureOrderByRelevanceInput
  }

  export type PricingModuleFeatureWhereUniqueInput = Prisma.AtLeast<{
    moduleId_featureId?: PricingModuleFeatureModuleIdFeatureIdCompoundUniqueInput
    AND?: PricingModuleFeatureWhereInput | PricingModuleFeatureWhereInput[]
    OR?: PricingModuleFeatureWhereInput[]
    NOT?: PricingModuleFeatureWhereInput | PricingModuleFeatureWhereInput[]
    moduleId?: IntFilter<"PricingModuleFeature"> | number
    featureId?: StringFilter<"PricingModuleFeature"> | string
    limit_quantity?: IntFilter<"PricingModuleFeature"> | number
    cycle?: IntFilter<"PricingModuleFeature"> | number
    createdAt?: DateTimeFilter<"PricingModuleFeature"> | Date | string
    module?: XOR<PricingModuleNullableScalarRelationFilter, PricingModuleWhereInput> | null
    feature?: XOR<PricingFeatureNullableScalarRelationFilter, PricingFeatureWhereInput> | null
  }, "moduleId_featureId">

  export type PricingModuleFeatureOrderByWithAggregationInput = {
    moduleId?: SortOrder
    featureId?: SortOrder
    limit_quantity?: SortOrder
    cycle?: SortOrder
    createdAt?: SortOrder
    _count?: PricingModuleFeatureCountOrderByAggregateInput
    _avg?: PricingModuleFeatureAvgOrderByAggregateInput
    _max?: PricingModuleFeatureMaxOrderByAggregateInput
    _min?: PricingModuleFeatureMinOrderByAggregateInput
    _sum?: PricingModuleFeatureSumOrderByAggregateInput
  }

  export type PricingModuleFeatureScalarWhereWithAggregatesInput = {
    AND?: PricingModuleFeatureScalarWhereWithAggregatesInput | PricingModuleFeatureScalarWhereWithAggregatesInput[]
    OR?: PricingModuleFeatureScalarWhereWithAggregatesInput[]
    NOT?: PricingModuleFeatureScalarWhereWithAggregatesInput | PricingModuleFeatureScalarWhereWithAggregatesInput[]
    moduleId?: IntWithAggregatesFilter<"PricingModuleFeature"> | number
    featureId?: StringWithAggregatesFilter<"PricingModuleFeature"> | string
    limit_quantity?: IntWithAggregatesFilter<"PricingModuleFeature"> | number
    cycle?: IntWithAggregatesFilter<"PricingModuleFeature"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PricingModuleFeature"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    userId?: BigIntFilter<"Subscription"> | bigint | number
    start_time?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    next_billing_time?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    external_subscription_id?: StringFilter<"Subscription"> | string
    status?: StringFilter<"Subscription"> | string
    amount?: FloatFilter<"Subscription"> | number
    moduleId?: IntFilter<"Subscription"> | number
    is_trial?: BoolNullableFilter<"Subscription"> | boolean | null
    is_test?: BoolNullableFilter<"Subscription"> | boolean | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    module?: XOR<PricingModuleNullableScalarRelationFilter, PricingModuleWhereInput> | null
    user?: XOR<SessionNullableScalarRelationFilter, SessionWhereInput> | null
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    start_time?: SortOrderInput | SortOrder
    next_billing_time?: SortOrderInput | SortOrder
    external_subscription_id?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    moduleId?: SortOrder
    is_trial?: SortOrderInput | SortOrder
    is_test?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    module?: PricingModuleOrderByWithRelationInput
    user?: SessionOrderByWithRelationInput
    _relevance?: SubscriptionOrderByRelevanceInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    userId?: BigIntFilter<"Subscription"> | bigint | number
    start_time?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    next_billing_time?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    external_subscription_id?: StringFilter<"Subscription"> | string
    status?: StringFilter<"Subscription"> | string
    amount?: FloatFilter<"Subscription"> | number
    moduleId?: IntFilter<"Subscription"> | number
    is_trial?: BoolNullableFilter<"Subscription"> | boolean | null
    is_test?: BoolNullableFilter<"Subscription"> | boolean | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    module?: XOR<PricingModuleNullableScalarRelationFilter, PricingModuleWhereInput> | null
    user?: XOR<SessionNullableScalarRelationFilter, SessionWhereInput> | null
  }, "id">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    start_time?: SortOrderInput | SortOrder
    next_billing_time?: SortOrderInput | SortOrder
    external_subscription_id?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    moduleId?: SortOrder
    is_trial?: SortOrderInput | SortOrder
    is_test?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _avg?: SubscriptionAvgOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
    _sum?: SubscriptionSumOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    userId?: BigIntWithAggregatesFilter<"Subscription"> | bigint | number
    start_time?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    next_billing_time?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    external_subscription_id?: StringWithAggregatesFilter<"Subscription"> | string
    status?: StringWithAggregatesFilter<"Subscription"> | string
    amount?: FloatWithAggregatesFilter<"Subscription"> | number
    moduleId?: IntWithAggregatesFilter<"Subscription"> | number
    is_trial?: BoolNullableWithAggregatesFilter<"Subscription"> | boolean | null
    is_test?: BoolNullableWithAggregatesFilter<"Subscription"> | boolean | null
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type SubscriptionQuotaWhereInput = {
    AND?: SubscriptionQuotaWhereInput | SubscriptionQuotaWhereInput[]
    OR?: SubscriptionQuotaWhereInput[]
    NOT?: SubscriptionQuotaWhereInput | SubscriptionQuotaWhereInput[]
    id?: BigIntFilter<"SubscriptionQuota"> | bigint | number
    userId?: BigIntFilter<"SubscriptionQuota"> | bigint | number
    feature_id?: StringFilter<"SubscriptionQuota"> | string
    limit_quantity?: IntFilter<"SubscriptionQuota"> | number
    used_quantity?: IntFilter<"SubscriptionQuota"> | number
    type?: EnumQuotaTypeFilter<"SubscriptionQuota"> | $Enums.QuotaType
    createdAt?: DateTimeFilter<"SubscriptionQuota"> | Date | string
    user?: XOR<SessionNullableScalarRelationFilter, SessionWhereInput> | null
    feature?: XOR<PricingFeatureNullableScalarRelationFilter, PricingFeatureWhereInput> | null
  }

  export type SubscriptionQuotaOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    feature_id?: SortOrder
    limit_quantity?: SortOrder
    used_quantity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    user?: SessionOrderByWithRelationInput
    feature?: PricingFeatureOrderByWithRelationInput
    _relevance?: SubscriptionQuotaOrderByRelevanceInput
  }

  export type SubscriptionQuotaWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: SubscriptionQuotaWhereInput | SubscriptionQuotaWhereInput[]
    OR?: SubscriptionQuotaWhereInput[]
    NOT?: SubscriptionQuotaWhereInput | SubscriptionQuotaWhereInput[]
    userId?: BigIntFilter<"SubscriptionQuota"> | bigint | number
    feature_id?: StringFilter<"SubscriptionQuota"> | string
    limit_quantity?: IntFilter<"SubscriptionQuota"> | number
    used_quantity?: IntFilter<"SubscriptionQuota"> | number
    type?: EnumQuotaTypeFilter<"SubscriptionQuota"> | $Enums.QuotaType
    createdAt?: DateTimeFilter<"SubscriptionQuota"> | Date | string
    user?: XOR<SessionNullableScalarRelationFilter, SessionWhereInput> | null
    feature?: XOR<PricingFeatureNullableScalarRelationFilter, PricingFeatureWhereInput> | null
  }, "id">

  export type SubscriptionQuotaOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    feature_id?: SortOrder
    limit_quantity?: SortOrder
    used_quantity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: SubscriptionQuotaCountOrderByAggregateInput
    _avg?: SubscriptionQuotaAvgOrderByAggregateInput
    _max?: SubscriptionQuotaMaxOrderByAggregateInput
    _min?: SubscriptionQuotaMinOrderByAggregateInput
    _sum?: SubscriptionQuotaSumOrderByAggregateInput
  }

  export type SubscriptionQuotaScalarWhereWithAggregatesInput = {
    AND?: SubscriptionQuotaScalarWhereWithAggregatesInput | SubscriptionQuotaScalarWhereWithAggregatesInput[]
    OR?: SubscriptionQuotaScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionQuotaScalarWhereWithAggregatesInput | SubscriptionQuotaScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"SubscriptionQuota"> | bigint | number
    userId?: BigIntWithAggregatesFilter<"SubscriptionQuota"> | bigint | number
    feature_id?: StringWithAggregatesFilter<"SubscriptionQuota"> | string
    limit_quantity?: IntWithAggregatesFilter<"SubscriptionQuota"> | number
    used_quantity?: IntWithAggregatesFilter<"SubscriptionQuota"> | number
    type?: EnumQuotaTypeWithAggregatesFilter<"SubscriptionQuota"> | $Enums.QuotaType
    createdAt?: DateTimeWithAggregatesFilter<"SubscriptionQuota"> | Date | string
  }

  export type UsageLogWhereInput = {
    AND?: UsageLogWhereInput | UsageLogWhereInput[]
    OR?: UsageLogWhereInput[]
    NOT?: UsageLogWhereInput | UsageLogWhereInput[]
    id?: BigIntFilter<"UsageLog"> | bigint | number
    userId?: BigIntFilter<"UsageLog"> | bigint | number
    feature_id?: StringFilter<"UsageLog"> | string
    used_quantity?: IntFilter<"UsageLog"> | number
    createdAt?: DateTimeFilter<"UsageLog"> | Date | string
    user?: XOR<SessionNullableScalarRelationFilter, SessionWhereInput> | null
    feature?: XOR<PricingFeatureNullableScalarRelationFilter, PricingFeatureWhereInput> | null
  }

  export type UsageLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    feature_id?: SortOrder
    used_quantity?: SortOrder
    createdAt?: SortOrder
    user?: SessionOrderByWithRelationInput
    feature?: PricingFeatureOrderByWithRelationInput
    _relevance?: UsageLogOrderByRelevanceInput
  }

  export type UsageLogWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: UsageLogWhereInput | UsageLogWhereInput[]
    OR?: UsageLogWhereInput[]
    NOT?: UsageLogWhereInput | UsageLogWhereInput[]
    userId?: BigIntFilter<"UsageLog"> | bigint | number
    feature_id?: StringFilter<"UsageLog"> | string
    used_quantity?: IntFilter<"UsageLog"> | number
    createdAt?: DateTimeFilter<"UsageLog"> | Date | string
    user?: XOR<SessionNullableScalarRelationFilter, SessionWhereInput> | null
    feature?: XOR<PricingFeatureNullableScalarRelationFilter, PricingFeatureWhereInput> | null
  }, "id">

  export type UsageLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    feature_id?: SortOrder
    used_quantity?: SortOrder
    createdAt?: SortOrder
    _count?: UsageLogCountOrderByAggregateInput
    _avg?: UsageLogAvgOrderByAggregateInput
    _max?: UsageLogMaxOrderByAggregateInput
    _min?: UsageLogMinOrderByAggregateInput
    _sum?: UsageLogSumOrderByAggregateInput
  }

  export type UsageLogScalarWhereWithAggregatesInput = {
    AND?: UsageLogScalarWhereWithAggregatesInput | UsageLogScalarWhereWithAggregatesInput[]
    OR?: UsageLogScalarWhereWithAggregatesInput[]
    NOT?: UsageLogScalarWhereWithAggregatesInput | UsageLogScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"UsageLog"> | bigint | number
    userId?: BigIntWithAggregatesFilter<"UsageLog"> | bigint | number
    feature_id?: StringWithAggregatesFilter<"UsageLog"> | string
    used_quantity?: IntWithAggregatesFilter<"UsageLog"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UsageLog"> | Date | string
  }

  export type PaymentLogWhereInput = {
    AND?: PaymentLogWhereInput | PaymentLogWhereInput[]
    OR?: PaymentLogWhereInput[]
    NOT?: PaymentLogWhereInput | PaymentLogWhereInput[]
    id?: BigIntFilter<"PaymentLog"> | bigint | number
    userId?: BigIntFilter<"PaymentLog"> | bigint | number
    action?: StringFilter<"PaymentLog"> | string
    status?: EnumPaymentLogStatusFilter<"PaymentLog"> | $Enums.PaymentLogStatus
    external_transaction_id?: StringNullableFilter<"PaymentLog"> | string | null
    details?: JsonNullableFilter<"PaymentLog">
    amount?: FloatFilter<"PaymentLog"> | number
    createdAt?: DateTimeFilter<"PaymentLog"> | Date | string
    user?: XOR<SessionNullableScalarRelationFilter, SessionWhereInput> | null
  }

  export type PaymentLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    external_transaction_id?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    user?: SessionOrderByWithRelationInput
    _relevance?: PaymentLogOrderByRelevanceInput
  }

  export type PaymentLogWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: PaymentLogWhereInput | PaymentLogWhereInput[]
    OR?: PaymentLogWhereInput[]
    NOT?: PaymentLogWhereInput | PaymentLogWhereInput[]
    userId?: BigIntFilter<"PaymentLog"> | bigint | number
    action?: StringFilter<"PaymentLog"> | string
    status?: EnumPaymentLogStatusFilter<"PaymentLog"> | $Enums.PaymentLogStatus
    external_transaction_id?: StringNullableFilter<"PaymentLog"> | string | null
    details?: JsonNullableFilter<"PaymentLog">
    amount?: FloatFilter<"PaymentLog"> | number
    createdAt?: DateTimeFilter<"PaymentLog"> | Date | string
    user?: XOR<SessionNullableScalarRelationFilter, SessionWhereInput> | null
  }, "id">

  export type PaymentLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    external_transaction_id?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    _count?: PaymentLogCountOrderByAggregateInput
    _avg?: PaymentLogAvgOrderByAggregateInput
    _max?: PaymentLogMaxOrderByAggregateInput
    _min?: PaymentLogMinOrderByAggregateInput
    _sum?: PaymentLogSumOrderByAggregateInput
  }

  export type PaymentLogScalarWhereWithAggregatesInput = {
    AND?: PaymentLogScalarWhereWithAggregatesInput | PaymentLogScalarWhereWithAggregatesInput[]
    OR?: PaymentLogScalarWhereWithAggregatesInput[]
    NOT?: PaymentLogScalarWhereWithAggregatesInput | PaymentLogScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"PaymentLog"> | bigint | number
    userId?: BigIntWithAggregatesFilter<"PaymentLog"> | bigint | number
    action?: StringWithAggregatesFilter<"PaymentLog"> | string
    status?: EnumPaymentLogStatusWithAggregatesFilter<"PaymentLog"> | $Enums.PaymentLogStatus
    external_transaction_id?: StringNullableWithAggregatesFilter<"PaymentLog"> | string | null
    details?: JsonNullableWithAggregatesFilter<"PaymentLog">
    amount?: FloatWithAggregatesFilter<"PaymentLog"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PaymentLog"> | Date | string
  }

  export type SourceProductWhereInput = {
    AND?: SourceProductWhereInput | SourceProductWhereInput[]
    OR?: SourceProductWhereInput[]
    NOT?: SourceProductWhereInput | SourceProductWhereInput[]
    id?: BigIntFilter<"SourceProduct"> | bigint | number
    title?: StringFilter<"SourceProduct"> | string
    description?: StringNullableFilter<"SourceProduct"> | string | null
    image?: StringNullableFilter<"SourceProduct"> | string | null
    video?: StringNullableFilter<"SourceProduct"> | string | null
    price?: FloatFilter<"SourceProduct"> | number
    source?: EnumSourceFilter<"SourceProduct"> | $Enums.Source
    sourceUrl?: StringFilter<"SourceProduct"> | string
    sourceId?: StringNullableFilter<"SourceProduct"> | string | null
    comparePrice?: FloatNullableFilter<"SourceProduct"> | number | null
    estProfit?: FloatNullableFilter<"SourceProduct"> | number | null
    rating?: FloatNullableFilter<"SourceProduct"> | number | null
    totalRating?: IntNullableFilter<"SourceProduct"> | number | null
    like?: IntNullableFilter<"SourceProduct"> | number | null
    share?: IntNullableFilter<"SourceProduct"> | number | null
    comment?: IntNullableFilter<"SourceProduct"> | number | null
    tiktokUrl?: StringNullableFilter<"SourceProduct"> | string | null
    status?: EnumSourceStatusFilter<"SourceProduct"> | $Enums.SourceStatus
    createdAt?: DateTimeFilter<"SourceProduct"> | Date | string
    updatedAt?: DateTimeFilter<"SourceProduct"> | Date | string
    PlatformProduct?: PlatformProductListRelationFilter
  }

  export type SourceProductOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    video?: SortOrderInput | SortOrder
    price?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    comparePrice?: SortOrderInput | SortOrder
    estProfit?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    totalRating?: SortOrderInput | SortOrder
    like?: SortOrderInput | SortOrder
    share?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    tiktokUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    PlatformProduct?: PlatformProductOrderByRelationAggregateInput
    _relevance?: SourceProductOrderByRelevanceInput
  }

  export type SourceProductWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: SourceProductWhereInput | SourceProductWhereInput[]
    OR?: SourceProductWhereInput[]
    NOT?: SourceProductWhereInput | SourceProductWhereInput[]
    title?: StringFilter<"SourceProduct"> | string
    description?: StringNullableFilter<"SourceProduct"> | string | null
    image?: StringNullableFilter<"SourceProduct"> | string | null
    video?: StringNullableFilter<"SourceProduct"> | string | null
    price?: FloatFilter<"SourceProduct"> | number
    source?: EnumSourceFilter<"SourceProduct"> | $Enums.Source
    sourceUrl?: StringFilter<"SourceProduct"> | string
    sourceId?: StringNullableFilter<"SourceProduct"> | string | null
    comparePrice?: FloatNullableFilter<"SourceProduct"> | number | null
    estProfit?: FloatNullableFilter<"SourceProduct"> | number | null
    rating?: FloatNullableFilter<"SourceProduct"> | number | null
    totalRating?: IntNullableFilter<"SourceProduct"> | number | null
    like?: IntNullableFilter<"SourceProduct"> | number | null
    share?: IntNullableFilter<"SourceProduct"> | number | null
    comment?: IntNullableFilter<"SourceProduct"> | number | null
    tiktokUrl?: StringNullableFilter<"SourceProduct"> | string | null
    status?: EnumSourceStatusFilter<"SourceProduct"> | $Enums.SourceStatus
    createdAt?: DateTimeFilter<"SourceProduct"> | Date | string
    updatedAt?: DateTimeFilter<"SourceProduct"> | Date | string
    PlatformProduct?: PlatformProductListRelationFilter
  }, "id">

  export type SourceProductOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    video?: SortOrderInput | SortOrder
    price?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    comparePrice?: SortOrderInput | SortOrder
    estProfit?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    totalRating?: SortOrderInput | SortOrder
    like?: SortOrderInput | SortOrder
    share?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    tiktokUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SourceProductCountOrderByAggregateInput
    _avg?: SourceProductAvgOrderByAggregateInput
    _max?: SourceProductMaxOrderByAggregateInput
    _min?: SourceProductMinOrderByAggregateInput
    _sum?: SourceProductSumOrderByAggregateInput
  }

  export type SourceProductScalarWhereWithAggregatesInput = {
    AND?: SourceProductScalarWhereWithAggregatesInput | SourceProductScalarWhereWithAggregatesInput[]
    OR?: SourceProductScalarWhereWithAggregatesInput[]
    NOT?: SourceProductScalarWhereWithAggregatesInput | SourceProductScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"SourceProduct"> | bigint | number
    title?: StringWithAggregatesFilter<"SourceProduct"> | string
    description?: StringNullableWithAggregatesFilter<"SourceProduct"> | string | null
    image?: StringNullableWithAggregatesFilter<"SourceProduct"> | string | null
    video?: StringNullableWithAggregatesFilter<"SourceProduct"> | string | null
    price?: FloatWithAggregatesFilter<"SourceProduct"> | number
    source?: EnumSourceWithAggregatesFilter<"SourceProduct"> | $Enums.Source
    sourceUrl?: StringWithAggregatesFilter<"SourceProduct"> | string
    sourceId?: StringNullableWithAggregatesFilter<"SourceProduct"> | string | null
    comparePrice?: FloatNullableWithAggregatesFilter<"SourceProduct"> | number | null
    estProfit?: FloatNullableWithAggregatesFilter<"SourceProduct"> | number | null
    rating?: FloatNullableWithAggregatesFilter<"SourceProduct"> | number | null
    totalRating?: IntNullableWithAggregatesFilter<"SourceProduct"> | number | null
    like?: IntNullableWithAggregatesFilter<"SourceProduct"> | number | null
    share?: IntNullableWithAggregatesFilter<"SourceProduct"> | number | null
    comment?: IntNullableWithAggregatesFilter<"SourceProduct"> | number | null
    tiktokUrl?: StringNullableWithAggregatesFilter<"SourceProduct"> | string | null
    status?: EnumSourceStatusWithAggregatesFilter<"SourceProduct"> | $Enums.SourceStatus
    createdAt?: DateTimeWithAggregatesFilter<"SourceProduct"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SourceProduct"> | Date | string
  }

  export type SourceCategoryWhereInput = {
    AND?: SourceCategoryWhereInput | SourceCategoryWhereInput[]
    OR?: SourceCategoryWhereInput[]
    NOT?: SourceCategoryWhereInput | SourceCategoryWhereInput[]
    id?: BigIntFilter<"SourceCategory"> | bigint | number
    name?: StringFilter<"SourceCategory"> | string
    source?: EnumSourceFilter<"SourceCategory"> | $Enums.Source
    sourceId?: StringNullableFilter<"SourceCategory"> | string | null
    createdAt?: DateTimeFilter<"SourceCategory"> | Date | string
  }

  export type SourceCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    source?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _relevance?: SourceCategoryOrderByRelevanceInput
  }

  export type SourceCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: SourceCategoryWhereInput | SourceCategoryWhereInput[]
    OR?: SourceCategoryWhereInput[]
    NOT?: SourceCategoryWhereInput | SourceCategoryWhereInput[]
    name?: StringFilter<"SourceCategory"> | string
    source?: EnumSourceFilter<"SourceCategory"> | $Enums.Source
    sourceId?: StringNullableFilter<"SourceCategory"> | string | null
    createdAt?: DateTimeFilter<"SourceCategory"> | Date | string
  }, "id">

  export type SourceCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    source?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SourceCategoryCountOrderByAggregateInput
    _avg?: SourceCategoryAvgOrderByAggregateInput
    _max?: SourceCategoryMaxOrderByAggregateInput
    _min?: SourceCategoryMinOrderByAggregateInput
    _sum?: SourceCategorySumOrderByAggregateInput
  }

  export type SourceCategoryScalarWhereWithAggregatesInput = {
    AND?: SourceCategoryScalarWhereWithAggregatesInput | SourceCategoryScalarWhereWithAggregatesInput[]
    OR?: SourceCategoryScalarWhereWithAggregatesInput[]
    NOT?: SourceCategoryScalarWhereWithAggregatesInput | SourceCategoryScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"SourceCategory"> | bigint | number
    name?: StringWithAggregatesFilter<"SourceCategory"> | string
    source?: EnumSourceWithAggregatesFilter<"SourceCategory"> | $Enums.Source
    sourceId?: StringNullableWithAggregatesFilter<"SourceCategory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SourceCategory"> | Date | string
  }

  export type PlatformProductWhereInput = {
    AND?: PlatformProductWhereInput | PlatformProductWhereInput[]
    OR?: PlatformProductWhereInput[]
    NOT?: PlatformProductWhereInput | PlatformProductWhereInput[]
    id?: BigIntFilter<"PlatformProduct"> | bigint | number
    platformId?: StringNullableFilter<"PlatformProduct"> | string | null
    sourceProductId?: BigIntFilter<"PlatformProduct"> | bigint | number
    userId?: BigIntFilter<"PlatformProduct"> | bigint | number
    metafields?: JsonNullableFilter<"PlatformProduct">
    title?: StringFilter<"PlatformProduct"> | string
    handle?: StringFilter<"PlatformProduct"> | string
    descriptionHtml?: StringNullableFilter<"PlatformProduct"> | string | null
    featuredMedia?: StringNullableFilter<"PlatformProduct"> | string | null
    createdAt?: DateTimeFilter<"PlatformProduct"> | Date | string
    user?: XOR<SessionNullableScalarRelationFilter, SessionWhereInput> | null
    sourceProduct?: XOR<SourceProductNullableScalarRelationFilter, SourceProductWhereInput> | null
  }

  export type PlatformProductOrderByWithRelationInput = {
    id?: SortOrder
    platformId?: SortOrderInput | SortOrder
    sourceProductId?: SortOrder
    userId?: SortOrder
    metafields?: SortOrderInput | SortOrder
    title?: SortOrder
    handle?: SortOrder
    descriptionHtml?: SortOrderInput | SortOrder
    featuredMedia?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: SessionOrderByWithRelationInput
    sourceProduct?: SourceProductOrderByWithRelationInput
    _relevance?: PlatformProductOrderByRelevanceInput
  }

  export type PlatformProductWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: PlatformProductWhereInput | PlatformProductWhereInput[]
    OR?: PlatformProductWhereInput[]
    NOT?: PlatformProductWhereInput | PlatformProductWhereInput[]
    platformId?: StringNullableFilter<"PlatformProduct"> | string | null
    sourceProductId?: BigIntFilter<"PlatformProduct"> | bigint | number
    userId?: BigIntFilter<"PlatformProduct"> | bigint | number
    metafields?: JsonNullableFilter<"PlatformProduct">
    title?: StringFilter<"PlatformProduct"> | string
    handle?: StringFilter<"PlatformProduct"> | string
    descriptionHtml?: StringNullableFilter<"PlatformProduct"> | string | null
    featuredMedia?: StringNullableFilter<"PlatformProduct"> | string | null
    createdAt?: DateTimeFilter<"PlatformProduct"> | Date | string
    user?: XOR<SessionNullableScalarRelationFilter, SessionWhereInput> | null
    sourceProduct?: XOR<SourceProductNullableScalarRelationFilter, SourceProductWhereInput> | null
  }, "id">

  export type PlatformProductOrderByWithAggregationInput = {
    id?: SortOrder
    platformId?: SortOrderInput | SortOrder
    sourceProductId?: SortOrder
    userId?: SortOrder
    metafields?: SortOrderInput | SortOrder
    title?: SortOrder
    handle?: SortOrder
    descriptionHtml?: SortOrderInput | SortOrder
    featuredMedia?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PlatformProductCountOrderByAggregateInput
    _avg?: PlatformProductAvgOrderByAggregateInput
    _max?: PlatformProductMaxOrderByAggregateInput
    _min?: PlatformProductMinOrderByAggregateInput
    _sum?: PlatformProductSumOrderByAggregateInput
  }

  export type PlatformProductScalarWhereWithAggregatesInput = {
    AND?: PlatformProductScalarWhereWithAggregatesInput | PlatformProductScalarWhereWithAggregatesInput[]
    OR?: PlatformProductScalarWhereWithAggregatesInput[]
    NOT?: PlatformProductScalarWhereWithAggregatesInput | PlatformProductScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"PlatformProduct"> | bigint | number
    platformId?: StringNullableWithAggregatesFilter<"PlatformProduct"> | string | null
    sourceProductId?: BigIntWithAggregatesFilter<"PlatformProduct"> | bigint | number
    userId?: BigIntWithAggregatesFilter<"PlatformProduct"> | bigint | number
    metafields?: JsonNullableWithAggregatesFilter<"PlatformProduct">
    title?: StringWithAggregatesFilter<"PlatformProduct"> | string
    handle?: StringWithAggregatesFilter<"PlatformProduct"> | string
    descriptionHtml?: StringNullableWithAggregatesFilter<"PlatformProduct"> | string | null
    featuredMedia?: StringNullableWithAggregatesFilter<"PlatformProduct"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PlatformProduct"> | Date | string
  }

  export type SessionCreateInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    Subscription?: SubscriptionCreateNestedManyWithoutUserInput
    SubscriptionQuota?: SubscriptionQuotaCreateNestedManyWithoutUserInput
    UsageLog?: UsageLogCreateNestedManyWithoutUserInput
    PaymentLog?: PaymentLogCreateNestedManyWithoutUserInput
    PlatformProduct?: PlatformProductCreateNestedManyWithoutUserInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    Subscription?: SubscriptionUncheckedCreateNestedManyWithoutUserInput
    SubscriptionQuota?: SubscriptionQuotaUncheckedCreateNestedManyWithoutUserInput
    UsageLog?: UsageLogUncheckedCreateNestedManyWithoutUserInput
    PaymentLog?: PaymentLogUncheckedCreateNestedManyWithoutUserInput
    PlatformProduct?: PlatformProductUncheckedCreateNestedManyWithoutUserInput
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Subscription?: SubscriptionUpdateManyWithoutUserNestedInput
    SubscriptionQuota?: SubscriptionQuotaUpdateManyWithoutUserNestedInput
    UsageLog?: UsageLogUpdateManyWithoutUserNestedInput
    PaymentLog?: PaymentLogUpdateManyWithoutUserNestedInput
    PlatformProduct?: PlatformProductUpdateManyWithoutUserNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Subscription?: SubscriptionUncheckedUpdateManyWithoutUserNestedInput
    SubscriptionQuota?: SubscriptionQuotaUncheckedUpdateManyWithoutUserNestedInput
    UsageLog?: UsageLogUncheckedUpdateManyWithoutUserNestedInput
    PaymentLog?: PaymentLogUncheckedUpdateManyWithoutUserNestedInput
    PlatformProduct?: PlatformProductUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SessionCreateManyInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type PricingModuleCreateInput = {
    name: string
    key: string
    price: number
    is_default?: boolean | null
    available?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    features?: PricingModuleFeatureCreateNestedManyWithoutModuleInput
    Subscription?: SubscriptionCreateNestedManyWithoutModuleInput
  }

  export type PricingModuleUncheckedCreateInput = {
    id?: number
    name: string
    key: string
    price: number
    is_default?: boolean | null
    available?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    features?: PricingModuleFeatureUncheckedCreateNestedManyWithoutModuleInput
    Subscription?: SubscriptionUncheckedCreateNestedManyWithoutModuleInput
  }

  export type PricingModuleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    is_default?: NullableBoolFieldUpdateOperationsInput | boolean | null
    available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    features?: PricingModuleFeatureUpdateManyWithoutModuleNestedInput
    Subscription?: SubscriptionUpdateManyWithoutModuleNestedInput
  }

  export type PricingModuleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    is_default?: NullableBoolFieldUpdateOperationsInput | boolean | null
    available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    features?: PricingModuleFeatureUncheckedUpdateManyWithoutModuleNestedInput
    Subscription?: SubscriptionUncheckedUpdateManyWithoutModuleNestedInput
  }

  export type PricingModuleCreateManyInput = {
    id?: number
    name: string
    key: string
    price: number
    is_default?: boolean | null
    available?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PricingModuleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    is_default?: NullableBoolFieldUpdateOperationsInput | boolean | null
    available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingModuleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    is_default?: NullableBoolFieldUpdateOperationsInput | boolean | null
    available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingFeatureCreateInput = {
    id?: string
    name: string
    description: string
    cycle: number
    is_active?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    modules?: PricingModuleFeatureCreateNestedManyWithoutFeatureInput
    SubscriptionQuota?: SubscriptionQuotaCreateNestedManyWithoutFeatureInput
    UsageLog?: UsageLogCreateNestedManyWithoutFeatureInput
  }

  export type PricingFeatureUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    cycle: number
    is_active?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    modules?: PricingModuleFeatureUncheckedCreateNestedManyWithoutFeatureInput
    SubscriptionQuota?: SubscriptionQuotaUncheckedCreateNestedManyWithoutFeatureInput
    UsageLog?: UsageLogUncheckedCreateNestedManyWithoutFeatureInput
  }

  export type PricingFeatureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cycle?: IntFieldUpdateOperationsInput | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modules?: PricingModuleFeatureUpdateManyWithoutFeatureNestedInput
    SubscriptionQuota?: SubscriptionQuotaUpdateManyWithoutFeatureNestedInput
    UsageLog?: UsageLogUpdateManyWithoutFeatureNestedInput
  }

  export type PricingFeatureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cycle?: IntFieldUpdateOperationsInput | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modules?: PricingModuleFeatureUncheckedUpdateManyWithoutFeatureNestedInput
    SubscriptionQuota?: SubscriptionQuotaUncheckedUpdateManyWithoutFeatureNestedInput
    UsageLog?: UsageLogUncheckedUpdateManyWithoutFeatureNestedInput
  }

  export type PricingFeatureCreateManyInput = {
    id?: string
    name: string
    description: string
    cycle: number
    is_active?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PricingFeatureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cycle?: IntFieldUpdateOperationsInput | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingFeatureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cycle?: IntFieldUpdateOperationsInput | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingModuleFeatureCreateInput = {
    limit_quantity: number
    cycle: number
    createdAt?: Date | string
    module?: PricingModuleCreateNestedOneWithoutFeaturesInput
    feature?: PricingFeatureCreateNestedOneWithoutModulesInput
  }

  export type PricingModuleFeatureUncheckedCreateInput = {
    moduleId: number
    featureId: string
    limit_quantity: number
    cycle: number
    createdAt?: Date | string
  }

  export type PricingModuleFeatureUpdateInput = {
    limit_quantity?: IntFieldUpdateOperationsInput | number
    cycle?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    module?: PricingModuleUpdateOneWithoutFeaturesNestedInput
    feature?: PricingFeatureUpdateOneWithoutModulesNestedInput
  }

  export type PricingModuleFeatureUncheckedUpdateInput = {
    moduleId?: IntFieldUpdateOperationsInput | number
    featureId?: StringFieldUpdateOperationsInput | string
    limit_quantity?: IntFieldUpdateOperationsInput | number
    cycle?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingModuleFeatureCreateManyInput = {
    moduleId: number
    featureId: string
    limit_quantity: number
    cycle: number
    createdAt?: Date | string
  }

  export type PricingModuleFeatureUpdateManyMutationInput = {
    limit_quantity?: IntFieldUpdateOperationsInput | number
    cycle?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingModuleFeatureUncheckedUpdateManyInput = {
    moduleId?: IntFieldUpdateOperationsInput | number
    featureId?: StringFieldUpdateOperationsInput | string
    limit_quantity?: IntFieldUpdateOperationsInput | number
    cycle?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    start_time?: Date | string | null
    next_billing_time?: Date | string | null
    external_subscription_id: string
    status: string
    amount: number
    is_trial?: boolean | null
    is_test?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    module?: PricingModuleCreateNestedOneWithoutSubscriptionInput
    user?: SessionCreateNestedOneWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    userId: bigint | number
    start_time?: Date | string | null
    next_billing_time?: Date | string | null
    external_subscription_id: string
    status: string
    amount: number
    moduleId: number
    is_trial?: boolean | null
    is_test?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    external_subscription_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    is_trial?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_test?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    module?: PricingModuleUpdateOneWithoutSubscriptionNestedInput
    user?: SessionUpdateOneWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    external_subscription_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    is_trial?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_test?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    userId: bigint | number
    start_time?: Date | string | null
    next_billing_time?: Date | string | null
    external_subscription_id: string
    status: string
    amount: number
    moduleId: number
    is_trial?: boolean | null
    is_test?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    external_subscription_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    is_trial?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_test?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    external_subscription_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    is_trial?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_test?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionQuotaCreateInput = {
    id?: bigint | number
    limit_quantity: number
    used_quantity: number
    type: $Enums.QuotaType
    createdAt?: Date | string
    user?: SessionCreateNestedOneWithoutSubscriptionQuotaInput
    feature?: PricingFeatureCreateNestedOneWithoutSubscriptionQuotaInput
  }

  export type SubscriptionQuotaUncheckedCreateInput = {
    id?: bigint | number
    userId: bigint | number
    feature_id: string
    limit_quantity: number
    used_quantity: number
    type: $Enums.QuotaType
    createdAt?: Date | string
  }

  export type SubscriptionQuotaUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    limit_quantity?: IntFieldUpdateOperationsInput | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumQuotaTypeFieldUpdateOperationsInput | $Enums.QuotaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: SessionUpdateOneWithoutSubscriptionQuotaNestedInput
    feature?: PricingFeatureUpdateOneWithoutSubscriptionQuotaNestedInput
  }

  export type SubscriptionQuotaUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_id?: StringFieldUpdateOperationsInput | string
    limit_quantity?: IntFieldUpdateOperationsInput | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumQuotaTypeFieldUpdateOperationsInput | $Enums.QuotaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionQuotaCreateManyInput = {
    id?: bigint | number
    userId: bigint | number
    feature_id: string
    limit_quantity: number
    used_quantity: number
    type: $Enums.QuotaType
    createdAt?: Date | string
  }

  export type SubscriptionQuotaUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    limit_quantity?: IntFieldUpdateOperationsInput | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumQuotaTypeFieldUpdateOperationsInput | $Enums.QuotaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionQuotaUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_id?: StringFieldUpdateOperationsInput | string
    limit_quantity?: IntFieldUpdateOperationsInput | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumQuotaTypeFieldUpdateOperationsInput | $Enums.QuotaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogCreateInput = {
    id?: bigint | number
    used_quantity: number
    createdAt?: Date | string
    user?: SessionCreateNestedOneWithoutUsageLogInput
    feature?: PricingFeatureCreateNestedOneWithoutUsageLogInput
  }

  export type UsageLogUncheckedCreateInput = {
    id?: bigint | number
    userId: bigint | number
    feature_id: string
    used_quantity: number
    createdAt?: Date | string
  }

  export type UsageLogUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: SessionUpdateOneWithoutUsageLogNestedInput
    feature?: PricingFeatureUpdateOneWithoutUsageLogNestedInput
  }

  export type UsageLogUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_id?: StringFieldUpdateOperationsInput | string
    used_quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogCreateManyInput = {
    id?: bigint | number
    userId: bigint | number
    feature_id: string
    used_quantity: number
    createdAt?: Date | string
  }

  export type UsageLogUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_id?: StringFieldUpdateOperationsInput | string
    used_quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentLogCreateInput = {
    id?: bigint | number
    action: string
    status?: $Enums.PaymentLogStatus
    external_transaction_id?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    createdAt?: Date | string
    user?: SessionCreateNestedOneWithoutPaymentLogInput
  }

  export type PaymentLogUncheckedCreateInput = {
    id?: bigint | number
    userId: bigint | number
    action: string
    status?: $Enums.PaymentLogStatus
    external_transaction_id?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    createdAt?: Date | string
  }

  export type PaymentLogUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLogStatusFieldUpdateOperationsInput | $Enums.PaymentLogStatus
    external_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: SessionUpdateOneWithoutPaymentLogNestedInput
  }

  export type PaymentLogUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLogStatusFieldUpdateOperationsInput | $Enums.PaymentLogStatus
    external_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentLogCreateManyInput = {
    id?: bigint | number
    userId: bigint | number
    action: string
    status?: $Enums.PaymentLogStatus
    external_transaction_id?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    createdAt?: Date | string
  }

  export type PaymentLogUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLogStatusFieldUpdateOperationsInput | $Enums.PaymentLogStatus
    external_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentLogUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLogStatusFieldUpdateOperationsInput | $Enums.PaymentLogStatus
    external_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceProductCreateInput = {
    id?: bigint | number
    title: string
    description?: string | null
    image?: string | null
    video?: string | null
    price: number
    source: $Enums.Source
    sourceUrl: string
    sourceId?: string | null
    comparePrice?: number | null
    estProfit?: number | null
    rating?: number | null
    totalRating?: number | null
    like?: number | null
    share?: number | null
    comment?: number | null
    tiktokUrl?: string | null
    status?: $Enums.SourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    PlatformProduct?: PlatformProductCreateNestedManyWithoutSourceProductInput
  }

  export type SourceProductUncheckedCreateInput = {
    id?: bigint | number
    title: string
    description?: string | null
    image?: string | null
    video?: string | null
    price: number
    source: $Enums.Source
    sourceUrl: string
    sourceId?: string | null
    comparePrice?: number | null
    estProfit?: number | null
    rating?: number | null
    totalRating?: number | null
    like?: number | null
    share?: number | null
    comment?: number | null
    tiktokUrl?: string | null
    status?: $Enums.SourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    PlatformProduct?: PlatformProductUncheckedCreateNestedManyWithoutSourceProductInput
  }

  export type SourceProductUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    sourceUrl?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    comparePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    estProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    totalRating?: NullableIntFieldUpdateOperationsInput | number | null
    like?: NullableIntFieldUpdateOperationsInput | number | null
    share?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSourceStatusFieldUpdateOperationsInput | $Enums.SourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    PlatformProduct?: PlatformProductUpdateManyWithoutSourceProductNestedInput
  }

  export type SourceProductUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    sourceUrl?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    comparePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    estProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    totalRating?: NullableIntFieldUpdateOperationsInput | number | null
    like?: NullableIntFieldUpdateOperationsInput | number | null
    share?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSourceStatusFieldUpdateOperationsInput | $Enums.SourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    PlatformProduct?: PlatformProductUncheckedUpdateManyWithoutSourceProductNestedInput
  }

  export type SourceProductCreateManyInput = {
    id?: bigint | number
    title: string
    description?: string | null
    image?: string | null
    video?: string | null
    price: number
    source: $Enums.Source
    sourceUrl: string
    sourceId?: string | null
    comparePrice?: number | null
    estProfit?: number | null
    rating?: number | null
    totalRating?: number | null
    like?: number | null
    share?: number | null
    comment?: number | null
    tiktokUrl?: string | null
    status?: $Enums.SourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SourceProductUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    sourceUrl?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    comparePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    estProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    totalRating?: NullableIntFieldUpdateOperationsInput | number | null
    like?: NullableIntFieldUpdateOperationsInput | number | null
    share?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSourceStatusFieldUpdateOperationsInput | $Enums.SourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceProductUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    sourceUrl?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    comparePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    estProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    totalRating?: NullableIntFieldUpdateOperationsInput | number | null
    like?: NullableIntFieldUpdateOperationsInput | number | null
    share?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSourceStatusFieldUpdateOperationsInput | $Enums.SourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceCategoryCreateInput = {
    id?: bigint | number
    name: string
    source: $Enums.Source
    sourceId?: string | null
    createdAt?: Date | string
  }

  export type SourceCategoryUncheckedCreateInput = {
    id?: bigint | number
    name: string
    source: $Enums.Source
    sourceId?: string | null
    createdAt?: Date | string
  }

  export type SourceCategoryUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceCategoryUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceCategoryCreateManyInput = {
    id?: bigint | number
    name: string
    source: $Enums.Source
    sourceId?: string | null
    createdAt?: Date | string
  }

  export type SourceCategoryUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceCategoryUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformProductCreateInput = {
    id?: bigint | number
    platformId?: string | null
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title: string
    handle: string
    descriptionHtml?: string | null
    featuredMedia?: string | null
    createdAt?: Date | string
    user?: SessionCreateNestedOneWithoutPlatformProductInput
    sourceProduct?: SourceProductCreateNestedOneWithoutPlatformProductInput
  }

  export type PlatformProductUncheckedCreateInput = {
    id?: bigint | number
    platformId?: string | null
    sourceProductId: bigint | number
    userId: bigint | number
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title: string
    handle: string
    descriptionHtml?: string | null
    featuredMedia?: string | null
    createdAt?: Date | string
  }

  export type PlatformProductUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    platformId?: NullableStringFieldUpdateOperationsInput | string | null
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    featuredMedia?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: SessionUpdateOneWithoutPlatformProductNestedInput
    sourceProduct?: SourceProductUpdateOneWithoutPlatformProductNestedInput
  }

  export type PlatformProductUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    platformId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceProductId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    featuredMedia?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformProductCreateManyInput = {
    id?: bigint | number
    platformId?: string | null
    sourceProductId: bigint | number
    userId: bigint | number
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title: string
    handle: string
    descriptionHtml?: string | null
    featuredMedia?: string | null
    createdAt?: Date | string
  }

  export type PlatformProductUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    platformId?: NullableStringFieldUpdateOperationsInput | string | null
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    featuredMedia?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformProductUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    platformId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceProductId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    featuredMedia?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type SubscriptionQuotaListRelationFilter = {
    every?: SubscriptionQuotaWhereInput
    some?: SubscriptionQuotaWhereInput
    none?: SubscriptionQuotaWhereInput
  }

  export type UsageLogListRelationFilter = {
    every?: UsageLogWhereInput
    some?: UsageLogWhereInput
    none?: UsageLogWhereInput
  }

  export type PaymentLogListRelationFilter = {
    every?: PaymentLogWhereInput
    some?: PaymentLogWhereInput
    none?: PaymentLogWhereInput
  }

  export type PlatformProductListRelationFilter = {
    every?: PlatformProductWhereInput
    some?: PlatformProductWhereInput
    none?: PlatformProductWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionQuotaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsageLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlatformProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelevanceInput = {
    fields: SessionOrderByRelevanceFieldEnum | SessionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    shop?: SortOrder
    state?: SortOrder
    isOnline?: SortOrder
    scope?: SortOrder
    expires?: SortOrder
    accessToken?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    accountOwner?: SortOrder
    locale?: SortOrder
    collaborator?: SortOrder
    emailVerified?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PricingModuleFeatureListRelationFilter = {
    every?: PricingModuleFeatureWhereInput
    some?: PricingModuleFeatureWhereInput
    none?: PricingModuleFeatureWhereInput
  }

  export type PricingModuleFeatureOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PricingModuleOrderByRelevanceInput = {
    fields: PricingModuleOrderByRelevanceFieldEnum | PricingModuleOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PricingModuleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    price?: SortOrder
    is_default?: SortOrder
    available?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PricingModuleAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type PricingModuleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    price?: SortOrder
    is_default?: SortOrder
    available?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PricingModuleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    price?: SortOrder
    is_default?: SortOrder
    available?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PricingModuleSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PricingFeatureOrderByRelevanceInput = {
    fields: PricingFeatureOrderByRelevanceFieldEnum | PricingFeatureOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PricingFeatureCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    cycle?: SortOrder
    is_active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PricingFeatureAvgOrderByAggregateInput = {
    cycle?: SortOrder
  }

  export type PricingFeatureMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    cycle?: SortOrder
    is_active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PricingFeatureMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    cycle?: SortOrder
    is_active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PricingFeatureSumOrderByAggregateInput = {
    cycle?: SortOrder
  }

  export type PricingModuleNullableScalarRelationFilter = {
    is?: PricingModuleWhereInput | null
    isNot?: PricingModuleWhereInput | null
  }

  export type PricingFeatureNullableScalarRelationFilter = {
    is?: PricingFeatureWhereInput | null
    isNot?: PricingFeatureWhereInput | null
  }

  export type PricingModuleFeatureOrderByRelevanceInput = {
    fields: PricingModuleFeatureOrderByRelevanceFieldEnum | PricingModuleFeatureOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PricingModuleFeatureModuleIdFeatureIdCompoundUniqueInput = {
    moduleId: number
    featureId: string
  }

  export type PricingModuleFeatureCountOrderByAggregateInput = {
    moduleId?: SortOrder
    featureId?: SortOrder
    limit_quantity?: SortOrder
    cycle?: SortOrder
    createdAt?: SortOrder
  }

  export type PricingModuleFeatureAvgOrderByAggregateInput = {
    moduleId?: SortOrder
    limit_quantity?: SortOrder
    cycle?: SortOrder
  }

  export type PricingModuleFeatureMaxOrderByAggregateInput = {
    moduleId?: SortOrder
    featureId?: SortOrder
    limit_quantity?: SortOrder
    cycle?: SortOrder
    createdAt?: SortOrder
  }

  export type PricingModuleFeatureMinOrderByAggregateInput = {
    moduleId?: SortOrder
    featureId?: SortOrder
    limit_quantity?: SortOrder
    cycle?: SortOrder
    createdAt?: SortOrder
  }

  export type PricingModuleFeatureSumOrderByAggregateInput = {
    moduleId?: SortOrder
    limit_quantity?: SortOrder
    cycle?: SortOrder
  }

  export type SessionNullableScalarRelationFilter = {
    is?: SessionWhereInput | null
    isNot?: SessionWhereInput | null
  }

  export type SubscriptionOrderByRelevanceInput = {
    fields: SubscriptionOrderByRelevanceFieldEnum | SubscriptionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    start_time?: SortOrder
    next_billing_time?: SortOrder
    external_subscription_id?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    moduleId?: SortOrder
    is_trial?: SortOrder
    is_test?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionAvgOrderByAggregateInput = {
    userId?: SortOrder
    amount?: SortOrder
    moduleId?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    start_time?: SortOrder
    next_billing_time?: SortOrder
    external_subscription_id?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    moduleId?: SortOrder
    is_trial?: SortOrder
    is_test?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    start_time?: SortOrder
    next_billing_time?: SortOrder
    external_subscription_id?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    moduleId?: SortOrder
    is_trial?: SortOrder
    is_test?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionSumOrderByAggregateInput = {
    userId?: SortOrder
    amount?: SortOrder
    moduleId?: SortOrder
  }

  export type EnumQuotaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuotaType | EnumQuotaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuotaType[]
    notIn?: $Enums.QuotaType[]
    not?: NestedEnumQuotaTypeFilter<$PrismaModel> | $Enums.QuotaType
  }

  export type SubscriptionQuotaOrderByRelevanceInput = {
    fields: SubscriptionQuotaOrderByRelevanceFieldEnum | SubscriptionQuotaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SubscriptionQuotaCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    feature_id?: SortOrder
    limit_quantity?: SortOrder
    used_quantity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type SubscriptionQuotaAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    limit_quantity?: SortOrder
    used_quantity?: SortOrder
  }

  export type SubscriptionQuotaMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    feature_id?: SortOrder
    limit_quantity?: SortOrder
    used_quantity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type SubscriptionQuotaMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    feature_id?: SortOrder
    limit_quantity?: SortOrder
    used_quantity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type SubscriptionQuotaSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    limit_quantity?: SortOrder
    used_quantity?: SortOrder
  }

  export type EnumQuotaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuotaType | EnumQuotaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuotaType[]
    notIn?: $Enums.QuotaType[]
    not?: NestedEnumQuotaTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuotaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuotaTypeFilter<$PrismaModel>
    _max?: NestedEnumQuotaTypeFilter<$PrismaModel>
  }

  export type UsageLogOrderByRelevanceInput = {
    fields: UsageLogOrderByRelevanceFieldEnum | UsageLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UsageLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    feature_id?: SortOrder
    used_quantity?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    used_quantity?: SortOrder
  }

  export type UsageLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    feature_id?: SortOrder
    used_quantity?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    feature_id?: SortOrder
    used_quantity?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    used_quantity?: SortOrder
  }

  export type EnumPaymentLogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentLogStatus | EnumPaymentLogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentLogStatus[]
    notIn?: $Enums.PaymentLogStatus[]
    not?: NestedEnumPaymentLogStatusFilter<$PrismaModel> | $Enums.PaymentLogStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PaymentLogOrderByRelevanceInput = {
    fields: PaymentLogOrderByRelevanceFieldEnum | PaymentLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PaymentLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    external_transaction_id?: SortOrder
    details?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
  }

  export type PaymentLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    external_transaction_id?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    external_transaction_id?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
  }

  export type EnumPaymentLogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentLogStatus | EnumPaymentLogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentLogStatus[]
    notIn?: $Enums.PaymentLogStatus[]
    not?: NestedEnumPaymentLogStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentLogStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentLogStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentLogStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.Source | EnumSourceFieldRefInput<$PrismaModel>
    in?: $Enums.Source[]
    notIn?: $Enums.Source[]
    not?: NestedEnumSourceFilter<$PrismaModel> | $Enums.Source
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumSourceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceStatus | EnumSourceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SourceStatus[]
    notIn?: $Enums.SourceStatus[]
    not?: NestedEnumSourceStatusFilter<$PrismaModel> | $Enums.SourceStatus
  }

  export type SourceProductOrderByRelevanceInput = {
    fields: SourceProductOrderByRelevanceFieldEnum | SourceProductOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SourceProductCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    video?: SortOrder
    price?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    sourceId?: SortOrder
    comparePrice?: SortOrder
    estProfit?: SortOrder
    rating?: SortOrder
    totalRating?: SortOrder
    like?: SortOrder
    share?: SortOrder
    comment?: SortOrder
    tiktokUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SourceProductAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    comparePrice?: SortOrder
    estProfit?: SortOrder
    rating?: SortOrder
    totalRating?: SortOrder
    like?: SortOrder
    share?: SortOrder
    comment?: SortOrder
  }

  export type SourceProductMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    video?: SortOrder
    price?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    sourceId?: SortOrder
    comparePrice?: SortOrder
    estProfit?: SortOrder
    rating?: SortOrder
    totalRating?: SortOrder
    like?: SortOrder
    share?: SortOrder
    comment?: SortOrder
    tiktokUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SourceProductMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    video?: SortOrder
    price?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    sourceId?: SortOrder
    comparePrice?: SortOrder
    estProfit?: SortOrder
    rating?: SortOrder
    totalRating?: SortOrder
    like?: SortOrder
    share?: SortOrder
    comment?: SortOrder
    tiktokUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SourceProductSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    comparePrice?: SortOrder
    estProfit?: SortOrder
    rating?: SortOrder
    totalRating?: SortOrder
    like?: SortOrder
    share?: SortOrder
    comment?: SortOrder
  }

  export type EnumSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Source | EnumSourceFieldRefInput<$PrismaModel>
    in?: $Enums.Source[]
    notIn?: $Enums.Source[]
    not?: NestedEnumSourceWithAggregatesFilter<$PrismaModel> | $Enums.Source
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceFilter<$PrismaModel>
    _max?: NestedEnumSourceFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumSourceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceStatus | EnumSourceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SourceStatus[]
    notIn?: $Enums.SourceStatus[]
    not?: NestedEnumSourceStatusWithAggregatesFilter<$PrismaModel> | $Enums.SourceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceStatusFilter<$PrismaModel>
    _max?: NestedEnumSourceStatusFilter<$PrismaModel>
  }

  export type SourceCategoryOrderByRelevanceInput = {
    fields: SourceCategoryOrderByRelevanceFieldEnum | SourceCategoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SourceCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    source?: SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
  }

  export type SourceCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SourceCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    source?: SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
  }

  export type SourceCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    source?: SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
  }

  export type SourceCategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SourceProductNullableScalarRelationFilter = {
    is?: SourceProductWhereInput | null
    isNot?: SourceProductWhereInput | null
  }

  export type PlatformProductOrderByRelevanceInput = {
    fields: PlatformProductOrderByRelevanceFieldEnum | PlatformProductOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PlatformProductCountOrderByAggregateInput = {
    id?: SortOrder
    platformId?: SortOrder
    sourceProductId?: SortOrder
    userId?: SortOrder
    metafields?: SortOrder
    title?: SortOrder
    handle?: SortOrder
    descriptionHtml?: SortOrder
    featuredMedia?: SortOrder
    createdAt?: SortOrder
  }

  export type PlatformProductAvgOrderByAggregateInput = {
    id?: SortOrder
    sourceProductId?: SortOrder
    userId?: SortOrder
  }

  export type PlatformProductMaxOrderByAggregateInput = {
    id?: SortOrder
    platformId?: SortOrder
    sourceProductId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    handle?: SortOrder
    descriptionHtml?: SortOrder
    featuredMedia?: SortOrder
    createdAt?: SortOrder
  }

  export type PlatformProductMinOrderByAggregateInput = {
    id?: SortOrder
    platformId?: SortOrder
    sourceProductId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    handle?: SortOrder
    descriptionHtml?: SortOrder
    featuredMedia?: SortOrder
    createdAt?: SortOrder
  }

  export type PlatformProductSumOrderByAggregateInput = {
    id?: SortOrder
    sourceProductId?: SortOrder
    userId?: SortOrder
  }

  export type SubscriptionCreateNestedManyWithoutUserInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput> | SubscriptionCreateWithoutUserInput[] | SubscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput | SubscriptionCreateOrConnectWithoutUserInput[]
    createMany?: SubscriptionCreateManyUserInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type SubscriptionQuotaCreateNestedManyWithoutUserInput = {
    create?: XOR<SubscriptionQuotaCreateWithoutUserInput, SubscriptionQuotaUncheckedCreateWithoutUserInput> | SubscriptionQuotaCreateWithoutUserInput[] | SubscriptionQuotaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscriptionQuotaCreateOrConnectWithoutUserInput | SubscriptionQuotaCreateOrConnectWithoutUserInput[]
    createMany?: SubscriptionQuotaCreateManyUserInputEnvelope
    connect?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
  }

  export type UsageLogCreateNestedManyWithoutUserInput = {
    create?: XOR<UsageLogCreateWithoutUserInput, UsageLogUncheckedCreateWithoutUserInput> | UsageLogCreateWithoutUserInput[] | UsageLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutUserInput | UsageLogCreateOrConnectWithoutUserInput[]
    createMany?: UsageLogCreateManyUserInputEnvelope
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
  }

  export type PaymentLogCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentLogCreateWithoutUserInput, PaymentLogUncheckedCreateWithoutUserInput> | PaymentLogCreateWithoutUserInput[] | PaymentLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentLogCreateOrConnectWithoutUserInput | PaymentLogCreateOrConnectWithoutUserInput[]
    createMany?: PaymentLogCreateManyUserInputEnvelope
    connect?: PaymentLogWhereUniqueInput | PaymentLogWhereUniqueInput[]
  }

  export type PlatformProductCreateNestedManyWithoutUserInput = {
    create?: XOR<PlatformProductCreateWithoutUserInput, PlatformProductUncheckedCreateWithoutUserInput> | PlatformProductCreateWithoutUserInput[] | PlatformProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlatformProductCreateOrConnectWithoutUserInput | PlatformProductCreateOrConnectWithoutUserInput[]
    createMany?: PlatformProductCreateManyUserInputEnvelope
    connect?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput> | SubscriptionCreateWithoutUserInput[] | SubscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput | SubscriptionCreateOrConnectWithoutUserInput[]
    createMany?: SubscriptionCreateManyUserInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type SubscriptionQuotaUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SubscriptionQuotaCreateWithoutUserInput, SubscriptionQuotaUncheckedCreateWithoutUserInput> | SubscriptionQuotaCreateWithoutUserInput[] | SubscriptionQuotaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscriptionQuotaCreateOrConnectWithoutUserInput | SubscriptionQuotaCreateOrConnectWithoutUserInput[]
    createMany?: SubscriptionQuotaCreateManyUserInputEnvelope
    connect?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
  }

  export type UsageLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UsageLogCreateWithoutUserInput, UsageLogUncheckedCreateWithoutUserInput> | UsageLogCreateWithoutUserInput[] | UsageLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutUserInput | UsageLogCreateOrConnectWithoutUserInput[]
    createMany?: UsageLogCreateManyUserInputEnvelope
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
  }

  export type PaymentLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentLogCreateWithoutUserInput, PaymentLogUncheckedCreateWithoutUserInput> | PaymentLogCreateWithoutUserInput[] | PaymentLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentLogCreateOrConnectWithoutUserInput | PaymentLogCreateOrConnectWithoutUserInput[]
    createMany?: PaymentLogCreateManyUserInputEnvelope
    connect?: PaymentLogWhereUniqueInput | PaymentLogWhereUniqueInput[]
  }

  export type PlatformProductUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PlatformProductCreateWithoutUserInput, PlatformProductUncheckedCreateWithoutUserInput> | PlatformProductCreateWithoutUserInput[] | PlatformProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlatformProductCreateOrConnectWithoutUserInput | PlatformProductCreateOrConnectWithoutUserInput[]
    createMany?: PlatformProductCreateManyUserInputEnvelope
    connect?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type SubscriptionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput> | SubscriptionCreateWithoutUserInput[] | SubscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput | SubscriptionCreateOrConnectWithoutUserInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutUserInput | SubscriptionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubscriptionCreateManyUserInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutUserInput | SubscriptionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutUserInput | SubscriptionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type SubscriptionQuotaUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubscriptionQuotaCreateWithoutUserInput, SubscriptionQuotaUncheckedCreateWithoutUserInput> | SubscriptionQuotaCreateWithoutUserInput[] | SubscriptionQuotaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscriptionQuotaCreateOrConnectWithoutUserInput | SubscriptionQuotaCreateOrConnectWithoutUserInput[]
    upsert?: SubscriptionQuotaUpsertWithWhereUniqueWithoutUserInput | SubscriptionQuotaUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubscriptionQuotaCreateManyUserInputEnvelope
    set?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    disconnect?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    delete?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    connect?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    update?: SubscriptionQuotaUpdateWithWhereUniqueWithoutUserInput | SubscriptionQuotaUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubscriptionQuotaUpdateManyWithWhereWithoutUserInput | SubscriptionQuotaUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubscriptionQuotaScalarWhereInput | SubscriptionQuotaScalarWhereInput[]
  }

  export type UsageLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsageLogCreateWithoutUserInput, UsageLogUncheckedCreateWithoutUserInput> | UsageLogCreateWithoutUserInput[] | UsageLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutUserInput | UsageLogCreateOrConnectWithoutUserInput[]
    upsert?: UsageLogUpsertWithWhereUniqueWithoutUserInput | UsageLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsageLogCreateManyUserInputEnvelope
    set?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    disconnect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    delete?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    update?: UsageLogUpdateWithWhereUniqueWithoutUserInput | UsageLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsageLogUpdateManyWithWhereWithoutUserInput | UsageLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
  }

  export type PaymentLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentLogCreateWithoutUserInput, PaymentLogUncheckedCreateWithoutUserInput> | PaymentLogCreateWithoutUserInput[] | PaymentLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentLogCreateOrConnectWithoutUserInput | PaymentLogCreateOrConnectWithoutUserInput[]
    upsert?: PaymentLogUpsertWithWhereUniqueWithoutUserInput | PaymentLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentLogCreateManyUserInputEnvelope
    set?: PaymentLogWhereUniqueInput | PaymentLogWhereUniqueInput[]
    disconnect?: PaymentLogWhereUniqueInput | PaymentLogWhereUniqueInput[]
    delete?: PaymentLogWhereUniqueInput | PaymentLogWhereUniqueInput[]
    connect?: PaymentLogWhereUniqueInput | PaymentLogWhereUniqueInput[]
    update?: PaymentLogUpdateWithWhereUniqueWithoutUserInput | PaymentLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentLogUpdateManyWithWhereWithoutUserInput | PaymentLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentLogScalarWhereInput | PaymentLogScalarWhereInput[]
  }

  export type PlatformProductUpdateManyWithoutUserNestedInput = {
    create?: XOR<PlatformProductCreateWithoutUserInput, PlatformProductUncheckedCreateWithoutUserInput> | PlatformProductCreateWithoutUserInput[] | PlatformProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlatformProductCreateOrConnectWithoutUserInput | PlatformProductCreateOrConnectWithoutUserInput[]
    upsert?: PlatformProductUpsertWithWhereUniqueWithoutUserInput | PlatformProductUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PlatformProductCreateManyUserInputEnvelope
    set?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    disconnect?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    delete?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    connect?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    update?: PlatformProductUpdateWithWhereUniqueWithoutUserInput | PlatformProductUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PlatformProductUpdateManyWithWhereWithoutUserInput | PlatformProductUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PlatformProductScalarWhereInput | PlatformProductScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput> | SubscriptionCreateWithoutUserInput[] | SubscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput | SubscriptionCreateOrConnectWithoutUserInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutUserInput | SubscriptionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubscriptionCreateManyUserInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutUserInput | SubscriptionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutUserInput | SubscriptionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type SubscriptionQuotaUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubscriptionQuotaCreateWithoutUserInput, SubscriptionQuotaUncheckedCreateWithoutUserInput> | SubscriptionQuotaCreateWithoutUserInput[] | SubscriptionQuotaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscriptionQuotaCreateOrConnectWithoutUserInput | SubscriptionQuotaCreateOrConnectWithoutUserInput[]
    upsert?: SubscriptionQuotaUpsertWithWhereUniqueWithoutUserInput | SubscriptionQuotaUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubscriptionQuotaCreateManyUserInputEnvelope
    set?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    disconnect?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    delete?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    connect?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    update?: SubscriptionQuotaUpdateWithWhereUniqueWithoutUserInput | SubscriptionQuotaUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubscriptionQuotaUpdateManyWithWhereWithoutUserInput | SubscriptionQuotaUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubscriptionQuotaScalarWhereInput | SubscriptionQuotaScalarWhereInput[]
  }

  export type UsageLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsageLogCreateWithoutUserInput, UsageLogUncheckedCreateWithoutUserInput> | UsageLogCreateWithoutUserInput[] | UsageLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutUserInput | UsageLogCreateOrConnectWithoutUserInput[]
    upsert?: UsageLogUpsertWithWhereUniqueWithoutUserInput | UsageLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsageLogCreateManyUserInputEnvelope
    set?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    disconnect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    delete?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    update?: UsageLogUpdateWithWhereUniqueWithoutUserInput | UsageLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsageLogUpdateManyWithWhereWithoutUserInput | UsageLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
  }

  export type PaymentLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentLogCreateWithoutUserInput, PaymentLogUncheckedCreateWithoutUserInput> | PaymentLogCreateWithoutUserInput[] | PaymentLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentLogCreateOrConnectWithoutUserInput | PaymentLogCreateOrConnectWithoutUserInput[]
    upsert?: PaymentLogUpsertWithWhereUniqueWithoutUserInput | PaymentLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentLogCreateManyUserInputEnvelope
    set?: PaymentLogWhereUniqueInput | PaymentLogWhereUniqueInput[]
    disconnect?: PaymentLogWhereUniqueInput | PaymentLogWhereUniqueInput[]
    delete?: PaymentLogWhereUniqueInput | PaymentLogWhereUniqueInput[]
    connect?: PaymentLogWhereUniqueInput | PaymentLogWhereUniqueInput[]
    update?: PaymentLogUpdateWithWhereUniqueWithoutUserInput | PaymentLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentLogUpdateManyWithWhereWithoutUserInput | PaymentLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentLogScalarWhereInput | PaymentLogScalarWhereInput[]
  }

  export type PlatformProductUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PlatformProductCreateWithoutUserInput, PlatformProductUncheckedCreateWithoutUserInput> | PlatformProductCreateWithoutUserInput[] | PlatformProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlatformProductCreateOrConnectWithoutUserInput | PlatformProductCreateOrConnectWithoutUserInput[]
    upsert?: PlatformProductUpsertWithWhereUniqueWithoutUserInput | PlatformProductUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PlatformProductCreateManyUserInputEnvelope
    set?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    disconnect?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    delete?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    connect?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    update?: PlatformProductUpdateWithWhereUniqueWithoutUserInput | PlatformProductUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PlatformProductUpdateManyWithWhereWithoutUserInput | PlatformProductUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PlatformProductScalarWhereInput | PlatformProductScalarWhereInput[]
  }

  export type PricingModuleFeatureCreateNestedManyWithoutModuleInput = {
    create?: XOR<PricingModuleFeatureCreateWithoutModuleInput, PricingModuleFeatureUncheckedCreateWithoutModuleInput> | PricingModuleFeatureCreateWithoutModuleInput[] | PricingModuleFeatureUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: PricingModuleFeatureCreateOrConnectWithoutModuleInput | PricingModuleFeatureCreateOrConnectWithoutModuleInput[]
    createMany?: PricingModuleFeatureCreateManyModuleInputEnvelope
    connect?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
  }

  export type SubscriptionCreateNestedManyWithoutModuleInput = {
    create?: XOR<SubscriptionCreateWithoutModuleInput, SubscriptionUncheckedCreateWithoutModuleInput> | SubscriptionCreateWithoutModuleInput[] | SubscriptionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutModuleInput | SubscriptionCreateOrConnectWithoutModuleInput[]
    createMany?: SubscriptionCreateManyModuleInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type PricingModuleFeatureUncheckedCreateNestedManyWithoutModuleInput = {
    create?: XOR<PricingModuleFeatureCreateWithoutModuleInput, PricingModuleFeatureUncheckedCreateWithoutModuleInput> | PricingModuleFeatureCreateWithoutModuleInput[] | PricingModuleFeatureUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: PricingModuleFeatureCreateOrConnectWithoutModuleInput | PricingModuleFeatureCreateOrConnectWithoutModuleInput[]
    createMany?: PricingModuleFeatureCreateManyModuleInputEnvelope
    connect?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutModuleInput = {
    create?: XOR<SubscriptionCreateWithoutModuleInput, SubscriptionUncheckedCreateWithoutModuleInput> | SubscriptionCreateWithoutModuleInput[] | SubscriptionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutModuleInput | SubscriptionCreateOrConnectWithoutModuleInput[]
    createMany?: SubscriptionCreateManyModuleInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PricingModuleFeatureUpdateManyWithoutModuleNestedInput = {
    create?: XOR<PricingModuleFeatureCreateWithoutModuleInput, PricingModuleFeatureUncheckedCreateWithoutModuleInput> | PricingModuleFeatureCreateWithoutModuleInput[] | PricingModuleFeatureUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: PricingModuleFeatureCreateOrConnectWithoutModuleInput | PricingModuleFeatureCreateOrConnectWithoutModuleInput[]
    upsert?: PricingModuleFeatureUpsertWithWhereUniqueWithoutModuleInput | PricingModuleFeatureUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: PricingModuleFeatureCreateManyModuleInputEnvelope
    set?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    disconnect?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    delete?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    connect?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    update?: PricingModuleFeatureUpdateWithWhereUniqueWithoutModuleInput | PricingModuleFeatureUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: PricingModuleFeatureUpdateManyWithWhereWithoutModuleInput | PricingModuleFeatureUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: PricingModuleFeatureScalarWhereInput | PricingModuleFeatureScalarWhereInput[]
  }

  export type SubscriptionUpdateManyWithoutModuleNestedInput = {
    create?: XOR<SubscriptionCreateWithoutModuleInput, SubscriptionUncheckedCreateWithoutModuleInput> | SubscriptionCreateWithoutModuleInput[] | SubscriptionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutModuleInput | SubscriptionCreateOrConnectWithoutModuleInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutModuleInput | SubscriptionUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: SubscriptionCreateManyModuleInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutModuleInput | SubscriptionUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutModuleInput | SubscriptionUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PricingModuleFeatureUncheckedUpdateManyWithoutModuleNestedInput = {
    create?: XOR<PricingModuleFeatureCreateWithoutModuleInput, PricingModuleFeatureUncheckedCreateWithoutModuleInput> | PricingModuleFeatureCreateWithoutModuleInput[] | PricingModuleFeatureUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: PricingModuleFeatureCreateOrConnectWithoutModuleInput | PricingModuleFeatureCreateOrConnectWithoutModuleInput[]
    upsert?: PricingModuleFeatureUpsertWithWhereUniqueWithoutModuleInput | PricingModuleFeatureUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: PricingModuleFeatureCreateManyModuleInputEnvelope
    set?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    disconnect?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    delete?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    connect?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    update?: PricingModuleFeatureUpdateWithWhereUniqueWithoutModuleInput | PricingModuleFeatureUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: PricingModuleFeatureUpdateManyWithWhereWithoutModuleInput | PricingModuleFeatureUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: PricingModuleFeatureScalarWhereInput | PricingModuleFeatureScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutModuleNestedInput = {
    create?: XOR<SubscriptionCreateWithoutModuleInput, SubscriptionUncheckedCreateWithoutModuleInput> | SubscriptionCreateWithoutModuleInput[] | SubscriptionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutModuleInput | SubscriptionCreateOrConnectWithoutModuleInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutModuleInput | SubscriptionUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: SubscriptionCreateManyModuleInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutModuleInput | SubscriptionUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutModuleInput | SubscriptionUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type PricingModuleFeatureCreateNestedManyWithoutFeatureInput = {
    create?: XOR<PricingModuleFeatureCreateWithoutFeatureInput, PricingModuleFeatureUncheckedCreateWithoutFeatureInput> | PricingModuleFeatureCreateWithoutFeatureInput[] | PricingModuleFeatureUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: PricingModuleFeatureCreateOrConnectWithoutFeatureInput | PricingModuleFeatureCreateOrConnectWithoutFeatureInput[]
    createMany?: PricingModuleFeatureCreateManyFeatureInputEnvelope
    connect?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
  }

  export type SubscriptionQuotaCreateNestedManyWithoutFeatureInput = {
    create?: XOR<SubscriptionQuotaCreateWithoutFeatureInput, SubscriptionQuotaUncheckedCreateWithoutFeatureInput> | SubscriptionQuotaCreateWithoutFeatureInput[] | SubscriptionQuotaUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: SubscriptionQuotaCreateOrConnectWithoutFeatureInput | SubscriptionQuotaCreateOrConnectWithoutFeatureInput[]
    createMany?: SubscriptionQuotaCreateManyFeatureInputEnvelope
    connect?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
  }

  export type UsageLogCreateNestedManyWithoutFeatureInput = {
    create?: XOR<UsageLogCreateWithoutFeatureInput, UsageLogUncheckedCreateWithoutFeatureInput> | UsageLogCreateWithoutFeatureInput[] | UsageLogUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutFeatureInput | UsageLogCreateOrConnectWithoutFeatureInput[]
    createMany?: UsageLogCreateManyFeatureInputEnvelope
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
  }

  export type PricingModuleFeatureUncheckedCreateNestedManyWithoutFeatureInput = {
    create?: XOR<PricingModuleFeatureCreateWithoutFeatureInput, PricingModuleFeatureUncheckedCreateWithoutFeatureInput> | PricingModuleFeatureCreateWithoutFeatureInput[] | PricingModuleFeatureUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: PricingModuleFeatureCreateOrConnectWithoutFeatureInput | PricingModuleFeatureCreateOrConnectWithoutFeatureInput[]
    createMany?: PricingModuleFeatureCreateManyFeatureInputEnvelope
    connect?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
  }

  export type SubscriptionQuotaUncheckedCreateNestedManyWithoutFeatureInput = {
    create?: XOR<SubscriptionQuotaCreateWithoutFeatureInput, SubscriptionQuotaUncheckedCreateWithoutFeatureInput> | SubscriptionQuotaCreateWithoutFeatureInput[] | SubscriptionQuotaUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: SubscriptionQuotaCreateOrConnectWithoutFeatureInput | SubscriptionQuotaCreateOrConnectWithoutFeatureInput[]
    createMany?: SubscriptionQuotaCreateManyFeatureInputEnvelope
    connect?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
  }

  export type UsageLogUncheckedCreateNestedManyWithoutFeatureInput = {
    create?: XOR<UsageLogCreateWithoutFeatureInput, UsageLogUncheckedCreateWithoutFeatureInput> | UsageLogCreateWithoutFeatureInput[] | UsageLogUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutFeatureInput | UsageLogCreateOrConnectWithoutFeatureInput[]
    createMany?: UsageLogCreateManyFeatureInputEnvelope
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
  }

  export type PricingModuleFeatureUpdateManyWithoutFeatureNestedInput = {
    create?: XOR<PricingModuleFeatureCreateWithoutFeatureInput, PricingModuleFeatureUncheckedCreateWithoutFeatureInput> | PricingModuleFeatureCreateWithoutFeatureInput[] | PricingModuleFeatureUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: PricingModuleFeatureCreateOrConnectWithoutFeatureInput | PricingModuleFeatureCreateOrConnectWithoutFeatureInput[]
    upsert?: PricingModuleFeatureUpsertWithWhereUniqueWithoutFeatureInput | PricingModuleFeatureUpsertWithWhereUniqueWithoutFeatureInput[]
    createMany?: PricingModuleFeatureCreateManyFeatureInputEnvelope
    set?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    disconnect?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    delete?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    connect?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    update?: PricingModuleFeatureUpdateWithWhereUniqueWithoutFeatureInput | PricingModuleFeatureUpdateWithWhereUniqueWithoutFeatureInput[]
    updateMany?: PricingModuleFeatureUpdateManyWithWhereWithoutFeatureInput | PricingModuleFeatureUpdateManyWithWhereWithoutFeatureInput[]
    deleteMany?: PricingModuleFeatureScalarWhereInput | PricingModuleFeatureScalarWhereInput[]
  }

  export type SubscriptionQuotaUpdateManyWithoutFeatureNestedInput = {
    create?: XOR<SubscriptionQuotaCreateWithoutFeatureInput, SubscriptionQuotaUncheckedCreateWithoutFeatureInput> | SubscriptionQuotaCreateWithoutFeatureInput[] | SubscriptionQuotaUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: SubscriptionQuotaCreateOrConnectWithoutFeatureInput | SubscriptionQuotaCreateOrConnectWithoutFeatureInput[]
    upsert?: SubscriptionQuotaUpsertWithWhereUniqueWithoutFeatureInput | SubscriptionQuotaUpsertWithWhereUniqueWithoutFeatureInput[]
    createMany?: SubscriptionQuotaCreateManyFeatureInputEnvelope
    set?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    disconnect?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    delete?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    connect?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    update?: SubscriptionQuotaUpdateWithWhereUniqueWithoutFeatureInput | SubscriptionQuotaUpdateWithWhereUniqueWithoutFeatureInput[]
    updateMany?: SubscriptionQuotaUpdateManyWithWhereWithoutFeatureInput | SubscriptionQuotaUpdateManyWithWhereWithoutFeatureInput[]
    deleteMany?: SubscriptionQuotaScalarWhereInput | SubscriptionQuotaScalarWhereInput[]
  }

  export type UsageLogUpdateManyWithoutFeatureNestedInput = {
    create?: XOR<UsageLogCreateWithoutFeatureInput, UsageLogUncheckedCreateWithoutFeatureInput> | UsageLogCreateWithoutFeatureInput[] | UsageLogUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutFeatureInput | UsageLogCreateOrConnectWithoutFeatureInput[]
    upsert?: UsageLogUpsertWithWhereUniqueWithoutFeatureInput | UsageLogUpsertWithWhereUniqueWithoutFeatureInput[]
    createMany?: UsageLogCreateManyFeatureInputEnvelope
    set?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    disconnect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    delete?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    update?: UsageLogUpdateWithWhereUniqueWithoutFeatureInput | UsageLogUpdateWithWhereUniqueWithoutFeatureInput[]
    updateMany?: UsageLogUpdateManyWithWhereWithoutFeatureInput | UsageLogUpdateManyWithWhereWithoutFeatureInput[]
    deleteMany?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
  }

  export type PricingModuleFeatureUncheckedUpdateManyWithoutFeatureNestedInput = {
    create?: XOR<PricingModuleFeatureCreateWithoutFeatureInput, PricingModuleFeatureUncheckedCreateWithoutFeatureInput> | PricingModuleFeatureCreateWithoutFeatureInput[] | PricingModuleFeatureUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: PricingModuleFeatureCreateOrConnectWithoutFeatureInput | PricingModuleFeatureCreateOrConnectWithoutFeatureInput[]
    upsert?: PricingModuleFeatureUpsertWithWhereUniqueWithoutFeatureInput | PricingModuleFeatureUpsertWithWhereUniqueWithoutFeatureInput[]
    createMany?: PricingModuleFeatureCreateManyFeatureInputEnvelope
    set?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    disconnect?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    delete?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    connect?: PricingModuleFeatureWhereUniqueInput | PricingModuleFeatureWhereUniqueInput[]
    update?: PricingModuleFeatureUpdateWithWhereUniqueWithoutFeatureInput | PricingModuleFeatureUpdateWithWhereUniqueWithoutFeatureInput[]
    updateMany?: PricingModuleFeatureUpdateManyWithWhereWithoutFeatureInput | PricingModuleFeatureUpdateManyWithWhereWithoutFeatureInput[]
    deleteMany?: PricingModuleFeatureScalarWhereInput | PricingModuleFeatureScalarWhereInput[]
  }

  export type SubscriptionQuotaUncheckedUpdateManyWithoutFeatureNestedInput = {
    create?: XOR<SubscriptionQuotaCreateWithoutFeatureInput, SubscriptionQuotaUncheckedCreateWithoutFeatureInput> | SubscriptionQuotaCreateWithoutFeatureInput[] | SubscriptionQuotaUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: SubscriptionQuotaCreateOrConnectWithoutFeatureInput | SubscriptionQuotaCreateOrConnectWithoutFeatureInput[]
    upsert?: SubscriptionQuotaUpsertWithWhereUniqueWithoutFeatureInput | SubscriptionQuotaUpsertWithWhereUniqueWithoutFeatureInput[]
    createMany?: SubscriptionQuotaCreateManyFeatureInputEnvelope
    set?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    disconnect?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    delete?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    connect?: SubscriptionQuotaWhereUniqueInput | SubscriptionQuotaWhereUniqueInput[]
    update?: SubscriptionQuotaUpdateWithWhereUniqueWithoutFeatureInput | SubscriptionQuotaUpdateWithWhereUniqueWithoutFeatureInput[]
    updateMany?: SubscriptionQuotaUpdateManyWithWhereWithoutFeatureInput | SubscriptionQuotaUpdateManyWithWhereWithoutFeatureInput[]
    deleteMany?: SubscriptionQuotaScalarWhereInput | SubscriptionQuotaScalarWhereInput[]
  }

  export type UsageLogUncheckedUpdateManyWithoutFeatureNestedInput = {
    create?: XOR<UsageLogCreateWithoutFeatureInput, UsageLogUncheckedCreateWithoutFeatureInput> | UsageLogCreateWithoutFeatureInput[] | UsageLogUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutFeatureInput | UsageLogCreateOrConnectWithoutFeatureInput[]
    upsert?: UsageLogUpsertWithWhereUniqueWithoutFeatureInput | UsageLogUpsertWithWhereUniqueWithoutFeatureInput[]
    createMany?: UsageLogCreateManyFeatureInputEnvelope
    set?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    disconnect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    delete?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    update?: UsageLogUpdateWithWhereUniqueWithoutFeatureInput | UsageLogUpdateWithWhereUniqueWithoutFeatureInput[]
    updateMany?: UsageLogUpdateManyWithWhereWithoutFeatureInput | UsageLogUpdateManyWithWhereWithoutFeatureInput[]
    deleteMany?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
  }

  export type PricingModuleCreateNestedOneWithoutFeaturesInput = {
    create?: XOR<PricingModuleCreateWithoutFeaturesInput, PricingModuleUncheckedCreateWithoutFeaturesInput>
    connectOrCreate?: PricingModuleCreateOrConnectWithoutFeaturesInput
    connect?: PricingModuleWhereUniqueInput
  }

  export type PricingFeatureCreateNestedOneWithoutModulesInput = {
    create?: XOR<PricingFeatureCreateWithoutModulesInput, PricingFeatureUncheckedCreateWithoutModulesInput>
    connectOrCreate?: PricingFeatureCreateOrConnectWithoutModulesInput
    connect?: PricingFeatureWhereUniqueInput
  }

  export type PricingModuleUpdateOneWithoutFeaturesNestedInput = {
    create?: XOR<PricingModuleCreateWithoutFeaturesInput, PricingModuleUncheckedCreateWithoutFeaturesInput>
    connectOrCreate?: PricingModuleCreateOrConnectWithoutFeaturesInput
    upsert?: PricingModuleUpsertWithoutFeaturesInput
    disconnect?: PricingModuleWhereInput | boolean
    delete?: PricingModuleWhereInput | boolean
    connect?: PricingModuleWhereUniqueInput
    update?: XOR<XOR<PricingModuleUpdateToOneWithWhereWithoutFeaturesInput, PricingModuleUpdateWithoutFeaturesInput>, PricingModuleUncheckedUpdateWithoutFeaturesInput>
  }

  export type PricingFeatureUpdateOneWithoutModulesNestedInput = {
    create?: XOR<PricingFeatureCreateWithoutModulesInput, PricingFeatureUncheckedCreateWithoutModulesInput>
    connectOrCreate?: PricingFeatureCreateOrConnectWithoutModulesInput
    upsert?: PricingFeatureUpsertWithoutModulesInput
    disconnect?: PricingFeatureWhereInput | boolean
    delete?: PricingFeatureWhereInput | boolean
    connect?: PricingFeatureWhereUniqueInput
    update?: XOR<XOR<PricingFeatureUpdateToOneWithWhereWithoutModulesInput, PricingFeatureUpdateWithoutModulesInput>, PricingFeatureUncheckedUpdateWithoutModulesInput>
  }

  export type PricingModuleCreateNestedOneWithoutSubscriptionInput = {
    create?: XOR<PricingModuleCreateWithoutSubscriptionInput, PricingModuleUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: PricingModuleCreateOrConnectWithoutSubscriptionInput
    connect?: PricingModuleWhereUniqueInput
  }

  export type SessionCreateNestedOneWithoutSubscriptionInput = {
    create?: XOR<SessionCreateWithoutSubscriptionInput, SessionUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: SessionCreateOrConnectWithoutSubscriptionInput
    connect?: SessionWhereUniqueInput
  }

  export type PricingModuleUpdateOneWithoutSubscriptionNestedInput = {
    create?: XOR<PricingModuleCreateWithoutSubscriptionInput, PricingModuleUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: PricingModuleCreateOrConnectWithoutSubscriptionInput
    upsert?: PricingModuleUpsertWithoutSubscriptionInput
    disconnect?: PricingModuleWhereInput | boolean
    delete?: PricingModuleWhereInput | boolean
    connect?: PricingModuleWhereUniqueInput
    update?: XOR<XOR<PricingModuleUpdateToOneWithWhereWithoutSubscriptionInput, PricingModuleUpdateWithoutSubscriptionInput>, PricingModuleUncheckedUpdateWithoutSubscriptionInput>
  }

  export type SessionUpdateOneWithoutSubscriptionNestedInput = {
    create?: XOR<SessionCreateWithoutSubscriptionInput, SessionUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: SessionCreateOrConnectWithoutSubscriptionInput
    upsert?: SessionUpsertWithoutSubscriptionInput
    disconnect?: SessionWhereInput | boolean
    delete?: SessionWhereInput | boolean
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutSubscriptionInput, SessionUpdateWithoutSubscriptionInput>, SessionUncheckedUpdateWithoutSubscriptionInput>
  }

  export type SessionCreateNestedOneWithoutSubscriptionQuotaInput = {
    create?: XOR<SessionCreateWithoutSubscriptionQuotaInput, SessionUncheckedCreateWithoutSubscriptionQuotaInput>
    connectOrCreate?: SessionCreateOrConnectWithoutSubscriptionQuotaInput
    connect?: SessionWhereUniqueInput
  }

  export type PricingFeatureCreateNestedOneWithoutSubscriptionQuotaInput = {
    create?: XOR<PricingFeatureCreateWithoutSubscriptionQuotaInput, PricingFeatureUncheckedCreateWithoutSubscriptionQuotaInput>
    connectOrCreate?: PricingFeatureCreateOrConnectWithoutSubscriptionQuotaInput
    connect?: PricingFeatureWhereUniqueInput
  }

  export type EnumQuotaTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuotaType
  }

  export type SessionUpdateOneWithoutSubscriptionQuotaNestedInput = {
    create?: XOR<SessionCreateWithoutSubscriptionQuotaInput, SessionUncheckedCreateWithoutSubscriptionQuotaInput>
    connectOrCreate?: SessionCreateOrConnectWithoutSubscriptionQuotaInput
    upsert?: SessionUpsertWithoutSubscriptionQuotaInput
    disconnect?: SessionWhereInput | boolean
    delete?: SessionWhereInput | boolean
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutSubscriptionQuotaInput, SessionUpdateWithoutSubscriptionQuotaInput>, SessionUncheckedUpdateWithoutSubscriptionQuotaInput>
  }

  export type PricingFeatureUpdateOneWithoutSubscriptionQuotaNestedInput = {
    create?: XOR<PricingFeatureCreateWithoutSubscriptionQuotaInput, PricingFeatureUncheckedCreateWithoutSubscriptionQuotaInput>
    connectOrCreate?: PricingFeatureCreateOrConnectWithoutSubscriptionQuotaInput
    upsert?: PricingFeatureUpsertWithoutSubscriptionQuotaInput
    disconnect?: PricingFeatureWhereInput | boolean
    delete?: PricingFeatureWhereInput | boolean
    connect?: PricingFeatureWhereUniqueInput
    update?: XOR<XOR<PricingFeatureUpdateToOneWithWhereWithoutSubscriptionQuotaInput, PricingFeatureUpdateWithoutSubscriptionQuotaInput>, PricingFeatureUncheckedUpdateWithoutSubscriptionQuotaInput>
  }

  export type SessionCreateNestedOneWithoutUsageLogInput = {
    create?: XOR<SessionCreateWithoutUsageLogInput, SessionUncheckedCreateWithoutUsageLogInput>
    connectOrCreate?: SessionCreateOrConnectWithoutUsageLogInput
    connect?: SessionWhereUniqueInput
  }

  export type PricingFeatureCreateNestedOneWithoutUsageLogInput = {
    create?: XOR<PricingFeatureCreateWithoutUsageLogInput, PricingFeatureUncheckedCreateWithoutUsageLogInput>
    connectOrCreate?: PricingFeatureCreateOrConnectWithoutUsageLogInput
    connect?: PricingFeatureWhereUniqueInput
  }

  export type SessionUpdateOneWithoutUsageLogNestedInput = {
    create?: XOR<SessionCreateWithoutUsageLogInput, SessionUncheckedCreateWithoutUsageLogInput>
    connectOrCreate?: SessionCreateOrConnectWithoutUsageLogInput
    upsert?: SessionUpsertWithoutUsageLogInput
    disconnect?: SessionWhereInput | boolean
    delete?: SessionWhereInput | boolean
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutUsageLogInput, SessionUpdateWithoutUsageLogInput>, SessionUncheckedUpdateWithoutUsageLogInput>
  }

  export type PricingFeatureUpdateOneWithoutUsageLogNestedInput = {
    create?: XOR<PricingFeatureCreateWithoutUsageLogInput, PricingFeatureUncheckedCreateWithoutUsageLogInput>
    connectOrCreate?: PricingFeatureCreateOrConnectWithoutUsageLogInput
    upsert?: PricingFeatureUpsertWithoutUsageLogInput
    disconnect?: PricingFeatureWhereInput | boolean
    delete?: PricingFeatureWhereInput | boolean
    connect?: PricingFeatureWhereUniqueInput
    update?: XOR<XOR<PricingFeatureUpdateToOneWithWhereWithoutUsageLogInput, PricingFeatureUpdateWithoutUsageLogInput>, PricingFeatureUncheckedUpdateWithoutUsageLogInput>
  }

  export type SessionCreateNestedOneWithoutPaymentLogInput = {
    create?: XOR<SessionCreateWithoutPaymentLogInput, SessionUncheckedCreateWithoutPaymentLogInput>
    connectOrCreate?: SessionCreateOrConnectWithoutPaymentLogInput
    connect?: SessionWhereUniqueInput
  }

  export type EnumPaymentLogStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentLogStatus
  }

  export type SessionUpdateOneWithoutPaymentLogNestedInput = {
    create?: XOR<SessionCreateWithoutPaymentLogInput, SessionUncheckedCreateWithoutPaymentLogInput>
    connectOrCreate?: SessionCreateOrConnectWithoutPaymentLogInput
    upsert?: SessionUpsertWithoutPaymentLogInput
    disconnect?: SessionWhereInput | boolean
    delete?: SessionWhereInput | boolean
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutPaymentLogInput, SessionUpdateWithoutPaymentLogInput>, SessionUncheckedUpdateWithoutPaymentLogInput>
  }

  export type PlatformProductCreateNestedManyWithoutSourceProductInput = {
    create?: XOR<PlatformProductCreateWithoutSourceProductInput, PlatformProductUncheckedCreateWithoutSourceProductInput> | PlatformProductCreateWithoutSourceProductInput[] | PlatformProductUncheckedCreateWithoutSourceProductInput[]
    connectOrCreate?: PlatformProductCreateOrConnectWithoutSourceProductInput | PlatformProductCreateOrConnectWithoutSourceProductInput[]
    createMany?: PlatformProductCreateManySourceProductInputEnvelope
    connect?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
  }

  export type PlatformProductUncheckedCreateNestedManyWithoutSourceProductInput = {
    create?: XOR<PlatformProductCreateWithoutSourceProductInput, PlatformProductUncheckedCreateWithoutSourceProductInput> | PlatformProductCreateWithoutSourceProductInput[] | PlatformProductUncheckedCreateWithoutSourceProductInput[]
    connectOrCreate?: PlatformProductCreateOrConnectWithoutSourceProductInput | PlatformProductCreateOrConnectWithoutSourceProductInput[]
    createMany?: PlatformProductCreateManySourceProductInputEnvelope
    connect?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
  }

  export type EnumSourceFieldUpdateOperationsInput = {
    set?: $Enums.Source
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumSourceStatusFieldUpdateOperationsInput = {
    set?: $Enums.SourceStatus
  }

  export type PlatformProductUpdateManyWithoutSourceProductNestedInput = {
    create?: XOR<PlatformProductCreateWithoutSourceProductInput, PlatformProductUncheckedCreateWithoutSourceProductInput> | PlatformProductCreateWithoutSourceProductInput[] | PlatformProductUncheckedCreateWithoutSourceProductInput[]
    connectOrCreate?: PlatformProductCreateOrConnectWithoutSourceProductInput | PlatformProductCreateOrConnectWithoutSourceProductInput[]
    upsert?: PlatformProductUpsertWithWhereUniqueWithoutSourceProductInput | PlatformProductUpsertWithWhereUniqueWithoutSourceProductInput[]
    createMany?: PlatformProductCreateManySourceProductInputEnvelope
    set?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    disconnect?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    delete?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    connect?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    update?: PlatformProductUpdateWithWhereUniqueWithoutSourceProductInput | PlatformProductUpdateWithWhereUniqueWithoutSourceProductInput[]
    updateMany?: PlatformProductUpdateManyWithWhereWithoutSourceProductInput | PlatformProductUpdateManyWithWhereWithoutSourceProductInput[]
    deleteMany?: PlatformProductScalarWhereInput | PlatformProductScalarWhereInput[]
  }

  export type PlatformProductUncheckedUpdateManyWithoutSourceProductNestedInput = {
    create?: XOR<PlatformProductCreateWithoutSourceProductInput, PlatformProductUncheckedCreateWithoutSourceProductInput> | PlatformProductCreateWithoutSourceProductInput[] | PlatformProductUncheckedCreateWithoutSourceProductInput[]
    connectOrCreate?: PlatformProductCreateOrConnectWithoutSourceProductInput | PlatformProductCreateOrConnectWithoutSourceProductInput[]
    upsert?: PlatformProductUpsertWithWhereUniqueWithoutSourceProductInput | PlatformProductUpsertWithWhereUniqueWithoutSourceProductInput[]
    createMany?: PlatformProductCreateManySourceProductInputEnvelope
    set?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    disconnect?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    delete?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    connect?: PlatformProductWhereUniqueInput | PlatformProductWhereUniqueInput[]
    update?: PlatformProductUpdateWithWhereUniqueWithoutSourceProductInput | PlatformProductUpdateWithWhereUniqueWithoutSourceProductInput[]
    updateMany?: PlatformProductUpdateManyWithWhereWithoutSourceProductInput | PlatformProductUpdateManyWithWhereWithoutSourceProductInput[]
    deleteMany?: PlatformProductScalarWhereInput | PlatformProductScalarWhereInput[]
  }

  export type SessionCreateNestedOneWithoutPlatformProductInput = {
    create?: XOR<SessionCreateWithoutPlatformProductInput, SessionUncheckedCreateWithoutPlatformProductInput>
    connectOrCreate?: SessionCreateOrConnectWithoutPlatformProductInput
    connect?: SessionWhereUniqueInput
  }

  export type SourceProductCreateNestedOneWithoutPlatformProductInput = {
    create?: XOR<SourceProductCreateWithoutPlatformProductInput, SourceProductUncheckedCreateWithoutPlatformProductInput>
    connectOrCreate?: SourceProductCreateOrConnectWithoutPlatformProductInput
    connect?: SourceProductWhereUniqueInput
  }

  export type SessionUpdateOneWithoutPlatformProductNestedInput = {
    create?: XOR<SessionCreateWithoutPlatformProductInput, SessionUncheckedCreateWithoutPlatformProductInput>
    connectOrCreate?: SessionCreateOrConnectWithoutPlatformProductInput
    upsert?: SessionUpsertWithoutPlatformProductInput
    disconnect?: SessionWhereInput | boolean
    delete?: SessionWhereInput | boolean
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutPlatformProductInput, SessionUpdateWithoutPlatformProductInput>, SessionUncheckedUpdateWithoutPlatformProductInput>
  }

  export type SourceProductUpdateOneWithoutPlatformProductNestedInput = {
    create?: XOR<SourceProductCreateWithoutPlatformProductInput, SourceProductUncheckedCreateWithoutPlatformProductInput>
    connectOrCreate?: SourceProductCreateOrConnectWithoutPlatformProductInput
    upsert?: SourceProductUpsertWithoutPlatformProductInput
    disconnect?: SourceProductWhereInput | boolean
    delete?: SourceProductWhereInput | boolean
    connect?: SourceProductWhereUniqueInput
    update?: XOR<XOR<SourceProductUpdateToOneWithWhereWithoutPlatformProductInput, SourceProductUpdateWithoutPlatformProductInput>, SourceProductUncheckedUpdateWithoutPlatformProductInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumQuotaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuotaType | EnumQuotaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuotaType[]
    notIn?: $Enums.QuotaType[]
    not?: NestedEnumQuotaTypeFilter<$PrismaModel> | $Enums.QuotaType
  }

  export type NestedEnumQuotaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuotaType | EnumQuotaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuotaType[]
    notIn?: $Enums.QuotaType[]
    not?: NestedEnumQuotaTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuotaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuotaTypeFilter<$PrismaModel>
    _max?: NestedEnumQuotaTypeFilter<$PrismaModel>
  }

  export type NestedEnumPaymentLogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentLogStatus | EnumPaymentLogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentLogStatus[]
    notIn?: $Enums.PaymentLogStatus[]
    not?: NestedEnumPaymentLogStatusFilter<$PrismaModel> | $Enums.PaymentLogStatus
  }

  export type NestedEnumPaymentLogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentLogStatus | EnumPaymentLogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentLogStatus[]
    notIn?: $Enums.PaymentLogStatus[]
    not?: NestedEnumPaymentLogStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentLogStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentLogStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentLogStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.Source | EnumSourceFieldRefInput<$PrismaModel>
    in?: $Enums.Source[]
    notIn?: $Enums.Source[]
    not?: NestedEnumSourceFilter<$PrismaModel> | $Enums.Source
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSourceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceStatus | EnumSourceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SourceStatus[]
    notIn?: $Enums.SourceStatus[]
    not?: NestedEnumSourceStatusFilter<$PrismaModel> | $Enums.SourceStatus
  }

  export type NestedEnumSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Source | EnumSourceFieldRefInput<$PrismaModel>
    in?: $Enums.Source[]
    notIn?: $Enums.Source[]
    not?: NestedEnumSourceWithAggregatesFilter<$PrismaModel> | $Enums.Source
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceFilter<$PrismaModel>
    _max?: NestedEnumSourceFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumSourceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceStatus | EnumSourceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SourceStatus[]
    notIn?: $Enums.SourceStatus[]
    not?: NestedEnumSourceStatusWithAggregatesFilter<$PrismaModel> | $Enums.SourceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceStatusFilter<$PrismaModel>
    _max?: NestedEnumSourceStatusFilter<$PrismaModel>
  }

  export type SubscriptionCreateWithoutUserInput = {
    id?: string
    start_time?: Date | string | null
    next_billing_time?: Date | string | null
    external_subscription_id: string
    status: string
    amount: number
    is_trial?: boolean | null
    is_test?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    module?: PricingModuleCreateNestedOneWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateWithoutUserInput = {
    id?: string
    start_time?: Date | string | null
    next_billing_time?: Date | string | null
    external_subscription_id: string
    status: string
    amount: number
    moduleId: number
    is_trial?: boolean | null
    is_test?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutUserInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
  }

  export type SubscriptionCreateManyUserInputEnvelope = {
    data: SubscriptionCreateManyUserInput | SubscriptionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionQuotaCreateWithoutUserInput = {
    id?: bigint | number
    limit_quantity: number
    used_quantity: number
    type: $Enums.QuotaType
    createdAt?: Date | string
    feature?: PricingFeatureCreateNestedOneWithoutSubscriptionQuotaInput
  }

  export type SubscriptionQuotaUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    feature_id: string
    limit_quantity: number
    used_quantity: number
    type: $Enums.QuotaType
    createdAt?: Date | string
  }

  export type SubscriptionQuotaCreateOrConnectWithoutUserInput = {
    where: SubscriptionQuotaWhereUniqueInput
    create: XOR<SubscriptionQuotaCreateWithoutUserInput, SubscriptionQuotaUncheckedCreateWithoutUserInput>
  }

  export type SubscriptionQuotaCreateManyUserInputEnvelope = {
    data: SubscriptionQuotaCreateManyUserInput | SubscriptionQuotaCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UsageLogCreateWithoutUserInput = {
    id?: bigint | number
    used_quantity: number
    createdAt?: Date | string
    feature?: PricingFeatureCreateNestedOneWithoutUsageLogInput
  }

  export type UsageLogUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    feature_id: string
    used_quantity: number
    createdAt?: Date | string
  }

  export type UsageLogCreateOrConnectWithoutUserInput = {
    where: UsageLogWhereUniqueInput
    create: XOR<UsageLogCreateWithoutUserInput, UsageLogUncheckedCreateWithoutUserInput>
  }

  export type UsageLogCreateManyUserInputEnvelope = {
    data: UsageLogCreateManyUserInput | UsageLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PaymentLogCreateWithoutUserInput = {
    id?: bigint | number
    action: string
    status?: $Enums.PaymentLogStatus
    external_transaction_id?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    createdAt?: Date | string
  }

  export type PaymentLogUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    action: string
    status?: $Enums.PaymentLogStatus
    external_transaction_id?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    createdAt?: Date | string
  }

  export type PaymentLogCreateOrConnectWithoutUserInput = {
    where: PaymentLogWhereUniqueInput
    create: XOR<PaymentLogCreateWithoutUserInput, PaymentLogUncheckedCreateWithoutUserInput>
  }

  export type PaymentLogCreateManyUserInputEnvelope = {
    data: PaymentLogCreateManyUserInput | PaymentLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PlatformProductCreateWithoutUserInput = {
    id?: bigint | number
    platformId?: string | null
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title: string
    handle: string
    descriptionHtml?: string | null
    featuredMedia?: string | null
    createdAt?: Date | string
    sourceProduct?: SourceProductCreateNestedOneWithoutPlatformProductInput
  }

  export type PlatformProductUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    platformId?: string | null
    sourceProductId: bigint | number
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title: string
    handle: string
    descriptionHtml?: string | null
    featuredMedia?: string | null
    createdAt?: Date | string
  }

  export type PlatformProductCreateOrConnectWithoutUserInput = {
    where: PlatformProductWhereUniqueInput
    create: XOR<PlatformProductCreateWithoutUserInput, PlatformProductUncheckedCreateWithoutUserInput>
  }

  export type PlatformProductCreateManyUserInputEnvelope = {
    data: PlatformProductCreateManyUserInput | PlatformProductCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutUserInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutUserInput, SubscriptionUncheckedUpdateWithoutUserInput>
    create: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutUserInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutUserInput, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutUserInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutUserInput>
  }

  export type SubscriptionScalarWhereInput = {
    AND?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    OR?: SubscriptionScalarWhereInput[]
    NOT?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    id?: StringFilter<"Subscription"> | string
    userId?: BigIntFilter<"Subscription"> | bigint | number
    start_time?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    next_billing_time?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    external_subscription_id?: StringFilter<"Subscription"> | string
    status?: StringFilter<"Subscription"> | string
    amount?: FloatFilter<"Subscription"> | number
    moduleId?: IntFilter<"Subscription"> | number
    is_trial?: BoolNullableFilter<"Subscription"> | boolean | null
    is_test?: BoolNullableFilter<"Subscription"> | boolean | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
  }

  export type SubscriptionQuotaUpsertWithWhereUniqueWithoutUserInput = {
    where: SubscriptionQuotaWhereUniqueInput
    update: XOR<SubscriptionQuotaUpdateWithoutUserInput, SubscriptionQuotaUncheckedUpdateWithoutUserInput>
    create: XOR<SubscriptionQuotaCreateWithoutUserInput, SubscriptionQuotaUncheckedCreateWithoutUserInput>
  }

  export type SubscriptionQuotaUpdateWithWhereUniqueWithoutUserInput = {
    where: SubscriptionQuotaWhereUniqueInput
    data: XOR<SubscriptionQuotaUpdateWithoutUserInput, SubscriptionQuotaUncheckedUpdateWithoutUserInput>
  }

  export type SubscriptionQuotaUpdateManyWithWhereWithoutUserInput = {
    where: SubscriptionQuotaScalarWhereInput
    data: XOR<SubscriptionQuotaUpdateManyMutationInput, SubscriptionQuotaUncheckedUpdateManyWithoutUserInput>
  }

  export type SubscriptionQuotaScalarWhereInput = {
    AND?: SubscriptionQuotaScalarWhereInput | SubscriptionQuotaScalarWhereInput[]
    OR?: SubscriptionQuotaScalarWhereInput[]
    NOT?: SubscriptionQuotaScalarWhereInput | SubscriptionQuotaScalarWhereInput[]
    id?: BigIntFilter<"SubscriptionQuota"> | bigint | number
    userId?: BigIntFilter<"SubscriptionQuota"> | bigint | number
    feature_id?: StringFilter<"SubscriptionQuota"> | string
    limit_quantity?: IntFilter<"SubscriptionQuota"> | number
    used_quantity?: IntFilter<"SubscriptionQuota"> | number
    type?: EnumQuotaTypeFilter<"SubscriptionQuota"> | $Enums.QuotaType
    createdAt?: DateTimeFilter<"SubscriptionQuota"> | Date | string
  }

  export type UsageLogUpsertWithWhereUniqueWithoutUserInput = {
    where: UsageLogWhereUniqueInput
    update: XOR<UsageLogUpdateWithoutUserInput, UsageLogUncheckedUpdateWithoutUserInput>
    create: XOR<UsageLogCreateWithoutUserInput, UsageLogUncheckedCreateWithoutUserInput>
  }

  export type UsageLogUpdateWithWhereUniqueWithoutUserInput = {
    where: UsageLogWhereUniqueInput
    data: XOR<UsageLogUpdateWithoutUserInput, UsageLogUncheckedUpdateWithoutUserInput>
  }

  export type UsageLogUpdateManyWithWhereWithoutUserInput = {
    where: UsageLogScalarWhereInput
    data: XOR<UsageLogUpdateManyMutationInput, UsageLogUncheckedUpdateManyWithoutUserInput>
  }

  export type UsageLogScalarWhereInput = {
    AND?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
    OR?: UsageLogScalarWhereInput[]
    NOT?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
    id?: BigIntFilter<"UsageLog"> | bigint | number
    userId?: BigIntFilter<"UsageLog"> | bigint | number
    feature_id?: StringFilter<"UsageLog"> | string
    used_quantity?: IntFilter<"UsageLog"> | number
    createdAt?: DateTimeFilter<"UsageLog"> | Date | string
  }

  export type PaymentLogUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentLogWhereUniqueInput
    update: XOR<PaymentLogUpdateWithoutUserInput, PaymentLogUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentLogCreateWithoutUserInput, PaymentLogUncheckedCreateWithoutUserInput>
  }

  export type PaymentLogUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentLogWhereUniqueInput
    data: XOR<PaymentLogUpdateWithoutUserInput, PaymentLogUncheckedUpdateWithoutUserInput>
  }

  export type PaymentLogUpdateManyWithWhereWithoutUserInput = {
    where: PaymentLogScalarWhereInput
    data: XOR<PaymentLogUpdateManyMutationInput, PaymentLogUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentLogScalarWhereInput = {
    AND?: PaymentLogScalarWhereInput | PaymentLogScalarWhereInput[]
    OR?: PaymentLogScalarWhereInput[]
    NOT?: PaymentLogScalarWhereInput | PaymentLogScalarWhereInput[]
    id?: BigIntFilter<"PaymentLog"> | bigint | number
    userId?: BigIntFilter<"PaymentLog"> | bigint | number
    action?: StringFilter<"PaymentLog"> | string
    status?: EnumPaymentLogStatusFilter<"PaymentLog"> | $Enums.PaymentLogStatus
    external_transaction_id?: StringNullableFilter<"PaymentLog"> | string | null
    details?: JsonNullableFilter<"PaymentLog">
    amount?: FloatFilter<"PaymentLog"> | number
    createdAt?: DateTimeFilter<"PaymentLog"> | Date | string
  }

  export type PlatformProductUpsertWithWhereUniqueWithoutUserInput = {
    where: PlatformProductWhereUniqueInput
    update: XOR<PlatformProductUpdateWithoutUserInput, PlatformProductUncheckedUpdateWithoutUserInput>
    create: XOR<PlatformProductCreateWithoutUserInput, PlatformProductUncheckedCreateWithoutUserInput>
  }

  export type PlatformProductUpdateWithWhereUniqueWithoutUserInput = {
    where: PlatformProductWhereUniqueInput
    data: XOR<PlatformProductUpdateWithoutUserInput, PlatformProductUncheckedUpdateWithoutUserInput>
  }

  export type PlatformProductUpdateManyWithWhereWithoutUserInput = {
    where: PlatformProductScalarWhereInput
    data: XOR<PlatformProductUpdateManyMutationInput, PlatformProductUncheckedUpdateManyWithoutUserInput>
  }

  export type PlatformProductScalarWhereInput = {
    AND?: PlatformProductScalarWhereInput | PlatformProductScalarWhereInput[]
    OR?: PlatformProductScalarWhereInput[]
    NOT?: PlatformProductScalarWhereInput | PlatformProductScalarWhereInput[]
    id?: BigIntFilter<"PlatformProduct"> | bigint | number
    platformId?: StringNullableFilter<"PlatformProduct"> | string | null
    sourceProductId?: BigIntFilter<"PlatformProduct"> | bigint | number
    userId?: BigIntFilter<"PlatformProduct"> | bigint | number
    metafields?: JsonNullableFilter<"PlatformProduct">
    title?: StringFilter<"PlatformProduct"> | string
    handle?: StringFilter<"PlatformProduct"> | string
    descriptionHtml?: StringNullableFilter<"PlatformProduct"> | string | null
    featuredMedia?: StringNullableFilter<"PlatformProduct"> | string | null
    createdAt?: DateTimeFilter<"PlatformProduct"> | Date | string
  }

  export type PricingModuleFeatureCreateWithoutModuleInput = {
    limit_quantity: number
    cycle: number
    createdAt?: Date | string
    feature?: PricingFeatureCreateNestedOneWithoutModulesInput
  }

  export type PricingModuleFeatureUncheckedCreateWithoutModuleInput = {
    featureId: string
    limit_quantity: number
    cycle: number
    createdAt?: Date | string
  }

  export type PricingModuleFeatureCreateOrConnectWithoutModuleInput = {
    where: PricingModuleFeatureWhereUniqueInput
    create: XOR<PricingModuleFeatureCreateWithoutModuleInput, PricingModuleFeatureUncheckedCreateWithoutModuleInput>
  }

  export type PricingModuleFeatureCreateManyModuleInputEnvelope = {
    data: PricingModuleFeatureCreateManyModuleInput | PricingModuleFeatureCreateManyModuleInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutModuleInput = {
    id?: string
    start_time?: Date | string | null
    next_billing_time?: Date | string | null
    external_subscription_id: string
    status: string
    amount: number
    is_trial?: boolean | null
    is_test?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: SessionCreateNestedOneWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateWithoutModuleInput = {
    id?: string
    userId: bigint | number
    start_time?: Date | string | null
    next_billing_time?: Date | string | null
    external_subscription_id: string
    status: string
    amount: number
    is_trial?: boolean | null
    is_test?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutModuleInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutModuleInput, SubscriptionUncheckedCreateWithoutModuleInput>
  }

  export type SubscriptionCreateManyModuleInputEnvelope = {
    data: SubscriptionCreateManyModuleInput | SubscriptionCreateManyModuleInput[]
    skipDuplicates?: boolean
  }

  export type PricingModuleFeatureUpsertWithWhereUniqueWithoutModuleInput = {
    where: PricingModuleFeatureWhereUniqueInput
    update: XOR<PricingModuleFeatureUpdateWithoutModuleInput, PricingModuleFeatureUncheckedUpdateWithoutModuleInput>
    create: XOR<PricingModuleFeatureCreateWithoutModuleInput, PricingModuleFeatureUncheckedCreateWithoutModuleInput>
  }

  export type PricingModuleFeatureUpdateWithWhereUniqueWithoutModuleInput = {
    where: PricingModuleFeatureWhereUniqueInput
    data: XOR<PricingModuleFeatureUpdateWithoutModuleInput, PricingModuleFeatureUncheckedUpdateWithoutModuleInput>
  }

  export type PricingModuleFeatureUpdateManyWithWhereWithoutModuleInput = {
    where: PricingModuleFeatureScalarWhereInput
    data: XOR<PricingModuleFeatureUpdateManyMutationInput, PricingModuleFeatureUncheckedUpdateManyWithoutModuleInput>
  }

  export type PricingModuleFeatureScalarWhereInput = {
    AND?: PricingModuleFeatureScalarWhereInput | PricingModuleFeatureScalarWhereInput[]
    OR?: PricingModuleFeatureScalarWhereInput[]
    NOT?: PricingModuleFeatureScalarWhereInput | PricingModuleFeatureScalarWhereInput[]
    moduleId?: IntFilter<"PricingModuleFeature"> | number
    featureId?: StringFilter<"PricingModuleFeature"> | string
    limit_quantity?: IntFilter<"PricingModuleFeature"> | number
    cycle?: IntFilter<"PricingModuleFeature"> | number
    createdAt?: DateTimeFilter<"PricingModuleFeature"> | Date | string
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutModuleInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutModuleInput, SubscriptionUncheckedUpdateWithoutModuleInput>
    create: XOR<SubscriptionCreateWithoutModuleInput, SubscriptionUncheckedCreateWithoutModuleInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutModuleInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutModuleInput, SubscriptionUncheckedUpdateWithoutModuleInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutModuleInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutModuleInput>
  }

  export type PricingModuleFeatureCreateWithoutFeatureInput = {
    limit_quantity: number
    cycle: number
    createdAt?: Date | string
    module?: PricingModuleCreateNestedOneWithoutFeaturesInput
  }

  export type PricingModuleFeatureUncheckedCreateWithoutFeatureInput = {
    moduleId: number
    limit_quantity: number
    cycle: number
    createdAt?: Date | string
  }

  export type PricingModuleFeatureCreateOrConnectWithoutFeatureInput = {
    where: PricingModuleFeatureWhereUniqueInput
    create: XOR<PricingModuleFeatureCreateWithoutFeatureInput, PricingModuleFeatureUncheckedCreateWithoutFeatureInput>
  }

  export type PricingModuleFeatureCreateManyFeatureInputEnvelope = {
    data: PricingModuleFeatureCreateManyFeatureInput | PricingModuleFeatureCreateManyFeatureInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionQuotaCreateWithoutFeatureInput = {
    id?: bigint | number
    limit_quantity: number
    used_quantity: number
    type: $Enums.QuotaType
    createdAt?: Date | string
    user?: SessionCreateNestedOneWithoutSubscriptionQuotaInput
  }

  export type SubscriptionQuotaUncheckedCreateWithoutFeatureInput = {
    id?: bigint | number
    userId: bigint | number
    limit_quantity: number
    used_quantity: number
    type: $Enums.QuotaType
    createdAt?: Date | string
  }

  export type SubscriptionQuotaCreateOrConnectWithoutFeatureInput = {
    where: SubscriptionQuotaWhereUniqueInput
    create: XOR<SubscriptionQuotaCreateWithoutFeatureInput, SubscriptionQuotaUncheckedCreateWithoutFeatureInput>
  }

  export type SubscriptionQuotaCreateManyFeatureInputEnvelope = {
    data: SubscriptionQuotaCreateManyFeatureInput | SubscriptionQuotaCreateManyFeatureInput[]
    skipDuplicates?: boolean
  }

  export type UsageLogCreateWithoutFeatureInput = {
    id?: bigint | number
    used_quantity: number
    createdAt?: Date | string
    user?: SessionCreateNestedOneWithoutUsageLogInput
  }

  export type UsageLogUncheckedCreateWithoutFeatureInput = {
    id?: bigint | number
    userId: bigint | number
    used_quantity: number
    createdAt?: Date | string
  }

  export type UsageLogCreateOrConnectWithoutFeatureInput = {
    where: UsageLogWhereUniqueInput
    create: XOR<UsageLogCreateWithoutFeatureInput, UsageLogUncheckedCreateWithoutFeatureInput>
  }

  export type UsageLogCreateManyFeatureInputEnvelope = {
    data: UsageLogCreateManyFeatureInput | UsageLogCreateManyFeatureInput[]
    skipDuplicates?: boolean
  }

  export type PricingModuleFeatureUpsertWithWhereUniqueWithoutFeatureInput = {
    where: PricingModuleFeatureWhereUniqueInput
    update: XOR<PricingModuleFeatureUpdateWithoutFeatureInput, PricingModuleFeatureUncheckedUpdateWithoutFeatureInput>
    create: XOR<PricingModuleFeatureCreateWithoutFeatureInput, PricingModuleFeatureUncheckedCreateWithoutFeatureInput>
  }

  export type PricingModuleFeatureUpdateWithWhereUniqueWithoutFeatureInput = {
    where: PricingModuleFeatureWhereUniqueInput
    data: XOR<PricingModuleFeatureUpdateWithoutFeatureInput, PricingModuleFeatureUncheckedUpdateWithoutFeatureInput>
  }

  export type PricingModuleFeatureUpdateManyWithWhereWithoutFeatureInput = {
    where: PricingModuleFeatureScalarWhereInput
    data: XOR<PricingModuleFeatureUpdateManyMutationInput, PricingModuleFeatureUncheckedUpdateManyWithoutFeatureInput>
  }

  export type SubscriptionQuotaUpsertWithWhereUniqueWithoutFeatureInput = {
    where: SubscriptionQuotaWhereUniqueInput
    update: XOR<SubscriptionQuotaUpdateWithoutFeatureInput, SubscriptionQuotaUncheckedUpdateWithoutFeatureInput>
    create: XOR<SubscriptionQuotaCreateWithoutFeatureInput, SubscriptionQuotaUncheckedCreateWithoutFeatureInput>
  }

  export type SubscriptionQuotaUpdateWithWhereUniqueWithoutFeatureInput = {
    where: SubscriptionQuotaWhereUniqueInput
    data: XOR<SubscriptionQuotaUpdateWithoutFeatureInput, SubscriptionQuotaUncheckedUpdateWithoutFeatureInput>
  }

  export type SubscriptionQuotaUpdateManyWithWhereWithoutFeatureInput = {
    where: SubscriptionQuotaScalarWhereInput
    data: XOR<SubscriptionQuotaUpdateManyMutationInput, SubscriptionQuotaUncheckedUpdateManyWithoutFeatureInput>
  }

  export type UsageLogUpsertWithWhereUniqueWithoutFeatureInput = {
    where: UsageLogWhereUniqueInput
    update: XOR<UsageLogUpdateWithoutFeatureInput, UsageLogUncheckedUpdateWithoutFeatureInput>
    create: XOR<UsageLogCreateWithoutFeatureInput, UsageLogUncheckedCreateWithoutFeatureInput>
  }

  export type UsageLogUpdateWithWhereUniqueWithoutFeatureInput = {
    where: UsageLogWhereUniqueInput
    data: XOR<UsageLogUpdateWithoutFeatureInput, UsageLogUncheckedUpdateWithoutFeatureInput>
  }

  export type UsageLogUpdateManyWithWhereWithoutFeatureInput = {
    where: UsageLogScalarWhereInput
    data: XOR<UsageLogUpdateManyMutationInput, UsageLogUncheckedUpdateManyWithoutFeatureInput>
  }

  export type PricingModuleCreateWithoutFeaturesInput = {
    name: string
    key: string
    price: number
    is_default?: boolean | null
    available?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Subscription?: SubscriptionCreateNestedManyWithoutModuleInput
  }

  export type PricingModuleUncheckedCreateWithoutFeaturesInput = {
    id?: number
    name: string
    key: string
    price: number
    is_default?: boolean | null
    available?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Subscription?: SubscriptionUncheckedCreateNestedManyWithoutModuleInput
  }

  export type PricingModuleCreateOrConnectWithoutFeaturesInput = {
    where: PricingModuleWhereUniqueInput
    create: XOR<PricingModuleCreateWithoutFeaturesInput, PricingModuleUncheckedCreateWithoutFeaturesInput>
  }

  export type PricingFeatureCreateWithoutModulesInput = {
    id?: string
    name: string
    description: string
    cycle: number
    is_active?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    SubscriptionQuota?: SubscriptionQuotaCreateNestedManyWithoutFeatureInput
    UsageLog?: UsageLogCreateNestedManyWithoutFeatureInput
  }

  export type PricingFeatureUncheckedCreateWithoutModulesInput = {
    id?: string
    name: string
    description: string
    cycle: number
    is_active?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    SubscriptionQuota?: SubscriptionQuotaUncheckedCreateNestedManyWithoutFeatureInput
    UsageLog?: UsageLogUncheckedCreateNestedManyWithoutFeatureInput
  }

  export type PricingFeatureCreateOrConnectWithoutModulesInput = {
    where: PricingFeatureWhereUniqueInput
    create: XOR<PricingFeatureCreateWithoutModulesInput, PricingFeatureUncheckedCreateWithoutModulesInput>
  }

  export type PricingModuleUpsertWithoutFeaturesInput = {
    update: XOR<PricingModuleUpdateWithoutFeaturesInput, PricingModuleUncheckedUpdateWithoutFeaturesInput>
    create: XOR<PricingModuleCreateWithoutFeaturesInput, PricingModuleUncheckedCreateWithoutFeaturesInput>
    where?: PricingModuleWhereInput
  }

  export type PricingModuleUpdateToOneWithWhereWithoutFeaturesInput = {
    where?: PricingModuleWhereInput
    data: XOR<PricingModuleUpdateWithoutFeaturesInput, PricingModuleUncheckedUpdateWithoutFeaturesInput>
  }

  export type PricingModuleUpdateWithoutFeaturesInput = {
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    is_default?: NullableBoolFieldUpdateOperationsInput | boolean | null
    available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Subscription?: SubscriptionUpdateManyWithoutModuleNestedInput
  }

  export type PricingModuleUncheckedUpdateWithoutFeaturesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    is_default?: NullableBoolFieldUpdateOperationsInput | boolean | null
    available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Subscription?: SubscriptionUncheckedUpdateManyWithoutModuleNestedInput
  }

  export type PricingFeatureUpsertWithoutModulesInput = {
    update: XOR<PricingFeatureUpdateWithoutModulesInput, PricingFeatureUncheckedUpdateWithoutModulesInput>
    create: XOR<PricingFeatureCreateWithoutModulesInput, PricingFeatureUncheckedCreateWithoutModulesInput>
    where?: PricingFeatureWhereInput
  }

  export type PricingFeatureUpdateToOneWithWhereWithoutModulesInput = {
    where?: PricingFeatureWhereInput
    data: XOR<PricingFeatureUpdateWithoutModulesInput, PricingFeatureUncheckedUpdateWithoutModulesInput>
  }

  export type PricingFeatureUpdateWithoutModulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cycle?: IntFieldUpdateOperationsInput | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SubscriptionQuota?: SubscriptionQuotaUpdateManyWithoutFeatureNestedInput
    UsageLog?: UsageLogUpdateManyWithoutFeatureNestedInput
  }

  export type PricingFeatureUncheckedUpdateWithoutModulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cycle?: IntFieldUpdateOperationsInput | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SubscriptionQuota?: SubscriptionQuotaUncheckedUpdateManyWithoutFeatureNestedInput
    UsageLog?: UsageLogUncheckedUpdateManyWithoutFeatureNestedInput
  }

  export type PricingModuleCreateWithoutSubscriptionInput = {
    name: string
    key: string
    price: number
    is_default?: boolean | null
    available?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    features?: PricingModuleFeatureCreateNestedManyWithoutModuleInput
  }

  export type PricingModuleUncheckedCreateWithoutSubscriptionInput = {
    id?: number
    name: string
    key: string
    price: number
    is_default?: boolean | null
    available?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    features?: PricingModuleFeatureUncheckedCreateNestedManyWithoutModuleInput
  }

  export type PricingModuleCreateOrConnectWithoutSubscriptionInput = {
    where: PricingModuleWhereUniqueInput
    create: XOR<PricingModuleCreateWithoutSubscriptionInput, PricingModuleUncheckedCreateWithoutSubscriptionInput>
  }

  export type SessionCreateWithoutSubscriptionInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    SubscriptionQuota?: SubscriptionQuotaCreateNestedManyWithoutUserInput
    UsageLog?: UsageLogCreateNestedManyWithoutUserInput
    PaymentLog?: PaymentLogCreateNestedManyWithoutUserInput
    PlatformProduct?: PlatformProductCreateNestedManyWithoutUserInput
  }

  export type SessionUncheckedCreateWithoutSubscriptionInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    SubscriptionQuota?: SubscriptionQuotaUncheckedCreateNestedManyWithoutUserInput
    UsageLog?: UsageLogUncheckedCreateNestedManyWithoutUserInput
    PaymentLog?: PaymentLogUncheckedCreateNestedManyWithoutUserInput
    PlatformProduct?: PlatformProductUncheckedCreateNestedManyWithoutUserInput
  }

  export type SessionCreateOrConnectWithoutSubscriptionInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutSubscriptionInput, SessionUncheckedCreateWithoutSubscriptionInput>
  }

  export type PricingModuleUpsertWithoutSubscriptionInput = {
    update: XOR<PricingModuleUpdateWithoutSubscriptionInput, PricingModuleUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<PricingModuleCreateWithoutSubscriptionInput, PricingModuleUncheckedCreateWithoutSubscriptionInput>
    where?: PricingModuleWhereInput
  }

  export type PricingModuleUpdateToOneWithWhereWithoutSubscriptionInput = {
    where?: PricingModuleWhereInput
    data: XOR<PricingModuleUpdateWithoutSubscriptionInput, PricingModuleUncheckedUpdateWithoutSubscriptionInput>
  }

  export type PricingModuleUpdateWithoutSubscriptionInput = {
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    is_default?: NullableBoolFieldUpdateOperationsInput | boolean | null
    available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    features?: PricingModuleFeatureUpdateManyWithoutModuleNestedInput
  }

  export type PricingModuleUncheckedUpdateWithoutSubscriptionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    is_default?: NullableBoolFieldUpdateOperationsInput | boolean | null
    available?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    features?: PricingModuleFeatureUncheckedUpdateManyWithoutModuleNestedInput
  }

  export type SessionUpsertWithoutSubscriptionInput = {
    update: XOR<SessionUpdateWithoutSubscriptionInput, SessionUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<SessionCreateWithoutSubscriptionInput, SessionUncheckedCreateWithoutSubscriptionInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutSubscriptionInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutSubscriptionInput, SessionUncheckedUpdateWithoutSubscriptionInput>
  }

  export type SessionUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    SubscriptionQuota?: SubscriptionQuotaUpdateManyWithoutUserNestedInput
    UsageLog?: UsageLogUpdateManyWithoutUserNestedInput
    PaymentLog?: PaymentLogUpdateManyWithoutUserNestedInput
    PlatformProduct?: PlatformProductUpdateManyWithoutUserNestedInput
  }

  export type SessionUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    SubscriptionQuota?: SubscriptionQuotaUncheckedUpdateManyWithoutUserNestedInput
    UsageLog?: UsageLogUncheckedUpdateManyWithoutUserNestedInput
    PaymentLog?: PaymentLogUncheckedUpdateManyWithoutUserNestedInput
    PlatformProduct?: PlatformProductUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SessionCreateWithoutSubscriptionQuotaInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    Subscription?: SubscriptionCreateNestedManyWithoutUserInput
    UsageLog?: UsageLogCreateNestedManyWithoutUserInput
    PaymentLog?: PaymentLogCreateNestedManyWithoutUserInput
    PlatformProduct?: PlatformProductCreateNestedManyWithoutUserInput
  }

  export type SessionUncheckedCreateWithoutSubscriptionQuotaInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    Subscription?: SubscriptionUncheckedCreateNestedManyWithoutUserInput
    UsageLog?: UsageLogUncheckedCreateNestedManyWithoutUserInput
    PaymentLog?: PaymentLogUncheckedCreateNestedManyWithoutUserInput
    PlatformProduct?: PlatformProductUncheckedCreateNestedManyWithoutUserInput
  }

  export type SessionCreateOrConnectWithoutSubscriptionQuotaInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutSubscriptionQuotaInput, SessionUncheckedCreateWithoutSubscriptionQuotaInput>
  }

  export type PricingFeatureCreateWithoutSubscriptionQuotaInput = {
    id?: string
    name: string
    description: string
    cycle: number
    is_active?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    modules?: PricingModuleFeatureCreateNestedManyWithoutFeatureInput
    UsageLog?: UsageLogCreateNestedManyWithoutFeatureInput
  }

  export type PricingFeatureUncheckedCreateWithoutSubscriptionQuotaInput = {
    id?: string
    name: string
    description: string
    cycle: number
    is_active?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    modules?: PricingModuleFeatureUncheckedCreateNestedManyWithoutFeatureInput
    UsageLog?: UsageLogUncheckedCreateNestedManyWithoutFeatureInput
  }

  export type PricingFeatureCreateOrConnectWithoutSubscriptionQuotaInput = {
    where: PricingFeatureWhereUniqueInput
    create: XOR<PricingFeatureCreateWithoutSubscriptionQuotaInput, PricingFeatureUncheckedCreateWithoutSubscriptionQuotaInput>
  }

  export type SessionUpsertWithoutSubscriptionQuotaInput = {
    update: XOR<SessionUpdateWithoutSubscriptionQuotaInput, SessionUncheckedUpdateWithoutSubscriptionQuotaInput>
    create: XOR<SessionCreateWithoutSubscriptionQuotaInput, SessionUncheckedCreateWithoutSubscriptionQuotaInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutSubscriptionQuotaInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutSubscriptionQuotaInput, SessionUncheckedUpdateWithoutSubscriptionQuotaInput>
  }

  export type SessionUpdateWithoutSubscriptionQuotaInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Subscription?: SubscriptionUpdateManyWithoutUserNestedInput
    UsageLog?: UsageLogUpdateManyWithoutUserNestedInput
    PaymentLog?: PaymentLogUpdateManyWithoutUserNestedInput
    PlatformProduct?: PlatformProductUpdateManyWithoutUserNestedInput
  }

  export type SessionUncheckedUpdateWithoutSubscriptionQuotaInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Subscription?: SubscriptionUncheckedUpdateManyWithoutUserNestedInput
    UsageLog?: UsageLogUncheckedUpdateManyWithoutUserNestedInput
    PaymentLog?: PaymentLogUncheckedUpdateManyWithoutUserNestedInput
    PlatformProduct?: PlatformProductUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PricingFeatureUpsertWithoutSubscriptionQuotaInput = {
    update: XOR<PricingFeatureUpdateWithoutSubscriptionQuotaInput, PricingFeatureUncheckedUpdateWithoutSubscriptionQuotaInput>
    create: XOR<PricingFeatureCreateWithoutSubscriptionQuotaInput, PricingFeatureUncheckedCreateWithoutSubscriptionQuotaInput>
    where?: PricingFeatureWhereInput
  }

  export type PricingFeatureUpdateToOneWithWhereWithoutSubscriptionQuotaInput = {
    where?: PricingFeatureWhereInput
    data: XOR<PricingFeatureUpdateWithoutSubscriptionQuotaInput, PricingFeatureUncheckedUpdateWithoutSubscriptionQuotaInput>
  }

  export type PricingFeatureUpdateWithoutSubscriptionQuotaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cycle?: IntFieldUpdateOperationsInput | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modules?: PricingModuleFeatureUpdateManyWithoutFeatureNestedInput
    UsageLog?: UsageLogUpdateManyWithoutFeatureNestedInput
  }

  export type PricingFeatureUncheckedUpdateWithoutSubscriptionQuotaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cycle?: IntFieldUpdateOperationsInput | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modules?: PricingModuleFeatureUncheckedUpdateManyWithoutFeatureNestedInput
    UsageLog?: UsageLogUncheckedUpdateManyWithoutFeatureNestedInput
  }

  export type SessionCreateWithoutUsageLogInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    Subscription?: SubscriptionCreateNestedManyWithoutUserInput
    SubscriptionQuota?: SubscriptionQuotaCreateNestedManyWithoutUserInput
    PaymentLog?: PaymentLogCreateNestedManyWithoutUserInput
    PlatformProduct?: PlatformProductCreateNestedManyWithoutUserInput
  }

  export type SessionUncheckedCreateWithoutUsageLogInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    Subscription?: SubscriptionUncheckedCreateNestedManyWithoutUserInput
    SubscriptionQuota?: SubscriptionQuotaUncheckedCreateNestedManyWithoutUserInput
    PaymentLog?: PaymentLogUncheckedCreateNestedManyWithoutUserInput
    PlatformProduct?: PlatformProductUncheckedCreateNestedManyWithoutUserInput
  }

  export type SessionCreateOrConnectWithoutUsageLogInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUsageLogInput, SessionUncheckedCreateWithoutUsageLogInput>
  }

  export type PricingFeatureCreateWithoutUsageLogInput = {
    id?: string
    name: string
    description: string
    cycle: number
    is_active?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    modules?: PricingModuleFeatureCreateNestedManyWithoutFeatureInput
    SubscriptionQuota?: SubscriptionQuotaCreateNestedManyWithoutFeatureInput
  }

  export type PricingFeatureUncheckedCreateWithoutUsageLogInput = {
    id?: string
    name: string
    description: string
    cycle: number
    is_active?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    modules?: PricingModuleFeatureUncheckedCreateNestedManyWithoutFeatureInput
    SubscriptionQuota?: SubscriptionQuotaUncheckedCreateNestedManyWithoutFeatureInput
  }

  export type PricingFeatureCreateOrConnectWithoutUsageLogInput = {
    where: PricingFeatureWhereUniqueInput
    create: XOR<PricingFeatureCreateWithoutUsageLogInput, PricingFeatureUncheckedCreateWithoutUsageLogInput>
  }

  export type SessionUpsertWithoutUsageLogInput = {
    update: XOR<SessionUpdateWithoutUsageLogInput, SessionUncheckedUpdateWithoutUsageLogInput>
    create: XOR<SessionCreateWithoutUsageLogInput, SessionUncheckedCreateWithoutUsageLogInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutUsageLogInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutUsageLogInput, SessionUncheckedUpdateWithoutUsageLogInput>
  }

  export type SessionUpdateWithoutUsageLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Subscription?: SubscriptionUpdateManyWithoutUserNestedInput
    SubscriptionQuota?: SubscriptionQuotaUpdateManyWithoutUserNestedInput
    PaymentLog?: PaymentLogUpdateManyWithoutUserNestedInput
    PlatformProduct?: PlatformProductUpdateManyWithoutUserNestedInput
  }

  export type SessionUncheckedUpdateWithoutUsageLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Subscription?: SubscriptionUncheckedUpdateManyWithoutUserNestedInput
    SubscriptionQuota?: SubscriptionQuotaUncheckedUpdateManyWithoutUserNestedInput
    PaymentLog?: PaymentLogUncheckedUpdateManyWithoutUserNestedInput
    PlatformProduct?: PlatformProductUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PricingFeatureUpsertWithoutUsageLogInput = {
    update: XOR<PricingFeatureUpdateWithoutUsageLogInput, PricingFeatureUncheckedUpdateWithoutUsageLogInput>
    create: XOR<PricingFeatureCreateWithoutUsageLogInput, PricingFeatureUncheckedCreateWithoutUsageLogInput>
    where?: PricingFeatureWhereInput
  }

  export type PricingFeatureUpdateToOneWithWhereWithoutUsageLogInput = {
    where?: PricingFeatureWhereInput
    data: XOR<PricingFeatureUpdateWithoutUsageLogInput, PricingFeatureUncheckedUpdateWithoutUsageLogInput>
  }

  export type PricingFeatureUpdateWithoutUsageLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cycle?: IntFieldUpdateOperationsInput | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modules?: PricingModuleFeatureUpdateManyWithoutFeatureNestedInput
    SubscriptionQuota?: SubscriptionQuotaUpdateManyWithoutFeatureNestedInput
  }

  export type PricingFeatureUncheckedUpdateWithoutUsageLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cycle?: IntFieldUpdateOperationsInput | number
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modules?: PricingModuleFeatureUncheckedUpdateManyWithoutFeatureNestedInput
    SubscriptionQuota?: SubscriptionQuotaUncheckedUpdateManyWithoutFeatureNestedInput
  }

  export type SessionCreateWithoutPaymentLogInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    Subscription?: SubscriptionCreateNestedManyWithoutUserInput
    SubscriptionQuota?: SubscriptionQuotaCreateNestedManyWithoutUserInput
    UsageLog?: UsageLogCreateNestedManyWithoutUserInput
    PlatformProduct?: PlatformProductCreateNestedManyWithoutUserInput
  }

  export type SessionUncheckedCreateWithoutPaymentLogInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    Subscription?: SubscriptionUncheckedCreateNestedManyWithoutUserInput
    SubscriptionQuota?: SubscriptionQuotaUncheckedCreateNestedManyWithoutUserInput
    UsageLog?: UsageLogUncheckedCreateNestedManyWithoutUserInput
    PlatformProduct?: PlatformProductUncheckedCreateNestedManyWithoutUserInput
  }

  export type SessionCreateOrConnectWithoutPaymentLogInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutPaymentLogInput, SessionUncheckedCreateWithoutPaymentLogInput>
  }

  export type SessionUpsertWithoutPaymentLogInput = {
    update: XOR<SessionUpdateWithoutPaymentLogInput, SessionUncheckedUpdateWithoutPaymentLogInput>
    create: XOR<SessionCreateWithoutPaymentLogInput, SessionUncheckedCreateWithoutPaymentLogInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutPaymentLogInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutPaymentLogInput, SessionUncheckedUpdateWithoutPaymentLogInput>
  }

  export type SessionUpdateWithoutPaymentLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Subscription?: SubscriptionUpdateManyWithoutUserNestedInput
    SubscriptionQuota?: SubscriptionQuotaUpdateManyWithoutUserNestedInput
    UsageLog?: UsageLogUpdateManyWithoutUserNestedInput
    PlatformProduct?: PlatformProductUpdateManyWithoutUserNestedInput
  }

  export type SessionUncheckedUpdateWithoutPaymentLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Subscription?: SubscriptionUncheckedUpdateManyWithoutUserNestedInput
    SubscriptionQuota?: SubscriptionQuotaUncheckedUpdateManyWithoutUserNestedInput
    UsageLog?: UsageLogUncheckedUpdateManyWithoutUserNestedInput
    PlatformProduct?: PlatformProductUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PlatformProductCreateWithoutSourceProductInput = {
    id?: bigint | number
    platformId?: string | null
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title: string
    handle: string
    descriptionHtml?: string | null
    featuredMedia?: string | null
    createdAt?: Date | string
    user?: SessionCreateNestedOneWithoutPlatformProductInput
  }

  export type PlatformProductUncheckedCreateWithoutSourceProductInput = {
    id?: bigint | number
    platformId?: string | null
    userId: bigint | number
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title: string
    handle: string
    descriptionHtml?: string | null
    featuredMedia?: string | null
    createdAt?: Date | string
  }

  export type PlatformProductCreateOrConnectWithoutSourceProductInput = {
    where: PlatformProductWhereUniqueInput
    create: XOR<PlatformProductCreateWithoutSourceProductInput, PlatformProductUncheckedCreateWithoutSourceProductInput>
  }

  export type PlatformProductCreateManySourceProductInputEnvelope = {
    data: PlatformProductCreateManySourceProductInput | PlatformProductCreateManySourceProductInput[]
    skipDuplicates?: boolean
  }

  export type PlatformProductUpsertWithWhereUniqueWithoutSourceProductInput = {
    where: PlatformProductWhereUniqueInput
    update: XOR<PlatformProductUpdateWithoutSourceProductInput, PlatformProductUncheckedUpdateWithoutSourceProductInput>
    create: XOR<PlatformProductCreateWithoutSourceProductInput, PlatformProductUncheckedCreateWithoutSourceProductInput>
  }

  export type PlatformProductUpdateWithWhereUniqueWithoutSourceProductInput = {
    where: PlatformProductWhereUniqueInput
    data: XOR<PlatformProductUpdateWithoutSourceProductInput, PlatformProductUncheckedUpdateWithoutSourceProductInput>
  }

  export type PlatformProductUpdateManyWithWhereWithoutSourceProductInput = {
    where: PlatformProductScalarWhereInput
    data: XOR<PlatformProductUpdateManyMutationInput, PlatformProductUncheckedUpdateManyWithoutSourceProductInput>
  }

  export type SessionCreateWithoutPlatformProductInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    Subscription?: SubscriptionCreateNestedManyWithoutUserInput
    SubscriptionQuota?: SubscriptionQuotaCreateNestedManyWithoutUserInput
    UsageLog?: UsageLogCreateNestedManyWithoutUserInput
    PaymentLog?: PaymentLogCreateNestedManyWithoutUserInput
  }

  export type SessionUncheckedCreateWithoutPlatformProductInput = {
    id: string
    shop: string
    state: string
    isOnline?: boolean
    scope?: string | null
    expires?: Date | string | null
    accessToken: string
    userId?: bigint | number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    accountOwner?: boolean
    locale?: string | null
    collaborator?: boolean | null
    emailVerified?: boolean | null
    Subscription?: SubscriptionUncheckedCreateNestedManyWithoutUserInput
    SubscriptionQuota?: SubscriptionQuotaUncheckedCreateNestedManyWithoutUserInput
    UsageLog?: UsageLogUncheckedCreateNestedManyWithoutUserInput
    PaymentLog?: PaymentLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type SessionCreateOrConnectWithoutPlatformProductInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutPlatformProductInput, SessionUncheckedCreateWithoutPlatformProductInput>
  }

  export type SourceProductCreateWithoutPlatformProductInput = {
    id?: bigint | number
    title: string
    description?: string | null
    image?: string | null
    video?: string | null
    price: number
    source: $Enums.Source
    sourceUrl: string
    sourceId?: string | null
    comparePrice?: number | null
    estProfit?: number | null
    rating?: number | null
    totalRating?: number | null
    like?: number | null
    share?: number | null
    comment?: number | null
    tiktokUrl?: string | null
    status?: $Enums.SourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SourceProductUncheckedCreateWithoutPlatformProductInput = {
    id?: bigint | number
    title: string
    description?: string | null
    image?: string | null
    video?: string | null
    price: number
    source: $Enums.Source
    sourceUrl: string
    sourceId?: string | null
    comparePrice?: number | null
    estProfit?: number | null
    rating?: number | null
    totalRating?: number | null
    like?: number | null
    share?: number | null
    comment?: number | null
    tiktokUrl?: string | null
    status?: $Enums.SourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SourceProductCreateOrConnectWithoutPlatformProductInput = {
    where: SourceProductWhereUniqueInput
    create: XOR<SourceProductCreateWithoutPlatformProductInput, SourceProductUncheckedCreateWithoutPlatformProductInput>
  }

  export type SessionUpsertWithoutPlatformProductInput = {
    update: XOR<SessionUpdateWithoutPlatformProductInput, SessionUncheckedUpdateWithoutPlatformProductInput>
    create: XOR<SessionCreateWithoutPlatformProductInput, SessionUncheckedCreateWithoutPlatformProductInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutPlatformProductInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutPlatformProductInput, SessionUncheckedUpdateWithoutPlatformProductInput>
  }

  export type SessionUpdateWithoutPlatformProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Subscription?: SubscriptionUpdateManyWithoutUserNestedInput
    SubscriptionQuota?: SubscriptionQuotaUpdateManyWithoutUserNestedInput
    UsageLog?: UsageLogUpdateManyWithoutUserNestedInput
    PaymentLog?: PaymentLogUpdateManyWithoutUserNestedInput
  }

  export type SessionUncheckedUpdateWithoutPlatformProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    shop?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    accountOwner?: BoolFieldUpdateOperationsInput | boolean
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    collaborator?: NullableBoolFieldUpdateOperationsInput | boolean | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Subscription?: SubscriptionUncheckedUpdateManyWithoutUserNestedInput
    SubscriptionQuota?: SubscriptionQuotaUncheckedUpdateManyWithoutUserNestedInput
    UsageLog?: UsageLogUncheckedUpdateManyWithoutUserNestedInput
    PaymentLog?: PaymentLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SourceProductUpsertWithoutPlatformProductInput = {
    update: XOR<SourceProductUpdateWithoutPlatformProductInput, SourceProductUncheckedUpdateWithoutPlatformProductInput>
    create: XOR<SourceProductCreateWithoutPlatformProductInput, SourceProductUncheckedCreateWithoutPlatformProductInput>
    where?: SourceProductWhereInput
  }

  export type SourceProductUpdateToOneWithWhereWithoutPlatformProductInput = {
    where?: SourceProductWhereInput
    data: XOR<SourceProductUpdateWithoutPlatformProductInput, SourceProductUncheckedUpdateWithoutPlatformProductInput>
  }

  export type SourceProductUpdateWithoutPlatformProductInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    sourceUrl?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    comparePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    estProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    totalRating?: NullableIntFieldUpdateOperationsInput | number | null
    like?: NullableIntFieldUpdateOperationsInput | number | null
    share?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSourceStatusFieldUpdateOperationsInput | $Enums.SourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceProductUncheckedUpdateWithoutPlatformProductInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    sourceUrl?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    comparePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    estProfit?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    totalRating?: NullableIntFieldUpdateOperationsInput | number | null
    like?: NullableIntFieldUpdateOperationsInput | number | null
    share?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSourceStatusFieldUpdateOperationsInput | $Enums.SourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyUserInput = {
    id?: string
    start_time?: Date | string | null
    next_billing_time?: Date | string | null
    external_subscription_id: string
    status: string
    amount: number
    moduleId: number
    is_trial?: boolean | null
    is_test?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionQuotaCreateManyUserInput = {
    id?: bigint | number
    feature_id: string
    limit_quantity: number
    used_quantity: number
    type: $Enums.QuotaType
    createdAt?: Date | string
  }

  export type UsageLogCreateManyUserInput = {
    id?: bigint | number
    feature_id: string
    used_quantity: number
    createdAt?: Date | string
  }

  export type PaymentLogCreateManyUserInput = {
    id?: bigint | number
    action: string
    status?: $Enums.PaymentLogStatus
    external_transaction_id?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    createdAt?: Date | string
  }

  export type PlatformProductCreateManyUserInput = {
    id?: bigint | number
    platformId?: string | null
    sourceProductId: bigint | number
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title: string
    handle: string
    descriptionHtml?: string | null
    featuredMedia?: string | null
    createdAt?: Date | string
  }

  export type SubscriptionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    external_subscription_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    is_trial?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_test?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    module?: PricingModuleUpdateOneWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    external_subscription_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    is_trial?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_test?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    external_subscription_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    is_trial?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_test?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionQuotaUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    limit_quantity?: IntFieldUpdateOperationsInput | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumQuotaTypeFieldUpdateOperationsInput | $Enums.QuotaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feature?: PricingFeatureUpdateOneWithoutSubscriptionQuotaNestedInput
  }

  export type SubscriptionQuotaUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_id?: StringFieldUpdateOperationsInput | string
    limit_quantity?: IntFieldUpdateOperationsInput | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumQuotaTypeFieldUpdateOperationsInput | $Enums.QuotaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionQuotaUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_id?: StringFieldUpdateOperationsInput | string
    limit_quantity?: IntFieldUpdateOperationsInput | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumQuotaTypeFieldUpdateOperationsInput | $Enums.QuotaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feature?: PricingFeatureUpdateOneWithoutUsageLogNestedInput
  }

  export type UsageLogUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_id?: StringFieldUpdateOperationsInput | string
    used_quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_id?: StringFieldUpdateOperationsInput | string
    used_quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentLogUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLogStatusFieldUpdateOperationsInput | $Enums.PaymentLogStatus
    external_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentLogUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLogStatusFieldUpdateOperationsInput | $Enums.PaymentLogStatus
    external_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentLogUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLogStatusFieldUpdateOperationsInput | $Enums.PaymentLogStatus
    external_transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformProductUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    platformId?: NullableStringFieldUpdateOperationsInput | string | null
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    featuredMedia?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceProduct?: SourceProductUpdateOneWithoutPlatformProductNestedInput
  }

  export type PlatformProductUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    platformId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceProductId?: BigIntFieldUpdateOperationsInput | bigint | number
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    featuredMedia?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformProductUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    platformId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceProductId?: BigIntFieldUpdateOperationsInput | bigint | number
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    featuredMedia?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingModuleFeatureCreateManyModuleInput = {
    featureId: string
    limit_quantity: number
    cycle: number
    createdAt?: Date | string
  }

  export type SubscriptionCreateManyModuleInput = {
    id?: string
    userId: bigint | number
    start_time?: Date | string | null
    next_billing_time?: Date | string | null
    external_subscription_id: string
    status: string
    amount: number
    is_trial?: boolean | null
    is_test?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PricingModuleFeatureUpdateWithoutModuleInput = {
    limit_quantity?: IntFieldUpdateOperationsInput | number
    cycle?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feature?: PricingFeatureUpdateOneWithoutModulesNestedInput
  }

  export type PricingModuleFeatureUncheckedUpdateWithoutModuleInput = {
    featureId?: StringFieldUpdateOperationsInput | string
    limit_quantity?: IntFieldUpdateOperationsInput | number
    cycle?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingModuleFeatureUncheckedUpdateManyWithoutModuleInput = {
    featureId?: StringFieldUpdateOperationsInput | string
    limit_quantity?: IntFieldUpdateOperationsInput | number
    cycle?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUpdateWithoutModuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    external_subscription_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    is_trial?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_test?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: SessionUpdateOneWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutModuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    external_subscription_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    is_trial?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_test?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutModuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    next_billing_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    external_subscription_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    is_trial?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_test?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingModuleFeatureCreateManyFeatureInput = {
    moduleId: number
    limit_quantity: number
    cycle: number
    createdAt?: Date | string
  }

  export type SubscriptionQuotaCreateManyFeatureInput = {
    id?: bigint | number
    userId: bigint | number
    limit_quantity: number
    used_quantity: number
    type: $Enums.QuotaType
    createdAt?: Date | string
  }

  export type UsageLogCreateManyFeatureInput = {
    id?: bigint | number
    userId: bigint | number
    used_quantity: number
    createdAt?: Date | string
  }

  export type PricingModuleFeatureUpdateWithoutFeatureInput = {
    limit_quantity?: IntFieldUpdateOperationsInput | number
    cycle?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    module?: PricingModuleUpdateOneWithoutFeaturesNestedInput
  }

  export type PricingModuleFeatureUncheckedUpdateWithoutFeatureInput = {
    moduleId?: IntFieldUpdateOperationsInput | number
    limit_quantity?: IntFieldUpdateOperationsInput | number
    cycle?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingModuleFeatureUncheckedUpdateManyWithoutFeatureInput = {
    moduleId?: IntFieldUpdateOperationsInput | number
    limit_quantity?: IntFieldUpdateOperationsInput | number
    cycle?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionQuotaUpdateWithoutFeatureInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    limit_quantity?: IntFieldUpdateOperationsInput | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumQuotaTypeFieldUpdateOperationsInput | $Enums.QuotaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: SessionUpdateOneWithoutSubscriptionQuotaNestedInput
  }

  export type SubscriptionQuotaUncheckedUpdateWithoutFeatureInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    limit_quantity?: IntFieldUpdateOperationsInput | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumQuotaTypeFieldUpdateOperationsInput | $Enums.QuotaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionQuotaUncheckedUpdateManyWithoutFeatureInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    limit_quantity?: IntFieldUpdateOperationsInput | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    type?: EnumQuotaTypeFieldUpdateOperationsInput | $Enums.QuotaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUpdateWithoutFeatureInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: SessionUpdateOneWithoutUsageLogNestedInput
  }

  export type UsageLogUncheckedUpdateWithoutFeatureInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUncheckedUpdateManyWithoutFeatureInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    used_quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformProductCreateManySourceProductInput = {
    id?: bigint | number
    platformId?: string | null
    userId: bigint | number
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title: string
    handle: string
    descriptionHtml?: string | null
    featuredMedia?: string | null
    createdAt?: Date | string
  }

  export type PlatformProductUpdateWithoutSourceProductInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    platformId?: NullableStringFieldUpdateOperationsInput | string | null
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    featuredMedia?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: SessionUpdateOneWithoutPlatformProductNestedInput
  }

  export type PlatformProductUncheckedUpdateWithoutSourceProductInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    platformId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    featuredMedia?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformProductUncheckedUpdateManyWithoutSourceProductInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    platformId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    metafields?: NullableJsonNullValueInput | InputJsonValue
    title?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    descriptionHtml?: NullableStringFieldUpdateOperationsInput | string | null
    featuredMedia?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use SessionCountOutputTypeDefaultArgs instead
     */
    export type SessionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PricingModuleCountOutputTypeDefaultArgs instead
     */
    export type PricingModuleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PricingModuleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PricingFeatureCountOutputTypeDefaultArgs instead
     */
    export type PricingFeatureCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PricingFeatureCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SourceProductCountOutputTypeDefaultArgs instead
     */
    export type SourceProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SourceProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PricingModuleDefaultArgs instead
     */
    export type PricingModuleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PricingModuleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PricingFeatureDefaultArgs instead
     */
    export type PricingFeatureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PricingFeatureDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PricingModuleFeatureDefaultArgs instead
     */
    export type PricingModuleFeatureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PricingModuleFeatureDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SubscriptionDefaultArgs instead
     */
    export type SubscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SubscriptionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SubscriptionQuotaDefaultArgs instead
     */
    export type SubscriptionQuotaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SubscriptionQuotaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UsageLogDefaultArgs instead
     */
    export type UsageLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UsageLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentLogDefaultArgs instead
     */
    export type PaymentLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SourceProductDefaultArgs instead
     */
    export type SourceProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SourceProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SourceCategoryDefaultArgs instead
     */
    export type SourceCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SourceCategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlatformProductDefaultArgs instead
     */
    export type PlatformProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlatformProductDefaultArgs<ExtArgs>

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