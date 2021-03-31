import { Injectable } from '@angular/core';
import { Task } from '../models/Task.model';
import { TaskStatus } from '../models/TaskStatus.model';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

  constructor(public requestsService: RequestsService) { 
    this.initCurrentTask();
  }

  public tasks: Task[] = [];

  private _currentTask: any | undefined;

  addTask(task: Task){
    let {name, namesListId, currentTask} = task;
    let data = {name, namesListId, currentTask};
    this.requestsService.addTask(data);
  }

  setCurrentTask(task: Task){
    this._currentTask = task;
  }

  async getCurrentTask(){
    if(!this._currentTask){
      await this.initCurrentTask();
    }
    return this._currentTask;
  }

  async initCurrentTask(){
    this._currentTask = (await this.requestsService.getTasks())[0];
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
