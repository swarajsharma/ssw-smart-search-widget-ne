import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AvailableDatesService } from './available-dates.service';
import { PackagesSearchService } from '../packages-search.service';

// Todo: implement unit tests
describe('AvailableDatesService', () => {

  let service: AvailableDatesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AvailableDatesService,
        PackagesSearchService,
      ],
    });
    service = TestBed.get(AvailableDatesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
