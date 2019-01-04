import { TestBed, inject } from '@angular/core/testing';
import { RecentSearchesService } from './recent-searches.service';
import { RecentSearchItem } from '../../../search-widget/packages-bar/packages-bar.interface';

describe('RecentSearchesService', () => {

  const url = 'https://www.thomascook.com/search';
  const searchItem: RecentSearchItem = {
    depAirport: [],
    goingTo: [],
    when: 'any',
    isFlexible: true,
    occupation: [{
      adults: 2,
      childrenList: [],
      roomNo: 1,
    }],
    duration: '0',
    url: `${url}?origin=Birmingham&goingTo=All%20Destinations&resortCode=any&when=any&duration=0&flexible=true&occupation=2`,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ RecentSearchesService ],
    });
  });

  afterEach(() => {
    localStorage.removeItem(RecentSearchesService.RECENT_SEARCHES_KEY);
  });

  it('should be created', inject([ RecentSearchesService ], (service: RecentSearchesService) => {
    expect(service).toBeTruthy();
  }));

  describe( 'getRecentSearches', () => {
    it('should return empty recent searches at the beginning', () => {
      const expectedResult: RecentSearchItem[] = [];
      expect(RecentSearchesService.getRecentSearches()).toEqual(expectedResult);
    });

    it('should return recent searches from local storage', () => {
      const expectedResult: RecentSearchItem[] = [searchItem];
      localStorage.setItem(RecentSearchesService.RECENT_SEARCHES_KEY, JSON.stringify([searchItem]));
      expect(RecentSearchesService.getRecentSearches()).toEqual(expectedResult);
    });
  });

  describe( 'addRecentSearch', () => {
    it('should be able to store recent search into local storage', () => {
      const expectedResult: RecentSearchItem[] = [searchItem];
      let recentSearches: RecentSearchItem[];

      expect(RecentSearchesService.addRecentSearch(searchItem)).toEqual(expectedResult);
      try {
        recentSearches = JSON.parse(localStorage.getItem(RecentSearchesService.RECENT_SEARCHES_KEY));
      } catch (e) {
        console.log('Error trying to parse value from local storage');
      }
      expect(recentSearches).toEqual(expectedResult);
    });
  });

});
