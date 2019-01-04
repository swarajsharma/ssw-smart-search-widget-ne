export const environment = {
  production: true,
  apiServer: '',
  market: 'necbe',
  languages: {
    'fr-BE': 'necbe-fr',
  },
  defaultLocale: 'fr-BE',
  host: '',
  loginPage: '/login',
  smartFillService: 'https://apim.expedia.com/smartfill',
  smartFillHeader: {
    'key': 'a66d17ab-0ea3-4e2b-877b-dcf76bd4e434',
    'POSa': 'BE',
    'Accept': 'application/vnd.exp-smartfill.v1+json',
  },
  apiParams: {
    'necbe-fr': { langid: '1036', locale: 'fr_BE', rfrr: 'sw'  },
  },
  headers: {
    'x-site-id': 'be',
    'x-site-language': 'fr',
  },
  expediaDomain: 'https://ww5.neckermann.be/',
  hotelSubUrl: 'go/hotel/search/Destination/',
  citybreakSubUrl: 'go/package/search/FlightHotel/',
};
