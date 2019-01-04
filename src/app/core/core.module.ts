import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Configurator } from './configurator.service';
import { MAT_DATE_LOCALE } from '@angular/material';
import { environment } from '../../environments/environment';
@NgModule({
  imports: [ CommonModule ],
  exports: [

  ],
  providers: [ { provide: MAT_DATE_LOCALE, useValue: environment.defaultLocale }, Configurator ],
})
export class CoreModule { }
