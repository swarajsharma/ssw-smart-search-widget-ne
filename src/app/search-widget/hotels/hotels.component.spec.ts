import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsComponent } from './hotels.component';
import { SearchWidgetAppModule } from '../../search-widget-app.module';
import { TranslateModule } from '@ngx-translate/core';
// import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Room } from '../../core/rooms.interface';
import { Location } from '../../core/locations.interface';

describe('HotelsComponent', () => {
  let component: HotelsComponent;
  let fixture: ComponentFixture<HotelsComponent>;
  // let debugElement: DebugElement;
  // let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SearchWidgetAppModule, TranslateModule.forRoot()],
      // declarations: [HotelsComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set the location', (done) => {
    const loc: Location = { Id: '5392460', Keyword: 'London, England, UK (LHR-Heathrow)', Type: 'AIRPORT', AirportCode: 'LHR' };
    component.setLocation(loc);
    done();
    fixture.detectChanges();
    expect(component.selecedLocObj).toEqual(loc);
  });
  it('should set the selected rooms', (done) => {
    const rooms: Room[] = [{ roomNo: 1, adults: 1, childrenList: [{ childNo: 1, childAge: '10' }] }];
    component.setSelectedRooms(rooms);
    done();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('fullwidth'))).toBeFalsy();
  });
  it('should set the click checkin', (done) => {
    let testDate = new  Date();
    component.ClickCheckin(testDate);
    done();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#checkin'))).toBeTruthy();
  });
  it('should set the click checkout', (done) => {
    component.ClickCheckout();
    done();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#checkout'))).toBeTruthy();
  });
  it('should test keydown', (done) => {
    component.onKeydown();
    done();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#locationMsg'))).toBeTruthy();
  });
  it('should do search', (done) => {
    spyOn(component, 'search');
    component.search();
    done();
    fixture.detectChanges();
    expect(component.shouldShow).toBeFalsy();
    expect(component.shouldShowCheckout).toBeFalsy();
    expect(component.shouldShowCheckin).toBeFalsy();
  });
});
