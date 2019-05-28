import { User } from './user';

export interface SocketData {
  action: string;
  users?: [User];
}

export interface SocketResponse {
  event: string;
  data: SocketData;
}
