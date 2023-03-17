import { Injectable } from '@angular/core';
import { PaymentSettings } from 'src/app/models/payment-settings.model';
import { ApiService } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class PaymentSettingService {

  constructor(private apiService:ApiService) { }

  getPaymentSettings(){
    return this.apiService.request("get","PaymentGateways/GetPaymentGatewaysByBusinessId").toPromise()
  }

  SaveNewPaymentGatewayConfig(paymentConfig:PaymentSettings){
    return this.apiService.request("post","PaymentGateways/InsertPaymentGateway",paymentConfig)
  }

  UpdatePaymentGatewayConfig(paymentConfig:PaymentSettings){
    return this.apiService.request("put","PaymentGateways/UpdatePaymentGateway",paymentConfig)
  }

}
