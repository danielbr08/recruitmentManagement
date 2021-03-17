import { Component, OnInit } from '@angular/core';
import { Task } from '../models/Task.model';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-manage-current-task',
  templateUrl: './manage-current-task.component.html',
  styleUrls: ['./manage-current-task.component.css']
})
export class ManageCurrentTaskComponent implements OnInit {

  constructor(public requestsService : RequestsService) { }

  currentTask: Task | undefined;

  ngOnInit(): void {
    this.refresh();
  }

  async refresh(){
    this.currentTask = await this.requestsService.getCurrentTask();
  }

}
