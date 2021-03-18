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

  currentTask: Task = {id: -1, name: "", creationDate: new Date(), status: TaskStatus.Active, namesListId: -1, currentTask: false, };
  taskStatuses: TaskStatus[] = [TaskStatus.Active, TaskStatus.Edit, TaskStatus.Close]

  ngOnInit(): void {
    this.refresh();
  }

  async refresh(){
    this.currentTask = await this.requestsService.getCurrentTask();
    console.log(this.currentTask );
  }

}
