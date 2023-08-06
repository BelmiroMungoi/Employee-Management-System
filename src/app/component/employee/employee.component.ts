import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { DataTable } from 'simple-datatables';
import { EmployeeResponsePayload } from 'src/app/model/employee-response.payload';
import { SearchRequest } from 'src/app/model/search-request.payload';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees!: EmployeeResponsePayload[];
  searchForm!: FormGroup;
  searchRequest!: SearchRequest;
  name!: string;
  total!: number;

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.searchForm = new FormGroup({
      firstname: new FormControl('')
    })
  }

  public getAllEmployees() {
    this.employeeService.getAllEmployee().subscribe(
      (response: EmployeeResponsePayload[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error("Ocorreu um erro ao carregar a lista de funcionários!")
        console.info(error.message);
      }
    );
  }

  public searchEmployeeByFirstname() {
    this.name = this.searchForm.get('firstname')?.value;
    if (this.name == null || this.name == '') {
      this.getAllEmployees();

    } else {
      this.employeeService.getEmployeeByFirstname(this.name).subscribe(response => {
        this.employees = response;
        console.info(response);
      }, error => {
        this.toastr.error("Ocorreu um erro ao pesquisar funcionário!");
        console.error(error.message);
      })
    }
  }

  public deleteEmployee(id: Number, index: any) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      this.employees.splice(index, 1);
      this.toastr.success(data);
    })
  }

}
