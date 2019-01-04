import { Configuration } from '../app/core/configurator.service';

const commonTabsConfiguration = [
  {
    id: 'holidays',
    tabIcon: 'beach_access',
    tabLabelKey: 'tabs.packages.title',
    component: 'PackagesBarComponent',
    owData: {
      id: 'tab-holidays',
      value: 'Holidays',
    },
  },
  {
    id: 'hotels',
    tabIcon: 'hotel',
    tabLabelKey: 'tabs.hotel.title',
    component: 'HotelsComponent',
    owData: {
      id: 'tab-hotels',
      value: 'Hotels',
    },
  },
  {
    id: 'city-breaks',
    tabIcon: 'flight',
    tabLabelKey: 'tabs.citybreaks.title',
    component: 'CitybreaksComponent',
    owData: {
      id: 'tab-city-breaks',
      value: 'City Breaks',
    },
  },
];

export const config: Configuration = {
  tabGroupConfig: {
    'nenb': {
      tabs: commonTabsConfiguration,
      selectedIndex: 0,
      selectedIndexOverridingRules: [
        { pathContains: '/hotels/', select: 'HotelsComponent' },
        { pathContains: '/holidays/city-breaks/', select: 'CitybreaksComponent' },
      ],
    },
    necbe: {
      tabs: commonTabsConfiguration,
      selectedIndex: 0,
      selectedIndexOverridingRules: [
        { pathContains: '/hotel/', select: 'HotelsComponent' },
        { pathContains: '/citytrip/', select: 'CitybreaksComponent' },
      ],
    },
    necnl: {
      tabs: commonTabsConfiguration,
      selectedIndex: 0,
      selectedIndexOverridingRules: [
        { pathContains: '/vakantie/', select: 'HotelsComponent' },
        { pathContains: '/stedentrip/', select: 'CitybreaksComponent' },
      ],
    },
  },
};
