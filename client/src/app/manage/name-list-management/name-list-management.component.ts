import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NamesListServiceService } from 'src/app/services/names-list-service.service';

@Component({
  selector: 'app-name-list-management',
  templateUrl: './name-list-management.component.html',
  styleUrls: ['./name-list-management.component.css']
})
export class NameListManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'creationDate', 'count','taskId', ' '];

  constructor(public router: Router,
    public namesListService: NamesListServiceService) { 
  }

  ngOnInit(): void {
  }

    editNamesList(id: number){
      console.log(this.namesListService.getNamesList(id));
      this.router.navigate([`manage/nameslist/${id}`], { queryParams: { } });

    }

}
