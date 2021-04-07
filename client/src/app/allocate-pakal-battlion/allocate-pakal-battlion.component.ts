import { Component, OnInit } from '@angular/core';
import { PakalAllocated } from '../models/pakalAllocated.model';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-allocate-pakal-battlion',
  templateUrl: './allocate-pakal-battlion.component.html',
  styleUrls: ['./allocate-pakal-battlion.component.css']
})
export class AllocatePakalBattlionComponent implements OnInit {
  displayedColumns: string[] = ['pakal', 'warehousePakal', 'squad1', 'squad2', 'squad3', 'support', 'headquarters', 'total'];
  pakalAllocated: PakalAllocated[]=  [
{ headquartersAllocated: 0,
  headquartersTotal: 0,
  pakalId: 3,
  pakalName: "פקל 2",
  squad1Allocated: 0,
  squad1Total: 1,
  squad2Allocated: 0,
  squad2Total: 2,
  squad3Allocated: 0,
  squad3Total: 3,
  supportAllocated: 0,
  supportTotal: 0,
  taskId: 3,
  warehouseTotal: 2}
  ]; 
  constructor(private requestsService: RequestsService) { }

  ngOnInit(): void {
    //this.reloadPakalAllocated();
  }

  async reloadPakalAllocated(){
    let currentTask = await this.requestsService.getCurrentTask();
    this.pakalAllocated = await this.requestsService.getPalalAllocated(currentTask.id);
  }


  compareVal(val1: number, val2: number){
    console.log("checkOverLimit: ", val1, val2, val1 > val2);
    return val1 > val2 ? 1 : val1 < val2 ? -1 : 0;
  }
}
