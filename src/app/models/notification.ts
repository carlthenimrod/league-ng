export interface Notification {
  _id: string;
  message: string;
  type: string;
  item: any;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationList {
  notifications: Notification[];
  leagues: number;
  teams: number;
  users: number;
  total: number;
}

export interface NotificationResponse {
  item: any;
  itemType: string;
  notice: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}
