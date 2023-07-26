import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/model/department.payload';
import { EmployeeRequestPayload } from 'src/app/model/employee-request.payload';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employeeForm!: FormGroup;
  employeeRequest!: EmployeeRequestPayload;
  departments!: Department[];

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService, private toastr: ToastrService) {
    this.employeeRequest = {
      firstname: '',
      lastname: '',
      email: '',
      birthdate: '',
      department: '',
      street: '',
      houseNumber: '',
      zipCode: ''
    };
  }

  public createEmployee() {
    if (this.employeeForm.valid) {
      this.employeeRequest.firstname = this.employeeForm.get('firstname')?.value;
      this.employeeRequest.lastname = this.employeeForm.get('lastname')?.value;
      this.employeeRequest.email = this.employeeForm.get('email')?.value;
      this.employeeRequest.birthdate = this.employeeForm.get('birthdate')?.value;
      this.employeeRequest.department = this.employeeForm.get('department')?.value;
      this.employeeRequest.street = this.employeeForm.get('street')?.value;
      this.employeeRequest.houseNumber = this.employeeForm.get('houseNumber')?.value;
      this.employeeRequest.zipCode = this.employeeForm.get('zipCode')?.value;

      this.employeeService.createEmployee(this.employeeRequest).subscribe(data => {
        this.toastr.success(data.responseMessage);
        this.cleanForm();
      },
        error => {
          this.toastr.error('Ocorreu um erro ao salvar funcionário, Tente Novamente!');
          console.error(error);
        }
      )
    } else {
      this.toastr.error('Preencha devidamente o formulário!')
    }
  }

  public getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe((response) => {
      this.departments = response;
    }, error => {
      this.toastr.error('Ocorreu um erro ao interno ao carregar a lista de departamento!');
      console.error(error);
    })
  }

  public cleanForm() {
    this.employeeForm.reset();
  }

  ngOnInit(): void {
    this.getAllDepartments();
    this.employeeForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthdate: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      houseNumber: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required)
    })
  }
}
