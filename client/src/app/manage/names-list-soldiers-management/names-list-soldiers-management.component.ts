import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NamesList } from 'src/app/models/NamesList.model';
import { Soldier } from 'src/app/models/Soldier.model';
import { NamesListServiceService } from 'src/app/services/names-list-service.service';

@Component({
  selector: 'app-names-list-soldiers-management',
  templateUrl: './names-list-soldiers-management.component.html',
  styleUrls: ['./names-list-soldiers-management.component.css']
})
export class NamesListSoldiersManagementComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  
  nameListId: number = -1;
  public dataSource = new MatTableDataSource<Soldier>();

  soldiers: Soldier[]  = [];
  namesList: NamesList | undefined;
  displayedColumns: string[] = ['id','personalNumber',  'firstName', 'lastName','squad', 'department', 'class', 'role', 'pakal'];

  constructor(public activatedRoute: ActivatedRoute,
              public  namesListService: NamesListServiceService) { }

  ngOnInit(): void {
    this.nameListId = this.activatedRoute.snapshot.params.id;
    if(this.nameListId && this.nameListId>0)
      this.namesList = this.namesListService.getNamesList(this.nameListId);
    this.soldiers = this.namesList ? this.namesList.soldiers : [];
    // this.dataSource.data = this.soldiers;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.soldiers;
  }

  doFilter(event: any){
    let value = event.target.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}