import { Injectable } from '@angular/core';
import { ApiService } from '@shared';
import { LoginModel } from '@models';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService:ApiService) { }

  onLogin(userCredentials:any){
    return this.apiService.request("post",`InternalUsers/CheckUserCredentials`,userCredentials);
  }


 
}
