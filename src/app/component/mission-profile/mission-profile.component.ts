import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private missionService: MissionService) {}

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
    })
  }

}
