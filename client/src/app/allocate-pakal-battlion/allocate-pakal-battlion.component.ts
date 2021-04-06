import { Component, OnInit } from '@angular/core';
import { PakalAllocated } from '../models/pakalAllocated.model';

@Component({
  selector: 'app-allocate-pakal-battlion',
  templateUrl: './allocate-pakal-battlion.component.html',
  styleUrls: ['./allocate-pakal-battlion.component.css']
})
export class AllocatePakalBattlionComponent implements OnInit {
  displayedColumns: string[] = ['pakal', 'warehousePakal', 'squad1', 'squad2', 'squad3', 'support', 'headquarters', 'total'];
  pakalAllocated: PakalAllocated[]=  []; 
  constructor() { }

  ngOnInit(): void {
  }

}
