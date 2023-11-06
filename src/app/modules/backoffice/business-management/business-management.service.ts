import { Injectable } from '@angular/core';
import { ApiService } from '../../shared';
import { Business } from 'src/app/models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessManagementService {

  constructor(private apiService: ApiService) { }

  getAllBusinesses() {
    return this.apiService.request("get", "BusinessInfo/GetAllBusinesses")
  }

  AddBusinesses(business: Business) {
    return this.apiService.request("post", "BusinessInfo/AddNewBusinessUnit", business)
  }

}
