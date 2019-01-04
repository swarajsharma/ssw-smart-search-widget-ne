import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MarketSpecific } from '../../../../app/core/market-specific.decorator';
import { MarketConfiguration } from '../../../../app/core/configurator.service';
import { config } from './packages-bar-duration.config';

@Component({
  selector: 'sw-packages-bar-duration',
  templateUrl: 'packages-bar-duration.component.html',
  styleUrls: ['./packages-bar-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesBarDurationComponent {
  @Input() control: FormControl;
  durationEntities: object[];

  @MarketSpecific(config)
  config: MarketConfiguration;

  constructor() {
    this.durationEntities = (this.config.options as object[]);
  }
}
