import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../app/core/material.module';
import { SearchWidgetAppComponent } from './search-widget-app.component';

import { HotelsComponent } from '../app/search-widget/hotels/hotels.component';
import { CitybreaksComponent } from '../app/search-widget/citybreaks/citybreaks.component';

import { AutoSuggestService } from '../app/core/services/auto-suggest.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../app/core/services/api.service';
import { CommonService } from '../app/core/services/common-service';

import { TranslateModule, TranslateParser, TranslateService } from '@ngx-translate/core';
import { TranslateICUParser } from 'ngx-translate-parser-plural-select';
import { CoreModule } from '../app/core/core.module';
import { getCurrentLanguage } from '../app/core/locale.helper';
import { DatePipe } from '@angular/common';
import { DeeplinkSearchService } from '../app/core/services/deeplink-search.service';
//import { FlexLayoutModule } from '@angular/flex-layout';

import { PackagesBarModule } from '../app/search-widget/packages-bar/packages-bar.module';
import { SharedModule } from '../app/shared/shared.module';
import { MetaSearchService } from '../app/core/packages-search/services/meta-search.service';
import { AnalyticsService } from '../app/core/services/analytics.service';
import { DeviceService } from '../app/core/services/device.service';
import { PackagesBarComponent } from './search-widget/packages-bar/packages-bar.component';
import { OwatDirective } from './core/directives/owat.directive';

@NgModule({
  declarations: [
    SearchWidgetAppComponent,
    HotelsComponent,
    CitybreaksComponent,
    OwatDirective,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MaterialModule, CoreModule, SharedModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,// FlexLayoutModule,
    /**
    * The internationalization (i18n) library for Angular 2+.
    */
    TranslateModule.forRoot({
      parser: {
        provide: TranslateParser,
        useClass: TranslateICUParser,
      },
    }),
    PackagesBarModule,
  ],
  providers: [
    AnalyticsService,
    ApiService,
    AutoSuggestService,
    CommonService,
    DatePipe,
    DeeplinkSearchService,
    DeviceService,
    MetaSearchService,
  ],
  bootstrap: [SearchWidgetAppComponent],
  entryComponents: [
    PackagesBarComponent,
    HotelsComponent,
    CitybreaksComponent,
  ],
})
export class SearchWidgetAppModule {
  constructor(translate: TranslateService) {
    const lang = getCurrentLanguage();
    const translations = require(`../i18n/${lang}.json`);
    translate.setTranslation(lang, translations);
    translate.setDefaultLang(lang);
    translate.use(lang);
  }
}
