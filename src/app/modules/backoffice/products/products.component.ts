import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { GridColumnType } from '@enums';
import { products } from 'src/app/models/products.models';
import { Product } from '../../core/models/products-models/products.model';
import { UtilityService , ConfigService } from '@shared';

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

  constructor(private utils:UtilityService, private configService:ConfigService) { 

    this.initGridConfig();
    this.getGridData();
  }

  ngOnInit(): void {
  }

  getGridData(){
    this.gridOptions.api?.showLoadingOverlay();
    setTimeout(() => 
    this.utils.setGridData(this.gridOptions,products)
    ,3000)
}


  private initGridConfig(){
     
    this.gridOptions = this.configService.getGridConfig(false,true);
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.gridOptions.pagination = true;
    this.gridOptions.paginationPageSize = 10;
    this.gridOptions.onGridReady = params => {
      params.api.sizeColumnsToFit();
      params.api.showLoadingOverlay();
    }
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
      valueGetter: (params) => params.data.status ? 'Active':'In Active',
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
      field: 'image',
      headerClass: 'header_one',
      cellClass:"text-center",
      sortable: false,
      width:100,
    },
   {
     headerName: 'Product Name',
     field: 'itemName',
     headerClass: 'header_one',
     cellClass:"text-center",
     sortable: false,
     width:100,
   },{
    headerName: 'Category',
    field: 'cateId',
    cellClass:"text-center",
    width:100,
    headerClass: 'header_one',
    sortable: false,
    type:GridColumnType.text
  },{
    headerName: 'Price',
    field: 'itemPrice',
    cellClass:"text-center",
    width:100,
    headerClass: 'header_one',
    sortable: false,
    type:GridColumnType.currency
  }, {
     headerName: 'Created',
     field: 'orderDate',
     cellClass:"text-center",
     headerClass: 'header_one',
     sortable: false,
     width:100,
     type:GridColumnType.dateTime
   }];
 }


 onStatusUpdate(value:boolean){
  const rows = this.gridOptions.api?.getSelectedRows();
  let data = new Product();
 }

}
