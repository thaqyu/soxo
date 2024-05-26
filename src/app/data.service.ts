



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './model/employee';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  basePath:string='https://localhost:44366/';
  // basePath:string='https://localhost:44341/';

  Genders = [
    {id: 1, name: "Male"},
    {id: 2, name: "Fe-Male"},
    {id: 3, name: "Others"}
  ];
  Types = [
    {id: 1, name: "Employee"},
    {id: 2, name: "Address"},
    {id: 3, name: "Department"}
  ];
  // constructor() { }
  constructor(private httpClient:HttpClient) { }

  public addEmployee(data:any) :Observable<any>
  {
    return this.httpClient.post(this.basePath+'Employee/addEmployee',data);
  }
  public createEmployee(data:any) :Observable<any>
  {
    return this.httpClient.post(this.basePath+'Employee/addEmployee',data);
  }
  public getEmployee() :Observable<any>
  {
    return this.httpClient.get(this.basePath+'Employee/GetEmployee');

  }
  public EmployeeDelete(id:any) :Observable<any>
  {
    return this.httpClient.delete(this.basePath+'Employee/DeleteEmployee/'+id);
  }
  public getDepartments() :Observable<any>
  {
    return this.httpClient.get(this.basePath+'Department/GetDepartment');

  }
  public getAddresses() :Observable<any>
  {
    return this.httpClient.get(this.basePath+'Address/GetAddress');

  }

  public GetSearchbyType(table:any,column:any,value:any) :Observable<any>
  {
    return this.httpClient.get(this.basePath+'Search/GetSearchbyType/'+table+'/'+column+'/'+value);

  }

}