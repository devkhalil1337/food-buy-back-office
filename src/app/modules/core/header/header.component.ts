import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get userDetails(){
    return this.authService.userDetails();
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogOut(){
    this.authService.onLogout();
  }

}
