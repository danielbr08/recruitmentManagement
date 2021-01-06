import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/dialogs/create-task-dialog/create-task-dialog.component';

import { NamesList } from 'src/app/models/NamesList.model';
import { Task } from 'src/app/models/Task.model';

export interface DialogData {
  namesLists: NamesList[];
}

@Component({
  selector: 'app-tasks-managementent',
  templateUrl: './tasks-managementent.component.html',
  styleUrls: ['./tasks-managementent.component.css']
})
export class TasksManagemententComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'creationDate', 'status','listNameId','isCurrentTask', ' '];

  namesLists: NamesList[]=[
    {id:1, name: "רשימה 1", soldiers: [{personalNumber: 123456, fistName: "דניאל", lastName:"ברוש", squad: "א", department: '2', class:'1', role: 'חפ"ש',pakal:{pakal:"מאג", id: 1, signatureList:[{id:1, item:"מאג", serialNumber: '1234', quantity: 3 }]}}]},
    {id:1, name: "רשימה 2", soldiers: [{personalNumber: 12345, fistName: "נדב", lastName:"ברוש", squad: "ב", department: '1', class:'2', role: 'חפ"ש',pakal:{pakal:"מאג", id: 2, signatureList:[{id:1, item:"2מאג", serialNumber: '123', quantity: 2 }]}}]}
  ]; 

  tasks: Task[]=[];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  id: string | undefined;
  name: string | undefined;

  openDialog(namesLists: NamesList[]): void {
    console.log(namesLists);
    this.namesLists = namesLists;
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '500px',
      data:  this.namesLists
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }

  saveData(){
  }

  removeTask(taskId: number){

  }

}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: '../dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: NamesList[]) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
