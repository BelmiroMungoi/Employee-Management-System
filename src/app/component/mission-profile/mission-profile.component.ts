import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeResponsePayload } from 'src/app/model/employee-response.payload';
import { EmployeeService } from 'src/app/service/employee.service';
import { MissionService } from 'src/app/service/mission.service';

@Component({
  selector: 'app-mission-profile',
  templateUrl: './mission-profile.component.html',
  styleUrls: ['./mission-profile.component.css']
})
export class MissionProfileComponent implements OnInit{

  missionId!: number;
  missionName!: string;
  startedAt!: any;
  finishedAt!: any;
  missionStatus!: string;
  page!: any;
  total!: any;
  employees!: EmployeeResponsePayload[];

  constructor(private activatedRoute: ActivatedRoute, private missionService: MissionService,
    private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getMissionById();
  }

  public getMissionById() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.missionService.getMissionById(id).subscribe(response => {
      this.missionId = response.id;
      this.missionName = response.missionName;
      this.startedAt = response.startedDate;
      this.finishedAt = response.finishedDate;
      this.missionStatus = response.missionStatus.missionStatus;
      this.getAllEmployeeByMission(response.id);
    })
  }

  public getAllEmployeeByMission(missionId: number) {
    this.employeeService.getAllEmployeeByMissionId(missionId, 0).subscribe(response => {
      this.employees = response.content;
      this.total = response.totalElements;
    })
  }

  public loadPage(missionId: any, page: any) {
    this.employeeService.getAllEmployeeByMissionId(missionId, page - 1).subscribe(response => {
      this.employees = response.content;
      this.total = response.totalElements;
    })
  }

}
