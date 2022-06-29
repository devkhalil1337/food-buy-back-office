import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { GridColumnType } from 'src/app/enums/format-type';
import { choiceGroupsItems } from 'src/app/models/choice-groups.models';
import { ConfigService } from '../../shared/config.service';
import { UtilityService } from '../../shared/utility.service';

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

 

  get selectedChoice(){
    if(this.gridOptions){
      const rows = this.gridOptions.api?.getSelectedRows();
      if(rows && rows.length > 0)
        return rows[0].id
    }
    return false;
  }



  gridOptions:any;
  constructor(private utils:UtilityService, private configService:ConfigService) { 

    this.initGridConfig();
  }

  ngOnInit(): void {
    this.gridOptions.api?.showLoadingOverlay();
      setTimeout(() => 
      this.utils.setGridData(this.gridOptions,choiceGroupsItems)
      ,2000)
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
     field: 'selectName',
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
      params.data.modifiers.forEach(elm => {
          str += elm.modifierName + ',' ;
      });
      return str;
    },
     cellClass:"text-center",
     width:100,
     headerClass: 'header_one',
     sortable: false,
     type:GridColumnType.text
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
