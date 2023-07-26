import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataTable } from 'simple-datatables';
import { EmployeeResponsePayload } from 'src/app/model/employee-response.payload';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
 
  constructor(private employeeService: EmployeeService, private toastr: ToastrService) {}

  employees!: EmployeeResponsePayload[];
  total!: number;

  ngOnInit(): void {
    this.getAllEmployees();
  }

  public getAllEmployees() {
    this.employeeService.getAllEmployee().subscribe(
      (response: EmployeeResponsePayload[]) => {
        this.employees = response;
        console.info(response);
      }, 
      (error: HttpErrorResponse) => {
        this.toastr.error("Aconteceu um erro ao carregar a lista de funcionários!")
        console.info(error.message);
      }
    );
  }

}
