import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../backoffice/dashboard/dashboard.component';
import { ProductsComponent } from '../backoffice/products/products.component';
import { AddProductComponent } from '../backoffice/products/add-product/add-product.component';
import { CategoryComponent } from '../backoffice/category/category.component';
import { AddCategoryComponent } from '../backoffice/category/add-category/add-category.component';
import { OrdersComponent } from '../backoffice/orders/orders.component';
import { OrderDetailsComponent } from '../backoffice/orders/order-details/order-details.component';
import { LoginComponent } from '../user-auth/login/login.component';
import { BusinessProfileComponent } from '../backoffice/business-profile/business-profile.component';
import { ChoiceGroupsComponent } from '../backoffice/choice-groups/choice-groups.component';
import { AddChoiceComponent } from '../backoffice/choice-groups/add-choice/add-choice.component';
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
  path:'login',
  component:LoginComponent
},{
  path:'business-profile',
  component:BusinessProfileComponent
},{
  path:'choice-groups',
  component:ChoiceGroupsComponent
},{
  path:'add-choice',
  component:AddChoiceComponent
}];

@NgModule({
  declarations: [HeaderComponent, SidepanelComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[HeaderComponent,SidepanelComponent,FooterComponent]
})
export class CoreModule { }
