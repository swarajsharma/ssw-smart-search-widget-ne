import {
  Component, ComponentFactoryResolver, ElementRef, HostBinding, OnInit,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';
import {
  stringToComponentMap,
  TabConfiguration,
  TabGroupConfiguration
} from './search-widget-app.interface';
import { DataLayerEventType } from './core/analytics.interface';
import { AnalyticsService } from './core/services/analytics.service';
import { MarketSpecific } from './core/market-specific.decorator';
import { MarketConfiguration } from './core/configurator.service';
import { config } from './search-widget-app.config';


@Component({
  selector: 'sw-root',
  templateUrl: './search-widget-app.component.html',
  styleUrls: ['./search-widget-app.component.scss'],
})
export class SearchWidgetAppComponent implements OnInit {

  @MarketSpecific(config)
  config: MarketConfiguration;

  @HostBinding('class') customClass = '';

  selectedTabIndex: number;
  previousTabIndex: number;

  stringToComponentMap = stringToComponentMap;
  tabsConfiguration: TabGroupConfiguration;

  constructor(
    private analyticsService: AnalyticsService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private translate: TranslateService,
    private elementRef: ElementRef,
  ) { }

  private loadConfiguration() {
    const element: HTMLElement = this.elementRef.nativeElement;
    const tabsAttrValue = element.getAttribute('tabs');
    const selectedTabAttrValue = element.getAttribute('selected-tab');
    const componentsToLoad: string[] = tabsAttrValue ?
      tabsAttrValue.replace(/ /g, '').split(',') :
      [];

    const marketConfig = this.config;
    const tabConfig: TabGroupConfiguration = (marketConfig.tabGroupConfig as TabGroupConfiguration);
    const currentPathName = window.document.location.pathname;

    if (componentsToLoad.length) {
      tabConfig.tabs = tabConfig.tabs
        .filter((componentConfig: TabConfiguration) => componentsToLoad.includes(componentConfig.component));
    }

    if (tabConfig.selectedIndexOverridingRules && tabConfig.selectedIndexOverridingRules.length) {
      tabConfig.selectedIndexOverridingRules = tabConfig.selectedIndexOverridingRules
        .filter((overridingRule) => {
          return currentPathName.includes(overridingRule.pathContains);
        });
    }

    tabConfig.selectedIndex = tabConfig.selectedIndexOverridingRules.length
      ? tabConfig.tabs.findIndex((tab) => tab.component === tabConfig.selectedIndexOverridingRules[0].select)
      : Math.min(Math.max(Number(selectedTabAttrValue), 0), tabConfig.tabs.length);

    this.tabsConfiguration = tabConfig;
    this.customClass = `${environment.market} ${this.tabsConfiguration.tabs.length <= 1 ? 'hide-tabs-bar' : ''}`;
    this.selectedTabIndex = 0;
    this.previousTabIndex = this.selectedTabIndex || 0;
  }

  selectedTabChanged(event: MatTabChangeEvent) {
    this.analyticsService.updateDataLayer({
      event: DataLayerEventType.domEvent,
      id: 'search-widget-toggle-tab',
      data: {
        value: this.tabsConfiguration.tabs[this.previousTabIndex].owData.data,
        selectedValue: this.tabsConfiguration.tabs[event.index].owData.data,
      },
    });
    this.previousTabIndex = event.index;
  }

  ngOnInit(): void {
    this.loadConfiguration();
  }

}
