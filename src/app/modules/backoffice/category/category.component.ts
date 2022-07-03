import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { GridColumnType, StatusTypes } from '@enums';
import { UtilityService , ConfigService} from '@shared';
import { categories } from 'src/app/models/category.model';
import { Category } from '@models';
import { CategoryService } from './category.service';
import { LinksRenderComponent } from '../../shared/components';

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

  get selectedCategory(){
    if(this.gridOptions){
      const rows = this.gridOptions.api?.getSelectedRows();
      if(rows && rows.length == 1)
        return rows[0].categoryId
    }
    return false;
  }


  constructor(private utils:UtilityService, private configService:ConfigService,
    private categoryService:CategoryService) { 
    this.initGridConfig();
    this.getGridData();
  }

  ngOnInit(): void {
  }

 private getGridData(){
    this.toggleGridOverlay(true)
    this.categoryService.getListOfCategories().subscribe(response => {
      this.utils.setGridData(this.gridOptions,response);
      this.toggleGridOverlay()
    },(error) => {
      console.log(error);
      this.toggleGridOverlay()
    })
}


  private initGridConfig(){
     
    this.gridOptions = this.configService.getGridConfig(false,true);
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.gridOptions.onRowDragEnd = this.onDropRow.bind(this);
    this.gridOptions.pagination = true;
    this.gridOptions.rowDragEntireRow = true;
    this.gridOptions.rowDragManaged = true;
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
      valueGetter: (params) => params.data.active ? 'Active':'In Active',
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
      field: 'categoryName',
      headerClass: 'header_one',
      cellClass:"text-center",
      sortable: false,
      width:100,
    }, {
      headerName: 'Date',
      field: 'updateDate',
      cellClass:"text-center",
      headerClass: 'header_one',
      sortable: false,
      width:100,
      type:GridColumnType.dateTime
    }, {
      headerName: 'Actions',
      field: 'Links',
      cellClass:"text-center",
      headerClass: 'header_one',
      cellRendererFramework:LinksRenderComponent,
      sortable: false,
      width:100,
      type:GridColumnType.dateTime
    }];
  }

  private toggleGridOverlay(showLoading:boolean = false):void{
    this.utils.toggleGridOverlay(this.gridOptions,showLoading)
  }

  private onStatusUpdate(params:any):void{
    const rows = this.gridOptions.api?.getSelectedRows();
    console.log(rows);
    let data = new Category();

  }

}
