import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  pakal: string;
  id: number;
  signatureList: Object;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { id: 1, pakal: 'Hydrogen', signatureList: '1' },
//   { id: 2, pakal: 'Helium', signatureList: '2' },
//   { id: 3, pakal: 'Lithium', signatureList: '3' },
//   { id: 4, pakal: 'Beryllium', signatureList: '4' },
//   { id: 5, pakal: 'Boron', signatureList: '5' },
//   { id: 6, pakal: 'Carbon', signatureList: '6'},
//   { id: 7, pakal: 'Nitrogen', signatureList: '7' },
//   { id: 8, pakal: 'Oxygen', signatureList: '8' },
//   { id: 9, pakal: 'Fluorine', signatureList: '9' },
//   { id: 10, pakal: 'Neon', signatureList: '10' }
// ];

@Component({
  selector: 'app-pakal-types-managementent',
  templateUrl: './pakal-types-managementent.component.html',
  styleUrls: ['./pakal-types-managementent.component.css']
})
export class PakalTypesManagemententComponent implements OnInit {

  displayedColumns: string[] = ['id', 'pakal', 'signatureList', ' '];
  dataSource = [{ id: 1, pakal: '', signatureList: [{item:'', serialNumber:'', quantity:1}] }];
  
  constructor() { }

  ngOnInit(): void {
  }

  saveData(warehouseUnitTable: any) {
    for (let i = 0; i < warehouseUnitTable._data.length; i++) {
      let row = warehouseUnitTable._data[i];
      console.log("row", row);
    }
  }

  addNewRow(){
    let id = this.dataSource.length + 1;
    let newRow = { id, pakal:'', signatureList: [{item:'', serialNumber:'', quantity:1}]};
    this.dataSource.push(newRow);
    console.log('this.dataSource: ',this.dataSource);
  }

  addNewSignatureItem(index: number){
    this.dataSource[index].signatureList.push({item:'', serialNumber:'', quantity:1});
  }

  removeNewSignatureItem(pakalIndex: number, signatureIndex: number ){
    this.dataSource[pakalIndex].signatureList.splice(signatureIndex, 1);
  }

}
