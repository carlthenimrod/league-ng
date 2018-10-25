import { Division } from '@app/models/division';
import { Team } from '@app/models/team';

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
