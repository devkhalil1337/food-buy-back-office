import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BusinessHours, BusinessTimes } from 'src/app/models/business-hours.models';
import { ToasterService } from '@shared';
import { BusinessHoursService } from './business-hours.service';

@Component({
  selector: 'app-business-hours',
  templateUrl: './business-hours.component.html',
  styleUrls: ['./business-hours.component.scss']
})
export class BusinessHoursComponent implements OnInit {

  loading:boolean = false;
  businessHours:Array<any>;

  constructor(private _businessHoursService:BusinessHoursService,
    private toasterService:ToasterService) { 
    this.getBusinessHours();
  }

  ngOnInit(): void {
  }



  getBusinessHours(){
    this._businessHoursService.getBusinessHours().subscribe(response => {
      console.log(response)
      this.businessHours = response;
      // if(this.businessHours.every(business => business.businessTimes.length == 0)){
      //   this.businessHours.filter((el,index) => {
      //     el.businessTimes = this._businessHoursService.getTheDetaulfTime(index)
      //     return el;
      //   })
      //   console.log(this.businessHours)
      // }      
    })
  }


  onSubmit(){
    this.loading = true;
    this._businessHoursService.onUpdateBusinessHours(this.businessHours).subscribe(response => {
      if(response && response.message.length > 0)
        this.toasterService.warn(response.message);
      else
        this.toasterService.success("Business Time updated successfully!");
      this.getBusinessHours();
      this.loading = false;
    },(error) => {
      console.log(error);
      this.loading = false;
      this.toasterService.error(error)
    });
  }

  // onDateChange(dateObj:BusinessTimes,type){
  //   if(type === 'startDate'){
  //     dateObj.startDate = moment('2016-10-01' + " " + dateObj.startTime, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm')
  //   }else{
  //     dateObj.endDate = moment('2016-10-01' + " " + dateObj.endTime, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm')
  //   }
  // }

}
