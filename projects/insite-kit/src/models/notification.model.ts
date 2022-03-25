export interface Notification {
  id: number;
  type: NotificationType;
  read: boolean;
  receiverId: number;
  linkId: number;
  insertDate: Date;
}

export enum NotificationType {
  USER = 'New User Request',
  VACATION = 'New Vacation Request',
  REQUEST_TRACKER = 'Vacation Status Update',
}
