import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { forkJoin } from 'rxjs';
import { DateRangeType } from 'src/app/enums/date-range';
import { NumberOfOrders } from 'src/app/models/dashboard.model';
import { DateRange } from 'src/app/models/date-range.model';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  highcharts = Highcharts;


   dateRange:any

  NumberOfOrders:NumberOfOrders;

  constructor(private dashboardService:DashboardService) {
    this.dateRange = new DateRange(DateRangeType.Last14Days);
    this.NumberOfOrders = new NumberOfOrders();
    this.getTheNumberofOrders();
   }

  ngOnInit(): void {
    this.dashboardService.getNetSalesForGraph().subscribe(response => {

      this.loadChart(response);

    });
  }

  onDateChange($event:any){
    console.log({$event})
  }

  getTheNumberofOrders(){
    forkJoin(
      this.dashboardService.getOpenOrders(),
      this.dashboardService.getInProcessOrdersType(),
      this.dashboardService.getCompleteOrders(),
      this.dashboardService.getCancelledOrders(),
    ).subscribe(([openResponse,inProcessResponse,completedResponse,cancelledResponse]) => {
      this.NumberOfOrders.open = openResponse;
      this.NumberOfOrders.InProcess = inProcessResponse;
      this.NumberOfOrders.completed = completedResponse;
      this.NumberOfOrders.cancelled = cancelledResponse;
    },(error) => {
      console.log(error);
    });
  }
  
  loadChart(data: any) {
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
  }
  

}
