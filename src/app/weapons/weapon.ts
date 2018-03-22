export class Weapon {
    id : number;
    type : number;
    class: number;
    name: '';
    image: '';
    mastery: number;
    disposition: number;
    fodder: number = 0;
    notfodder: number = 0;
    legitVote: number = 0;

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
