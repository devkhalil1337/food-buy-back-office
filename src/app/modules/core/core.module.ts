import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../backoffice/dashboard/dashboard.component';
import { ProductsComponent } from '../backoffice/products/products.component';
import { AddProductComponent } from '../backoffice/products/add-product/add-product.component';
const routes: Routes = [{
	path: 'dashboard',
	component: DashboardComponent
}, {
	path: 'products',
	component: ProductsComponent
}, {
	path: 'add-product',
	component: AddProductComponent
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
