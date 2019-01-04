import { TestBed } from '@angular/core/testing';
import { PackagesSearchService } from './packages-search.service';

describe('PackagesSearchService', () => {
  let service: PackagesSearchService;
  const expectedHeaders = {
    contentType: 'application/json;charset=UTF-8',
    xCorrelationIdRegExp: '^[a-z0-9]{4,7}\\-[a-z0-9]{4,7}\\-[a-z0-9]{4,7}$',
    xSiteId: 'uk',
    xSiteLanguage: 'en',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackagesSearchService],
    });
    service = TestBed.get(PackagesSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve default headers for service calls', () => {
    const headers = PackagesSearchService.buildHeaders().headers;
    expect(headers).toBeTruthy();
    expect(headers.get('Content-Type')).toBe(expectedHeaders.contentType);
    expect(headers.get('x-correlation-id')).toMatch(new RegExp(expectedHeaders.xCorrelationIdRegExp));
    expect(headers.get('x-site-id')).toBe(expectedHeaders.xSiteId);
    expect(headers.get('x-site-language')).toBe(expectedHeaders.xSiteLanguage);
  });

});
