import { Injectable } from '@angular/core';
import { ApiService, BusinessId } from '@shared';
import { map } from 'rxjs/operators';
import { BusinessSettings } from 'src/app/models/settings.model';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private apiService:ApiService) { }



  getSettings(){
    const businessId = BusinessId;
    return this.apiService.request("get",`Settings/GetSettingsById`).pipe(map((response:BusinessSettings) => response && response[0] || {}));
  }

  AddNewSettings(settings){
    return this.apiService.request("post",`Settings/AddNewSettings`,settings);
  }
  UpdateNewSettings(settings){
    return this.apiService.request("post",`Settings/UpdateSettings`,settings);
  }
}