export interface Notification {
  message: string;
}

export interface NotificationList {
  leagues: Notification[];
  teams: Notification[];
  users: Notification[];
}
