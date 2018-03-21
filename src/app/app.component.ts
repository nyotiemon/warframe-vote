import { Component, OnInit } from '@angular/core';
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

  newWeapon: Weapon = new Weapon();
  newType: WType = new WType();
  newClass: WClass = new WClass();
  selectedWeapon: Weapon;

  constructor(private weaponDataService: WeaponDataService, private wTypeDataService: WTypeDataService,
    private wClassDataService: WClassDataService, private grabDataService: GrabDataService) {
  }

  ngOnInit() {
    this.grabDataService.fetchAndParseData()
      .then((DataToParse) => {
        console.log('*ba dum tss* ', DataToParse);
      })
      .catch(function (error) {
        console.log('omo! ', error);
      });
  }
}
