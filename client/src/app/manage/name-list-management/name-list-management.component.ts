import { Component, OnInit } from '@angular/core';
import { NamesList } from 'src/app/models/NamesList.model';
import { Soldier } from 'src/app/models/Soldier.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-name-list-management',
  templateUrl: './name-list-management.component.html',
  styleUrls: ['./name-list-management.component.css']
})
export class NameListManagementComponent implements OnInit {
  namesList: NamesList[] = [];
  displayedColumns: string[] = ['id', 'creationDate', 'count','taskId'];

  constructor() { }

  ngOnInit(): void {
  }

  getData(event: any){
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
          this.namesList.push({id, name:'', soldiers, taskId:-1, creationDate: new Date()});
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
