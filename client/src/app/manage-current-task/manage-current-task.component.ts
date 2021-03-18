import { Component, OnInit } from '@angular/core';
import { Task } from '../models/Task.model';
import { TaskStatus } from '../models/TaskStatus.model';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-manage-current-task',
  templateUrl: './manage-current-task.component.html',
  styleUrls: ['./manage-current-task.component.css']
})
export class ManageCurrentTaskComponent implements OnInit {

  constructor(public requestsService : RequestsService) { }

  currentTask: any = {id: -1, name: "", creationDate: new Date(), status: TaskStatus.Active, namesListId: -1, currentTask: false, };
  tasks: any = [];
  taskStatuses: any = [{"key":TaskStatus.Active, "val":"פעיל"} , {"key":TaskStatus.Edit, "val":"עריכה"} , {"key":TaskStatus.Close, "val":"סגור"} ]

  ngOnInit(): void {
    this.refresh();
  }

  async refresh(){
    this.currentTask = await this.requestsService.getCurrentTask();
    this.tasks = await this.requestsService.getTasks()
  }

}
