import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequestPayload } from '../model/register-request.payload';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(userRegister: RegisterRequestPayload): Observable<any> {
    return this.http.post(AppConstants.baseServer + "/auth/register", userRegister);
  }
}
