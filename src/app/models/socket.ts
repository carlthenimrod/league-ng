import { User } from './user';
import { Message } from './team';
import { League } from './league';

export interface SocketData {
  action: string;
}

export interface LeagueSocketData extends SocketData {
  league: League;
}

export interface UserSocketData extends SocketData {
  users?: [User];
  message?: Message;
}

export interface SocketResponse {
  event: string;
  data: SocketData;
}
