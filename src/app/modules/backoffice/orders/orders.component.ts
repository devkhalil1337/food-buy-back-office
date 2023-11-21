import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DateFormats, GridColumnType, OrderStatus } from '@enums';
import { UtilityService, ConfigService, ToasterService } from '@shared';
import { OrdersService } from './orders.service';
import { RouterlinkrendererComponent } from '../../shared/components/routerlinkrenderer/routerlinkrenderer.component';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderStatusEnums } from 'src/app/enums/OrderStatusEnum';
import { OrderFilter } from 'src/app/models/orders-filter';
import { DateRange } from 'src/app/models/date-range.model';
import { DateRangeType } from 'src/app/enums/date-range';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})


export class OrdersComponent implements OnInit {

  private statusSubscription: Subscription;
  gridOptions: GridOptions
  StatusTypes = OrderStatus
  OrderFilter: OrderFilter
  selectizeConfig: any;

  get isEditButtonEnable() {
    if (this.gridOptions) {
      const rows = this.gridOptions.api?.getSelectedRows();
      return rows && rows.length > 0;
    }
    return false;
  }


  constructor(private utils: UtilityService, private configService: ConfigService,
    private ordersService: OrdersService, private toasterService: ToasterService) {
    this.OrderFilter = new OrderFilter();
    this.OrderFilter.dateRange = new DateRange(DateRangeType.Last7Days, "0", 0);
    this.selectizeConfig = this.configService.getSelectizeConfig(1);
    this.initGridConfig();
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  ngOnDestroy(): void {
    if (this.statusSubscription)
      this.statusSubscription.unsubscribe();
  }

  getGridData() {
    this.toggleGridOverlay(true);
    this.ordersService.getAllOrders(this.OrderFilter).subscribe(response => {
      this.utils.setGridData(this.gridOptions, response)
      this.toggleGridOverlay(false);
      this.checkOrderStatus();
    }, (error) => {
      this.toggleGridOverlay(false);
      this.toasterService.error(error);
    })
  }

  private initGridConfig() {
    this.gridOptions = this.configService.getGridConfig(false, true);
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.gridOptions.pagination = true;
    this.gridOptions.paginationPageSize = 10;
    this.gridOptions.onGridReady = params => {
      params.api.sizeColumnsToFit();
    }
  }

  private toggleGridOverlay(showLoading: boolean = false): void {
    this.utils.toggleGridOverlay(this.gridOptions, showLoading)
  }


  private getGridColumnDefs(): Array<ColDef> {
    const headerColumn = this.configService.getCheckboxConfig();
    headerColumn.headerClass = 'header_one';
    return [{
      headerName: 'Id',
      field: 'Id',
      cellClass: "text-center",
      headerClass: 'header_one',
      minWidth: 100,
      maxWidth: 100,
      sortable: false,
      valueGetter: params => params.node.rowIndex + 1,
      type: GridColumnType.number
    }, {
      headerName: 'Order Number',
      field: 'orderInvoiceNumber',
      headerClass: 'header_one',
      cellClass: "text-center",
      sortable: false,
      width: 100,
      cellRenderer: RouterlinkrendererComponent
    }, {
      headerName: 'Status',
      headerClass: 'header_one',
      field: 'orderStatus',
      editable: true,
      sortable: false,
      onCellValueChanged: (params) => {
        if (params.newValue != params.oldValue) {
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
      cellRenderer: (params: any) => {
        switch (params.value.toUpperCase()) {
          case OrderStatusEnums.Open:
            return `<span class="badge badge-primary p-2 w-100">${params.value.toUpperCase()}</span>`;
          case OrderStatusEnums.OnTheWay:
            return `<span class="badge badge-warning p-2 w-100">${params.value.toUpperCase()}</span>`;
          case OrderStatusEnums.Cancelled:
            return `<span class="badge badge-danger p-2 w-100">${params.value.toUpperCase()}</span>`;
          case OrderStatusEnums.Completed:
            return `<span class="badge badge-success p-2 w-100">${params.value.toUpperCase()}</span>`;
          default:
            return `<span class="badge badge-secondary p-2 w-100">${params.value.toUpperCase()}</span>`;
        }
      },
      maxWidth: 150
    },
    {
      headerName: 'Amount',
      field: 'totalAmount',
      cellClass: "text-center",
      width: 100,
      headerClass: 'header_one',
      sortable: false,
      type: GridColumnType.currency
    }, {
      headerName: 'Date',
      field: 'createdDate',
      cellClass: "text-center",
      headerClass: 'header_one',
      sortable: false,
      sort: 'desc',
      width: 100,
      comparator: (valueA, valueB) => (valueA == valueB) ? 0 : (valueA > valueB) ? 1 : -1,
      type: GridColumnType.dateTime
    }];
  }



  updateStatus(params: any) {
    const orderNumber = params.data.orderInvoiceNumber;
    const orderStatus = params.newValue;
    this.ordersService.updateOrderStatus(orderNumber, orderStatus).subscribe(response => {
      if (response) {
        this.toasterService.success(`Order Status has been updated to ${orderStatus}`)
      }
      this.getGridData();
    })
  }

  checkOrderStatus() {
    this.statusSubscription = interval(1500000) // Check every 15 seconds
      .pipe(
        switchMap(() => this.ordersService.getAllOrders(this.OrderFilter))
      )
      .subscribe(response => {
        this.gridOptions.api?.setRowData(response);
      });

  }

  setDateRangeByBaseDate(dtRange?: DateRange, sDate?: string, eDate?: string) {
    if (dtRange) {
      if (dtRange.label === DateRangeType.customRange) {
        this.OrderFilter.dateRange = this.configService.getNewDateRange(dtRange.label, undefined, sDate, eDate);
      } else {
        this.OrderFilter.dateRange = this.configService.getNewDateRange(dtRange.label, 0);
      }
    } else {
      this.OrderFilter.dateRange = this.configService.getNewDateRange(DateRangeType.Last7Days);
    }
    this.OrderFilter.startDate = this.OrderFilter.dateRange.startDate.format(DateFormats.default);
    this.OrderFilter.endDate = this.OrderFilter.dateRange.endDate.format(DateFormats.default);
  }


  onSubmit() {
    this.setDateRangeByBaseDate(this.OrderFilter.dateRange, this.OrderFilter.startDate, this.OrderFilter.endDate);
    this.getGridData();
  }

  onDateChange($event: any) {
    this.onSubmit();
  }

}
