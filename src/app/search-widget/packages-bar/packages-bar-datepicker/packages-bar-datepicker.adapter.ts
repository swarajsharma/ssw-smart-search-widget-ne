import { MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Inject, Optional } from '@angular/core';


export class PackagesBarDatepickerAdapter extends NativeDateAdapter {

  static readonly MONTH_SHORT_NAMES = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  static readonly MONTH_LONG_NAMES = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];

  format(date: Date, displayFormat: Object): string {
    const day = Number(date.getDate());
    const month = Number(date.getMonth());
    const year = date.getFullYear();
    switch (displayFormat) {
      case 'input':
        const monthTranslation = this.translate
          .instant(`datepicker.shortMonthNames.${PackagesBarDatepickerAdapter.MONTH_SHORT_NAMES[month]}`);
        return `${day} ${monthTranslation} ${year}`;

      case 'YYYY-MM-DD':
        return `${year}-${('0' + (month + 1)).slice(-2)}-${day}`;

      case 'MMM YYYY':
        return `${PackagesBarDatepickerAdapter.MONTH_SHORT_NAMES[month]} ${year}`;

      case 'MMM':
        return PackagesBarDatepickerAdapter.MONTH_SHORT_NAMES[month];

      case 'MMMM':
        return PackagesBarDatepickerAdapter.MONTH_LONG_NAMES[month];

      case 'YYYY':
        return `${year}`;

      default: return date.toDateString();
    }
  }

  getDayOfWeekNames(): string[] {
    return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      .map((dayOfWeek) => this.translate.instant(`datepicker.daysOfWeek.${dayOfWeek}`));
  }

  getFirstDayOfWeek(): number {
    return Number(this.translate.instant('datepicker.weekStartsOn'));
  }

  constructor(
    @Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string,
    @Inject(Platform) protected platform: Platform,
    @Inject(TranslateService) private translate: TranslateService,
  ) {
    super(matDateLocale, platform);
  }
}
