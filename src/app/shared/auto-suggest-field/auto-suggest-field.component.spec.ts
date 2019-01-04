import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoSuggestFieldComponent } from './auto-suggest-field.component';
import { MaterialModule } from '../../core/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoSuggestService } from '../../core/services/auto-suggest.service';
import { CommonService } from '../../core/services/common-service';
import { ApiService } from '../../core/services/api.service';
import { Location } from '../../core/locations.interface';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

class AutoSuggestServiceStub {
  getLocations(_keyword: string, _productType: string, _types: string) {
    return of(true);
  }
}
class CommonServiceStub {
}
class ApiServiceStub {
  getLocations(_apiUrl: string, _httpHeader: object) {
    return of(true);
  }
}
describe('AutoSuggestFieldComponent', () => {
  let component: AutoSuggestFieldComponent;
  let fixture: ComponentFixture<AutoSuggestFieldComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule]
      , declarations: [AutoSuggestFieldComponent]
      , providers: [{ provide: AutoSuggestService, useClass: AutoSuggestServiceStub },
      { provide: CommonService, useClass: CommonServiceStub },
      { provide: ApiService, useClass: ApiServiceStub }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSuggestFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show test INPUT', () => {
    component.fieldTitle = 'test';
    component.placeHolder = 'test';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('#locationCtrl'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement['placeholder']).toEqual('test');
  });
  it('should set selected the location', () => {
    spyOn(component.selectedLocation, 'emit');
    const loc: Location = { Id: '5392460', Keyword: 'London, England, UK (LHR-Heathrow)', Type: 'AIRPORT', AirportCode: 'LHR' };
    component.setSelectedLocation(loc);
    fixture.detectChanges();
    expect(component.selectedLocation.emit).toHaveBeenCalledWith(loc);
  });
});
