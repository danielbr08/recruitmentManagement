import { Component, OnInit } from '@angular/core';
import { Pakal } from 'src/app/models/Pakal.model';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-pakal-types-managementent',
  templateUrl: './pakal-types-managementent.component.html',
  styleUrls: ['./pakal-types-managementent.component.css']
})
export class PakalTypesManagemententComponent implements OnInit {

  displayedColumns: string[] = ['id', 'pakal', 'signatureList', ' '];
  dataSource: Pakal[] = [{ pakalId: 1, name: '', signatureList: [{id:1, item:'', serialNumber:'', quantity:1}] }];
  maxPakalId: number = 0;
  maxSignatureItemlId: number = 0;
  
  constructor( private requestsService: RequestsService ) { }

  ngOnInit(): void {
    this.refreshData();
    this.initMaxIds();
  }

  async initMaxIds(){
    this.maxPakalId = (await this.requestsService.getMaxPakalId()) + 1;
    this.maxSignatureItemlId = (await this.requestsService.getMaxSignatureItemId()) + 1;
  }

  async saveData(warehouseUnitTable: any) {
    console.log('this.dataSource: ', JSON.stringify(this.dataSource));
    const res: any = await this.requestsService.savePakals(this.dataSource);
    if(!res.error){
      this.dataSource = res;
    }
  }

  async addNewRow(){
    console.log("this.maxPakalId: ", this.maxPakalId);
    let newRow = { pakalId: this.maxPakalId++, name:'', signatureList: [{id:this.maxSignatureItemlId++, item:'', serialNumber:'', quantity:1}]};
    this.dataSource.push(newRow);
    this.dataSource = [...this.dataSource];
    console.log('this.dataSource: ',this.dataSource);
  }

  addNewSignatureItem(pakalId: number){
    let pakalIndex = this.getPakalIndex(pakalId);
    this.dataSource[pakalIndex].signatureList.push({id:this.maxSignatureItemlId++, item:'', serialNumber:'', quantity:1});
    // this.refreshData();
  }

  removeSignatureItem(pakalId: number, signatureId: number){
    let pakalIndex = this.getPakalIndex(pakalId);
    let signatureIndex = this.getSignatureIndex(pakalId, signatureId);
    console.log(pakalId, signatureId);
    this.dataSource[pakalIndex].signatureList.splice(signatureIndex,1);
    // this.refreshData();
  }

  removePakalItem(pakalId: number){
    let pakalIndex = this.getPakalIndex(pakalId);
    this.dataSource.splice(pakalIndex,1);
    this.dataSource = [...this.dataSource];
    // this.refreshData();
  }

  getPakalIndex(pakalId: number){
    return this.dataSource.findIndex(item=>item.pakalId === pakalId );
  }

  getSignatureIndex(pakalId: number, signatureId: number){
    let pakalIndex = this.getPakalIndex(pakalId);
    let pakal = this.dataSource[pakalIndex];
    return pakal.signatureList.findIndex(item=>item.id === signatureId );
  }

  async refreshData(){
    this.dataSource = await this.requestsService.getPakals();
    if(this.dataSource.length == 0){
      this.dataSource = [{ pakalId: 1, name: '', signatureList: [{id:1, item:'', serialNumber:'', quantity:1}] }];
    }
  }

}
