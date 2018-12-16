export interface Notice {
  _id: string;
  message: string;
  type: string;
  item: any;
  createdAt: string;
  updatedAt: string;
}

export interface NoticeList {
  notices: Notice[];
  leagues: number;
  teams: number;
  users: number;
  total: number;
}

export interface NoticeResponse {
  item: any;
  itemType: string;
  notice: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}
