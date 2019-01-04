export const environment = {
  production: false,
  apiServer: 'https://nl.integration.thomascook.io',
  market: 'necnl',
  languages: {
    'nl-NL': 'necnl-nl',
  },
  defaultLocale: 'nl-NL',
  host: 'http://127.0.0.1:4200',
  loginPage: '/account/login',
  smartFillService: 'https://apim.expedia.com/smartfill',
  smartFillHeader: {
    'key': '5b845c82-0da7-4f60-b92d-79922d813651',
    'Partner-Transaction-ID': 'ThomasCookNL',
    'Accept': 'application/vnd.exp-smartfill.v1+json',
  },
  apiParams: {
    'necnl-nl': { langid: '1043', locale: 'nl_NL', rfrr: 'sw'  },
  },
  headers: {
    'x-site-id': 'nl',
    'x-site-language': 'nl',
  },
  expediaDomain: 'https://ww5.neckermann.nl/',
  hotelSubUrl: 'go/hotel/search/Destination/',
  citybreakSubUrl: 'go/package/search/FlightHotel/',
};
