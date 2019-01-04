import { Subject, Subscription } from 'rxjs';
import { PackagesBarDatepickerHeaderEvent } from './packages-bar-datepicker.interface';

export class PackagesBarDatepickerEmitter {

  private events = new Subject<PackagesBarDatepickerHeaderEvent>();

  subscribe(next: (event: PackagesBarDatepickerHeaderEvent) => void): Subscription {
    return this.events.subscribe(next);
  }

  next(event: PackagesBarDatepickerHeaderEvent) {
    this.events.next(event);
  }

}
