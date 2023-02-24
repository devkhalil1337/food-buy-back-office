import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-routerlinkrenderer',
  templateUrl: './routerlinkrenderer.component.html',
  styleUrls: ['./routerlinkrenderer.component.scss']
})
export class RouterlinkrendererComponent implements ICellRendererAngularComp {


  params:ICellRendererParams;
  queryParams: any = {}
  
  
  constructor() { }


  refresh(): boolean {
    return false;
  }

  agInit(params: any): void {
    this.params = params;
  }

}
