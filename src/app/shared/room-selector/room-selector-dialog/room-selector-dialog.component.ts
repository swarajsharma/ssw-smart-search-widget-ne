import { Component, OnInit, Inject, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Room, Children, Properties, SelectedDefaults } from '../../../../app/core/rooms.interface';
import { RoomComponent } from './room/room.component';
import { S_IFREG } from 'constants';

@Component({
  selector: 'sw-room-selector-dialog',
  templateUrl: './room-selector-dialog.component.html',
  styleUrls: ['./room-selector-dialog.component.scss'],
})
export class RoomSelectorDialogComponent implements OnInit, AfterViewInit {

  defaultAdults = 2;
  roomCount = 1;
  totalGuests = 0;
  totalChildren = 0;
  isDoneButtonEnabled = true;
  isMoreInfantsThanAdults = false;
  maxRooms: number;
  maxGuests: number;
  rooms: Room[] = [];
  roomProperties: Properties[] = [];
  @ViewChildren(RoomComponent) roomVChildren: QueryList<RoomComponent>;

  constructor(public dialogRef: MatDialogRef<RoomSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectedDefaults) { }

  ngOnInit() {
    this.maxRooms = this.data.defaults.maxRooms;
    this.maxGuests = this.data.defaults.maxGuests;
    this.rooms = this.data.rooms;
    this.setSelectedValues();
  }

  ngAfterViewInit() {
    this.roomVChildren.toArray()[0].isExpanded = true;
  }

  addDefaultRoom(): void {
    const defaultChildren: Children[] = [];
    this.rooms.push({ roomNo: this.roomCount, adults: this.defaultAdults, childrenList: defaultChildren });
    this.roomProperties.push({ roomNo: this.roomCount, expandPanel: true, enableRemove: false, enableEditSearch: false });
  }

  getCountOptions(): number[] {
    let countOptions: number[];
    if (this.rooms.length <= this.maxRooms) {
      countOptions = Array.from({ length: this.rooms.length }, (_, index) => index);
    }
    return countOptions;
  }

  setSelectedValues(): void {
    for (let index = 0; index < this.rooms.length; index++) {
      if (index !== 0) {
        this.roomProperties.push({ roomNo: this.rooms[index].roomNo, expandPanel: false, enableRemove: false, enableEditSearch: true });
      } else {
        this.roomProperties.push({ roomNo: this.rooms[index].roomNo, expandPanel: true, enableRemove: false, enableEditSearch: false });
      }
      this.totalGuests += this.rooms[index].adults + this.rooms[index].childrenList.length;
      this.totalChildren += this.rooms[index].childrenList.length;
    }
    this.roomCount = this.rooms.length;
  }

  addRooms(): void {
    this.roomCount++;
    this.addDefaultRoom();
    if (this.roomVChildren.toArray().length >= 1) {
      this.roomVChildren.toArray()[this.roomVChildren.toArray().length - 1].isExpanded = false;
      this.totalGuests += this.defaultAdults;
    }
  }

  setPanelExpansion(panelNo: string): void {
    if (this.roomVChildren != null || this.roomVChildren !== undefined) {
      for (let index = 0; index < this.roomVChildren.toArray().length; index++) {
        if (parseInt(panelNo, 0) !== index + 1) {
          this.roomVChildren.toArray()[index].isExpanded = false;
        } else {
          this.roomVChildren.toArray()[index].isExpanded = true;
        }
      }
    }
  }

  setTotalGuests(totalGuests: number): void {
    this.totalGuests += totalGuests;
    this.checkChildAgeSelectionInRoom();
    this.checkInfantsInRoom();
  }

  setTotalChildren(totalChildren: number): void {
    this.totalChildren += totalChildren;
  }

  onDone(): void {
    for (let index = 0; index < this.roomVChildren.toArray().length; index++) {
      if (this.rooms.findIndex(res => res.roomNo === (index + 1)) > -1) {
        const room = this.rooms.find(res => res.roomNo === (index + 1));
        room.adults = this.roomVChildren.toArray()[index].totalAdults;
        room.childrenList = this.roomVChildren.toArray()[index].children;
      }
    }
    window.parent.postMessage('done', '*');
  }

  removePanel(roomNumber: number): void {
    const guestCount = this.roomVChildren.toArray()[roomNumber - 1].totalGuests;
    const childrenCount = this.roomVChildren.toArray()[roomNumber - 1].totalChildren;
    if (this.rooms.length > 2) {
      for (let index = roomNumber; index < this.rooms.length; index++) {
        this.roomVChildren.toArray()[index - 1].totalAdults = this.roomVChildren.toArray()[index].totalAdults;
        this.roomVChildren.toArray()[index - 1].totalChildren = this.roomVChildren.toArray()[index].totalChildren;
        this.roomVChildren.toArray()[index - 1].totalGuests = this.roomVChildren.toArray()[index].totalGuests;
        this.roomVChildren.toArray()[index - 1].children = this.roomVChildren.toArray()[index].children;
        this.rooms[index].roomNo = this.rooms[index - 1].roomNo;
      }
    }
    this.totalGuests = this.totalGuests - guestCount;
    this.totalChildren = this.totalChildren - childrenCount;
    this.isDoneButtonEnabled = true;
    this.rooms.splice(roomNumber - 1, 1);
    this.roomCount = this.roomCount - 1;
    this.checkChildAgeSelectionInRoom();
    this.checkInfantsInRoom();
  }

  diableDoneButton(isEnabled: boolean): void {
    this.isDoneButtonEnabled = isEnabled;
    this.checkChildAgeSelectionInRoom(isEnabled);
    this.checkInfantsInRoom(isEnabled);
  }

  onNoClick(): void {
    this.dialogRef.close();
    window.parent.postMessage('close', '*');
  }

  checkInfantsInRoom(isEnabled: boolean = true) {
    this.isDoneButtonEnabled = isEnabled;
    this.isMoreInfantsThanAdults = false;
    for (let index = 0; index < this.rooms.length; index++) {
      let infantChild = this.roomVChildren.toArray()[index].children.filter((x) => { return x.childAge === "0" ? 1 : 0 });
      if (infantChild.length > this.roomVChildren.toArray()[index].totalAdults) {
        this.isDoneButtonEnabled = false;
        this.isMoreInfantsThanAdults = true;
        break;
      }
    }

  }

  checkChildAgeSelectionInRoom(isEnabled: boolean = true) {
    this.isDoneButtonEnabled = isEnabled;
    for (let index = 0; index < this.rooms.length; index++) {
      let childAgeNotSelected = this.roomVChildren.toArray()[index].children.filter((x) => { return x.childAge === "?" ? 1 : 0 });
      if (childAgeNotSelected.length > 0) {
        this.isDoneButtonEnabled = false;
        break;
      }
    }
  }
}
