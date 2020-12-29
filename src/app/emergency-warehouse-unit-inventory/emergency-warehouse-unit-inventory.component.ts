import { Component, OnChanges, OnInit } from '@angular/core';

export interface PeriodicElement {
  pakal: string;
  id: number;
  quantity: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, pakal: 'Hydrogen', quantity: 1},
  {id: 2, pakal: 'Helium', quantity: 2},
  {id: 3, pakal: 'Lithium', quantity: 3},
  {id: 4, pakal: 'Beryllium', quantity: 4},
  {id: 5, pakal: 'Boron', quantity: 5},
  {id: 6, pakal: 'Carbon', quantity: 6},
  {id: 7, pakal: 'Nitrogen', quantity: 7},
  {id: 8, pakal: 'Oxygen', quantity: 8},
  {id: 9, pakal: 'Fluorine', quantity: 9},
  {id: 10, pakal: 'Neon', quantity: 10},
];

@Component({
  selector: 'app-emergency-warehouse-unit-inventory',
  templateUrl: './emergency-warehouse-unit-inventory.component.html',
  styleUrls: ['./emergency-warehouse-unit-inventory.component.css']
})
export class EmergencyWarehouseUnitInventoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'pakal', 'quantity', ' '];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
