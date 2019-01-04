import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import {
  PackagesBarTooltipData,
} from '../../../../../app/search-widget/packages-bar/packages-bar-tooltip/packages-bar-tooltip-dialog/packages-bar-tooltip-dialog.interface';
import { TooltipEntity } from '../../../../../app/search-widget/packages-bar/packages-bar.interface';


@Component({
  selector: 'sw-packages-bar-tooltip-dialog',
  templateUrl: 'packages-bar-tooltip-dialog.component.html',
  styleUrls: ['./packages-bar-tooltip-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesBarTooltipDialogComponent implements OnInit {

  static readonly regExpReplaceExtraText = new RegExp(',[a-zA-Z0-9 ]*$');
  hasChanges: boolean;
  backupModel: PackagesBarTooltipData;

  constructor(
    public dialogRef: MatDialogRef<PackagesBarTooltipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PackagesBarTooltipData,
  ) {
  }

  ngOnInit() {
    this.hasChanges = false;
    this.backupModel = JSON.parse(JSON.stringify(this.data));
    this.dialogRef.backdropClick().subscribe(() => this.closeTooltip());
  }

  getEntityShortText(entityText: string): string {
    return entityText.replace(PackagesBarTooltipDialogComponent.regExpReplaceExtraText, '');
  }

  toggleEntity(event: MatCheckboxChange, entity: TooltipEntity) {
    this.data.entities = <TooltipEntity[]>(this.data.entities)
      .map((item: TooltipEntity) => {
        return item === entity ? { ...item, checked: event.checked === true } : item;
      });
    this.hasChanges = JSON.stringify(this.backupModel.entities) !== JSON.stringify(this.data.entities);
  }

  closeTooltip() {
    this.dialogRef.close(this.backupModel.selectedEntities);
  }

  apply() {
    this.dialogRef.close(this.data.entities.filter((entity) => entity.checked === true));
  }
}
