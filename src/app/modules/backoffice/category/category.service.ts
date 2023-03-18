import { Injectable } from '@angular/core';
import { ApiService, ConfigService,BusinessId } from '@shared';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService:ApiService,private configService:ConfigService) { }


  getCategoriesSelectize(){
    const businessId = BusinessId;
    return this.apiService.request("get",`Categories/GetAllCategories`).pipe(map((response:any) => {
      return response && response.map(element => {
        return {
          id:element.categoryId,
          label:element.categoryName,
          value:element.categoryId
        }
      }) || [];
    }));
  }

  getListOfCategories(){
    const businessId = BusinessId;
    return this.apiService.request("get",`Categories/GetAllCategories`).pipe(map((response:any) => {
      return response || [];
    }));
  }
  
  getCategoryById(categoryId){
    return this.apiService.request("get",`Categories/GetCategoryById?categoryId=${categoryId}`).pipe(map((response:any) => {
      return response && response[0] || [];
    }));
  }


  onCreateCategory(category:Category){
    return this.apiService.request("post",`Categories/AddNewCategory`,category).pipe(map((response:any) => {
      return response || [];
    }));
  }

  onUpdateCategory(category:Category){
    return this.apiService.request("put",`Categories/UpdateCategory`,category).pipe(map((response:any) => {
      return response || [];
    }));
  }


  
}
