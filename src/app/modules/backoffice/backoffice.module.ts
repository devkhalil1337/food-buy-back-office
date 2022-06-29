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
import { AgGridModule } from 'ag-grid-angular';
import { ConfigService } from '../shared/config.service';
import { UtilityService } from '../shared/utility.service';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { SharedModule } from '../shared/shared.module';
import { ChoiceGroupsComponent } from './choice-groups/choice-groups.component';
import { AddChoiceComponent } from './choice-groups/add-choice/add-choice.component';
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
    OrderDetailsComponent,
    BusinessProfileComponent,
    ChoiceGroupsComponent,
    AddChoiceComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AgGridModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[ConfigService,UtilityService],
  exports:[RouterModule]
})
export class BackofficeModule { }
