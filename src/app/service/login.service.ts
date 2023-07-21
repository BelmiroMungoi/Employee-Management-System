import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs'
import { LoginRequestPayload } from '../model/login-request.payload';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(userLogin: LoginRequestPayload): Observable<any>{
    return this.http.post(AppConstants.baseLogin, userLogin, {responseType: 'text'})         
  } 
}
