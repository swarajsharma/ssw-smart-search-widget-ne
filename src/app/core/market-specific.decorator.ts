import { Configuration, MarketConfiguration, Configurator } from './configurator.service';

export function MarketSpecific(config: Configuration): Function {
  return function(target: Object, key: string): void {
    Object.defineProperty(target, key, {
      configurable: false,
      get: () => <MarketConfiguration> (new Configurator()).prepare(config),
    });
  };
}

export type ConfigurationEntityType = string | boolean | string[] | Object | RegExp;

export interface MarketConfiguration {
  [propName: string]: ConfigurationEntityType;
}

