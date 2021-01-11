import { Component, OnInit } from '@angular/core';
import { NamesList } from 'src/app/models/NamesList.model';

@Component({
  selector: 'app-name-list-management',
  templateUrl: './name-list-management.component.html',
  styleUrls: ['./name-list-management.component.css']
})
export class NameListManagementComponent implements OnInit {
  namesList: NamesList[] = [];
  displayedColumns: string[] = ['id', 'creationDate', 'count','taskId'];
  ;

  constructor() { }

  ngOnInit(): void {
  }


  getData(f: any){
    console.log(f);
  }
}
