import { Injectable } from '@angular/core';
import { ApiService } from '@shared';
import { map } from 'rxjs/operators';
import { BusinessHours, BusinessTimes } from 'src/app/models/business-hours.models';


@Injectable({
  providedIn: 'root'
})
export class BusinessHoursService {

  constructor(private apiService: ApiService) { }

  getBusinessHours() {
    return this.apiService.request("get", `BusinessHours/GetBusinessHours`).pipe(map((response: BusinessHours[]) => {
      return response && response.map((element: BusinessHours, index: number) => {
        return {
          businessDaysId: element.businessDaysId,
          businessId: element.businessId,
          weekDayName: element.weekDayName,
          active: element.active,
          businessTimes: element.businessTimes.length > 0 ? element.businessTimes : this.getTheDetaulfTime(index)
        }
      }) || [];
    }));
  }

  onUpdateBusinessHours(businessHours) {
    return this.apiService.request("post", `BusinessHours/UpdateBusinessHours`, businessHours);
  }



  getTheDetaulfTime(day: number) {
    // let weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thuresday','Friday','Saturday']
    return [
      {
        startDate: "08:00",
        endDate: "18:00",
      },
    ]
  }

}
