import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MissionRequestPayload } from 'src/app/model/mission-request.payload';
import { MissionResponsePayload } from 'src/app/model/mission-response.payload';
import { StatusResponsePayload } from 'src/app/model/status-response.payload';
import { MissionService } from 'src/app/service/mission.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {

  missionResponse!: MissionResponsePayload[];
  missionRequest!: MissionRequestPayload;
  missionStatus!: StatusResponsePayload[];
  missionForm!: FormGroup;

  constructor(private missionService: MissionService, private toastr: ToastrService) {
    this.missionRequest = {
      missionName: '',
      finishedDate: new Date,
      missionStatus: ''
    }
  }

  ngOnInit(): void {
    this.getAllMission();
    this.getAllStatus();
    this.missionForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      missionName: new FormControl('', Validators.required),
      finishedDate: new FormControl('', Validators.required),
      missionStatus: new FormControl('', Validators.required)
    })
  }

  public createMission() {
    if (this.missionForm.valid) {
      this.missionService.createMission(this.mapToRequest()).subscribe(response => {
        this.toastr.success(response.responseMessage);
        this.getAllMission();
        this.cleanForm();
      }, error => {
        this.toastr.error('Ocorreu um erro ao criar um novo projecto!')
        console.error(error);
      })
    } else {
      this.toastr.warning('Preencha devidamente o formulário')
    }
  }

  public getAllMission() {
    this.missionService.getAllMission().subscribe(response => {
      this.missionResponse = response;
    }, error => {
      this.toastr.error("Ocorreu um erro ao carregar a lista de projectos!");
      console.error(error);
    })
  }

  public getAllStatus() {
    this.missionService.getAllStatus().subscribe(response => {
      this.missionStatus = response;
    }, error => {
      this.toastr.error("Ocorreu um erro ao carregar a lista de status");
      console.error(error);
    })
  }

  private cleanForm() {
    this.missionForm.reset();
  }

  private mapToRequest(): MissionRequestPayload {
    this.missionRequest.missionName = this.missionForm.get('missionName')?.value;
    this.missionRequest.finishedDate = this.missionForm.get('finishedDate')?.value;
    this.missionRequest.missionStatus = this.missionForm.get('missionStatus')?.value;
    return this.missionRequest;
  }
}
