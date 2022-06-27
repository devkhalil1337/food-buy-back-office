import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { GridColumnType } from 'src/app/enums/format-type';
import { ConfigService } from '../../shared/config.service';
import { UtilityService } from '../../shared/utility.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})


export class OrdersComponent  implements OnInit {

  
  gridOptions: GridOptions

  StatusTypes = [
    {label:"In Progress","value":"In Progress"},
    {label:"On the way","value":"On the way"},
    {label:"Cancelled",value:"Cancelled"},
  ];
  

  constructor(private utils:UtilityService, private configService:ConfigService) { 

    this.initGridConfig();
    this.getGridData();
  }

  ngOnInit(): void {
    
  }

  getGridData(){
      this.gridOptions.api?.showLoadingOverlay();
      setTimeout(() => 
      this.utils.setGridData(this.gridOptions,this.rowData)
      ,100)
  }


  rowData = [
    { status: "Pending",orderNumber:"123-2312d" , orderDate: "4 May", totalAmount: 35000 },
    { status: "Pending", orderNumber:"123-2312d" ,orderDate: "4 April", totalAmount: 32000 },
    { status: "In Pgoress", orderNumber:"123-2312d" ,orderDate: "4 Jan", totalAmount: 72000 }
  ]

  private initGridConfig(){
     
    this.gridOptions = this.configService.getGridConfig(false,true);
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.gridOptions.onGridReady = params => {
      params.api.sizeColumnsToFit();
      params.api.showNoRowsOverlay();
    }
  }



  private getGridColumnDefs(): Array<ColDef> {
     const headerColumn = this.configService.getCheckboxConfig();
    return [
      {
        ...headerColumn
      },{
      headerName: 'Status',
      field: 'status',
      editable:true,
      //editable: params => params.data.status && params.data.status.toLowerCase() != "eligible" && params.data.status.toLowerCase() != "disabled - ineligible",
      sortable: true, 
      sort: 'desc',
       comparator: (valueA, valueB) => (valueA == valueB) ? 0 : (valueA > valueB) ? 1 : -1,
      // filterParams: {
      //   data: this.StatusTypes
      // },
      // headerComponentFramework: HeaderInfoTooltipComponent,
      // headerComponentParams: {
      //   headerToolTip:MediaTooltips.disableEnableRBB
      // },
      onCellValueChanged: (params) => {
        if(params.newValue != params.oldValue)
          console.log(params.newValue)
        // this.onStatusUpdate(params,true);
      },
       cellEditor: 'agSelectCellEditor',
      valueGetter: (params) => {
        const val = params.data.status;
        return val ? val.toUpperCase() : val;
      },
      // valueFormatter: (params) => {
      //   if (typeof (params.value) === 'string') {
      //     const statusInfo = RuleAllStatusTypes.find(({ value }) => {
      //       return value === params.value;
      //     });

      //     return statusInfo ? statusInfo.label : '';
      //   }
      // },
      cellEditorParams: (params) => {
        let statusTypes = this.StatusTypes; //params.data.status.toLowerCase() == 'enable' ? StatusTypes : this.ruleStatusTypes 
          return { values: statusTypes.map(({ value }) => value) };
      },
      cellRenderer: (params) => { 
        return `<span class='badge-item badge-status w-100'>${params.value || ''}</span>`
      },
      maxWidth:150

    },
    {
      headerName: 'Order Number',
      field: 'orderNumber',
      headerClass: 'hideFilters',
      sortable: false,
    },{
      headerName: 'Amount',
      field: 'totalAmount',
      headerClass: 'hideFilters',
      sortable: false,
      type:GridColumnType.currency
    }, {
      headerName: 'Date',
      field: 'orderDate',
      headerClass: 'hideFilters',
      sortable: false,
    }];
  }


}
