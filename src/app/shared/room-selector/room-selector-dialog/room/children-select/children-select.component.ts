import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Children, AgeConfig } from '../../../../../../app/core/rooms.interface';

@Component({
  selector: 'sw-children-select',
  templateUrl: './children-select.component.html',
  styleUrls: ['./children-select.component.scss'],
})
export class ChildrenSelectComponent implements OnInit {

  @Input() public selectedChildValues: Children;
  @Input() public maxChildAge: number;
  @Output() public changedChild: EventEmitter<Children> = new EventEmitter<Children>();
  childrenAge: number[] = [];
  infantAgeLimit = AgeConfig.InfantAgeLimit;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(): void {
    this.changedChild.emit(this.selectedChildValues);
  }

  getCountOptions(): number[] {
    this.childrenAge = Array.from({ length: this.maxChildAge - (AgeConfig.InfantAgeLimit - 1) }, (_, index) => index); //reducing 1 to maintain the age gap
    return this.childrenAge;
  }
}
