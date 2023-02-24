import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private apiService:ApiService,) { }

  getAllOrders(){
    return this.apiService.request("get",`Order/GetAllProducts?businessId=${environment.BusinessId}`);
  }

  updateOrderStatus(orderNumber,orderStatus){
    return this.apiService.request("put",`Order/updateOrderStatus?orderNumber=${orderNumber}&orderStatus=${orderStatus}`);
  }

  

}
