export class Weapon {
    id : number;
    type : number;
    class: number;
    name: '';
    image: '';
    mastery: number;
    disposition: number;
    fodder: number;
    notfodder: number;

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
