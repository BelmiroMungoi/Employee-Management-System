import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { RegisterRequestPayload } from '../model/register-request.payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getEnabledUsersQuantity(): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/user/quantity");
  }

  updateUser(request: RegisterRequestPayload): Observable<any> {
    return this.http.put(AppConstants.baseServer + "/user/", request);
  }
}
