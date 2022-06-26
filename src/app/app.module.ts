import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { DashboardComponent } from './modules/backoffice/dashboard/dashboard.component';
import { CoreModule } from './modules/core/core.module';
import { UserAuthModule } from './modules/user-auth/user-auth.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackofficeModule,
    CoreModule,
    UserAuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
