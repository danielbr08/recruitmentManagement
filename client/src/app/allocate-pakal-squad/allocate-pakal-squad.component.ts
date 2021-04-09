import { Component, OnInit } from '@angular/core';
import { PakalUnitWarehouse } from '../models/PakalUnitWarehouse.model';
import { TasksServiceService } from '../services/tasks-service.service';

const PAKALSSQUAD: PakalUnitWarehouse[]=  [{"pakalId":1,"quantity":4},{"pakalId":2,"quantity":7}]; // The vale should be taken from server(by service)
// const pakalAllocated: PakalAllocated[]=  []; // The vale should be taken from server(by service)

@Component({
  selector: 'app-allocate-pakal-squad',
  templateUrl: './allocate-pakal-squad.component.html',
  styleUrls: ['./allocate-pakal-squad.component.css']
})

export class AllocatePakalSquadComponent implements OnInit {
  namesListId!: number;
  constructor(public tasksService : TasksServiceService ) { 
  }

  ngOnInit(): void {
    this.setNamesListId();
  }

  async setNamesListId(){
    this.namesListId = (await this.tasksService.getCurrentTask()).namesListId;
    console.log("namesListId: ", this.namesListId);
  }

}
