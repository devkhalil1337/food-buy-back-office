import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../shared/config.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {

  filePath:string;
  isTempraryClose:boolean = false;
  constructor(private configService:ConfigService) {
   }

  ngOnInit(): void {
  }


  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

}
