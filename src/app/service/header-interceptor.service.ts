import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor{

  constructor(private toastr: ToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('access_token') != null && localStorage.getItem('access_token')?.toString().trim() != null) {
      const token = 'Bearer ' + localStorage.getItem('access_token');
      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', token)
      });

      return next.handle(tokenRequest).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
          console.info("Sucesso na operacão")
        }
      }),
        catchError(this.processError)
      );
    } else {
      return next.handle(req).pipe(catchError(this.processError));
    }
  }

  processError(error: HttpErrorResponse) {
    let errorMessage = 'Erro';

    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'Erro: ' + error.error.error; 
    } else if (error.status == 403) {
      errorMessage = 'Ocorreu um erro interno';
    } else {
      errorMessage = 'Código: ' + error.error.code + error.error.error;
    }
    console.error(errorMessage);
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