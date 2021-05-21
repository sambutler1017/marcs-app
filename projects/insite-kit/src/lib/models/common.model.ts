export enum WebRole {
  USER = 'User',
  ADMIN = 'Admin',
  SITEADMIN = 'Site Admin',
  REGIONAL = 'Regional Manager',
  MANAGER = 'Manager',
  DISTRICTMANAGER = 'District Manager',
}

export enum StoreRegion {
  EAST = 1,
  WEST = 2,
  SOUTH = 3,
  SOUTHCENTRAL = 4,
  ALL = 5,
  NONE = 6,
}

export enum Application {
  MANAGER = 'manager',
  STORE = 'store',
  calendar = 'calendar',
  BLOCK_DATES = 'blockDates',
  MAP = 'map',
  REPORT = 'report',
  REGIONAL = 'regional',
  REQUEST_TRACKER = 'requestTracker',
  CONTACT = 'contact',
}

export enum Access {
  CREATE = 'c',
  READ = 'r',
  UPDATE = 'u',
  DELETE = 'd',
}

export enum Feature {
  MANAGER_DETAIL = 'detail',
  MANAGER_VACATION = 'vacation',
}
