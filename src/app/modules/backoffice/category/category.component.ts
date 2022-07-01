import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { GridColumnType, StatusTypes } from '@enums';
import { UtilityService , ConfigService} from '@shared';
import { categories } from 'src/app/models/category.model';
import { Category } from '@models';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  gridOptions: GridOptions;

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

 private getGridData(){
    this.gridOptions.api?.showLoadingOverlay();
    setTimeout(() => 
     this.utils.setGridData(this.gridOptions,categories)
    ,100)
}


  private initGridConfig(){
     
    this.gridOptions = this.configService.getGridConfig(false,true);
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.gridOptions.onRowDragEnd = this.onDropRow.bind(this);
    this.gridOptions.pagination = true;
    this.gridOptions.rowDragEntireRow = true;
    this.gridOptions.rowDragManaged = true;
    // this.gridOptions.suppressMoveWhenRowDragging = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.paginationPageSize = 10;
    this.gridOptions.enableCellTextSelection = false;
    this.gridOptions.onPaginationChanged = this.onPageChange.bind(this);
    this.gridOptions.onGridReady = params => {
      params.api.sizeColumnsToFit();
      params.api.showLoadingOverlay();
    }
  }

  private onPageChange = (params:GridOptions) => {
  }

  private onDropRow(params:any){
    console.log("Action Updated",params)
    if(params.overIndex == -1 || params.overIndex == params.overNode.rowIndex) 
      return;
  }


  private getGridColumnDefs(): Array<ColDef> {
     const headerColumn = this.configService.getCheckboxConfig();
     headerColumn.headerClass = 'header_one';
    return [
      {
        ...headerColumn
      },
      {
        headerName: '',
        field: '',
        headerClass: 'header_one',
        cellClass:"text-center",
        sortable: false,
        width:10,
        maxWidth:100,
        cellRenderer: () => {
          return `<span class='fa fa-bars'></span>`
        }
      },{
      headerName: 'Status',
      headerClass:'header_one',
      field: 'status',
      editable:true,
      sortable: true, 
      comparator: (valueA, valueB) => (valueA == valueB) ? 0 : (valueA > valueB) ? 1 : -1,
      valueGetter: (params) => params.data.status ? 'Active':'In Active',
      onCellValueChanged: (params) => {
        if(params.newValue != params.oldValue)
          this.onStatusUpdate(params);
      },
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: (params) => {
        let statusTypes = StatusTypes;
          return { values: statusTypes.map(({ value }) => value) };
      },
      cellRenderer: (params) => { 
        return `<span class='badge-item badge-status w-100'>${params.value || ''}</span>`
      },
      maxWidth:150
    },
    {
      headerName: 'Category Name',
      field: 'itemName',
      headerClass: 'header_one',
      cellClass:"text-center",
      sortable: false,
      width:100,
    },{
      headerName: 'Sort by',
      field: 'orderBy',
      cellClass:"text-center",
      width:100,
      headerClass: 'header_one',
      sortable: true,
      // sort: 'asc',
      comparator: (valueA, valueB) => (valueA == valueB) ? 0 : (valueA > valueB) ? 1 : -1,
      type:GridColumnType.number
    }, {
      headerName: 'Date',
      field: 'CreationDate',
      cellClass:"text-center",
      headerClass: 'header_one',
      sortable: false,
      width:100,
      type:GridColumnType.dateTime
    }];
  }


  private onStatusUpdate(params:any):void{
    debugger
    const rows = this.gridOptions.api?.getSelectedRows();
    let data = new Category();

  }

}
