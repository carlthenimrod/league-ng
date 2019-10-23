import { User } from './user';
import { Message, Team } from './team';
import { League } from './league';

export interface SocketData {
  action: string;
}

export interface SocketLeagueData extends SocketData {
  league: League;
}

export interface SocketTeamData extends SocketData {
  team: Team;
}

export interface UserSocketData extends SocketData {
  users?: [User];
  message?: Message;
}

export interface SocketResponse {
  event: string;
  data: SocketData;
}
