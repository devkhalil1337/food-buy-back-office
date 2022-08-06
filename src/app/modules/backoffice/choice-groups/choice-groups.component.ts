import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { GridColumnType } from '@enums';
import { UtilityService , ConfigService } from '@shared';
import { ChoiceGroupsService } from './choice-groups.service';
import { LinksRenderComponent } from '../../shared/components';

@Component({
  selector: 'app-choice-groups',
  templateUrl: './choice-groups.component.html',
  styleUrls: ['./choice-groups.component.scss']
})
export class ChoiceGroupsComponent implements OnInit {


  get isEditButtonEnable(){
    if(this.gridOptions){
      const rows = this.gridOptions.api?.getSelectedRows();
      return rows && rows.length == 1;
    }
    return false;
  }


  gridOptions:any;
  constructor(private utils:UtilityService, private configService:ConfigService, private choiceOfGroupServices:ChoiceGroupsService) { 

    this.initGridConfig();
  }

  ngOnInit(): void {
    this.gridOptions.api?.showLoadingOverlay();
    this.choiceOfGroupServices.getListOfSelections().subscribe(response => {
      console.log(response);
      this.utils.setGridData(this.gridOptions,response)
    })
  }


  private initGridConfig(){
     
    this.gridOptions = this.configService.getGridConfig(false,true);
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.gridOptions.onRowDragEnd = this.onDropRow.bind(this);
    this.gridOptions.pagination = true;
    this.gridOptions.rowDragEntireRow = true;
    this.gridOptions.paginationPageSize = 10;
    this.gridOptions.enableCellTextSelection = false;

    this.gridOptions.onGridReady = params => {
      params.api.sizeColumnsToFit();
      params.api.showLoadingOverlay();
    }
  }

  private onDropRow(params:any){
    if(params.overIndex == -1 || params.overIndex == params.overNode.rowIndex) 
      return;
    console.log("Action Updated")
  }


  private getGridColumnDefs(): Array<ColDef> {
    const headerColumn = this.configService.getCheckboxConfig();
    headerColumn.headerClass = 'header_one';
   return [

    {
      ...headerColumn
    },
   {
     headerName: 'Select Name',
     field: 'selectionName',
     headerClass: 'header_one',
     cellClass:"text-center",
     sortable: false,
     width:100,
     rowDrag: true
   },{
     headerName: 'Modifiers',
     field: 'modifiers',
     valueFormatter: params => {
      let str = "";
      params.data.selectionChocices.forEach(elm => {
          str += elm.choiceName + ',' ;
      });
      return str;
    },
     cellClass:"text-center",
     width:100,
     headerClass: 'header_one',
     sortable: false,
     type:GridColumnType.text
   }, {
    headerName: 'Actions',
    field: 'Links',
    cellClass:"text-center pl-2 pr-0",
    headerClass: 'header_one  pl-2 pr-0',
    cellRendererFramework:LinksRenderComponent,
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
   }];
 }

}
