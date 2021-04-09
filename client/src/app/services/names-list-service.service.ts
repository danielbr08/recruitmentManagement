import { Injectable } from '@angular/core';
import { NamesList } from '../models/NamesList.model';
import * as XLSX from 'xlsx';
import { Soldier } from 'src/app/models/Soldier.model';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from './requests.service';

const port = 3000;

@Injectable({
  providedIn: 'root'
})
export class NamesListServiceService {

  namesList: NamesList[] = [];
  url: string = `http://localhost:${port}/api/recruitment`;

  constructor(private http: HttpClient,
    public requestsService: RequestsService) { }

  getData(event: any, name: string) {
    let elements: any = {};
    const file = event.target[0].files[0];
    let workBook: any = null;
    let jsonData = null;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = jsonData["גיליון1"];
      dataString.forEach((element: any) => {
        let misgeret = element['נתיב מסגרת מלא']; // check for separate this field
        let squad = misgeret[0].replaceAll("'", "''");
        let department = misgeret[1].replaceAll("'", "''");
        let _class = misgeret[2].replaceAll("'", "''");
        let personalNumber = element['מספר אישי'];
        let firstName = element['שם פרטי'].replaceAll("'", "''");
        let lastName = element['שם משפחה'].replaceAll("'", "''");
        elements[personalNumber] = { squad, department, class: _class, personalNumber, firstName, lastName, role: '', pakal: '' };
      });
      let soldiers: Soldier[] = Object.values(elements);
      const dataObject = { name, soldiers };
      await this.requestsService.addNamesList(dataObject);
      this.refresh();
    }
    reader.readAsBinaryString(file);
  }

  async refresh() {
    this.namesList = await this.requestsService.getNamesLists();
  }

}
