import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { GridColumnType } from '@enums';
import { products } from 'src/app/models/products.models';
import { Product } from '../../core/models/products-models/products.model';
import { UtilityService , ConfigService, ToasterService } from '@shared';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  StatusTypes = [
    {label:"Active","value":"Active"},
    {label:"In Active","value":"In Active"}
  ];

  get isEditButtonEnable(){
    if(this.gridOptions){
      const rows = this.gridOptions.api?.getSelectedRows();
      return rows && rows.length > 0;
    }
    return false;
  }
  

  gridOptions: GridOptions

  constructor(private utils:UtilityService, 
    private configService:ConfigService,
    private productService:ProductsService,
    private toasterService:ToasterService) { 

    this.initGridConfig();
    this.getGridData();
  }

  ngOnInit(): void {
  }

  getGridData(){
    this.gridOptions.api?.showLoadingOverlay();
    this.productService.getListOfProducts().subscribe(response => {
      this.utils.setGridData(this.gridOptions,response);
      this.toggleGridOverlay()
    },(error) => {
      console.log(error);
      this.toggleGridOverlay()
      this.toasterService.error(error)
    })
}


  private initGridConfig(){
     
    this.gridOptions = this.configService.getGridConfig(false,true);
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.gridOptions.pagination = true;
    this.gridOptions.paginationPageSize = 10;
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
     },
     {
      headerName: 'Status',
      headerClass:'header_one',
      field: 'status',
      editable:true,
      sortable: true, 
      sort: 'desc',
      comparator: (valueA, valueB) => (valueA == valueB) ? 0 : (valueA > valueB) ? 1 : -1,
      onCellValueChanged: (params) => {
        if(params.newValue != params.oldValue)
          console.log(params.newValue)
        // this.onStatusUpdate(params,true);
      },
      cellEditor: 'agSelectCellEditor',
      valueGetter: (params) => params.data.active ? 'Active':'In Active',
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
      headerName: 'Image',
      field: 'productImage',
      headerClass: 'header_one',
      cellClass:"text-center",
      sortable: false,
      width:100,
    },
   {
     headerName: 'Product Name',
     field: 'productName',
     headerClass: 'header_one',
     cellClass:"text-center",
     sortable: false,
     width:100,
   },{
    headerName: 'Category',
    field: 'categoryName',
    cellClass:"text-center",
    width:100,
    headerClass: 'header_one',
    sortable: false,
    type:GridColumnType.text
  },{
    headerName: 'Price',
    field: 'productDeliveryPrice',
    cellClass:"text-center",
    width:100,
    headerClass: 'header_one',
    sortable: false,
    type:GridColumnType.currency
  }, {
     headerName: 'Created',
     field: 'updateDate',
     cellClass:"text-center",
     headerClass: 'header_one',
     sortable: false,
     width:150,
     type:GridColumnType.dateTime
   }];
 }


 onStatusUpdate(value:boolean){
  const rows = this.gridOptions.api?.getSelectedRows();
  let data = new Product();
 }

}
