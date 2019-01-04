/* Property name's of location interface can't be lower camel case as it is mapped according to
the smartFill API response.*/
export interface Location {
  Id: string;
  Keyword: string;
  Type: string;
  AirportCode: string;
}

/* Property name's of locations interface can't be lower camel case as it is mapped according to
the smartFill API response.*/
export interface Locations {
  Locations: Array<Location>;
  TransactionId: string;
}

export const HotelDefaults = {
  LOCATION_TYPE: 19,
  PRODUCT_TYPE: 'HOTEL',
};

export const CityDefaults = {
  LOCATION_TYPE_ORIGIN: 1,
  LOCATION_TYPE_DESTINATION: 3,
  PRODUCT_TYPE: 'FH',
};
