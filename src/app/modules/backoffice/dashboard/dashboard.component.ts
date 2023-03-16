import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { forkJoin } from 'rxjs';
import { DateFormats } from 'src/app/enums';
import { DateRangeType } from 'src/app/enums/date-range';
import { NumberOfOrders } from 'src/app/models/dashboard.model';
import { DateRange } from 'src/app/models/date-range.model';
import { ReportingDashboardFilter } from 'src/app/models/reporting-dashboard-filter';
import { ConfigService } from '../../shared';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  highcharts = Highcharts;
  reportingDashboardFilter:ReportingDashboardFilter
  NumberOfOrders:NumberOfOrders;
  OrderStatus:Array<string>;
  isLoading:boolean = false;
  constructor(private dashboardService:DashboardService,private configService:ConfigService) {
    this.NumberOfOrders = new NumberOfOrders();
    this.reportingDashboardFilter = new ReportingDashboardFilter();
    this.reportingDashboardFilter.dateRange = new DateRange(DateRangeType.Last30Days);
    this.reportingDashboardFilter.orderStatus = ['open','in process','completed','cancelled','delivered']
   }

   setDateRangeByBaseDate(dtRange?: DateRange, sDate?: string, eDate?: string) {
    if (dtRange) {
      if (dtRange.label === DateRangeType.customRange) {
        this.reportingDashboardFilter.dateRange = this.configService.getNewDateRange(dtRange.label, undefined, sDate, eDate);
      } else {
        this.reportingDashboardFilter.dateRange = this.configService.getNewDateRange(dtRange.label);
      }
    } else {
      this.reportingDashboardFilter.dateRange = this.configService.getNewDateRange(DateRangeType.Last7Days);
    }
    this.reportingDashboardFilter.startDate = this.reportingDashboardFilter.dateRange.startDate.format(DateFormats.default);
    this.reportingDashboardFilter.endDate = this.reportingDashboardFilter.dateRange.endDate.format(DateFormats.default);
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  onDateChange($event:any){
    this.onSubmit();
  }

  onSubmit(){
    this.setDateRangeByBaseDate(this.reportingDashboardFilter.dateRange,this.reportingDashboardFilter.startDate,this.reportingDashboardFilter.endDate);
    this.getTheNumberofOrders();
    this.loadChart();
  }

  getTheNumberofOrders(){
    this.isLoading = true;
    this.dashboardService.getOrdersKPIS(this.reportingDashboardFilter).subscribe(KPISResponse => {
    KPISResponse.forEach(orderObj => {
      this.NumberOfOrders[orderObj.orderStatus] = orderObj.numberOfOrders
    })
    this.isLoading = false;
  },(error) => {
      console.log(error);
      this.isLoading = false;
    });
  }
  
  loadChart() {
    console.log(this.reportingDashboardFilter)
    this.isLoading = true;
    this.dashboardService.getNetSalesForGraph(this.reportingDashboardFilter).subscribe(data => {
      this.isLoading = false;

      const chart = Highcharts.chart('chart-gauge', {
        chart: {
          type: 'areaspline',
          borderWidth: 0,
          style: {
            fontFamily: 'Roboto',
            fontWeight: '500',
          }
        },
        title: {
          text: 'Gross & Net Sales'
        },
        subtitle: {
          text: 'Show monthly wise Gross & Net Sales graph.'
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 0,
          y: 0,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#FFFFFF'
        },
        xAxis: {
          categories: data.map((d: any) => d.date),
          title: {
            text: 'Amount & Order',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true
              }
            },
          },
          legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 5,
            y: -10,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            shadow: true
          },
          credits: {
            enabled: false
          },
        },
        yAxis: {
          title: {
            text: 'Gross Sales'
          }
        },
        series: [{
          name: 'Gross Sales',
          data: data.map((d: any) => d.amount),
          color: 'rgb(245,93,44)'
        }]
      } as any);

    });
    
  }
  

}
