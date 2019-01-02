import { Team } from '@app/models/team';
import { Game } from './game';

export interface Division {
  name: string;
  divisions?: Division[];
  teams?: Team[];
  _id?: string;
  __v?: number;
}

export interface Group {
  _id: string;
  label: string;
  start?: string;
  games: Game[];
}

export interface League {
  name: string;
  divisions?: Division[];
  teams?: Team[];
  schedule?: Group[];
  description?: string;
  start?: string;
  end?: string;
  _id?: string;
  __v?: number;
}

export interface ScheduleOptions {
  strategy: string;
  per?: number;
  total?: string;
  start?: string;
  end?: string;
  days?: string[];
}
