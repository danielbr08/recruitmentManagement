import { Input, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Soldier } from 'src/app/models/Soldier.model';
import { NamesListServiceService } from 'src/app/services/names-list-service.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-names-list-soldiers-management',
  templateUrl: './names-list-soldiers-management.component.html',
  styleUrls: ['./names-list-soldiers-management.component.css']
})
export class NamesListSoldiersManagementComponent implements OnInit {
  @Input()
  namesListId!: number;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  
  public dataSource = new MatTableDataSource<Soldier>();

  soldiers: Soldier[]  = [];
  displayedColumns: string[] = ['id','personalNumber', 'firstName', 'lastName','squad', 'department', 'class', 'role'];//, 'pakal'];

  constructor(public activatedRoute: ActivatedRoute,
              public  namesListService: NamesListServiceService,
              public requestsService: RequestsService ) {}

  ngOnInit(): void {
    let namesListIdFromUrl = this.activatedRoute.snapshot.params.id; 
    this.namesListId = namesListIdFromUrl || this.namesListId;
    this.refresh();
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

  async refresh() {
    this.soldiers = await this.requestsService.getSoldiersNamesList(this.namesListId);
    console.log("soldiers: ", this.soldiers);
    this.dataSource.data = this.soldiers;

  }

}
