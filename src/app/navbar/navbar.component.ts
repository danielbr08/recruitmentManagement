import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

const routeUrl: object = {
  '/manage-current-task/warehouse-unit-inventor': { 0: 0 },
  '/manage-current-task/allocate-pakal-battlion': { 0: 1 },
  '/manage-current-task/allocate-pakal-squad': { 0: 2 },
  '/manage-current-task/recruitment-management': { 0: 3 },
  '/manage-current-task/reports': { 0: 4 },
  '/manage/names-list': 1,
  '/manage/tasks': 2,
  '/manage/pakal-types': 3,
  '/manage/users': 4,
  '/manage/sub-units': 5
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'test';
  navArray: boolean[] = [false, false, false, false, false, false];
  subNavArray: boolean[] = [false, false, false, false, false];


  constructor(private location: Location) {
    this.setTabByUrl();
  }
  ngOnInit() {
  }

  onNavTabClick(index: number) {
    if (index == 0 && this.navArray[index]) {
      this.navArray[index] = false;
      return;
    }
    if (this.navArray[index]) {
      return;
    }
    if (index > 0) {
      this.setNavSubFalse();
    }
    this.setNavFalse();
    this.navArray[index] = true;
  }

  onNavSubTabClick(index: number) {
    this.setNavFalse();
    this.setNavSubFalse();
    this.navArray[0] = true;
    this.subNavArray[index] = true;
  }
  setNavSubFalse() {
    for (let i = 0; i < this.subNavArray.length; i++) {
      this.subNavArray[i] = false;
    }
  }

  setNavFalse() {
    for (let i = 0; i < this.navArray.length; i++) {
      this.navArray[i] = false;
    }
  }

  setTabByUrl() {
    let route = JSON.parse(JSON.stringify(routeUrl));
    let location = this.location.path().toString();
    let tabIndication = route[location];
    if (tabIndication) {
      if (tabIndication instanceof Object) {
        tabIndication = tabIndication[0];
        this.onNavSubTabClick(tabIndication);
      } else {
        this.onNavTabClick(tabIndication);
      }

    }
  }

}

