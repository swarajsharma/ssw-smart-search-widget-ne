export const environment = {
  production: true,
  apiServer: '',
  market: 'nenb',
  languages: {
    'nb-NO': 'nenb-no',
  },
  defaultLocale: 'nb-NO',
  host: '',
  loginPage: '/login',
  smartFillService: 'https://apim.expedia.com/smartfill',
  smartFillHeader: {
    'key': '3fa0646b-067c-4e37-a2e4-12dd43848959',
    'Partner-Transaction-ID': 'ThomasCook',
    'Accept': 'application/vnd.exp-smartfill.v1+json',
  },
  apiParams: {
    'nenb-no': { langid: '', locale: 'nb_NO', rfrr: 'sw'  },
  },
  headers: {
    'x-site-id': 'uk',
    'x-site-language': 'en',
  },
  expediaDomain: 'https://ww5.thomascook.com/',
  hotelSubUrl: 'go/hotel/search/Destination/',
  citybreakSubUrl: 'go/package/search/FlightHotel/',
};
