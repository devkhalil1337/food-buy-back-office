import { Injectable } from '@angular/core';
import { ApiService, BusinessId } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService:ApiService) { }


  getListOfProducts(){
    const businessId = BusinessId;
    return this.apiService.request("get",`Products/GetAllProducts?businessId=${businessId}`);
  }

  addNewProduct(product){
    return this.apiService.request("post",`Products/AddNewProduct`,product);
  }


}
