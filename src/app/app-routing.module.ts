import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessProfileComponent } from './modules/backoffice/business-profile/business-profile.component';
import { AddCategoryComponent } from './modules/backoffice/category/add-category/add-category.component';
import { CategoryComponent } from './modules/backoffice/category/category.component';
import { AddChoiceComponent } from './modules/backoffice/choice-groups/add-choice/add-choice.component';
import { ChoiceGroupsComponent } from './modules/backoffice/choice-groups/choice-groups.component';
import { DashboardComponent } from './modules/backoffice/dashboard/dashboard.component';
import { OrderDetailsComponent } from './modules/backoffice/orders/order-details/order-details.component';
import { OrdersComponent } from './modules/backoffice/orders/orders.component';
import { AddProductComponent } from './modules/backoffice/products/add-product/add-product.component';
import { ProductsComponent } from './modules/backoffice/products/products.component';
import { AuthGuard } from './modules/core';
import { CoreModule } from './modules/core/core.module';

const routes: Routes = [{
	path: "",
	redirectTo: "dashboard",
	pathMatch: "full"
},{
	path:'',
	canActivate: [AuthGuard],
	loadChildren: () =>
		import('./modules/backoffice/backoffice.module').then(
			(m) => m.BackofficeModule),
},
];

@NgModule({
  imports: [
	CoreModule,
	RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
