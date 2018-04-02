import { Injectable } from '@angular/core';
import { WType } from './wtype';

@Injectable()
export class WTypeDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  // Placeholder for weapon type's
  wtypes: WType[] = [];

  constructor() { }

  // Simulate POST /wtypes
  addWType(wtype: WType): WTypeDataService {
    if (!wtype.id) {
      wtype.id = ++this.lastId;
    }
    this.wtypes.push(wtype);
    return this;
  }

  // Simulate DELETE /wtypes/:id
  deleteWTypeById(id: number): WTypeDataService {
    this.wtypes = this.wtypes
      .filter(wtype => wtype.id !== id);
    return this;
  }

  // Simulate PUT /wtypes/:id
  updateWTypeById(id: number, values: Object = {}): WType {
    const wtype = this.getWTypeById(id);
    if (!wtype) {
      return null;
    }
    Object.assign(wtype, values);
    return wtype;
  }

  // Simulate GET /wtypes
  getAllWTypes(): WType[] {
    return this.wtypes;
  }

  // Simulate GET /wtypes/:id
  getWTypeById(id: number): WType {
    return this.wtypes
      .filter(wtype => wtype.id === id)
      .pop();
  }

  // Simulate GET /wtypes/:name
  getWTypeByName(wname: string): WType {
    return this.wtypes
      .filter(wtype => wtype.name === wname)
      .pop();
  }

}
