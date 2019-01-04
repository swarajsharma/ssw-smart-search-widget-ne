import { Injectable } from '@angular/core';
/**
 * Common Service for Category based Icons Display.
 * @export
 * @class CommonService
 */
@Injectable()
export class CommonService {
  public locationIcons: { [key: string]: string } = {
    'AIRPORT': 'local_airport',
    'CITY': 'location_on',
    'NEIGHBORHOOD': 'location_on',
    'ADDRESS': 'location_on',
    'HOTEL': 'hotel',
    'TRAINSTATION': 'train',
    'POI':'location_on',
    'MULTIREGION':'location_on'
  };
  constructor() {
  }
}
