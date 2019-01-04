import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlatformModule } from '@angular/cdk/platform';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule, MatChipsModule, MatInputModule, MatDatepickerModule, MatSelectModule,
  MatDialogModule, MatCheckboxModule, MatAutocompleteModule, MatIconModule, MatNativeDateModule,
} from '@angular/material';
import { PackagesBarComponent } from './packages-bar.component';
import { PackagesBarRecentSearchesComponent } from './packages-bar-recent-searches/packages-bar-recent-searches.component';
import { PackagesBarTooltipComponent } from './packages-bar-tooltip/packages-bar-tooltip.component';
import { PackagesBarDatepickerComponent } from './packages-bar-datepicker/packages-bar-datepicker.component';
import { PackagesBarDurationComponent } from './packages-bar-duration/packages-bar-duration.component';
import {
  PackagesBarTooltipDialogComponent,
} from './packages-bar-tooltip/packages-bar-tooltip-dialog/packages-bar-tooltip-dialog.component';
import { UniversalTranslateModule } from '../../../app/core/translate-loader.module';
import { SharedModule } from '../../../app/shared/shared.module';
import { ServicesModule } from '../../../app/core/services/services.module';
import { AvailableDatesService } from '../../../app/core/packages-search/services/available-dates.service';
import { RecentSearchesService } from '../../../app/core/packages-search/services/recent-searches.service';
import { PackagesSearchService } from '../../core/packages-search/packages-search.service';
import {
  PackagesBarDatepickerHeaderComponent,
} from './packages-bar-datepicker/packages-bar-datepicker-header/packages-bar-datepicker-header.component';
import { PackagesBarDatepickerEmitter } from './packages-bar-datepicker/packages-bar-datepicker.emitter';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatIconModule,
    UniversalTranslateModule,
    ServicesModule,
    PlatformModule,
  ],
  exports: [
    PackagesBarComponent,
    PlatformModule,
  ],
  declarations: [
    PackagesBarComponent,
    PackagesBarRecentSearchesComponent,
    PackagesBarTooltipComponent,
    PackagesBarTooltipDialogComponent,
    PackagesBarDatepickerComponent,
    PackagesBarDurationComponent,
    PackagesBarDatepickerHeaderComponent,
  ],
  entryComponents: [
    PackagesBarTooltipDialogComponent,
    PackagesBarDatepickerHeaderComponent,
  ],
  providers: [
    AvailableDatesService,
    PackagesSearchService,
    RecentSearchesService,
    PackagesBarDatepickerEmitter,
  ],
})
export class PackagesBarModule {}
