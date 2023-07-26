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

  getAllEmployee(): Observable<EmployeeResponsePayload[]> {
    return this.http.get<EmployeeResponsePayload[]>(AppConstants.baseServer + "/employee/");
  }
}
