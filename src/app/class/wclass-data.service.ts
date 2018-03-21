import { Injectable } from '@angular/core';
import { WClass } from './wclass';

@Injectable()
export class WClassDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId = 0;

  // Placeholder for weapon class's
  wclass: WClass[] = [];

  constructor() { }

  // Simulate POST /wclass
  addWClass(wclass: WClass): WClassDataService {
    if (!wclass.id) {
      wclass.id = ++this.lastId;
    }
    this.wclass.push(wclass);
    return this;
  }

  // Simulate DELETE /wclass/:id
  deleteWClassById(id: number): WClassDataService {
    this.wclass = this.wclass
      .filter(wclass => wclass.id !== id);
    return this;
  }

  // Simulate PUT /wclass/:id
  updateWClassById(id: number, values: Object = {}): WClass {
    const wclass = this.getWClassById(id);
    if (!wclass) {
      return null;
    }
    Object.assign(wclass, values);
    return wclass;
  }

  // Simulate GET /wclass
  getAllWClasses(): WClass[] {
    return this.wclass;
  }

  // Simulate GET /wclass/:id
  getWClassById(id: number): WClass {
    return this.wclass
      .filter(wclass => wclass.id === id)
      .pop();
  }

  // Simulate GET /wclass/:name
  getWClassByName(wname: string): WClass {
    return this.wclass
      .filter(wclass => wclass.name === wname)
      .pop();
  }

}
