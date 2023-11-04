import { Component, OnInit } from '@angular/core';
import { InternalUser } from 'src/app/models/internal-user.model';
import { ConfigService, ToasterService } from '../../shared';
import { ModalService } from '../../shared/modal.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  UserList: Array<InternalUser>
  accountRoles: any;
  User: InternalUser;
  selectizeConfig: any;
  constructor(private userService: UserService, private modalService: ModalService, private configService: ConfigService, private toastService: ToasterService) {
    this.UserList = new Array<InternalUser>();
    this.selectizeConfig = this.configService.getSelectizeConfig(1);
    this.accountRoles = [
      { label: 'Admin', value: 1 },
      { label: 'Manager', value: 2 },
      { label: 'Staff', value: 3 }
    ]
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.userService.getListOfUsers().subscribe(response => {
      this.UserList = response;
    })
  }

  onUserUpdate(close: any) {
    console.log(this.User)
    this.userService.addNewUser(this.User).subscribe(response => {
      console.log(response);
      if (response?.success) {
        this.getUsersList();
      }
    });
    close();
  }

  editUser(content: any, user?: InternalUser) {
    this.User = new InternalUser();
    if (user)
      this.User = { ...user };
    this.modalService.openModal(content);
  }

  OnDeleteUser(user?: InternalUser) {
    this.User = new InternalUser();
    if (user)
      this.User = user;
    this.userService.DeleteUser(this.User).subscribe(response => {
      if (response?.success) {
        this.toastService.success(this.User.fullName + " user deleted successfully");
        this.getUsersList();
      }
    });
  }

  onModalAction(modalVar: any) {
    modalVar();
  }

}
