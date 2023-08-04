import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MissionResponsePayload } from 'src/app/model/mission-response.payload';
import { MissionService } from 'src/app/service/mission.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  missionResponse!: MissionResponsePayload[];

  constructor(private missionService: MissionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllMission();
  }

  getAllMission() {
    this.missionService.getAllMission().subscribe(response => {
      this.missionResponse = response;
      console.info(response);
    }, error => {
      this.toastr.error("Ocorreu um erro ao carregar a lista de projectos!");
      console.error(error);
    })
  }


}
