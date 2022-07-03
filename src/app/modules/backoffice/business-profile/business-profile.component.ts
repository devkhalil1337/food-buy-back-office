import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigService, FormatterService,ToasterService, BusinessId } from '@shared';
import { BusinessProfileService } from './business-profile.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {

  filePath:string;
  isTempraryClose:boolean = false;

  businessProfileForm:FormGroup;


  constructor(private configService:ConfigService,
    private formatterService:FormatterService,
    private buProfileService:BusinessProfileService,
    private toasterService:ToasterService) {
      this.getBusinessProfile();
   }

  ngOnInit(): void {
    this.businessProfileForm = new FormGroup({
      BusinessId: new FormControl(Number(BusinessId)),
      localization: new FormControl(""),
      businessName: new FormControl(""),
      businessEmail: new FormControl(""),
      businessCity: new FormControl(""),
      businessDetails: new FormControl(""),
      businessContact: new FormControl(""),
      businessPostcode: new FormControl(""),
      businessAddress: new FormControl(""),
      businessCurrency: new FormControl(""),
      businessCountry: new FormControl(""),
      businessLongitude: new FormControl(""),
      businessLatitude: new FormControl(""),
      businessWebsiteUrl: new FormControl(""),
      businessTempClose: new FormControl(""),
      expiryDate: new FormControl(""),
      businessLogo: new FormControl(""),
      closetillDate: new FormControl(""),
      Deleted: new FormControl(false),
      Active: new FormControl(true),
    })
  }


  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }


  getBusinessProfile(){
    this.buProfileService.getBusinessProfile().subscribe(response => {
        console.log(response);
        this.businessProfileForm.patchValue(response); 
    },(error) => {
      console.log(error);
    });
  }

  onSave():void {
    this.buProfileService.onUpdateBusinessProfile(this.businessProfileForm.value).subscribe(response => {
      this.toasterService.success("business info updated");
      this.getBusinessProfile();
    },(error) => {
      console.log(error);
      this.toasterService.error(error)
    });
  }

}
