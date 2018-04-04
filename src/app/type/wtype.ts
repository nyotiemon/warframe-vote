export class WType implements basetype {
    id : number;
    name: '';

    constructor(values?: Partial<WType>) {
      Object.assign(this, values);
    }
}

export interface basetype {
  id : number;
  name: '';
}