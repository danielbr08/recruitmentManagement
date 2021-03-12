import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pakal } from '../models/Pakal.model';

const port = 3000;

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  url: string = `http://localhost:${port}/api/recruitment`;

  constructor(private http: HttpClient) { }

  getPakalsFull(){
    return this.http.get<Pakal[]>(`${this.url}/pakals-full`).toPromise();
  }

  getPakals(){
    return this.http.get<Pakal[]>(`${this.url}/pakals`).toPromise();
  }

  savePakals(data: any){
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(data);
    return this.http.post(`${this.url}/save-pakals`,body,{headers}).toPromise();
  }

  async getMaxPakalId(){
    return +(await this.http.get<any>(`${this.url}/max-pakal-id`).toPromise()).maxId;

  }

  async getMaxSignatureItemId(){
    return +(await this.http.get<any>(`${this.url}/max-signature-item-id`).toPromise()).maxId;
  }

  async getSoldiersNamesList(namesListId: number){
    return await this.http.get<any>(`${this.url}/soldiers-names-list?namesListId=${namesListId}`).toPromise();
  }
}
