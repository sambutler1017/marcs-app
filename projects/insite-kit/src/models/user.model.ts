import { StoreRegion, WebRole } from './common.model';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  webRole: WebRole | any;
  storeRegion?: StoreRegion;
  appAccess?: boolean;
  password?: string;
  storeId?: string;
  storeName?: string;
  hireDate?: Date;
  insertDate?: Date;
  salt?: number;
}