import { Injectable } from '@angular/core';
import { ApiService,BusinessId } from '@shared';
import { map } from 'rxjs/operators';
import { BusinessHours, BusinessTimes } from 'src/app/models/business-hours.models';


@Injectable({
  providedIn: 'root'
})
export class BusinessHoursService {

  constructor(private apiService:ApiService) { }

  getBusinessHours(){
    const businessId = BusinessId;
    return this.apiService.request("get",`BusinessHours/GetBusinessHours?BusinessId=${businessId}`).pipe(map((response:BusinessHours[]) => {
      return response && response.map((element:BusinessHours) => {
        return {
          businessDaysId:element.businessDaysId,
          businessId:element.businessId,
          weekDayName:element.weekDayName,
          active:element.active,
          businessTimes:element.businessTimes.map((elm:BusinessTimes) => new BusinessTimes(elm))
        }
      }) || [];
    }));
  }

  onUpdateBusinessHours(businessHours){
    return this.apiService.request("post",`BusinessHours/UpdateBusinessHours`,businessHours);
  }

}
