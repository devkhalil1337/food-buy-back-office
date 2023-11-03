import { Injectable } from '@angular/core';
import { ApiService } from '../../shared';
import { InternalUser } from 'src/app/models/internal-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }


  getListOfUsers() {
    return this.apiService.request("get", "InternalUsers/GetAllInternalUserByBusinessId");
  }

  addNewUser(user: InternalUser) {
    return this.apiService.request("post", "InternalUsers/AddNewCreate", user);
  }

  DeleteUser(user: InternalUser) {
    return this.apiService.request("delete", `InternalUsers/DeleteInternalUser/${user.id}`);
  }

}
