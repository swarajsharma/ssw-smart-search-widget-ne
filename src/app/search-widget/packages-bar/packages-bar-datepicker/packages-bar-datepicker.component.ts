import {
  Component, Input, Output, ViewChild,
  EventEmitter, OnInit, ChangeDetectorRef, ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDatepicker, MatDatepickerInputEvent, MatInput,
} from '@angular/material';
import { format } from 'date-fns';
import { environment } from '../../../../environments/environment';
import { AvailableDate } from '../../../../app/search-widget/packages-bar/packages-bar.interface';
import { PackagesBarDatepickerHeaderEvent } from './packages-bar-datepicker.interface';
import { DeviceService } from '../../../../app/core/services/device.service';
import { PackagesBarDatepickerHeaderComponent } from './packages-bar-datepicker-header/packages-bar-datepicker-header.component';
import { PackagesBarDatepickerEmitter } from './packages-bar-datepicker.emitter';

@Component({
  selector: 'sw-packages-bar-datepicker',
  templateUrl: 'packages-bar-datepicker.component.html',
  styleUrls: ['./packages-bar-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesBarDatepickerComponent implements OnInit {
  @ViewChild('picker') picker: MatDatepicker<Date>;
  @ViewChild('dateInput', {
    read: MatInput,
  }) dateInput: MatInput;
  @Input() control: FormControl;
  @Input() availableDates: AvailableDate[];
  @Output() updateAvailableDates = new EventEmitter();

  showInputElement: boolean;
  showClearButton: boolean;
  calendarHeaderComponent = PackagesBarDatepickerHeaderComponent;
  minDate: Date;
  maxDate: Date;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    public deviceService: DeviceService,
    private headerComponentObserver: PackagesBarDatepickerEmitter,
  ) {}

  ngOnInit() {
    this.updateCalendarAvailability();
    this.headerComponentObserver.subscribe(this.processCalendarHeaderEvent.bind(this));
  }

  private processCalendarHeaderEvent(event: PackagesBarDatepickerHeaderEvent) {
    switch (event.id) {
      case 'searchAnyDate':
        this.clearDate();
        break;

      case 'searchAllOf':
        this.control.setValue(event.value);
        this.showClearButton = true;
        break;
    }
    this.showInputElement = false;
    this.picker.close();
  }

  public toggleDatePicker() {
    if (this.picker.opened) {
      this.picker.close();
    } else {
      this.picker.open();
    }
  }

  updateCalendarAvailability() {
    this.updateAvailableDates.emit();
    this.changeDetectorRefs.detectChanges();
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.control.setValue(format(event.value, 'YYYY-MM-DD'));
    this.showClearButton = true;
    this.showInputElement = true;
  }

  dateFilter(d: Date): boolean {
    return this.datesValues.includes(format(d, 'YYYY-MM-DD'));
  }

  clearDate(): void {
    this.control.setValue('any');
    this.dateInput.value = undefined;
    this.showClearButton = false;
    this.showInputElement = false;
  }

  onClearDate(event: MouseEvent): void {
    this.clearDate();
    event.stopPropagation();
  }

  get datesValues() {
    this.minDate = new Date(this.availableDates[0].value);
    this.maxDate = new Date(this.availableDates[this.availableDates.length - 1].value);
    return this.availableDates.map((date: AvailableDate) => date.value);
  }

  get panelClass(): string[] {
    return ['packages-bar-calendar', `${environment.market}`];
  }


}
