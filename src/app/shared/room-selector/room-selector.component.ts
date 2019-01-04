import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RoomSelectorDialogComponent } from './room-selector-dialog/room-selector-dialog.component';
import { Room, MaxDefaults, MinDefaults, Defaults, SelectedDefaults } from '../../../app/core/rooms.interface';

/**
 * Initializes the room selector option and based on the inputs provied
 * the options are passed for deeplink creation and pages will be redirected accordingly.
 * @export
 * @class RoomSelectorComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'sw-room-selector',
  templateUrl: './room-selector.component.html',
  styleUrls: ['./room-selector.component.scss'],
})
export class RoomSelectorComponent implements OnInit {

  noOfRooms: number;
  noOfGuests: number;
  rooms: Room[] = [];
  defaults: Defaults;
  selectedDefaults: SelectedDefaults;
  /* maxRooms */
  @Input() public maxRooms: number = MaxDefaults.MaxRooms;
  @Input() public maxGuests: number = MaxDefaults.MaxGuests;
  @Input() public maxAdults: number = MaxDefaults.MaxAdults;
  @Input() public maxChildren: number = MaxDefaults.MaxChildren;
  @Input() public maxChildAge: number = MaxDefaults.MaxChildAge;
  @Input() public isChildLimtPerPage: boolean = false;
  public minAdults: number = MinDefaults.MinAdults;
  public minGuests: number = MinDefaults.MinGuests;
  public minChildren: number = MinDefaults.MinChildren;
  public minRooms: number = MinDefaults.MinRooms;
  @Output() public selectedRooms: EventEmitter<Room[]> = new EventEmitter<Room[]>();

  /**
 * Creates an instance of RoomSelectorComponent.
 * Number of rooms, number of guests and rooms are initialized.
 * @param {MatDialog} dialog
 * @memberof RoomSelectorComponent
 * @returns {void}
 */
  constructor(public dialog: MatDialog) {
    this.rooms = [{ roomNo: 1, adults: MinDefaults.MinGuests, childrenList: [] }];
  }

  constructDefaults(): void {
    this.defaults = {
      maxRooms: this.maxRooms,
      maxGuests: this.maxGuests,
      maxAdults: this.maxAdults,
      maxChildren: this.maxChildren,
      maxChildAge: this.maxChildAge,
      minAdults: this.minAdults,
      minGuests: this.minGuests,
      minChildren: this.minChildren,
      minRooms: this.minRooms,
    };
  }

  ngOnInit() {
    this.constructDefaults();
    this.noOfRooms = this.defaults.minRooms;
    this.noOfGuests = this.defaults.minGuests;
    this.selectedDefaults = {
      rooms: this.rooms,
      defaults: this.defaults,
      isChildLimtPerPage: this.isChildLimtPerPage,

    };
  }

  // New popup will be displayed for room selector option.where number of children
  // and their ages should be provided for deep link creation.
  openDialog(): void {
    this.selectedDefaults.rooms = this.rooms;
    const dialogRef = this.dialog.open(RoomSelectorDialogComponent, {
      panelClass: 'room-selector-panel',
      data: JSON.parse(JSON.stringify(this.selectedDefaults)),
    });

    dialogRef.afterClosed().subscribe((result: Room[]) => {
      this.rooms = (result == null || undefined) ? this.rooms : result;
      this.noOfRooms = this.rooms.length;
      this.noOfGuests = 0;
      for (let index = 0; index < this.rooms.length; index++) {
        this.noOfGuests += this.rooms[index].adults + this.rooms[index].childrenList.length;
      }
      this.selectedRooms.emit(this.rooms);
    });
    window.parent.postMessage('open', '*');
  }
}
