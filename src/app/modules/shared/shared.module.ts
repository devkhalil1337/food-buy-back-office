import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinksRenderComponent } from './components/links-render/links-render.component';
import { RouterModule } from '@angular/router';
import { NgSelectizeModule } from 'ng-selectize';


@NgModule({
  declarations: [
    LinksRenderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectizeModule
  ],
  exports:[FormsModule,ReactiveFormsModule,NgSelectizeModule]
})
export class SharedModule { }
