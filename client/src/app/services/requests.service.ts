import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pakal } from '../models/Pakal.model';

const port = 3000;

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  getPakals(){
    return this.http.get<Pakal[]>(`http://localhost:${port}/api/recruitment/pakals`).toPromise();
  }

  savePakals(data: any){
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(data);
    return this.http.post(`http://localhost:${port}/api/recruitment/save-pakals`,body,{headers}).toPromise();
  }
}
