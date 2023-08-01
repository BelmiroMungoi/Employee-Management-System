import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentRequest } from 'src/app/model/department-request.payload';
import { Department } from 'src/app/model/department.payload';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-deparment',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments!: Department[];
  departmentRequest!: DepartmentRequest;
  departmentForm!: FormGroup;

  constructor(private departmentService: DepartmentService, private toastr: ToastrService) {
    this.departmentRequest = {
      name: '',
      shortName: ''
    };
  }

  ngOnInit(): void {
    this.getAllDepartments();
    this.departmentForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      name: new FormControl('', Validators.required),
      shortName: new FormControl('', Validators.required)
    });
  }

  public createDepartment() {
    if (this.departmentForm.valid) {
      this.departmentService.createDepartment(this.mapToRequest()).subscribe(data => {
        this.toastr.success(data.responseMessage);
        this.getAllDepartments();
        this.cleanForm()
      },
        error => {
          this.toastr.error('Ocorreu um erro ao salvar departamento!')
          console.error(error);
        })
    } else {
      this.toastr.warning('Preencha devidamente o formulário')
    }
  }

  public getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe(response => {
      this.departments = response;
    }, error => {
      this.toastr.error('Ocorreu um erro ao carregar a lista de departamentos!');
      console.error(error.message)
    })
  }

  public cleanForm() {
    this.departmentForm.reset();
  }

  private mapToRequest(): DepartmentRequest {
    this.departmentRequest.name = this.departmentForm.get('name')?.value;
    this.departmentRequest.shortName = this.departmentForm.get('shortName')?.value;
    return this.departmentRequest;
  }

}
