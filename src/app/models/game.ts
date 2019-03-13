import { Place } from './place';

export interface Game {
  home: {
    _id: string;
    name: string;
    score?: string;
  };
  away: {
    _id: string;
    name: string;
    score?: string;
  };
  start?: string;
  time?: boolean;
  place?: Place;
  _id?: string;
  __v?: number;
}
