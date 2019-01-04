import { Injectable } from '@angular/core';
import { DataLayerPayload } from '../analytics.interface';
import { EventManager } from '@angular/platform-browser';

@Injectable()
export class AnalyticsService {

  private window: Window;

  updateDataLayer(data: DataLayerPayload) {
    if (!this.window) {
      return;
    }
    this.window['dataLayer'].push(data);
  }

  private initAnalytics() {
    if (!this.window['dataLayer']) {
      this.window['dataLayer'] = [];
    }
  }

  private listen(target: string, event: string, callback: Function): Function {
    return this.eventManager.addGlobalEventListener(target, event, callback);
  }

  constructor(
    private eventManager: EventManager,
  ) {
    this.listen('window', 'DOMContentLoaded', (event: Event) => {
      this.window = event.currentTarget as Window;
      this.initAnalytics();
    });
  }

}
