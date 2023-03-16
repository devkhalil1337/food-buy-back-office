import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LoginModel } from '@models';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  invalidLogin:boolean = false;

  loginForm:FormGroup;

  constructor(private userService:UserService, private router: Router) { 
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName:new FormControl("",Validators.required),
      password:new FormControl("",Validators.required),
      isRemember: new FormControl(false),
    })
  }


  onLogin(){
    this.userService.onLogin(this.loginForm.value).subscribe(response => {
      if(response.result == 0){
        alert("Login not found")
        return;
      }
      const token = response.token;
      const businessId = response.businessId;
      this.invalidLogin = false; 
      localStorage.setItem("jwt", token);
      localStorage.setItem("businessId",businessId);
      localStorage.setItem("user",JSON.stringify(response));
      this.router.navigate(["/dashboard"]);
    })
  }

}
