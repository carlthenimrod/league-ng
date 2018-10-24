import { Division } from '@app/models/division';

export class League {
  constructor(
    public name: string,
    public description?: string,
    public start?: string,
    public end?: string,
    public divisions?: Division[],
    public _id?: string,
    public __v?: string
  ) {}
}
