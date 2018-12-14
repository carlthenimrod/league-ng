export interface Notification {
  _id: string;
  message: string;
  status: string;
}

export interface NotificationList {
  leagues: Notification[];
  teams: Notification[];
  users: Notification[];
}

export interface NotificationResponse {
  leagues: [{
    _id: string;
    name: string;
    status: string;
  }];
  teams: [{
    _id: string;
    name: string;
    status: string;
  }];
  users: [{
    _id: string;
    name: string;
    status: string;
  }];
}
