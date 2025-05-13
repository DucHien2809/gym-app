
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Membership
 * 
 */
export type Membership = $Result.DefaultSelection<Prisma.$MembershipPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model Attendance
 * 
 */
export type Attendance = $Result.DefaultSelection<Prisma.$AttendancePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.membership`: Exposes CRUD operations for the **Membership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Memberships
    * const memberships = await prisma.membership.findMany()
    * ```
    */
  get membership(): Prisma.MembershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendance`: Exposes CRUD operations for the **Attendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendances
    * const attendances = await prisma.attendance.findMany()
    * ```
    */
  get attendance(): Prisma.AttendanceDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    User: 'User',
    Membership: 'Membership',
    Subscription: 'Subscription',
    Attendance: 'Attendance'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "membership" | "subscription" | "attendance"
      txIsolationLevel: never
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Membership: {
        payload: Prisma.$MembershipPayload<ExtArgs>
        fields: Prisma.MembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          findFirst: {
            args: Prisma.MembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          findMany: {
            args: Prisma.MembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>[]
          }
          create: {
            args: Prisma.MembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          createMany: {
            args: Prisma.MembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          update: {
            args: Prisma.MembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          deleteMany: {
            args: Prisma.MembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          aggregate: {
            args: Prisma.MembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMembership>
          }
          groupBy: {
            args: Prisma.MembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<MembershipGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MembershipFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MembershipAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MembershipCountArgs<ExtArgs>
            result: $Utils.Optional<MembershipCountAggregateOutputType> | number
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
          findRaw: {
            args: Prisma.SubscriptionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SubscriptionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Attendance: {
        payload: Prisma.$AttendancePayload<ExtArgs>
        fields: Prisma.AttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findFirst: {
            args: Prisma.AttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findMany: {
            args: Prisma.AttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          create: {
            args: Prisma.AttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          createMany: {
            args: Prisma.AttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          update: {
            args: Prisma.AttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          deleteMany: {
            args: Prisma.AttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          aggregate: {
            args: Prisma.AttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendance>
          }
          groupBy: {
            args: Prisma.AttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AttendanceFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AttendanceAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
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
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    membership?: MembershipOmit
    subscription?: SubscriptionOmit
    attendance?: AttendanceOmit
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
    | 'updateManyAndReturn'
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    subscriptions: number
    attendances: number
    createdSubscriptions: number
    createdAttendances: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | UserCountOutputTypeCountSubscriptionsArgs
    attendances?: boolean | UserCountOutputTypeCountAttendancesArgs
    createdSubscriptions?: boolean | UserCountOutputTypeCountCreatedSubscriptionsArgs
    createdAttendances?: boolean | UserCountOutputTypeCountCreatedAttendancesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAttendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedAttendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
  }


  /**
   * Count Type MembershipCountOutputType
   */

  export type MembershipCountOutputType = {
    subscriptions: number
  }

  export type MembershipCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | MembershipCountOutputTypeCountSubscriptionsArgs
  }

  // Custom InputTypes
  /**
   * MembershipCountOutputType without action
   */
  export type MembershipCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MembershipCountOutputType
     */
    select?: MembershipCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MembershipCountOutputType without action
   */
  export type MembershipCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    phone: string | null
    address: string | null
    dateOfBirth: Date | null
    profileImage: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    phone: string | null
    address: string | null
    dateOfBirth: Date | null
    profileImage: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    phone: number
    address: number
    dateOfBirth: number
    profileImage: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    phone?: true
    address?: true
    dateOfBirth?: true
    profileImage?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    phone?: true
    address?: true
    dateOfBirth?: true
    profileImage?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    phone?: true
    address?: true
    dateOfBirth?: true
    profileImage?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: string
    phone: string | null
    address: string | null
    dateOfBirth: Date | null
    profileImage: string | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone?: boolean
    address?: boolean
    dateOfBirth?: boolean
    profileImage?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptions?: boolean | User$subscriptionsArgs<ExtArgs>
    attendances?: boolean | User$attendancesArgs<ExtArgs>
    createdSubscriptions?: boolean | User$createdSubscriptionsArgs<ExtArgs>
    createdAttendances?: boolean | User$createdAttendancesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone?: boolean
    address?: boolean
    dateOfBirth?: boolean
    profileImage?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "phone" | "address" | "dateOfBirth" | "profileImage" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | User$subscriptionsArgs<ExtArgs>
    attendances?: boolean | User$attendancesArgs<ExtArgs>
    createdSubscriptions?: boolean | User$createdSubscriptionsArgs<ExtArgs>
    createdAttendances?: boolean | User$createdAttendancesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      attendances: Prisma.$AttendancePayload<ExtArgs>[]
      createdSubscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      createdAttendances: Prisma.$AttendancePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: string
      phone: string | null
      address: string | null
      dateOfBirth: Date | null
      profileImage: string | null
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscriptions<T extends User$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, User$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attendances<T extends User$attendancesArgs<ExtArgs> = {}>(args?: Subset<T, User$attendancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdSubscriptions<T extends User$createdSubscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdSubscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdAttendances<T extends User$createdAttendancesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdAttendancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly dateOfBirth: FieldRef<"User", 'DateTime'>
    readonly profileImage: FieldRef<"User", 'String'>
    readonly active: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.subscriptions
   */
  export type User$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
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
   * User.attendances
   */
  export type User$attendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    cursor?: AttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * User.createdSubscriptions
   */
  export type User$createdSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
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
   * User.createdAttendances
   */
  export type User$createdAttendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    cursor?: AttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Membership
   */

  export type AggregateMembership = {
    _count: MembershipCountAggregateOutputType | null
    _avg: MembershipAvgAggregateOutputType | null
    _sum: MembershipSumAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  export type MembershipAvgAggregateOutputType = {
    duration: number | null
    price: number | null
  }

  export type MembershipSumAggregateOutputType = {
    duration: number | null
    price: number | null
  }

  export type MembershipMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    duration: number | null
    price: number | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MembershipMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    duration: number | null
    price: number | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MembershipCountAggregateOutputType = {
    id: number
    name: number
    description: number
    duration: number
    price: number
    features: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MembershipAvgAggregateInputType = {
    duration?: true
    price?: true
  }

  export type MembershipSumAggregateInputType = {
    duration?: true
    price?: true
  }

  export type MembershipMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    duration?: true
    price?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MembershipMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    duration?: true
    price?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MembershipCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    duration?: true
    price?: true
    features?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Membership to aggregate.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Memberships
    **/
    _count?: true | MembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MembershipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MembershipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MembershipMaxAggregateInputType
  }

  export type GetMembershipAggregateType<T extends MembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMembership[P]>
      : GetScalarType<T[P], AggregateMembership[P]>
  }




  export type MembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithAggregationInput | MembershipOrderByWithAggregationInput[]
    by: MembershipScalarFieldEnum[] | MembershipScalarFieldEnum
    having?: MembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MembershipCountAggregateInputType | true
    _avg?: MembershipAvgAggregateInputType
    _sum?: MembershipSumAggregateInputType
    _min?: MembershipMinAggregateInputType
    _max?: MembershipMaxAggregateInputType
  }

  export type MembershipGroupByOutputType = {
    id: string
    name: string
    description: string
    duration: number
    price: number
    features: string[]
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: MembershipCountAggregateOutputType | null
    _avg: MembershipAvgAggregateOutputType | null
    _sum: MembershipSumAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  type GetMembershipGroupByPayload<T extends MembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MembershipGroupByOutputType[P]>
            : GetScalarType<T[P], MembershipGroupByOutputType[P]>
        }
      >
    >


  export type MembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    duration?: boolean
    price?: boolean
    features?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptions?: boolean | Membership$subscriptionsArgs<ExtArgs>
    _count?: boolean | MembershipCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membership"]>



  export type MembershipSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    duration?: boolean
    price?: boolean
    features?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MembershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "duration" | "price" | "features" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["membership"]>
  export type MembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | Membership$subscriptionsArgs<ExtArgs>
    _count?: boolean | MembershipCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Membership"
    objects: {
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      duration: number
      price: number
      features: string[]
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["membership"]>
    composites: {}
  }

  type MembershipGetPayload<S extends boolean | null | undefined | MembershipDefaultArgs> = $Result.GetResult<Prisma.$MembershipPayload, S>

  type MembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MembershipCountAggregateInputType | true
    }

  export interface MembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Membership'], meta: { name: 'Membership' } }
    /**
     * Find zero or one Membership that matches the filter.
     * @param {MembershipFindUniqueArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MembershipFindUniqueArgs>(args: SelectSubset<T, MembershipFindUniqueArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Membership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MembershipFindUniqueOrThrowArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, MembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Membership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MembershipFindFirstArgs>(args?: SelectSubset<T, MembershipFindFirstArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Membership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstOrThrowArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, MembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Memberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Memberships
     * const memberships = await prisma.membership.findMany()
     * 
     * // Get first 10 Memberships
     * const memberships = await prisma.membership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const membershipWithIdOnly = await prisma.membership.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MembershipFindManyArgs>(args?: SelectSubset<T, MembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Membership.
     * @param {MembershipCreateArgs} args - Arguments to create a Membership.
     * @example
     * // Create one Membership
     * const Membership = await prisma.membership.create({
     *   data: {
     *     // ... data to create a Membership
     *   }
     * })
     * 
     */
    create<T extends MembershipCreateArgs>(args: SelectSubset<T, MembershipCreateArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Memberships.
     * @param {MembershipCreateManyArgs} args - Arguments to create many Memberships.
     * @example
     * // Create many Memberships
     * const membership = await prisma.membership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MembershipCreateManyArgs>(args?: SelectSubset<T, MembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Membership.
     * @param {MembershipDeleteArgs} args - Arguments to delete one Membership.
     * @example
     * // Delete one Membership
     * const Membership = await prisma.membership.delete({
     *   where: {
     *     // ... filter to delete one Membership
     *   }
     * })
     * 
     */
    delete<T extends MembershipDeleteArgs>(args: SelectSubset<T, MembershipDeleteArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Membership.
     * @param {MembershipUpdateArgs} args - Arguments to update one Membership.
     * @example
     * // Update one Membership
     * const membership = await prisma.membership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MembershipUpdateArgs>(args: SelectSubset<T, MembershipUpdateArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Memberships.
     * @param {MembershipDeleteManyArgs} args - Arguments to filter Memberships to delete.
     * @example
     * // Delete a few Memberships
     * const { count } = await prisma.membership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MembershipDeleteManyArgs>(args?: SelectSubset<T, MembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Memberships
     * const membership = await prisma.membership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MembershipUpdateManyArgs>(args: SelectSubset<T, MembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Membership.
     * @param {MembershipUpsertArgs} args - Arguments to update or create a Membership.
     * @example
     * // Update or create a Membership
     * const membership = await prisma.membership.upsert({
     *   create: {
     *     // ... data to create a Membership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Membership we want to update
     *   }
     * })
     */
    upsert<T extends MembershipUpsertArgs>(args: SelectSubset<T, MembershipUpsertArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Memberships that matches the filter.
     * @param {MembershipFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const membership = await prisma.membership.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MembershipFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Membership.
     * @param {MembershipAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const membership = await prisma.membership.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MembershipAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipCountArgs} args - Arguments to filter Memberships to count.
     * @example
     * // Count the number of Memberships
     * const count = await prisma.membership.count({
     *   where: {
     *     // ... the filter for the Memberships we want to count
     *   }
     * })
    **/
    count<T extends MembershipCountArgs>(
      args?: Subset<T, MembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MembershipAggregateArgs>(args: Subset<T, MembershipAggregateArgs>): Prisma.PrismaPromise<GetMembershipAggregateType<T>>

    /**
     * Group by Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipGroupByArgs} args - Group by arguments.
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
      T extends MembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MembershipGroupByArgs['orderBy'] }
        : { orderBy?: MembershipGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Membership model
   */
  readonly fields: MembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Membership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscriptions<T extends Membership$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Membership$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Membership model
   */
  interface MembershipFieldRefs {
    readonly id: FieldRef<"Membership", 'String'>
    readonly name: FieldRef<"Membership", 'String'>
    readonly description: FieldRef<"Membership", 'String'>
    readonly duration: FieldRef<"Membership", 'Int'>
    readonly price: FieldRef<"Membership", 'Float'>
    readonly features: FieldRef<"Membership", 'String[]'>
    readonly active: FieldRef<"Membership", 'Boolean'>
    readonly createdAt: FieldRef<"Membership", 'DateTime'>
    readonly updatedAt: FieldRef<"Membership", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Membership findUnique
   */
  export type MembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership findUniqueOrThrow
   */
  export type MembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership findFirst
   */
  export type MembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     */
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership findFirstOrThrow
   */
  export type MembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     */
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership findMany
   */
  export type MembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Memberships to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership create
   */
  export type MembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a Membership.
     */
    data: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
  }

  /**
   * Membership createMany
   */
  export type MembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Memberships.
     */
    data: MembershipCreateManyInput | MembershipCreateManyInput[]
  }

  /**
   * Membership update
   */
  export type MembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a Membership.
     */
    data: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
    /**
     * Choose, which Membership to update.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership updateMany
   */
  export type MembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Memberships.
     */
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyInput>
    /**
     * Filter which Memberships to update
     */
    where?: MembershipWhereInput
    /**
     * Limit how many Memberships to update.
     */
    limit?: number
  }

  /**
   * Membership upsert
   */
  export type MembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the Membership to update in case it exists.
     */
    where: MembershipWhereUniqueInput
    /**
     * In case the Membership found by the `where` argument doesn't exist, create a new Membership with this data.
     */
    create: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
    /**
     * In case the Membership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
  }

  /**
   * Membership delete
   */
  export type MembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter which Membership to delete.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership deleteMany
   */
  export type MembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memberships to delete
     */
    where?: MembershipWhereInput
    /**
     * Limit how many Memberships to delete.
     */
    limit?: number
  }

  /**
   * Membership findRaw
   */
  export type MembershipFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Membership aggregateRaw
   */
  export type MembershipAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Membership.subscriptions
   */
  export type Membership$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
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
   * Membership without action
   */
  export type MembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
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
    paymentAmount: number | null
  }

  export type SubscriptionSumAggregateOutputType = {
    paymentAmount: number | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    memberId: string | null
    membershipId: string | null
    startDate: Date | null
    endDate: Date | null
    paymentStatus: string | null
    paymentAmount: number | null
    paymentDate: Date | null
    paymentMethod: string | null
    active: boolean | null
    notes: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    memberId: string | null
    membershipId: string | null
    startDate: Date | null
    endDate: Date | null
    paymentStatus: string | null
    paymentAmount: number | null
    paymentDate: Date | null
    paymentMethod: string | null
    active: boolean | null
    notes: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    memberId: number
    membershipId: number
    startDate: number
    endDate: number
    paymentStatus: number
    paymentAmount: number
    paymentDate: number
    paymentMethod: number
    active: number
    notes: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionAvgAggregateInputType = {
    paymentAmount?: true
  }

  export type SubscriptionSumAggregateInputType = {
    paymentAmount?: true
  }

  export type SubscriptionMinAggregateInputType = {
    id?: true
    memberId?: true
    membershipId?: true
    startDate?: true
    endDate?: true
    paymentStatus?: true
    paymentAmount?: true
    paymentDate?: true
    paymentMethod?: true
    active?: true
    notes?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    memberId?: true
    membershipId?: true
    startDate?: true
    endDate?: true
    paymentStatus?: true
    paymentAmount?: true
    paymentDate?: true
    paymentMethod?: true
    active?: true
    notes?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    memberId?: true
    membershipId?: true
    startDate?: true
    endDate?: true
    paymentStatus?: true
    paymentAmount?: true
    paymentDate?: true
    paymentMethod?: true
    active?: true
    notes?: true
    createdById?: true
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
    memberId: string
    membershipId: string
    startDate: Date
    endDate: Date
    paymentStatus: string
    paymentAmount: number
    paymentDate: Date | null
    paymentMethod: string
    active: boolean
    notes: string | null
    createdById: string | null
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
    memberId?: boolean
    membershipId?: boolean
    startDate?: boolean
    endDate?: boolean
    paymentStatus?: boolean
    paymentAmount?: boolean
    paymentDate?: boolean
    paymentMethod?: boolean
    active?: boolean
    notes?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | UserDefaultArgs<ExtArgs>
    membership?: boolean | MembershipDefaultArgs<ExtArgs>
    createdBy?: boolean | Subscription$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>



  export type SubscriptionSelectScalar = {
    id?: boolean
    memberId?: boolean
    membershipId?: boolean
    startDate?: boolean
    endDate?: boolean
    paymentStatus?: boolean
    paymentAmount?: boolean
    paymentDate?: boolean
    paymentMethod?: boolean
    active?: boolean
    notes?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "memberId" | "membershipId" | "startDate" | "endDate" | "paymentStatus" | "paymentAmount" | "paymentDate" | "paymentMethod" | "active" | "notes" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | UserDefaultArgs<ExtArgs>
    membership?: boolean | MembershipDefaultArgs<ExtArgs>
    createdBy?: boolean | Subscription$createdByArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      member: Prisma.$UserPayload<ExtArgs>
      membership: Prisma.$MembershipPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberId: string
      membershipId: string
      startDate: Date
      endDate: Date
      paymentStatus: string
      paymentAmount: number
      paymentDate: Date | null
      paymentMethod: string
      active: boolean
      notes: string | null
      createdById: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * @param {SubscriptionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const subscription = await prisma.subscription.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SubscriptionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Subscription.
     * @param {SubscriptionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const subscription = await prisma.subscription.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SubscriptionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


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
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    membership<T extends MembershipDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MembershipDefaultArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends Subscription$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Subscription$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
    readonly memberId: FieldRef<"Subscription", 'String'>
    readonly membershipId: FieldRef<"Subscription", 'String'>
    readonly startDate: FieldRef<"Subscription", 'DateTime'>
    readonly endDate: FieldRef<"Subscription", 'DateTime'>
    readonly paymentStatus: FieldRef<"Subscription", 'String'>
    readonly paymentAmount: FieldRef<"Subscription", 'Float'>
    readonly paymentDate: FieldRef<"Subscription", 'DateTime'>
    readonly paymentMethod: FieldRef<"Subscription", 'String'>
    readonly active: FieldRef<"Subscription", 'Boolean'>
    readonly notes: FieldRef<"Subscription", 'String'>
    readonly createdById: FieldRef<"Subscription", 'String'>
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
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
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
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
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
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
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
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
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
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
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
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
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
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
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
    /**
     * Limit how many Subscriptions to update.
     */
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
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
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
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
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
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription findRaw
   */
  export type SubscriptionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Subscription aggregateRaw
   */
  export type SubscriptionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Subscription.createdBy
   */
  export type Subscription$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
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
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Attendance
   */

  export type AggregateAttendance = {
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  export type AttendanceAvgAggregateOutputType = {
    duration: number | null
  }

  export type AttendanceSumAggregateOutputType = {
    duration: number | null
  }

  export type AttendanceMinAggregateOutputType = {
    id: string | null
    memberId: string | null
    checkInTime: Date | null
    checkOutTime: Date | null
    duration: number | null
    notes: string | null
    createdById: string | null
    createdAt: Date | null
  }

  export type AttendanceMaxAggregateOutputType = {
    id: string | null
    memberId: string | null
    checkInTime: Date | null
    checkOutTime: Date | null
    duration: number | null
    notes: string | null
    createdById: string | null
    createdAt: Date | null
  }

  export type AttendanceCountAggregateOutputType = {
    id: number
    memberId: number
    checkInTime: number
    checkOutTime: number
    duration: number
    notes: number
    createdById: number
    createdAt: number
    _all: number
  }


  export type AttendanceAvgAggregateInputType = {
    duration?: true
  }

  export type AttendanceSumAggregateInputType = {
    duration?: true
  }

  export type AttendanceMinAggregateInputType = {
    id?: true
    memberId?: true
    checkInTime?: true
    checkOutTime?: true
    duration?: true
    notes?: true
    createdById?: true
    createdAt?: true
  }

  export type AttendanceMaxAggregateInputType = {
    id?: true
    memberId?: true
    checkInTime?: true
    checkOutTime?: true
    duration?: true
    notes?: true
    createdById?: true
    createdAt?: true
  }

  export type AttendanceCountAggregateInputType = {
    id?: true
    memberId?: true
    checkInTime?: true
    checkOutTime?: true
    duration?: true
    notes?: true
    createdById?: true
    createdAt?: true
    _all?: true
  }

  export type AttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendance to aggregate.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attendances
    **/
    _count?: true | AttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceMaxAggregateInputType
  }

  export type GetAttendanceAggregateType<T extends AttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendance[P]>
      : GetScalarType<T[P], AggregateAttendance[P]>
  }




  export type AttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithAggregationInput | AttendanceOrderByWithAggregationInput[]
    by: AttendanceScalarFieldEnum[] | AttendanceScalarFieldEnum
    having?: AttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceCountAggregateInputType | true
    _avg?: AttendanceAvgAggregateInputType
    _sum?: AttendanceSumAggregateInputType
    _min?: AttendanceMinAggregateInputType
    _max?: AttendanceMaxAggregateInputType
  }

  export type AttendanceGroupByOutputType = {
    id: string
    memberId: string
    checkInTime: Date
    checkOutTime: Date | null
    duration: number | null
    notes: string | null
    createdById: string | null
    createdAt: Date
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  type GetAttendanceGroupByPayload<T extends AttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    checkInTime?: boolean
    checkOutTime?: boolean
    duration?: boolean
    notes?: boolean
    createdById?: boolean
    createdAt?: boolean
    member?: boolean | UserDefaultArgs<ExtArgs>
    createdBy?: boolean | Attendance$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>



  export type AttendanceSelectScalar = {
    id?: boolean
    memberId?: boolean
    checkInTime?: boolean
    checkOutTime?: boolean
    duration?: boolean
    notes?: boolean
    createdById?: boolean
    createdAt?: boolean
  }

  export type AttendanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "memberId" | "checkInTime" | "checkOutTime" | "duration" | "notes" | "createdById" | "createdAt", ExtArgs["result"]["attendance"]>
  export type AttendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | UserDefaultArgs<ExtArgs>
    createdBy?: boolean | Attendance$createdByArgs<ExtArgs>
  }

  export type $AttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attendance"
    objects: {
      member: Prisma.$UserPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberId: string
      checkInTime: Date
      checkOutTime: Date | null
      duration: number | null
      notes: string | null
      createdById: string | null
      createdAt: Date
    }, ExtArgs["result"]["attendance"]>
    composites: {}
  }

  type AttendanceGetPayload<S extends boolean | null | undefined | AttendanceDefaultArgs> = $Result.GetResult<Prisma.$AttendancePayload, S>

  type AttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttendanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendanceCountAggregateInputType | true
    }

  export interface AttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attendance'], meta: { name: 'Attendance' } }
    /**
     * Find zero or one Attendance that matches the filter.
     * @param {AttendanceFindUniqueArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceFindUniqueArgs>(args: SelectSubset<T, AttendanceFindUniqueArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attendance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendanceFindUniqueOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceFindFirstArgs>(args?: SelectSubset<T, AttendanceFindFirstArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendances
     * const attendances = await prisma.attendance.findMany()
     * 
     * // Get first 10 Attendances
     * const attendances = await prisma.attendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceWithIdOnly = await prisma.attendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceFindManyArgs>(args?: SelectSubset<T, AttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attendance.
     * @param {AttendanceCreateArgs} args - Arguments to create a Attendance.
     * @example
     * // Create one Attendance
     * const Attendance = await prisma.attendance.create({
     *   data: {
     *     // ... data to create a Attendance
     *   }
     * })
     * 
     */
    create<T extends AttendanceCreateArgs>(args: SelectSubset<T, AttendanceCreateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attendances.
     * @param {AttendanceCreateManyArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceCreateManyArgs>(args?: SelectSubset<T, AttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Attendance.
     * @param {AttendanceDeleteArgs} args - Arguments to delete one Attendance.
     * @example
     * // Delete one Attendance
     * const Attendance = await prisma.attendance.delete({
     *   where: {
     *     // ... filter to delete one Attendance
     *   }
     * })
     * 
     */
    delete<T extends AttendanceDeleteArgs>(args: SelectSubset<T, AttendanceDeleteArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attendance.
     * @param {AttendanceUpdateArgs} args - Arguments to update one Attendance.
     * @example
     * // Update one Attendance
     * const attendance = await prisma.attendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceUpdateArgs>(args: SelectSubset<T, AttendanceUpdateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attendances.
     * @param {AttendanceDeleteManyArgs} args - Arguments to filter Attendances to delete.
     * @example
     * // Delete a few Attendances
     * const { count } = await prisma.attendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceDeleteManyArgs>(args?: SelectSubset<T, AttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceUpdateManyArgs>(args: SelectSubset<T, AttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attendance.
     * @param {AttendanceUpsertArgs} args - Arguments to update or create a Attendance.
     * @example
     * // Update or create a Attendance
     * const attendance = await prisma.attendance.upsert({
     *   create: {
     *     // ... data to create a Attendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendance we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceUpsertArgs>(args: SelectSubset<T, AttendanceUpsertArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendances that matches the filter.
     * @param {AttendanceFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const attendance = await prisma.attendance.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AttendanceFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Attendance.
     * @param {AttendanceAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const attendance = await prisma.attendance.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AttendanceAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceCountArgs} args - Arguments to filter Attendances to count.
     * @example
     * // Count the number of Attendances
     * const count = await prisma.attendance.count({
     *   where: {
     *     // ... the filter for the Attendances we want to count
     *   }
     * })
    **/
    count<T extends AttendanceCountArgs>(
      args?: Subset<T, AttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AttendanceAggregateArgs>(args: Subset<T, AttendanceAggregateArgs>): Prisma.PrismaPromise<GetAttendanceAggregateType<T>>

    /**
     * Group by Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceGroupByArgs} args - Group by arguments.
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
      T extends AttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attendance model
   */
  readonly fields: AttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends Attendance$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Attendance$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Attendance model
   */
  interface AttendanceFieldRefs {
    readonly id: FieldRef<"Attendance", 'String'>
    readonly memberId: FieldRef<"Attendance", 'String'>
    readonly checkInTime: FieldRef<"Attendance", 'DateTime'>
    readonly checkOutTime: FieldRef<"Attendance", 'DateTime'>
    readonly duration: FieldRef<"Attendance", 'Int'>
    readonly notes: FieldRef<"Attendance", 'String'>
    readonly createdById: FieldRef<"Attendance", 'String'>
    readonly createdAt: FieldRef<"Attendance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Attendance findUnique
   */
  export type AttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findUniqueOrThrow
   */
  export type AttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findFirst
   */
  export type AttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findFirstOrThrow
   */
  export type AttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findMany
   */
  export type AttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance create
   */
  export type AttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Attendance.
     */
    data: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
  }

  /**
   * Attendance createMany
   */
  export type AttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
  }

  /**
   * Attendance update
   */
  export type AttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Attendance.
     */
    data: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
    /**
     * Choose, which Attendance to update.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance updateMany
   */
  export type AttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to update.
     */
    limit?: number
  }

  /**
   * Attendance upsert
   */
  export type AttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Attendance to update in case it exists.
     */
    where: AttendanceWhereUniqueInput
    /**
     * In case the Attendance found by the `where` argument doesn't exist, create a new Attendance with this data.
     */
    create: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
    /**
     * In case the Attendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
  }

  /**
   * Attendance delete
   */
  export type AttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter which Attendance to delete.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance deleteMany
   */
  export type AttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendances to delete
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to delete.
     */
    limit?: number
  }

  /**
   * Attendance findRaw
   */
  export type AttendanceFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Attendance aggregateRaw
   */
  export type AttendanceAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Attendance.createdBy
   */
  export type Attendance$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Attendance without action
   */
  export type AttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    phone: 'phone',
    address: 'address',
    dateOfBirth: 'dateOfBirth',
    profileImage: 'profileImage',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MembershipScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    duration: 'duration',
    price: 'price',
    features: 'features',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MembershipScalarFieldEnum = (typeof MembershipScalarFieldEnum)[keyof typeof MembershipScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    membershipId: 'membershipId',
    startDate: 'startDate',
    endDate: 'endDate',
    paymentStatus: 'paymentStatus',
    paymentAmount: 'paymentAmount',
    paymentDate: 'paymentDate',
    paymentMethod: 'paymentMethod',
    active: 'active',
    notes: 'notes',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const AttendanceScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    checkInTime: 'checkInTime',
    checkOutTime: 'checkOutTime',
    duration: 'duration',
    notes: 'notes',
    createdById: 'createdById',
    createdAt: 'createdAt'
  };

  export type AttendanceScalarFieldEnum = (typeof AttendanceScalarFieldEnum)[keyof typeof AttendanceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    profileImage?: StringNullableFilter<"User"> | string | null
    active?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    subscriptions?: SubscriptionListRelationFilter
    attendances?: AttendanceListRelationFilter
    createdSubscriptions?: SubscriptionListRelationFilter
    createdAttendances?: AttendanceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    dateOfBirth?: SortOrder
    profileImage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptions?: SubscriptionOrderByRelationAggregateInput
    attendances?: AttendanceOrderByRelationAggregateInput
    createdSubscriptions?: SubscriptionOrderByRelationAggregateInput
    createdAttendances?: AttendanceOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    profileImage?: StringNullableFilter<"User"> | string | null
    active?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    subscriptions?: SubscriptionListRelationFilter
    attendances?: AttendanceListRelationFilter
    createdSubscriptions?: SubscriptionListRelationFilter
    createdAttendances?: AttendanceListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    dateOfBirth?: SortOrder
    profileImage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    address?: StringNullableWithAggregatesFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    profileImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    active?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MembershipWhereInput = {
    AND?: MembershipWhereInput | MembershipWhereInput[]
    OR?: MembershipWhereInput[]
    NOT?: MembershipWhereInput | MembershipWhereInput[]
    id?: StringFilter<"Membership"> | string
    name?: StringFilter<"Membership"> | string
    description?: StringFilter<"Membership"> | string
    duration?: IntFilter<"Membership"> | number
    price?: FloatFilter<"Membership"> | number
    features?: StringNullableListFilter<"Membership">
    active?: BoolFilter<"Membership"> | boolean
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    updatedAt?: DateTimeFilter<"Membership"> | Date | string
    subscriptions?: SubscriptionListRelationFilter
  }

  export type MembershipOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    features?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptions?: SubscriptionOrderByRelationAggregateInput
  }

  export type MembershipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: MembershipWhereInput | MembershipWhereInput[]
    OR?: MembershipWhereInput[]
    NOT?: MembershipWhereInput | MembershipWhereInput[]
    description?: StringFilter<"Membership"> | string
    duration?: IntFilter<"Membership"> | number
    price?: FloatFilter<"Membership"> | number
    features?: StringNullableListFilter<"Membership">
    active?: BoolFilter<"Membership"> | boolean
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    updatedAt?: DateTimeFilter<"Membership"> | Date | string
    subscriptions?: SubscriptionListRelationFilter
  }, "id" | "name">

  export type MembershipOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    features?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MembershipCountOrderByAggregateInput
    _avg?: MembershipAvgOrderByAggregateInput
    _max?: MembershipMaxOrderByAggregateInput
    _min?: MembershipMinOrderByAggregateInput
    _sum?: MembershipSumOrderByAggregateInput
  }

  export type MembershipScalarWhereWithAggregatesInput = {
    AND?: MembershipScalarWhereWithAggregatesInput | MembershipScalarWhereWithAggregatesInput[]
    OR?: MembershipScalarWhereWithAggregatesInput[]
    NOT?: MembershipScalarWhereWithAggregatesInput | MembershipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Membership"> | string
    name?: StringWithAggregatesFilter<"Membership"> | string
    description?: StringWithAggregatesFilter<"Membership"> | string
    duration?: IntWithAggregatesFilter<"Membership"> | number
    price?: FloatWithAggregatesFilter<"Membership"> | number
    features?: StringNullableListFilter<"Membership">
    active?: BoolWithAggregatesFilter<"Membership"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Membership"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Membership"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    memberId?: StringFilter<"Subscription"> | string
    membershipId?: StringFilter<"Subscription"> | string
    startDate?: DateTimeFilter<"Subscription"> | Date | string
    endDate?: DateTimeFilter<"Subscription"> | Date | string
    paymentStatus?: StringFilter<"Subscription"> | string
    paymentAmount?: FloatFilter<"Subscription"> | number
    paymentDate?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    paymentMethod?: StringFilter<"Subscription"> | string
    active?: BoolFilter<"Subscription"> | boolean
    notes?: StringNullableFilter<"Subscription"> | string | null
    createdById?: StringNullableFilter<"Subscription"> | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    member?: XOR<UserScalarRelationFilter, UserWhereInput>
    membership?: XOR<MembershipScalarRelationFilter, MembershipWhereInput>
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    membershipId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    paymentStatus?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    active?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    member?: UserOrderByWithRelationInput
    membership?: MembershipOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    memberId?: StringFilter<"Subscription"> | string
    membershipId?: StringFilter<"Subscription"> | string
    startDate?: DateTimeFilter<"Subscription"> | Date | string
    endDate?: DateTimeFilter<"Subscription"> | Date | string
    paymentStatus?: StringFilter<"Subscription"> | string
    paymentAmount?: FloatFilter<"Subscription"> | number
    paymentDate?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    paymentMethod?: StringFilter<"Subscription"> | string
    active?: BoolFilter<"Subscription"> | boolean
    notes?: StringNullableFilter<"Subscription"> | string | null
    createdById?: StringNullableFilter<"Subscription"> | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    member?: XOR<UserScalarRelationFilter, UserWhereInput>
    membership?: XOR<MembershipScalarRelationFilter, MembershipWhereInput>
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    membershipId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    paymentStatus?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    active?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
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
    memberId?: StringWithAggregatesFilter<"Subscription"> | string
    membershipId?: StringWithAggregatesFilter<"Subscription"> | string
    startDate?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    paymentStatus?: StringWithAggregatesFilter<"Subscription"> | string
    paymentAmount?: FloatWithAggregatesFilter<"Subscription"> | number
    paymentDate?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    paymentMethod?: StringWithAggregatesFilter<"Subscription"> | string
    active?: BoolWithAggregatesFilter<"Subscription"> | boolean
    notes?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    createdById?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type AttendanceWhereInput = {
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    id?: StringFilter<"Attendance"> | string
    memberId?: StringFilter<"Attendance"> | string
    checkInTime?: DateTimeFilter<"Attendance"> | Date | string
    checkOutTime?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    duration?: IntNullableFilter<"Attendance"> | number | null
    notes?: StringNullableFilter<"Attendance"> | string | null
    createdById?: StringNullableFilter<"Attendance"> | string | null
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    member?: XOR<UserScalarRelationFilter, UserWhereInput>
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AttendanceOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    checkInTime?: SortOrder
    checkOutTime?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    member?: UserOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type AttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    memberId?: StringFilter<"Attendance"> | string
    checkInTime?: DateTimeFilter<"Attendance"> | Date | string
    checkOutTime?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    duration?: IntNullableFilter<"Attendance"> | number | null
    notes?: StringNullableFilter<"Attendance"> | string | null
    createdById?: StringNullableFilter<"Attendance"> | string | null
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    member?: XOR<UserScalarRelationFilter, UserWhereInput>
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    checkInTime?: SortOrder
    checkOutTime?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    _count?: AttendanceCountOrderByAggregateInput
    _avg?: AttendanceAvgOrderByAggregateInput
    _max?: AttendanceMaxOrderByAggregateInput
    _min?: AttendanceMinOrderByAggregateInput
    _sum?: AttendanceSumOrderByAggregateInput
  }

  export type AttendanceScalarWhereWithAggregatesInput = {
    AND?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    OR?: AttendanceScalarWhereWithAggregatesInput[]
    NOT?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Attendance"> | string
    memberId?: StringWithAggregatesFilter<"Attendance"> | string
    checkInTime?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    checkOutTime?: DateTimeNullableWithAggregatesFilter<"Attendance"> | Date | string | null
    duration?: IntNullableWithAggregatesFilter<"Attendance"> | number | null
    notes?: StringNullableWithAggregatesFilter<"Attendance"> | string | null
    createdById?: StringNullableWithAggregatesFilter<"Attendance"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    address?: string | null
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionCreateNestedManyWithoutMemberInput
    attendances?: AttendanceCreateNestedManyWithoutMemberInput
    createdSubscriptions?: SubscriptionCreateNestedManyWithoutCreatedByInput
    createdAttendances?: AttendanceCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    address?: string | null
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutMemberInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutMemberInput
    createdSubscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCreatedByInput
    createdAttendances?: AttendanceUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUpdateManyWithoutMemberNestedInput
    attendances?: AttendanceUpdateManyWithoutMemberNestedInput
    createdSubscriptions?: SubscriptionUpdateManyWithoutCreatedByNestedInput
    createdAttendances?: AttendanceUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutMemberNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutMemberNestedInput
    createdSubscriptions?: SubscriptionUncheckedUpdateManyWithoutCreatedByNestedInput
    createdAttendances?: AttendanceUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    address?: string | null
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipCreateInput = {
    id?: string
    name: string
    description: string
    duration: number
    price: number
    features?: MembershipCreatefeaturesInput | string[]
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionCreateNestedManyWithoutMembershipInput
  }

  export type MembershipUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    duration: number
    price: number
    features?: MembershipCreatefeaturesInput | string[]
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutMembershipInput
  }

  export type MembershipUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    features?: MembershipUpdatefeaturesInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUpdateManyWithoutMembershipNestedInput
  }

  export type MembershipUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    features?: MembershipUpdatefeaturesInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutMembershipNestedInput
  }

  export type MembershipCreateManyInput = {
    id?: string
    name: string
    description: string
    duration: number
    price: number
    features?: MembershipCreatefeaturesInput | string[]
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembershipUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    features?: MembershipUpdatefeaturesInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    features?: MembershipUpdatefeaturesInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    startDate?: Date | string
    endDate: Date | string
    paymentStatus?: string
    paymentAmount: number
    paymentDate?: Date | string | null
    paymentMethod?: string
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: UserCreateNestedOneWithoutSubscriptionsInput
    membership: MembershipCreateNestedOneWithoutSubscriptionsInput
    createdBy?: UserCreateNestedOneWithoutCreatedSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    memberId: string
    membershipId: string
    startDate?: Date | string
    endDate: Date | string
    paymentStatus?: string
    paymentAmount: number
    paymentDate?: Date | string | null
    paymentMethod?: string
    active?: boolean
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: UserUpdateOneRequiredWithoutSubscriptionsNestedInput
    membership?: MembershipUpdateOneRequiredWithoutSubscriptionsNestedInput
    createdBy?: UserUpdateOneWithoutCreatedSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    membershipId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    memberId: string
    membershipId: string
    startDate?: Date | string
    endDate: Date | string
    paymentStatus?: string
    paymentAmount: number
    paymentDate?: Date | string | null
    paymentMethod?: string
    active?: boolean
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    membershipId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateInput = {
    id?: string
    checkInTime?: Date | string
    checkOutTime?: Date | string | null
    duration?: number | null
    notes?: string | null
    createdAt?: Date | string
    member: UserCreateNestedOneWithoutAttendancesInput
    createdBy?: UserCreateNestedOneWithoutCreatedAttendancesInput
  }

  export type AttendanceUncheckedCreateInput = {
    id?: string
    memberId: string
    checkInTime?: Date | string
    checkOutTime?: Date | string | null
    duration?: number | null
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
  }

  export type AttendanceUpdateInput = {
    checkInTime?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: UserUpdateOneRequiredWithoutAttendancesNestedInput
    createdBy?: UserUpdateOneWithoutCreatedAttendancesNestedInput
  }

  export type AttendanceUncheckedUpdateInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    checkInTime?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateManyInput = {
    id?: string
    memberId: string
    checkInTime?: Date | string
    checkOutTime?: Date | string | null
    duration?: number | null
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
  }

  export type AttendanceUpdateManyMutationInput = {
    checkInTime?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    checkInTime?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type AttendanceListRelationFilter = {
    every?: AttendanceWhereInput
    some?: AttendanceWhereInput
    none?: AttendanceWhereInput
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    dateOfBirth?: SortOrder
    profileImage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    dateOfBirth?: SortOrder
    profileImage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    dateOfBirth?: SortOrder
    profileImage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type MembershipCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    features?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MembershipAvgOrderByAggregateInput = {
    duration?: SortOrder
    price?: SortOrder
  }

  export type MembershipMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MembershipMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MembershipSumOrderByAggregateInput = {
    duration?: SortOrder
    price?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MembershipScalarRelationFilter = {
    is?: MembershipWhereInput
    isNot?: MembershipWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    membershipId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    paymentStatus?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    active?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionAvgOrderByAggregateInput = {
    paymentAmount?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    membershipId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    paymentStatus?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    active?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    membershipId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    paymentStatus?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    active?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionSumOrderByAggregateInput = {
    paymentAmount?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type AttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    checkInTime?: SortOrder
    checkOutTime?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type AttendanceAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type AttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    checkInTime?: SortOrder
    checkOutTime?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type AttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    checkInTime?: SortOrder
    checkOutTime?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type AttendanceSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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
    isSet?: boolean
  }

  export type SubscriptionCreateNestedManyWithoutMemberInput = {
    create?: XOR<SubscriptionCreateWithoutMemberInput, SubscriptionUncheckedCreateWithoutMemberInput> | SubscriptionCreateWithoutMemberInput[] | SubscriptionUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutMemberInput | SubscriptionCreateOrConnectWithoutMemberInput[]
    createMany?: SubscriptionCreateManyMemberInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type AttendanceCreateNestedManyWithoutMemberInput = {
    create?: XOR<AttendanceCreateWithoutMemberInput, AttendanceUncheckedCreateWithoutMemberInput> | AttendanceCreateWithoutMemberInput[] | AttendanceUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutMemberInput | AttendanceCreateOrConnectWithoutMemberInput[]
    createMany?: AttendanceCreateManyMemberInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type SubscriptionCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<SubscriptionCreateWithoutCreatedByInput, SubscriptionUncheckedCreateWithoutCreatedByInput> | SubscriptionCreateWithoutCreatedByInput[] | SubscriptionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCreatedByInput | SubscriptionCreateOrConnectWithoutCreatedByInput[]
    createMany?: SubscriptionCreateManyCreatedByInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type AttendanceCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<AttendanceCreateWithoutCreatedByInput, AttendanceUncheckedCreateWithoutCreatedByInput> | AttendanceCreateWithoutCreatedByInput[] | AttendanceUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutCreatedByInput | AttendanceCreateOrConnectWithoutCreatedByInput[]
    createMany?: AttendanceCreateManyCreatedByInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<SubscriptionCreateWithoutMemberInput, SubscriptionUncheckedCreateWithoutMemberInput> | SubscriptionCreateWithoutMemberInput[] | SubscriptionUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutMemberInput | SubscriptionCreateOrConnectWithoutMemberInput[]
    createMany?: SubscriptionCreateManyMemberInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type AttendanceUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<AttendanceCreateWithoutMemberInput, AttendanceUncheckedCreateWithoutMemberInput> | AttendanceCreateWithoutMemberInput[] | AttendanceUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutMemberInput | AttendanceCreateOrConnectWithoutMemberInput[]
    createMany?: AttendanceCreateManyMemberInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<SubscriptionCreateWithoutCreatedByInput, SubscriptionUncheckedCreateWithoutCreatedByInput> | SubscriptionCreateWithoutCreatedByInput[] | SubscriptionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCreatedByInput | SubscriptionCreateOrConnectWithoutCreatedByInput[]
    createMany?: SubscriptionCreateManyCreatedByInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type AttendanceUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<AttendanceCreateWithoutCreatedByInput, AttendanceUncheckedCreateWithoutCreatedByInput> | AttendanceCreateWithoutCreatedByInput[] | AttendanceUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutCreatedByInput | AttendanceCreateOrConnectWithoutCreatedByInput[]
    createMany?: AttendanceCreateManyCreatedByInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SubscriptionUpdateManyWithoutMemberNestedInput = {
    create?: XOR<SubscriptionCreateWithoutMemberInput, SubscriptionUncheckedCreateWithoutMemberInput> | SubscriptionCreateWithoutMemberInput[] | SubscriptionUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutMemberInput | SubscriptionCreateOrConnectWithoutMemberInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutMemberInput | SubscriptionUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: SubscriptionCreateManyMemberInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutMemberInput | SubscriptionUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutMemberInput | SubscriptionUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type AttendanceUpdateManyWithoutMemberNestedInput = {
    create?: XOR<AttendanceCreateWithoutMemberInput, AttendanceUncheckedCreateWithoutMemberInput> | AttendanceCreateWithoutMemberInput[] | AttendanceUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutMemberInput | AttendanceCreateOrConnectWithoutMemberInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutMemberInput | AttendanceUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: AttendanceCreateManyMemberInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutMemberInput | AttendanceUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutMemberInput | AttendanceUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type SubscriptionUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<SubscriptionCreateWithoutCreatedByInput, SubscriptionUncheckedCreateWithoutCreatedByInput> | SubscriptionCreateWithoutCreatedByInput[] | SubscriptionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCreatedByInput | SubscriptionCreateOrConnectWithoutCreatedByInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutCreatedByInput | SubscriptionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: SubscriptionCreateManyCreatedByInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutCreatedByInput | SubscriptionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutCreatedByInput | SubscriptionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type AttendanceUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<AttendanceCreateWithoutCreatedByInput, AttendanceUncheckedCreateWithoutCreatedByInput> | AttendanceCreateWithoutCreatedByInput[] | AttendanceUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutCreatedByInput | AttendanceCreateOrConnectWithoutCreatedByInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutCreatedByInput | AttendanceUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: AttendanceCreateManyCreatedByInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutCreatedByInput | AttendanceUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutCreatedByInput | AttendanceUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<SubscriptionCreateWithoutMemberInput, SubscriptionUncheckedCreateWithoutMemberInput> | SubscriptionCreateWithoutMemberInput[] | SubscriptionUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutMemberInput | SubscriptionCreateOrConnectWithoutMemberInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutMemberInput | SubscriptionUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: SubscriptionCreateManyMemberInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutMemberInput | SubscriptionUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutMemberInput | SubscriptionUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type AttendanceUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<AttendanceCreateWithoutMemberInput, AttendanceUncheckedCreateWithoutMemberInput> | AttendanceCreateWithoutMemberInput[] | AttendanceUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutMemberInput | AttendanceCreateOrConnectWithoutMemberInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutMemberInput | AttendanceUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: AttendanceCreateManyMemberInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutMemberInput | AttendanceUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutMemberInput | AttendanceUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<SubscriptionCreateWithoutCreatedByInput, SubscriptionUncheckedCreateWithoutCreatedByInput> | SubscriptionCreateWithoutCreatedByInput[] | SubscriptionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCreatedByInput | SubscriptionCreateOrConnectWithoutCreatedByInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutCreatedByInput | SubscriptionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: SubscriptionCreateManyCreatedByInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutCreatedByInput | SubscriptionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutCreatedByInput | SubscriptionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type AttendanceUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<AttendanceCreateWithoutCreatedByInput, AttendanceUncheckedCreateWithoutCreatedByInput> | AttendanceCreateWithoutCreatedByInput[] | AttendanceUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutCreatedByInput | AttendanceCreateOrConnectWithoutCreatedByInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutCreatedByInput | AttendanceUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: AttendanceCreateManyCreatedByInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutCreatedByInput | AttendanceUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutCreatedByInput | AttendanceUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type MembershipCreatefeaturesInput = {
    set: string[]
  }

  export type SubscriptionCreateNestedManyWithoutMembershipInput = {
    create?: XOR<SubscriptionCreateWithoutMembershipInput, SubscriptionUncheckedCreateWithoutMembershipInput> | SubscriptionCreateWithoutMembershipInput[] | SubscriptionUncheckedCreateWithoutMembershipInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutMembershipInput | SubscriptionCreateOrConnectWithoutMembershipInput[]
    createMany?: SubscriptionCreateManyMembershipInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutMembershipInput = {
    create?: XOR<SubscriptionCreateWithoutMembershipInput, SubscriptionUncheckedCreateWithoutMembershipInput> | SubscriptionCreateWithoutMembershipInput[] | SubscriptionUncheckedCreateWithoutMembershipInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutMembershipInput | SubscriptionCreateOrConnectWithoutMembershipInput[]
    createMany?: SubscriptionCreateManyMembershipInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MembershipUpdatefeaturesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SubscriptionUpdateManyWithoutMembershipNestedInput = {
    create?: XOR<SubscriptionCreateWithoutMembershipInput, SubscriptionUncheckedCreateWithoutMembershipInput> | SubscriptionCreateWithoutMembershipInput[] | SubscriptionUncheckedCreateWithoutMembershipInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutMembershipInput | SubscriptionCreateOrConnectWithoutMembershipInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutMembershipInput | SubscriptionUpsertWithWhereUniqueWithoutMembershipInput[]
    createMany?: SubscriptionCreateManyMembershipInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutMembershipInput | SubscriptionUpdateWithWhereUniqueWithoutMembershipInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutMembershipInput | SubscriptionUpdateManyWithWhereWithoutMembershipInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutMembershipNestedInput = {
    create?: XOR<SubscriptionCreateWithoutMembershipInput, SubscriptionUncheckedCreateWithoutMembershipInput> | SubscriptionCreateWithoutMembershipInput[] | SubscriptionUncheckedCreateWithoutMembershipInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutMembershipInput | SubscriptionCreateOrConnectWithoutMembershipInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutMembershipInput | SubscriptionUpsertWithWhereUniqueWithoutMembershipInput[]
    createMany?: SubscriptionCreateManyMembershipInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutMembershipInput | SubscriptionUpdateWithWhereUniqueWithoutMembershipInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutMembershipInput | SubscriptionUpdateManyWithWhereWithoutMembershipInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionsInput
    connect?: UserWhereUniqueInput
  }

  export type MembershipCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<MembershipCreateWithoutSubscriptionsInput, MembershipUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: MembershipCreateOrConnectWithoutSubscriptionsInput
    connect?: MembershipWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedSubscriptionsInput = {
    create?: XOR<UserCreateWithoutCreatedSubscriptionsInput, UserUncheckedCreateWithoutCreatedSubscriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedSubscriptionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionsInput
    upsert?: UserUpsertWithoutSubscriptionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubscriptionsInput, UserUpdateWithoutSubscriptionsInput>, UserUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type MembershipUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<MembershipCreateWithoutSubscriptionsInput, MembershipUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: MembershipCreateOrConnectWithoutSubscriptionsInput
    upsert?: MembershipUpsertWithoutSubscriptionsInput
    connect?: MembershipWhereUniqueInput
    update?: XOR<XOR<MembershipUpdateToOneWithWhereWithoutSubscriptionsInput, MembershipUpdateWithoutSubscriptionsInput>, MembershipUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type UserUpdateOneWithoutCreatedSubscriptionsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedSubscriptionsInput, UserUncheckedCreateWithoutCreatedSubscriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedSubscriptionsInput
    upsert?: UserUpsertWithoutCreatedSubscriptionsInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedSubscriptionsInput, UserUpdateWithoutCreatedSubscriptionsInput>, UserUncheckedUpdateWithoutCreatedSubscriptionsInput>
  }

  export type UserCreateNestedOneWithoutAttendancesInput = {
    create?: XOR<UserCreateWithoutAttendancesInput, UserUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAttendancesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedAttendancesInput = {
    create?: XOR<UserCreateWithoutCreatedAttendancesInput, UserUncheckedCreateWithoutCreatedAttendancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedAttendancesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type UserUpdateOneRequiredWithoutAttendancesNestedInput = {
    create?: XOR<UserCreateWithoutAttendancesInput, UserUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAttendancesInput
    upsert?: UserUpsertWithoutAttendancesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAttendancesInput, UserUpdateWithoutAttendancesInput>, UserUncheckedUpdateWithoutAttendancesInput>
  }

  export type UserUpdateOneWithoutCreatedAttendancesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedAttendancesInput, UserUncheckedCreateWithoutCreatedAttendancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedAttendancesInput
    upsert?: UserUpsertWithoutCreatedAttendancesInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedAttendancesInput, UserUpdateWithoutCreatedAttendancesInput>, UserUncheckedUpdateWithoutCreatedAttendancesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type SubscriptionCreateWithoutMemberInput = {
    id?: string
    startDate?: Date | string
    endDate: Date | string
    paymentStatus?: string
    paymentAmount: number
    paymentDate?: Date | string | null
    paymentMethod?: string
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    membership: MembershipCreateNestedOneWithoutSubscriptionsInput
    createdBy?: UserCreateNestedOneWithoutCreatedSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateWithoutMemberInput = {
    id?: string
    membershipId: string
    startDate?: Date | string
    endDate: Date | string
    paymentStatus?: string
    paymentAmount: number
    paymentDate?: Date | string | null
    paymentMethod?: string
    active?: boolean
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutMemberInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutMemberInput, SubscriptionUncheckedCreateWithoutMemberInput>
  }

  export type SubscriptionCreateManyMemberInputEnvelope = {
    data: SubscriptionCreateManyMemberInput | SubscriptionCreateManyMemberInput[]
  }

  export type AttendanceCreateWithoutMemberInput = {
    id?: string
    checkInTime?: Date | string
    checkOutTime?: Date | string | null
    duration?: number | null
    notes?: string | null
    createdAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedAttendancesInput
  }

  export type AttendanceUncheckedCreateWithoutMemberInput = {
    id?: string
    checkInTime?: Date | string
    checkOutTime?: Date | string | null
    duration?: number | null
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
  }

  export type AttendanceCreateOrConnectWithoutMemberInput = {
    where: AttendanceWhereUniqueInput
    create: XOR<AttendanceCreateWithoutMemberInput, AttendanceUncheckedCreateWithoutMemberInput>
  }

  export type AttendanceCreateManyMemberInputEnvelope = {
    data: AttendanceCreateManyMemberInput | AttendanceCreateManyMemberInput[]
  }

  export type SubscriptionCreateWithoutCreatedByInput = {
    id?: string
    startDate?: Date | string
    endDate: Date | string
    paymentStatus?: string
    paymentAmount: number
    paymentDate?: Date | string | null
    paymentMethod?: string
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: UserCreateNestedOneWithoutSubscriptionsInput
    membership: MembershipCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateWithoutCreatedByInput = {
    id?: string
    memberId: string
    membershipId: string
    startDate?: Date | string
    endDate: Date | string
    paymentStatus?: string
    paymentAmount: number
    paymentDate?: Date | string | null
    paymentMethod?: string
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutCreatedByInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutCreatedByInput, SubscriptionUncheckedCreateWithoutCreatedByInput>
  }

  export type SubscriptionCreateManyCreatedByInputEnvelope = {
    data: SubscriptionCreateManyCreatedByInput | SubscriptionCreateManyCreatedByInput[]
  }

  export type AttendanceCreateWithoutCreatedByInput = {
    id?: string
    checkInTime?: Date | string
    checkOutTime?: Date | string | null
    duration?: number | null
    notes?: string | null
    createdAt?: Date | string
    member: UserCreateNestedOneWithoutAttendancesInput
  }

  export type AttendanceUncheckedCreateWithoutCreatedByInput = {
    id?: string
    memberId: string
    checkInTime?: Date | string
    checkOutTime?: Date | string | null
    duration?: number | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type AttendanceCreateOrConnectWithoutCreatedByInput = {
    where: AttendanceWhereUniqueInput
    create: XOR<AttendanceCreateWithoutCreatedByInput, AttendanceUncheckedCreateWithoutCreatedByInput>
  }

  export type AttendanceCreateManyCreatedByInputEnvelope = {
    data: AttendanceCreateManyCreatedByInput | AttendanceCreateManyCreatedByInput[]
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutMemberInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutMemberInput, SubscriptionUncheckedUpdateWithoutMemberInput>
    create: XOR<SubscriptionCreateWithoutMemberInput, SubscriptionUncheckedCreateWithoutMemberInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutMemberInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutMemberInput, SubscriptionUncheckedUpdateWithoutMemberInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutMemberInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutMemberInput>
  }

  export type SubscriptionScalarWhereInput = {
    AND?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    OR?: SubscriptionScalarWhereInput[]
    NOT?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    id?: StringFilter<"Subscription"> | string
    memberId?: StringFilter<"Subscription"> | string
    membershipId?: StringFilter<"Subscription"> | string
    startDate?: DateTimeFilter<"Subscription"> | Date | string
    endDate?: DateTimeFilter<"Subscription"> | Date | string
    paymentStatus?: StringFilter<"Subscription"> | string
    paymentAmount?: FloatFilter<"Subscription"> | number
    paymentDate?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    paymentMethod?: StringFilter<"Subscription"> | string
    active?: BoolFilter<"Subscription"> | boolean
    notes?: StringNullableFilter<"Subscription"> | string | null
    createdById?: StringNullableFilter<"Subscription"> | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
  }

  export type AttendanceUpsertWithWhereUniqueWithoutMemberInput = {
    where: AttendanceWhereUniqueInput
    update: XOR<AttendanceUpdateWithoutMemberInput, AttendanceUncheckedUpdateWithoutMemberInput>
    create: XOR<AttendanceCreateWithoutMemberInput, AttendanceUncheckedCreateWithoutMemberInput>
  }

  export type AttendanceUpdateWithWhereUniqueWithoutMemberInput = {
    where: AttendanceWhereUniqueInput
    data: XOR<AttendanceUpdateWithoutMemberInput, AttendanceUncheckedUpdateWithoutMemberInput>
  }

  export type AttendanceUpdateManyWithWhereWithoutMemberInput = {
    where: AttendanceScalarWhereInput
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyWithoutMemberInput>
  }

  export type AttendanceScalarWhereInput = {
    AND?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    OR?: AttendanceScalarWhereInput[]
    NOT?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    id?: StringFilter<"Attendance"> | string
    memberId?: StringFilter<"Attendance"> | string
    checkInTime?: DateTimeFilter<"Attendance"> | Date | string
    checkOutTime?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    duration?: IntNullableFilter<"Attendance"> | number | null
    notes?: StringNullableFilter<"Attendance"> | string | null
    createdById?: StringNullableFilter<"Attendance"> | string | null
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutCreatedByInput, SubscriptionUncheckedUpdateWithoutCreatedByInput>
    create: XOR<SubscriptionCreateWithoutCreatedByInput, SubscriptionUncheckedCreateWithoutCreatedByInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutCreatedByInput, SubscriptionUncheckedUpdateWithoutCreatedByInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutCreatedByInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type AttendanceUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: AttendanceWhereUniqueInput
    update: XOR<AttendanceUpdateWithoutCreatedByInput, AttendanceUncheckedUpdateWithoutCreatedByInput>
    create: XOR<AttendanceCreateWithoutCreatedByInput, AttendanceUncheckedCreateWithoutCreatedByInput>
  }

  export type AttendanceUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: AttendanceWhereUniqueInput
    data: XOR<AttendanceUpdateWithoutCreatedByInput, AttendanceUncheckedUpdateWithoutCreatedByInput>
  }

  export type AttendanceUpdateManyWithWhereWithoutCreatedByInput = {
    where: AttendanceScalarWhereInput
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type SubscriptionCreateWithoutMembershipInput = {
    id?: string
    startDate?: Date | string
    endDate: Date | string
    paymentStatus?: string
    paymentAmount: number
    paymentDate?: Date | string | null
    paymentMethod?: string
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: UserCreateNestedOneWithoutSubscriptionsInput
    createdBy?: UserCreateNestedOneWithoutCreatedSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateWithoutMembershipInput = {
    id?: string
    memberId: string
    startDate?: Date | string
    endDate: Date | string
    paymentStatus?: string
    paymentAmount: number
    paymentDate?: Date | string | null
    paymentMethod?: string
    active?: boolean
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutMembershipInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutMembershipInput, SubscriptionUncheckedCreateWithoutMembershipInput>
  }

  export type SubscriptionCreateManyMembershipInputEnvelope = {
    data: SubscriptionCreateManyMembershipInput | SubscriptionCreateManyMembershipInput[]
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutMembershipInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutMembershipInput, SubscriptionUncheckedUpdateWithoutMembershipInput>
    create: XOR<SubscriptionCreateWithoutMembershipInput, SubscriptionUncheckedCreateWithoutMembershipInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutMembershipInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutMembershipInput, SubscriptionUncheckedUpdateWithoutMembershipInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutMembershipInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutMembershipInput>
  }

  export type UserCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    address?: string | null
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    attendances?: AttendanceCreateNestedManyWithoutMemberInput
    createdSubscriptions?: SubscriptionCreateNestedManyWithoutCreatedByInput
    createdAttendances?: AttendanceCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    address?: string | null
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    attendances?: AttendanceUncheckedCreateNestedManyWithoutMemberInput
    createdSubscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCreatedByInput
    createdAttendances?: AttendanceUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutSubscriptionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
  }

  export type MembershipCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    description: string
    duration: number
    price: number
    features?: MembershipCreatefeaturesInput | string[]
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembershipUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    description: string
    duration: number
    price: number
    features?: MembershipCreatefeaturesInput | string[]
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembershipCreateOrConnectWithoutSubscriptionsInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutSubscriptionsInput, MembershipUncheckedCreateWithoutSubscriptionsInput>
  }

  export type UserCreateWithoutCreatedSubscriptionsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    address?: string | null
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionCreateNestedManyWithoutMemberInput
    attendances?: AttendanceCreateNestedManyWithoutMemberInput
    createdAttendances?: AttendanceCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedSubscriptionsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    address?: string | null
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutMemberInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutMemberInput
    createdAttendances?: AttendanceUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedSubscriptionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedSubscriptionsInput, UserUncheckedCreateWithoutCreatedSubscriptionsInput>
  }

  export type UserUpsertWithoutSubscriptionsInput = {
    update: XOR<UserUpdateWithoutSubscriptionsInput, UserUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubscriptionsInput, UserUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type UserUpdateWithoutSubscriptionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendances?: AttendanceUpdateManyWithoutMemberNestedInput
    createdSubscriptions?: SubscriptionUpdateManyWithoutCreatedByNestedInput
    createdAttendances?: AttendanceUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutSubscriptionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendances?: AttendanceUncheckedUpdateManyWithoutMemberNestedInput
    createdSubscriptions?: SubscriptionUncheckedUpdateManyWithoutCreatedByNestedInput
    createdAttendances?: AttendanceUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type MembershipUpsertWithoutSubscriptionsInput = {
    update: XOR<MembershipUpdateWithoutSubscriptionsInput, MembershipUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<MembershipCreateWithoutSubscriptionsInput, MembershipUncheckedCreateWithoutSubscriptionsInput>
    where?: MembershipWhereInput
  }

  export type MembershipUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: MembershipWhereInput
    data: XOR<MembershipUpdateWithoutSubscriptionsInput, MembershipUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type MembershipUpdateWithoutSubscriptionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    features?: MembershipUpdatefeaturesInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipUncheckedUpdateWithoutSubscriptionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    features?: MembershipUpdatefeaturesInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutCreatedSubscriptionsInput = {
    update: XOR<UserUpdateWithoutCreatedSubscriptionsInput, UserUncheckedUpdateWithoutCreatedSubscriptionsInput>
    create: XOR<UserCreateWithoutCreatedSubscriptionsInput, UserUncheckedCreateWithoutCreatedSubscriptionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedSubscriptionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedSubscriptionsInput, UserUncheckedUpdateWithoutCreatedSubscriptionsInput>
  }

  export type UserUpdateWithoutCreatedSubscriptionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUpdateManyWithoutMemberNestedInput
    attendances?: AttendanceUpdateManyWithoutMemberNestedInput
    createdAttendances?: AttendanceUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedSubscriptionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutMemberNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutMemberNestedInput
    createdAttendances?: AttendanceUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateWithoutAttendancesInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    address?: string | null
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionCreateNestedManyWithoutMemberInput
    createdSubscriptions?: SubscriptionCreateNestedManyWithoutCreatedByInput
    createdAttendances?: AttendanceCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutAttendancesInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    address?: string | null
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutMemberInput
    createdSubscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCreatedByInput
    createdAttendances?: AttendanceUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutAttendancesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAttendancesInput, UserUncheckedCreateWithoutAttendancesInput>
  }

  export type UserCreateWithoutCreatedAttendancesInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    address?: string | null
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionCreateNestedManyWithoutMemberInput
    attendances?: AttendanceCreateNestedManyWithoutMemberInput
    createdSubscriptions?: SubscriptionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedAttendancesInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    address?: string | null
    dateOfBirth?: Date | string | null
    profileImage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutMemberInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutMemberInput
    createdSubscriptions?: SubscriptionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedAttendancesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedAttendancesInput, UserUncheckedCreateWithoutCreatedAttendancesInput>
  }

  export type UserUpsertWithoutAttendancesInput = {
    update: XOR<UserUpdateWithoutAttendancesInput, UserUncheckedUpdateWithoutAttendancesInput>
    create: XOR<UserCreateWithoutAttendancesInput, UserUncheckedCreateWithoutAttendancesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAttendancesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAttendancesInput, UserUncheckedUpdateWithoutAttendancesInput>
  }

  export type UserUpdateWithoutAttendancesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUpdateManyWithoutMemberNestedInput
    createdSubscriptions?: SubscriptionUpdateManyWithoutCreatedByNestedInput
    createdAttendances?: AttendanceUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAttendancesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutMemberNestedInput
    createdSubscriptions?: SubscriptionUncheckedUpdateManyWithoutCreatedByNestedInput
    createdAttendances?: AttendanceUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUpsertWithoutCreatedAttendancesInput = {
    update: XOR<UserUpdateWithoutCreatedAttendancesInput, UserUncheckedUpdateWithoutCreatedAttendancesInput>
    create: XOR<UserCreateWithoutCreatedAttendancesInput, UserUncheckedCreateWithoutCreatedAttendancesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedAttendancesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedAttendancesInput, UserUncheckedUpdateWithoutCreatedAttendancesInput>
  }

  export type UserUpdateWithoutCreatedAttendancesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUpdateManyWithoutMemberNestedInput
    attendances?: AttendanceUpdateManyWithoutMemberNestedInput
    createdSubscriptions?: SubscriptionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedAttendancesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutMemberNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutMemberNestedInput
    createdSubscriptions?: SubscriptionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type SubscriptionCreateManyMemberInput = {
    id?: string
    membershipId: string
    startDate?: Date | string
    endDate: Date | string
    paymentStatus?: string
    paymentAmount: number
    paymentDate?: Date | string | null
    paymentMethod?: string
    active?: boolean
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceCreateManyMemberInput = {
    id?: string
    checkInTime?: Date | string
    checkOutTime?: Date | string | null
    duration?: number | null
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
  }

  export type SubscriptionCreateManyCreatedByInput = {
    id?: string
    memberId: string
    membershipId: string
    startDate?: Date | string
    endDate: Date | string
    paymentStatus?: string
    paymentAmount: number
    paymentDate?: Date | string | null
    paymentMethod?: string
    active?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceCreateManyCreatedByInput = {
    id?: string
    memberId: string
    checkInTime?: Date | string
    checkOutTime?: Date | string | null
    duration?: number | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type SubscriptionUpdateWithoutMemberInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    membership?: MembershipUpdateOneRequiredWithoutSubscriptionsNestedInput
    createdBy?: UserUpdateOneWithoutCreatedSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutMemberInput = {
    membershipId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutMemberInput = {
    membershipId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUpdateWithoutMemberInput = {
    checkInTime?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedAttendancesNestedInput
  }

  export type AttendanceUncheckedUpdateWithoutMemberInput = {
    checkInTime?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyWithoutMemberInput = {
    checkInTime?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUpdateWithoutCreatedByInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: UserUpdateOneRequiredWithoutSubscriptionsNestedInput
    membership?: MembershipUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutCreatedByInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    membershipId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutCreatedByInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    membershipId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUpdateWithoutCreatedByInput = {
    checkInTime?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: UserUpdateOneRequiredWithoutAttendancesNestedInput
  }

  export type AttendanceUncheckedUpdateWithoutCreatedByInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    checkInTime?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyWithoutCreatedByInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    checkInTime?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOutTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyMembershipInput = {
    id?: string
    memberId: string
    startDate?: Date | string
    endDate: Date | string
    paymentStatus?: string
    paymentAmount: number
    paymentDate?: Date | string | null
    paymentMethod?: string
    active?: boolean
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateWithoutMembershipInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: UserUpdateOneRequiredWithoutSubscriptionsNestedInput
    createdBy?: UserUpdateOneWithoutCreatedSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutMembershipInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutMembershipInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentAmount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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