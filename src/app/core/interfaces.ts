export enum Markets {
  'nenb' = 'nenb',
  'ahuk' = 'ahuk',
  'necnl' = 'necnl',
  'necbe' = 'necbe',
  'tcbe' = 'tcbe',
}

export enum Locales {
  'en-GB' = 'en-GB',
  'nl-NL' = 'nl-NL',
  'nl-BE' = 'nl-BE',
  'fr-BE' = 'fr-BE',
}

export enum  MarketLocales {
  'nenb-no' = 'nb_NO',
  'ahuk-en' = 'ahuk-en',
  'necnl-nl' = 'necnl-nl',
  'necbe-nl' = 'necbe-fr',
  'necbe-fr' = 'necbe-fr',
  'tcbe-nl' = 'tcbe-nl',
  'tcbe-fr' = 'tcbe-fr',
}

export type Locale = keyof typeof Locales;
export type Market = keyof typeof Markets;
export type MarketLocale = keyof typeof MarketLocales;
