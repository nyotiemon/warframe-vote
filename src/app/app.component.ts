import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Weapon, baseweapon } from './weapons/weapon';
import { WeaponDataService } from './weapons/weapon-data.service';
import { WType, basetype } from './type/wtype';
import { WTypeDataService } from './type/wtype-data.service';
import { WClass, baseclass } from './class/wclass';
import { WClassDataService } from './class/wclass-data.service';
import { GrabDataService } from './script/grab-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WeaponDataService, WTypeDataService, WClassDataService, GrabDataService]
})
export class AppComponent implements OnInit {
  weaponCollection: AngularFirestoreCollection<baseweapon>;
  typeCollection: AngularFirestoreCollection<basetype>;
  classCollection: AngularFirestoreCollection<baseclass>;

  searchingWeapon: FormControl = new FormControl();
  filteredWeaponList: Observable<Weapon[]>;

  newWeapon: Weapon = new Weapon();
  newType: WType = new WType();
  newClass: WClass = new WClass();
  selectedWeapon: Weapon;


  constructor(private weaponDataService: WeaponDataService, private wTypeDataService: WTypeDataService,
    private wClassDataService: WClassDataService, private grabDataService: GrabDataService,
    private db: AngularFirestore) {
  }

  addType(name) {
    this.newType = new WType();
    this.newType.name = name;
    this.wTypeDataService.addWType(this.newType);

    // let data = JSON.parse(JSON.stringify(this.newType));
    // this.typeCollection.add(data);
  };

  addClass(name) {
    this.newClass = new WClass();
    this.newClass.name = name;
    this.wClassDataService.addWClass(this.newClass);

    // let data = JSON.parse(JSON.stringify(this.newClass));
    // this.classCollection.add(data);
  };

  addWeapon(typeId: number, classId: number, name, image, mastery, disposition) {
    this.newWeapon = new Weapon();
    this.newWeapon.type = typeId;
    this.newWeapon.class = classId;
    this.newWeapon.name = name;
    this.newWeapon.image = image;
    this.newWeapon.mastery = mastery;
    this.newWeapon.disposition = disposition;

    this.weaponDataService.addWeapon(this.newWeapon);

    // let data = JSON.parse(JSON.stringify(this.newWeapon));
    // this.weaponCollection.add(data);
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
            let thisWeaponTypeId: number;
            this.newType = this.wTypeDataService.getWTypeByName(item.Type);
            if (typeof this.newType === 'undefined') {
              this.addType(item.Type);
              thisWeaponTypeId = this.wTypeDataService.lastId;
            } else {
              thisWeaponTypeId = this.newType.id;
            }

            // check if wclass exist
            let thisWeaponClassId: number;
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
    // this.grabDataService.fetchAndParseRemoteData()
    //   .then((DataToParse) => {
    //     console.log('*ba dum tss* ', DataToParse);

    //     this.parseJsonData(DataToParse);
    //     console.log("weapons: ", this.weaponDataService.weapons);
    //     console.log("type: ", this.wTypeDataService.wtypes);
    //     console.log("class:", this.wClassDataService.wclass);
    //   })
    //   .catch(function (error) {
    //     console.log('omo! ', error);
    //   });
    
      this.weaponCollection = this.db.collection('weapons');
      this.typeCollection = this.db.collection('types');
      this.classCollection = this.db.collection('class');

      this.addType("Primary");
      this.addType("Secondary");
      this.addType("Melee");

      this.addClass("Shotgun");
      this.addClass("Rifle");
      this.addClass("Pistol");
      this.addClass("Whip");
      this.addClass("Nikana");

      this.addWeapon(1, 1, "Tigris", "Tigris.jpg", 10, 1);
      this.addWeapon(1, 1, "Sobek", "Sobek.jpg", 5, 2);
      this.addWeapon(1, 2, "Soma", "Soma.jpg", 15, 4);
      this.addWeapon(1, 2, "Synoid Simulor", "SynoidSimulor.jpg", 12, 1);
      this.addWeapon(2, 3, "Lex", "Lex.jpg", 3, 2);
      this.addWeapon(2, 3, "Aklex", "Akex.jpg", 8, 4);
      this.addWeapon(3, 4, "Atterax", "Atterax.jpg", 9, 1);
      this.addWeapon(3, 5, "Nikana Prime", "NikanaPrime.jpg", 9, 1);
      
      console.log("weapons: ", this.weaponDataService.weapons);
      console.log("type: ", this.wTypeDataService.wtypes);
      console.log("class:", this.wClassDataService.wclass);

    this.filteredWeaponList = this.searchingWeapon.valueChanges
      .pipe(
        startWith<string | Weapon>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.weaponFilter(name) : this.weaponDataService.weapons.slice())
      );
  }

  getWeaponTypeName(weapon: Weapon): String {
    if (typeof weapon === 'undefined') return "";

    let thisWeaponType: WType = this.wTypeDataService.getWTypeById(weapon.type);
    if (typeof thisWeaponType === 'undefined') return "";

    return thisWeaponType.name;
  }

  getWeaponClassName(weapon: Weapon): String {
    if (typeof weapon === 'undefined') return "";

    let thisWeaponClass: WClass = this.wClassDataService.getWClassById(weapon.class);
    if (typeof thisWeaponClass === 'undefined') return "";

    return thisWeaponClass.name;
  }
}
