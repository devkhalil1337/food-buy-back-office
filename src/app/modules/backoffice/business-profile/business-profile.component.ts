import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../shared/config.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {

  isTempraryClose:boolean = false;
  constructor(private configService:ConfigService) {
   }

  ngOnInit(): void {
  }

}
