import { Component, OnInit } from '@angular/core';
import { Location, CityDefaults } from '../../../app/core/locations.interface';
import { DeeplinkSearchService } from '../../../app/core/services/deeplink-search.service';
import { Room, CalendarConfig } from '../../../app/core/rooms.interface';
import { ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material';

/**
 * Initializes the citybreaks component where the origin,destination and dates are provied for deeplink construction.
 * Search results for origin,destinations are retrived from SmartFill API and their
 * display icons are categorized accordingly.
 * @export
 * @class CitybreaksComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'sw-citybreaks',
  templateUrl: './citybreaks.component.html',
  styleUrls: ['./citybreaks.component.scss'],
})
export class CitybreaksComponent implements OnInit {
  public fieldTitle: string;
  public placeHolder: string;
  public occupation: Room[];
  public checkInDate: Date;
  public checkOutDate: Date;
  public nonStopFlight: boolean;
  public cabinClass: string;
  public locationTypeOrigin: number;
  public locationTypeDestination: number;
  public productType: string;
  public selectedOrgin: Location;
  public shouldShow = false;
  public shouldShowDest = false;
  public showDate = false;
  public showCheckoutDate = false;
  public selectedDestination: Location;
  public minDate = new Date();
  public minDateCheckOut = new Date();
  public maxDate = new Date();
  public maxDateCheckOut = new Date();
  public maxAdults = 6;
  public maxGuests = 6;
  public maxChildren = 5;
  @ViewChild('checkinpicker') checkInPicker: MatDatepicker<Date>;
  @ViewChild('checkoutpicker') checkOutPicker: MatDatepicker<Date>;

  // Inintializes the origin location.
  setOrgin(loc: Location): void {
    this.selectedOrgin = loc;
  }
  // Inintializes the destination location.
  setDestination(loc: Location): void {
    this.selectedDestination = loc;
  }
  // Inintializes the room options.
  setSelectedRooms(rooms: Room[]): void {
    this.occupation = rooms;
  }
  // Calender validation for mandatory field
  ClickCheckin(selectedDate: Date) {
    this.showDate = false;
    // setting the checkout date.
    this.minDateCheckOut = new Date(selectedDate);
    this.checkOutDate = new Date(selectedDate);
    this.checkOutDate.setDate(this.checkOutDate.getDate() + CalendarConfig.DefaultCheckoutDays);
    this.showCheckoutDate = false;
    let dayDiffrence = (this.maxDate.getTime() - selectedDate.getTime()) / (1000 * 3600 * 24);
    if (dayDiffrence >= CalendarConfig.MaxCheckoutDaysCityBreak) {
      this.maxDateCheckOut = new Date(selectedDate);
      this.maxDateCheckOut.setDate(this.maxDateCheckOut.getDate() + CalendarConfig.MaxCheckoutDaysCityBreak);
    }
    else
      this.maxDateCheckOut = this.maxDate;
  }
  ClickCheckout() {
    this.showCheckoutDate = false;
  }
  /**
   * Generates the deeplink based on the options provided.if the selected object
   * is undefined or null error will be displayed,otherwise the deeplink will be
   * constructed and redirected accordingly.
   * @memberof CitybreaksComponent
   * @returns {undefinded}
   */
  search() {
    if (this.selectedOrgin && this.selectedDestination &&
      Object.keys(this.selectedOrgin).length && Object.keys(this.selectedDestination).length &&
      this.checkInDate && this.checkOutDate) {
      window.top.location.href = this.deeplinkSearchService.constructDeepLinkForCitybreaks(this);
    } else {
      if (!this.selectedDestination || !Object.keys(this.selectedDestination).length) {
        this.shouldShow = true;
      }
      if (!this.selectedOrgin || !Object.keys(this.selectedOrgin).length) {
        this.shouldShowDest = true;
      }
      if (typeof this.checkInDate === 'undefined' || this.checkInDate === null) {
        this.showDate = true;
      }
      if (typeof this.checkOutDate === 'undefined' || this.checkOutDate === null) {
        this.showCheckoutDate = true;
      }
    }
  }
  // Origin and Destination mandatory fields validation.
  onKeydownorigin() {
    this.shouldShowDest = false;
  }
  onKeydown() {
    this.shouldShow = false;
  }
  /**
   * Creates an instance of CitybreaksComponent.
   * Room Options,fieldtitle,place holder flight options,Location and Product type are
   * passed to retrive the results.
   * @param {DeeplinkSearchService} deeplinkSearchService
   * @memberof CitybreaksComponent
   * @returns {undefined}
   */
  constructor(private deeplinkSearchService: DeeplinkSearchService) {
    this.occupation = [{
      roomNo: 1,
      adults: 2,
      childrenList: [],
    }];
    this.nonStopFlight = false;
    this.locationTypeOrigin = CityDefaults.LOCATION_TYPE_ORIGIN;
    this.locationTypeDestination = CityDefaults.LOCATION_TYPE_DESTINATION;
    this.productType = CityDefaults.PRODUCT_TYPE;
    this.maxDate.setDate(this.minDate.getDate() + CalendarConfig.MaxDaysCityBreak);
    this.maxDateCheckOut.setDate(this.minDate.getDate() + CalendarConfig.MaxCheckoutDaysCityBreak);
  }

  toggleCheckIn(): void {
    this.togglePicker(this.checkInPicker);
  }

  toggleCheckOut(): void {
    this.togglePicker(this.checkOutPicker);
  }

  togglePicker(picker: MatDatepicker<Date>): void {
    picker.opened ?
      picker.close() : picker.open();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.cabinClass = 'e';
    });
  }
}
