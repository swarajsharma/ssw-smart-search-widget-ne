import { Configuration, MarketConfiguration } from './configurator.service';
import { MarketSpecific } from './market-specific.decorator';

const inputConfig: Configuration = {
  value1: ['nenb'],
};

const outputConfig: MarketConfiguration = {
  value1: true,
};

describe('Decorator @MarketSpecific', () => {

  const decoratorFunction: Function = MarketSpecific(inputConfig);
  const someComponent = { config: '' };

  beforeEach(() => {
    decoratorFunction(someComponent, 'config');
  });

  it('should set config value on call', () => {
    // tslint:disable-next-line no-any
    expect(someComponent.config).toEqual(outputConfig as any);
  });

});
