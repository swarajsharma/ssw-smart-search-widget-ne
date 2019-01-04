import { storiesOf } from '@storybook/angular';
import { SharedModule } from '../../../app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CitybreaksComponent } from './citybreaks.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatSelectModule } from '@angular/material';
import { DeeplinkSearchService } from '../../core/services/deeplink-search.service';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../core/services/common-service';
import { AutoSuggestService } from '../../core/services/auto-suggest.service';
import { ApiService } from '../../core/services/api.service';


storiesOf('Search Widget|Citybreaks', module)
  .add('default', () => ({
    template: `
      <sw-citybreaks></sw-citybreaks>
    `,
    moduleMetadata: {
      imports: [
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TranslateModule,
        MatIconModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
      declarations: [
        CitybreaksComponent,
      ],
      providers: [
        DeeplinkSearchService,
        DatePipe,
        CommonService,
        AutoSuggestService,
        ApiService,
      ],
    },
  }));
