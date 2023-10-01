import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router, private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('access_token') != null && localStorage.getItem('access_token')?.toString().trim() != null) {
      var token = localStorage.getItem('access_token');
      var tokenRequest = this.addTokenHeader(req, token);

      return next.handle(tokenRequest).pipe(catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse && !req.url.includes('/auth/authenticate') && error.status === 403) {
          this.handle403Error(req, next);
        }

        return throwError(error);
      }));
    } else {
      return next.handle(req).pipe(catchError(this.processError));
    }
  }


  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {

      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      var refreshToken = localStorage.getItem('refresh_token');
      localStorage.removeItem('access_token');

      if (refreshToken) {
        return this.loginService.refreshToken(refreshToken).subscribe((token) => {
            this.isRefreshing = false;
            localStorage.setItem('access_token', token.access_token)

            return next.handle(this.addTokenHeader(request, token.access_token));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            console.log('Houve um erro')
            this.loginService.logOut(null).subscribe(data => { });;
            localStorage.clear();
            this.router.navigate(['login']);

            return throwError(err);
          });
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(req: HttpRequest<any>, token: any) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
      withCredentials: true,
    });
  }

  processError(error: HttpErrorResponse) {
    let errorMessage = 'Erro';
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'Erro: ' + error.error.error;
    } else {
      errorMessage = 'Código: ' + error.error.code + error.error.error;
    }
    return throwError(errorMessage);
  }
}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },],
})

export class HeaderInterceptorModule {

}