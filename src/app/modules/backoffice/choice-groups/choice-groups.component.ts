import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { GridColumnType } from '@enums';
import { UtilityService, ConfigService, ToasterService } from '@shared';
import { ChoiceGroupsService } from './choice-groups.service';
import { LinksRenderComponent } from '../../shared/components';

@Component({
  selector: 'app-choice-groups',
  templateUrl: './choice-groups.component.html',
  styleUrls: ['./choice-groups.component.scss']
})
export class ChoiceGroupsComponent implements OnInit {


  get isEditButtonEnable() {
    if (this.gridOptions) {
      const rows = this.gridOptions.api?.getSelectedRows();
      return rows && rows.length > 0;
    }
    return true;
  }


  gridOptions: any;
  actionType: string;
  constructor(private utils: UtilityService, private configService: ConfigService, private choiceOfGroupServices: ChoiceGroupsService, private toasterService: ToasterService) {

    this.initGridConfig();
  }

  ngOnInit(): void {
    this.gridOptions.api?.showLoadingOverlay();
    this.choiceOfGroupServices.getListOfSelections().subscribe(response => {
      this.utils.setGridData(this.gridOptions, response)
      this.toggleGridOverlay();
    }, (error) => {
      console.log(error);
      this.toggleGridOverlay()
      // this.toasterService.error(error)
    })
  }


  private initGridConfig() {

    this.gridOptions = this.configService.getGridConfig(false, true);
    this.gridOptions.columnDefs = this.getGridColumnDefs();
    this.gridOptions.onRowDragEnd = this.onDropRow.bind(this);
    this.gridOptions.pagination = true;
    this.gridOptions.rowDragEntireRow = true;
    this.gridOptions.paginationPageSize = 10;
    this.gridOptions.enableCellTextSelection = false;

    this.gridOptions.onGridReady = params => {
      params.api.sizeColumnsToFit();
    }
  }

  private onDropRow(params: any) {
    if (params.overIndex == -1 || params.overIndex == params.overNode.rowIndex)
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
        headerName: 'Status',
        headerClass: 'header_one',
        field: 'status',
        editable: false,
        sortable: true,
        sort: 'desc',
        valueGetter: (params) => params.data.active ? 'Active' : 'In Active',
        cellRenderer: (params) => {
          return `<span class='badge-item badge-status w-100'>${params.value || ''}</span>`
        },
        maxWidth: 150
      },
      {
        headerName: 'Select Name',
        field: 'selectionName',
        headerClass: 'header_one',
        cellClass: "text-center",
        sortable: false,
        width: 100,
        rowDrag: true
      }, {
        headerName: 'Modifiers',
        field: 'selectionChoices',
        valueFormatter: params => params.value && params.value.length > 0 ? params.value.map(element => element.choiceName).join(",") : '',
        cellClass: "text-center",
        width: 100,
        headerClass: 'header_one',
        sortable: false,
        type: GridColumnType.text
      }, {
        headerName: 'Actions',
        field: 'Links',
        cellClass: "text-center pl-2 pr-0",
        headerClass: 'header_one  pl-2 pr-0',
        cellRendererFramework: LinksRenderComponent,
        sortable: false,
        width: 100,
      }, {
        headerName: 'Date',
        field: 'modifyDate',
        cellClass: "text-center",
        headerClass: 'header_one',
        sortable: false,
        width: 100,
        type: GridColumnType.dateTime
      }];
  }

  private toggleGridOverlay(showLoading: boolean = false): void {
    this.utils.toggleGridOverlay(this.gridOptions, showLoading)
  }


  onBulkAction() {
    switch (this.actionType) {
      case 'delete':
        this.onDeleteChoice();
        break;
    }
  }

  onDeleteChoice(): void {
    const selectedRows = this.gridOptions.api.getSelectedRows();
    if (selectedRows && selectedRows.length > 0) {
      const selectedIds = selectedRows.map(row => row.selectionId); // Replace 'id' with the actual property name representing the unique identifier
      this.choiceOfGroupServices.onDeleteSelections(selectedIds).subscribe(response => {
        if (response)
          this.toasterService.success("selected choices has been deleted successfully");
      }, (error) => {
        console.log(error);
        this.toasterService.error("error on deleting choices");

      })
    }
  }

}
