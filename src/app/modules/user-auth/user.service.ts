import { Injectable } from '@angular/core';
import { ApiService } from '@shared';
import { LoginModel } from '@models';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService:ApiService) { }

  onLogin(formData:LoginModel){
    return this.apiService.request("post",`Login`,{Email:formData.email,Password:formData.password});
  }
}
