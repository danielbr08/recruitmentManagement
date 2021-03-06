import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/Task.model';
import { TaskStatus } from 'src/app/models/TaskStatus.model';
import { RequestsService } from 'src/app/services/requests.service';
import { TasksServiceService } from 'src/app/services/tasks-service.service';
import { NamesList } from '../../models/NamesList.model';


@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NamesList[], 
    private service: TasksServiceService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  async createNewTask(name: string, namesListId: number, currentTask: boolean) {
    let task: any = { name, namesListId, currentTask };
    await this.service.addTask(task);
    this.dialogRef.close();
  }

}
