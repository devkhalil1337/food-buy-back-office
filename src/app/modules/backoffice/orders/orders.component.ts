import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { GridColumnType, OrderStatus } from '@enums';
import { UtilityService , ConfigService, ToasterService} from '@shared';
import { OrdersService } from './orders.service';
import { RouterlinkrendererComponent } from '../../shared/components/routerlinkrenderer/routerlinkrenderer.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})


export class OrdersComponent  implements OnInit {

  gridOptions: GridOptions
  StatusTypes = OrderStatus

  get isEditButtonEnable(){
    if(this.gridOptions){
      const rows = this.gridOptions.api?.getSelectedRows();
      return rows && rows.length > 0;
    }
    return false;
  }
  

  constructor(private utils:UtilityService, private configService:ConfigService,
    private ordersService:OrdersService,private toasterService:ToasterService) { 

    this.initGridConfig();
    this.getGridData();
  }

  ngOnInit(): void {
    
  }

  getGridData(){
    this.toggleGridOverlay(true);
      this.ordersService.getAllOrders().subscribe(response => {
        this.utils.setGridData(this.gridOptions,response)
        this.toggleGridOverlay(false);
      },(error) => {
        this.toggleGridOverlay(true);
        this.toasterService.error(error);
      })
  }

  private initGridConfig(){
    this.gridOptions = this.configService.getGridConfig(false,true);
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.gridOptions.pagination = true;
    this.gridOptions.paginationPageSize = 100;
    this.gridOptions.onGridReady = params => {
      params.api.sizeColumnsToFit();
    }
  }

  private toggleGridOverlay(showLoading:boolean = false):void{
    this.utils.toggleGridOverlay(this.gridOptions,showLoading)
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
      field: 'orderStatus',
      editable:true,
      sortable:false,
      onCellValueChanged: (params) => {
        if(params.newValue != params.oldValue){
          this.updateStatus(params)
        }
      },
      cellEditor: 'agSelectCellEditor',
      valueGetter: (params) => {
        const val = params.data.orderStatus;
        return val;
      },
      cellEditorParams: (params) => {
        let statusTypes = this.StatusTypes;
        return { values: statusTypes.map(({ value }) => value) };
      },
      cellRenderer: (params) => { 
        return `<span class='badge-item badge-status w-100'>${params.value.toUpperCase() || ''}</span>`
      },
      maxWidth:150
    },
    {
      headerName: 'Order Number',
      field: 'orderInvoiceNumber',
      headerClass: 'header_one',
      cellClass:"text-center",
      sortable: false,
      width:100,
      cellRenderer:RouterlinkrendererComponent
    },{
      headerName: 'Amount',
      field: 'totalAmount',
      cellClass:"text-center",
      width:100,
      headerClass: 'header_one',
      sortable: false,
      type:GridColumnType.currency
    },{
      headerName: 'Date',
      field: 'createdDate',
      cellClass:"text-center",
      headerClass: 'header_one',
      sortable: false,
      sort: 'desc',
      width:100,
      comparator: (valueA, valueB) => (valueA == valueB) ? 0 : (valueA > valueB) ? 1 : -1,
      type:GridColumnType.dateTime
    }];
  }



  updateStatus(params:any){
    const orderNumber = params.data.orderInvoiceNumber;
    const orderStatus = params.newValue;
    this.ordersService.updateOrderStatus(orderNumber,orderStatus).subscribe(response => {
      if(response){
        this.toasterService.success(`Order Status has been updated to ${orderStatus}`)
      }
      this.getGridData();
    })
  }

}
