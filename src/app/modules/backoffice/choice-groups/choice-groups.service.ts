import { Injectable } from '@angular/core';
import { ApiService, BusinessId } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class ChoiceGroupsService {

  constructor(private apiService:ApiService) { }


  getListOfSelections(){
    const businessId = BusinessId;
    return this.apiService.request("get",`Selections/GetAllSelections?businessId=${businessId}`);
  }
  
}
