import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  onLogout(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("businessId");
    this.router.navigate(["login"]);
  }


  userDetails(){
    return JSON.parse(localStorage.getItem("user"));
  }

}
