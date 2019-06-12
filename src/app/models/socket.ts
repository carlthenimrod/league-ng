import { User } from './user';
import { Message } from './team';

export interface SocketData {
  action: string;
  users?: [User];
  message?: Message;
}

export interface SocketResponse {
  event: string;
  data: SocketData;
}
