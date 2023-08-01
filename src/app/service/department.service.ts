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

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(AppConstants.baseServer + "/department/");
  }

  getAllDepartmentByName(name: String): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/department/" + name);
  }
}
