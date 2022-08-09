import { Injectable } from '@angular/core';
import { ApiService, BusinessId } from '@shared';
import { map } from 'rxjs/operators';
import { ChoiceGroupsService } from '../choice-groups/choice-groups.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService:ApiService,private choiceOfGroupService:ChoiceGroupsService) { }



  getListOfSelections(){
   return this.choiceOfGroupService.getListOfSelections().pipe(map((response:any) => {
    return response && response.map(element => {
      return {
        label:element.selectionName,
        value:element.selectionId
      }
    }) || [];
  }));
  }

  getListOfProducts(){
    const businessId = BusinessId;
    return this.apiService.request("get",`Products/GetAllProducts?businessId=${businessId}`);
  }
  
  getProductById(productId){
    return this.apiService.request("get",`Products/GetProductsById?productId=${productId}`).pipe(map((response:any) => {
      return response && response[0] || [];
    }));
  }
  
  addNewProduct(product){
    return this.apiService.request("post",`Products/AddNewProduct`,product);
  }
  
  updateProduct(product){
    return this.apiService.request("put",`Products/UpdateProduct`,product);
  }
  

  updateProductImage(formData){
    return this.apiService.request("post",`Products/Upload`,formData);
  }
  




}
