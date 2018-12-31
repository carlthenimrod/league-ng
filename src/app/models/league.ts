import { Team } from '@app/models/team';

export interface Division {
  name: string;
  divisions?: Division[];
  teams?: Team[];
  _id?: string;
  __v?: number;
}

export interface League {
  name: string;
  divisions?: Division[];
  teams?: Team[];
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
