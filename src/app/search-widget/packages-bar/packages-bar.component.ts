import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';

import { MarketSpecific } from '../../../app/core/market-specific.decorator';
import { MarketConfiguration } from '../../../app/core/configurator.service';
import { config } from './packages-bar.config';
import { Room } from '../../../app/core/rooms.interface';
import { SearchFormValues, AvailableDate, RecentSearchItem } from './packages-bar.interface';
import { PackagesBarRecentSearchesComponent } from './packages-bar-recent-searches/packages-bar-recent-searches.component';
import { AvailableDatesService } from '../../../app/core/packages-search/services/available-dates.service';
import { RecentSearchesService } from '../../../app/core/packages-search/services/recent-searches.service';
import { PackagesSearchService } from '../../../app/core/packages-search/packages-search.service';
import { PackagesBarDatepickerAdapter } from './packages-bar-datepicker/packages-bar-datepicker.adapter';
import { MY_DATE_FORMATS } from './packages-bar-datepicker/packages-bar-datepicker.config';

@Component({
  selector: 'sw-packages-bar',
  templateUrl: 'packages-bar.component.html',
  styleUrls: ['./packages-bar.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useFactory: (matDateLocale: string, platform: Platform, translateSrv: TranslateService): NativeDateAdapter => {
        return new PackagesBarDatepickerAdapter(matDateLocale, platform, translateSrv);
      },
      deps: [MAT_DATE_LOCALE, Platform, TranslateService],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesBarComponent implements OnInit {

  private static REG_EXP_MONTH_VALUE = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$');

  @ViewChild(PackagesBarRecentSearchesComponent) recentSearches: PackagesBarRecentSearchesComponent;

  @MarketSpecific(config)
  config: MarketConfiguration;

  searchForm: FormGroup;
  availableDates: AvailableDate[] = [];
  recentSearchItems: RecentSearchItem[] = [];
  hasAirportField = this.config.hasAirportField;
  showFlexibleCheckbox: boolean;

  private formValues: SearchFormValues;

  constructor(
    private fb: FormBuilder,
    private availableDatesService: AvailableDatesService,
    private packagesSearchService: PackagesSearchService,
  ) {}

  /**
   * On component initialization:
   * [1] - fetch recent searches from the localStorage
   * [2] - set up initial search form values
   * [3] - subscribe on form updates to fetch new available dates
   * @returns {void}
   */
  ngOnInit() {
    this.recentSearchItems = RecentSearchesService.getRecentSearches();
    this.formValues = PackagesSearchService.initializeSearchData();
    this.searchForm = this.fb.group({
      depAirport: [this.formValues.depAirport],
      goingTo: [this.formValues.goingTo],
      when: [this.formValues.when],
      isFlexible: [this.formValues.isFlexible],
      occupation: [this.formValues.occupation],
      duration: [this.formValues.duration],
    });
    this.availableDatesService.availableDates$
      .subscribe( (availableDates: AvailableDate[]) => {
        this.availableDates = availableDates;
      });
    this.searchForm.valueChanges.subscribe(() => {
      this.updateAvailableDates();
      this.formValues.isFlexible = this.showFlexibleCheckbox = PackagesBarComponent.REG_EXP_MONTH_VALUE
        .test(this.searchForm.value.when);
    });
    this.updateAvailableDates();
  }

  /**
   * Make search
   * Throws data to the Host (Search Application or Static pages)
   * - forming the query data to server should be placed to the Host
   * - PackagesBar Service - just encapsulates the Host's implementation
   * @returns {void}
   * @public
   */
  search(): void {
    const formValues = this.searchForm.getRawValue();
    const url = this.packagesSearchService.buildDeepLinkFromSearchFormValues(formValues);
    this.recentSearchItems = RecentSearchesService.addRecentSearch({
      ...formValues,
      url: url,
    } as RecentSearchItem);
    window.location.href = url;
  }

  /**
   * This method updates available dates triggering a call to service
   * @returns {void}
   * @public
   */
  updateAvailableDates(): void {
    this._checkAvailability(this.searchForm.getRawValue());
  }

  /**
   * This method updates the room configuration in the form
   * @param {Room[]} rooms
   * @returns {void}
   * @public
   */
  updateRoomConfiguration(rooms: Room[]): void {
    this.searchForm.controls['occupation'].setValue(rooms);
  }

  /**
   * Get available dates
   * @param {SearchFormValues} searchData
   * @returns {void}
   * @private
   */
  private _checkAvailability(searchData: SearchFormValues): void {
    this.availableDatesService.updateAvailableDates(searchData);
  }

}
