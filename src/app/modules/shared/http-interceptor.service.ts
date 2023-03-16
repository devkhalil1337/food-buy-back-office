import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let token = localStorage.getItem("jwt");
    let businessId = localStorage.getItem("businessId");
    let  modifiedRequest = request;
    if (token) {
      token = `Bearer ${token}`;
    }
    if(!request.url.includes('CheckUserCredentials')){
      modifiedRequest = request.clone({
        headers: request.headers
          .set("businessId", businessId)
          .set("Authorization", token)
      });
    }
  
    return next.handle(modifiedRequest);
  }
  
}
