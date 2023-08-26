import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AgGridModule } from 'ag-grid-angular';
import { ConfigService, UtilityService, ToasterService, SharedModule } from '@shared';
import { DateRangePickerComponent } from '../shared/components';
import { ModalService } from '../shared/modal.service';
import { AddCategoryComponent, AddChoiceComponent, AddProductComponent, BusinessHoursComponent, BusinessProfileComponent, CategoryComponent, ChoiceGroupsComponent, DashboardComponent, OrderDetailsComponent, OrdersComponent, PaymentSettingsComponent, ProductsComponent, SettingsComponent, UserComponent } from '@modeuls';
import { MenusComponent } from './menus/menus.component';

const routes: Routes = [{
  path: 'dashboard',

  component: DashboardComponent
}, {
  path: 'products',

  component: ProductsComponent
}, {
  path: 'add-product',

  component: AddProductComponent
}, {
  path: 'category',

  component: CategoryComponent
}, {
  path: 'add-category',

  component: AddCategoryComponent
}, {
  path: 'orders',

  component: OrdersComponent
}, {
  path: 'orders/:id',

  component: OrderDetailsComponent
}, {
  path: 'business-profile',

  component: BusinessProfileComponent
}, {
  path: 'choice-groups',

  component: ChoiceGroupsComponent
}, {
  path: 'add-choice',

  component: AddChoiceComponent
}, {
  path: 'settings',
  component: SettingsComponent
}, {
  path: 'business-hours',
  component: BusinessHoursComponent
}, {
  path: 'internal-users',
  component: UserComponent
}, {
  path: 'payment-settings',
  component: PaymentSettingsComponent
}, {
  path: 'menus',
  component: MenusComponent
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
    UserComponent,
    PaymentSettingsComponent,
    MenusComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AgGridModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [ConfigService, UtilityService, ToasterService, ModalService],
  exports: [RouterModule]
})
export class BackofficeModule { }
