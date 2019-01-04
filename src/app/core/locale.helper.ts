import { isPlatformServer, Location, registerLocaleData } from '@angular/common';
import { environment } from '../../environments/environment';

import localeUk from '@angular/common/locales/en-GB';
import localeNlFr from '@angular/common/locales/fr-BE';
import localeNl from '@angular/common/locales/nl';
import localeNlBe from '@angular/common/locales/nl-BE';

interface LanguageEnv {
  locale: string;
  language: string;
}

export function getCurrentLanguage(platformId?: string|Object, location?: Location) {
  return environment.languages[getCurrentLocale(platformId, location)];
}

export function getCurrentLocale(platformId?: string|Object, location?: Location) {
  if (isPlatformServer(platformId)) {
    return environment.defaultLocale;
  }
  const stored = localStorage.getItem('ow-globals');
  let parsed = JSON.parse(stored || '{}');
  if (location && parsed.locale) {
    parsed = fixBeMarketLocale(parsed, location);
  }
  return parsed.locale || environment.defaultLocale;
}

// re-set language for BE market on page init for seo Pages
function fixBeMarketLocale(parsed: LanguageEnv, location: Location) {
  const currentLanguage = parsed.locale.substring(0, 2);
  if (!parsed.locale.match(/\-BE/) || !location.path().match(/^\/(fr|nl)\//) ||
    location.path().match(new RegExp(`^/${currentLanguage}/`))) {
    return parsed;
  }
  const newLanguage = currentLanguage === 'fr' ? 'nl' : 'fr';
  parsed.language = `${parsed.language.split('-')[0]}-${newLanguage}`;
  parsed.locale = newLanguage + parsed.locale.substring(2);
  localStorage.setItem('ow-globals', JSON.stringify(parsed));
  return parsed;
}

export function setLocaleData() {
  switch (environment.market) {
    case 'ahuk':
    case 'nenb':
      registerLocaleData(localeUk);
      break;

    case 'necnl':
      registerLocaleData(localeNl);
      break;

    case 'necbe':
      registerLocaleData(localeNlBe);
      registerLocaleData(localeNlFr);
      break;
  }
}
