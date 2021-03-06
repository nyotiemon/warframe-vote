import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { Weapon } from './weapons/weapon';
import { WeaponDataService } from './weapons/weapon-data.service';
import { WType } from './type/wtype';
import { WTypeDataService } from './type/wtype-data.service';
import { WClass } from './class/wclass';
import { WClassDataService } from './class/wclass-data.service';
import { GrabDataService } from './script/grab-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WeaponDataService, WTypeDataService, WClassDataService, GrabDataService]
})
export class AppComponent implements OnInit {

  searchingWeapon: FormControl = new FormControl();
  filteredWeaponList: Observable<Weapon[]>;

  newWeapon: Weapon = new Weapon();
  newType: WType = new WType();
  newClass: WClass = new WClass();
  selectedWeapon: Weapon;


  constructor(private weaponDataService: WeaponDataService, private wTypeDataService: WTypeDataService,
    private wClassDataService: WClassDataService, private grabDataService: GrabDataService) {
  }

  addType(name) {
    this.newType = new WType();
    this.newType.name = name;
    this.wTypeDataService.addWType(this.newType);
  };

  addClass(name) {
    this.newClass = new WClass();
    this.newClass.name = name;
    this.wClassDataService.addWClass(this.newClass);
  };

  addWeapon(typeId, classId, name, image, mastery, disposition) {
    this.newWeapon = new Weapon();
    this.newWeapon.type = typeId;
    this.newWeapon.class = classId;
    this.newWeapon.name = name;
    this.newWeapon.image = image;
    this.newWeapon.mastery = mastery;
    this.newWeapon.disposition = disposition;

    this.weaponDataService.addWeapon(this.newWeapon);
    // console.log('this weapon added', this.newWeapon);
  };

  parseJsonData = (data: any) => {
    return new Promise((resolve, reject) => {
      // data(key, value). value with typeOf array is printed as Object (ex: Cost, NormalAttack)

      for (let key in data) {
        // key : IgnoreInCount / Weapons / Stances / Augments
        if (key !== 'Weapons') continue;

        for (let itemKey in data[key]) {
          const item = data[key][itemKey];
          // process the data as if collection is empty. register everything a new.
          if (typeof item.Name === 'undefined') { continue; } else {
            // check if wtype exist
            let thisWeaponTypeId: Number;
            this.newType = this.wTypeDataService.getWTypeByName(item.Type);
            if (typeof this.newType === 'undefined') {
              this.addType(item.Type);
              thisWeaponTypeId = this.wTypeDataService.lastId;
            } else {
              thisWeaponTypeId = this.newType.id;
            }

            // check if wclass exist
            let thisWeaponClassId: Number;
            // cant read some arch weapon class
            this.newClass = (typeof item.Class === 'undefined') ? this.wClassDataService.getWClassByName(item.Type) : this.wClassDataService.getWClassByName(item.Class);
            if (typeof this.newClass === 'undefined') {
              if (typeof item.Class === 'undefined') { // cant read some arch weapon class
                this.addClass(item.Type);
              } else {
                this.addClass(item.Class);
              }
              thisWeaponClassId = this.wClassDataService.lastId;
            } else {
              thisWeaponClassId = this.newClass.id;
            }

            // register new weapon
            this.addWeapon(thisWeaponTypeId, thisWeaponClassId, item.Name, item.Image, item.Mastery, item.Disposition);

          }
        }

        break; // break the loop if weapons data found
      }
    });
  };

  weaponFilter(val: string): Weapon[] {
    return this.weaponDataService.weapons.filter(weapon =>
      weapon.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  displayWeaponName(weapon?: Weapon): string | undefined {
    return weapon ? weapon.name : undefined;
  }

  ngOnInit() {
    this.grabDataService.fetchAndParseRemoteData()
      .then((DataToParse) => {
        console.log('*ba dum tss* ', DataToParse);

        this.parseJsonData(DataToParse);
        console.log("weapons: ", this.weaponDataService.weapons);
        console.log("type: ", this.wTypeDataService.wtypes);
        console.log("class:", this.wClassDataService.wclass);
      })
      .catch(function (error) {
        console.log('omo! ', error);
      });

    this.filteredWeaponList = this.searchingWeapon.valueChanges
      .pipe(
        startWith<string | Weapon>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.weaponFilter(name) : this.weaponDataService.weapons.slice())
      );
  }
}
