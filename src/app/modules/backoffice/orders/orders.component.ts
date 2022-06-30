import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { GridColumnType } from '@enums';
import { UtilityService , ConfigService} from '@shared';

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
    {label:"Cancelled","value":"Cancelled"},
  ];


  get isEditButtonEnable(){
    if(this.gridOptions){
      const rows = this.gridOptions.api?.getSelectedRows();
      return rows && rows.length > 0;
    }
    return false;
  }
  

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
      ,3000)
  }


  rowData = [
    { status: "Pending",orderNumber:"123-2312d" , orderDate: "2023/06/10 04:47:49", totalAmount: 35000 },
    { status: "Delivered", orderNumber:"123-2312d" ,orderDate: "2022/07/20 06:04:01", totalAmount: 32000 },
    { status: "Pending", orderNumber:"123-2312d" ,orderDate: "2022/12/11 04:22:00", totalAmount: 32000 },
    { status: "Delivered", orderNumber:"123-2312d" ,orderDate: "2023/01/23 05:54:19", totalAmount: 32000 },
    { status: "On the way", orderNumber:"123-2312d" ,orderDate: "2023/02/17 15:41:59", totalAmount: 32000 },
    { status: "Preparing", orderNumber:"123-2312d" ,orderDate: "2023/05/06 00:13:20", totalAmount: 32000 },
    { status: "Pending", orderNumber:"123-2312d" ,orderDate: "2022/12/08 06:57:42", totalAmount: 32000 },
    { status: "On the way", orderNumber:"123-2312d" ,orderDate: "2022/10/09 13:37:44", totalAmount: 32000 },
    { status: "Pending", orderNumber:"123-2312d" ,orderDate: "2022/10/09 13:37:44", totalAmount: 32000 },
    { status: "Preparing", orderNumber:"123-2312d" ,orderDate: "2022/10/09 13:37:44", totalAmount: 32000 },
    { status: "Pending", orderNumber:"123-2312d" ,orderDate: "2023/06/15 00:31:00", totalAmount: 32000 },
    { status: "In Pgoress", orderNumber:"123-2312d" ,orderDate: "2023/06/15 00:31:00", totalAmount: 72000 }
  ]

  private initGridConfig(){
     
    this.gridOptions = this.configService.getGridConfig(false,true);
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.gridOptions.pagination = true;
    this.gridOptions.paginationPageSize = 10;
    this.gridOptions.onPaginationChanged = this.onPageChange.bind(this);
    this.gridOptions.onGridReady = params => {
      params.api.sizeColumnsToFit();
      params.api.showLoadingOverlay();
    }
  }

  private onPageChange = (params:GridOptions) => {
  }


  private getGridColumnDefs(): Array<ColDef> {
     const headerColumn = this.configService.getCheckboxConfig();
     headerColumn.headerClass = 'header_one';
    return [
      {
        ...headerColumn
      },{
      headerName: 'Status',
      headerClass:'header_one',
      field: 'status',
      editable:true,
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
      cellEditorParams: (params) => {
        let statusTypes = this.StatusTypes;
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
      headerClass: 'header_one',
      cellClass:"text-center",
      sortable: false,
      width:100,
    },{
      headerName: 'Amount',
      field: 'totalAmount',
      cellClass:"text-center",
      width:100,
      headerClass: 'header_one',
      sortable: false,
      type:GridColumnType.currency
    }, {
      headerName: 'Date',
      field: 'orderDate',
      cellClass:"text-center",
      headerClass: 'header_one',
      sortable: false,
      width:100,
      type:GridColumnType.dateTime
    }];
  }


}
