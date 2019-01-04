import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Locations } from '../../../core/packages-search/packages-search.interface';
import { Configuration, Configurator } from '../../configurator.service';
import { PackagesSearchService } from '../packages-search.service';
import { MarketSpecific } from '../../market-specific.decorator';
import { config } from './meta-search.config';

@Injectable()
export class MetaSearchService {

  static readonly HOST_URL = Configurator.getApiUrl('/api/meta/search');

  private static buildDestinationParams(searchText: string) {
    return {
      entities: [{
        type: 'DESTINATIONS',
        limit: 10,
      }, {
        type: 'HOTELS',
        limit: 5,
      }],
      query: {
        keywords: searchText,
        constraints: {
          entityType: 'AIRPORTS',
          ids: ['0'],
        },
      },
    };
  }

  private static buildOriginsParams(searchText: string) {
    return {
      entities: [{
        type: 'AIRPORTS',
        limit: 10,
      }],
      query: {
        keywords: searchText,
        constraints: {
          entityType: 'DESTINATIONS',
          ids: ['any'],
        },
        popular: false,
        // Todo: include constraints for selected destinations
      },
    };
  }

  private static buildPopularOriginsParams() {
    return {
      entities: [{
        type: 'AIRPORTS',
        limit: 50,
      }],
      query: {
        constraints: {
          entityType: 'DESTINATIONS',
          ids: ['any'],
        },
        popular: true,
      },
    };
  }

  @MarketSpecific(config)
  config: Configuration;

  constructor(
    private http: HttpClient,
  ) { }

  private buildPopularDestinationParams() {
    return {
      entities: [{
        type: 'DESTINATIONS',
        limit: 50,
      }],
      query: {
        categoryType: this.config.popularDestinations['categoryType'],
        constraints: {
          entityType: 'AIRPORTS',
          ids: ['0'],
        },
        popular: true,
      },
    };
  }

  getOrigins(searchText: string): Observable<Locations> {
    return this.http.post<Locations>(
      MetaSearchService.HOST_URL,
      MetaSearchService.buildOriginsParams(searchText),
      PackagesSearchService.buildHeaders(),
    );
  }

  getDestinations(searchText: string): Observable<Locations> {
    return this.http.post<Locations>(
      MetaSearchService.HOST_URL,
      MetaSearchService.buildDestinationParams(searchText),
      PackagesSearchService.buildHeaders(),
    );
  }

  getPopularOrigins(): Observable<Locations> {
    return this.http.post<Locations>(
      MetaSearchService.HOST_URL,
      MetaSearchService.buildPopularOriginsParams(),
      PackagesSearchService.buildHeaders(),
    );
  }

  getPopularDestinations(): Observable<Locations> {
    return this.http.post<Locations>(
      MetaSearchService.HOST_URL,
      this.buildPopularDestinationParams(),
      PackagesSearchService.buildHeaders(),
    );
  }

}
