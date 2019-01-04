import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Locations } from '../../../core/packages-search/packages-search.interface';
import { MetaSearchService } from './meta-search.service';

// Todo: implement unit tests
describe('MetaSearchService', () => {

  let service: MetaSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        MetaSearchService,
      ],
    });
    service = TestBed.get(MetaSearchService);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('getOrigins', () => {
    it('should get origins via POST request given a search text', () => {
      const expectedResponse: Locations = {
        airports: [{
          code: 'BHX',
          providers: [],
          title: 'Birmingham',
        }],
        pagination: {
          total: 1,
          start: 0,
        },
      };

      service.getOrigins('').subscribe((response: Locations) => {
        expect(response).toEqual(expectedResponse);
      });

      const request = httpMock.expectOne(MetaSearchService.HOST_URL);

      expect(request.request.method).toBe('POST');

      request.flush(expectedResponse);
    });
  });

  describe('getDestinations', () => {
    it('should get destinations via POST request given a search text', () => {
      const expectedResponse: Locations = {
        destinations: [
          {
            code: 'quarteira-algarve-portugal',
            title: 'Quarteira, Algarve, Portugal',
            providers: [
              {
                endpoint: 'solr',
                searchParams: {
                  resortCategory: 'Quarteira',
                  type: 'resortCategory',
                  value: 'Quarteira',
                },
                accept: {
                  thresholdCountGT: 1,
                  multiRoom: true,
                },
                connectorCode: 1,
              },
              {
                endpoint: 'multicom',
                searchParams: {
                  commercialDestination: ['1243.FAO'],
                  type: 'commercialDestination',
                  value: ['1243.FAO'],
                },
                accept: {
                  thresholdCountGT: 3,
                  multiRoom: false,
                },
                connectorCode: 2,
              },
            ],
          },
        ],
        pagination: {
          total: 1,
          start: 0,
        },
      };

      service.getDestinations('quarteira').subscribe((response: Locations) => {
        expect(response).toEqual(expectedResponse);
      });

      const request = httpMock.expectOne(MetaSearchService.HOST_URL);

      expect(request.request.method).toBe('POST');

      request.flush(expectedResponse);
    });
  });

});
