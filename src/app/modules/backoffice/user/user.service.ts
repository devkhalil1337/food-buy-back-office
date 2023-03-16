import { Injectable } from '@angular/core';
import { ApiService } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService:ApiService) { }


  getListOfUsers(){
    return this.apiService.request("get","InternalUsers/GetAllInternalUserByBusinessId");
  }

}
