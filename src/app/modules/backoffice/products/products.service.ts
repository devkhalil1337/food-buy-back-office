import { Injectable } from '@angular/core';
import { ApiService, BusinessId } from '@shared';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService:ApiService) { }


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
  
  




}
