import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../model/department.payload';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(AppConstants.baseServer + "/department/")
  }
}
