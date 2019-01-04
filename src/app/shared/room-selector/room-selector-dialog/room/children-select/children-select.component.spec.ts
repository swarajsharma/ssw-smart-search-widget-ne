import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenSelectComponent } from './children-select.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../../../../core/material.module';
import { Children } from '../../../../../core/rooms.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { By } from '@angular/platform-browser';

describe('ChildrenSelectComponent', () => {
  let component: ChildrenSelectComponent;
  let fixture: ComponentFixture<ChildrenSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), MaterialModule, BrowserAnimationsModule],
      declarations: [ChildrenSelectComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenSelectComponent);
    component = fixture.componentInstance;
    const children: Children = { childNo: 1, childAge: '10' };
    component.selectedChildValues = children;
    component.maxChildAge = 17;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set selected Child Values', () => {
    spyOn(component.changedChild, 'emit');
    const children: Children = { childNo: 1, childAge: '10' };
    component.onChange();
    fixture.detectChanges();
    expect(component.changedChild.emit).toHaveBeenCalledWith(children);
  });
  it('should to test child age drop-down', () => {
    component.getCountOptions();
    fixture.detectChanges();
    expect(component.childrenAge.length).toBe(16);
  });
});

