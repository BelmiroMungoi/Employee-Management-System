import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs'
import { LoginRequestPayload } from '../model/login-request.payload';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(userLogin: LoginRequestPayload): Observable<any>{
    return this.http.post(AppConstants.baseLogin, userLogin);         
  } 
}
