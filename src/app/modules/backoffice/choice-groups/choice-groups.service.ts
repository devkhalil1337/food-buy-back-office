import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class ChoiceGroupsService {

  constructor(private apiService: ApiService) { }


  getListOfSelections() {
    return this.apiService.request("get", `Selections/GetAllSelections`).pipe(map((response: any) => {
      return response.filter(choice => !choice.isDeleted)
    }));
  }


  onAddEditSelection(formData) {
    return this.apiService.request("post", `Selections/AddNewSelections`, formData);
  }

  onUpdateSelection(formData) {
    return this.apiService.request("put", `Selections/UpdateSelections`, formData);
  }

  onDeleteSelections(selections: number[]) {
    return this.apiService.request("post", `Selections/DeleteSelectionsBy`, selections);
  }

  getSelectionById(selectionId: number) {
    return this.apiService.request("get", `Selections/GetSelectionsById?selectionId=${selectionId}`).pipe(map((response: any) => {
      return response && response[0] || [];
    }));
  }

}
