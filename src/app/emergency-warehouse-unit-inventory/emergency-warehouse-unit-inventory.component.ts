import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';

export interface PakalSelected {
  pakalId: number;
  quantity: number;
}

export interface Pakal {
  pakal: string;
  id: number;
  signatureList: SignatureList[];
}

export interface SignatureList {
  id: number;
  item: string;
  serialNumber: number;
  quantity: number;
}

const PAKALS: Pakal[] =
  [
    {"id":1,"pakal":"מאג","signatureList":[{"id":1,"item":"רצועה","serialNumber":123456,"quantity":4},{"id":2,"item":"חצובה","serialNumber":12345,"quantity":4},{"id":3,"item":"מאג","serialNumber":1234,"quantity":2}]},
    {"id":2,"pakal":"נשק","signatureList":[{"id":1,"item":"M16","serialNumber":123,"quantity":2},{"id":2,"item":"רצועה","serialNumber":12,"quantity":2}]}
  ];


@Component({
  selector: 'app-emergency-warehouse-unit-inventory',
  templateUrl: './emergency-warehouse-unit-inventory.component.html',
  styleUrls: ['./emergency-warehouse-unit-inventory.component.css']
})
export class EmergencyWarehouseUnitInventoryComponent implements OnInit {
  @ViewChild('pakalMatSelect')
  pakalMatSelect!: MatSelect;

  @ViewChild('pakalQuaantity')
  pakalQuaantity!: ElementRef;
  
  displayedColumns: string[] = ['id', 'pakal', 'quantity', ' '];
  pakals: Pakal[]= PAKALS;
  pakalsSelected: PakalSelected[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  saveData() {
    console.log("pakalsSelected", this.pakalsSelected);
  }

  addNewRow(){
    let pakalId = this.pakalMatSelect.value;
    let quantity = this.pakalQuaantity.nativeElement.value;
    if(pakalId && !this.isPakalSelected(pakalId)){
      console.log(pakalId,quantity);
      this.pakalsSelected.push({pakalId: pakalId, quantity: quantity});
      this.refresh();
    }
    this.resetMatSelect();
  }

  removePakalItem(pakalId: number){
    if(this.isPakalSelected(pakalId)){
    let selectedPakalIndex = this.getSelectedPakalIndex(pakalId);
    this.pakalsSelected.splice(selectedPakalIndex,1);
    this.refresh();
    }
  }

  getSelectedPakalIndex(pakalId: number){
    return this.pakalsSelected.findIndex(item=>item.pakalId === pakalId );
  }

  getPakalObject(pakalId: number){
    let index = this.pakals.findIndex(item=>item.id === pakalId );
    return this.pakals[index];
  }

  refresh(){
    this.pakalsSelected = [...this.pakalsSelected];
  }

  isPakalSelected(pakalId: number){
    return this.pakalsSelected.some(item=>item.pakalId === pakalId);
  }

  resetMatSelect(){
    this.pakalMatSelect.value = null;
    this.pakalQuaantity.nativeElement.value = 1;
  }

}
