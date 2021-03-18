import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/dialogs/create-task-dialog/create-task-dialog.component';

import { NamesList } from 'src/app/models/NamesList.model';
import { Task } from 'src/app/models/Task.model';
import { TaskStatus } from 'src/app/models/TaskStatus.model';
import { RequestsService } from 'src/app/services/requests.service';
import { TasksServiceService } from 'src/app/services/tasks-service.service';

export interface DialogData {
  namesLists: NamesList[];
}

@Component({
  selector: 'app-tasks-managementent',
  templateUrl: './tasks-managementent.component.html',
  styleUrls: ['./tasks-managementent.component.css']
})
export class TasksManagemententComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'creationDate', 'status','namesListId','currentTask', ' '];
  taskStatuses: TaskStatus[] = [TaskStatus.Active, TaskStatus.Edit, TaskStatus.Close];

  namesLists: NamesList[]=[]; 
  tasks: Task[] = [];

  constructor(public dialog: MatDialog,
              public requestsService: RequestsService,
              public taskService: TasksServiceService) {}

  ngOnInit(): void {
    this.refresh();
    this.reloadNamesLists();
  }

  openDialog(namesLists: NamesList[]): void {
    console.log(namesLists);
    this.namesLists = namesLists;
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '500px',
      data:  this.namesLists
    });

    dialogRef.afterClosed().subscribe(async () => {
      this.refresh();
    });
  }

  saveData(){
  }

  removeTask(taskId: number){

  }

  async refresh(){
    this.tasks = await this.requestsService.getTasks();
  }

  async reloadNamesLists(){
    this.namesLists = await this.requestsService.getNamesLists();
  }

  changeCurrentTask(taskId: number){
    this.tasks.map(_task=>_task.id !== taskId ? _task.currentTask=false : _task.currentTask=true);
  }

}
