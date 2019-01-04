import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { Locations } from '../locations.interface';


describe('ApiService', () => {

  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get data from the api', () => {
    const dummyData: Locations = {
      Locations: [
        { Id: '5392460', Keyword: 'London, England, UK (LHR-Heathrow)', Type: 'AIRPORT', AirportCode: 'LHR' },
        { Id: '6341292', Keyword: 'Long Beach Island, Beach Haven, New Jersey, United States of America',
         Type: 'CITY', AirportCode: 'PHL' },
        { Id: '127357', Keyword: 'Long Island City, New York, United States of America', Type: 'CITY', AirportCode: 'NYC' },
        { Id: '2058', Keyword: 'Long Beach, California, United States of America', Type: 'CITY', AirportCode: 'LGB' },
        { Id: '6029611', Keyword: 'Long Beach, CA, United States (LGB-Long Beach Municipal)', Type: 'AIRPORT', AirportCode: 'LGB' },
        { Id: '8410', Keyword: 'Long Branch, New Jersey, United States of America', Type: 'CITY', AirportCode: 'EWR' },
        { Id: '5719884', Keyword: 'London, England, UK (LGW-Gatwick)', Type: 'AIRPORT', AirportCode: 'LGW' },
        { Id: '6122876', Keyword: 'Long Beach, New York, United States of America', Type: 'CITY', AirportCode: 'NYC' },
        { Id: '8409', Keyword: 'Longboat Key, Florida, United States of America', Type: 'CITY', AirportCode: 'TPA' }],
      TransactionId: 'b1740ae6-fc4a-4f36-8601-963239c811ef',
    };

    const params = new HttpParams()
      .set('locationKeyword', 'lon')
      .set('productType', 'HOTEL')
      .set('types', '643')
      .set('locale', (environment.apiParams[environment.languages[environment.defaultLocale]])['locale']);
    const apiUrl = `/smartfill?${params.toString()}`;

    service.getLocations(apiUrl, environment.smartFillHeader).subscribe(loc => {
      expect(loc.Locations).toEqual(dummyData.Locations);
    });
    const request = httpMock.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');
    request.flush(dummyData);
  });
});
