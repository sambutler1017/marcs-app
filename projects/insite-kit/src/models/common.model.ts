export enum WebRole {
  EMPLOYEE = 1,
  CORPORATE_USER = 2,
  CUSTOMER_SERVICE_MANAGER = 3,
  ASSISTANT_MANAGER = 4,
  STORE_MANAGER = 5,
  DISTRICT_MANAGER = 6,
  REGIONAL_MANAGER = 7,
  SITE_ADMIN = 8,
  ADMIN = 9,
}

export enum VacationStatus {
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
}

export enum Access {
  CREATE = 'c',
  READ = 'r',
  UPDATE = 'u',
  DELETE = 'd',
}

export enum AppFeature {
  USER_DETAIL = 'user.detail',
  USER_VACATION = 'user.vacation',
  STORE_DETAIL = 'store.detail',
  BLOCK_DATES_OVERVIEW = 'block-dates.overview',
  PROFILE = 'global.profile',
  NOTIFICATION = 'global.notification',
}
