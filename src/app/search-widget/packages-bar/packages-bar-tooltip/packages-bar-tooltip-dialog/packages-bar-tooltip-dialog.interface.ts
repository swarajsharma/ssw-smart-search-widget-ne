import { TooltipEntity } from '../../../../../app/search-widget/packages-bar/packages-bar.interface';

/**
 * Packages-bar-tooltip-dialog data
 */
export interface PackagesBarTooltipData {
  title: string;
  type: string;
  entities: TooltipEntity[];
  selectedEntities: TooltipEntity[];
}
