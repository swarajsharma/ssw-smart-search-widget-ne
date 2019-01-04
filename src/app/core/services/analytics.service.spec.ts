import { TestBed, inject } from '@angular/core/testing';

import { AnalyticsService } from './analytics.service';
import { DataLayerPayload } from '../analytics.interface';

describe('AnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyticsService],
    });
  });

  it('should be created', inject([AnalyticsService], (service: AnalyticsService) => {
    expect(service).toBeTruthy();
  }));

  it('should work with updateDataLayer', inject([AnalyticsService], (service: AnalyticsService) => {
    const event = {
      id: 'test',
      event: 'domEvent', // new Event('click', {}),
    } as DataLayerPayload;

    service.updateDataLayer(event);
    expect(window['dataLayer']).toBeFalsy();

    activateWindow();
    service.updateDataLayer(event);
    expect(window['dataLayer']).toBeTruthy();
  }));

  function activateWindow() {
    document.dispatchEvent(new Event('DOMContentLoaded', {
      bubbles: true,
      cancelable: true,
    }));
  }
});
