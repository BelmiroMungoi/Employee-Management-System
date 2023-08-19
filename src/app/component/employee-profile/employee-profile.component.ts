import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeResponsePayload } from 'src/app/model/employee-response.payload';
import { MissionResponsePayload } from 'src/app/model/mission-response.payload';
import { EmployeeService } from 'src/app/service/employee.service';
import { MissionService } from 'src/app/service/mission.service';

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
  missions!: MissionResponsePayload[];
  total!: number;
  page!: any;
  url = "./assets/img/default-profile.png";


  constructor(private employeeService: EmployeeService, private toastr: ToastrService,
    private missionService: MissionService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getEmployeeById();
    this.addMissionToEmployee();
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
      this.getAllMissionByEmployeeId(response.id);
    }, error => {
      this.toastr.error('Ocorreu um erro ao carregar perfil do funcionário!');
      console.error(error.message);
    })
  }

  public getAllMissionByEmployeeId(employeeId: number) {
    this.missionService.getAllMissionByEmployeeId(employeeId, 0).subscribe(response => {
      this.missions = response.content;
      this.total = response.totalElements;
    })
  }

  public loadPage(employeeId: any, page: any) { 
    this.missionService.getAllMissionByEmployeeId(employeeId, page - 1).subscribe(response => {
      this.missions = response.content;
      this.total = response.totalElements;
    })
  }

  public addMissionToEmployee() {
    this.employeeService.addMissionToEmployee(9 ,30 ,0).subscribe(response => {
      this.toastr.success(response.responseMessage);
    }, error => {
      this.toastr.error("Este funcionário já está alocado á um projecto!")
      console.error(error.message);
    })
  }

}
