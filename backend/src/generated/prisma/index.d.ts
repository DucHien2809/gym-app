
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
 * Model Equipment
 * 
 */
export type Equipment = $Result.DefaultSelection<Prisma.$EquipmentPayload>
/**
 * Model MaintenanceLog
 * 
 */
export type MaintenanceLog = $Result.DefaultSelection<Prisma.$MaintenanceLogPayload>
/**
 * Model SubscriptionCancellationRequest
 * 
 */
export type SubscriptionCancellationRequest = $Result.DefaultSelection<Prisma.$SubscriptionCancellationRequestPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>

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

  /**
   * `prisma.equipment`: Exposes CRUD operations for the **Equipment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Equipment
    * const equipment = await prisma.equipment.findMany()
    * ```
    */
  get equipment(): Prisma.EquipmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.maintenanceLog`: Exposes CRUD operations for the **MaintenanceLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaintenanceLogs
    * const maintenanceLogs = await prisma.maintenanceLog.findMany()
    * ```
    */
  get maintenanceLog(): Prisma.MaintenanceLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriptionCancellationRequest`: Exposes CRUD operations for the **SubscriptionCancellationRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubscriptionCancellationRequests
    * const subscriptionCancellationRequests = await prisma.subscriptionCancellationRequest.findMany()
    * ```
    */
  get subscriptionCancellationRequest(): Prisma.SubscriptionCancellationRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;
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
    Attendance: 'Attendance',
    Equipment: 'Equipment',
    MaintenanceLog: 'MaintenanceLog',
    SubscriptionCancellationRequest: 'SubscriptionCancellationRequest',
    Appointment: 'Appointment'
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
      modelProps: "user" | "membership" | "subscription" | "attendance" | "equipment" | "maintenanceLog" | "subscriptionCancellationRequest" | "appointment"
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
      Equipment: {
        payload: Prisma.$EquipmentPayload<ExtArgs>
        fields: Prisma.EquipmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EquipmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EquipmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>
          }
          findFirst: {
            args: Prisma.EquipmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EquipmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>
          }
          findMany: {
            args: Prisma.EquipmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>[]
          }
          create: {
            args: Prisma.EquipmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>
          }
          createMany: {
            args: Prisma.EquipmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EquipmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>
          }
          update: {
            args: Prisma.EquipmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>
          }
          deleteMany: {
            args: Prisma.EquipmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EquipmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EquipmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>
          }
          aggregate: {
            args: Prisma.EquipmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEquipment>
          }
          groupBy: {
            args: Prisma.EquipmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EquipmentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.EquipmentFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.EquipmentAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.EquipmentCountArgs<ExtArgs>
            result: $Utils.Optional<EquipmentCountAggregateOutputType> | number
          }
        }
      }
      MaintenanceLog: {
        payload: Prisma.$MaintenanceLogPayload<ExtArgs>
        fields: Prisma.MaintenanceLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaintenanceLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaintenanceLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceLogPayload>
          }
          findFirst: {
            args: Prisma.MaintenanceLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaintenanceLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceLogPayload>
          }
          findMany: {
            args: Prisma.MaintenanceLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceLogPayload>[]
          }
          create: {
            args: Prisma.MaintenanceLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceLogPayload>
          }
          createMany: {
            args: Prisma.MaintenanceLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MaintenanceLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceLogPayload>
          }
          update: {
            args: Prisma.MaintenanceLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceLogPayload>
          }
          deleteMany: {
            args: Prisma.MaintenanceLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaintenanceLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MaintenanceLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceLogPayload>
          }
          aggregate: {
            args: Prisma.MaintenanceLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaintenanceLog>
          }
          groupBy: {
            args: Prisma.MaintenanceLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaintenanceLogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MaintenanceLogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MaintenanceLogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MaintenanceLogCountArgs<ExtArgs>
            result: $Utils.Optional<MaintenanceLogCountAggregateOutputType> | number
          }
        }
      }
      SubscriptionCancellationRequest: {
        payload: Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>
        fields: Prisma.SubscriptionCancellationRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionCancellationRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCancellationRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionCancellationRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCancellationRequestPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionCancellationRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCancellationRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionCancellationRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCancellationRequestPayload>
          }
          findMany: {
            args: Prisma.SubscriptionCancellationRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCancellationRequestPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCancellationRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCancellationRequestPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCancellationRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SubscriptionCancellationRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCancellationRequestPayload>
          }
          update: {
            args: Prisma.SubscriptionCancellationRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCancellationRequestPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionCancellationRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionCancellationRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SubscriptionCancellationRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionCancellationRequestPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionCancellationRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriptionCancellationRequest>
          }
          groupBy: {
            args: Prisma.SubscriptionCancellationRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCancellationRequestGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SubscriptionCancellationRequestFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SubscriptionCancellationRequestAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SubscriptionCancellationRequestCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCancellationRequestCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AppointmentFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AppointmentAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
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
    equipment?: EquipmentOmit
    maintenanceLog?: MaintenanceLogOmit
    subscriptionCancellationRequest?: SubscriptionCancellationRequestOmit
    appointment?: AppointmentOmit
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
    createdEquipment: number
    createdMaintenanceLogs: number
    cancellationRequests: number
    processedCancellationRequests: number
    memberAppointments: number
    trainerAppointments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | UserCountOutputTypeCountSubscriptionsArgs
    attendances?: boolean | UserCountOutputTypeCountAttendancesArgs
    createdSubscriptions?: boolean | UserCountOutputTypeCountCreatedSubscriptionsArgs
    createdAttendances?: boolean | UserCountOutputTypeCountCreatedAttendancesArgs
    createdEquipment?: boolean | UserCountOutputTypeCountCreatedEquipmentArgs
    createdMaintenanceLogs?: boolean | UserCountOutputTypeCountCreatedMaintenanceLogsArgs
    cancellationRequests?: boolean | UserCountOutputTypeCountCancellationRequestsArgs
    processedCancellationRequests?: boolean | UserCountOutputTypeCountProcessedCancellationRequestsArgs
    memberAppointments?: boolean | UserCountOutputTypeCountMemberAppointmentsArgs
    trainerAppointments?: boolean | UserCountOutputTypeCountTrainerAppointmentsArgs
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
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedEquipmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EquipmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedMaintenanceLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaintenanceLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCancellationRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionCancellationRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProcessedCancellationRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionCancellationRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMemberAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTrainerAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
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
   * Count Type SubscriptionCountOutputType
   */

  export type SubscriptionCountOutputType = {
    cancellationRequests: number
  }

  export type SubscriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cancellationRequests?: boolean | SubscriptionCountOutputTypeCountCancellationRequestsArgs
  }

  // Custom InputTypes
  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCountOutputType
     */
    select?: SubscriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeCountCancellationRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionCancellationRequestWhereInput
  }


  /**
   * Count Type EquipmentCountOutputType
   */

  export type EquipmentCountOutputType = {
    maintenanceLogs: number
  }

  export type EquipmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    maintenanceLogs?: boolean | EquipmentCountOutputTypeCountMaintenanceLogsArgs
  }

  // Custom InputTypes
  /**
   * EquipmentCountOutputType without action
   */
  export type EquipmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentCountOutputType
     */
    select?: EquipmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EquipmentCountOutputType without action
   */
  export type EquipmentCountOutputTypeCountMaintenanceLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaintenanceLogWhereInput
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
    createdEquipment?: boolean | User$createdEquipmentArgs<ExtArgs>
    createdMaintenanceLogs?: boolean | User$createdMaintenanceLogsArgs<ExtArgs>
    cancellationRequests?: boolean | User$cancellationRequestsArgs<ExtArgs>
    processedCancellationRequests?: boolean | User$processedCancellationRequestsArgs<ExtArgs>
    memberAppointments?: boolean | User$memberAppointmentsArgs<ExtArgs>
    trainerAppointments?: boolean | User$trainerAppointmentsArgs<ExtArgs>
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
    createdEquipment?: boolean | User$createdEquipmentArgs<ExtArgs>
    createdMaintenanceLogs?: boolean | User$createdMaintenanceLogsArgs<ExtArgs>
    cancellationRequests?: boolean | User$cancellationRequestsArgs<ExtArgs>
    processedCancellationRequests?: boolean | User$processedCancellationRequestsArgs<ExtArgs>
    memberAppointments?: boolean | User$memberAppointmentsArgs<ExtArgs>
    trainerAppointments?: boolean | User$trainerAppointmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      attendances: Prisma.$AttendancePayload<ExtArgs>[]
      createdSubscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      createdAttendances: Prisma.$AttendancePayload<ExtArgs>[]
      createdEquipment: Prisma.$EquipmentPayload<ExtArgs>[]
      createdMaintenanceLogs: Prisma.$MaintenanceLogPayload<ExtArgs>[]
      cancellationRequests: Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>[]
      processedCancellationRequests: Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>[]
      memberAppointments: Prisma.$AppointmentPayload<ExtArgs>[]
      trainerAppointments: Prisma.$AppointmentPayload<ExtArgs>[]
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
    createdEquipment<T extends User$createdEquipmentArgs<ExtArgs> = {}>(args?: Subset<T, User$createdEquipmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdMaintenanceLogs<T extends User$createdMaintenanceLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdMaintenanceLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cancellationRequests<T extends User$cancellationRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$cancellationRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    processedCancellationRequests<T extends User$processedCancellationRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$processedCancellationRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memberAppointments<T extends User$memberAppointmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$memberAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trainerAppointments<T extends User$trainerAppointmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$trainerAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * User.createdEquipment
   */
  export type User$createdEquipmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipmentInclude<ExtArgs> | null
    where?: EquipmentWhereInput
    orderBy?: EquipmentOrderByWithRelationInput | EquipmentOrderByWithRelationInput[]
    cursor?: EquipmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EquipmentScalarFieldEnum | EquipmentScalarFieldEnum[]
  }

  /**
   * User.createdMaintenanceLogs
   */
  export type User$createdMaintenanceLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceLog
     */
    select?: MaintenanceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintenanceLog
     */
    omit?: MaintenanceLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceLogInclude<ExtArgs> | null
    where?: MaintenanceLogWhereInput
    orderBy?: MaintenanceLogOrderByWithRelationInput | MaintenanceLogOrderByWithRelationInput[]
    cursor?: MaintenanceLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaintenanceLogScalarFieldEnum | MaintenanceLogScalarFieldEnum[]
  }

  /**
   * User.cancellationRequests
   */
  export type User$cancellationRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
    where?: SubscriptionCancellationRequestWhereInput
    orderBy?: SubscriptionCancellationRequestOrderByWithRelationInput | SubscriptionCancellationRequestOrderByWithRelationInput[]
    cursor?: SubscriptionCancellationRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionCancellationRequestScalarFieldEnum | SubscriptionCancellationRequestScalarFieldEnum[]
  }

  /**
   * User.processedCancellationRequests
   */
  export type User$processedCancellationRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
    where?: SubscriptionCancellationRequestWhereInput
    orderBy?: SubscriptionCancellationRequestOrderByWithRelationInput | SubscriptionCancellationRequestOrderByWithRelationInput[]
    cursor?: SubscriptionCancellationRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionCancellationRequestScalarFieldEnum | SubscriptionCancellationRequestScalarFieldEnum[]
  }

  /**
   * User.memberAppointments
   */
  export type User$memberAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * User.trainerAppointments
   */
  export type User$trainerAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
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
    cancellationRequests?: boolean | Subscription$cancellationRequestsArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
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
    cancellationRequests?: boolean | Subscription$cancellationRequestsArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      member: Prisma.$UserPayload<ExtArgs>
      membership: Prisma.$MembershipPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      cancellationRequests: Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>[]
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
    cancellationRequests<T extends Subscription$cancellationRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Subscription$cancellationRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Subscription.cancellationRequests
   */
  export type Subscription$cancellationRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
    where?: SubscriptionCancellationRequestWhereInput
    orderBy?: SubscriptionCancellationRequestOrderByWithRelationInput | SubscriptionCancellationRequestOrderByWithRelationInput[]
    cursor?: SubscriptionCancellationRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionCancellationRequestScalarFieldEnum | SubscriptionCancellationRequestScalarFieldEnum[]
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
   * Model Equipment
   */

  export type AggregateEquipment = {
    _count: EquipmentCountAggregateOutputType | null
    _avg: EquipmentAvgAggregateOutputType | null
    _sum: EquipmentSumAggregateOutputType | null
    _min: EquipmentMinAggregateOutputType | null
    _max: EquipmentMaxAggregateOutputType | null
  }

  export type EquipmentAvgAggregateOutputType = {
    purchasePrice: number | null
  }

  export type EquipmentSumAggregateOutputType = {
    purchasePrice: number | null
  }

  export type EquipmentMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    purchaseDate: Date | null
    purchasePrice: number | null
    manufacturer: string | null
    model: string | null
    serialNumber: string | null
    status: string | null
    location: string | null
    lastMaintenance: Date | null
    nextMaintenance: Date | null
    imageBase64: string | null
    notes: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EquipmentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    purchaseDate: Date | null
    purchasePrice: number | null
    manufacturer: string | null
    model: string | null
    serialNumber: string | null
    status: string | null
    location: string | null
    lastMaintenance: Date | null
    nextMaintenance: Date | null
    imageBase64: string | null
    notes: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EquipmentCountAggregateOutputType = {
    id: number
    name: number
    description: number
    category: number
    purchaseDate: number
    purchasePrice: number
    manufacturer: number
    model: number
    serialNumber: number
    status: number
    location: number
    lastMaintenance: number
    nextMaintenance: number
    imageBase64: number
    notes: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EquipmentAvgAggregateInputType = {
    purchasePrice?: true
  }

  export type EquipmentSumAggregateInputType = {
    purchasePrice?: true
  }

  export type EquipmentMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    purchaseDate?: true
    purchasePrice?: true
    manufacturer?: true
    model?: true
    serialNumber?: true
    status?: true
    location?: true
    lastMaintenance?: true
    nextMaintenance?: true
    imageBase64?: true
    notes?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EquipmentMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    purchaseDate?: true
    purchasePrice?: true
    manufacturer?: true
    model?: true
    serialNumber?: true
    status?: true
    location?: true
    lastMaintenance?: true
    nextMaintenance?: true
    imageBase64?: true
    notes?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EquipmentCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    purchaseDate?: true
    purchasePrice?: true
    manufacturer?: true
    model?: true
    serialNumber?: true
    status?: true
    location?: true
    lastMaintenance?: true
    nextMaintenance?: true
    imageBase64?: true
    notes?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EquipmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Equipment to aggregate.
     */
    where?: EquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Equipment to fetch.
     */
    orderBy?: EquipmentOrderByWithRelationInput | EquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Equipment from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Equipment.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Equipment
    **/
    _count?: true | EquipmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EquipmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EquipmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EquipmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EquipmentMaxAggregateInputType
  }

  export type GetEquipmentAggregateType<T extends EquipmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEquipment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEquipment[P]>
      : GetScalarType<T[P], AggregateEquipment[P]>
  }




  export type EquipmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EquipmentWhereInput
    orderBy?: EquipmentOrderByWithAggregationInput | EquipmentOrderByWithAggregationInput[]
    by: EquipmentScalarFieldEnum[] | EquipmentScalarFieldEnum
    having?: EquipmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EquipmentCountAggregateInputType | true
    _avg?: EquipmentAvgAggregateInputType
    _sum?: EquipmentSumAggregateInputType
    _min?: EquipmentMinAggregateInputType
    _max?: EquipmentMaxAggregateInputType
  }

  export type EquipmentGroupByOutputType = {
    id: string
    name: string
    description: string
    category: string
    purchaseDate: Date
    purchasePrice: number
    manufacturer: string
    model: string | null
    serialNumber: string | null
    status: string
    location: string | null
    lastMaintenance: Date | null
    nextMaintenance: Date | null
    imageBase64: string | null
    notes: string | null
    createdById: string | null
    createdAt: Date
    updatedAt: Date
    _count: EquipmentCountAggregateOutputType | null
    _avg: EquipmentAvgAggregateOutputType | null
    _sum: EquipmentSumAggregateOutputType | null
    _min: EquipmentMinAggregateOutputType | null
    _max: EquipmentMaxAggregateOutputType | null
  }

  type GetEquipmentGroupByPayload<T extends EquipmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EquipmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EquipmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EquipmentGroupByOutputType[P]>
            : GetScalarType<T[P], EquipmentGroupByOutputType[P]>
        }
      >
    >


  export type EquipmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    purchaseDate?: boolean
    purchasePrice?: boolean
    manufacturer?: boolean
    model?: boolean
    serialNumber?: boolean
    status?: boolean
    location?: boolean
    lastMaintenance?: boolean
    nextMaintenance?: boolean
    imageBase64?: boolean
    notes?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    maintenanceLogs?: boolean | Equipment$maintenanceLogsArgs<ExtArgs>
    createdBy?: boolean | Equipment$createdByArgs<ExtArgs>
    _count?: boolean | EquipmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["equipment"]>



  export type EquipmentSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    purchaseDate?: boolean
    purchasePrice?: boolean
    manufacturer?: boolean
    model?: boolean
    serialNumber?: boolean
    status?: boolean
    location?: boolean
    lastMaintenance?: boolean
    nextMaintenance?: boolean
    imageBase64?: boolean
    notes?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EquipmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "category" | "purchaseDate" | "purchasePrice" | "manufacturer" | "model" | "serialNumber" | "status" | "location" | "lastMaintenance" | "nextMaintenance" | "imageBase64" | "notes" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["equipment"]>
  export type EquipmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    maintenanceLogs?: boolean | Equipment$maintenanceLogsArgs<ExtArgs>
    createdBy?: boolean | Equipment$createdByArgs<ExtArgs>
    _count?: boolean | EquipmentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EquipmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Equipment"
    objects: {
      maintenanceLogs: Prisma.$MaintenanceLogPayload<ExtArgs>[]
      createdBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      category: string
      purchaseDate: Date
      purchasePrice: number
      manufacturer: string
      model: string | null
      serialNumber: string | null
      status: string
      location: string | null
      lastMaintenance: Date | null
      nextMaintenance: Date | null
      imageBase64: string | null
      notes: string | null
      createdById: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["equipment"]>
    composites: {}
  }

  type EquipmentGetPayload<S extends boolean | null | undefined | EquipmentDefaultArgs> = $Result.GetResult<Prisma.$EquipmentPayload, S>

  type EquipmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EquipmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EquipmentCountAggregateInputType | true
    }

  export interface EquipmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Equipment'], meta: { name: 'Equipment' } }
    /**
     * Find zero or one Equipment that matches the filter.
     * @param {EquipmentFindUniqueArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EquipmentFindUniqueArgs>(args: SelectSubset<T, EquipmentFindUniqueArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Equipment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EquipmentFindUniqueOrThrowArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EquipmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EquipmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Equipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentFindFirstArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EquipmentFindFirstArgs>(args?: SelectSubset<T, EquipmentFindFirstArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Equipment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentFindFirstOrThrowArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EquipmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EquipmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Equipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Equipment
     * const equipment = await prisma.equipment.findMany()
     * 
     * // Get first 10 Equipment
     * const equipment = await prisma.equipment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const equipmentWithIdOnly = await prisma.equipment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EquipmentFindManyArgs>(args?: SelectSubset<T, EquipmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Equipment.
     * @param {EquipmentCreateArgs} args - Arguments to create a Equipment.
     * @example
     * // Create one Equipment
     * const Equipment = await prisma.equipment.create({
     *   data: {
     *     // ... data to create a Equipment
     *   }
     * })
     * 
     */
    create<T extends EquipmentCreateArgs>(args: SelectSubset<T, EquipmentCreateArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Equipment.
     * @param {EquipmentCreateManyArgs} args - Arguments to create many Equipment.
     * @example
     * // Create many Equipment
     * const equipment = await prisma.equipment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EquipmentCreateManyArgs>(args?: SelectSubset<T, EquipmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Equipment.
     * @param {EquipmentDeleteArgs} args - Arguments to delete one Equipment.
     * @example
     * // Delete one Equipment
     * const Equipment = await prisma.equipment.delete({
     *   where: {
     *     // ... filter to delete one Equipment
     *   }
     * })
     * 
     */
    delete<T extends EquipmentDeleteArgs>(args: SelectSubset<T, EquipmentDeleteArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Equipment.
     * @param {EquipmentUpdateArgs} args - Arguments to update one Equipment.
     * @example
     * // Update one Equipment
     * const equipment = await prisma.equipment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EquipmentUpdateArgs>(args: SelectSubset<T, EquipmentUpdateArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Equipment.
     * @param {EquipmentDeleteManyArgs} args - Arguments to filter Equipment to delete.
     * @example
     * // Delete a few Equipment
     * const { count } = await prisma.equipment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EquipmentDeleteManyArgs>(args?: SelectSubset<T, EquipmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Equipment
     * const equipment = await prisma.equipment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EquipmentUpdateManyArgs>(args: SelectSubset<T, EquipmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Equipment.
     * @param {EquipmentUpsertArgs} args - Arguments to update or create a Equipment.
     * @example
     * // Update or create a Equipment
     * const equipment = await prisma.equipment.upsert({
     *   create: {
     *     // ... data to create a Equipment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Equipment we want to update
     *   }
     * })
     */
    upsert<T extends EquipmentUpsertArgs>(args: SelectSubset<T, EquipmentUpsertArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Equipment that matches the filter.
     * @param {EquipmentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const equipment = await prisma.equipment.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: EquipmentFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Equipment.
     * @param {EquipmentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const equipment = await prisma.equipment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: EquipmentAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentCountArgs} args - Arguments to filter Equipment to count.
     * @example
     * // Count the number of Equipment
     * const count = await prisma.equipment.count({
     *   where: {
     *     // ... the filter for the Equipment we want to count
     *   }
     * })
    **/
    count<T extends EquipmentCountArgs>(
      args?: Subset<T, EquipmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EquipmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EquipmentAggregateArgs>(args: Subset<T, EquipmentAggregateArgs>): Prisma.PrismaPromise<GetEquipmentAggregateType<T>>

    /**
     * Group by Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentGroupByArgs} args - Group by arguments.
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
      T extends EquipmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EquipmentGroupByArgs['orderBy'] }
        : { orderBy?: EquipmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EquipmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEquipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Equipment model
   */
  readonly fields: EquipmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Equipment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EquipmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    maintenanceLogs<T extends Equipment$maintenanceLogsArgs<ExtArgs> = {}>(args?: Subset<T, Equipment$maintenanceLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdBy<T extends Equipment$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Equipment$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Equipment model
   */
  interface EquipmentFieldRefs {
    readonly id: FieldRef<"Equipment", 'String'>
    readonly name: FieldRef<"Equipment", 'String'>
    readonly description: FieldRef<"Equipment", 'String'>
    readonly category: FieldRef<"Equipment", 'String'>
    readonly purchaseDate: FieldRef<"Equipment", 'DateTime'>
    readonly purchasePrice: FieldRef<"Equipment", 'Float'>
    readonly manufacturer: FieldRef<"Equipment", 'String'>
    readonly model: FieldRef<"Equipment", 'String'>
    readonly serialNumber: FieldRef<"Equipment", 'String'>
    readonly status: FieldRef<"Equipment", 'String'>
    readonly location: FieldRef<"Equipment", 'String'>
    readonly lastMaintenance: FieldRef<"Equipment", 'DateTime'>
    readonly nextMaintenance: FieldRef<"Equipment", 'DateTime'>
    readonly imageBase64: FieldRef<"Equipment", 'String'>
    readonly notes: FieldRef<"Equipment", 'String'>
    readonly createdById: FieldRef<"Equipment", 'String'>
    readonly createdAt: FieldRef<"Equipment", 'DateTime'>
    readonly updatedAt: FieldRef<"Equipment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Equipment findUnique
   */
  export type EquipmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipmentInclude<ExtArgs> | null
    /**
     * Filter, which Equipment to fetch.
     */
    where: EquipmentWhereUniqueInput
  }

  /**
   * Equipment findUniqueOrThrow
   */
  export type EquipmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipmentInclude<ExtArgs> | null
    /**
     * Filter, which Equipment to fetch.
     */
    where: EquipmentWhereUniqueInput
  }

  /**
   * Equipment findFirst
   */
  export type EquipmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipmentInclude<ExtArgs> | null
    /**
     * Filter, which Equipment to fetch.
     */
    where?: EquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Equipment to fetch.
     */
    orderBy?: EquipmentOrderByWithRelationInput | EquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Equipment.
     */
    cursor?: EquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Equipment from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Equipment.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Equipment.
     */
    distinct?: EquipmentScalarFieldEnum | EquipmentScalarFieldEnum[]
  }

  /**
   * Equipment findFirstOrThrow
   */
  export type EquipmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipmentInclude<ExtArgs> | null
    /**
     * Filter, which Equipment to fetch.
     */
    where?: EquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Equipment to fetch.
     */
    orderBy?: EquipmentOrderByWithRelationInput | EquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Equipment.
     */
    cursor?: EquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Equipment from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Equipment.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Equipment.
     */
    distinct?: EquipmentScalarFieldEnum | EquipmentScalarFieldEnum[]
  }

  /**
   * Equipment findMany
   */
  export type EquipmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipmentInclude<ExtArgs> | null
    /**
     * Filter, which Equipment to fetch.
     */
    where?: EquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Equipment to fetch.
     */
    orderBy?: EquipmentOrderByWithRelationInput | EquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Equipment.
     */
    cursor?: EquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Equipment from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Equipment.
     */
    skip?: number
    distinct?: EquipmentScalarFieldEnum | EquipmentScalarFieldEnum[]
  }

  /**
   * Equipment create
   */
  export type EquipmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Equipment.
     */
    data: XOR<EquipmentCreateInput, EquipmentUncheckedCreateInput>
  }

  /**
   * Equipment createMany
   */
  export type EquipmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Equipment.
     */
    data: EquipmentCreateManyInput | EquipmentCreateManyInput[]
  }

  /**
   * Equipment update
   */
  export type EquipmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Equipment.
     */
    data: XOR<EquipmentUpdateInput, EquipmentUncheckedUpdateInput>
    /**
     * Choose, which Equipment to update.
     */
    where: EquipmentWhereUniqueInput
  }

  /**
   * Equipment updateMany
   */
  export type EquipmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Equipment.
     */
    data: XOR<EquipmentUpdateManyMutationInput, EquipmentUncheckedUpdateManyInput>
    /**
     * Filter which Equipment to update
     */
    where?: EquipmentWhereInput
    /**
     * Limit how many Equipment to update.
     */
    limit?: number
  }

  /**
   * Equipment upsert
   */
  export type EquipmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Equipment to update in case it exists.
     */
    where: EquipmentWhereUniqueInput
    /**
     * In case the Equipment found by the `where` argument doesn't exist, create a new Equipment with this data.
     */
    create: XOR<EquipmentCreateInput, EquipmentUncheckedCreateInput>
    /**
     * In case the Equipment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EquipmentUpdateInput, EquipmentUncheckedUpdateInput>
  }

  /**
   * Equipment delete
   */
  export type EquipmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipmentInclude<ExtArgs> | null
    /**
     * Filter which Equipment to delete.
     */
    where: EquipmentWhereUniqueInput
  }

  /**
   * Equipment deleteMany
   */
  export type EquipmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Equipment to delete
     */
    where?: EquipmentWhereInput
    /**
     * Limit how many Equipment to delete.
     */
    limit?: number
  }

  /**
   * Equipment findRaw
   */
  export type EquipmentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Equipment aggregateRaw
   */
  export type EquipmentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Equipment.maintenanceLogs
   */
  export type Equipment$maintenanceLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceLog
     */
    select?: MaintenanceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintenanceLog
     */
    omit?: MaintenanceLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceLogInclude<ExtArgs> | null
    where?: MaintenanceLogWhereInput
    orderBy?: MaintenanceLogOrderByWithRelationInput | MaintenanceLogOrderByWithRelationInput[]
    cursor?: MaintenanceLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaintenanceLogScalarFieldEnum | MaintenanceLogScalarFieldEnum[]
  }

  /**
   * Equipment.createdBy
   */
  export type Equipment$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Equipment without action
   */
  export type EquipmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipmentInclude<ExtArgs> | null
  }


  /**
   * Model MaintenanceLog
   */

  export type AggregateMaintenanceLog = {
    _count: MaintenanceLogCountAggregateOutputType | null
    _avg: MaintenanceLogAvgAggregateOutputType | null
    _sum: MaintenanceLogSumAggregateOutputType | null
    _min: MaintenanceLogMinAggregateOutputType | null
    _max: MaintenanceLogMaxAggregateOutputType | null
  }

  export type MaintenanceLogAvgAggregateOutputType = {
    cost: number | null
  }

  export type MaintenanceLogSumAggregateOutputType = {
    cost: number | null
  }

  export type MaintenanceLogMinAggregateOutputType = {
    id: string | null
    equipmentId: string | null
    maintenanceDate: Date | null
    maintenanceType: string | null
    description: string | null
    cost: number | null
    technician: string | null
    parts: string | null
    status: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MaintenanceLogMaxAggregateOutputType = {
    id: string | null
    equipmentId: string | null
    maintenanceDate: Date | null
    maintenanceType: string | null
    description: string | null
    cost: number | null
    technician: string | null
    parts: string | null
    status: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MaintenanceLogCountAggregateOutputType = {
    id: number
    equipmentId: number
    maintenanceDate: number
    maintenanceType: number
    description: number
    cost: number
    technician: number
    parts: number
    status: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MaintenanceLogAvgAggregateInputType = {
    cost?: true
  }

  export type MaintenanceLogSumAggregateInputType = {
    cost?: true
  }

  export type MaintenanceLogMinAggregateInputType = {
    id?: true
    equipmentId?: true
    maintenanceDate?: true
    maintenanceType?: true
    description?: true
    cost?: true
    technician?: true
    parts?: true
    status?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MaintenanceLogMaxAggregateInputType = {
    id?: true
    equipmentId?: true
    maintenanceDate?: true
    maintenanceType?: true
    description?: true
    cost?: true
    technician?: true
    parts?: true
    status?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MaintenanceLogCountAggregateInputType = {
    id?: true
    equipmentId?: true
    maintenanceDate?: true
    maintenanceType?: true
    description?: true
    cost?: true
    technician?: true
    parts?: true
    status?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MaintenanceLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenanceLog to aggregate.
     */
    where?: MaintenanceLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintenanceLogs to fetch.
     */
    orderBy?: MaintenanceLogOrderByWithRelationInput | MaintenanceLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaintenanceLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintenanceLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintenanceLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaintenanceLogs
    **/
    _count?: true | MaintenanceLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MaintenanceLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MaintenanceLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaintenanceLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaintenanceLogMaxAggregateInputType
  }

  export type GetMaintenanceLogAggregateType<T extends MaintenanceLogAggregateArgs> = {
        [P in keyof T & keyof AggregateMaintenanceLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaintenanceLog[P]>
      : GetScalarType<T[P], AggregateMaintenanceLog[P]>
  }




  export type MaintenanceLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaintenanceLogWhereInput
    orderBy?: MaintenanceLogOrderByWithAggregationInput | MaintenanceLogOrderByWithAggregationInput[]
    by: MaintenanceLogScalarFieldEnum[] | MaintenanceLogScalarFieldEnum
    having?: MaintenanceLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaintenanceLogCountAggregateInputType | true
    _avg?: MaintenanceLogAvgAggregateInputType
    _sum?: MaintenanceLogSumAggregateInputType
    _min?: MaintenanceLogMinAggregateInputType
    _max?: MaintenanceLogMaxAggregateInputType
  }

  export type MaintenanceLogGroupByOutputType = {
    id: string
    equipmentId: string
    maintenanceDate: Date
    maintenanceType: string
    description: string
    cost: number | null
    technician: string | null
    parts: string | null
    status: string
    createdById: string | null
    createdAt: Date
    updatedAt: Date
    _count: MaintenanceLogCountAggregateOutputType | null
    _avg: MaintenanceLogAvgAggregateOutputType | null
    _sum: MaintenanceLogSumAggregateOutputType | null
    _min: MaintenanceLogMinAggregateOutputType | null
    _max: MaintenanceLogMaxAggregateOutputType | null
  }

  type GetMaintenanceLogGroupByPayload<T extends MaintenanceLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaintenanceLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaintenanceLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaintenanceLogGroupByOutputType[P]>
            : GetScalarType<T[P], MaintenanceLogGroupByOutputType[P]>
        }
      >
    >


  export type MaintenanceLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    equipmentId?: boolean
    maintenanceDate?: boolean
    maintenanceType?: boolean
    description?: boolean
    cost?: boolean
    technician?: boolean
    parts?: boolean
    status?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    equipment?: boolean | EquipmentDefaultArgs<ExtArgs>
    createdBy?: boolean | MaintenanceLog$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["maintenanceLog"]>



  export type MaintenanceLogSelectScalar = {
    id?: boolean
    equipmentId?: boolean
    maintenanceDate?: boolean
    maintenanceType?: boolean
    description?: boolean
    cost?: boolean
    technician?: boolean
    parts?: boolean
    status?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MaintenanceLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "equipmentId" | "maintenanceDate" | "maintenanceType" | "description" | "cost" | "technician" | "parts" | "status" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["maintenanceLog"]>
  export type MaintenanceLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    equipment?: boolean | EquipmentDefaultArgs<ExtArgs>
    createdBy?: boolean | MaintenanceLog$createdByArgs<ExtArgs>
  }

  export type $MaintenanceLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaintenanceLog"
    objects: {
      equipment: Prisma.$EquipmentPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      equipmentId: string
      maintenanceDate: Date
      maintenanceType: string
      description: string
      cost: number | null
      technician: string | null
      parts: string | null
      status: string
      createdById: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["maintenanceLog"]>
    composites: {}
  }

  type MaintenanceLogGetPayload<S extends boolean | null | undefined | MaintenanceLogDefaultArgs> = $Result.GetResult<Prisma.$MaintenanceLogPayload, S>

  type MaintenanceLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MaintenanceLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MaintenanceLogCountAggregateInputType | true
    }

  export interface MaintenanceLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaintenanceLog'], meta: { name: 'MaintenanceLog' } }
    /**
     * Find zero or one MaintenanceLog that matches the filter.
     * @param {MaintenanceLogFindUniqueArgs} args - Arguments to find a MaintenanceLog
     * @example
     * // Get one MaintenanceLog
     * const maintenanceLog = await prisma.maintenanceLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaintenanceLogFindUniqueArgs>(args: SelectSubset<T, MaintenanceLogFindUniqueArgs<ExtArgs>>): Prisma__MaintenanceLogClient<$Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MaintenanceLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaintenanceLogFindUniqueOrThrowArgs} args - Arguments to find a MaintenanceLog
     * @example
     * // Get one MaintenanceLog
     * const maintenanceLog = await prisma.maintenanceLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaintenanceLogFindUniqueOrThrowArgs>(args: SelectSubset<T, MaintenanceLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaintenanceLogClient<$Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaintenanceLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceLogFindFirstArgs} args - Arguments to find a MaintenanceLog
     * @example
     * // Get one MaintenanceLog
     * const maintenanceLog = await prisma.maintenanceLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaintenanceLogFindFirstArgs>(args?: SelectSubset<T, MaintenanceLogFindFirstArgs<ExtArgs>>): Prisma__MaintenanceLogClient<$Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaintenanceLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceLogFindFirstOrThrowArgs} args - Arguments to find a MaintenanceLog
     * @example
     * // Get one MaintenanceLog
     * const maintenanceLog = await prisma.maintenanceLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaintenanceLogFindFirstOrThrowArgs>(args?: SelectSubset<T, MaintenanceLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaintenanceLogClient<$Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MaintenanceLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaintenanceLogs
     * const maintenanceLogs = await prisma.maintenanceLog.findMany()
     * 
     * // Get first 10 MaintenanceLogs
     * const maintenanceLogs = await prisma.maintenanceLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const maintenanceLogWithIdOnly = await prisma.maintenanceLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaintenanceLogFindManyArgs>(args?: SelectSubset<T, MaintenanceLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MaintenanceLog.
     * @param {MaintenanceLogCreateArgs} args - Arguments to create a MaintenanceLog.
     * @example
     * // Create one MaintenanceLog
     * const MaintenanceLog = await prisma.maintenanceLog.create({
     *   data: {
     *     // ... data to create a MaintenanceLog
     *   }
     * })
     * 
     */
    create<T extends MaintenanceLogCreateArgs>(args: SelectSubset<T, MaintenanceLogCreateArgs<ExtArgs>>): Prisma__MaintenanceLogClient<$Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MaintenanceLogs.
     * @param {MaintenanceLogCreateManyArgs} args - Arguments to create many MaintenanceLogs.
     * @example
     * // Create many MaintenanceLogs
     * const maintenanceLog = await prisma.maintenanceLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaintenanceLogCreateManyArgs>(args?: SelectSubset<T, MaintenanceLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MaintenanceLog.
     * @param {MaintenanceLogDeleteArgs} args - Arguments to delete one MaintenanceLog.
     * @example
     * // Delete one MaintenanceLog
     * const MaintenanceLog = await prisma.maintenanceLog.delete({
     *   where: {
     *     // ... filter to delete one MaintenanceLog
     *   }
     * })
     * 
     */
    delete<T extends MaintenanceLogDeleteArgs>(args: SelectSubset<T, MaintenanceLogDeleteArgs<ExtArgs>>): Prisma__MaintenanceLogClient<$Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MaintenanceLog.
     * @param {MaintenanceLogUpdateArgs} args - Arguments to update one MaintenanceLog.
     * @example
     * // Update one MaintenanceLog
     * const maintenanceLog = await prisma.maintenanceLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaintenanceLogUpdateArgs>(args: SelectSubset<T, MaintenanceLogUpdateArgs<ExtArgs>>): Prisma__MaintenanceLogClient<$Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MaintenanceLogs.
     * @param {MaintenanceLogDeleteManyArgs} args - Arguments to filter MaintenanceLogs to delete.
     * @example
     * // Delete a few MaintenanceLogs
     * const { count } = await prisma.maintenanceLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaintenanceLogDeleteManyArgs>(args?: SelectSubset<T, MaintenanceLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaintenanceLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaintenanceLogs
     * const maintenanceLog = await prisma.maintenanceLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaintenanceLogUpdateManyArgs>(args: SelectSubset<T, MaintenanceLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MaintenanceLog.
     * @param {MaintenanceLogUpsertArgs} args - Arguments to update or create a MaintenanceLog.
     * @example
     * // Update or create a MaintenanceLog
     * const maintenanceLog = await prisma.maintenanceLog.upsert({
     *   create: {
     *     // ... data to create a MaintenanceLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaintenanceLog we want to update
     *   }
     * })
     */
    upsert<T extends MaintenanceLogUpsertArgs>(args: SelectSubset<T, MaintenanceLogUpsertArgs<ExtArgs>>): Prisma__MaintenanceLogClient<$Result.GetResult<Prisma.$MaintenanceLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MaintenanceLogs that matches the filter.
     * @param {MaintenanceLogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const maintenanceLog = await prisma.maintenanceLog.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MaintenanceLogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a MaintenanceLog.
     * @param {MaintenanceLogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const maintenanceLog = await prisma.maintenanceLog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MaintenanceLogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of MaintenanceLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceLogCountArgs} args - Arguments to filter MaintenanceLogs to count.
     * @example
     * // Count the number of MaintenanceLogs
     * const count = await prisma.maintenanceLog.count({
     *   where: {
     *     // ... the filter for the MaintenanceLogs we want to count
     *   }
     * })
    **/
    count<T extends MaintenanceLogCountArgs>(
      args?: Subset<T, MaintenanceLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaintenanceLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaintenanceLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaintenanceLogAggregateArgs>(args: Subset<T, MaintenanceLogAggregateArgs>): Prisma.PrismaPromise<GetMaintenanceLogAggregateType<T>>

    /**
     * Group by MaintenanceLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceLogGroupByArgs} args - Group by arguments.
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
      T extends MaintenanceLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaintenanceLogGroupByArgs['orderBy'] }
        : { orderBy?: MaintenanceLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MaintenanceLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaintenanceLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaintenanceLog model
   */
  readonly fields: MaintenanceLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaintenanceLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaintenanceLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    equipment<T extends EquipmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EquipmentDefaultArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends MaintenanceLog$createdByArgs<ExtArgs> = {}>(args?: Subset<T, MaintenanceLog$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MaintenanceLog model
   */
  interface MaintenanceLogFieldRefs {
    readonly id: FieldRef<"MaintenanceLog", 'String'>
    readonly equipmentId: FieldRef<"MaintenanceLog", 'String'>
    readonly maintenanceDate: FieldRef<"MaintenanceLog", 'DateTime'>
    readonly maintenanceType: FieldRef<"MaintenanceLog", 'String'>
    readonly description: FieldRef<"MaintenanceLog", 'String'>
    readonly cost: FieldRef<"MaintenanceLog", 'Float'>
    readonly technician: FieldRef<"MaintenanceLog", 'String'>
    readonly parts: FieldRef<"MaintenanceLog", 'String'>
    readonly status: FieldRef<"MaintenanceLog", 'String'>
    readonly createdById: FieldRef<"MaintenanceLog", 'String'>
    readonly createdAt: FieldRef<"MaintenanceLog", 'DateTime'>
    readonly updatedAt: FieldRef<"MaintenanceLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MaintenanceLog findUnique
   */
  export type MaintenanceLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceLog
     */
    select?: MaintenanceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintenanceLog
     */
    omit?: MaintenanceLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceLogInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceLog to fetch.
     */
    where: MaintenanceLogWhereUniqueInput
  }

  /**
   * MaintenanceLog findUniqueOrThrow
   */
  export type MaintenanceLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceLog
     */
    select?: MaintenanceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintenanceLog
     */
    omit?: MaintenanceLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceLogInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceLog to fetch.
     */
    where: MaintenanceLogWhereUniqueInput
  }

  /**
   * MaintenanceLog findFirst
   */
  export type MaintenanceLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceLog
     */
    select?: MaintenanceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintenanceLog
     */
    omit?: MaintenanceLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceLogInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceLog to fetch.
     */
    where?: MaintenanceLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintenanceLogs to fetch.
     */
    orderBy?: MaintenanceLogOrderByWithRelationInput | MaintenanceLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaintenanceLogs.
     */
    cursor?: MaintenanceLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintenanceLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintenanceLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaintenanceLogs.
     */
    distinct?: MaintenanceLogScalarFieldEnum | MaintenanceLogScalarFieldEnum[]
  }

  /**
   * MaintenanceLog findFirstOrThrow
   */
  export type MaintenanceLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceLog
     */
    select?: MaintenanceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintenanceLog
     */
    omit?: MaintenanceLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceLogInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceLog to fetch.
     */
    where?: MaintenanceLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintenanceLogs to fetch.
     */
    orderBy?: MaintenanceLogOrderByWithRelationInput | MaintenanceLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaintenanceLogs.
     */
    cursor?: MaintenanceLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintenanceLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintenanceLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaintenanceLogs.
     */
    distinct?: MaintenanceLogScalarFieldEnum | MaintenanceLogScalarFieldEnum[]
  }

  /**
   * MaintenanceLog findMany
   */
  export type MaintenanceLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceLog
     */
    select?: MaintenanceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintenanceLog
     */
    omit?: MaintenanceLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceLogInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceLogs to fetch.
     */
    where?: MaintenanceLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintenanceLogs to fetch.
     */
    orderBy?: MaintenanceLogOrderByWithRelationInput | MaintenanceLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaintenanceLogs.
     */
    cursor?: MaintenanceLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintenanceLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintenanceLogs.
     */
    skip?: number
    distinct?: MaintenanceLogScalarFieldEnum | MaintenanceLogScalarFieldEnum[]
  }

  /**
   * MaintenanceLog create
   */
  export type MaintenanceLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceLog
     */
    select?: MaintenanceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintenanceLog
     */
    omit?: MaintenanceLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceLogInclude<ExtArgs> | null
    /**
     * The data needed to create a MaintenanceLog.
     */
    data: XOR<MaintenanceLogCreateInput, MaintenanceLogUncheckedCreateInput>
  }

  /**
   * MaintenanceLog createMany
   */
  export type MaintenanceLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaintenanceLogs.
     */
    data: MaintenanceLogCreateManyInput | MaintenanceLogCreateManyInput[]
  }

  /**
   * MaintenanceLog update
   */
  export type MaintenanceLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceLog
     */
    select?: MaintenanceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintenanceLog
     */
    omit?: MaintenanceLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceLogInclude<ExtArgs> | null
    /**
     * The data needed to update a MaintenanceLog.
     */
    data: XOR<MaintenanceLogUpdateInput, MaintenanceLogUncheckedUpdateInput>
    /**
     * Choose, which MaintenanceLog to update.
     */
    where: MaintenanceLogWhereUniqueInput
  }

  /**
   * MaintenanceLog updateMany
   */
  export type MaintenanceLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaintenanceLogs.
     */
    data: XOR<MaintenanceLogUpdateManyMutationInput, MaintenanceLogUncheckedUpdateManyInput>
    /**
     * Filter which MaintenanceLogs to update
     */
    where?: MaintenanceLogWhereInput
    /**
     * Limit how many MaintenanceLogs to update.
     */
    limit?: number
  }

  /**
   * MaintenanceLog upsert
   */
  export type MaintenanceLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceLog
     */
    select?: MaintenanceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintenanceLog
     */
    omit?: MaintenanceLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceLogInclude<ExtArgs> | null
    /**
     * The filter to search for the MaintenanceLog to update in case it exists.
     */
    where: MaintenanceLogWhereUniqueInput
    /**
     * In case the MaintenanceLog found by the `where` argument doesn't exist, create a new MaintenanceLog with this data.
     */
    create: XOR<MaintenanceLogCreateInput, MaintenanceLogUncheckedCreateInput>
    /**
     * In case the MaintenanceLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaintenanceLogUpdateInput, MaintenanceLogUncheckedUpdateInput>
  }

  /**
   * MaintenanceLog delete
   */
  export type MaintenanceLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceLog
     */
    select?: MaintenanceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintenanceLog
     */
    omit?: MaintenanceLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceLogInclude<ExtArgs> | null
    /**
     * Filter which MaintenanceLog to delete.
     */
    where: MaintenanceLogWhereUniqueInput
  }

  /**
   * MaintenanceLog deleteMany
   */
  export type MaintenanceLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenanceLogs to delete
     */
    where?: MaintenanceLogWhereInput
    /**
     * Limit how many MaintenanceLogs to delete.
     */
    limit?: number
  }

  /**
   * MaintenanceLog findRaw
   */
  export type MaintenanceLogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * MaintenanceLog aggregateRaw
   */
  export type MaintenanceLogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * MaintenanceLog.createdBy
   */
  export type MaintenanceLog$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * MaintenanceLog without action
   */
  export type MaintenanceLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceLog
     */
    select?: MaintenanceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintenanceLog
     */
    omit?: MaintenanceLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceLogInclude<ExtArgs> | null
  }


  /**
   * Model SubscriptionCancellationRequest
   */

  export type AggregateSubscriptionCancellationRequest = {
    _count: SubscriptionCancellationRequestCountAggregateOutputType | null
    _avg: SubscriptionCancellationRequestAvgAggregateOutputType | null
    _sum: SubscriptionCancellationRequestSumAggregateOutputType | null
    _min: SubscriptionCancellationRequestMinAggregateOutputType | null
    _max: SubscriptionCancellationRequestMaxAggregateOutputType | null
  }

  export type SubscriptionCancellationRequestAvgAggregateOutputType = {
    refundAmount: number | null
  }

  export type SubscriptionCancellationRequestSumAggregateOutputType = {
    refundAmount: number | null
  }

  export type SubscriptionCancellationRequestMinAggregateOutputType = {
    id: string | null
    subscriptionId: string | null
    memberId: string | null
    requestDate: Date | null
    status: string | null
    reason: string | null
    adminNote: string | null
    refundAmount: number | null
    processedById: string | null
    processedDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCancellationRequestMaxAggregateOutputType = {
    id: string | null
    subscriptionId: string | null
    memberId: string | null
    requestDate: Date | null
    status: string | null
    reason: string | null
    adminNote: string | null
    refundAmount: number | null
    processedById: string | null
    processedDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCancellationRequestCountAggregateOutputType = {
    id: number
    subscriptionId: number
    memberId: number
    requestDate: number
    status: number
    reason: number
    adminNote: number
    refundAmount: number
    processedById: number
    processedDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionCancellationRequestAvgAggregateInputType = {
    refundAmount?: true
  }

  export type SubscriptionCancellationRequestSumAggregateInputType = {
    refundAmount?: true
  }

  export type SubscriptionCancellationRequestMinAggregateInputType = {
    id?: true
    subscriptionId?: true
    memberId?: true
    requestDate?: true
    status?: true
    reason?: true
    adminNote?: true
    refundAmount?: true
    processedById?: true
    processedDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCancellationRequestMaxAggregateInputType = {
    id?: true
    subscriptionId?: true
    memberId?: true
    requestDate?: true
    status?: true
    reason?: true
    adminNote?: true
    refundAmount?: true
    processedById?: true
    processedDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCancellationRequestCountAggregateInputType = {
    id?: true
    subscriptionId?: true
    memberId?: true
    requestDate?: true
    status?: true
    reason?: true
    adminNote?: true
    refundAmount?: true
    processedById?: true
    processedDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionCancellationRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionCancellationRequest to aggregate.
     */
    where?: SubscriptionCancellationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionCancellationRequests to fetch.
     */
    orderBy?: SubscriptionCancellationRequestOrderByWithRelationInput | SubscriptionCancellationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionCancellationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionCancellationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionCancellationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubscriptionCancellationRequests
    **/
    _count?: true | SubscriptionCancellationRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionCancellationRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionCancellationRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionCancellationRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionCancellationRequestMaxAggregateInputType
  }

  export type GetSubscriptionCancellationRequestAggregateType<T extends SubscriptionCancellationRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriptionCancellationRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriptionCancellationRequest[P]>
      : GetScalarType<T[P], AggregateSubscriptionCancellationRequest[P]>
  }




  export type SubscriptionCancellationRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionCancellationRequestWhereInput
    orderBy?: SubscriptionCancellationRequestOrderByWithAggregationInput | SubscriptionCancellationRequestOrderByWithAggregationInput[]
    by: SubscriptionCancellationRequestScalarFieldEnum[] | SubscriptionCancellationRequestScalarFieldEnum
    having?: SubscriptionCancellationRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCancellationRequestCountAggregateInputType | true
    _avg?: SubscriptionCancellationRequestAvgAggregateInputType
    _sum?: SubscriptionCancellationRequestSumAggregateInputType
    _min?: SubscriptionCancellationRequestMinAggregateInputType
    _max?: SubscriptionCancellationRequestMaxAggregateInputType
  }

  export type SubscriptionCancellationRequestGroupByOutputType = {
    id: string
    subscriptionId: string
    memberId: string
    requestDate: Date
    status: string
    reason: string | null
    adminNote: string | null
    refundAmount: number | null
    processedById: string | null
    processedDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCancellationRequestCountAggregateOutputType | null
    _avg: SubscriptionCancellationRequestAvgAggregateOutputType | null
    _sum: SubscriptionCancellationRequestSumAggregateOutputType | null
    _min: SubscriptionCancellationRequestMinAggregateOutputType | null
    _max: SubscriptionCancellationRequestMaxAggregateOutputType | null
  }

  type GetSubscriptionCancellationRequestGroupByPayload<T extends SubscriptionCancellationRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionCancellationRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionCancellationRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionCancellationRequestGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionCancellationRequestGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionCancellationRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriptionId?: boolean
    memberId?: boolean
    requestDate?: boolean
    status?: boolean
    reason?: boolean
    adminNote?: boolean
    refundAmount?: boolean
    processedById?: boolean
    processedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
    member?: boolean | UserDefaultArgs<ExtArgs>
    processedBy?: boolean | SubscriptionCancellationRequest$processedByArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptionCancellationRequest"]>



  export type SubscriptionCancellationRequestSelectScalar = {
    id?: boolean
    subscriptionId?: boolean
    memberId?: boolean
    requestDate?: boolean
    status?: boolean
    reason?: boolean
    adminNote?: boolean
    refundAmount?: boolean
    processedById?: boolean
    processedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionCancellationRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "subscriptionId" | "memberId" | "requestDate" | "status" | "reason" | "adminNote" | "refundAmount" | "processedById" | "processedDate" | "createdAt" | "updatedAt", ExtArgs["result"]["subscriptionCancellationRequest"]>
  export type SubscriptionCancellationRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
    member?: boolean | UserDefaultArgs<ExtArgs>
    processedBy?: boolean | SubscriptionCancellationRequest$processedByArgs<ExtArgs>
  }

  export type $SubscriptionCancellationRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubscriptionCancellationRequest"
    objects: {
      subscription: Prisma.$SubscriptionPayload<ExtArgs>
      member: Prisma.$UserPayload<ExtArgs>
      processedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      subscriptionId: string
      memberId: string
      requestDate: Date
      status: string
      reason: string | null
      adminNote: string | null
      refundAmount: number | null
      processedById: string | null
      processedDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscriptionCancellationRequest"]>
    composites: {}
  }

  type SubscriptionCancellationRequestGetPayload<S extends boolean | null | undefined | SubscriptionCancellationRequestDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload, S>

  type SubscriptionCancellationRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionCancellationRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCancellationRequestCountAggregateInputType | true
    }

  export interface SubscriptionCancellationRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubscriptionCancellationRequest'], meta: { name: 'SubscriptionCancellationRequest' } }
    /**
     * Find zero or one SubscriptionCancellationRequest that matches the filter.
     * @param {SubscriptionCancellationRequestFindUniqueArgs} args - Arguments to find a SubscriptionCancellationRequest
     * @example
     * // Get one SubscriptionCancellationRequest
     * const subscriptionCancellationRequest = await prisma.subscriptionCancellationRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionCancellationRequestFindUniqueArgs>(args: SelectSubset<T, SubscriptionCancellationRequestFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionCancellationRequestClient<$Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubscriptionCancellationRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionCancellationRequestFindUniqueOrThrowArgs} args - Arguments to find a SubscriptionCancellationRequest
     * @example
     * // Get one SubscriptionCancellationRequest
     * const subscriptionCancellationRequest = await prisma.subscriptionCancellationRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionCancellationRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionCancellationRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionCancellationRequestClient<$Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscriptionCancellationRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCancellationRequestFindFirstArgs} args - Arguments to find a SubscriptionCancellationRequest
     * @example
     * // Get one SubscriptionCancellationRequest
     * const subscriptionCancellationRequest = await prisma.subscriptionCancellationRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionCancellationRequestFindFirstArgs>(args?: SelectSubset<T, SubscriptionCancellationRequestFindFirstArgs<ExtArgs>>): Prisma__SubscriptionCancellationRequestClient<$Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscriptionCancellationRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCancellationRequestFindFirstOrThrowArgs} args - Arguments to find a SubscriptionCancellationRequest
     * @example
     * // Get one SubscriptionCancellationRequest
     * const subscriptionCancellationRequest = await prisma.subscriptionCancellationRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionCancellationRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionCancellationRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionCancellationRequestClient<$Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubscriptionCancellationRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCancellationRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubscriptionCancellationRequests
     * const subscriptionCancellationRequests = await prisma.subscriptionCancellationRequest.findMany()
     * 
     * // Get first 10 SubscriptionCancellationRequests
     * const subscriptionCancellationRequests = await prisma.subscriptionCancellationRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionCancellationRequestWithIdOnly = await prisma.subscriptionCancellationRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionCancellationRequestFindManyArgs>(args?: SelectSubset<T, SubscriptionCancellationRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubscriptionCancellationRequest.
     * @param {SubscriptionCancellationRequestCreateArgs} args - Arguments to create a SubscriptionCancellationRequest.
     * @example
     * // Create one SubscriptionCancellationRequest
     * const SubscriptionCancellationRequest = await prisma.subscriptionCancellationRequest.create({
     *   data: {
     *     // ... data to create a SubscriptionCancellationRequest
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCancellationRequestCreateArgs>(args: SelectSubset<T, SubscriptionCancellationRequestCreateArgs<ExtArgs>>): Prisma__SubscriptionCancellationRequestClient<$Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubscriptionCancellationRequests.
     * @param {SubscriptionCancellationRequestCreateManyArgs} args - Arguments to create many SubscriptionCancellationRequests.
     * @example
     * // Create many SubscriptionCancellationRequests
     * const subscriptionCancellationRequest = await prisma.subscriptionCancellationRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCancellationRequestCreateManyArgs>(args?: SelectSubset<T, SubscriptionCancellationRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SubscriptionCancellationRequest.
     * @param {SubscriptionCancellationRequestDeleteArgs} args - Arguments to delete one SubscriptionCancellationRequest.
     * @example
     * // Delete one SubscriptionCancellationRequest
     * const SubscriptionCancellationRequest = await prisma.subscriptionCancellationRequest.delete({
     *   where: {
     *     // ... filter to delete one SubscriptionCancellationRequest
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionCancellationRequestDeleteArgs>(args: SelectSubset<T, SubscriptionCancellationRequestDeleteArgs<ExtArgs>>): Prisma__SubscriptionCancellationRequestClient<$Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubscriptionCancellationRequest.
     * @param {SubscriptionCancellationRequestUpdateArgs} args - Arguments to update one SubscriptionCancellationRequest.
     * @example
     * // Update one SubscriptionCancellationRequest
     * const subscriptionCancellationRequest = await prisma.subscriptionCancellationRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionCancellationRequestUpdateArgs>(args: SelectSubset<T, SubscriptionCancellationRequestUpdateArgs<ExtArgs>>): Prisma__SubscriptionCancellationRequestClient<$Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubscriptionCancellationRequests.
     * @param {SubscriptionCancellationRequestDeleteManyArgs} args - Arguments to filter SubscriptionCancellationRequests to delete.
     * @example
     * // Delete a few SubscriptionCancellationRequests
     * const { count } = await prisma.subscriptionCancellationRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionCancellationRequestDeleteManyArgs>(args?: SelectSubset<T, SubscriptionCancellationRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriptionCancellationRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCancellationRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubscriptionCancellationRequests
     * const subscriptionCancellationRequest = await prisma.subscriptionCancellationRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionCancellationRequestUpdateManyArgs>(args: SelectSubset<T, SubscriptionCancellationRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SubscriptionCancellationRequest.
     * @param {SubscriptionCancellationRequestUpsertArgs} args - Arguments to update or create a SubscriptionCancellationRequest.
     * @example
     * // Update or create a SubscriptionCancellationRequest
     * const subscriptionCancellationRequest = await prisma.subscriptionCancellationRequest.upsert({
     *   create: {
     *     // ... data to create a SubscriptionCancellationRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubscriptionCancellationRequest we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionCancellationRequestUpsertArgs>(args: SelectSubset<T, SubscriptionCancellationRequestUpsertArgs<ExtArgs>>): Prisma__SubscriptionCancellationRequestClient<$Result.GetResult<Prisma.$SubscriptionCancellationRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubscriptionCancellationRequests that matches the filter.
     * @param {SubscriptionCancellationRequestFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const subscriptionCancellationRequest = await prisma.subscriptionCancellationRequest.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SubscriptionCancellationRequestFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a SubscriptionCancellationRequest.
     * @param {SubscriptionCancellationRequestAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const subscriptionCancellationRequest = await prisma.subscriptionCancellationRequest.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SubscriptionCancellationRequestAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of SubscriptionCancellationRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCancellationRequestCountArgs} args - Arguments to filter SubscriptionCancellationRequests to count.
     * @example
     * // Count the number of SubscriptionCancellationRequests
     * const count = await prisma.subscriptionCancellationRequest.count({
     *   where: {
     *     // ... the filter for the SubscriptionCancellationRequests we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCancellationRequestCountArgs>(
      args?: Subset<T, SubscriptionCancellationRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCancellationRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubscriptionCancellationRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCancellationRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubscriptionCancellationRequestAggregateArgs>(args: Subset<T, SubscriptionCancellationRequestAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionCancellationRequestAggregateType<T>>

    /**
     * Group by SubscriptionCancellationRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCancellationRequestGroupByArgs} args - Group by arguments.
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
      T extends SubscriptionCancellationRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionCancellationRequestGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionCancellationRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubscriptionCancellationRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionCancellationRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubscriptionCancellationRequest model
   */
  readonly fields: SubscriptionCancellationRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubscriptionCancellationRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionCancellationRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscription<T extends SubscriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubscriptionDefaultArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    member<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    processedBy<T extends SubscriptionCancellationRequest$processedByArgs<ExtArgs> = {}>(args?: Subset<T, SubscriptionCancellationRequest$processedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SubscriptionCancellationRequest model
   */
  interface SubscriptionCancellationRequestFieldRefs {
    readonly id: FieldRef<"SubscriptionCancellationRequest", 'String'>
    readonly subscriptionId: FieldRef<"SubscriptionCancellationRequest", 'String'>
    readonly memberId: FieldRef<"SubscriptionCancellationRequest", 'String'>
    readonly requestDate: FieldRef<"SubscriptionCancellationRequest", 'DateTime'>
    readonly status: FieldRef<"SubscriptionCancellationRequest", 'String'>
    readonly reason: FieldRef<"SubscriptionCancellationRequest", 'String'>
    readonly adminNote: FieldRef<"SubscriptionCancellationRequest", 'String'>
    readonly refundAmount: FieldRef<"SubscriptionCancellationRequest", 'Float'>
    readonly processedById: FieldRef<"SubscriptionCancellationRequest", 'String'>
    readonly processedDate: FieldRef<"SubscriptionCancellationRequest", 'DateTime'>
    readonly createdAt: FieldRef<"SubscriptionCancellationRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"SubscriptionCancellationRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SubscriptionCancellationRequest findUnique
   */
  export type SubscriptionCancellationRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionCancellationRequest to fetch.
     */
    where: SubscriptionCancellationRequestWhereUniqueInput
  }

  /**
   * SubscriptionCancellationRequest findUniqueOrThrow
   */
  export type SubscriptionCancellationRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionCancellationRequest to fetch.
     */
    where: SubscriptionCancellationRequestWhereUniqueInput
  }

  /**
   * SubscriptionCancellationRequest findFirst
   */
  export type SubscriptionCancellationRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionCancellationRequest to fetch.
     */
    where?: SubscriptionCancellationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionCancellationRequests to fetch.
     */
    orderBy?: SubscriptionCancellationRequestOrderByWithRelationInput | SubscriptionCancellationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionCancellationRequests.
     */
    cursor?: SubscriptionCancellationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionCancellationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionCancellationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionCancellationRequests.
     */
    distinct?: SubscriptionCancellationRequestScalarFieldEnum | SubscriptionCancellationRequestScalarFieldEnum[]
  }

  /**
   * SubscriptionCancellationRequest findFirstOrThrow
   */
  export type SubscriptionCancellationRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionCancellationRequest to fetch.
     */
    where?: SubscriptionCancellationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionCancellationRequests to fetch.
     */
    orderBy?: SubscriptionCancellationRequestOrderByWithRelationInput | SubscriptionCancellationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionCancellationRequests.
     */
    cursor?: SubscriptionCancellationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionCancellationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionCancellationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionCancellationRequests.
     */
    distinct?: SubscriptionCancellationRequestScalarFieldEnum | SubscriptionCancellationRequestScalarFieldEnum[]
  }

  /**
   * SubscriptionCancellationRequest findMany
   */
  export type SubscriptionCancellationRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionCancellationRequests to fetch.
     */
    where?: SubscriptionCancellationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionCancellationRequests to fetch.
     */
    orderBy?: SubscriptionCancellationRequestOrderByWithRelationInput | SubscriptionCancellationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubscriptionCancellationRequests.
     */
    cursor?: SubscriptionCancellationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionCancellationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionCancellationRequests.
     */
    skip?: number
    distinct?: SubscriptionCancellationRequestScalarFieldEnum | SubscriptionCancellationRequestScalarFieldEnum[]
  }

  /**
   * SubscriptionCancellationRequest create
   */
  export type SubscriptionCancellationRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a SubscriptionCancellationRequest.
     */
    data: XOR<SubscriptionCancellationRequestCreateInput, SubscriptionCancellationRequestUncheckedCreateInput>
  }

  /**
   * SubscriptionCancellationRequest createMany
   */
  export type SubscriptionCancellationRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubscriptionCancellationRequests.
     */
    data: SubscriptionCancellationRequestCreateManyInput | SubscriptionCancellationRequestCreateManyInput[]
  }

  /**
   * SubscriptionCancellationRequest update
   */
  export type SubscriptionCancellationRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a SubscriptionCancellationRequest.
     */
    data: XOR<SubscriptionCancellationRequestUpdateInput, SubscriptionCancellationRequestUncheckedUpdateInput>
    /**
     * Choose, which SubscriptionCancellationRequest to update.
     */
    where: SubscriptionCancellationRequestWhereUniqueInput
  }

  /**
   * SubscriptionCancellationRequest updateMany
   */
  export type SubscriptionCancellationRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubscriptionCancellationRequests.
     */
    data: XOR<SubscriptionCancellationRequestUpdateManyMutationInput, SubscriptionCancellationRequestUncheckedUpdateManyInput>
    /**
     * Filter which SubscriptionCancellationRequests to update
     */
    where?: SubscriptionCancellationRequestWhereInput
    /**
     * Limit how many SubscriptionCancellationRequests to update.
     */
    limit?: number
  }

  /**
   * SubscriptionCancellationRequest upsert
   */
  export type SubscriptionCancellationRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the SubscriptionCancellationRequest to update in case it exists.
     */
    where: SubscriptionCancellationRequestWhereUniqueInput
    /**
     * In case the SubscriptionCancellationRequest found by the `where` argument doesn't exist, create a new SubscriptionCancellationRequest with this data.
     */
    create: XOR<SubscriptionCancellationRequestCreateInput, SubscriptionCancellationRequestUncheckedCreateInput>
    /**
     * In case the SubscriptionCancellationRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionCancellationRequestUpdateInput, SubscriptionCancellationRequestUncheckedUpdateInput>
  }

  /**
   * SubscriptionCancellationRequest delete
   */
  export type SubscriptionCancellationRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
    /**
     * Filter which SubscriptionCancellationRequest to delete.
     */
    where: SubscriptionCancellationRequestWhereUniqueInput
  }

  /**
   * SubscriptionCancellationRequest deleteMany
   */
  export type SubscriptionCancellationRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionCancellationRequests to delete
     */
    where?: SubscriptionCancellationRequestWhereInput
    /**
     * Limit how many SubscriptionCancellationRequests to delete.
     */
    limit?: number
  }

  /**
   * SubscriptionCancellationRequest findRaw
   */
  export type SubscriptionCancellationRequestFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * SubscriptionCancellationRequest aggregateRaw
   */
  export type SubscriptionCancellationRequestAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * SubscriptionCancellationRequest.processedBy
   */
  export type SubscriptionCancellationRequest$processedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * SubscriptionCancellationRequest without action
   */
  export type SubscriptionCancellationRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCancellationRequest
     */
    select?: SubscriptionCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionCancellationRequest
     */
    omit?: SubscriptionCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionCancellationRequestInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    duration: number | null
  }

  export type AppointmentSumAggregateOutputType = {
    duration: number | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    memberId: string | null
    trainerId: string | null
    title: string | null
    description: string | null
    appointmentDate: Date | null
    duration: number | null
    status: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    memberId: string | null
    trainerId: string | null
    title: string | null
    description: string | null
    appointmentDate: Date | null
    duration: number | null
    status: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    memberId: number
    trainerId: number
    title: number
    description: number
    appointmentDate: number
    duration: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    duration?: true
  }

  export type AppointmentSumAggregateInputType = {
    duration?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    memberId?: true
    trainerId?: true
    title?: true
    description?: true
    appointmentDate?: true
    duration?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    memberId?: true
    trainerId?: true
    title?: true
    description?: true
    appointmentDate?: true
    duration?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    memberId?: true
    trainerId?: true
    title?: true
    description?: true
    appointmentDate?: true
    duration?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    memberId: string
    trainerId: string
    title: string
    description: string | null
    appointmentDate: Date
    duration: number
    status: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    trainerId?: boolean
    title?: boolean
    description?: boolean
    appointmentDate?: boolean
    duration?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | UserDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>



  export type AppointmentSelectScalar = {
    id?: boolean
    memberId?: boolean
    trainerId?: boolean
    title?: boolean
    description?: boolean
    appointmentDate?: boolean
    duration?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "memberId" | "trainerId" | "title" | "description" | "appointmentDate" | "duration" | "status" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | UserDefaultArgs<ExtArgs>
    trainer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      member: Prisma.$UserPayload<ExtArgs>
      trainer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberId: string
      trainerId: string
      title: string
      description: string | null
      appointmentDate: Date
      duration: number
      status: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * @param {AppointmentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const appointment = await prisma.appointment.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AppointmentFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Appointment.
     * @param {AppointmentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const appointment = await prisma.appointment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AppointmentAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
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
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trainer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly memberId: FieldRef<"Appointment", 'String'>
    readonly trainerId: FieldRef<"Appointment", 'String'>
    readonly title: FieldRef<"Appointment", 'String'>
    readonly description: FieldRef<"Appointment", 'String'>
    readonly appointmentDate: FieldRef<"Appointment", 'DateTime'>
    readonly duration: FieldRef<"Appointment", 'Int'>
    readonly status: FieldRef<"Appointment", 'String'>
    readonly notes: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment findRaw
   */
  export type AppointmentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Appointment aggregateRaw
   */
  export type AppointmentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
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


  export const EquipmentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    category: 'category',
    purchaseDate: 'purchaseDate',
    purchasePrice: 'purchasePrice',
    manufacturer: 'manufacturer',
    model: 'model',
    serialNumber: 'serialNumber',
    status: 'status',
    location: 'location',
    lastMaintenance: 'lastMaintenance',
    nextMaintenance: 'nextMaintenance',
    imageBase64: 'imageBase64',
    notes: 'notes',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EquipmentScalarFieldEnum = (typeof EquipmentScalarFieldEnum)[keyof typeof EquipmentScalarFieldEnum]


  export const MaintenanceLogScalarFieldEnum: {
    id: 'id',
    equipmentId: 'equipmentId',
    maintenanceDate: 'maintenanceDate',
    maintenanceType: 'maintenanceType',
    description: 'description',
    cost: 'cost',
    technician: 'technician',
    parts: 'parts',
    status: 'status',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MaintenanceLogScalarFieldEnum = (typeof MaintenanceLogScalarFieldEnum)[keyof typeof MaintenanceLogScalarFieldEnum]


  export const SubscriptionCancellationRequestScalarFieldEnum: {
    id: 'id',
    subscriptionId: 'subscriptionId',
    memberId: 'memberId',
    requestDate: 'requestDate',
    status: 'status',
    reason: 'reason',
    adminNote: 'adminNote',
    refundAmount: 'refundAmount',
    processedById: 'processedById',
    processedDate: 'processedDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionCancellationRequestScalarFieldEnum = (typeof SubscriptionCancellationRequestScalarFieldEnum)[keyof typeof SubscriptionCancellationRequestScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    trainerId: 'trainerId',
    title: 'title',
    description: 'description',
    appointmentDate: 'appointmentDate',
    duration: 'duration',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


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
    createdEquipment?: EquipmentListRelationFilter
    createdMaintenanceLogs?: MaintenanceLogListRelationFilter
    cancellationRequests?: SubscriptionCancellationRequestListRelationFilter
    processedCancellationRequests?: SubscriptionCancellationRequestListRelationFilter
    memberAppointments?: AppointmentListRelationFilter
    trainerAppointments?: AppointmentListRelationFilter
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
    createdEquipment?: EquipmentOrderByRelationAggregateInput
    createdMaintenanceLogs?: MaintenanceLogOrderByRelationAggregateInput
    cancellationRequests?: SubscriptionCancellationRequestOrderByRelationAggregateInput
    processedCancellationRequests?: SubscriptionCancellationRequestOrderByRelationAggregateInput
    memberAppointments?: AppointmentOrderByRelationAggregateInput
    trainerAppointments?: AppointmentOrderByRelationAggregateInput
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
    createdEquipment?: EquipmentListRelationFilter
    createdMaintenanceLogs?: MaintenanceLogListRelationFilter
    cancellationRequests?: SubscriptionCancellationRequestListRelationFilter
    processedCancellationRequests?: SubscriptionCancellationRequestListRelationFilter
    memberAppointments?: AppointmentListRelationFilter
    trainerAppointments?: AppointmentListRelationFilter
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
    cancellationRequests?: SubscriptionCancellationRequestListRelationFilter
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
    cancellationRequests?: SubscriptionCancellationRequestOrderByRelationAggregateInput
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
    cancellationRequests?: SubscriptionCancellationRequestListRelationFilter
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

  export type EquipmentWhereInput = {
    AND?: EquipmentWhereInput | EquipmentWhereInput[]
    OR?: EquipmentWhereInput[]
    NOT?: EquipmentWhereInput | EquipmentWhereInput[]
    id?: StringFilter<"Equipment"> | string
    name?: StringFilter<"Equipment"> | string
    description?: StringFilter<"Equipment"> | string
    category?: StringFilter<"Equipment"> | string
    purchaseDate?: DateTimeFilter<"Equipment"> | Date | string
    purchasePrice?: FloatFilter<"Equipment"> | number
    manufacturer?: StringFilter<"Equipment"> | string
    model?: StringNullableFilter<"Equipment"> | string | null
    serialNumber?: StringNullableFilter<"Equipment"> | string | null
    status?: StringFilter<"Equipment"> | string
    location?: StringNullableFilter<"Equipment"> | string | null
    lastMaintenance?: DateTimeNullableFilter<"Equipment"> | Date | string | null
    nextMaintenance?: DateTimeNullableFilter<"Equipment"> | Date | string | null
    imageBase64?: StringNullableFilter<"Equipment"> | string | null
    notes?: StringNullableFilter<"Equipment"> | string | null
    createdById?: StringNullableFilter<"Equipment"> | string | null
    createdAt?: DateTimeFilter<"Equipment"> | Date | string
    updatedAt?: DateTimeFilter<"Equipment"> | Date | string
    maintenanceLogs?: MaintenanceLogListRelationFilter
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type EquipmentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    manufacturer?: SortOrder
    model?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    location?: SortOrder
    lastMaintenance?: SortOrder
    nextMaintenance?: SortOrder
    imageBase64?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    maintenanceLogs?: MaintenanceLogOrderByRelationAggregateInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type EquipmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EquipmentWhereInput | EquipmentWhereInput[]
    OR?: EquipmentWhereInput[]
    NOT?: EquipmentWhereInput | EquipmentWhereInput[]
    name?: StringFilter<"Equipment"> | string
    description?: StringFilter<"Equipment"> | string
    category?: StringFilter<"Equipment"> | string
    purchaseDate?: DateTimeFilter<"Equipment"> | Date | string
    purchasePrice?: FloatFilter<"Equipment"> | number
    manufacturer?: StringFilter<"Equipment"> | string
    model?: StringNullableFilter<"Equipment"> | string | null
    serialNumber?: StringNullableFilter<"Equipment"> | string | null
    status?: StringFilter<"Equipment"> | string
    location?: StringNullableFilter<"Equipment"> | string | null
    lastMaintenance?: DateTimeNullableFilter<"Equipment"> | Date | string | null
    nextMaintenance?: DateTimeNullableFilter<"Equipment"> | Date | string | null
    imageBase64?: StringNullableFilter<"Equipment"> | string | null
    notes?: StringNullableFilter<"Equipment"> | string | null
    createdById?: StringNullableFilter<"Equipment"> | string | null
    createdAt?: DateTimeFilter<"Equipment"> | Date | string
    updatedAt?: DateTimeFilter<"Equipment"> | Date | string
    maintenanceLogs?: MaintenanceLogListRelationFilter
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type EquipmentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    manufacturer?: SortOrder
    model?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    location?: SortOrder
    lastMaintenance?: SortOrder
    nextMaintenance?: SortOrder
    imageBase64?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EquipmentCountOrderByAggregateInput
    _avg?: EquipmentAvgOrderByAggregateInput
    _max?: EquipmentMaxOrderByAggregateInput
    _min?: EquipmentMinOrderByAggregateInput
    _sum?: EquipmentSumOrderByAggregateInput
  }

  export type EquipmentScalarWhereWithAggregatesInput = {
    AND?: EquipmentScalarWhereWithAggregatesInput | EquipmentScalarWhereWithAggregatesInput[]
    OR?: EquipmentScalarWhereWithAggregatesInput[]
    NOT?: EquipmentScalarWhereWithAggregatesInput | EquipmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Equipment"> | string
    name?: StringWithAggregatesFilter<"Equipment"> | string
    description?: StringWithAggregatesFilter<"Equipment"> | string
    category?: StringWithAggregatesFilter<"Equipment"> | string
    purchaseDate?: DateTimeWithAggregatesFilter<"Equipment"> | Date | string
    purchasePrice?: FloatWithAggregatesFilter<"Equipment"> | number
    manufacturer?: StringWithAggregatesFilter<"Equipment"> | string
    model?: StringNullableWithAggregatesFilter<"Equipment"> | string | null
    serialNumber?: StringNullableWithAggregatesFilter<"Equipment"> | string | null
    status?: StringWithAggregatesFilter<"Equipment"> | string
    location?: StringNullableWithAggregatesFilter<"Equipment"> | string | null
    lastMaintenance?: DateTimeNullableWithAggregatesFilter<"Equipment"> | Date | string | null
    nextMaintenance?: DateTimeNullableWithAggregatesFilter<"Equipment"> | Date | string | null
    imageBase64?: StringNullableWithAggregatesFilter<"Equipment"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Equipment"> | string | null
    createdById?: StringNullableWithAggregatesFilter<"Equipment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Equipment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Equipment"> | Date | string
  }

  export type MaintenanceLogWhereInput = {
    AND?: MaintenanceLogWhereInput | MaintenanceLogWhereInput[]
    OR?: MaintenanceLogWhereInput[]
    NOT?: MaintenanceLogWhereInput | MaintenanceLogWhereInput[]
    id?: StringFilter<"MaintenanceLog"> | string
    equipmentId?: StringFilter<"MaintenanceLog"> | string
    maintenanceDate?: DateTimeFilter<"MaintenanceLog"> | Date | string
    maintenanceType?: StringFilter<"MaintenanceLog"> | string
    description?: StringFilter<"MaintenanceLog"> | string
    cost?: FloatNullableFilter<"MaintenanceLog"> | number | null
    technician?: StringNullableFilter<"MaintenanceLog"> | string | null
    parts?: StringNullableFilter<"MaintenanceLog"> | string | null
    status?: StringFilter<"MaintenanceLog"> | string
    createdById?: StringNullableFilter<"MaintenanceLog"> | string | null
    createdAt?: DateTimeFilter<"MaintenanceLog"> | Date | string
    updatedAt?: DateTimeFilter<"MaintenanceLog"> | Date | string
    equipment?: XOR<EquipmentScalarRelationFilter, EquipmentWhereInput>
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type MaintenanceLogOrderByWithRelationInput = {
    id?: SortOrder
    equipmentId?: SortOrder
    maintenanceDate?: SortOrder
    maintenanceType?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    technician?: SortOrder
    parts?: SortOrder
    status?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    equipment?: EquipmentOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type MaintenanceLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MaintenanceLogWhereInput | MaintenanceLogWhereInput[]
    OR?: MaintenanceLogWhereInput[]
    NOT?: MaintenanceLogWhereInput | MaintenanceLogWhereInput[]
    equipmentId?: StringFilter<"MaintenanceLog"> | string
    maintenanceDate?: DateTimeFilter<"MaintenanceLog"> | Date | string
    maintenanceType?: StringFilter<"MaintenanceLog"> | string
    description?: StringFilter<"MaintenanceLog"> | string
    cost?: FloatNullableFilter<"MaintenanceLog"> | number | null
    technician?: StringNullableFilter<"MaintenanceLog"> | string | null
    parts?: StringNullableFilter<"MaintenanceLog"> | string | null
    status?: StringFilter<"MaintenanceLog"> | string
    createdById?: StringNullableFilter<"MaintenanceLog"> | string | null
    createdAt?: DateTimeFilter<"MaintenanceLog"> | Date | string
    updatedAt?: DateTimeFilter<"MaintenanceLog"> | Date | string
    equipment?: XOR<EquipmentScalarRelationFilter, EquipmentWhereInput>
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type MaintenanceLogOrderByWithAggregationInput = {
    id?: SortOrder
    equipmentId?: SortOrder
    maintenanceDate?: SortOrder
    maintenanceType?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    technician?: SortOrder
    parts?: SortOrder
    status?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MaintenanceLogCountOrderByAggregateInput
    _avg?: MaintenanceLogAvgOrderByAggregateInput
    _max?: MaintenanceLogMaxOrderByAggregateInput
    _min?: MaintenanceLogMinOrderByAggregateInput
    _sum?: MaintenanceLogSumOrderByAggregateInput
  }

  export type MaintenanceLogScalarWhereWithAggregatesInput = {
    AND?: MaintenanceLogScalarWhereWithAggregatesInput | MaintenanceLogScalarWhereWithAggregatesInput[]
    OR?: MaintenanceLogScalarWhereWithAggregatesInput[]
    NOT?: MaintenanceLogScalarWhereWithAggregatesInput | MaintenanceLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MaintenanceLog"> | string
    equipmentId?: StringWithAggregatesFilter<"MaintenanceLog"> | string
    maintenanceDate?: DateTimeWithAggregatesFilter<"MaintenanceLog"> | Date | string
    maintenanceType?: StringWithAggregatesFilter<"MaintenanceLog"> | string
    description?: StringWithAggregatesFilter<"MaintenanceLog"> | string
    cost?: FloatNullableWithAggregatesFilter<"MaintenanceLog"> | number | null
    technician?: StringNullableWithAggregatesFilter<"MaintenanceLog"> | string | null
    parts?: StringNullableWithAggregatesFilter<"MaintenanceLog"> | string | null
    status?: StringWithAggregatesFilter<"MaintenanceLog"> | string
    createdById?: StringNullableWithAggregatesFilter<"MaintenanceLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MaintenanceLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MaintenanceLog"> | Date | string
  }

  export type SubscriptionCancellationRequestWhereInput = {
    AND?: SubscriptionCancellationRequestWhereInput | SubscriptionCancellationRequestWhereInput[]
    OR?: SubscriptionCancellationRequestWhereInput[]
    NOT?: SubscriptionCancellationRequestWhereInput | SubscriptionCancellationRequestWhereInput[]
    id?: StringFilter<"SubscriptionCancellationRequest"> | string
    subscriptionId?: StringFilter<"SubscriptionCancellationRequest"> | string
    memberId?: StringFilter<"SubscriptionCancellationRequest"> | string
    requestDate?: DateTimeFilter<"SubscriptionCancellationRequest"> | Date | string
    status?: StringFilter<"SubscriptionCancellationRequest"> | string
    reason?: StringNullableFilter<"SubscriptionCancellationRequest"> | string | null
    adminNote?: StringNullableFilter<"SubscriptionCancellationRequest"> | string | null
    refundAmount?: FloatNullableFilter<"SubscriptionCancellationRequest"> | number | null
    processedById?: StringNullableFilter<"SubscriptionCancellationRequest"> | string | null
    processedDate?: DateTimeNullableFilter<"SubscriptionCancellationRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"SubscriptionCancellationRequest"> | Date | string
    updatedAt?: DateTimeFilter<"SubscriptionCancellationRequest"> | Date | string
    subscription?: XOR<SubscriptionScalarRelationFilter, SubscriptionWhereInput>
    member?: XOR<UserScalarRelationFilter, UserWhereInput>
    processedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type SubscriptionCancellationRequestOrderByWithRelationInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    memberId?: SortOrder
    requestDate?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    adminNote?: SortOrder
    refundAmount?: SortOrder
    processedById?: SortOrder
    processedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscription?: SubscriptionOrderByWithRelationInput
    member?: UserOrderByWithRelationInput
    processedBy?: UserOrderByWithRelationInput
  }

  export type SubscriptionCancellationRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubscriptionCancellationRequestWhereInput | SubscriptionCancellationRequestWhereInput[]
    OR?: SubscriptionCancellationRequestWhereInput[]
    NOT?: SubscriptionCancellationRequestWhereInput | SubscriptionCancellationRequestWhereInput[]
    subscriptionId?: StringFilter<"SubscriptionCancellationRequest"> | string
    memberId?: StringFilter<"SubscriptionCancellationRequest"> | string
    requestDate?: DateTimeFilter<"SubscriptionCancellationRequest"> | Date | string
    status?: StringFilter<"SubscriptionCancellationRequest"> | string
    reason?: StringNullableFilter<"SubscriptionCancellationRequest"> | string | null
    adminNote?: StringNullableFilter<"SubscriptionCancellationRequest"> | string | null
    refundAmount?: FloatNullableFilter<"SubscriptionCancellationRequest"> | number | null
    processedById?: StringNullableFilter<"SubscriptionCancellationRequest"> | string | null
    processedDate?: DateTimeNullableFilter<"SubscriptionCancellationRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"SubscriptionCancellationRequest"> | Date | string
    updatedAt?: DateTimeFilter<"SubscriptionCancellationRequest"> | Date | string
    subscription?: XOR<SubscriptionScalarRelationFilter, SubscriptionWhereInput>
    member?: XOR<UserScalarRelationFilter, UserWhereInput>
    processedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type SubscriptionCancellationRequestOrderByWithAggregationInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    memberId?: SortOrder
    requestDate?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    adminNote?: SortOrder
    refundAmount?: SortOrder
    processedById?: SortOrder
    processedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCancellationRequestCountOrderByAggregateInput
    _avg?: SubscriptionCancellationRequestAvgOrderByAggregateInput
    _max?: SubscriptionCancellationRequestMaxOrderByAggregateInput
    _min?: SubscriptionCancellationRequestMinOrderByAggregateInput
    _sum?: SubscriptionCancellationRequestSumOrderByAggregateInput
  }

  export type SubscriptionCancellationRequestScalarWhereWithAggregatesInput = {
    AND?: SubscriptionCancellationRequestScalarWhereWithAggregatesInput | SubscriptionCancellationRequestScalarWhereWithAggregatesInput[]
    OR?: SubscriptionCancellationRequestScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionCancellationRequestScalarWhereWithAggregatesInput | SubscriptionCancellationRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SubscriptionCancellationRequest"> | string
    subscriptionId?: StringWithAggregatesFilter<"SubscriptionCancellationRequest"> | string
    memberId?: StringWithAggregatesFilter<"SubscriptionCancellationRequest"> | string
    requestDate?: DateTimeWithAggregatesFilter<"SubscriptionCancellationRequest"> | Date | string
    status?: StringWithAggregatesFilter<"SubscriptionCancellationRequest"> | string
    reason?: StringNullableWithAggregatesFilter<"SubscriptionCancellationRequest"> | string | null
    adminNote?: StringNullableWithAggregatesFilter<"SubscriptionCancellationRequest"> | string | null
    refundAmount?: FloatNullableWithAggregatesFilter<"SubscriptionCancellationRequest"> | number | null
    processedById?: StringNullableWithAggregatesFilter<"SubscriptionCancellationRequest"> | string | null
    processedDate?: DateTimeNullableWithAggregatesFilter<"SubscriptionCancellationRequest"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SubscriptionCancellationRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SubscriptionCancellationRequest"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    memberId?: StringFilter<"Appointment"> | string
    trainerId?: StringFilter<"Appointment"> | string
    title?: StringFilter<"Appointment"> | string
    description?: StringNullableFilter<"Appointment"> | string | null
    appointmentDate?: DateTimeFilter<"Appointment"> | Date | string
    duration?: IntFilter<"Appointment"> | number
    status?: StringFilter<"Appointment"> | string
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    member?: XOR<UserScalarRelationFilter, UserWhereInput>
    trainer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    trainerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    appointmentDate?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    member?: UserOrderByWithRelationInput
    trainer?: UserOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    memberId?: StringFilter<"Appointment"> | string
    trainerId?: StringFilter<"Appointment"> | string
    title?: StringFilter<"Appointment"> | string
    description?: StringNullableFilter<"Appointment"> | string | null
    appointmentDate?: DateTimeFilter<"Appointment"> | Date | string
    duration?: IntFilter<"Appointment"> | number
    status?: StringFilter<"Appointment"> | string
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    member?: XOR<UserScalarRelationFilter, UserWhereInput>
    trainer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    trainerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    appointmentDate?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    memberId?: StringWithAggregatesFilter<"Appointment"> | string
    trainerId?: StringWithAggregatesFilter<"Appointment"> | string
    title?: StringWithAggregatesFilter<"Appointment"> | string
    description?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    appointmentDate?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    duration?: IntWithAggregatesFilter<"Appointment"> | number
    status?: StringWithAggregatesFilter<"Appointment"> | string
    notes?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
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
    createdEquipment?: EquipmentCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentCreateNestedManyWithoutTrainerInput
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
    createdEquipment?: EquipmentUncheckedCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentUncheckedCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
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
    createdEquipment?: EquipmentUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUpdateManyWithoutTrainerNestedInput
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
    createdEquipment?: EquipmentUncheckedUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUncheckedUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
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
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutSubscriptionInput
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
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutSubscriptionInput
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
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutSubscriptionNestedInput
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
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutSubscriptionNestedInput
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

  export type EquipmentCreateInput = {
    id?: string
    name: string
    description: string
    category: string
    purchaseDate: Date | string
    purchasePrice: number
    manufacturer: string
    model?: string | null
    serialNumber?: string | null
    status?: string
    location?: string | null
    lastMaintenance?: Date | string | null
    nextMaintenance?: Date | string | null
    imageBase64?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    maintenanceLogs?: MaintenanceLogCreateNestedManyWithoutEquipmentInput
    createdBy?: UserCreateNestedOneWithoutCreatedEquipmentInput
  }

  export type EquipmentUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    category: string
    purchaseDate: Date | string
    purchasePrice: number
    manufacturer: string
    model?: string | null
    serialNumber?: string | null
    status?: string
    location?: string | null
    lastMaintenance?: Date | string | null
    nextMaintenance?: Date | string | null
    imageBase64?: string | null
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    maintenanceLogs?: MaintenanceLogUncheckedCreateNestedManyWithoutEquipmentInput
  }

  export type EquipmentUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    manufacturer?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageBase64?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceLogs?: MaintenanceLogUpdateManyWithoutEquipmentNestedInput
    createdBy?: UserUpdateOneWithoutCreatedEquipmentNestedInput
  }

  export type EquipmentUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    manufacturer?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageBase64?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceLogs?: MaintenanceLogUncheckedUpdateManyWithoutEquipmentNestedInput
  }

  export type EquipmentCreateManyInput = {
    id?: string
    name: string
    description: string
    category: string
    purchaseDate: Date | string
    purchasePrice: number
    manufacturer: string
    model?: string | null
    serialNumber?: string | null
    status?: string
    location?: string | null
    lastMaintenance?: Date | string | null
    nextMaintenance?: Date | string | null
    imageBase64?: string | null
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipmentUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    manufacturer?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageBase64?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipmentUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    manufacturer?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageBase64?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceLogCreateInput = {
    id?: string
    maintenanceDate?: Date | string
    maintenanceType: string
    description: string
    cost?: number | null
    technician?: string | null
    parts?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    equipment: EquipmentCreateNestedOneWithoutMaintenanceLogsInput
    createdBy?: UserCreateNestedOneWithoutCreatedMaintenanceLogsInput
  }

  export type MaintenanceLogUncheckedCreateInput = {
    id?: string
    equipmentId: string
    maintenanceDate?: Date | string
    maintenanceType: string
    description: string
    cost?: number | null
    technician?: string | null
    parts?: string | null
    status?: string
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaintenanceLogUpdateInput = {
    maintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    equipment?: EquipmentUpdateOneRequiredWithoutMaintenanceLogsNestedInput
    createdBy?: UserUpdateOneWithoutCreatedMaintenanceLogsNestedInput
  }

  export type MaintenanceLogUncheckedUpdateInput = {
    equipmentId?: StringFieldUpdateOperationsInput | string
    maintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceLogCreateManyInput = {
    id?: string
    equipmentId: string
    maintenanceDate?: Date | string
    maintenanceType: string
    description: string
    cost?: number | null
    technician?: string | null
    parts?: string | null
    status?: string
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaintenanceLogUpdateManyMutationInput = {
    maintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceLogUncheckedUpdateManyInput = {
    equipmentId?: StringFieldUpdateOperationsInput | string
    maintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCancellationRequestCreateInput = {
    id?: string
    requestDate?: Date | string
    status?: string
    reason?: string | null
    adminNote?: string | null
    refundAmount?: number | null
    processedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription: SubscriptionCreateNestedOneWithoutCancellationRequestsInput
    member: UserCreateNestedOneWithoutCancellationRequestsInput
    processedBy?: UserCreateNestedOneWithoutProcessedCancellationRequestsInput
  }

  export type SubscriptionCancellationRequestUncheckedCreateInput = {
    id?: string
    subscriptionId: string
    memberId: string
    requestDate?: Date | string
    status?: string
    reason?: string | null
    adminNote?: string | null
    refundAmount?: number | null
    processedById?: string | null
    processedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCancellationRequestUpdateInput = {
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneRequiredWithoutCancellationRequestsNestedInput
    member?: UserUpdateOneRequiredWithoutCancellationRequestsNestedInput
    processedBy?: UserUpdateOneWithoutProcessedCancellationRequestsNestedInput
  }

  export type SubscriptionCancellationRequestUncheckedUpdateInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedById?: NullableStringFieldUpdateOperationsInput | string | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCancellationRequestCreateManyInput = {
    id?: string
    subscriptionId: string
    memberId: string
    requestDate?: Date | string
    status?: string
    reason?: string | null
    adminNote?: string | null
    refundAmount?: number | null
    processedById?: string | null
    processedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCancellationRequestUpdateManyMutationInput = {
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCancellationRequestUncheckedUpdateManyInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedById?: NullableStringFieldUpdateOperationsInput | string | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    title: string
    description?: string | null
    appointmentDate: Date | string
    duration: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: UserCreateNestedOneWithoutMemberAppointmentsInput
    trainer: UserCreateNestedOneWithoutTrainerAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    memberId: string
    trainerId: string
    title: string
    description?: string | null
    appointmentDate: Date | string
    duration: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: UserUpdateOneRequiredWithoutMemberAppointmentsNestedInput
    trainer?: UserUpdateOneRequiredWithoutTrainerAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: string
    memberId: string
    trainerId: string
    title: string
    description?: string | null
    appointmentDate: Date | string
    duration: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EquipmentListRelationFilter = {
    every?: EquipmentWhereInput
    some?: EquipmentWhereInput
    none?: EquipmentWhereInput
  }

  export type MaintenanceLogListRelationFilter = {
    every?: MaintenanceLogWhereInput
    some?: MaintenanceLogWhereInput
    none?: MaintenanceLogWhereInput
  }

  export type SubscriptionCancellationRequestListRelationFilter = {
    every?: SubscriptionCancellationRequestWhereInput
    some?: SubscriptionCancellationRequestWhereInput
    none?: SubscriptionCancellationRequestWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EquipmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MaintenanceLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionCancellationRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
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

  export type EquipmentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    manufacturer?: SortOrder
    model?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    location?: SortOrder
    lastMaintenance?: SortOrder
    nextMaintenance?: SortOrder
    imageBase64?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipmentAvgOrderByAggregateInput = {
    purchasePrice?: SortOrder
  }

  export type EquipmentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    manufacturer?: SortOrder
    model?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    location?: SortOrder
    lastMaintenance?: SortOrder
    nextMaintenance?: SortOrder
    imageBase64?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipmentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    purchaseDate?: SortOrder
    purchasePrice?: SortOrder
    manufacturer?: SortOrder
    model?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    location?: SortOrder
    lastMaintenance?: SortOrder
    nextMaintenance?: SortOrder
    imageBase64?: SortOrder
    notes?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipmentSumOrderByAggregateInput = {
    purchasePrice?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
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

  export type EquipmentScalarRelationFilter = {
    is?: EquipmentWhereInput
    isNot?: EquipmentWhereInput
  }

  export type MaintenanceLogCountOrderByAggregateInput = {
    id?: SortOrder
    equipmentId?: SortOrder
    maintenanceDate?: SortOrder
    maintenanceType?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    technician?: SortOrder
    parts?: SortOrder
    status?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaintenanceLogAvgOrderByAggregateInput = {
    cost?: SortOrder
  }

  export type MaintenanceLogMaxOrderByAggregateInput = {
    id?: SortOrder
    equipmentId?: SortOrder
    maintenanceDate?: SortOrder
    maintenanceType?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    technician?: SortOrder
    parts?: SortOrder
    status?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaintenanceLogMinOrderByAggregateInput = {
    id?: SortOrder
    equipmentId?: SortOrder
    maintenanceDate?: SortOrder
    maintenanceType?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    technician?: SortOrder
    parts?: SortOrder
    status?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaintenanceLogSumOrderByAggregateInput = {
    cost?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
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
    isSet?: boolean
  }

  export type SubscriptionScalarRelationFilter = {
    is?: SubscriptionWhereInput
    isNot?: SubscriptionWhereInput
  }

  export type SubscriptionCancellationRequestCountOrderByAggregateInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    memberId?: SortOrder
    requestDate?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    adminNote?: SortOrder
    refundAmount?: SortOrder
    processedById?: SortOrder
    processedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionCancellationRequestAvgOrderByAggregateInput = {
    refundAmount?: SortOrder
  }

  export type SubscriptionCancellationRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    memberId?: SortOrder
    requestDate?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    adminNote?: SortOrder
    refundAmount?: SortOrder
    processedById?: SortOrder
    processedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionCancellationRequestMinOrderByAggregateInput = {
    id?: SortOrder
    subscriptionId?: SortOrder
    memberId?: SortOrder
    requestDate?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    adminNote?: SortOrder
    refundAmount?: SortOrder
    processedById?: SortOrder
    processedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionCancellationRequestSumOrderByAggregateInput = {
    refundAmount?: SortOrder
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    trainerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    appointmentDate?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    trainerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    appointmentDate?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    trainerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    appointmentDate?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    duration?: SortOrder
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

  export type EquipmentCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<EquipmentCreateWithoutCreatedByInput, EquipmentUncheckedCreateWithoutCreatedByInput> | EquipmentCreateWithoutCreatedByInput[] | EquipmentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: EquipmentCreateOrConnectWithoutCreatedByInput | EquipmentCreateOrConnectWithoutCreatedByInput[]
    createMany?: EquipmentCreateManyCreatedByInputEnvelope
    connect?: EquipmentWhereUniqueInput | EquipmentWhereUniqueInput[]
  }

  export type MaintenanceLogCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<MaintenanceLogCreateWithoutCreatedByInput, MaintenanceLogUncheckedCreateWithoutCreatedByInput> | MaintenanceLogCreateWithoutCreatedByInput[] | MaintenanceLogUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: MaintenanceLogCreateOrConnectWithoutCreatedByInput | MaintenanceLogCreateOrConnectWithoutCreatedByInput[]
    createMany?: MaintenanceLogCreateManyCreatedByInputEnvelope
    connect?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
  }

  export type SubscriptionCancellationRequestCreateNestedManyWithoutMemberInput = {
    create?: XOR<SubscriptionCancellationRequestCreateWithoutMemberInput, SubscriptionCancellationRequestUncheckedCreateWithoutMemberInput> | SubscriptionCancellationRequestCreateWithoutMemberInput[] | SubscriptionCancellationRequestUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: SubscriptionCancellationRequestCreateOrConnectWithoutMemberInput | SubscriptionCancellationRequestCreateOrConnectWithoutMemberInput[]
    createMany?: SubscriptionCancellationRequestCreateManyMemberInputEnvelope
    connect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
  }

  export type SubscriptionCancellationRequestCreateNestedManyWithoutProcessedByInput = {
    create?: XOR<SubscriptionCancellationRequestCreateWithoutProcessedByInput, SubscriptionCancellationRequestUncheckedCreateWithoutProcessedByInput> | SubscriptionCancellationRequestCreateWithoutProcessedByInput[] | SubscriptionCancellationRequestUncheckedCreateWithoutProcessedByInput[]
    connectOrCreate?: SubscriptionCancellationRequestCreateOrConnectWithoutProcessedByInput | SubscriptionCancellationRequestCreateOrConnectWithoutProcessedByInput[]
    createMany?: SubscriptionCancellationRequestCreateManyProcessedByInputEnvelope
    connect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutMemberInput = {
    create?: XOR<AppointmentCreateWithoutMemberInput, AppointmentUncheckedCreateWithoutMemberInput> | AppointmentCreateWithoutMemberInput[] | AppointmentUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutMemberInput | AppointmentCreateOrConnectWithoutMemberInput[]
    createMany?: AppointmentCreateManyMemberInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutTrainerInput = {
    create?: XOR<AppointmentCreateWithoutTrainerInput, AppointmentUncheckedCreateWithoutTrainerInput> | AppointmentCreateWithoutTrainerInput[] | AppointmentUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutTrainerInput | AppointmentCreateOrConnectWithoutTrainerInput[]
    createMany?: AppointmentCreateManyTrainerInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
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

  export type EquipmentUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<EquipmentCreateWithoutCreatedByInput, EquipmentUncheckedCreateWithoutCreatedByInput> | EquipmentCreateWithoutCreatedByInput[] | EquipmentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: EquipmentCreateOrConnectWithoutCreatedByInput | EquipmentCreateOrConnectWithoutCreatedByInput[]
    createMany?: EquipmentCreateManyCreatedByInputEnvelope
    connect?: EquipmentWhereUniqueInput | EquipmentWhereUniqueInput[]
  }

  export type MaintenanceLogUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<MaintenanceLogCreateWithoutCreatedByInput, MaintenanceLogUncheckedCreateWithoutCreatedByInput> | MaintenanceLogCreateWithoutCreatedByInput[] | MaintenanceLogUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: MaintenanceLogCreateOrConnectWithoutCreatedByInput | MaintenanceLogCreateOrConnectWithoutCreatedByInput[]
    createMany?: MaintenanceLogCreateManyCreatedByInputEnvelope
    connect?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
  }

  export type SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<SubscriptionCancellationRequestCreateWithoutMemberInput, SubscriptionCancellationRequestUncheckedCreateWithoutMemberInput> | SubscriptionCancellationRequestCreateWithoutMemberInput[] | SubscriptionCancellationRequestUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: SubscriptionCancellationRequestCreateOrConnectWithoutMemberInput | SubscriptionCancellationRequestCreateOrConnectWithoutMemberInput[]
    createMany?: SubscriptionCancellationRequestCreateManyMemberInputEnvelope
    connect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
  }

  export type SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutProcessedByInput = {
    create?: XOR<SubscriptionCancellationRequestCreateWithoutProcessedByInput, SubscriptionCancellationRequestUncheckedCreateWithoutProcessedByInput> | SubscriptionCancellationRequestCreateWithoutProcessedByInput[] | SubscriptionCancellationRequestUncheckedCreateWithoutProcessedByInput[]
    connectOrCreate?: SubscriptionCancellationRequestCreateOrConnectWithoutProcessedByInput | SubscriptionCancellationRequestCreateOrConnectWithoutProcessedByInput[]
    createMany?: SubscriptionCancellationRequestCreateManyProcessedByInputEnvelope
    connect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<AppointmentCreateWithoutMemberInput, AppointmentUncheckedCreateWithoutMemberInput> | AppointmentCreateWithoutMemberInput[] | AppointmentUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutMemberInput | AppointmentCreateOrConnectWithoutMemberInput[]
    createMany?: AppointmentCreateManyMemberInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutTrainerInput = {
    create?: XOR<AppointmentCreateWithoutTrainerInput, AppointmentUncheckedCreateWithoutTrainerInput> | AppointmentCreateWithoutTrainerInput[] | AppointmentUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutTrainerInput | AppointmentCreateOrConnectWithoutTrainerInput[]
    createMany?: AppointmentCreateManyTrainerInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
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

  export type EquipmentUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<EquipmentCreateWithoutCreatedByInput, EquipmentUncheckedCreateWithoutCreatedByInput> | EquipmentCreateWithoutCreatedByInput[] | EquipmentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: EquipmentCreateOrConnectWithoutCreatedByInput | EquipmentCreateOrConnectWithoutCreatedByInput[]
    upsert?: EquipmentUpsertWithWhereUniqueWithoutCreatedByInput | EquipmentUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: EquipmentCreateManyCreatedByInputEnvelope
    set?: EquipmentWhereUniqueInput | EquipmentWhereUniqueInput[]
    disconnect?: EquipmentWhereUniqueInput | EquipmentWhereUniqueInput[]
    delete?: EquipmentWhereUniqueInput | EquipmentWhereUniqueInput[]
    connect?: EquipmentWhereUniqueInput | EquipmentWhereUniqueInput[]
    update?: EquipmentUpdateWithWhereUniqueWithoutCreatedByInput | EquipmentUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: EquipmentUpdateManyWithWhereWithoutCreatedByInput | EquipmentUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: EquipmentScalarWhereInput | EquipmentScalarWhereInput[]
  }

  export type MaintenanceLogUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<MaintenanceLogCreateWithoutCreatedByInput, MaintenanceLogUncheckedCreateWithoutCreatedByInput> | MaintenanceLogCreateWithoutCreatedByInput[] | MaintenanceLogUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: MaintenanceLogCreateOrConnectWithoutCreatedByInput | MaintenanceLogCreateOrConnectWithoutCreatedByInput[]
    upsert?: MaintenanceLogUpsertWithWhereUniqueWithoutCreatedByInput | MaintenanceLogUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: MaintenanceLogCreateManyCreatedByInputEnvelope
    set?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    disconnect?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    delete?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    connect?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    update?: MaintenanceLogUpdateWithWhereUniqueWithoutCreatedByInput | MaintenanceLogUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: MaintenanceLogUpdateManyWithWhereWithoutCreatedByInput | MaintenanceLogUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: MaintenanceLogScalarWhereInput | MaintenanceLogScalarWhereInput[]
  }

  export type SubscriptionCancellationRequestUpdateManyWithoutMemberNestedInput = {
    create?: XOR<SubscriptionCancellationRequestCreateWithoutMemberInput, SubscriptionCancellationRequestUncheckedCreateWithoutMemberInput> | SubscriptionCancellationRequestCreateWithoutMemberInput[] | SubscriptionCancellationRequestUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: SubscriptionCancellationRequestCreateOrConnectWithoutMemberInput | SubscriptionCancellationRequestCreateOrConnectWithoutMemberInput[]
    upsert?: SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutMemberInput | SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: SubscriptionCancellationRequestCreateManyMemberInputEnvelope
    set?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    disconnect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    delete?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    connect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    update?: SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutMemberInput | SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: SubscriptionCancellationRequestUpdateManyWithWhereWithoutMemberInput | SubscriptionCancellationRequestUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: SubscriptionCancellationRequestScalarWhereInput | SubscriptionCancellationRequestScalarWhereInput[]
  }

  export type SubscriptionCancellationRequestUpdateManyWithoutProcessedByNestedInput = {
    create?: XOR<SubscriptionCancellationRequestCreateWithoutProcessedByInput, SubscriptionCancellationRequestUncheckedCreateWithoutProcessedByInput> | SubscriptionCancellationRequestCreateWithoutProcessedByInput[] | SubscriptionCancellationRequestUncheckedCreateWithoutProcessedByInput[]
    connectOrCreate?: SubscriptionCancellationRequestCreateOrConnectWithoutProcessedByInput | SubscriptionCancellationRequestCreateOrConnectWithoutProcessedByInput[]
    upsert?: SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutProcessedByInput | SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutProcessedByInput[]
    createMany?: SubscriptionCancellationRequestCreateManyProcessedByInputEnvelope
    set?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    disconnect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    delete?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    connect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    update?: SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutProcessedByInput | SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutProcessedByInput[]
    updateMany?: SubscriptionCancellationRequestUpdateManyWithWhereWithoutProcessedByInput | SubscriptionCancellationRequestUpdateManyWithWhereWithoutProcessedByInput[]
    deleteMany?: SubscriptionCancellationRequestScalarWhereInput | SubscriptionCancellationRequestScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutMemberNestedInput = {
    create?: XOR<AppointmentCreateWithoutMemberInput, AppointmentUncheckedCreateWithoutMemberInput> | AppointmentCreateWithoutMemberInput[] | AppointmentUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutMemberInput | AppointmentCreateOrConnectWithoutMemberInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutMemberInput | AppointmentUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: AppointmentCreateManyMemberInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutMemberInput | AppointmentUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutMemberInput | AppointmentUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<AppointmentCreateWithoutTrainerInput, AppointmentUncheckedCreateWithoutTrainerInput> | AppointmentCreateWithoutTrainerInput[] | AppointmentUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutTrainerInput | AppointmentCreateOrConnectWithoutTrainerInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutTrainerInput | AppointmentUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: AppointmentCreateManyTrainerInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutTrainerInput | AppointmentUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutTrainerInput | AppointmentUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
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

  export type EquipmentUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<EquipmentCreateWithoutCreatedByInput, EquipmentUncheckedCreateWithoutCreatedByInput> | EquipmentCreateWithoutCreatedByInput[] | EquipmentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: EquipmentCreateOrConnectWithoutCreatedByInput | EquipmentCreateOrConnectWithoutCreatedByInput[]
    upsert?: EquipmentUpsertWithWhereUniqueWithoutCreatedByInput | EquipmentUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: EquipmentCreateManyCreatedByInputEnvelope
    set?: EquipmentWhereUniqueInput | EquipmentWhereUniqueInput[]
    disconnect?: EquipmentWhereUniqueInput | EquipmentWhereUniqueInput[]
    delete?: EquipmentWhereUniqueInput | EquipmentWhereUniqueInput[]
    connect?: EquipmentWhereUniqueInput | EquipmentWhereUniqueInput[]
    update?: EquipmentUpdateWithWhereUniqueWithoutCreatedByInput | EquipmentUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: EquipmentUpdateManyWithWhereWithoutCreatedByInput | EquipmentUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: EquipmentScalarWhereInput | EquipmentScalarWhereInput[]
  }

  export type MaintenanceLogUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<MaintenanceLogCreateWithoutCreatedByInput, MaintenanceLogUncheckedCreateWithoutCreatedByInput> | MaintenanceLogCreateWithoutCreatedByInput[] | MaintenanceLogUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: MaintenanceLogCreateOrConnectWithoutCreatedByInput | MaintenanceLogCreateOrConnectWithoutCreatedByInput[]
    upsert?: MaintenanceLogUpsertWithWhereUniqueWithoutCreatedByInput | MaintenanceLogUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: MaintenanceLogCreateManyCreatedByInputEnvelope
    set?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    disconnect?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    delete?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    connect?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    update?: MaintenanceLogUpdateWithWhereUniqueWithoutCreatedByInput | MaintenanceLogUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: MaintenanceLogUpdateManyWithWhereWithoutCreatedByInput | MaintenanceLogUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: MaintenanceLogScalarWhereInput | MaintenanceLogScalarWhereInput[]
  }

  export type SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<SubscriptionCancellationRequestCreateWithoutMemberInput, SubscriptionCancellationRequestUncheckedCreateWithoutMemberInput> | SubscriptionCancellationRequestCreateWithoutMemberInput[] | SubscriptionCancellationRequestUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: SubscriptionCancellationRequestCreateOrConnectWithoutMemberInput | SubscriptionCancellationRequestCreateOrConnectWithoutMemberInput[]
    upsert?: SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutMemberInput | SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: SubscriptionCancellationRequestCreateManyMemberInputEnvelope
    set?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    disconnect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    delete?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    connect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    update?: SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutMemberInput | SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: SubscriptionCancellationRequestUpdateManyWithWhereWithoutMemberInput | SubscriptionCancellationRequestUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: SubscriptionCancellationRequestScalarWhereInput | SubscriptionCancellationRequestScalarWhereInput[]
  }

  export type SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByNestedInput = {
    create?: XOR<SubscriptionCancellationRequestCreateWithoutProcessedByInput, SubscriptionCancellationRequestUncheckedCreateWithoutProcessedByInput> | SubscriptionCancellationRequestCreateWithoutProcessedByInput[] | SubscriptionCancellationRequestUncheckedCreateWithoutProcessedByInput[]
    connectOrCreate?: SubscriptionCancellationRequestCreateOrConnectWithoutProcessedByInput | SubscriptionCancellationRequestCreateOrConnectWithoutProcessedByInput[]
    upsert?: SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutProcessedByInput | SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutProcessedByInput[]
    createMany?: SubscriptionCancellationRequestCreateManyProcessedByInputEnvelope
    set?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    disconnect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    delete?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    connect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    update?: SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutProcessedByInput | SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutProcessedByInput[]
    updateMany?: SubscriptionCancellationRequestUpdateManyWithWhereWithoutProcessedByInput | SubscriptionCancellationRequestUpdateManyWithWhereWithoutProcessedByInput[]
    deleteMany?: SubscriptionCancellationRequestScalarWhereInput | SubscriptionCancellationRequestScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<AppointmentCreateWithoutMemberInput, AppointmentUncheckedCreateWithoutMemberInput> | AppointmentCreateWithoutMemberInput[] | AppointmentUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutMemberInput | AppointmentCreateOrConnectWithoutMemberInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutMemberInput | AppointmentUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: AppointmentCreateManyMemberInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutMemberInput | AppointmentUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutMemberInput | AppointmentUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<AppointmentCreateWithoutTrainerInput, AppointmentUncheckedCreateWithoutTrainerInput> | AppointmentCreateWithoutTrainerInput[] | AppointmentUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutTrainerInput | AppointmentCreateOrConnectWithoutTrainerInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutTrainerInput | AppointmentUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: AppointmentCreateManyTrainerInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutTrainerInput | AppointmentUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutTrainerInput | AppointmentUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
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

  export type SubscriptionCancellationRequestCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<SubscriptionCancellationRequestCreateWithoutSubscriptionInput, SubscriptionCancellationRequestUncheckedCreateWithoutSubscriptionInput> | SubscriptionCancellationRequestCreateWithoutSubscriptionInput[] | SubscriptionCancellationRequestUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: SubscriptionCancellationRequestCreateOrConnectWithoutSubscriptionInput | SubscriptionCancellationRequestCreateOrConnectWithoutSubscriptionInput[]
    createMany?: SubscriptionCancellationRequestCreateManySubscriptionInputEnvelope
    connect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
  }

  export type SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<SubscriptionCancellationRequestCreateWithoutSubscriptionInput, SubscriptionCancellationRequestUncheckedCreateWithoutSubscriptionInput> | SubscriptionCancellationRequestCreateWithoutSubscriptionInput[] | SubscriptionCancellationRequestUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: SubscriptionCancellationRequestCreateOrConnectWithoutSubscriptionInput | SubscriptionCancellationRequestCreateOrConnectWithoutSubscriptionInput[]
    createMany?: SubscriptionCancellationRequestCreateManySubscriptionInputEnvelope
    connect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
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

  export type SubscriptionCancellationRequestUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<SubscriptionCancellationRequestCreateWithoutSubscriptionInput, SubscriptionCancellationRequestUncheckedCreateWithoutSubscriptionInput> | SubscriptionCancellationRequestCreateWithoutSubscriptionInput[] | SubscriptionCancellationRequestUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: SubscriptionCancellationRequestCreateOrConnectWithoutSubscriptionInput | SubscriptionCancellationRequestCreateOrConnectWithoutSubscriptionInput[]
    upsert?: SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutSubscriptionInput | SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: SubscriptionCancellationRequestCreateManySubscriptionInputEnvelope
    set?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    disconnect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    delete?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    connect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    update?: SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutSubscriptionInput | SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: SubscriptionCancellationRequestUpdateManyWithWhereWithoutSubscriptionInput | SubscriptionCancellationRequestUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: SubscriptionCancellationRequestScalarWhereInput | SubscriptionCancellationRequestScalarWhereInput[]
  }

  export type SubscriptionCancellationRequestUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<SubscriptionCancellationRequestCreateWithoutSubscriptionInput, SubscriptionCancellationRequestUncheckedCreateWithoutSubscriptionInput> | SubscriptionCancellationRequestCreateWithoutSubscriptionInput[] | SubscriptionCancellationRequestUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: SubscriptionCancellationRequestCreateOrConnectWithoutSubscriptionInput | SubscriptionCancellationRequestCreateOrConnectWithoutSubscriptionInput[]
    upsert?: SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutSubscriptionInput | SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: SubscriptionCancellationRequestCreateManySubscriptionInputEnvelope
    set?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    disconnect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    delete?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    connect?: SubscriptionCancellationRequestWhereUniqueInput | SubscriptionCancellationRequestWhereUniqueInput[]
    update?: SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutSubscriptionInput | SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: SubscriptionCancellationRequestUpdateManyWithWhereWithoutSubscriptionInput | SubscriptionCancellationRequestUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: SubscriptionCancellationRequestScalarWhereInput | SubscriptionCancellationRequestScalarWhereInput[]
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

  export type MaintenanceLogCreateNestedManyWithoutEquipmentInput = {
    create?: XOR<MaintenanceLogCreateWithoutEquipmentInput, MaintenanceLogUncheckedCreateWithoutEquipmentInput> | MaintenanceLogCreateWithoutEquipmentInput[] | MaintenanceLogUncheckedCreateWithoutEquipmentInput[]
    connectOrCreate?: MaintenanceLogCreateOrConnectWithoutEquipmentInput | MaintenanceLogCreateOrConnectWithoutEquipmentInput[]
    createMany?: MaintenanceLogCreateManyEquipmentInputEnvelope
    connect?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCreatedEquipmentInput = {
    create?: XOR<UserCreateWithoutCreatedEquipmentInput, UserUncheckedCreateWithoutCreatedEquipmentInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedEquipmentInput
    connect?: UserWhereUniqueInput
  }

  export type MaintenanceLogUncheckedCreateNestedManyWithoutEquipmentInput = {
    create?: XOR<MaintenanceLogCreateWithoutEquipmentInput, MaintenanceLogUncheckedCreateWithoutEquipmentInput> | MaintenanceLogCreateWithoutEquipmentInput[] | MaintenanceLogUncheckedCreateWithoutEquipmentInput[]
    connectOrCreate?: MaintenanceLogCreateOrConnectWithoutEquipmentInput | MaintenanceLogCreateOrConnectWithoutEquipmentInput[]
    createMany?: MaintenanceLogCreateManyEquipmentInputEnvelope
    connect?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
  }

  export type MaintenanceLogUpdateManyWithoutEquipmentNestedInput = {
    create?: XOR<MaintenanceLogCreateWithoutEquipmentInput, MaintenanceLogUncheckedCreateWithoutEquipmentInput> | MaintenanceLogCreateWithoutEquipmentInput[] | MaintenanceLogUncheckedCreateWithoutEquipmentInput[]
    connectOrCreate?: MaintenanceLogCreateOrConnectWithoutEquipmentInput | MaintenanceLogCreateOrConnectWithoutEquipmentInput[]
    upsert?: MaintenanceLogUpsertWithWhereUniqueWithoutEquipmentInput | MaintenanceLogUpsertWithWhereUniqueWithoutEquipmentInput[]
    createMany?: MaintenanceLogCreateManyEquipmentInputEnvelope
    set?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    disconnect?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    delete?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    connect?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    update?: MaintenanceLogUpdateWithWhereUniqueWithoutEquipmentInput | MaintenanceLogUpdateWithWhereUniqueWithoutEquipmentInput[]
    updateMany?: MaintenanceLogUpdateManyWithWhereWithoutEquipmentInput | MaintenanceLogUpdateManyWithWhereWithoutEquipmentInput[]
    deleteMany?: MaintenanceLogScalarWhereInput | MaintenanceLogScalarWhereInput[]
  }

  export type UserUpdateOneWithoutCreatedEquipmentNestedInput = {
    create?: XOR<UserCreateWithoutCreatedEquipmentInput, UserUncheckedCreateWithoutCreatedEquipmentInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedEquipmentInput
    upsert?: UserUpsertWithoutCreatedEquipmentInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedEquipmentInput, UserUpdateWithoutCreatedEquipmentInput>, UserUncheckedUpdateWithoutCreatedEquipmentInput>
  }

  export type MaintenanceLogUncheckedUpdateManyWithoutEquipmentNestedInput = {
    create?: XOR<MaintenanceLogCreateWithoutEquipmentInput, MaintenanceLogUncheckedCreateWithoutEquipmentInput> | MaintenanceLogCreateWithoutEquipmentInput[] | MaintenanceLogUncheckedCreateWithoutEquipmentInput[]
    connectOrCreate?: MaintenanceLogCreateOrConnectWithoutEquipmentInput | MaintenanceLogCreateOrConnectWithoutEquipmentInput[]
    upsert?: MaintenanceLogUpsertWithWhereUniqueWithoutEquipmentInput | MaintenanceLogUpsertWithWhereUniqueWithoutEquipmentInput[]
    createMany?: MaintenanceLogCreateManyEquipmentInputEnvelope
    set?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    disconnect?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    delete?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    connect?: MaintenanceLogWhereUniqueInput | MaintenanceLogWhereUniqueInput[]
    update?: MaintenanceLogUpdateWithWhereUniqueWithoutEquipmentInput | MaintenanceLogUpdateWithWhereUniqueWithoutEquipmentInput[]
    updateMany?: MaintenanceLogUpdateManyWithWhereWithoutEquipmentInput | MaintenanceLogUpdateManyWithWhereWithoutEquipmentInput[]
    deleteMany?: MaintenanceLogScalarWhereInput | MaintenanceLogScalarWhereInput[]
  }

  export type EquipmentCreateNestedOneWithoutMaintenanceLogsInput = {
    create?: XOR<EquipmentCreateWithoutMaintenanceLogsInput, EquipmentUncheckedCreateWithoutMaintenanceLogsInput>
    connectOrCreate?: EquipmentCreateOrConnectWithoutMaintenanceLogsInput
    connect?: EquipmentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedMaintenanceLogsInput = {
    create?: XOR<UserCreateWithoutCreatedMaintenanceLogsInput, UserUncheckedCreateWithoutCreatedMaintenanceLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedMaintenanceLogsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type EquipmentUpdateOneRequiredWithoutMaintenanceLogsNestedInput = {
    create?: XOR<EquipmentCreateWithoutMaintenanceLogsInput, EquipmentUncheckedCreateWithoutMaintenanceLogsInput>
    connectOrCreate?: EquipmentCreateOrConnectWithoutMaintenanceLogsInput
    upsert?: EquipmentUpsertWithoutMaintenanceLogsInput
    connect?: EquipmentWhereUniqueInput
    update?: XOR<XOR<EquipmentUpdateToOneWithWhereWithoutMaintenanceLogsInput, EquipmentUpdateWithoutMaintenanceLogsInput>, EquipmentUncheckedUpdateWithoutMaintenanceLogsInput>
  }

  export type UserUpdateOneWithoutCreatedMaintenanceLogsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedMaintenanceLogsInput, UserUncheckedCreateWithoutCreatedMaintenanceLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedMaintenanceLogsInput
    upsert?: UserUpsertWithoutCreatedMaintenanceLogsInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedMaintenanceLogsInput, UserUpdateWithoutCreatedMaintenanceLogsInput>, UserUncheckedUpdateWithoutCreatedMaintenanceLogsInput>
  }

  export type SubscriptionCreateNestedOneWithoutCancellationRequestsInput = {
    create?: XOR<SubscriptionCreateWithoutCancellationRequestsInput, SubscriptionUncheckedCreateWithoutCancellationRequestsInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCancellationRequestsInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCancellationRequestsInput = {
    create?: XOR<UserCreateWithoutCancellationRequestsInput, UserUncheckedCreateWithoutCancellationRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCancellationRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProcessedCancellationRequestsInput = {
    create?: XOR<UserCreateWithoutProcessedCancellationRequestsInput, UserUncheckedCreateWithoutProcessedCancellationRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProcessedCancellationRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type SubscriptionUpdateOneRequiredWithoutCancellationRequestsNestedInput = {
    create?: XOR<SubscriptionCreateWithoutCancellationRequestsInput, SubscriptionUncheckedCreateWithoutCancellationRequestsInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutCancellationRequestsInput
    upsert?: SubscriptionUpsertWithoutCancellationRequestsInput
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutCancellationRequestsInput, SubscriptionUpdateWithoutCancellationRequestsInput>, SubscriptionUncheckedUpdateWithoutCancellationRequestsInput>
  }

  export type UserUpdateOneRequiredWithoutCancellationRequestsNestedInput = {
    create?: XOR<UserCreateWithoutCancellationRequestsInput, UserUncheckedCreateWithoutCancellationRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCancellationRequestsInput
    upsert?: UserUpsertWithoutCancellationRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCancellationRequestsInput, UserUpdateWithoutCancellationRequestsInput>, UserUncheckedUpdateWithoutCancellationRequestsInput>
  }

  export type UserUpdateOneWithoutProcessedCancellationRequestsNestedInput = {
    create?: XOR<UserCreateWithoutProcessedCancellationRequestsInput, UserUncheckedCreateWithoutProcessedCancellationRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProcessedCancellationRequestsInput
    upsert?: UserUpsertWithoutProcessedCancellationRequestsInput
    disconnect?: boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProcessedCancellationRequestsInput, UserUpdateWithoutProcessedCancellationRequestsInput>, UserUncheckedUpdateWithoutProcessedCancellationRequestsInput>
  }

  export type UserCreateNestedOneWithoutMemberAppointmentsInput = {
    create?: XOR<UserCreateWithoutMemberAppointmentsInput, UserUncheckedCreateWithoutMemberAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMemberAppointmentsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTrainerAppointmentsInput = {
    create?: XOR<UserCreateWithoutTrainerAppointmentsInput, UserUncheckedCreateWithoutTrainerAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainerAppointmentsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMemberAppointmentsNestedInput = {
    create?: XOR<UserCreateWithoutMemberAppointmentsInput, UserUncheckedCreateWithoutMemberAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMemberAppointmentsInput
    upsert?: UserUpsertWithoutMemberAppointmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMemberAppointmentsInput, UserUpdateWithoutMemberAppointmentsInput>, UserUncheckedUpdateWithoutMemberAppointmentsInput>
  }

  export type UserUpdateOneRequiredWithoutTrainerAppointmentsNestedInput = {
    create?: XOR<UserCreateWithoutTrainerAppointmentsInput, UserUncheckedCreateWithoutTrainerAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainerAppointmentsInput
    upsert?: UserUpsertWithoutTrainerAppointmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTrainerAppointmentsInput, UserUpdateWithoutTrainerAppointmentsInput>, UserUncheckedUpdateWithoutTrainerAppointmentsInput>
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

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
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
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutSubscriptionInput
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
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutSubscriptionInput
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
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutSubscriptionInput
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
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutSubscriptionInput
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

  export type EquipmentCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description: string
    category: string
    purchaseDate: Date | string
    purchasePrice: number
    manufacturer: string
    model?: string | null
    serialNumber?: string | null
    status?: string
    location?: string | null
    lastMaintenance?: Date | string | null
    nextMaintenance?: Date | string | null
    imageBase64?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    maintenanceLogs?: MaintenanceLogCreateNestedManyWithoutEquipmentInput
  }

  export type EquipmentUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description: string
    category: string
    purchaseDate: Date | string
    purchasePrice: number
    manufacturer: string
    model?: string | null
    serialNumber?: string | null
    status?: string
    location?: string | null
    lastMaintenance?: Date | string | null
    nextMaintenance?: Date | string | null
    imageBase64?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    maintenanceLogs?: MaintenanceLogUncheckedCreateNestedManyWithoutEquipmentInput
  }

  export type EquipmentCreateOrConnectWithoutCreatedByInput = {
    where: EquipmentWhereUniqueInput
    create: XOR<EquipmentCreateWithoutCreatedByInput, EquipmentUncheckedCreateWithoutCreatedByInput>
  }

  export type EquipmentCreateManyCreatedByInputEnvelope = {
    data: EquipmentCreateManyCreatedByInput | EquipmentCreateManyCreatedByInput[]
  }

  export type MaintenanceLogCreateWithoutCreatedByInput = {
    id?: string
    maintenanceDate?: Date | string
    maintenanceType: string
    description: string
    cost?: number | null
    technician?: string | null
    parts?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    equipment: EquipmentCreateNestedOneWithoutMaintenanceLogsInput
  }

  export type MaintenanceLogUncheckedCreateWithoutCreatedByInput = {
    id?: string
    equipmentId: string
    maintenanceDate?: Date | string
    maintenanceType: string
    description: string
    cost?: number | null
    technician?: string | null
    parts?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaintenanceLogCreateOrConnectWithoutCreatedByInput = {
    where: MaintenanceLogWhereUniqueInput
    create: XOR<MaintenanceLogCreateWithoutCreatedByInput, MaintenanceLogUncheckedCreateWithoutCreatedByInput>
  }

  export type MaintenanceLogCreateManyCreatedByInputEnvelope = {
    data: MaintenanceLogCreateManyCreatedByInput | MaintenanceLogCreateManyCreatedByInput[]
  }

  export type SubscriptionCancellationRequestCreateWithoutMemberInput = {
    id?: string
    requestDate?: Date | string
    status?: string
    reason?: string | null
    adminNote?: string | null
    refundAmount?: number | null
    processedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription: SubscriptionCreateNestedOneWithoutCancellationRequestsInput
    processedBy?: UserCreateNestedOneWithoutProcessedCancellationRequestsInput
  }

  export type SubscriptionCancellationRequestUncheckedCreateWithoutMemberInput = {
    id?: string
    subscriptionId: string
    requestDate?: Date | string
    status?: string
    reason?: string | null
    adminNote?: string | null
    refundAmount?: number | null
    processedById?: string | null
    processedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCancellationRequestCreateOrConnectWithoutMemberInput = {
    where: SubscriptionCancellationRequestWhereUniqueInput
    create: XOR<SubscriptionCancellationRequestCreateWithoutMemberInput, SubscriptionCancellationRequestUncheckedCreateWithoutMemberInput>
  }

  export type SubscriptionCancellationRequestCreateManyMemberInputEnvelope = {
    data: SubscriptionCancellationRequestCreateManyMemberInput | SubscriptionCancellationRequestCreateManyMemberInput[]
  }

  export type SubscriptionCancellationRequestCreateWithoutProcessedByInput = {
    id?: string
    requestDate?: Date | string
    status?: string
    reason?: string | null
    adminNote?: string | null
    refundAmount?: number | null
    processedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription: SubscriptionCreateNestedOneWithoutCancellationRequestsInput
    member: UserCreateNestedOneWithoutCancellationRequestsInput
  }

  export type SubscriptionCancellationRequestUncheckedCreateWithoutProcessedByInput = {
    id?: string
    subscriptionId: string
    memberId: string
    requestDate?: Date | string
    status?: string
    reason?: string | null
    adminNote?: string | null
    refundAmount?: number | null
    processedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCancellationRequestCreateOrConnectWithoutProcessedByInput = {
    where: SubscriptionCancellationRequestWhereUniqueInput
    create: XOR<SubscriptionCancellationRequestCreateWithoutProcessedByInput, SubscriptionCancellationRequestUncheckedCreateWithoutProcessedByInput>
  }

  export type SubscriptionCancellationRequestCreateManyProcessedByInputEnvelope = {
    data: SubscriptionCancellationRequestCreateManyProcessedByInput | SubscriptionCancellationRequestCreateManyProcessedByInput[]
  }

  export type AppointmentCreateWithoutMemberInput = {
    id?: string
    title: string
    description?: string | null
    appointmentDate: Date | string
    duration: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainer: UserCreateNestedOneWithoutTrainerAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutMemberInput = {
    id?: string
    trainerId: string
    title: string
    description?: string | null
    appointmentDate: Date | string
    duration: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutMemberInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutMemberInput, AppointmentUncheckedCreateWithoutMemberInput>
  }

  export type AppointmentCreateManyMemberInputEnvelope = {
    data: AppointmentCreateManyMemberInput | AppointmentCreateManyMemberInput[]
  }

  export type AppointmentCreateWithoutTrainerInput = {
    id?: string
    title: string
    description?: string | null
    appointmentDate: Date | string
    duration: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: UserCreateNestedOneWithoutMemberAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutTrainerInput = {
    id?: string
    memberId: string
    title: string
    description?: string | null
    appointmentDate: Date | string
    duration: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutTrainerInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutTrainerInput, AppointmentUncheckedCreateWithoutTrainerInput>
  }

  export type AppointmentCreateManyTrainerInputEnvelope = {
    data: AppointmentCreateManyTrainerInput | AppointmentCreateManyTrainerInput[]
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

  export type EquipmentUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: EquipmentWhereUniqueInput
    update: XOR<EquipmentUpdateWithoutCreatedByInput, EquipmentUncheckedUpdateWithoutCreatedByInput>
    create: XOR<EquipmentCreateWithoutCreatedByInput, EquipmentUncheckedCreateWithoutCreatedByInput>
  }

  export type EquipmentUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: EquipmentWhereUniqueInput
    data: XOR<EquipmentUpdateWithoutCreatedByInput, EquipmentUncheckedUpdateWithoutCreatedByInput>
  }

  export type EquipmentUpdateManyWithWhereWithoutCreatedByInput = {
    where: EquipmentScalarWhereInput
    data: XOR<EquipmentUpdateManyMutationInput, EquipmentUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type EquipmentScalarWhereInput = {
    AND?: EquipmentScalarWhereInput | EquipmentScalarWhereInput[]
    OR?: EquipmentScalarWhereInput[]
    NOT?: EquipmentScalarWhereInput | EquipmentScalarWhereInput[]
    id?: StringFilter<"Equipment"> | string
    name?: StringFilter<"Equipment"> | string
    description?: StringFilter<"Equipment"> | string
    category?: StringFilter<"Equipment"> | string
    purchaseDate?: DateTimeFilter<"Equipment"> | Date | string
    purchasePrice?: FloatFilter<"Equipment"> | number
    manufacturer?: StringFilter<"Equipment"> | string
    model?: StringNullableFilter<"Equipment"> | string | null
    serialNumber?: StringNullableFilter<"Equipment"> | string | null
    status?: StringFilter<"Equipment"> | string
    location?: StringNullableFilter<"Equipment"> | string | null
    lastMaintenance?: DateTimeNullableFilter<"Equipment"> | Date | string | null
    nextMaintenance?: DateTimeNullableFilter<"Equipment"> | Date | string | null
    imageBase64?: StringNullableFilter<"Equipment"> | string | null
    notes?: StringNullableFilter<"Equipment"> | string | null
    createdById?: StringNullableFilter<"Equipment"> | string | null
    createdAt?: DateTimeFilter<"Equipment"> | Date | string
    updatedAt?: DateTimeFilter<"Equipment"> | Date | string
  }

  export type MaintenanceLogUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: MaintenanceLogWhereUniqueInput
    update: XOR<MaintenanceLogUpdateWithoutCreatedByInput, MaintenanceLogUncheckedUpdateWithoutCreatedByInput>
    create: XOR<MaintenanceLogCreateWithoutCreatedByInput, MaintenanceLogUncheckedCreateWithoutCreatedByInput>
  }

  export type MaintenanceLogUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: MaintenanceLogWhereUniqueInput
    data: XOR<MaintenanceLogUpdateWithoutCreatedByInput, MaintenanceLogUncheckedUpdateWithoutCreatedByInput>
  }

  export type MaintenanceLogUpdateManyWithWhereWithoutCreatedByInput = {
    where: MaintenanceLogScalarWhereInput
    data: XOR<MaintenanceLogUpdateManyMutationInput, MaintenanceLogUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type MaintenanceLogScalarWhereInput = {
    AND?: MaintenanceLogScalarWhereInput | MaintenanceLogScalarWhereInput[]
    OR?: MaintenanceLogScalarWhereInput[]
    NOT?: MaintenanceLogScalarWhereInput | MaintenanceLogScalarWhereInput[]
    id?: StringFilter<"MaintenanceLog"> | string
    equipmentId?: StringFilter<"MaintenanceLog"> | string
    maintenanceDate?: DateTimeFilter<"MaintenanceLog"> | Date | string
    maintenanceType?: StringFilter<"MaintenanceLog"> | string
    description?: StringFilter<"MaintenanceLog"> | string
    cost?: FloatNullableFilter<"MaintenanceLog"> | number | null
    technician?: StringNullableFilter<"MaintenanceLog"> | string | null
    parts?: StringNullableFilter<"MaintenanceLog"> | string | null
    status?: StringFilter<"MaintenanceLog"> | string
    createdById?: StringNullableFilter<"MaintenanceLog"> | string | null
    createdAt?: DateTimeFilter<"MaintenanceLog"> | Date | string
    updatedAt?: DateTimeFilter<"MaintenanceLog"> | Date | string
  }

  export type SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutMemberInput = {
    where: SubscriptionCancellationRequestWhereUniqueInput
    update: XOR<SubscriptionCancellationRequestUpdateWithoutMemberInput, SubscriptionCancellationRequestUncheckedUpdateWithoutMemberInput>
    create: XOR<SubscriptionCancellationRequestCreateWithoutMemberInput, SubscriptionCancellationRequestUncheckedCreateWithoutMemberInput>
  }

  export type SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutMemberInput = {
    where: SubscriptionCancellationRequestWhereUniqueInput
    data: XOR<SubscriptionCancellationRequestUpdateWithoutMemberInput, SubscriptionCancellationRequestUncheckedUpdateWithoutMemberInput>
  }

  export type SubscriptionCancellationRequestUpdateManyWithWhereWithoutMemberInput = {
    where: SubscriptionCancellationRequestScalarWhereInput
    data: XOR<SubscriptionCancellationRequestUpdateManyMutationInput, SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberInput>
  }

  export type SubscriptionCancellationRequestScalarWhereInput = {
    AND?: SubscriptionCancellationRequestScalarWhereInput | SubscriptionCancellationRequestScalarWhereInput[]
    OR?: SubscriptionCancellationRequestScalarWhereInput[]
    NOT?: SubscriptionCancellationRequestScalarWhereInput | SubscriptionCancellationRequestScalarWhereInput[]
    id?: StringFilter<"SubscriptionCancellationRequest"> | string
    subscriptionId?: StringFilter<"SubscriptionCancellationRequest"> | string
    memberId?: StringFilter<"SubscriptionCancellationRequest"> | string
    requestDate?: DateTimeFilter<"SubscriptionCancellationRequest"> | Date | string
    status?: StringFilter<"SubscriptionCancellationRequest"> | string
    reason?: StringNullableFilter<"SubscriptionCancellationRequest"> | string | null
    adminNote?: StringNullableFilter<"SubscriptionCancellationRequest"> | string | null
    refundAmount?: FloatNullableFilter<"SubscriptionCancellationRequest"> | number | null
    processedById?: StringNullableFilter<"SubscriptionCancellationRequest"> | string | null
    processedDate?: DateTimeNullableFilter<"SubscriptionCancellationRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"SubscriptionCancellationRequest"> | Date | string
    updatedAt?: DateTimeFilter<"SubscriptionCancellationRequest"> | Date | string
  }

  export type SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutProcessedByInput = {
    where: SubscriptionCancellationRequestWhereUniqueInput
    update: XOR<SubscriptionCancellationRequestUpdateWithoutProcessedByInput, SubscriptionCancellationRequestUncheckedUpdateWithoutProcessedByInput>
    create: XOR<SubscriptionCancellationRequestCreateWithoutProcessedByInput, SubscriptionCancellationRequestUncheckedCreateWithoutProcessedByInput>
  }

  export type SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutProcessedByInput = {
    where: SubscriptionCancellationRequestWhereUniqueInput
    data: XOR<SubscriptionCancellationRequestUpdateWithoutProcessedByInput, SubscriptionCancellationRequestUncheckedUpdateWithoutProcessedByInput>
  }

  export type SubscriptionCancellationRequestUpdateManyWithWhereWithoutProcessedByInput = {
    where: SubscriptionCancellationRequestScalarWhereInput
    data: XOR<SubscriptionCancellationRequestUpdateManyMutationInput, SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByInput>
  }

  export type AppointmentUpsertWithWhereUniqueWithoutMemberInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutMemberInput, AppointmentUncheckedUpdateWithoutMemberInput>
    create: XOR<AppointmentCreateWithoutMemberInput, AppointmentUncheckedCreateWithoutMemberInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutMemberInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutMemberInput, AppointmentUncheckedUpdateWithoutMemberInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutMemberInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutMemberInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    memberId?: StringFilter<"Appointment"> | string
    trainerId?: StringFilter<"Appointment"> | string
    title?: StringFilter<"Appointment"> | string
    description?: StringNullableFilter<"Appointment"> | string | null
    appointmentDate?: DateTimeFilter<"Appointment"> | Date | string
    duration?: IntFilter<"Appointment"> | number
    status?: StringFilter<"Appointment"> | string
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutTrainerInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutTrainerInput, AppointmentUncheckedUpdateWithoutTrainerInput>
    create: XOR<AppointmentCreateWithoutTrainerInput, AppointmentUncheckedCreateWithoutTrainerInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutTrainerInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutTrainerInput, AppointmentUncheckedUpdateWithoutTrainerInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutTrainerInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutTrainerInput>
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
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutSubscriptionInput
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
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutSubscriptionInput
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
    createdEquipment?: EquipmentCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentCreateNestedManyWithoutTrainerInput
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
    createdEquipment?: EquipmentUncheckedCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentUncheckedCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
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
    createdEquipment?: EquipmentCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentCreateNestedManyWithoutTrainerInput
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
    createdEquipment?: EquipmentUncheckedCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentUncheckedCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type UserCreateOrConnectWithoutCreatedSubscriptionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedSubscriptionsInput, UserUncheckedCreateWithoutCreatedSubscriptionsInput>
  }

  export type SubscriptionCancellationRequestCreateWithoutSubscriptionInput = {
    id?: string
    requestDate?: Date | string
    status?: string
    reason?: string | null
    adminNote?: string | null
    refundAmount?: number | null
    processedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: UserCreateNestedOneWithoutCancellationRequestsInput
    processedBy?: UserCreateNestedOneWithoutProcessedCancellationRequestsInput
  }

  export type SubscriptionCancellationRequestUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    memberId: string
    requestDate?: Date | string
    status?: string
    reason?: string | null
    adminNote?: string | null
    refundAmount?: number | null
    processedById?: string | null
    processedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCancellationRequestCreateOrConnectWithoutSubscriptionInput = {
    where: SubscriptionCancellationRequestWhereUniqueInput
    create: XOR<SubscriptionCancellationRequestCreateWithoutSubscriptionInput, SubscriptionCancellationRequestUncheckedCreateWithoutSubscriptionInput>
  }

  export type SubscriptionCancellationRequestCreateManySubscriptionInputEnvelope = {
    data: SubscriptionCancellationRequestCreateManySubscriptionInput | SubscriptionCancellationRequestCreateManySubscriptionInput[]
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
    createdEquipment?: EquipmentUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUpdateManyWithoutTrainerNestedInput
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
    createdEquipment?: EquipmentUncheckedUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUncheckedUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
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
    createdEquipment?: EquipmentUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUpdateManyWithoutTrainerNestedInput
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
    createdEquipment?: EquipmentUncheckedUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUncheckedUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type SubscriptionCancellationRequestUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: SubscriptionCancellationRequestWhereUniqueInput
    update: XOR<SubscriptionCancellationRequestUpdateWithoutSubscriptionInput, SubscriptionCancellationRequestUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<SubscriptionCancellationRequestCreateWithoutSubscriptionInput, SubscriptionCancellationRequestUncheckedCreateWithoutSubscriptionInput>
  }

  export type SubscriptionCancellationRequestUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: SubscriptionCancellationRequestWhereUniqueInput
    data: XOR<SubscriptionCancellationRequestUpdateWithoutSubscriptionInput, SubscriptionCancellationRequestUncheckedUpdateWithoutSubscriptionInput>
  }

  export type SubscriptionCancellationRequestUpdateManyWithWhereWithoutSubscriptionInput = {
    where: SubscriptionCancellationRequestScalarWhereInput
    data: XOR<SubscriptionCancellationRequestUpdateManyMutationInput, SubscriptionCancellationRequestUncheckedUpdateManyWithoutSubscriptionInput>
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
    createdEquipment?: EquipmentCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentCreateNestedManyWithoutTrainerInput
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
    createdEquipment?: EquipmentUncheckedCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentUncheckedCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
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
    createdEquipment?: EquipmentCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentCreateNestedManyWithoutTrainerInput
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
    createdEquipment?: EquipmentUncheckedCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentUncheckedCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
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
    createdEquipment?: EquipmentUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUpdateManyWithoutTrainerNestedInput
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
    createdEquipment?: EquipmentUncheckedUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUncheckedUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
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
    createdEquipment?: EquipmentUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUpdateManyWithoutTrainerNestedInput
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
    createdEquipment?: EquipmentUncheckedUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUncheckedUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type MaintenanceLogCreateWithoutEquipmentInput = {
    id?: string
    maintenanceDate?: Date | string
    maintenanceType: string
    description: string
    cost?: number | null
    technician?: string | null
    parts?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedMaintenanceLogsInput
  }

  export type MaintenanceLogUncheckedCreateWithoutEquipmentInput = {
    id?: string
    maintenanceDate?: Date | string
    maintenanceType: string
    description: string
    cost?: number | null
    technician?: string | null
    parts?: string | null
    status?: string
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaintenanceLogCreateOrConnectWithoutEquipmentInput = {
    where: MaintenanceLogWhereUniqueInput
    create: XOR<MaintenanceLogCreateWithoutEquipmentInput, MaintenanceLogUncheckedCreateWithoutEquipmentInput>
  }

  export type MaintenanceLogCreateManyEquipmentInputEnvelope = {
    data: MaintenanceLogCreateManyEquipmentInput | MaintenanceLogCreateManyEquipmentInput[]
  }

  export type UserCreateWithoutCreatedEquipmentInput = {
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
    createdMaintenanceLogs?: MaintenanceLogCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentCreateNestedManyWithoutTrainerInput
  }

  export type UserUncheckedCreateWithoutCreatedEquipmentInput = {
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
    createdMaintenanceLogs?: MaintenanceLogUncheckedCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentUncheckedCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type UserCreateOrConnectWithoutCreatedEquipmentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedEquipmentInput, UserUncheckedCreateWithoutCreatedEquipmentInput>
  }

  export type MaintenanceLogUpsertWithWhereUniqueWithoutEquipmentInput = {
    where: MaintenanceLogWhereUniqueInput
    update: XOR<MaintenanceLogUpdateWithoutEquipmentInput, MaintenanceLogUncheckedUpdateWithoutEquipmentInput>
    create: XOR<MaintenanceLogCreateWithoutEquipmentInput, MaintenanceLogUncheckedCreateWithoutEquipmentInput>
  }

  export type MaintenanceLogUpdateWithWhereUniqueWithoutEquipmentInput = {
    where: MaintenanceLogWhereUniqueInput
    data: XOR<MaintenanceLogUpdateWithoutEquipmentInput, MaintenanceLogUncheckedUpdateWithoutEquipmentInput>
  }

  export type MaintenanceLogUpdateManyWithWhereWithoutEquipmentInput = {
    where: MaintenanceLogScalarWhereInput
    data: XOR<MaintenanceLogUpdateManyMutationInput, MaintenanceLogUncheckedUpdateManyWithoutEquipmentInput>
  }

  export type UserUpsertWithoutCreatedEquipmentInput = {
    update: XOR<UserUpdateWithoutCreatedEquipmentInput, UserUncheckedUpdateWithoutCreatedEquipmentInput>
    create: XOR<UserCreateWithoutCreatedEquipmentInput, UserUncheckedCreateWithoutCreatedEquipmentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedEquipmentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedEquipmentInput, UserUncheckedUpdateWithoutCreatedEquipmentInput>
  }

  export type UserUpdateWithoutCreatedEquipmentInput = {
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
    createdMaintenanceLogs?: MaintenanceLogUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUpdateManyWithoutTrainerNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedEquipmentInput = {
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
    createdMaintenanceLogs?: MaintenanceLogUncheckedUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUncheckedUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type EquipmentCreateWithoutMaintenanceLogsInput = {
    id?: string
    name: string
    description: string
    category: string
    purchaseDate: Date | string
    purchasePrice: number
    manufacturer: string
    model?: string | null
    serialNumber?: string | null
    status?: string
    location?: string | null
    lastMaintenance?: Date | string | null
    nextMaintenance?: Date | string | null
    imageBase64?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedEquipmentInput
  }

  export type EquipmentUncheckedCreateWithoutMaintenanceLogsInput = {
    id?: string
    name: string
    description: string
    category: string
    purchaseDate: Date | string
    purchasePrice: number
    manufacturer: string
    model?: string | null
    serialNumber?: string | null
    status?: string
    location?: string | null
    lastMaintenance?: Date | string | null
    nextMaintenance?: Date | string | null
    imageBase64?: string | null
    notes?: string | null
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipmentCreateOrConnectWithoutMaintenanceLogsInput = {
    where: EquipmentWhereUniqueInput
    create: XOR<EquipmentCreateWithoutMaintenanceLogsInput, EquipmentUncheckedCreateWithoutMaintenanceLogsInput>
  }

  export type UserCreateWithoutCreatedMaintenanceLogsInput = {
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
    createdEquipment?: EquipmentCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentCreateNestedManyWithoutTrainerInput
  }

  export type UserUncheckedCreateWithoutCreatedMaintenanceLogsInput = {
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
    createdEquipment?: EquipmentUncheckedCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentUncheckedCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type UserCreateOrConnectWithoutCreatedMaintenanceLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedMaintenanceLogsInput, UserUncheckedCreateWithoutCreatedMaintenanceLogsInput>
  }

  export type EquipmentUpsertWithoutMaintenanceLogsInput = {
    update: XOR<EquipmentUpdateWithoutMaintenanceLogsInput, EquipmentUncheckedUpdateWithoutMaintenanceLogsInput>
    create: XOR<EquipmentCreateWithoutMaintenanceLogsInput, EquipmentUncheckedCreateWithoutMaintenanceLogsInput>
    where?: EquipmentWhereInput
  }

  export type EquipmentUpdateToOneWithWhereWithoutMaintenanceLogsInput = {
    where?: EquipmentWhereInput
    data: XOR<EquipmentUpdateWithoutMaintenanceLogsInput, EquipmentUncheckedUpdateWithoutMaintenanceLogsInput>
  }

  export type EquipmentUpdateWithoutMaintenanceLogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    manufacturer?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageBase64?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedEquipmentNestedInput
  }

  export type EquipmentUncheckedUpdateWithoutMaintenanceLogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    manufacturer?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageBase64?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutCreatedMaintenanceLogsInput = {
    update: XOR<UserUpdateWithoutCreatedMaintenanceLogsInput, UserUncheckedUpdateWithoutCreatedMaintenanceLogsInput>
    create: XOR<UserCreateWithoutCreatedMaintenanceLogsInput, UserUncheckedCreateWithoutCreatedMaintenanceLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedMaintenanceLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedMaintenanceLogsInput, UserUncheckedUpdateWithoutCreatedMaintenanceLogsInput>
  }

  export type UserUpdateWithoutCreatedMaintenanceLogsInput = {
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
    createdEquipment?: EquipmentUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUpdateManyWithoutTrainerNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedMaintenanceLogsInput = {
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
    createdEquipment?: EquipmentUncheckedUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUncheckedUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type SubscriptionCreateWithoutCancellationRequestsInput = {
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

  export type SubscriptionUncheckedCreateWithoutCancellationRequestsInput = {
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

  export type SubscriptionCreateOrConnectWithoutCancellationRequestsInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutCancellationRequestsInput, SubscriptionUncheckedCreateWithoutCancellationRequestsInput>
  }

  export type UserCreateWithoutCancellationRequestsInput = {
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
    createdEquipment?: EquipmentCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogCreateNestedManyWithoutCreatedByInput
    processedCancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentCreateNestedManyWithoutTrainerInput
  }

  export type UserUncheckedCreateWithoutCancellationRequestsInput = {
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
    createdEquipment?: EquipmentUncheckedCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedCreateNestedManyWithoutCreatedByInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentUncheckedCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type UserCreateOrConnectWithoutCancellationRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCancellationRequestsInput, UserUncheckedCreateWithoutCancellationRequestsInput>
  }

  export type UserCreateWithoutProcessedCancellationRequestsInput = {
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
    createdEquipment?: EquipmentCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutMemberInput
    memberAppointments?: AppointmentCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentCreateNestedManyWithoutTrainerInput
  }

  export type UserUncheckedCreateWithoutProcessedCancellationRequestsInput = {
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
    createdEquipment?: EquipmentUncheckedCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutMemberInput
    memberAppointments?: AppointmentUncheckedCreateNestedManyWithoutMemberInput
    trainerAppointments?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type UserCreateOrConnectWithoutProcessedCancellationRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProcessedCancellationRequestsInput, UserUncheckedCreateWithoutProcessedCancellationRequestsInput>
  }

  export type SubscriptionUpsertWithoutCancellationRequestsInput = {
    update: XOR<SubscriptionUpdateWithoutCancellationRequestsInput, SubscriptionUncheckedUpdateWithoutCancellationRequestsInput>
    create: XOR<SubscriptionCreateWithoutCancellationRequestsInput, SubscriptionUncheckedCreateWithoutCancellationRequestsInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutCancellationRequestsInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutCancellationRequestsInput, SubscriptionUncheckedUpdateWithoutCancellationRequestsInput>
  }

  export type SubscriptionUpdateWithoutCancellationRequestsInput = {
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

  export type SubscriptionUncheckedUpdateWithoutCancellationRequestsInput = {
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

  export type UserUpsertWithoutCancellationRequestsInput = {
    update: XOR<UserUpdateWithoutCancellationRequestsInput, UserUncheckedUpdateWithoutCancellationRequestsInput>
    create: XOR<UserCreateWithoutCancellationRequestsInput, UserUncheckedCreateWithoutCancellationRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCancellationRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCancellationRequestsInput, UserUncheckedUpdateWithoutCancellationRequestsInput>
  }

  export type UserUpdateWithoutCancellationRequestsInput = {
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
    createdEquipment?: EquipmentUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUpdateManyWithoutCreatedByNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUpdateManyWithoutTrainerNestedInput
  }

  export type UserUncheckedUpdateWithoutCancellationRequestsInput = {
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
    createdEquipment?: EquipmentUncheckedUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedUpdateManyWithoutCreatedByNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUncheckedUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type UserUpsertWithoutProcessedCancellationRequestsInput = {
    update: XOR<UserUpdateWithoutProcessedCancellationRequestsInput, UserUncheckedUpdateWithoutProcessedCancellationRequestsInput>
    create: XOR<UserCreateWithoutProcessedCancellationRequestsInput, UserUncheckedCreateWithoutProcessedCancellationRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProcessedCancellationRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProcessedCancellationRequestsInput, UserUncheckedUpdateWithoutProcessedCancellationRequestsInput>
  }

  export type UserUpdateWithoutProcessedCancellationRequestsInput = {
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
    createdEquipment?: EquipmentUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutMemberNestedInput
    memberAppointments?: AppointmentUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUpdateManyWithoutTrainerNestedInput
  }

  export type UserUncheckedUpdateWithoutProcessedCancellationRequestsInput = {
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
    createdEquipment?: EquipmentUncheckedUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberNestedInput
    memberAppointments?: AppointmentUncheckedUpdateManyWithoutMemberNestedInput
    trainerAppointments?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type UserCreateWithoutMemberAppointmentsInput = {
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
    createdEquipment?: EquipmentCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutProcessedByInput
    trainerAppointments?: AppointmentCreateNestedManyWithoutTrainerInput
  }

  export type UserUncheckedCreateWithoutMemberAppointmentsInput = {
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
    createdEquipment?: EquipmentUncheckedCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutProcessedByInput
    trainerAppointments?: AppointmentUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type UserCreateOrConnectWithoutMemberAppointmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMemberAppointmentsInput, UserUncheckedCreateWithoutMemberAppointmentsInput>
  }

  export type UserCreateWithoutTrainerAppointmentsInput = {
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
    createdEquipment?: EquipmentCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentCreateNestedManyWithoutMemberInput
  }

  export type UserUncheckedCreateWithoutTrainerAppointmentsInput = {
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
    createdEquipment?: EquipmentUncheckedCreateNestedManyWithoutCreatedByInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedCreateNestedManyWithoutCreatedByInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutMemberInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedCreateNestedManyWithoutProcessedByInput
    memberAppointments?: AppointmentUncheckedCreateNestedManyWithoutMemberInput
  }

  export type UserCreateOrConnectWithoutTrainerAppointmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTrainerAppointmentsInput, UserUncheckedCreateWithoutTrainerAppointmentsInput>
  }

  export type UserUpsertWithoutMemberAppointmentsInput = {
    update: XOR<UserUpdateWithoutMemberAppointmentsInput, UserUncheckedUpdateWithoutMemberAppointmentsInput>
    create: XOR<UserCreateWithoutMemberAppointmentsInput, UserUncheckedCreateWithoutMemberAppointmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMemberAppointmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMemberAppointmentsInput, UserUncheckedUpdateWithoutMemberAppointmentsInput>
  }

  export type UserUpdateWithoutMemberAppointmentsInput = {
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
    createdEquipment?: EquipmentUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutProcessedByNestedInput
    trainerAppointments?: AppointmentUpdateManyWithoutTrainerNestedInput
  }

  export type UserUncheckedUpdateWithoutMemberAppointmentsInput = {
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
    createdEquipment?: EquipmentUncheckedUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByNestedInput
    trainerAppointments?: AppointmentUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type UserUpsertWithoutTrainerAppointmentsInput = {
    update: XOR<UserUpdateWithoutTrainerAppointmentsInput, UserUncheckedUpdateWithoutTrainerAppointmentsInput>
    create: XOR<UserCreateWithoutTrainerAppointmentsInput, UserUncheckedCreateWithoutTrainerAppointmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTrainerAppointmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTrainerAppointmentsInput, UserUncheckedUpdateWithoutTrainerAppointmentsInput>
  }

  export type UserUpdateWithoutTrainerAppointmentsInput = {
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
    createdEquipment?: EquipmentUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUpdateManyWithoutMemberNestedInput
  }

  export type UserUncheckedUpdateWithoutTrainerAppointmentsInput = {
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
    createdEquipment?: EquipmentUncheckedUpdateManyWithoutCreatedByNestedInput
    createdMaintenanceLogs?: MaintenanceLogUncheckedUpdateManyWithoutCreatedByNestedInput
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberNestedInput
    processedCancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByNestedInput
    memberAppointments?: AppointmentUncheckedUpdateManyWithoutMemberNestedInput
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

  export type EquipmentCreateManyCreatedByInput = {
    id?: string
    name: string
    description: string
    category: string
    purchaseDate: Date | string
    purchasePrice: number
    manufacturer: string
    model?: string | null
    serialNumber?: string | null
    status?: string
    location?: string | null
    lastMaintenance?: Date | string | null
    nextMaintenance?: Date | string | null
    imageBase64?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaintenanceLogCreateManyCreatedByInput = {
    id?: string
    equipmentId: string
    maintenanceDate?: Date | string
    maintenanceType: string
    description: string
    cost?: number | null
    technician?: string | null
    parts?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCancellationRequestCreateManyMemberInput = {
    id?: string
    subscriptionId: string
    requestDate?: Date | string
    status?: string
    reason?: string | null
    adminNote?: string | null
    refundAmount?: number | null
    processedById?: string | null
    processedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCancellationRequestCreateManyProcessedByInput = {
    id?: string
    subscriptionId: string
    memberId: string
    requestDate?: Date | string
    status?: string
    reason?: string | null
    adminNote?: string | null
    refundAmount?: number | null
    processedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyMemberInput = {
    id?: string
    trainerId: string
    title: string
    description?: string | null
    appointmentDate: Date | string
    duration: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyTrainerInput = {
    id?: string
    memberId: string
    title: string
    description?: string | null
    appointmentDate: Date | string
    duration: number
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
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
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutSubscriptionNestedInput
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
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutSubscriptionNestedInput
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
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutSubscriptionNestedInput
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
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutSubscriptionNestedInput
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

  export type EquipmentUpdateWithoutCreatedByInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    manufacturer?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageBase64?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceLogs?: MaintenanceLogUpdateManyWithoutEquipmentNestedInput
  }

  export type EquipmentUncheckedUpdateWithoutCreatedByInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    manufacturer?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageBase64?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceLogs?: MaintenanceLogUncheckedUpdateManyWithoutEquipmentNestedInput
  }

  export type EquipmentUncheckedUpdateManyWithoutCreatedByInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    purchasePrice?: FloatFieldUpdateOperationsInput | number
    manufacturer?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    lastMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextMaintenance?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageBase64?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceLogUpdateWithoutCreatedByInput = {
    maintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    equipment?: EquipmentUpdateOneRequiredWithoutMaintenanceLogsNestedInput
  }

  export type MaintenanceLogUncheckedUpdateWithoutCreatedByInput = {
    equipmentId?: StringFieldUpdateOperationsInput | string
    maintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceLogUncheckedUpdateManyWithoutCreatedByInput = {
    equipmentId?: StringFieldUpdateOperationsInput | string
    maintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCancellationRequestUpdateWithoutMemberInput = {
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneRequiredWithoutCancellationRequestsNestedInput
    processedBy?: UserUpdateOneWithoutProcessedCancellationRequestsNestedInput
  }

  export type SubscriptionCancellationRequestUncheckedUpdateWithoutMemberInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedById?: NullableStringFieldUpdateOperationsInput | string | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCancellationRequestUncheckedUpdateManyWithoutMemberInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedById?: NullableStringFieldUpdateOperationsInput | string | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCancellationRequestUpdateWithoutProcessedByInput = {
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneRequiredWithoutCancellationRequestsNestedInput
    member?: UserUpdateOneRequiredWithoutCancellationRequestsNestedInput
  }

  export type SubscriptionCancellationRequestUncheckedUpdateWithoutProcessedByInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCancellationRequestUncheckedUpdateManyWithoutProcessedByInput = {
    subscriptionId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutMemberInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: UserUpdateOneRequiredWithoutTrainerAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutMemberInput = {
    trainerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutMemberInput = {
    trainerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutTrainerInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: UserUpdateOneRequiredWithoutMemberAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutTrainerInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutTrainerInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    cancellationRequests?: SubscriptionCancellationRequestUpdateManyWithoutSubscriptionNestedInput
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
    cancellationRequests?: SubscriptionCancellationRequestUncheckedUpdateManyWithoutSubscriptionNestedInput
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

  export type SubscriptionCancellationRequestCreateManySubscriptionInput = {
    id?: string
    memberId: string
    requestDate?: Date | string
    status?: string
    reason?: string | null
    adminNote?: string | null
    refundAmount?: number | null
    processedById?: string | null
    processedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCancellationRequestUpdateWithoutSubscriptionInput = {
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: UserUpdateOneRequiredWithoutCancellationRequestsNestedInput
    processedBy?: UserUpdateOneWithoutProcessedCancellationRequestsNestedInput
  }

  export type SubscriptionCancellationRequestUncheckedUpdateWithoutSubscriptionInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedById?: NullableStringFieldUpdateOperationsInput | string | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCancellationRequestUncheckedUpdateManyWithoutSubscriptionInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    requestDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    refundAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    processedById?: NullableStringFieldUpdateOperationsInput | string | null
    processedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceLogCreateManyEquipmentInput = {
    id?: string
    maintenanceDate?: Date | string
    maintenanceType: string
    description: string
    cost?: number | null
    technician?: string | null
    parts?: string | null
    status?: string
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaintenanceLogUpdateWithoutEquipmentInput = {
    maintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedMaintenanceLogsNestedInput
  }

  export type MaintenanceLogUncheckedUpdateWithoutEquipmentInput = {
    maintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceLogUncheckedUpdateManyWithoutEquipmentInput = {
    maintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
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