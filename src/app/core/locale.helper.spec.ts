import { getCurrentLanguage, getCurrentLocale, setLocaleData } from './locale.helper';
import { registerLocaleData } from '@angular/common';

describe('Locale helper', () => {
  it('should getCurrentLanguage', function () {
    expect(getCurrentLanguage()).toEqual('nb_NO');
  });

  it('should getCurrentLocale', function () {
    expect(getCurrentLocale()).toEqual('en-GB');
  });

  it('should setLocaleData', function () {
    // tslint:disable-next-line
    spyOn(registerLocaleData as any, '__proto__').and.callFake((localeData: any) => {
      expect(localeData).toBeTruthy();
    });
    setLocaleData();
  });
});
