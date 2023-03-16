import { Injectable } from '@angular/core';
import { DateRange } from 'src/app/models/date-range.model';
import { ReportingDashboardFilter } from 'src/app/models/reporting-dashboard-filter';
import { ApiService } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService:ApiService) { }

  getOrdersKPIS(orderStatus:any,filter:ReportingDashboardFilter){
    const startDate = filter.dateRange.startDate.format("YYYY-MM-DD")
    const endDate = filter.dateRange.endDate.format("YYYY-MM-DD")
    return this.apiService.request("post",`ReportingDashboard/GetNumberOfOrders?Datefrom=${startDate}&Dateto=${endDate}`,orderStatus);
  }
  
  getNetSalesForGraph(filter:ReportingDashboardFilter){
    const startDate = filter.dateRange.startDate.format("YYYY-MM-DD")
    const endDate = filter.dateRange.endDate.format("YYYY-MM-DD")
    return this.apiService.request("get",`ReportingDashboard/GetGrossSalesByDay?Datefrom=${startDate}&Dateto=${endDate}`);
  }
  
}
