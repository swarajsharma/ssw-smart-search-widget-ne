import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaSearchService } from '../../../app/core/packages-search/services/meta-search.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    MetaSearchService,
  ],
})
export class ServicesModule { }
