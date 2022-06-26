import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { DashboardComponent } from './modules/backoffice/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackofficeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
