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
  queryParams: any = {categoryId : '',queryParamName:''}
  
  
  constructor() { }


  get EditCategory(){
    this.queryParams = 'CategoryId';
    return "/add-category"
  }
  

  refresh(): boolean {
    return false;
  }

  agInit(params: any): void {
    this.params = params;
    this.queryParams.categoryId = this.params.data.categoryId;
  }

}
