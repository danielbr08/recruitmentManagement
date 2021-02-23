import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pakal } from 'src/app/models/Pakal.model';

const port = 3000;

@Component({
  selector: 'app-pakal-types-managementent',
  templateUrl: './pakal-types-managementent.component.html',
  styleUrls: ['./pakal-types-managementent.component.css']
})
export class PakalTypesManagemententComponent implements OnInit {

  displayedColumns: string[] = ['id', 'pakal', 'signatureList', ' '];
  dataSource: Pakal[] = [{ id: 1, name: '', signatureList: [{id:1, item:'', serialNumber:'', quantity:1}] }];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  saveData(warehouseUnitTable: any) {
    console.log('this.dataSource: ', JSON.stringify(this.dataSource));
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(this.dataSource);
    this.http.post(`http://localhost:${port}/api/recruitment/save-pakals`,body,{headers}).toPromise().then(data=>console.log("data: ", data)).catch(e=>console.log("error: ",e));

    // for (let i = 0; i < warehouseUnitTable._data.length; i++) {
    //   let row = warehouseUnitTable._data[i];
    //   console.log("row", row);
    // }
  }

  addNewRow(){
    let id = this.generateNewPakalId();
    let newRow = { id, name:'', signatureList: [{id:1, item:'', serialNumber:'', quantity:1}]};
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
