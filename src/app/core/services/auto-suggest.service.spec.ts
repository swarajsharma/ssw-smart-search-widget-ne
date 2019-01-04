import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AutoSuggestService } from './auto-suggest.service';
import { ApiService } from './api.service';
import { CommonService } from './common-service';

describe('AutoSuggestService', () => {

  let service: AutoSuggestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AutoSuggestService, ApiService, CommonService],
    });
    service = TestBed.get(AutoSuggestService);
  });

  it('should get data from the API Service', () => {
    const keyword = 'London, England, UK (LHR-Heathrow)';
    const productType = 'nu';
    const types = 'un';
    service.getLocations(keyword, productType, types).subscribe(result =>
      expect(result[0].length).toBeGreaterThan(0));
  });
});
