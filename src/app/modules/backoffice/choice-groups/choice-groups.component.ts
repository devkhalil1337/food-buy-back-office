import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { GridColumnType } from 'src/app/enums/format-type';
import { ConfigService } from '../../shared/config.service';
import { UtilityService } from '../../shared/utility.service';

@Component({
  selector: 'app-choice-groups',
  templateUrl: './choice-groups.component.html',
  styleUrls: ['./choice-groups.component.scss']
})
export class ChoiceGroupsComponent implements OnInit {

  gridOptions:any;
  constructor(private utils:UtilityService, private configService:ConfigService) { 

    this.initGridConfig();
  }

  ngOnInit(): void {
  }


  private initGridConfig(){
     
    this.gridOptions = this.configService.getGridConfig(false,true);
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.gridOptions.pagination = true;
    this.gridOptions.paginationPageSize = 10;
    this.gridOptions.onGridReady = params => {
      params.api.sizeColumnsToFit();
      // params.api.showLoadingOverlay();
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
     headerName: 'Select Name',
     field: 'orderNumber',
     headerClass: 'header_one',
     cellClass:"text-center",
     sortable: false,
     width:100,
   },{
     headerName: 'Modifiers',
     field: 'modifiers',
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
