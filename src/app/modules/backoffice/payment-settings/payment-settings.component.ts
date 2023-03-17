import { Component, OnInit } from '@angular/core';
import { PaymentSettings } from 'src/app/models/payment-settings.model';
import { ConfigService } from '../../shared';
import { PaymentSettingService } from './payment-setting.service';
import StatusOptions from "../../../constants/statusOptions"
@Component({
  selector: 'app-payment-settings',
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.scss']
})
export class PaymentSettingsComponent implements OnInit {

  paymentSettings:PaymentSettings[];
  selectedPaymentGateway:PaymentSettings;
  selectizeConfig:any;
  statusOptions:any
  constructor(private paymentSettingService:PaymentSettingService,
    private configService:ConfigService) { 
    this.paymentSettings = new Array<PaymentSettings>();
    this.selectedPaymentGateway = new PaymentSettings();
    this.selectizeConfig = this.configService.getSelectizeConfig(1);
    this.statusOptions = StatusOptions;
    this.getPaymentSettings()
  }

  ngOnInit(): void {
  }

  onSelectPaymentGateway(gateway){
    this.selectedPaymentGateway = new PaymentSettings();
    this.selectedPaymentGateway = gateway;
  }

  getPaymentSettings(){
    this.paymentSettingService.getPaymentSettings().then((response:PaymentSettings[]) => {
      console.log(response);
      this.paymentSettings = response;
      if(response.length > 0)
        this.selectedPaymentGateway = response[0];  
    },error => {
      console.log(error);
    })
   }


   onSavePaymentGatewayConfig(){
    this.selectedPaymentGateway.isActive = Boolean(Number(this.selectedPaymentGateway.isActive))
    if(this.selectedPaymentGateway.id){
      this.paymentSettingService.UpdatePaymentGatewayConfig(this.selectedPaymentGateway).subscribe(response => {
        console.log(response);
      })
    }else{
      this.paymentSettingService.SaveNewPaymentGatewayConfig(this.selectedPaymentGateway).subscribe(response => {
        console.log(response);
      })
    }
   }

   showHide(inputField: HTMLInputElement) {
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }

}
