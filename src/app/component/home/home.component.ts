import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { MissionService } from 'src/app/service/mission.service';
import { UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee!: number;
  department!: number;
  mission!: number;
  user!: number;

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService,
    private missionService: MissionService, private userService: UserService) { }

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

    this.userService.getEnabledUsersQuantity().subscribe(response => {
      this.user = response;
    });
  }
}
