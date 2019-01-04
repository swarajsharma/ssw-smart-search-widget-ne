import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CitybreaksComponent } from './citybreaks.component';
import { TranslateModule } from '@ngx-translate/core';
import { SearchWidgetAppModule } from '../../search-widget-app.module';
import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
import { Room } from '../../core/rooms.interface';
import { Location } from '../../core/locations.interface';

describe('CitybreaksComponent', () => {
  let component: CitybreaksComponent;
  let fixture: ComponentFixture<CitybreaksComponent>;
  // let debugElement: DebugElement;
  // let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SearchWidgetAppModule, TranslateModule.forRoot()],
      // declarations: [CitybreaksComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitybreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the orgin', (done) => {
    const loc: Location = { Id: '5392460', Keyword: 'London, England, UK (LHR-Heathrow)', Type: 'AIRPORT', AirportCode: 'LHR' };
    component.setOrgin(loc);
    done();
    // debugElement = fixture.debugElement.query(By.css('#locationCtrl'));
    // htmlElement = debugElement.nativeElement;
    fixture.detectChanges();
    expect(component.selectedOrgin).toEqual(loc);
  });

  it('should set the destination', (done) => {
    const loc: Location = { Id: '5392460', Keyword: 'London, England, UK (LHR-Heathrow)', Type: 'AIRPORT', AirportCode: 'LHR' };
    component.setDestination(loc);
    done();
    fixture.detectChanges();
    expect(component.selectedDestination).toEqual(loc);
  });
  it('should set the selected rooms', (done) => {
    const rooms: Room[] = [{ roomNo: 1, adults: 1, childrenList: [{ childNo: 1, childAge: '10' }] }];
    component.setSelectedRooms(rooms);
    done();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('fullwidth'))).toBeFalsy();
  });

  it('should set the click  checkin', (done) => {
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
  it('should set origin on key down', (done) => {
    component.onKeydownorigin();
    done();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#originMsg'))).toBeTruthy();
  });
  it('should test keydown', (done) => {
    component.onKeydown();
    done();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#destinationMsg'))).toBeTruthy();
  });

  it('should do search', (done) => {
    spyOn(component, 'search');
    component.search();
    done();
    fixture.detectChanges();
    expect(component.shouldShow).toBeFalsy();

  });
});
