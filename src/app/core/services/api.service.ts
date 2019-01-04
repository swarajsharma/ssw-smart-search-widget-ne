import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Locations } from '../locations.interface';
import { map } from 'rxjs/operators';
import { Configurator } from '../configurator.service';
/**
 * Common service that is called for retriving the result from the SmartFill API
 * and the environment variables are retrived accordingly.
 * @export
 * @class ApiService
 */
@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  getLocations(apiUrl: string, httpHeader: object) {
    return this.httpClient.get<Locations>(Configurator.getApiUrl(apiUrl), httpHeader).pipe(
      map(res => {
        return res;
      }),
    );
  }
}
