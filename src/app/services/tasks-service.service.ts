import { Injectable } from '@angular/core';
import { Task } from '../models/Task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

  constructor() { }

  tasks: Task[]=[];

  addTask(task: Task){
    this.tasks.push(task);
    this.tasks = [...this.tasks];
  }

  generateId(){
    if(this.tasks.length == 0){
      return 1;
    }
    let ids: number[] = [];
    this.tasks.map(item=>ids.push(item.id));
    return Math.max(...ids) + 1;
  }
}
