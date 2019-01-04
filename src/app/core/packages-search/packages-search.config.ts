import { Configuration } from '../../../app/core/configurator.service';

export const config: Configuration = {
  defaultSearchValues: {
    'nenb-no': {
      defaultAirportCode: '0',
      defaultAirportTitle: 'Any Airport',
      defaultDestinationCode: 'any',
      defaultDestinationTitle: 'All Destinations',
      whenAnyCode: 'any',
      wholeMonthCode: 'wholeMonth',
    },
    'necbe-nl': {
      defaultAirportCode: '0',
      defaultAirportTitle: 'Alle luchthavens',
      defaultDestinationCode: '_any_',
      defaultDestinationTitle: 'Alle bestemmingen',
      whenAnyCode: 'any',
      wholeMonthCode: 'wholeMonth',
    },
    'necbe-fr': {
      defaultAirportCode: '0',
      defaultAirportTitle: 'Tous les aéroports',
      defaultDestinationCode: '_any_',
      defaultDestinationTitle: 'Toutes les destinations',
      whenAnyCode: 'any',
      wholeMonthCode: 'wholeMonth',
    },
    'necnl': {
      defaultAirportCode: '0',
      defaultAirportTitle: 'Alle luchthavens',
      defaultDestinationCode: 'alle-bestemmingen',
      defaultDestinationTitle: 'Alle bestemmingen',
      whenAnyCode: 'any',
      wholeMonthCode: 'wholeMonth',
    },
  },
};
