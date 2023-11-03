import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToasterService } from './toaster.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private toaster: ToasterService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let token = localStorage.getItem("jwt");
    let businessId = localStorage.getItem("businessId");
    let modifiedRequest = request;
    if (token) {
      token = `Bearer ${token}`;
    }
    if (!request.url.includes('CheckUserCredentials')) {
      modifiedRequest = request.clone({
        headers: request.headers
          .set("businessId", businessId)
          .set("Authorization", token)
      });
    }

    return next.handle(modifiedRequest).pipe(
      catchError((error: any) => {
        // Handle HTTP errors here
        if (error instanceof HttpErrorResponse) {
          console.error('HTTP error:', error);
          if (error?.error?.message) {
            this.toaster.error(error?.error?.message)
          }
        }
        return throwError(error); // Re-throw the error to propagate to the global error handler
      })
    );
  }

}
