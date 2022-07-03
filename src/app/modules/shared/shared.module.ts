import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinksRenderComponent } from './components/links-render/links-render.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LinksRenderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[FormsModule,ReactiveFormsModule]
})
export class SharedModule { }
