import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { forkJoin } from 'rxjs';
import { NumberOfOrders } from 'src/app/models/dashboard.model';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  highcharts = Highcharts;


  NumberOfOrders:NumberOfOrders;

  constructor(private dashboardService:DashboardService) {

    this.NumberOfOrders = new NumberOfOrders();
    this.getTheNumberofOrders();
   }

  ngOnInit(): void {
    this.loadChart();
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
  
  loadChart(){
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
		text: '2020 Income & Order Summary'
    },
    subtitle: {
      text: 'Show monthly wise income & order graph.'
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
      categories: ['January','February','March','April','May','June','July','August','September','October','November','December'],
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
    // series: {
    //   cursor: 'pointer',
    //   point: {
    //     events: {
    //       click: function (e) {
    //         LoadDayWiseExpenseOrIncome(this.type, this.monthID, this.monthName, this.dayWiseData);
    //       }
    //     }
    //   }
    // }
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
          text: 'Amount & Order'
      }
  },

  series: [
    {
      name: 'Income',
      data: [
        {y:0, monthID:'1', monthName:'January', 'dayWiseData': '{"01":0}', 'type': 'income'},{y:0, monthID:'2', monthName:'February', 'dayWiseData': '{"01":0}', 'type': 'income'},{y:0, monthID:'3', monthName:'March', 'dayWiseData': '{"01":0}', 'type': 'income'},{y:0, monthID:'4', monthName:'April', 'dayWiseData': '{"28":145,"28":10}', 'type': 'income'},{y:0, monthID:'5', monthName:'May', 'dayWiseData': '{"01":0}', 'type': 'income'},{y:125, monthID:'6', monthName:'June', 'dayWiseData': '{"28":125,"28":10}', 'type': 'income'},{y:50, monthID:'7', monthName:'July', 'dayWiseData': '{"28":50,"28":0}', 'type': 'income'},{y:140, monthID:'8', monthName:'August', 'dayWiseData': '{"28":140,"28":0}', 'type': 'income'},{y:0, monthID:'9', monthName:'September', 'dayWiseData': '{"01":0}', 'type': 'income'},{y:0, monthID:'10', monthName:'October', 'dayWiseData': '{"01":0}', 'type': 'income'},{y:0, monthID:'11', monthName:'November', 'dayWiseData': '{"01":0}', 'type': 'income'},{y:0, monthID:'12', monthName:'December', 'dayWiseData': '{"01":0}', 'type': 'income'},                        ],
      color: 'rgb(245,93,44)'
    },
    {
      name: 'Order',
      data: [
        {y:0, monthID:'1', monthName:'January', 'dayWiseData': '{"01":0}', 'type': 'order'},{y:0, monthID:'2', monthName:'February', 'dayWiseData': '{"01":0}', 'type': 'order'},{y:0, monthID:'3', monthName:'March', 'dayWiseData': '{"01":0}', 'type': 'order'},{y:0, monthID:'4', monthName:'April', 'dayWiseData': '{"28":25,"28":10}', 'type': 'order'},{y:0, monthID:'5', monthName:'May', 'dayWiseData': '{"01":0}', 'type': 'order'},{y:15, monthID:'6', monthName:'June', 'dayWiseData': '{"28":15,"28":10}', 'type': 'order'},{y:10, monthID:'7', monthName:'July', 'dayWiseData': '{"28":10,"28":0}', 'type': 'order'},{y:35, monthID:'8', monthName:'August', 'dayWiseData': '{"28":10,"28":10}', 'type': 'order'},{y:0, monthID:'9', monthName:'September', 'dayWiseData': '{"01":0}', 'type': 'order'},{y:0, monthID:'10', monthName:'October', 'dayWiseData': '{"01":0}', 'type': 'order'},{y:0, monthID:'11', monthName:'November', 'dayWiseData': '{"01":0}', 'type': 'order'},{y:0, monthID:'12', monthName:'December', 'dayWiseData': '{"01":0}', 'type': 'order'},                        ],
      color: 'rgb(43,47,76)'
    }
  ],
    } as any);
  }

}
