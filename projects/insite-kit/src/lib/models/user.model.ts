import { StoreRegion, WebRole } from './common.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  webRole: WebRole;
  storeRegion: StoreRegion;
  appAccess: boolean;
  username: string;
  password: string;
  storeId?: string;
  storeName?: string;
  hireDate: Date;
  insertDate: Date;
}
