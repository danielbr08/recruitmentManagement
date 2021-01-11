import { Component, OnInit } from '@angular/core';
import { NamesList } from 'src/app/models/NamesList.model';
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
    console.log("event: ",event);
    const file = event.target.files[0];
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
        const dataString = JSON.stringify(jsonData);
        console.log(dataString);

        JSON.parse(dataString).forEach( (element: any) => {
              let misgeret = element['נתיב מסגרת מלא'].split("\\");
              let pluga = misgeret[0];
              let mahlaka = misgeret[1];
              let _class = misgeret[2];
              let personalNumber = element['מספר אישי'];
              let firstName = element['שם פרטי'];
              let lastName = element['שם משפחה'];
              elements[personalNumber] = {pluga,mahlaka,class: _class ,personalNumber, firstName, lastName};
              console.log("elements: ", elements);
      
              // Object.keys(element).forEach(element2 => {
              //     obj.add(element2);
              // });;
          });


    //     let elements: any = {};
    //     console.log(workBook);
    //     XLSX.utils.sheet_to_json(workBook.Workbook.Sheets[0]).forEach( (element: any) => {
    //     let misgeret = element['נתיב מסגרת מלא'].split("\\");
    //     let pluga = misgeret[0];
    //     let mahlaka = misgeret[1];
    //     let _class = misgeret[2];
    //     let personalNumber = element['מספר אישי'];
    //     let firstName = element['שם פרטי'];
    //     let lastName = element['שם משפחה'];
    //     elements[personalNumber] = {pluga,mahlaka,class: _class ,personalNumber, firstName, lastName};
    //     console.log("elements: ", elements);

    //     // Object.keys(element).forEach(element2 => {
    //     //     obj.add(element2);
    //     // });;
    // });
}
      reader.readAsBinaryString(file);
    }
}
