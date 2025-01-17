
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 11f085a2012c0f4778414c8db2651556ee0ef959
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "11f085a2012c0f4778414c8db2651556ee0ef959"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.SessionScalarFieldEnum = {
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

exports.Prisma.PricingModuleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  key: 'key',
  price: 'price',
  is_default: 'is_default',
  available: 'available',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PricingFeatureScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  cycle: 'cycle',
  is_active: 'is_active',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PricingModuleFeatureScalarFieldEnum = {
  moduleId: 'moduleId',
  featureId: 'featureId',
  limit_quantity: 'limit_quantity',
  cycle: 'cycle',
  createdAt: 'createdAt'
};

exports.Prisma.SubscriptionScalarFieldEnum = {
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

exports.Prisma.SubscriptionQuotaScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  feature_id: 'feature_id',
  limit_quantity: 'limit_quantity',
  used_quantity: 'used_quantity',
  type: 'type',
  createdAt: 'createdAt'
};

exports.Prisma.UsageLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  feature_id: 'feature_id',
  used_quantity: 'used_quantity',
  createdAt: 'createdAt'
};

exports.Prisma.PaymentLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  action: 'action',
  status: 'status',
  external_transaction_id: 'external_transaction_id',
  details: 'details',
  amount: 'amount',
  createdAt: 'createdAt'
};

exports.Prisma.SourceProductScalarFieldEnum = {
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

exports.Prisma.SourceCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  source: 'source',
  sourceId: 'sourceId',
  createdAt: 'createdAt'
};

exports.Prisma.PlatformProductScalarFieldEnum = {
  id: 'id',
  platformId: 'platformId',
  sourceProductId: 'sourceProductId',
  userId: 'userId',
  metafields: 'metafields',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.SessionOrderByRelevanceFieldEnum = {
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

exports.Prisma.PricingModuleOrderByRelevanceFieldEnum = {
  name: 'name',
  key: 'key'
};

exports.Prisma.PricingFeatureOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.PricingModuleFeatureOrderByRelevanceFieldEnum = {
  featureId: 'featureId'
};

exports.Prisma.SubscriptionOrderByRelevanceFieldEnum = {
  id: 'id',
  external_subscription_id: 'external_subscription_id',
  status: 'status'
};

exports.Prisma.SubscriptionQuotaOrderByRelevanceFieldEnum = {
  feature_id: 'feature_id'
};

exports.Prisma.UsageLogOrderByRelevanceFieldEnum = {
  feature_id: 'feature_id'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.PaymentLogOrderByRelevanceFieldEnum = {
  action: 'action',
  external_transaction_id: 'external_transaction_id'
};

exports.Prisma.SourceProductOrderByRelevanceFieldEnum = {
  title: 'title',
  description: 'description',
  image: 'image',
  video: 'video',
  sourceUrl: 'sourceUrl',
  sourceId: 'sourceId',
  tiktokUrl: 'tiktokUrl'
};

exports.Prisma.SourceCategoryOrderByRelevanceFieldEnum = {
  name: 'name',
  sourceId: 'sourceId'
};

exports.Prisma.PlatformProductOrderByRelevanceFieldEnum = {
  platformId: 'platformId'
};
exports.QuotaType = exports.$Enums.QuotaType = {
  SUBSCRIPTION: 'SUBSCRIPTION',
  EXTRA: 'EXTRA'
};

exports.PaymentLogStatus = exports.$Enums.PaymentLogStatus = {
  CREATED: 'CREATED',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

exports.Source = exports.$Enums.Source = {
  ALIEXPRESS: 'ALIEXPRESS',
  SHOPIFY: 'SHOPIFY',
  EBAY: 'EBAY',
  AMAZON: 'AMAZON',
  WISH: 'WISH'
};

exports.SourceStatus = exports.$Enums.SourceStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

exports.Prisma.ModelName = {
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

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
