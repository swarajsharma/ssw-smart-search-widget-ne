import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AvailableDate, SearchFormValues } from '../../../search-widget/packages-bar/packages-bar.interface';
import { PackagesSearchService } from '../packages-search.service';
import { Configuration, Configurator } from '../../configurator.service';
import { config } from '../packages-search.config';
import { AvailableDatesResponse } from '../packages-search.interface';
import { MarketSpecific } from '../../market-specific.decorator';
import { filter } from 'rxjs/operators';
import { AvailabilityMapping } from '../../../search-widget/packages-bar/packages-bar-datepicker/packages-bar-datepicker.interface';

@Injectable()
export class AvailableDatesService {

  private static readonly AVAILABILITY_URL = Configurator.getApiUrl('/api/availability?');

  private _availableDates = new BehaviorSubject<AvailableDate[]>([]);
  availableDates$ = this._availableDates.asObservable();

  @MarketSpecific(config)
  config: Configuration;

  constructor(
    private http: HttpClient,
    private packagesSearchService: PackagesSearchService,
  ) { }

  /**
   * This method retrieves the last available dates loaded from service
   * @returns {AvailableDate[]}
   */
  getAvailableDates(): AvailableDate[] {
    return this._availableDates.getValue();
  }

  /**
   * This method returns the next available date from the date passed as parameter
   * @param date
   * @returns {string | null}
   */
  getNextAvailableDate(date: string): string | null {
    const nextAvailableDates = this._availableDates.getValue()
      .filter((availableDate) => {
        return availableDate.value > date;
      });
    return nextAvailableDates.length ? nextAvailableDates[0].value : null;
  }

  /**
   * This method perform a GET request and updates the state of available dates
   * @param searchFormValues
   * @returns {void}
   */
  updateAvailableDates(searchFormValues: SearchFormValues): void {
    this.http.get(
  `${AvailableDatesService.AVAILABILITY_URL}${this.packagesSearchService.buildParams(searchFormValues).toString()}`,
      PackagesSearchService.buildHeaders(),
    ).pipe(
      filter((data: AvailableDatesResponse) => !!data),
    ).subscribe((result: AvailableDatesResponse) => {
      this._availableDates.next(result.availableDates.options);
    });
  }

  /**
   * This method returns if month from date passed as parameter has any available date
   * @param date
   * @returns {boolean}
   */
  monthHasAvailableDates(date: Date): boolean {
    const availableDates = this.getAvailableDates();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const regExpCurrentMonth = new RegExp(`^${year}-${month}-[0-9]{1,2}$`);
    return availableDates.filter((availableDate) => regExpCurrentMonth.test(availableDate.value)).length > 0;
  }

  /**
   * This method returns an object mapping with the current available dates like the following:
   * {
   *   2018: ['01', '02', '03'],
   *   2019: ['09', '11', '12'],
   * }
   * @returns {AvailabilityMapping}
   */
  getAvailabilityMapping(): AvailabilityMapping {
    const yearMonthsMapping = {};
    this.getAvailableYears().forEach((year) => {
      yearMonthsMapping[year] = this.getAvailableDates()
        .filter((date: AvailableDate) => date.value.indexOf(year) !== -1)
        .map((date) => date.value
          .replace(new RegExp('-[0-9]{2}$'), '')
          .replace(new RegExp('^[0-9]{4}-'), ''),
        )
        .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index)
        .sort();
    });
    return yearMonthsMapping;
  }

  private getAvailableYears(): string[] {
    const regExpMonthDay = new RegExp('-[0-9]{2}-[0-9]{2}$');
    return this.getAvailableDates()
      .map((date) => date.value.replace(regExpMonthDay, ''))
      .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
  }
}
