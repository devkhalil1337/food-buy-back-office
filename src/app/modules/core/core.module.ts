import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [HeaderComponent, SidepanelComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports:[HeaderComponent,SidepanelComponent,FooterComponent]
})
export class CoreModule { }
