import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { RecentSearchItem } from '../packages-bar.interface';
import { RecentSearchesService } from '../../../../app/core/packages-search/services/recent-searches.service';

@Component({
  selector: 'sw-packages-bar-recent-searches',
  templateUrl: 'packages-bar-recent-searches.component.html',
  styleUrls: ['./packages-bar-recent-searches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesBarRecentSearchesComponent implements OnInit {
  @Input() recentSearches: RecentSearchItem[] = [];
  isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  market = '';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.market = environment.market;
  }

  getDurationTranslationKey(recentSearch: RecentSearchItem): string {
    return `searchBar.durationOptions.${recentSearch.duration}`;
  }

  getRecentSearchesTranslationKey(): string {
    return `recentSearches.${this.recentSearches.length === 1 ? 'singular' : 'plural'}`;
  }

  getDestinationTitle(recentSearch: RecentSearchItem): string {
    return recentSearch.goingTo.length ?
      recentSearch.goingTo.length > 1 ?
        `${recentSearch.goingTo.length} ${this.translate.instant('searchBar.destinations.suggestions.destinations')}` :
        recentSearch.goingTo[0].title : this.translate.instant('searchBar.destinations.default');
  }

  getDateText(recentSearch: RecentSearchItem): string {
    return (recentSearch.when === 'any') ? this.translate.instant('searchBar.datepicker.placeholder') : recentSearch.when;
  }

  getImFlexibleText(recentSearch: RecentSearchItem): string {
    return recentSearch.isFlexible ? this.translate.instant('searchBar.destinations.default') : '';
  }

  toggleRecent() {
    this.isOpen$.next(this.recentSearches.length && !this.isOpen$.getValue());
  }

  removeItem(item: RecentSearchItem): void {
    const itemIndex = this.recentSearches.indexOf(item);
    this.recentSearches.splice(itemIndex, 1);

    if (!this.recentSearches.length) {
      this.toggleRecent();
    }

    RecentSearchesService.setRecentSearches(this.recentSearches);
  }
}
