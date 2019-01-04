import { TestBed } from '@angular/core/testing';
import { DeeplinkSearchService } from './deeplink-search.service';
import { DatePipe } from '@angular/common';
import { CommonService } from './common-service';
import { Room, DeepLinkParams } from '../rooms.interface';
import { HttpParams } from '@angular/common/http';
import { HotelsComponent } from '../../../app/search-widget/hotels/hotels.component';
import { CitybreaksComponent } from '../../../app/search-widget/citybreaks/citybreaks.component';
import { Location } from '../locations.interface';

describe('DeeplinkSearchService', () => {

  let service: DeeplinkSearchService;

  const searchObjCity = new CitybreaksComponent(service);
  const searchObjHolet = new HotelsComponent(service);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeeplinkSearchService, DatePipe, CommonService],
    });
    service = TestBed.get(DeeplinkSearchService);
  });

  it('should get deep link', () => {

    const rooms: Room[] = [{ roomNo: 1, adults: 1, childrenList: [{ childNo: 1, childAge: '10' }] }];
    const locOrgin: Location = { Id: '5392460', Keyword: 'London, England, UK (LHR-Heathrow)', Type: 'AIRPORT', AirportCode: 'LHR' };
    const locDest: Location = { Id: '2058', Keyword: 'Long Beach, California, United States of America', Type: 'CITY', AirportCode: 'LGB' };
    const params = new HttpParams();
    params.set('FromAirport', locOrgin.AirportCode);
    params.set('Destination', locDest.AirportCode);
    params.set('cabinClass', 'e');
    const deepLinkParamsMap: DeepLinkParams = {
      AGE: 'Age',
      CHILD: 'Child',
      NUM_OF_ADULT: 'NumAdult',
      NUM_OF_CHILD: 'NumChild',
      NUM_OF_ROOM: 'NumRoom',
      ROOM: 'Rm',
      ROOM_ONE_ADULT_COUNT: 'NumAdult',
      ROOM_ONE_CHILD_COUNT: 'NumChild',
    };
    const result = service.getRoomDeepLink(rooms, params, deepLinkParamsMap);
    expect(result.toString()).toEqual('NumRoom=1&NumAdult=1&NumChild=1&Rm1Child1Age=10');
  });
  it('should get deep link for Hotel', () => {
    const rooms: Room[] = [{ roomNo: 1, adults: 1, childrenList: [{ childNo: 1, childAge: '10' }] }];
    const locOrgin: Location = { Id: '5392460', Keyword: 'London, England, UK (LHR-Heathrow)', Type: 'AIRPORT', AirportCode: 'LHR' };
    searchObjHolet.occupation = rooms;
    searchObjHolet.selecedLocObj = locOrgin;
    searchObjHolet.checkInDate = new Date();
    searchObjHolet.checkOutDate = new Date();
    searchObjHolet.shouldShowCheckout = false;
    const result = service.constructDeepLinkForHotel(searchObjHolet);
    expect(result).toContain('Destination');
    expect(result).toContain('SearchType=Place');
    expect(result).toContain('SearchArea=Airport');
    expect(result).toContain('PlaceName=LHR');
  });
  it('should get deep link for Citybreaks', () => {
    const rooms: Room[] = [{ roomNo: 1, adults: 1, childrenList: [{ childNo: 1, childAge: '10' }] }];
    const locOrgin: Location = { Id: '5392460', Keyword: 'London, England, UK (LHR-Heathrow)', Type: 'AIRPORT', AirportCode: 'LHR' };
    const locDest: Location = { Id: '2058', Keyword: 'Long Beach, California, United States of America', Type: 'CITY', AirportCode: 'LGB' };
    searchObjCity.occupation = rooms;
    searchObjCity.cabinClass = 'e';
    searchObjCity.selectedOrgin = locOrgin;
    searchObjCity.checkInDate = new Date();
    searchObjCity.checkOutDate = new Date();
    searchObjCity.selectedDestination = locDest;
    const result = service.constructDeepLinkForCitybreaks(searchObjCity);
    expect(result).toContain('FlightHotel');
    expect(result).toContain('FromAirport=LHR');
    expect(result).toContain('Destination=LGB');
    expect(result).toContain('cabinClass=e');
  });

});
