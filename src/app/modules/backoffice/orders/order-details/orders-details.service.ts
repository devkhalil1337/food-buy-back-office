import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/modules/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersDetailsService {

  constructor(private apiService:ApiService,) { }

  getOrderDetails(orderId){
    return this.apiService.request("get",`OrderDetails/GetProductsById?OrderId=${orderId}`);
  }
  
  getOrder(orderId){
    return this.apiService.request("get",`Order/GetOrderById?orderId=${orderId}`);
  }
  getAddressById(addressId){
    return this.apiService.request("get",`AddressBook/GetAddressById/${addressId}`);
  }

}
