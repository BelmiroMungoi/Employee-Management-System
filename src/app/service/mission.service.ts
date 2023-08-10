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

  getAllMission(page: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/mission/page/" + page);
  }

  getAllStatus(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/mission/status");
  }

  getMissionById(id: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/mission/get/" + id);
  }

  getAllMissionByName(name: string, page: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/mission/name/" + name + "/page/" + page);
  }

  getMissionQuantity(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/mission/quantity");
  }

  updateMission(mission: MissionRequestPayload, id: any): Observable<any> {
    return this.http.put(AppConstants.baseServer + "/mission/" + id, mission);
  }

  deleteMission(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseServer + "/mission/" + id, {responseType: 'text'});
  }
}
