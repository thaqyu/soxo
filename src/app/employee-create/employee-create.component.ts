import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  employee : {id: any, name: any, description: any, email: any} = {id: null, name: "", description: "", email: ""};

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  Search(){
    console.log(this.employee);
    this.dataService.createEmployee(this.employee);
    this.employee = {id: null, name: "", description: "", email: ""};

  }
}
