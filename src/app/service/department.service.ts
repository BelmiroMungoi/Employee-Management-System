import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../model/department.payload';
import { AppConstants } from '../app-constants';
import { DepartmentRequest } from '../model/department-request.payload';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  createDepartment(deparment: DepartmentRequest): Observable<any> {
    return this.http.post(AppConstants.baseServer + "/department/", deparment);
  }

  getAllDepartment(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/department/");
  }

  getAllDepartments(page: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/department/page/" + page);
  }

  getAllDepartmentByName(name: String, page: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/department/" + name + "/page/" + page);
  }

  getDepartmentById(id: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/department/id/" + id);
  }

  updateDepartment(id: any, deparment: DepartmentRequest): Observable<any> {
    return this.http.put(AppConstants.baseServer + "/department/" + id, deparment);
  }

  deleteDepartment(id: any): Observable<any> {
    return this.http.delete(AppConstants.baseServer + "/department/" + id, { responseType: 'text' });
  }
}
