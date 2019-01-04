import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Room } from '../../../app/core/rooms.interface';
import { SearchFormValues } from '../../../app/search-widget/packages-bar/packages-bar.interface';
import { environment } from '../../../environments/environment';
import { Configuration, Configurator } from '../configurator.service';
import { MarketSpecific } from '../market-specific.decorator';
import { config } from './packages-search.config';
import { PackagesSearchMarketConfiguration, WhenParameter } from './packages-search.interface';
import { PackagesBarDatepickerAdapter } from '../../search-widget/packages-bar/packages-bar-datepicker/packages-bar-datepicker.adapter';
import { format } from 'date-fns';

@Injectable()
export class PackagesSearchService {

  private static SEARCH_URL = Configurator.getSearchResultsPageURL();

  /**
   * Generate correlation id that is included in headers for every call, used for tracking purposes
   * @returns {string}
   * @private
   * @static
   */
  private static generateCorrelationId(): string {
    return [
      Math.random().toString(36).substring(7),
      Math.random().toString(36).substring(7),
      Math.random().toString(36).substring(7),
    ].join('-');
  }

  /**
   * Build default headers for all the service calls to Package searches
   * @returns {headers: HttpHeaders}
   * @static
   */
  static buildHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders()
        .set('Content-type', 'application/json;charset=UTF-8')
        .set('x-correlation-id', PackagesSearchService.generateCorrelationId())
        .set('x-site-id', environment.headers['x-site-id'])
        .set('x-site-language', environment.headers['x-site-language']),
    };
  }

  /**
   * Serialize Room object to string for deep link parameter value
   * @param {Room} room
   * @returns {string}
   * @public
   * @static
   */
  static serializeRoomToStringParam(room: Room): string {
    const children = room.childrenList.reduce((accum, current) => {
      return `${accum},${current.childAge}`;
    }, '');
    return `${room.adults}${room.childrenList.length > 0 ? children : ''}`.replace('0', '1');
  }

  /**
   * Initialize search data
   * Default data retrieve from cookies storage if exist
   * @returns {SearchFormValues} Search form
   * @static
   */
  static initializeSearchData(): SearchFormValues {
    return {
      depAirport: [],
      goingTo: [],
      occupation: [{
        adults: 2,
        childrenList: [],
        roomNo: 1,
      }],
      isFlexible: true,
      when: 'any',
      duration: '0',
    };
  }

  /**
   * Build HttpParams object from current searchData form values
   * @param {SearchFormValues} searchFormValues
   * @returns {HttpParams}
   * @public
   */
  buildParams(searchFormValues: SearchFormValues): HttpParams {
    let params = new HttpParams();
    const when = this.getWhenParameterValue(searchFormValues.when);
    const marketConfig: PackagesSearchMarketConfiguration = this.config.defaultSearchValues as PackagesSearchMarketConfiguration;

    if (searchFormValues.depAirport.length) {
      searchFormValues.depAirport.forEach(function (element) {
        params = params.append('depAirport', element.code);
        params = params.append('sbDepAirport', element.code);
        params = params.append('origin', element.title);
      });
    } else {
      params = params.set('sbDepAirport', marketConfig.defaultAirportCode);
      params = params.set('depAirport', marketConfig.defaultAirportCode);
      params = params.set('origin', marketConfig.defaultAirportTitle);
    }

    if (searchFormValues.goingTo.length) {
      searchFormValues.goingTo.forEach(function (element) {
        params = params.append('goingTo', element.title);
        params = params.append('resortCode', element.code);
      });
    } else {
      params = params.set('resortCode', marketConfig.defaultDestinationCode);
      params = params.set('goingTo', marketConfig.defaultDestinationTitle);
    }

    if (searchFormValues.duration !== '0') {
      params = params.set('duration', searchFormValues.duration);
    }

    searchFormValues.occupation.forEach(function (element) {
      params = params.append('occupation', PackagesSearchService.serializeRoomToStringParam(element));
    });

    params = params.set('when', when.value);

    if (when.isWholeMonth) {
      params = params.set('month', when.month);
    }

    params = params.set('allAvailableDates', 'true');
    params = params.set('keepFilters', 'true');
    params = params.set('availability', 'true');
    params = params.set('start', '0');
    params = params.set('end', '9');
    params = params.set('flexible', (
      !when.isWholeMonth &&
      when.value !== marketConfig.whenAnyCode &&
      searchFormValues.isFlexible
    ).toString());
    params = params.set('sort', 'recommendation_asc');

    return params;
  }

  /**
   * Build Http link from current searchData selected
   * @param {SearchFormValues} searchData
   * @returns {string}
   * @public
   */
  buildDeepLinkFromSearchFormValues(searchData: SearchFormValues): string {
    return PackagesSearchService.SEARCH_URL + this.buildParams(searchData).toString();
  }

  @MarketSpecific(config)
  config: Configuration;

  constructor() { }

  private getWhenParameterValue(when: string): WhenParameter {
    const marketConfig: PackagesSearchMarketConfiguration = this.config.defaultSearchValues as PackagesSearchMarketConfiguration;
    const wholeMonthRegExp = new RegExp(`^${PackagesBarDatepickerAdapter.MONTH_SHORT_NAMES.join('|')} [0-9]{4}`);
    const whenParameter: WhenParameter = {
      isWholeMonth: false,
      value: when,
    };

    if (when !== 'any') {
      if (wholeMonthRegExp.test(when)) {
        whenParameter.value = marketConfig.wholeMonthCode;
        whenParameter.month = format(when, 'MM-YYYY');
        whenParameter.isWholeMonth = true;
      } else {
        whenParameter.value = format(when, 'YYYYMMDD');
      }
    } else {
      whenParameter.value = marketConfig.whenAnyCode;
    }
    return whenParameter;
  }

}
