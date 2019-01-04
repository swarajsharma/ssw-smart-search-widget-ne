import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../core/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomSelectorComponent } from './room-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
class MatDialogMock {
  open() {
    return {
      afterClosed: function () { },
    };
  }
}

describe('RoomSelectorComponent', () => {
  let component: RoomSelectorComponent;
  let fixture: ComponentFixture<RoomSelectorComponent>;
  let dialog: MatDialogMock;

  const dialogRefStub = {
    open: function () {
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      declarations: [RoomSelectorComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: '' },
      { provide: MatDialogRef, useValue: dialogRefStub }, {
        provide: MatDialog, useClass: MatDialogMock,
      }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSelectorComponent);
    component = fixture.componentInstance;
    dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should use provided @Inputs to fill component defaults', () => {
    component.maxRooms = 3;
    component.maxGuests = 18;
    component.maxAdults = 9;
    component.maxChildren = 9;
    component.maxChildAge = 17;
    component.constructDefaults();
    expect(component.defaults.maxRooms).toEqual(3);
    expect(component.defaults.maxGuests).toEqual(18);
    expect(component.defaults.maxAdults).toEqual(9);
    expect(component.defaults.maxChildren).toEqual(9);
    expect(component.defaults.maxChildAge).toEqual(17);
  });
});

