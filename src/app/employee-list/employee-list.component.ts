import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../model/employee';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  searchtable='Employee';

  maxDob: Date;
  // constructor(
  //   private router: Router,
  // ) {
  //   const today = new Date();
  //   this.maxDob = new Date(
  //     today.getFullYear() - 18,
  //     today.getMonth(),
  //     today.getDate()
  //   );
  // }

  maxDate:any;

  constructor( public dataService: DataService, private modalService: NgbModal ,public datepipe: DatePipe) {
    // constructor( public dataService: DataService, private modalService: NgbModal ) {
    this.employees = new Employee();

    const today = new Date();
    this.maxDob = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    this.maxDate =this.datepipe.transform(this.maxDob, 'yyyy-MM-dd');
  }
  selectedEmployee: any;
  employees: any = [];
  genders: any = [];
  departments: any = [];
  Addresses: any = [];

  // constructor(public dataService: DataService) { }
  @ViewChild('dialog_required') dialog_required: ElementRef;
  @ViewChild('dialog_required1') dialog_required1: ElementRef;
  employee: Employee = new Employee();


  modalTitle = "Add Contact"
  NameError = "";
  DepartmentError = "";
  AddressError = "";
CurrentDate:Date;
modifiedDate: Date;




  ngOnInit(): void {


    this.CurrentDate = new Date();


    this.modifiedDate = new Date(this.CurrentDate);
    this.modifiedDate.setFullYear(this.modifiedDate.getFullYear() - 18);

    this.loadData();
    this.BindAddressDropdown();
    this.BindDepartmentDropdown();
    this.BindGender();
    this.FieldClear();
  }

searchEvent(data){
  this.closemodal();
  this.employees = this.employees.filter((obj: any) => {
    return obj.id == data;
  });


  // alert(data);
}


  loadData() {
    this.dataService.getEmployee().subscribe(result => {
      this.employees = result;
    }
    );
  }
  BindGender() {
    this.genders = this.dataService.Genders;

  }
  createClick() {
    this.AddressError = '';
    this.DepartmentError = '';
    this.NameError = '';
    if (this.employee.Name == '' || this.employee.Name == undefined) {
      this.NameError = "Name Required";
      return;
    }
    if (this.employee.AddressID == 0 || this.employee.AddressID == undefined) {
      this.AddressError = "Address Required";
      return;
    }
    if (this.employee.DepartmentID == 0 || this.employee.DepartmentID == undefined) {
      this.DepartmentError = "Department Required";
      return;
    }
    else {
      var val = {
        Name: this.employee.Name,
        Gender: this.employee.Gender,
        DOB: this.employee.DOB,

        Salary: this.employee.Salary,
        Address_id: Number(this.employee.AddressID),
        Department_ID: Number(this.employee.DepartmentID),
        Status: (this.employee.status ? "y" : "N"),
        Operation: "add"
      };

      this.dataService.addEmployee(val).subscribe(result => {
        if (result.result.returnStatus.toString() == 'Employee Added Successfully') {
          this.closemodal();
          alert(result.result.returnStatus.toString());
          this.loadData();
        }
        else
          alert(result.result.returnStatus.toString());
      }
      );
    }
  }
  editClick(obj: any) {
    this.modalTitle = "Edit Employee"
    this.employee.ID = obj.id;
    this.employee.Name = obj.name;
    this.employee.Gender = obj.gender;;
    this.employee.DOB = obj.dob.substring(0, 10);
    this.employee.Salary = obj.salary;
    this.employee.AddressID = Number(obj.address_id),
      this.employee.DepartmentID = Number(obj.department_id),

      this.employee.status =( obj.status=='N')?false : true;


    this.modalService.open(this.dialog_required, { backdrop: false, size: 'lg', keyboard: false, centered: true });
  }
  deleteClick(Employee: any) {
    if (confirm('Are you sure?')) {
      this.dataService.EmployeeDelete(Employee.id).subscribe(result => {
        if (result.result.returnStatus.toString() == 'Deleted Successfully') {
          alert(result.result.returnStatus.toString());
          this.loadData();
        }
        else
          alert(result.result.returnStatus.toString());
      }
      );
    }
    this.loadData();
  }

  addNewSearch() {
    this.modalService.open(this.dialog_required1, { backdrop: false, size: 'lg', keyboard: false, centered: true });

  }
  updateClick() {
    this.NameError = '';
    this.AddressError = '';
    this.DepartmentError = '';
    if (this.employee.Name == '' || this.employee.Name == undefined) {
      this.NameError = "Name Required";
      return;
    }
    if (this.employee.AddressID == 0 || this.employee.AddressID == undefined) {
      this.AddressError = "Address Required";
      return;
    }
    if (this.employee.DepartmentID == 0 || this.employee.DepartmentID == undefined) {
      this.DepartmentError = "Department Required";
      return;
    }


    else {
      var val = {
        ID: this.employee.ID,
        Name: this.employee.Name,
        Gender: this.employee.Gender,
        DOB: this.employee.DOB,

        Salary: this.employee.Salary,
        Address_id: Number(this.employee.AddressID),
        Department_ID: Number(this.employee.DepartmentID),

        Status: (this.employee.status ? "y" : "N"),



        Operation: "update"
      };
      this.dataService.addEmployee(val).subscribe(result => {
        if (result.result.returnStatus.toString() == 'Employee Updated Successfully') {
          this.closemodal();
          alert(result.result.returnStatus.toString());
          this.loadData();

        }
        else
          alert(result.result.returnStatus.toString());
      }
      );
    }
  }

  addNewClick() {
    this.FieldClear();

    this.modalService.open(this.dialog_required, { backdrop: 'static', size: 'lg', keyboard: false, centered: true });
  }
  closemodal() {
    this.modalService.dismissAll();
  }
  BindDepartmentDropdown() {
    this.dataService.getDepartments().subscribe(result => {
      this.departments = result;
    }
    );
  }
  BindAddressDropdown() {
    this.dataService.getAddresses().subscribe(result => {
      this.Addresses = result;
    }
    );
  }
  FieldClear() {
    this.employee.ID = 0;
    this.NameError = "";
    this.DepartmentError = "";
    this.AddressError = "";
    this.employee.Name = "";
    this.employee.Gender = "";
    this.employee.DOB = new Date().toISOString().slice(0, 10);
    this.employee.Salary = 0;
    this.employee.AddressID = 0;
    this.employee.DepartmentID = 0;
    this.employee.status = false;
    this.employee.Operation = "";
    this.CurrentDate = new Date();

  }

}
