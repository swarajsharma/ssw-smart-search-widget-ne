import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../../core/material.module';
import { RoomComponent } from './room.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChildrenSelectComponent } from './children-select/children-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Children } from '../../../../core/rooms.interface';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      declarations: [RoomComponent, ChildrenSelectComponent],
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.roomNumber = 2;
    component.selectedRoomValues = {
      roomNo: 1,
      adults: 2,
      childrenList: [],
    };
    component.roomProperty = {
      roomNo: 1,
      expandPanel: true,
      enableRemove: true,
      enableEditSearch: true,
    };
    component.selectedDefaults = {
      maxRooms: 3,
      maxGuests: 18,
      maxAdults: 9,
      maxChildren: 9,
      maxChildAge: 17,
      minAdults: 1,
      minChildren: 0,
      minRooms: 1,
      minGuests: 1,
    };
    component.isExpanded = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add new Guest', (done) => {
    spyOn(component.totalGuestsEmit, 'emit');
    component.addGuests();
    done();
    fixture.detectChanges();
    expect(component.totalGuests).toEqual(3);
    expect(component.totalGuestsEmit.emit).toHaveBeenCalledWith(1);
  });
  it('should remove Guest', (done) => {
    spyOn(component.totalGuestsEmit, 'emit');
    component.removeGuests();
    done();
    fixture.detectChanges();
    expect(component.totalGuests).toEqual(1);
    expect(component.totalGuestsEmit.emit).toHaveBeenCalledWith(-1);
  });
  it('should add new Adult', (done) => {
    component.maxAdults = 9;
    component.totalAdults = 2;
    component.totalGuests = 2;
    component.addAdults();
    done();
    fixture.detectChanges();
    expect(component.totalAdults).toBe(3);
    expect(component.totalGuests).toBe(3);
  });
  it('should remove Adult', (done) => {
    component.minAdults = 1;
    component.totalAdults = 2;
    component.totalGuests = 2;
    component.removeAdults();
    done();
    fixture.detectChanges();
    expect(component.totalAdults).toBe(1);
    expect(component.totalGuests).toBe(1);
  });
  it('should add new Child', (done) => {
    component.maxChildren = 9;
    component.totalChildren = 1;
    component.addChildren();
    done();
    fixture.detectChanges();
    expect(component.totalChildren).toBe(2);
  });
  it('should remove Child', (done) => {
    component.totalChildren = 2;
    component.minChildren = 0;
    component.totalGuests = 8;
    const child1: Children = { childNo: 1, childAge: '10' };
    const child2: Children = { childNo: 2, childAge: '10' };
    component.children.push(child1);
    component.children.push(child2);
    component.removeChildren();
    done();
    fixture.detectChanges();
    expect(component.totalChildren).toBe(1);
    expect(component.children.length).toEqual(1);
    expect(component.totalGuests).toBe(7);
  });
  it('should add new default Children', (done) => {
    component.addDefaultChildren();
    done();
    fixture.detectChanges();
    expect(component.children.length).toEqual(1);
  });
  it('should remove Last Children', (done) => {
    const child: Children = { childNo: this.totalChildren, childAge: '?' };
    component.children.push(child);
    component.removeLastChild();
    done();
    expect(component.children.length).toEqual(0);
  });
  it('should set new Children', (done) => {
    spyOn(component, 'emitToDisable');
    const children: Children = { childNo: 1, childAge: '10' };
    component.children.push(children);
    component.setNewChild(children);
    done();
    fixture.detectChanges();
    expect(component.emitToDisable).toHaveBeenCalledWith();
  });
  it('should disable', (done) => {
    spyOn(component.disableDone, 'emit');
    component.emitToDisable();
    done();
    fixture.detectChanges();
    expect(component.disableDone.emit).toHaveBeenCalledWith(true);
  });
  it('should remove Panel', (done) => {
    spyOn(component.panelRemove, 'emit');
    component.removePanel(0);
    done();
    fixture.detectChanges();
    expect(component.panelRemove.emit).toHaveBeenCalledWith(0);
  });
  it('should set Expansion', (done) => {
    spyOn(component.panelChange, 'emit');
    component.setExpansion(1);
    done();
    fixture.detectChanges();
    expect(component.panelChange.emit).toHaveBeenCalledWith('1');
  });
});
