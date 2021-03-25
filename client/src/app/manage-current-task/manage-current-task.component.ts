import { Component, OnInit } from '@angular/core';
import { TaskStatus } from '../models/TaskStatus.model';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-manage-current-task',
  templateUrl: './manage-current-task.component.html',
  styleUrls: ['./manage-current-task.component.css']
})
export class ManageCurrentTaskComponent implements OnInit {

  constructor(public requestsService : RequestsService) { }

  currentTask: any = {id: -1, name: "", creationDate: new Date(), status: TaskStatus.Active, namesListId: -1, currentTask: false};
  tasks: any = [];
  taskStatuses: any = [{"key":TaskStatus.Active, "val":"פעיל"} , {"key":TaskStatus.Edit, "val":"עריכה"} , {"key":TaskStatus.Close, "val":"סגור"} ]

  ngOnInit(): void {
    this.refresh();
  }

  async refresh(){
    this.tasks = await this.requestsService.getTasks();
    this.currentTask = {...this.tasks[0]};
    console.log("currentTask: ", this.currentTask);
  }

  async saveData(){
    await this.requestsService.updateTask(this.currentTask);
  }

  changeCurrentTask(taskId: number){
    this.currentTask = this.tasks.filter((item: any)=>item.id === taskId)[0];
    console.log("taskId: ", taskId, "tasks: ", this.tasks);
  }

  toggleCurrentTask(){
    this.currentTask.currentTask = !this.currentTask.currentTask;
  }

}
