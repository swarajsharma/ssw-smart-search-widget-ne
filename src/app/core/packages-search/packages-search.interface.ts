import { AvailableDate } from '../../search-widget/packages-bar/packages-bar.interface';

export interface AcceptanceCriteria {
  multiRoom: boolean;
  thresholdCountGT: number;
}

export interface SearchParams {
  resortCategory?: string;
  commercialDestination?: string[];
  type: string;
  value: string | string[];
}

export interface Provider {
  accept: AcceptanceCriteria;
  connectorCode: number;
  endpoint: string;
  searchParams: SearchParams;
}

export interface Location {
  code: string;
  providers: Provider[];
  title: string;
}

export interface Locations {
  destinations?: Location[];
  hotels?: Location[];
  airports?: Location[];
  pagination?: {};
}

export interface PackagesSearchMarketConfiguration {
  defaultAirportCode: string;
  defaultAirportTitle: string;
  defaultDestinationCode: string;
  defaultDestinationTitle: string;
  whenAnyCode: string;
  wholeMonthCode: string;
}

export interface AvailableDatesResponse {
 availableDates: { options: AvailableDate[] };
}

export interface WhenParameter {
  isWholeMonth: boolean;
  value: string;
  month?: string; // Optional property if value === 'wholeMonth'
}
