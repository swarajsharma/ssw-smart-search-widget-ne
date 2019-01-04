import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoSuggestFieldComponent } from './auto-suggest-field/auto-suggest-field.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { RoomSelectorDialogComponent } from './room-selector/room-selector-dialog/room-selector-dialog.component';
import { RoomComponent } from './room-selector/room-selector-dialog/room/room.component';
import { ChildrenSelectComponent } from './room-selector/room-selector-dialog/room/children-select/children-select.component';
import { RoomSelectorComponent } from './room-selector/room-selector.component';
import { MaterialModule } from '../../app/core/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UniversalTranslateModule } from '../../app/core/translate-loader.module';
//import { FlexLayoutModule } from '@angular/flex-layout';


const components = [
  AutoSuggestFieldComponent,
  DatepickerComponent,
  RoomSelectorComponent,
  RoomSelectorDialogComponent,
  RoomComponent,
  ChildrenSelectComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UniversalTranslateModule,
    //FlexLayoutModule,
  ],
  exports: components,
  declarations: components,
  entryComponents: [RoomSelectorDialogComponent],
})
export class SharedModule { }
