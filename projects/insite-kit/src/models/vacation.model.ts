import { VacationStatus } from './common.model';
import { User } from './user.model';

export interface Vacation {
  id?: number;
  userId?: number;
  fullName?: string;
  storeId?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  insertDate?: Date;
  status?: VacationStatus;
  userProfile?: User;
}
