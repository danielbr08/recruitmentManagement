import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Pakal } from '../models/Pakal.model';
import { PakalAllocated } from '../models/pakalAllocated.model';
import { RequestsService } from '../services/requests.service';
import { TasksServiceService } from '../services/tasks-service.service';

const PAKALS: Pakal[] = // The vale should be taken from server(by service)
  [
    {"pakalId":1,"name":"מאג","signatureList":[{"id":1,"item":"רצועה","serialNumber":"123456","quantity":4},{"id":2,"item":"חצובה","serialNumber":"12345","quantity":4},{"id":3,"item":"מאג","serialNumber":"1234","quantity":2}]},
    {"pakalId":2,"name":"נשק","signatureList":[{"id":1,"item":"M16","serialNumber":"123","quantity":2},{"id":2,"item":"רצועה","serialNumber":"12","quantity":2}]}
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
  pakals: Pakal[]= [];//PAKALS;
  pakalsSelected: PakalAllocated[] = [];

  constructor( private requestsService: RequestsService,
               private tasksService : TasksServiceService ) { }

  ngOnInit(): void {
    this.reloadWareHouseUnit();
    this.reloadPakals();
  }

  async saveData() {
    let currentTask = await this.tasksService.getCurrentTask();
    let pakals = {pakals: this.pakalsSelected, taskId: currentTask.id};
    console.log("pakalsSelected", pakals);
    const res: any = await this.requestsService.savePakalsAllocated(pakals);
    console.log("res: ", res);
  }

  addNewRow(){
    let pakalId = this.pakalMatSelect.value;
    let quantity = +this.pakalQuaantity.nativeElement.value;
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
    let index = this.pakals.findIndex(item=>item.pakalId === pakalId );
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

  async reloadPakals(){
    this.pakals = await this.requestsService.getPakals();
  }

  async reloadWareHouseUnit(){
    let currentTask = await this.requestsService.getCurrentTask();
    this.pakalsSelected = await this.requestsService.getWareHouseUnit(currentTask.id);
  }

}
