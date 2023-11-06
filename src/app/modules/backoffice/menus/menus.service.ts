import { Injectable } from '@angular/core';
import { ApiService } from '@shared';
import { map } from 'rxjs/operators';
import { Menus } from 'src/app/models/menus.model';
@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(private apiService: ApiService) { }

  getMenus() {
    return this.apiService.request("get", `Menus/GetMenusByBusinessId`)
  }

  updateBulkMenus(Menus: Menus[]) {
    return this.apiService.request("put", `Menus/UpdateBulkMenus`, Menus).pipe(map((response: any) => {
      return response || [];
    }));
  }
}
