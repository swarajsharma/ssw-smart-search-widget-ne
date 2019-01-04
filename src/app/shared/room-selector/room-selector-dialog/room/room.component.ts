import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Room, Children, Properties, Defaults } from '../../../../../app/core/rooms.interface';
import { ChildrenSelectComponent } from './children-select/children-select.component';

@Component({
  selector: 'sw-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, AfterViewInit {

  @Input() public roomNumber: number;
  @Input() public selectedRoomValues: Room;
  @Input() public roomProperty: Properties;
  @Input() public isDisabled = true;
  @Input() public selectedDefaults: Defaults;
  @Input() public owatRoom:number;
  @Output() public panelChange = new EventEmitter();
  @Output() public totalChildrenEmit = new EventEmitter();
  @Output() public totalGuestsEmit = new EventEmitter();
  @Output() public panelRemove = new EventEmitter();
  @Output() public disableDone = new EventEmitter();
  @ViewChildren(ChildrenSelectComponent) childSelectVChildren: QueryList<ChildrenSelectComponent>;
  totalAdults = 2;
  totalChildren = 0;
  totalGuests = 2;
  maxAdults: number;
  maxChildren: number;
  minAdults: number;
  minChildren: number;
  public children: Children[] = [];
  public isExpanded: boolean;

  constructor() { }

  ngOnInit(): void {
    if (this.selectedDefaults !== undefined) {
      this.maxAdults = this.selectedDefaults.maxAdults;
      this.maxChildren = this.selectedDefaults.maxChildren;
      this.minAdults = this.selectedDefaults.minAdults;
      this.minChildren = this.selectedDefaults.minChildren;
      this.setRooms();
    }
  }

  ngAfterViewInit(): void {
  }

  setRooms(): void {
    if (this.selectedRoomValues !== null) {
      this.totalAdults = this.selectedRoomValues.adults;
      this.children = this.selectedRoomValues.childrenList;
      if (this.children.length > 0) {
        this.totalChildren = this.children.length;
      }
      this.totalGuests = this.selectedRoomValues.adults + this.selectedRoomValues.childrenList.length;
    }
    if (this.roomProperty !== null) {
      this.isExpanded = this.roomProperty.expandPanel;
    }
  }

  addGuests(): void {
    this.totalGuests++;
    this.totalGuestsEmit.emit(1);
  }

  removeGuests(): void {
    this.totalGuests--;
    this.totalGuestsEmit.emit(-1);
  }

  addAdults(): void {
    if (this.totalAdults < this.maxAdults) {
      this.totalAdults++;
      this.addGuests();
    }
  }

  removeAdults(): void {
    if (this.totalAdults > this.minAdults) {
      this.totalAdults--;
      this.removeGuests();
    }
  }

  addChildren(): void {
    if (this.totalChildren < this.maxChildren) {
      this.totalChildren++;
      this.addGuests();
      this.addDefaultChildren();
      this.totalChildrenEmit.emit(1);
    }
  }

  removeChildren(): void {
    if (this.totalChildren > this.minChildren) {
      this.totalChildren--;
      this.removeGuests();
      this.removeLastChild();
      this.totalChildrenEmit.emit(-1);
    }
  }

  addDefaultChildren(): void {
    const child: Children = { childNo: this.totalChildren, childAge: '?' };
    this.children.push(child);
    this.disableDone.emit(false);
  }

  removeLastChild(): void {
    this.children.splice(this.children.length - 1, 1);
    this.emitToDisable();
  }

  setNewChild(modifiedChild: Children): void {
    const child = this.children.find(res => res.childNo === modifiedChild.childNo);
    child.childAge = modifiedChild.childAge;
    this.emitToDisable();
  }

  emitToDisable(): void {
    let toDisable = false;
    for (let index = 0; index < this.children.length; index++) {
      if (this.children[index].childAge === '?') {
        toDisable = true;
        break;
      }
    }
    if (toDisable) {
      this.disableDone.emit(false);
    } else {
      this.disableDone.emit(true);
    }
  }

  removePanel(index: number): void {
    this.panelRemove.emit(index);
  }

  setExpansion(index: number) {
    this.panelChange.emit(index.toString());
  }

  getCountOptions(): number[] {
    return Array.from({ length: this.children.length }, (_, index) => index);
  }
}
