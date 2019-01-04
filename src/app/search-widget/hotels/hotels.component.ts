import { Component, OnInit } from '@angular/core';
import { Location, HotelDefaults } from '../../../app/core/locations.interface';
import { DeeplinkSearchService } from '../../../app/core/services/deeplink-search.service';
import { Room,CalendarConfig } from '../../../app/core/rooms.interface';
import { ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material';


/**
 * Initializes the HotelComponent where the options are provied for deeplink construction.
 * Search results for destinations are retrived from SmartFill API and their
 * display icons are categorized accordingly.
 * @export
 * @class HotelsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'sw-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})

export class HotelsComponent implements OnInit {
  public occupation: Room[];
  public checkInDate: Date;
  public checkOutDate: Date;
  public minDate = new Date();
  public minDateCheckOut = new Date();
  public maxDate = new Date();
  public maxDateCheckOut = new Date();
  public selecedLocObj: Location;
  public shouldShow = false;
  public locationType: number;
  public productType: string;
  public maxRooms = 8;
  public maxAdults = 14;
  public maxChildren = 6;
  public maxGuests = 160;
  public isChildLimtPerPage = true;
  public showDate = false;
  public showCheckoutDate = false;
  public shouldShowCheckin = false;
  public shouldShowCheckout = false;    
  @ViewChild('checkinpicker') checkInPicker: MatDatepicker<Date>;
  @ViewChild('checkoutpicker') checkOutPicker: MatDatepicker<Date>;

  // Inintializes the selected location.
  setLocation(loc: Location): void {
    this.selecedLocObj = loc;
  }
  // Inintializes the selected rooms.
  setSelectedRooms(rooms: Room[]): void {
    this.occupation = rooms;
  }
  /**
   * Creates an instance of HotelsComponent.
   * Location types,Product types and room options are passed to retrive the result.
   * @param {DeeplinkSearchService} deeplinkSearchService
   * @memberof HotelsComponent
   * @returns {void}
   */
  constructor(private deeplinkSearchService: DeeplinkSearchService) {
    this.locationType = HotelDefaults.LOCATION_TYPE;
    this.productType = HotelDefaults.PRODUCT_TYPE;
    this.occupation = [{
      roomNo: 1,
      adults: 2,
      childrenList: [],
    }];
    
    this.maxDate.setDate(this.minDate.getDate() + CalendarConfig.MaxDaysHotelBreak);
    this.maxDateCheckOut.setDate(this.minDate.getDate() + CalendarConfig.MaxCheckoutDaysHotel);
  }
  /**
   * Deeplink is constructed based on the options provided.if the selected object
   * is undefined or null error will be displayed otherwise the deeplink will be
   * constructed and redirected accordingly.
   * @memberof HotelsComponent
   * @returns {Url}
   */
  search(): void {
    if (typeof this.selecedLocObj === 'undefined' || !Object.keys(this.selecedLocObj).length) {
      this.shouldShow = true;
    }
    if (typeof this.checkInDate === 'undefined' || this.checkInDate === null) {
      this.showDate = true;
      this.shouldShowCheckin = true;
    }
    if (typeof this.checkOutDate === 'undefined' || this.checkOutDate === null) {
      this.showCheckoutDate = true;
      this.shouldShowCheckout = true;
    }

    if (!this.shouldShow && !this.shouldShowCheckout && !this.shouldShowCheckin) {
      window.top.location.href = this.deeplinkSearchService.constructDeepLinkForHotel(this);
    }
  }
  // Validation for Origin Field.
  onKeydown() {
    this.shouldShow = false;
  }
  // Calender validation for mandatory field.
  ClickCheckin(selectedDate: Date) {
    this.showDate = false;
    this.shouldShowCheckin = false;
    // setting the checkout date.
    this.minDateCheckOut = new Date(selectedDate);    
    this.checkOutDate = new Date(selectedDate);
    this.checkOutDate.setDate(this.checkOutDate.getDate() + CalendarConfig.DefaultCheckoutDays);
    this.showCheckoutDate = false;
    this.shouldShowCheckout = false;
    let dayDiffrence = (this.maxDate.getTime() - selectedDate.getTime()) / (1000 * 3600 * 24);
    if (dayDiffrence >= CalendarConfig.MaxCheckoutDaysHotel) {
      this.maxDateCheckOut = new Date(selectedDate);
      this.maxDateCheckOut.setDate(this.maxDateCheckOut.getDate() + CalendarConfig.MaxCheckoutDaysHotel);
    }
    else
      this.maxDateCheckOut = this.maxDate;
  }
  // Calender validation for mandatory field.
  ClickCheckout() {
    this.showCheckoutDate = false;
    this.shouldShowCheckout = false;
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
  }
}
