import { storiesOf } from '@storybook/angular';
import { SharedModule } from '../../../app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomSelectorDialogComponent } from './room-selector-dialog/room-selector-dialog.component';


storiesOf('Shared Components|RoomSelector', module)
  .add('default', () => ({
    template: `
      <sw-room-selector></sw-room-selector>
    `,
    moduleMetadata: {
      imports: [
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      entryComponents: [
        RoomSelectorDialogComponent,
      ],
    },
  }));
