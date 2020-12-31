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
  dataSource = [{ id: 1, pakal: '', signatureList: [{id:1, item:'', serialNumber:'', quantity:1}] }];
  
  constructor() { }

  ngOnInit(): void {
  }

  saveData(warehouseUnitTable: any) {
    console.log('this.dataSource: ', JSON.stringify(this.dataSource));

    for (let i = 0; i < warehouseUnitTable._data.length; i++) {
      let row = warehouseUnitTable._data[i];
      console.log("row", row);
    }
  }

  addNewRow(){
    let id = this.generateNewPakalId();
    let newRow = { id, pakal:'', signatureList: [{id:1, item:'', serialNumber:'', quantity:1}]};
    this.dataSource.push(newRow);
    this.refreshData();
    console.log('this.dataSource: ',this.dataSource);
  }

  addNewSignatureItem(pakalId: number){
    let pakalIndex = this.getPakalIndex(pakalId);
    let id = this.generateNewSignatureId(pakalIndex);
    this.dataSource[pakalIndex].signatureList.push({id, item:'', serialNumber:'', quantity:1});
    this.refreshData();
  }

  removeSignatureItem(pakalId: number, signatureId: number){
    let pakalIndex = this.getPakalIndex(pakalId);
    let signatureIndex = this.getSignatureIndex(pakalId, signatureId);
    this.dataSource[pakalIndex].signatureList.splice(signatureIndex,1);
    // this.refreshData();
  }

  removePakalItem(pakalId: number){
    let pakalIndex = this.getPakalIndex(pakalId);
    this.dataSource.splice(pakalIndex,1);
    this.refreshData();
  }

  generateNewPakalId(){
    let ids: number[] = [];
    this.dataSource.map(item=>ids.push(item.id));
    return Math.max(...ids) + 1;
  }

  generateNewSignatureId(pakalIndex: number){
    let ids: number[] = [];
    this.dataSource[pakalIndex].signatureList.map(item=>ids.push(item.id));
    return Math.max(...ids) + 1;
  }

  getPakalIndex(pakalId: number){
    return this.dataSource.findIndex(item=>item.id === pakalId );
  }

  getSignatureIndex(pakalId: number, signatureId: number){
    let pakalIndex = this.getPakalIndex(pakalId);
    let pakal = this.dataSource[pakalIndex];
    return pakal.signatureList.findIndex(item=>item.id === signatureId );
  }

  refreshData(){
    this.dataSource = [...this.dataSource];
  }

}
