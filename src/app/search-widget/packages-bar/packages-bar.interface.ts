import { Room } from '../../../app/core/rooms.interface';

export interface SearchFormValues {
  depAirport: DepAirport[];
  goingTo: GoingTo[];
  isFlexible: boolean;
  occupation: Room[];
  when: string;
  duration: string;
}

export interface GoingTo {
  title: string;
  value: string;
  code: string;
}

export interface DepAirport {
  title: string;
  value: string;
  code: string;
}

/**
 * Tooltips
 */
export interface TooltipEntity {
  title: string;
  value: string;
  code?: string;
  checked?: boolean;
  disabled?: boolean;
}

/**
 * Datepicker
 */
export interface AvailableDate {
  value: string;
  count: number;
}

export interface DatepickerDropdownItem {
  value: string;
  viewValue: string;
  disabled?: boolean;
}

/**
 * Recent searches
 */
export interface RecentSearchItem {
  depAirport: DepAirport[];
  goingTo: GoingTo[];
  isFlexible: boolean;
  occupation: Room[];
  when: string;
  duration: string;
  url: string;
}
