import { Injectable } from '@angular/core';
import { ApiService, ConfigService,BusinessId } from '@shared';
import { map } from 'rxjs/operators';
import { Category } from '@models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService:ApiService,private configService:ConfigService) { }


  getListOfCategories(){
    const businessId = BusinessId;
    return this.apiService.request("get",`Categories/GetAllCategories?businessId=${businessId}`).pipe(map((response:any) => {
      return response || [];
    }));
  }

  onCreateCategory(category:Category){
    return this.apiService.request("post",`Categories/AddNewCategory`,category).pipe(map((response:any) => {
      return response || [];
    }));
  }
  
}
