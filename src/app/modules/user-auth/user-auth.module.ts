import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';
import { JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from '@shared';
import { RouterModule, Routes } from '@angular/router';


export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

const routes: Routes = [{
  path:'login',
  component:LoginComponent
}];


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    }),
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class UserAuthModule { }
