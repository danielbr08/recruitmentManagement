import { Component, OnInit } from '@angular/core';
import { PakalAllocated } from '../models/pakalAllocated.model';

const PAKALSSQUAD: PakalAllocated[]=  [{"pakalId":1,"quantity":4},{"pakalId":2,"quantity":7}]; // The vale should be taken from server(by service)

@Component({
  selector: 'app-allocate-pakal-squad',
  templateUrl: './allocate-pakal-squad.component.html',
  styleUrls: ['./allocate-pakal-squad.component.css']
})

export class AllocatePakalSquadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
