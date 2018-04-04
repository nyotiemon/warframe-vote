export class Weapon implements baseweapon {
    id : number;
    type : number;
    class: number;
    name: '';
    image: '';
    mastery: number;
    disposition: number;
    fodder: number = 0;
    notfodder: number = 0;
    legitvote: number = 0;

    constructor(values?: Partial<Weapon>) {
      Object.assign(this, values);
    }
}

export interface baseweapon {
  id : number;
  type : number;
  class: number;
  name: '';
  image: '';
  mastery: number;
  disposition: number;
  fodder: number;
  notfodder: number;
  legitvote: number;
}