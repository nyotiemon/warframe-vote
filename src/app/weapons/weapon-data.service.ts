import { Injectable } from '@angular/core';
import { Weapon } from './weapon';

@Injectable()
export class WeaponDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  // Placeholder for weapon's
  weapons: Weapon[] = [];

  constructor() { }

  // Simulate POST /weapons
  addWeapon(weapon: Weapon): WeaponDataService {
    if (!weapon.id) {
      weapon.id = ++this.lastId;
    }
    this.weapons.push(weapon);
    return this;
  }

  // Simulate DELETE /weapons/:id
  deleteWeaponById(id: number): WeaponDataService {
    this.weapons = this.weapons
      .filter(weapon => weapon.id !== id);
    return this;
  }

  // Simulate PUT /weapons/:id
  updateWeaponById(id: number, values: Object = {}): Weapon {
    const weapon = this.getWeaponById(id);
    if (!weapon) {
      return null;
    }
    Object.assign(weapon, values);
    return weapon;
  }

  // Simulate GET /weapons
  getAllWeapons(): Weapon[] {
    return this.weapons;
  }

  // Simulate GET /weapons/:id
  getWeaponById(id: number): Weapon {
    return this.weapons
      .filter(weapon => weapon.id === id)
      .pop();
  }

  // Simulate GET /weapons/:type
  getWeaponByType(wtypeid: number): Weapon[] {
    return this.weapons
      .filter(weapon => weapon.type === wtypeid);
  }

  // Simulate GET /weapons/:class
  getWeaponByClass(wclassid: number): Weapon[] {
    return this.weapons
      .filter(weapon => weapon.class === wclassid);
  }

  // Simulate GET /weapons/:name
  getWeaponByName(wname: string): Weapon {
    return this.weapons
      .filter(weapon => weapon.name === wname)
      .pop();
  }
}
