export class WClass implements baseclass {
    id : number;
    name: '';

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}

export interface baseclass {
  id : number;
  name: '';
}