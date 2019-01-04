import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef,
  Host, Inject, OnDestroy, OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatCalendar, MatSelectChange } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { DatepickerDropdownItem } from '../../packages-bar.interface';
import { AvailableDatesService } from '../../../../../app/core/packages-search/services/available-dates.service';
import { PackagesBarDatepickerAdapter } from '../packages-bar-datepicker.adapter';
import { PackagesBarDatepickerEmitter } from '../packages-bar-datepicker.emitter';
import { format } from 'date-fns';
import { AvailabilityMapping } from '../packages-bar-datepicker.interface';

@Component({
  selector: 'sw-packages-bar-datepicker-header',
  templateUrl: './packages-bar-datepicker-header.component.html',
  styleUrls: ['./packages-bar-datepicker-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesBarDatepickerHeaderComponent<D> implements OnDestroy, OnInit {

  private destroyed = new Subject<void>();

  availabilityMapping: AvailabilityMapping;
  months: DatepickerDropdownItem[];
  years: DatepickerDropdownItem[];
  selectedMonth: string;
  selectedYear: string;
  hasAvailableDatesInCurrentMonth = false;

  constructor(
    @Host() private calendar: MatCalendar<D>,
    private dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
    private packagesBarDatepickerEmitter: PackagesBarDatepickerEmitter,
    private availableDatesService: AvailableDatesService,
    private translate: TranslateService,
  ) {
    this.calendar.stateChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => cdr.markForCheck());
    this.availabilityMapping = this.availableDatesService.getAvailabilityMapping();
  }

  ngOnInit() {
    this.initializeNavigationDropdowns();
    this.availableDatesService.availableDates$.subscribe(() => {
      this.availabilityMapping = this.availableDatesService.getAvailabilityMapping();
      this.checkCurrentMonthAvailability();
      this.initializeNavigationDropdowns();
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onPreviousClick() {
    this.calendar.activeDate = this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1);
    this.updateYearAndMonthSelection();
    this.checkCurrentMonthAvailability();
  }

  onNextClick() {
    this.calendar.activeDate = this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1);
    this.updateYearAndMonthSelection();
    this.checkCurrentMonthAvailability();
  }

  onSearchAnyDateClick() {
    this.packagesBarDatepickerEmitter.next({
      id: 'searchAnyDate',
      value: 'any',
    });
  }

  onSearchAllOf() {
    this.packagesBarDatepickerEmitter.next({
      id: 'searchAllOf',
      value: format(this.dateAdapter.format(this.calendar.activeDate, null), 'MMM YYYY'),
    });
  }

  onMonthSelectionChange(event: MatSelectChange) {
    const activeDate: Date = new Date(this.calendar.activeDate.toString());
    this.calendar.activeDate = this.dateAdapter.createDate(
      activeDate.getFullYear(),
      PackagesBarDatepickerAdapter.MONTH_SHORT_NAMES.indexOf(event.value),
      activeDate.getDate(),
    );
    this.checkCurrentMonthAvailability();
    setTimeout(this.setFocusOnCalendar.bind(this), 300);
  }

  onYearSelectionChange(event: MatSelectChange) {
    const activeDate: Date = new Date(this.calendar.activeDate.toString());
    this.populateMonthDropdown();
    this.calendar.activeDate = this.dateAdapter.createDate(
      event.value,
      activeDate.getMonth(),
      activeDate.getDate(),
    );
    const activeMonth = this.dateAdapter.format(this.calendar.activeDate, 'MMM');
    if (this.selectedMonth !== activeMonth) {
      this.selectedMonth = activeMonth;
    }
    this.checkCurrentMonthAvailability();
    setTimeout(this.setFocusOnCalendar.bind(this), 300);
  }

  onNextAvailableDate() {
    const activeDate = this.dateAdapter.format(this.calendar.activeDate, 'YYYY-MM-DD');
    const nextAvailableDateStr = this.availableDatesService.getNextAvailableDate(activeDate);
    const nextDate = nextAvailableDateStr ? new Date(nextAvailableDateStr) : new Date();
    this.calendar.activeDate = this.dateAdapter.createDate(
      nextDate.getFullYear(),
      nextDate.getMonth(),
      nextDate.getDate(),
    );
    this.checkCurrentMonthAvailability();
    this.updateYearAndMonthSelection();
  }

  getShortMonthName(month: string): string {
    return this.translate.instant(`datepicker.shortMonthNames.${month}`);
  }

  getWholeMonthText(month: string): string {
    return this.translate.instant(`datepicker.wholeMonthNames.${month}`);
  }

  private updateYearAndMonthSelection() {
    const prevSelectedYear = this.selectedYear;
    this.selectedYear = this.dateAdapter.format(this.calendar.activeDate, 'YYYY');
    if (prevSelectedYear !== this.selectedYear) {
      this.populateMonthDropdown();
    }
    this.selectedMonth = this.dateAdapter.format(this.calendar.activeDate, 'MMM');
  }

  private setFocusOnCalendar() {
    this.calendar.focusActiveCell();
  }

  private checkCurrentMonthAvailability() {
    const activeDate: Date = new Date(this.calendar.activeDate.toString());
    this.hasAvailableDatesInCurrentMonth = this.availableDatesService.monthHasAvailableDates(
      activeDate,
    );
  }

  private populateYearDropdown() {
    this.years = Object.getOwnPropertyNames(this.availabilityMapping).map((year: string) => {
      return { value: year, viewValue: year };
    });
  }

  private populateMonthDropdown() {
    const availabilityMapping = this.availabilityMapping[this.selectedYear];
    this.months = PackagesBarDatepickerAdapter.MONTH_SHORT_NAMES
      .map((month: string, index: number) => {
        return {
          value: month,
          viewValue: month,
          disabled: availabilityMapping && availabilityMapping.length ?
            availabilityMapping.filter((m) => `0${index + 1}`.slice(-2) === m).length === 0 :
            true,
        };
      });
  }

  private initializeNavigationDropdowns() {
    this.populateYearDropdown();
    this.selectedYear = this.dateAdapter.format(this.calendar.activeDate, 'YYYY');
    this.populateMonthDropdown();
    this.selectedMonth = this.dateAdapter.format(this.calendar.activeDate, 'MMM');
  }

}

