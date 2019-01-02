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
  _id?: string;
  __v?: number;
}
