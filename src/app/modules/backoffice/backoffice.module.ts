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
import { ConfigService, UtilityService,  ToasterService , SharedModule } from '@shared';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { ChoiceGroupsComponent } from './choice-groups/choice-groups.component';
import { AddChoiceComponent } from './choice-groups/add-choice/add-choice.component';
import { SettingsComponent } from './settings/settings.component';
import { BusinessHoursComponent } from './business-hours/business-hours.component';
import { DateRangePickerComponent } from '../shared/components';
import { UserComponent } from './user/user.component';
import { ModalService } from '../shared/modal.service';

const routes: Routes = [{
	path: 'dashboard',
	
	component: DashboardComponent
}, {
	path: 'products',
  
	component: ProductsComponent
}, {
	path: 'add-product',
  
	component: AddProductComponent
},{
  path:'category',
  
  component:CategoryComponent
},{
  path:'add-category',
  
  component:AddCategoryComponent
},{
  path:'orders',
  
  component:OrdersComponent
},{
  path:'orders/:id',
  
  component:OrderDetailsComponent
},{
  path:'business-profile',
  
  component:BusinessProfileComponent
},{
  path:'choice-groups',
  
  component:ChoiceGroupsComponent
},{
  path:'add-choice',
  
  component:AddChoiceComponent
},{
  path:'settings',
  component:SettingsComponent
},{
  path:'business-hours',
  component:BusinessHoursComponent
},{
  path:'internal-users',
  component:UserComponent
}];
@NgModule({
  declarations: [
    DashboardComponent,
    ProductsComponent,
    AddProductComponent,
    CategoryComponent,
    AddCategoryComponent,
    OrdersComponent,
    OrderDetailsComponent,
    BusinessProfileComponent,
    ChoiceGroupsComponent,
    AddChoiceComponent,
    SettingsComponent,
    BusinessHoursComponent,
    DateRangePickerComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AgGridModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[ConfigService,UtilityService,ToasterService,ModalService],
  exports:[RouterModule]
})
export class BackofficeModule { }
