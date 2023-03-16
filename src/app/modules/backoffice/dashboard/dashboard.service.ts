import { Injectable } from '@angular/core';
import { DateRange } from 'src/app/models/date-range.model';
import { ReportingDashboardFilter } from 'src/app/models/reporting-dashboard-filter';
import { ApiService } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService:ApiService) { }

  getOrdersKPIS(filter:ReportingDashboardFilter){
    return this.apiService.request("post",`ReportingDashboard/GetNumberOfOrders`,filter);
  }
  
  getNetSalesForGraph(filter:ReportingDashboardFilter){
    return this.apiService.request("post",`ReportingDashboard/GetGrossSalesByDay`,filter);
  }
  
}
