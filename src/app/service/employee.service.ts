import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeRequestPayload } from '../model/employee-request.payload';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { EmployeeResponsePayload } from '../model/employee-response.payload';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  createEmployee(employee: EmployeeRequestPayload): Observable<any> {
    return this.http.post(AppConstants.baseServer + "/employee/", employee);
  }

  getAllEmployee(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/employee/");
  }

  getAllEmployeePerPage(page: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/employee/page/" + page)
  }

  getEmployeeById(id: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/employee/get/" + id)
  }

  updateEmployee(id: any, employee: EmployeeRequestPayload): Observable<any> {
    return this.http.put(AppConstants.baseServer + "/employee/" + id, employee);
  }

  deleteEmployee(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseServer + "/employee/" + id, { responseType: 'text' });
  }

  getEmployeeByFirstname(name: String): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/employee/name/" + name);
  }

  getEmployeeByFirstnamePerPage(name: String, page: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/employee/name/" + name + "/page/" + page);
  }

  getEmployeeQuantity(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/employee/quantity");
  }

  getAllEmployeeByDepartment(department: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/employee/" + department);
  }

  getAllEmployeeByMissionId(missionId: number, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/employee/mission/" + missionId + "/page/" + page);
  }

  getAllEmployeeWithoutThatMission(missionId: number, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/employee/missionId/" + missionId + "/page/" + page);
  }

  getAllPosition(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/employee/position");
  }

  downloadPdfReport() {
    return this.http.get(AppConstants.baseServer + "/employee/report", { responseType: 'text' });
  }

  loadChart(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/employee/chart");
  }

  addMissionToEmployee(missionId: number, employeeId: number, body: any): Observable<any> {
    return this.http.put(AppConstants.baseServer + "/employee/mission/" + missionId + "/employee/" + employeeId, body);
  }
}
