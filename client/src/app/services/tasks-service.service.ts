import { Injectable } from '@angular/core';
import { Task } from '../models/Task.model';
import { TaskStatus } from '../models/TaskStatus.model';
import { NamesListServiceService } from './names-list-service.service';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

  constructor(public namesListService: NamesListServiceService) { }

  tasks: Task[] = [];

  addTask(task: Task) {
    if(task.isCurrentTask){
      this.changeCurrentTask(task.id);
    }
    this.tasks.push(task);
    let namesList = this.namesListService.getNamesList(task.namesListId);
    if(namesList){
      namesList.taskId = task.id;
    }
    this.tasks = [...this.tasks];
    this.namesListService.refresh();
    console.log(this.tasks, namesList, task);
  }

  generateId() {
    if (this.tasks.length == 0) {
      return 1;
    }
    let ids: number[] = [];
    this.tasks.map(item => ids.push(item.id));
    return Math.max(...ids) + 1;
  }

  getTaskStatusName(taskStatusId: TaskStatus) {
    switch (taskStatusId) {
      case TaskStatus.New:
        return "New"
      case TaskStatus.Edit:
        return "Edit"
      case TaskStatus.Close:
        return "Close"
    }
  }

  changeCurrentTask(taskId: number){
    this.tasks.map(_task=>_task.id !== taskId ? _task.isCurrentTask=false : _task.isCurrentTask=true);
  }
}
