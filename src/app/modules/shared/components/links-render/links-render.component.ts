import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-links-render',
  templateUrl: './links-render.component.html',
  styleUrls: ['./links-render.component.scss']
})
export class LinksRenderComponent implements ICellRendererAngularComp {


  params:ICellRendererParams;
  queryParams: any = {categoryId : '',queryParamName:'',productId:'',selectionId:'',selectionName:'',productName:'',categoryName:''}
  
  
  constructor() { }


  refresh(): boolean {
    return false;
  }

  agInit(params: any): void {
    this.params = params;
    this.queryParams.categoryId = this.params.data.categoryId;
    this.queryParams.categoryName = this.params.data.categoryName;
    this.queryParams.productId = this.params.data.productId;
    this.queryParams.productName = this.params.data.productName;
    this.queryParams.selectionId = this.params.data.selectionId;
    this.queryParams.selectionName = this.params.data.selectionName;
  }

}
