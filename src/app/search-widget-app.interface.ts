import { PackagesBarComponent } from './search-widget/packages-bar/packages-bar.component';
import { HotelsComponent } from './search-widget/hotels/hotels.component';
import { CitybreaksComponent } from './search-widget/citybreaks/citybreaks.component';

export interface TabConfiguration {
  tabIcon: string;
  tabLabelKey: string;
  component: string;
  owData?: {
    id: string,
    data: string;
  };
}

export interface SelectedIndexOverridingRule {
  pathContains: string;
  select: string;
}

export interface TabGroupConfiguration {
  tabs: TabConfiguration[];
  selectedIndex?: number;
  selectedIndexOverridingRules?: SelectedIndexOverridingRule[];
}

export const stringToComponentMap = { PackagesBarComponent, HotelsComponent, CitybreaksComponent };
