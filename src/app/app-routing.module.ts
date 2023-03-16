import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/core';
import { CoreModule } from './modules/core/core.module';

const routes: Routes = [{
	path:'',
	canActivate: [AuthGuard],
	loadChildren: () =>
		import('./modules/backoffice/backoffice.module').then(
			(m) => m.BackofficeModule),
}
];

@NgModule({
  imports: [
	CoreModule,
	RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
