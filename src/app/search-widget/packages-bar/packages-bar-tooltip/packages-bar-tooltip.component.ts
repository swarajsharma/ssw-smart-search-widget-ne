import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy, ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialog, MatAutocompleteSelectedEvent, MatDialogConfig } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { Location, Locations } from '../../../../app/core/packages-search/packages-search.interface';
import { TooltipEntity } from '../../../../app/search-widget/packages-bar/packages-bar.interface';
import { MetaSearchService } from '../../../../app/core/packages-search/services/meta-search.service';
import { PackagesBarTooltipDialogComponent } from './packages-bar-tooltip-dialog/packages-bar-tooltip-dialog.component';


@Component({
  selector: 'sw-packages-bar-tooltip',
  templateUrl: 'packages-bar-tooltip.component.html',
  styleUrls: ['./packages-bar-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesBarTooltipComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Determines if the click event comes from chip close button
   * @param {MouseEvent} event
   * @returns {boolean}
   */
  private static eventComesFromChipCloseButton(event: MouseEvent): boolean {
    const targetElement: HTMLElement = (event.target || event.srcElement) as HTMLElement;
    return targetElement.className.indexOf('mat-chip-remove') > -1;
  }

  @Input() type: string;
  @Input() control: FormGroup;

  @ViewChild('metaSearchInput') inputElRef: ElementRef;

  autocompleteList: Location[] = [];
  autocompleteList2: Location[] = [];
  autocompleteList3: Location[] = [];
  selectedEntities$: BehaviorSubject<TooltipEntity[]> = new BehaviorSubject<TooltipEntity[]>([]);
  popularLocations: TooltipEntity[];
  keyupSubscription: Subscription;
  noResultsFound: boolean;
  hideChips: boolean;
  hasSelectedEntities: boolean;
  hasMoreThanOneEntity: boolean;
  hasPopularLocations: boolean;
  inputHasFocus: boolean;
  numEntitiesSelected: number;

  get empty() {
    return this.type === 'airports' ?
      this.translate.instant('searchBar.airports.placeholder') :
      this.translate.instant('searchBar.destinations.default');
  }

  get placeholder() {
    return this.type === 'airports' ?
      `${this.translate.instant('searchBar.from')}` :
      `${this.translate.instant('searchBar.to')}`;
  }

  constructor(
    public dialog: MatDialog,
    public metaSearchService: MetaSearchService,
    private changeDetectorRef: ChangeDetectorRef,
    private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.inputHasFocus = false;
    this.selectedEntities$.subscribe((entities: TooltipEntity[]) => {
      this.control.setValue(entities);
      this.hasSelectedEntities = entities && entities.length > 0;
      this.hasMoreThanOneEntity = entities && entities.length > 1;
      this.hideChips = this.hasMoreThanOneEntity;
      this.numEntitiesSelected = entities ? entities.length : 0;
    });

    (this.type === 'airports'
      ? this.metaSearchService.getPopularOrigins()
      : this.metaSearchService.getPopularDestinations())
    .subscribe((locations: Locations) => {
      this.popularLocations = (locations[this.type === 'airports' ? 'airports' : 'destinations'] || [])
        .map((entity: Location) => {
          return {
            title: entity.title,
            code: entity.code,
          };
        }) as TooltipEntity[];
      this.hasPopularLocations = this.popularLocations && this.popularLocations.length > 0;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.keyupSubscription = fromEvent(this.inputElRef.nativeElement, 'keyup')
      .pipe(debounceTime(300))
      .subscribe((keyboardEvent: KeyboardEvent) => {
        this.searchForLocations((<HTMLInputElement>keyboardEvent.target).value);
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.keyupSubscription.unsubscribe();
  }

  /**
   * Remove tooltip entity from the list
   * @param {TooltipEntity} entity
   * @returns {void}
   */
  removeEntity(entity: TooltipEntity): void {
    this.selectedEntities$.next(this.selectedEntities$.getValue().filter((current) => current !== entity));
  }

  /**
   * Autocomplete on user input
   * @param {string} searchText user's input
   * @returns {void}
   */
  searchForLocations(searchText: string): void {
    if (searchText.length < 3) {
      this.autocompleteList = [];
      this.autocompleteList2 = [];
      this.autocompleteList3 = [];
      return;
    }

    (this.type === 'airports'
      ? this.metaSearchService.getOrigins(searchText)
      : this.metaSearchService.getDestinations(searchText)
    ).subscribe(data => {
      this.autocompleteList = data.destinations || [];
      this.autocompleteList2 = data.hotels || [];
      this.autocompleteList3 = data.airports || [];
      this.noResultsFound = [...this.autocompleteList, ...this.autocompleteList2, ...this.autocompleteList3].length === 0;
      this.changeDetectorRef.detectChanges();
    }, error => console.log('ERROR: ', error));
  }

  /**
   * On select from autocompletion list
   * @param {MatAutocompleteSelectedEvent} event
   * @returns {void}
   */
  onAutocompleteItemSelect(event: MatAutocompleteSelectedEvent): void {
    const matchedTitle = [...this.autocompleteList, ...this.autocompleteList2, ...this.autocompleteList3]
      .filter((element) => element.code === event.option.value)[0].title;
    const newEntity = {
      title: matchedTitle,
      code: event.option.value,
      checked: event.option.selected,
    };

    this.selectedEntities$.next([newEntity as TooltipEntity]);

    (<HTMLInputElement>this.inputElRef.nativeElement).value = '';
    this.autocompleteList = [];
    this.autocompleteList2 = [];
    this.autocompleteList3 = [];

    this.removeFocusFromInput();
  }

  /**
   * On focus over input it changes state of some component properties
   * @returns {void}
   */
  onFocus(): void {
    setTimeout(() => {
      this.noResultsFound = false;
      this.hideChips = true;
      this.inputHasFocus = true;
      this.changeDetectorRef.detectChanges();
    }, 150);
  }

  /**
   * On blur over input it changes state of some component properties
   * @returns {void}
   */
  onBlur(): void {
    setTimeout(() => {
      this.hideChips = this.hasMoreThanOneEntity;
      this.inputHasFocus = false;
      this.noResultsFound = false;
      (<HTMLInputElement>this.inputElRef.nativeElement).value = '';
      this.changeDetectorRef.detectChanges();
    }, 150);
  }

  /**
   * Forces focus over input
   * @param {MouseEvent} event
   * @returns {void}
   */
  setFocusOnInput(event: MouseEvent): void {
    const inputElement = <HTMLInputElement>this.inputElRef.nativeElement;
    setTimeout(() => {
      if (document.activeElement !== inputElement && !PackagesBarTooltipComponent.eventComesFromChipCloseButton(event)) {
        inputElement.focus();
      }
    }, 150);
  }

  /**
   * Releases the focus from the input
   * @returns {void}
   */
  removeFocusFromInput(): void {
    const inputElement = <HTMLInputElement>this.inputElRef.nativeElement;
    inputElement.blur();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Open popup of popular locations { airports | destinations }
   * @param {MouseEvent} event
   * @returns {void}
   */
  openPredefinedListDialog(event: MouseEvent): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'popular-locations-panel';
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = Object.assign({}, {
      title: this.translate.instant(`searchBar.${this.type}.popular.title`),
      entities: this.popularLocations,
      selectedEntities: this.selectedEntities$.getValue(),
    });

    const selectedEntities = this.selectedEntities$.getValue() || [];
    dialogConfig.data.entities = <TooltipEntity[]>(dialogConfig.data.entities)
      .map((entity: TooltipEntity) => {
        const matchedEntity: TooltipEntity[] = selectedEntities.filter((sEntity: TooltipEntity) => {
          return sEntity.code === entity.code;
        });
        entity.checked = matchedEntity.length > 0;
        return entity;
      });

    this.dialog.open(PackagesBarTooltipDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((popularEntities) => {
        this.selectedEntities$.next(popularEntities);
        (<HTMLInputElement>this.inputElRef.nativeElement).value = '';
        this.noResultsFound = false;
      });

    event.stopPropagation();
  }

  /**
   * Get the text displayed over the input when we have more than one location selected
   * @returns {string}
   */
  getShortFormTextForLocations(): string {
    return `${this.numEntitiesSelected} ${this.type === 'airports' ? 'Airports' : 'Destinations'}`;
  }

  getDestinationsNotFoundKeyForTranslation(): string {
    return `searchBar.${this.type}.suggestions.empty`;
  }

}
