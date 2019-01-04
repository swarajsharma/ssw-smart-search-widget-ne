import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DeviceService {

  static configuration = {
    isMobile: 'HandsetPortrait',
    isMobileLandscape: 'HandsetLandscape',
    isTablet: 'TabletPortrait',
    isTabletLandscape: 'TabletLandscape',
    isDesktop: 'Web',
  };

  isMobile: Function;
  isMobileLandscape: Function;
  isTablet: Function;
  isTabletLandscape: Function;
  isDesktop: Function;

  isMobile$: Observable<boolean>;
  isMobileLandscape$: Observable<boolean>;
  isTablet$: Observable<boolean>;
  isTabletLandscape$: Observable<boolean>;
  isDesktop$: Observable<boolean>;

  static getMobileDetectName(name: string) {
    return name.toLowerCase().replace(/is|landscape/g, '');
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    Object.keys(DeviceService.configuration).forEach((deviceType) => {
      const breakpoint = Breakpoints[DeviceService.configuration[deviceType]];
      this[deviceType] = () => {
        return this.breakpointObserver.isMatched(breakpoint);
      };
      this[deviceType + '$'] = this.breakpointObserver
          .observe([breakpoint])
          .pipe(map(result => result.matches));
    });
  }

}
