export enum WebRole {
  PART_TIME_EMPLOYEE = 1,
  EMPLOYEE = 2,
  CORPORATE_USER = 3,
  CUSTOMER_SERVICE_MANAGER = 4,
  ASSISTANT_MANAGER = 5,
  STORE_MANAGER = 6,
  DISTRICT_MANAGER = 7,
  REGIONAL_MANAGER = 8,
  SITE_ADMIN = 9,
  ADMIN = 10,
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
