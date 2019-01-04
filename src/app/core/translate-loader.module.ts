import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateParser, TranslateService } from '@ngx-translate/core';
import { getCurrentLanguage } from '../../app/core/locale.helper';
import { TranslateICUParser } from 'ngx-translate-parser-plural-select';
import { HttpLoaderFactory } from './internationalization.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      parser: {
        provide: TranslateParser,
        useClass: TranslateICUParser,
      },
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ],
      },
    }),
  ],
  exports: [TranslateModule],
})
export class UniversalTranslateModule {
  constructor(private translate: TranslateService) {
    const lang = getCurrentLanguage();
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }
}
