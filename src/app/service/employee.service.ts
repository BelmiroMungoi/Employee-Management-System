import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeRequestPayload } from '../model/employee-request.payload';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { EmployeeResponsePayload } from '../model/employee-response.payload';
import { SearchRequest } from '../model/search-request.payload';

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
}
