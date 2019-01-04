export interface Room {
  roomNo: number;
  adults: number;
  childrenList: Children[];
}

export interface Children {
  childNo: number;
  childAge: string;
}

export interface Properties {
  roomNo: number;
  expandPanel: boolean;
  enableRemove: boolean;
  enableEditSearch: boolean;
}

export interface SelectedDefaults {
  rooms: Room[];
  defaults: Defaults;
  isChildLimtPerPage: boolean;
}

export interface Defaults {
  maxRooms: number;
  maxGuests: number;
  maxAdults: number;
  maxChildren: number;
  maxChildAge: number;
  minAdults: number;
  minChildren: number;
  minRooms: number;
  minGuests: number;
}

export enum MaxDefaults {
  MaxRooms = 3,
  MaxGuests = 9,
  MaxAdults = 9,
  MaxChildren = 6,
  MaxChildAge = 17,
}

export enum MinDefaults {
  MinAdults = 1,
  MinChildren = 0,
  MinRooms = 1,
  MinGuests = 2,
}

/* Property names of DeepLinkParams interface can't be camel case as it is defined according to
the CityDeepLinkParams and HotelDeepLinkParams.*/
export interface DeepLinkParams {
  NUM_OF_ROOM: string;
  NUM_OF_ADULT: string;
  NUM_OF_CHILD: string;
  ROOM: string;
  CHILD: string;
  AGE: string;
  ROOM_ONE_ADULT_COUNT: string;
  ROOM_ONE_CHILD_COUNT: string;
}

export const CityDeepLinkParams = {
  NUM_OF_ROOM: 'NumRoom',
  NUM_OF_ADULT: 'NumAdult-Room',
  NUM_OF_CHILD: 'NumChild-Room',
  ROOM: 'Room',
  CHILD: '-Child',
  AGE: 'Age',
  ROOM_ONE_ADULT_COUNT: 'NumAdult',
  ROOM_ONE_CHILD_COUNT: 'NumChild',
};

export const HotelDeepLinkParams = {
  NUM_OF_ROOM: 'NumRoom',
  NUM_OF_ADULT: 'NumAdult',
  NUM_OF_CHILD: 'NumChild',
  ROOM: 'Rm',
  CHILD: 'Child',
  AGE: 'Age',
  ROOM_ONE_ADULT_COUNT: 'NumAdult',
  ROOM_ONE_CHILD_COUNT: 'NumChild',
};
/* CalendarConfig to setup calendar logic in citybreak and hotel tabs.*/
export const CalendarConfig = {
  MaxDaysCityBreak: 329,
  MaxDaysHotelBreak: 500,
  MaxCheckoutDaysCityBreak: 26,
  MaxCheckoutDaysHotel: 28,
  DefaultCheckoutDays: 1,
}
/* AgeConfig to setup age logic in room selector.*/
export const AgeConfig = {
  InfantAgeLimit: 2,
}
