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
  queryParams: any = {categoryId : '',queryParamName:'',productId:''}
  
  
  constructor() { }


  get EditCategory(){
    this.queryParams = 'CategoryId';
    return "/add-category"
  }

  get isEditProduct(){
    
    return !!(this.queryParams.productId && this.queryParams.categoryId);
  }
  

  refresh(): boolean {
    return false;
  }

  agInit(params: any): void {
    this.params = params;
    this.queryParams.categoryId = this.params.data.categoryId;
    this.queryParams.productId = this.params.data.productId;
  }

}
