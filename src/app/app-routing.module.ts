import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/backoffice/dashboard/dashboard.component';

const routes: Routes = [{
	path: "",
	redirectTo: "dashboard",
	pathMatch: "full"
}, {
	path: 'dashboard',
	component: DashboardComponent
}, {
	path: '',
	// canActivate: [AuthGuard],
	loadChildren: () =>
		import('./modules/backoffice/backoffice.module').then(
			(m) => m.BackofficeModule),
}, {
	path: '',
	loadChildren: () =>
		import('./modules/core/core.module').then(
			(m) => m.CoreModule),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
