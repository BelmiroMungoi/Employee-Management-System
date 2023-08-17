import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeResponsePayload } from 'src/app/model/employee-response.payload';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit{

  id!: Number;
  employeeIdentifier!: string;
  firstname!: string;
  lastname!: string;
  email!: string;
  birthdate!: Date;
  salary!: any;
  department!: string;
  position!: string;
  street!: string;
  houseNumber!: string;
  zipCode!: string;
  url = "./assets/img/default-profile.png";


  constructor(private employeeService: EmployeeService, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getEmployeeById();
  }

  public getEmployeeById() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.employeeService.getEmployeeById(id).subscribe(response => {
      this.id = response.id;
      this.employeeIdentifier = response.employeeIdentifier;
      this.firstname = response.firstname;
      this.lastname = response.lastname;
      this.email = response.email;
      this.birthdate = response.birthdate;
      this.salary = response.salary;
      this.position = response.positionResponse.positionName;
      this.department = response.department.name;
      this.street = response.address.street;
      this.houseNumber = response.address.houseNumber;
      this.zipCode = response.address.zipCode;
    }, error => {
      this.toastr.error('Ocorreu um erro ao carregar perfil do funcionário!');
      console.error(error.message);
    })
  }

}
