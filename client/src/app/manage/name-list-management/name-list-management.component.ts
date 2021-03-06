import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NamesListServiceService } from 'src/app/services/names-list-service.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-name-list-management',
  templateUrl: './name-list-management.component.html',
  styleUrls: ['./name-list-management.component.css']
})
export class NameListManagementComponent implements OnInit {
  @ViewChild('namesListFile')
  namesListFile!: ElementRef;
  @ViewChild('namesListName')
  namesListName!: ElementRef;

  displayedColumns: string[] = ['id', 'name', 'creationDate', 'count','taskId', ' '];

  constructor(public router: Router,
    public namesListService: NamesListServiceService,
    public requestsService: RequestsService ) { 
  }

  ngOnInit(): void {
    this.namesListService.refresh();
  }

    editNamesList(id: number){
      this.router.navigate([`manage/names-list/${id}`], { queryParams: { } });
    }

    createNamesList(event: any, name: string){
      this.namesListService.getData(event, name);
      this.reset();
    }

    reset(){
      this.namesListName.nativeElement.value = '';
      this.namesListFile.nativeElement.value = '';
    }

}
