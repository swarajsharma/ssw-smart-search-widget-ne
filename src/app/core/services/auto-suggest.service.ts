import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { CommonService } from './common-service';
import { HttpParams } from '@angular/common/http';
/**
 * AutoSuggestService fetches the location airpots and hotels based on the keywords provided.
 * This service connects to smartfill API and retrives the result accordingly.
 * @export
 * @class AutoSuggestService
 */
@Injectable()
export class AutoSuggestService {

  constructor(private apiService: ApiService, public commonService: CommonService) { }
  /**
   * Gets the result form the SmartFill API based on the options provided for location
   * product type and types.
   * @param {string} keyword
   * @param {string} productType
   * @param {string} types
   * @returns {undefined}
   * @memberof AutoSuggestService
   */
  getLocations(keyword: string, productType: string, types: string) {
    const params = new HttpParams()
      .set('locationKeyword', keyword)
      .set('productType', productType)
      .set('types', types)
      .set('locale', (environment.apiParams[environment.languages[environment.defaultLocale]])['locale']);
    const apiUrl = this.httpBaseUrl() + `${params.toString()}`;
    return this.apiService.getLocations(apiUrl, { headers: this.httpHeaders() });
  }
  /**
   * Returns the header option for API Connectivity from environment variables.
   * @private
   * @returns {httpOptions}
   * @memberof AutoSuggestService
   */
  private httpHeaders() {
    return environment.smartFillHeader;
  }
  private httpBaseUrl() {
    return environment.smartFillService;
  }
}
