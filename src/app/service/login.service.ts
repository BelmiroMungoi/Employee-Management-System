import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs'
import { LoginRequestPayload } from '../model/login-request.payload';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  login(userLogin: LoginRequestPayload): Observable<any>{
    return this.http.post(AppConstants.baseLogin, userLogin);         
  } 

  logOut(body: any): Observable<any> {
    return this.http.post(AppConstants.baseServer + "/auth/logout", body);
  }

  refreshToken(body: any): Observable<any> {
    return this.http.get<any>(AppConstants.baseServer + "/auth/refresh-token?token=" + body)
  }

  isAuthenticated() {
    if (localStorage.getItem('access_token') != null && 
    localStorage.getItem('access_token')?.toString().trim() != null) {
      return true;
    } else {
      return false;
    }
  }
}
