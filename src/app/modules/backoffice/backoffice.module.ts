import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CoreModule } from '../core/core.module';
import { AddProductComponent } from './products/add-product/add-product.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';

const routes: Routes = [{
	path: "**",
	redirectTo: "dashboard",
	pathMatch: "full"
}];

@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    CategoryComponent,
    AddCategoryComponent,
    OrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class BackofficeModule { }
