import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { InternalUser } from 'src/app/models/internal-user.model';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  User: InternalUser;
  UserList: Array<InternalUser>


  get userDetails(): InternalUser {
    return this.authService.userDetails();
  }

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.User = this.authService.userDetails()
    console.log(this.User)
  }

  getUsersList() {
    this.userService.getListOfUsers().subscribe(response => {
      this.UserList = response;
    })
  }

}
