import { Team } from '@app/models/team';

export class Division {
  constructor(
    public name: string,
    public divisons: Division[] = [],
    public teams: Team[] = [],
    public parent?: string,
    public _id?: string,
    public __v?: string
  ) {}
}
