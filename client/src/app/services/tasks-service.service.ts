import { Injectable } from '@angular/core';
import { Task } from '../models/Task.model';
import { TaskStatus } from '../models/TaskStatus.model';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

  constructor(public requestsService: RequestsService) { }

  public tasks: Task[] = [];

  addTask(task: Task){
    let {name, namesListId, currentTask} = task;
    let data = {name, namesListId, currentTask};
    this.requestsService.addTask(data);
  }

  getTaskStatusName(taskStatusId: TaskStatus) {
    switch (taskStatusId) {
      case TaskStatus.Active:
        return "פעיל"
      case TaskStatus.Edit:
        return "בעריכה"
      case TaskStatus.Close:
        return "סגור"
    }
  }
}
