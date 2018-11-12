import { Team } from '@app/models/team';

export class Division {
  constructor(
    public name: string,
    public divisions: Division[] = [],
    public teams: Team[] = [],
    public parent: string | boolean = false,
    public depth?: number,
    public _id?: string,
    public __v?: string
  ) {}
}

export class League {
  constructor(
    public name: string,
    public divisions: Division[] = [],
    public teams: Team[] = [],
    public description?: string,
    public start?: string,
    public end?: string,
    public _id?: string,
    public __v?: string
  ) {}
}
