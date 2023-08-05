import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MissionRequestPayload } from '../model/mission-request.payload';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { MissionResponsePayload } from '../model/mission-response.payload';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http: HttpClient) { }

  createMission(mission: MissionRequestPayload): Observable<any> {
    return this.http.post(AppConstants.baseServer + "/mission/", mission);
  }

  getAllMission(): Observable<MissionResponsePayload[]> {
    return this.http.get<MissionResponsePayload[]>(AppConstants.baseServer + "/mission/");
  }

  getAllStatus(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/mission/status");
  }
}
