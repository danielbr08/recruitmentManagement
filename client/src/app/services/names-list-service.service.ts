import { Injectable } from '@angular/core';
import { NamesList } from '../models/NamesList.model';
import * as XLSX from 'xlsx';
import { Soldier } from 'src/app/models/Soldier.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const port = 3000;

@Injectable({
  providedIn: 'root'
})
export class NamesListServiceService {

  namesList: NamesList[] = [];
  constructor(private http: HttpClient) { }

  getNamesList(id: number){
    return this.namesList.find(element=>element.id==id);
  }

  // createNamesList(event: any, name: string){

  // }
  getData(event: any, name: string){
    let elements: any = {};
    const file = event.target[0].files[0];
      let workBook: any = null;
      let jsonData = null;
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        const dataString = jsonData["גיליון1"];
        dataString.forEach( (element: any) => {
              let misgeret = element['נתיב מסגרת מלא'].split("\\");
              let squad = misgeret[0];
              let department = misgeret[1];
              let _class = misgeret[2];
              let personalNumber = element['מספר אישי'];
              let firstName = element['שם פרטי'];
              let lastName = element['שם משפחה'];
              elements[personalNumber] = {squad,department,class: _class ,personalNumber, firstName, lastName, role:'', pakal:''};
          });
          let soldiers: Soldier[] = Object.values(elements);
          const headers = { 'content-type': 'application/json'}  
          const body = {name, soldiers, creationDate: new Date()};
          this.http.post(`http://localhost:${port}/api/recruitment/add-nameslist`,body,{headers});
          this.refresh()
}
      reader.readAsBinaryString(file);
    }

    refresh(){
      this.http.get<NamesList[]>(`http://localhost:${port}/api/recruitment/names-lists`).subscribe(data=>{
        this.namesList = data;
      });
    }

}
