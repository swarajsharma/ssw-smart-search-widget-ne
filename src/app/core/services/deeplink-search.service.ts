import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Room, CityDeepLinkParams, HotelDeepLinkParams, DeepLinkParams } from '../../../app/core/rooms.interface';
import { HotelsComponent } from '../../../app/search-widget/hotels/hotels.component';
import { CitybreaksComponent } from '../../../app/search-widget/citybreaks/citybreaks.component';
import { CommonService } from './common-service';
import { HttpParams } from '@angular/common/http';

/**
 * Deeplink searchservice is used for constructing the deeplink URL and redirects the end user based on the market.
 * @export
 * @class DeeplinkSearchService
 */
@Injectable()
export class DeeplinkSearchService {
  /**
   * Creates an instance of DeeplinkSearchService.
   * @param {DatePipe} datePipe
   * @param {CommonService} commonService
   * @memberof DeeplinkSearchService
   * @returns {void}
   */
  constructor(private datePipe: DatePipe, public commonService: CommonService) { }

  // Gets the duration of the stay.
  getDuration(checkInDate: Date, checkOutDate: Date) {
    const checkIn = this.datePipe.transform(checkInDate, 'yyyy-MM-dd');
    const checkOut = this.datePipe.transform(checkOutDate, 'yyyy-MM-dd');
    return `${checkIn}/${checkOut}`;
  }
  /**
   * Room selector options are provided by the user like number of rooms and total number
   * of adults,childrens and their age are provided to construct deeplink.
   * @param {Room[]} rooms
   * @param {HttpParams} params
   * @param {DeepLinkParams} deepLinkParamsMap
   * @returns {roomDeepLink}
   * @memberof DeeplinkSearchService
   */
  getRoomDeepLink(rooms: Room[], params: HttpParams, deepLinkParamsMap: DeepLinkParams) {
    const numOfRooms = rooms.length;
    params = params.set(`${deepLinkParamsMap.NUM_OF_ROOM}`, numOfRooms.toString());
    for (const room of rooms) {
      params = (numOfRooms === 1) ?
        params.set(`${deepLinkParamsMap.ROOM_ONE_ADULT_COUNT}`, room['adults'].toString()) :
        params.set(`${deepLinkParamsMap.NUM_OF_ADULT}${room['roomNo']}`, room['adults'].toString());
      const numOfChildren = room['childrenList'].length;
      const children = room['childrenList'];
      if (numOfChildren) {
        params = (numOfRooms === 1) ?
          params.set(`${deepLinkParamsMap.ROOM_ONE_CHILD_COUNT}`, numOfChildren.toString()) :
          params.set(`${deepLinkParamsMap.NUM_OF_CHILD}${room['roomNo']}`, numOfChildren.toString());
        for (const child of children) {
          const childAgeKey = deepLinkParamsMap.ROOM + room['roomNo'] + deepLinkParamsMap.CHILD + child['childNo'] + deepLinkParamsMap.AGE;
          params = params.set(`${childAgeKey}`, child['childAge']);
        }
      }
    }
    return params;
  }
  /**
   * Based on the options selected from the SmartFill Api,Hotel Deeplink will be created
   * the options for airport,city,hotels and Traistations are passed accordingly.
   * @param {HotelsComponent} searchObj
   * @returns {Url}
   * @memberof DeeplinkSearchService
   */
  constructDeepLinkForHotel(searchObj: HotelsComponent) {
    let url = '';
    let params = new HttpParams();
    const rfrr = (environment.apiParams[environment.languages[environment.defaultLocale]])['rfrr'];
    if (rfrr) {
      params = params.set('rfrr', rfrr);
    }
    const langid = (environment.apiParams[environment.languages[environment.defaultLocale]])['langid'];
    if (langid) {
      params = params.set('langid', langid);
    }
    params = this.getRoomDeepLink(searchObj.occupation, params, HotelDeepLinkParams);
    const location = searchObj.selecedLocObj;
    let baseDomain = environment.expediaDomain + environment.hotelSubUrl;
    baseDomain += this.getDuration(searchObj.checkInDate, searchObj.checkOutDate);
    switch (location.Type) {
      case 'AIRPORT':
        params = params.set('SearchType', 'Place')
          .set('SearchArea', 'Airport')
          .set('PlaceName', location.AirportCode);
        break;
      case 'CITY':
        params = params.set('CityId', location.Id);
        break;
      case 'POI':
        params = params.set('SearchType', 'Place')
          .set('SearchArea', 'poi')
          .set('PlaceName', location.Keyword);
        break;
      default:
        url = '';
    }
    url = `${baseDomain}?${params.toString()}`;
    return url;
  }
  /**
   * Based on the options selected from the SmartFill Api,Citybreaks Deeplink will be created
   * the options for airport,city,hotels and Traistations are passed accordingly.
   * @param {HotelsComponent} searchObj
   * @returns {Url}
   * @memberof DeeplinkSearchService
   */
  constructDeepLinkForCitybreaks(searchObj: CitybreaksComponent) {
    let url = '';
    let params = new HttpParams();
    const rfrr = (environment.apiParams[environment.languages[environment.defaultLocale]])['rfrr'];
    if (rfrr) {
      params = params.set('rfrr', rfrr);
    }
    const langid = (environment.apiParams[environment.languages[environment.defaultLocale]])['langid'];
    if (langid) {
      params = params.set('langid', langid);
    }
    if (searchObj.nonStopFlight) {
      params = params.set('Direct', '1');
    }
    params = this.getRoomDeepLink(searchObj.occupation, params, CityDeepLinkParams)
      .set('FromAirport', searchObj.selectedOrgin.AirportCode)
      .set('Destination', searchObj.selectedDestination.AirportCode)
      .set('cabinClass', searchObj.cabinClass);
    url = `${environment.expediaDomain}${environment.citybreakSubUrl}`;
    url += `${this.getDuration(searchObj.checkInDate, searchObj.checkOutDate)}?${params.toString()}`;
    return url;
  }
}
