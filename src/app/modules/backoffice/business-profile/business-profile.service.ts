import { Injectable } from '@angular/core';
import { ApiService,BusinessId } from '@shared';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessProfileService {

  constructor(private apiService:ApiService) { }

  getBusinessProfile(){
    const businessId = BusinessId;
    return this.apiService.request("get",`BusinessInfo/GetBusinessUnitById?BusinessId=${businessId}`).pipe(map((response:any) => {
      return response && response[0] || {};
    }));
  }

  onUpdateBusinessProfile(businessProfile){
    return this.apiService.request("put",`BusinessInfo/UpdateBusinessUnit`,businessProfile).pipe(map((response:any) => {
      return response || [];
    }));
  }

}
