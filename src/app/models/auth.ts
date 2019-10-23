import { League } from './league';
import { Team } from './team';
import { UserStatus } from './user';

export interface AuthResponse {
  _id: string;
  email: string;
  name: { first: string; last: string; };
  fullName: string;
  img?: string;
  status: UserStatus;
  teams: Team[];
  access_token: string;
  refresh_token: string;
  client: string;
}

export interface Me extends AuthResponse {
  leagues: League[];
}
