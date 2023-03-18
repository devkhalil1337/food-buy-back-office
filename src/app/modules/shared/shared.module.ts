import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinksRenderComponent } from './components/links-render/links-render.component';
import { RouterModule } from '@angular/router';
import { NgSelectizeModule } from 'ng-selectize';
import { RouterlinkrendererComponent } from './components/routerlinkrenderer/routerlinkrenderer.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';


@NgModule({
  declarations: [
    LinksRenderComponent,
    RouterlinkrendererComponent,
    SkeletonLoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectizeModule
  ],
  exports:[FormsModule,ReactiveFormsModule,NgSelectizeModule,SkeletonLoaderComponent]
})
export class SharedModule { }
