import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { RegisterRequestPayload } from '../model/register-request.payload';
import { ChangePasswordRequest } from '../model/changePassword-request.payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getEnabledUsersQuantity(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/user/quantity");
  }

  getUserById(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/user/get");
  }

  updateUser(request: RegisterRequestPayload): Observable<any> {
    return this.http.put(AppConstants.baseServer + "/user/", request);
  }

  changePassword(request: ChangePasswordRequest): Observable<any> {
    return this.http.put(AppConstants.baseServer + "/user/changePassword", request);
  }
}
