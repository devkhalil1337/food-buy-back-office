import { Injectable } from '@angular/core';
import { ApiService, ConfigService } from '@shared';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessProfileService {

  constructor(private apiService: ApiService, private configService: ConfigService) { }

  getBusinessProfile() {
    return this.apiService.request("get", `BusinessInfo/GetBusinessUnitById?BusinessId=${this.configService.businessId}`).pipe(map((response: any) => {
      return response && response[0] || {};
    }));
  }

  onUpdateBusinessProfile(businessProfile) {
    return this.apiService.request("post", `BusinessInfo/UpdateBusinessUnit`, businessProfile).pipe(map((response: any) => {
      return response || [];
    }));
  }

}
