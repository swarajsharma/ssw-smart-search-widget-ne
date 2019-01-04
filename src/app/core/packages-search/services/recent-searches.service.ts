import { Injectable } from '@angular/core';
import { RecentSearchItem } from '../../../search-widget/packages-bar/packages-bar.interface';

@Injectable()
export class RecentSearchesService {

  static readonly RECENT_SEARCHES_KEY = 'tc.recentSearches.new';
  static MAX_RECENT_SEARCHES = 4;

  constructor() { }

  static getRecentSearches(): RecentSearchItem[] {
    let recentSearches;

    // TODO: LocalStorage adapter
    try {
      recentSearches = JSON.parse(localStorage.getItem(RecentSearchesService.RECENT_SEARCHES_KEY));
    } catch (e) {}

    return recentSearches || [];
  }

  static addRecentSearch(searchItem: RecentSearchItem): RecentSearchItem[] {
    let recentSearches;

    try {
      recentSearches = JSON.parse(localStorage.getItem(RecentSearchesService.RECENT_SEARCHES_KEY)) || [];
      recentSearches.unshift(searchItem);
      recentSearches.length = Math.min(RecentSearchesService.MAX_RECENT_SEARCHES, recentSearches.length);

      localStorage.setItem(RecentSearchesService.RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
    } catch (e) {}

    return recentSearches;
  }

  static setRecentSearches(searchItems: RecentSearchItem[]): void {
    try {
      localStorage.setItem(RecentSearchesService.RECENT_SEARCHES_KEY, JSON.stringify(searchItems));
    } catch (e) {}
  }
}
