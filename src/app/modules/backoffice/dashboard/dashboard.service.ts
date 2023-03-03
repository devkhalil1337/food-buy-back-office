import { Injectable } from '@angular/core';
import { ApiService } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService:ApiService) { }

  getOpenOrders(){
    return this.apiService.request("get",`ReportingDashboard/GetNumberOfOrders?orderStatus=open&Datefrom=2023-01-01&Dateto=2023-03-01`);
  }

  getInProcessOrdersType(){
    return this.apiService.request("get",`ReportingDashboard/GetNumberOfOrders?orderStatus=in process&Datefrom=2023-01-01&Dateto=2023-03-01`);
  }
  
  getCompleteOrders(){
    return this.apiService.request("get",`ReportingDashboard/GetNumberOfOrders?orderStatus=completed&Datefrom=2023-01-01&Dateto=2023-03-01`);
  }
  
  getCancelledOrders(){
    return this.apiService.request("get",`ReportingDashboard/GetNumberOfOrders?orderStatus=cancelled&Datefrom=2023-01-01&Dateto=2023-03-01`);
  }

  getNetSalesForGraph(){
    return this.apiService.request("get",`ReportingDashboard/GetGrossSalesByDay?Datefrom=2023-01-01&Dateto=2023-03-01`);
  }
  
}
