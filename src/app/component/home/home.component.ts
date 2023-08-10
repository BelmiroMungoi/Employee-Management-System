import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { MissionService } from 'src/app/service/mission.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee!: number;
  department!: number;
  mission!: number;

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService,
    private missionService: MissionService) { }

  ngOnInit(): void {
    this.getQuantities();
  }

  public getQuantities() {
    this.employeeService.getEmployeeQuantity().subscribe(response => {
      this.employee = response;
    });

    this.departmentService.getDepartmentQuantity().subscribe(response => {
      this.department = response;
    });

    this.missionService.getMissionQuantity().subscribe(response => {
      this.mission = response;
    });
  }
}
