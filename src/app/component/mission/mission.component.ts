import { formatDate } from '@angular/common';
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
  searchForm!: FormGroup;
  missionId!: Number;
  total!: number;
  page!: number;
  name!: string;
  display: string = 'none';
  mission!: string;
  id!: Number;

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
    this.searchForm = new FormGroup({
      missionName: new FormControl('')
    })
  }

  public createMission() {
    this.missionId = this.missionForm.controls['id'].value;
    if (this.missionForm.valid) {
      if (this.missionId != null && this.missionId.toString().length != 0) {
        this.missionService.updateMission(this.mapToRequest(), this.missionId).subscribe(response => {
          this.toastr.success(response.responseMessage);
          this.getAllMission();
          this.cleanForm();
        }, error => {
          this.toastr.error('Ocorreu um erro ao actualizar missão');
          console.error(error);
        })
      } else {
        this.missionService.createMission(this.mapToRequest()).subscribe(response => {
          this.toastr.success(response.responseMessage);
          this.getAllMission();
          this.cleanForm();
        }, error => {
          this.toastr.error('Ocorreu um erro ao criar um novo projecto!')
          console.error(error);
        })
      }
    } else {
      this.toastr.warning('Preencha devidamente o formulário')
    }
  }

  public getAllMission() {
    this.missionService.getAllMission(0).subscribe(response => {
      this.missionResponse = response.content;
      this.total = response.totalElements;
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

  public searchAllMissionByName() {
    this.name = this.searchForm.get('missionName')?.value;
    if (this.name == null || this.name == '') {
      this.getAllMission();
    } else {
      this.missionService.getAllMissionByName(this.name, 0).subscribe(response => {
        this.missionResponse = response.content;
        this.total = response.totalElements;
      }, error => {
        this.toastr.error("Ocorreu um erro ao pesquisar projectos!");
        console.error(error);
      })
    }
  }

  public deleteMission(id: any) {
    this.missionId = id;
    if (this.missionId != null && this.missionId.toString().length != 0) {
      this.missionService.deleteMission(this.missionId).subscribe(response => {
        this.getAllMission();
        this.onCloseDeleteModal();
        this.toastr.success(response);
      }, error => {
        this.onCloseDeleteModal();
        this.toastr.error('ATENCÃO, você não pode eliminar esse projecto! Mude o seu status');
        console.error(error);
      })
    }
  }

  public cleanForm() {
    this.missionForm.reset();
  }

  public loadPage(page: any) {
    this.name = this.searchForm.get('missionName')?.value;
    if (this.name == null || this.name == '') {
      this.missionService.getAllMission(page - 1).subscribe(response => {
        this.missionResponse = response.content;
        this.total = response.totalElements;
      })
    } else {
      this.missionService.getAllMissionByName(this.name, page - 1).subscribe(response => {
        this.missionResponse = response.content;
        this.total = response.totalElements;
      })
    }
  }

  public fillForm(id: any) {
    if (id !== null) {
      this.missionService.getMissionById(id).subscribe(response => {
        this.missionForm = new FormGroup({
          id: new FormControl({ value: response.id, disabled: true }),
          missionName: new FormControl(response.missionName, Validators.required),
          finishedDate: new FormControl(formatDate(new Date(response.finishedAt),'yyyy-MM-dd', 'en-US'), Validators.required),
          missionStatus: new FormControl(response.missionStatus.missionStatus, Validators.required)
        })
      }, error => {
        console.error(error);
      })
    }
  }

  public onOpenDeleteModal(name: string, id: Number) {
    this.display='block';
    this.id = id;
    this.mission = name;
  }

  public onCloseDeleteModal() {
    this.display='none';
  }

  private mapToRequest(): MissionRequestPayload {
    this.missionRequest.missionName = this.missionForm.get('missionName')?.value;
    this.missionRequest.finishedDate = this.missionForm.get('finishedDate')?.value;
    this.missionRequest.missionStatus = this.missionForm.get('missionStatus')?.value;
    return this.missionRequest;
  }
}
