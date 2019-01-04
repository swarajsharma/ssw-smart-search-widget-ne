import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MaterialModule } from '../../../core/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomSelectorDialogComponent } from './room-selector-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { RoomComponent } from './room/room.component';
import { ChildrenSelectComponent } from './room/children-select/children-select.component';
import { By } from '@angular/platform-browser';
import { DebugElement, QueryList } from '@angular/core';
import { SelectedDefaults } from '../../../core/rooms.interface';
export class RoomComponentMock {
  getRoomComponent = jasmine.createSpy('RoomComponent').and.returnValue(null);
}

describe('RoomSelectorDialogComponent', () => {
  let component: RoomSelectorDialogComponent;
  let fixture: ComponentFixture<RoomSelectorDialogComponent>;
  let roomComponentElement: DebugElement;
  let spyDialogClose: jasmine.Spy;
  let dialogRef: MatDialogRef<string>;

  const dialogRefStub = {
    close: function () {
    },
  };
  const selectDefault: SelectedDefaults = {
    rooms: [{
      roomNo: 1,
      adults: 1,
      childrenList: [{ childNo: 1, childAge: '10' }],
    }],
    defaults: {
      maxRooms: 10,
      maxGuests: 10,
      maxAdults: 10,
      maxChildren: 10,
      maxChildAge: 10,
      minAdults: 10,
      minChildren: 10,
      minRooms: 10,
      minGuests: 10,
    },
    isChildLimtPerPage : false
  };
  let roomVChildren: QueryList<RoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      declarations: [RoomSelectorDialogComponent, RoomComponent, ChildrenSelectComponent], // , RoomComponentMock],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: '1111111' },
      { provide: MatDialogRef, useValue: dialogRefStub }],
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSelectorDialogComponent);
    component = fixture.componentInstance;
    roomVChildren = fixture.componentInstance.roomVChildren;
    component.data = selectDefault;
    roomComponentElement = fixture.debugElement.query(By.css('.expansion-panel'));
    dialogRef = TestBed.get(MatDialogRef);
    spyDialogClose = spyOn(dialogRef, 'close').and.callFake(() => {
    });
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set Selected Values', (done) => {
    component.setSelectedValues();
    done();
    fixture.detectChanges();
    expect(component.roomProperties.length).toEqual(2);
    expect(component.totalGuests).toEqual(4);
    expect(component.totalChildren).toEqual(2);
  });

  it('should set the add default room', (done) => {
    component.addDefaultRoom();
    done();
    expect(component.rooms.length).toBe(2);
    expect(component.roomProperties.length).toBe(2);
  });
  it('should set to add Rooms', (done) => {
    component.roomCount = 1;
    component.addRooms();
    done();
    expect(component.roomCount).toBe(2);
  });
  it('should set Total Guests', (done) => {
    component.totalGuests = 1;
    component.setTotalGuests(1);
    done();
    fixture.detectChanges();
    expect(component.totalGuests).toBe(2);
  });
  it('should set Total Children', (done) => {
    component.setTotalChildren(1);
    done();
    fixture.detectChanges();
    expect(component.totalChildren).toBe(2);
  });
  it('should set diable Done Button', (done) => {
    component.diableDoneButton(true);
    done();
    fixture.detectChanges();
    expect(component.isDoneButtonEnabled).toEqual(true);
  });
});
