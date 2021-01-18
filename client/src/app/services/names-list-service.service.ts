import { Injectable } from '@angular/core';
import { NamesList } from '../models/NamesList.model';
import * as XLSX from 'xlsx';
import { Soldier } from 'src/app/models/Soldier.model';


@Injectable({
  providedIn: 'root'
})
export class NamesListServiceService {

  namesList: NamesList[] = [];
  constructor() { }

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
          let id: number = this.generateNewNamesListId();
          this.namesList.push({id, name, soldiers, taskId:-1, creationDate: new Date()});
          this.refresh()
          console.log("this.namesList: ", this.namesList);
}
      reader.readAsBinaryString(file);
    }

    generateNewNamesListId(){
      if(this.namesList.length == 0)
        return 1;
      let ids: number[] = [];
      this.namesList.map(item=>ids.push(item.id));
      return Math.max(...ids) + 1;
    }

    refresh(){
      this.namesList = [...this.namesList];
    }
}
