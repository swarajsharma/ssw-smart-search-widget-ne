import { environment } from '../../environments/environment';
import { Locale, Market, MarketLocale } from './interfaces';
import { getCurrentLocale } from './locale.helper';

const DEFAULT_MARKET = 'default';

export class Configurator {

  // 3 following methods are temporary and needed only for a demo hosted on cdn
  // @todo: they should be removed as soon as the widget is used on wcms static pages

  static getApiUrl(path: string): string {
    const url = Configurator.isCdn() ? Configurator.prepareApiUrl(path) : path;
    console.log(Configurator.isCdn(), path, url);
    return url;
  }

  static isCdn(): boolean {
    // temporary solution, so calling window directly is allowed
    return [
      'smart-search-widget-1-integration.thomascook.io',
      'smart-search-widget-1-qa.thomascook.io',
      'smart-search-widget-1-staging.thomascook.io',
      'smart-search-widget-1-production.thomascook.io',
      'scdn.thomascook.com',
      'origin.thomascook.com',
      'uk.integration.thomascook.io',
      'be.integration.thomascook.io',
      'uk.qa.thomascook.io',
      'be.qa.thomascook.io',
      'uk.staging.thomascook.io',
      'be.staging.thomascook.io',
      'www.thomascook.com',
      'www.neckermann.be',
      'nl.integration.thomascook.io',
      'nl.qa.thomascook.io',
      'nl.staging.thomascook.io',
      'www.neckermann.nl'
    ].includes(window.location.hostname);
  }

  static prepareApiUrl(path: string): string {
    return path.includes('/smartfill', 0)
      ? '/api/apim-expedia' + path
      : location.origin + path;
  }

  static getSearchResultsPageURL(): string {
    return environment.production ? `${environment.host}/search?` : `${environment.apiServer}/search?`;
  }

  prepare(config: Configuration): MarketConfiguration {
    return Object.keys(config).reduce((outputConfig: MarketConfiguration, key: string) => {

      const configEntity: ConfigurationItem = config[key];

      if (Array.isArray(configEntity)) {
        outputConfig[key] = this.isActiveForCurrentMarket(<Market[]>configEntity);
      } else if (typeof configEntity === 'object') {
        outputConfig[key] = this.getValueForCurrentMarket(<ConfigurationEntity>configEntity);
      }

      return outputConfig;
    }, {});
  }

  private isActiveForCurrentMarket(markets: Market[]): boolean {
    return markets.includes(<Market>environment.market);
  }

  private getValueForCurrentMarket(markets: ConfigurationEntity): ConfigurationEntityType {
    const locale = getCurrentLocale();
    const marketLocale = environment.languages[locale];
    return markets[locale] || markets[marketLocale] || markets[environment.market] || markets[DEFAULT_MARKET] || null;
  }
}

export type ConfigurationItem = Locale[] | Market[] | MarketLocale[] | ConfigurationEntity;
export interface Configuration {
  [propName: string]: ConfigurationItem;
}

export type ConfigurationEntityProp = 'default' | Locale | Market | MarketLocale;
export type ConfigurationEntityType = string | boolean | string[] | Object | RegExp;
export type ConfigurationEntity = {
  [prop in ConfigurationEntityProp]?: ConfigurationEntityType;
};

export interface MarketConfiguration {
  [propName: string]: ConfigurationEntityType;
}
