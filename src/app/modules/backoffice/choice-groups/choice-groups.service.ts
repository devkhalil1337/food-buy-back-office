import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
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
  
  
  onAddEditSelection(formData){
    return this.apiService.request("post",`Selections/AddNewSelections`,formData);
  }
  
  onUpdateSelection(formData){
    return this.apiService.request("put",`Selections/UpdateSelections`,formData);
  }

  getSelectionById(selectionId:number){
    return this.apiService.request("get",`Selections/GetSelectionsById?selectionId=${selectionId}`).pipe(map((response:any) => {
      return response && response[0] || [];
    }));
  }
  
}
