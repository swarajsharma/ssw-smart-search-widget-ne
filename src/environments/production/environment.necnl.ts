export const environment = {
  production: true,
  apiServer: '',
  market: 'necnl',
  languages: {
    'nl-NL': 'necnl-nl',
  },
  defaultLocale: 'nl-NL',
  host: '',
  loginPage: '/login',
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
