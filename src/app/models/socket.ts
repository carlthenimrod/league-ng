import { User } from './user';

export interface SocketResponse {
  action: string;
  data: {};
}

export interface RosterUpdate {
  user: User;
  status: string;
}
