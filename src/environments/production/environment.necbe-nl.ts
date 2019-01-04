export const environment = {
  production: true,
  apiServer: '',
  market: 'necbe',
  languages: {
    'nl-BE': 'necbe-nl',
  },
  defaultLocale: 'nl-BE',
  host: '',
  loginPage: '/login',
  smartFillService: 'https://apim.expedia.com/smartfill',
  smartFillHeader: {
    'key': 'a66d17ab-0ea3-4e2b-877b-dcf76bd4e434',
    'POSa': 'BE',
    'Accept': 'application/vnd.exp-smartfill.v1+json',
  },
  apiParams: {
    'necbe-nl': { langid: '1043', locale: 'nl_BE', rfrr: 'sw'  },
  },
  headers: {
    'x-site-id': 'be',
    'x-site-language': 'nl',
  },
  expediaDomain: 'https://ww5.neckermann.be/',
  hotelSubUrl: 'go/hotel/search/Destination/',
  citybreakSubUrl: 'go/package/search/FlightHotel/',
};
