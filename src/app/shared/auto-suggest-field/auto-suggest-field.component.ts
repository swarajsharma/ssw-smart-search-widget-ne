import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Location, Locations } from '../../../app/core/locations.interface';

import { CommonService } from '../../../app/core/services/common-service';
import { ErrorStateMatcher } from '@angular/material/core';
import { AutoSuggestService } from '../../../app/core/services/auto-suggest.service';
import { debounceTime } from 'rxjs/operators';
/**
 * Returns Error when invalid control is dirty or submitted.
 * @export
 * @class LocationErrorStateMatcher
 * @implements {ErrorStateMatcher}
 */
export class LocationErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

/**
 * Common service for Autosuggest fields that fetches the result form Smartfill API.
 * Api headers and keys are passed along with the service and the results for search widget are retrived.
 * @export
 * @class AutoSuggestFieldComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'sw-auto-suggest-field',
  templateUrl: './auto-suggest-field.component.html',
  styleUrls: ['./auto-suggest-field.component.scss'],
})

export class AutoSuggestFieldComponent implements OnInit {
  @Input() public fieldTitle: string;
  @Input() public placeHolder: string;
  @Input() public id: string;
  @Input() public productType: string;
  @Input() public locationType: string;
  public isClassToShow: boolean = false;
  public isLocationSelected: boolean = false;
  public locationCtrl: FormControl;
  public filteredLoctions: Location[];
  public locationIcons: { [key: string]: string };
  @Output() public selectedLocation: EventEmitter<Location> = new EventEmitter<Location>();
  // Generates the error message for required fields.
  getErrorMessage() {
    return this.locationCtrl.hasError('required') ? '' : '';
  }

  /**
   * Creates an instance of AutoSuggestFieldComponent.
   * Autosuggestservice is initialized and the values are passed to
   * smartfill api through commonService and the result are filtered accordingly and displayed in fields.
   * @param {AutoSuggestService} autoselectservice
   * @param {CommonService} commonService
   * @memberof AutoSuggestFieldComponent
   * @returns {void}
   */
  constructor(private autoselectservice: AutoSuggestService, private commonService: CommonService) {
    this.locationIcons = this.commonService.locationIcons;
    this.locationCtrl = new FormControl();
    this.locationCtrl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((name: string) => {
        if (name.length > 2) {
          this.autoselectservice.getLocations(name
            , this.productType
            , this.locationType)
            .subscribe((response: Locations) => {
              this.filteredLoctions = response.Locations;
              if (this.filteredLoctions.length > 1 && !this.isLocationSelected)
                this.isClassToShow = true;
              else
                this.isClassToShow = false;
                this.isLocationSelected = false;
            });
        } else {
          this.isClassToShow = false;
          this.filteredLoctions = [];
          this.setSelectedLocation(null);
        }
      });
  }

  /**
   * Initilaizes the Selected Location.
   * Location is set based on the Id that is matched.
   * @param {Location} location
   * @memberof AutoSuggestFieldComponent
   * @returns {void}
   */
  setSelectedLocation(location: Location) {
    this.isClassToShow = false;
    this.isLocationSelected = true;
    this.selectedLocation.emit({ ...location });
  }

  ngOnInit() {
  }
}

/**
 * Required Filed validation.If the form is invalid or dirty returns error message.
 * @export
 * @class InputErrorStateMatcherExample
 */
export class InputErrorStateMatcherExample {
  locationCtrl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new LocationErrorStateMatcher();
}
