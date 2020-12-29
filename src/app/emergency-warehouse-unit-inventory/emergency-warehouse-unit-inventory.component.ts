import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  pakal: string;
  id: number;
  quantity: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, pakal: 'Hydrogen', quantity: 1.0079},
  {id: 2, pakal: 'Helium', quantity: 4.0026},
  {id: 3, pakal: 'Lithium', quantity: 6.941},
  {id: 4, pakal: 'Beryllium', quantity: 9.0122},
  {id: 5, pakal: 'Boron', quantity: 10.811},
  {id: 6, pakal: 'Carbon', quantity: 12.0107},
  {id: 7, pakal: 'Nitrogen', quantity: 14.0067},
  {id: 8, pakal: 'Oxygen', quantity: 15.9994},
  {id: 9, pakal: 'Fluorine', quantity: 18.9984},
  {id: 10, pakal: 'Neon', quantity: 20.1797},
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
