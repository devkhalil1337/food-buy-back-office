import { Component, OnInit } from '@angular/core';
import { InternalUser } from 'src/app/models/internal-user.model';
import { ConfigService } from '../../shared';
import { ModalService } from '../../shared/modal.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  UserList:Array<InternalUser>
  accountRoles:any;
  User:InternalUser;
  selectizeConfig:any;
  constructor(private userService:UserService,private modalService:ModalService,private configService:ConfigService) {
    this.UserList = new Array<InternalUser>();
    this.selectizeConfig = this.configService.getSelectizeConfig(1);
    this.accountRoles = [
      {label:'Admin',value:0},
      {label:'Manager',value:1},
      {label:'Staff',value:2}
    ]
   }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList(){
    this.userService.getListOfUsers().subscribe(response => {
      this.UserList = response;
    })
  }

  onUserUpdate(close:any){
    console.log(this.User)

    close();
  }

  editUser(content:any,user?:InternalUser){
    this.User = new InternalUser();
    if(user)
      this.User = user;
    this.modalService.openModal(content);
  }
  
  onModalAction(modalVar:any){
    modalVar();
  }

}
