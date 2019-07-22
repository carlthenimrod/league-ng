import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TemplateComponent } from './template.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    TemplateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TemplateComponent
  ]
})
export class TemplateModule { }
