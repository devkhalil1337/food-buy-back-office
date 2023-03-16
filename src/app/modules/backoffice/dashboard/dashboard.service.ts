import { Injectable } from '@angular/core';
import { DateRange } from 'src/app/models/date-range.model';
import { ApiService } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService:ApiService) { }

  getOrdersKPIS(orderStatus:any,dateRange:DateRange){
    const startDate = dateRange.startDate.format("YYYY-MM-DD")
    const endDate = dateRange.endDate.format("YYYY-MM-DD")
    return this.apiService.request("post",`ReportingDashboard/GetNumberOfOrders?Datefrom=${startDate}&Dateto=${endDate}`,orderStatus);
  }
  
  getNetSalesForGraph(dateRange:DateRange){
    const startDate = dateRange.startDate.format("YYYY-MM-DD")
    const endDate = dateRange.endDate.format("YYYY-MM-DD")
    return this.apiService.request("get",`ReportingDashboard/GetGrossSalesByDay?Datefrom=${startDate}&Dateto=${endDate}`);
  }
  
}
