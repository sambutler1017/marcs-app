export enum WebRole {
  USER = 1,
  MANAGER = 2,
  DISTRICTMANAGER = 3,
  REGIONAL = 4,
  SITEADMIN = 5,
  ADMIN = 6,
}

export enum StoreRegion {
  EAST = 1,
  WEST = 2,
  SOUTH = 3,
  SOUTHCENTRAL = 4,
  ALL = 5,
  NONE = 6,
}

export enum VacationStatus {
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  PENDING = 'PENDING',
}

export enum Application {
  USER = 'user',
  STORE = 'store',
  calendar = 'calendar',
  BLOCK_DATES = 'blockDates',
  MAP = 'map',
  REPORT = 'report',
  REGIONAL = 'regional',
  REQUEST_TRACKER = 'requestTracker',
  CONTACT = 'contact',
  GLOBAL = 'global',
}

export enum Access {
  CREATE = 'c',
  READ = 'r',
  UPDATE = 'u',
  DELETE = 'd',
}

export enum Feature {
  USER_DETAIL = 'detail',
  USER_VACATION = 'vacation',
  PROFILE = 'profile',
  NOTIFICATION = 'notification',
}
