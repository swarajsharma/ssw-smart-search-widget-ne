import { storiesOf } from '@storybook/angular';
import { SharedModule } from '../../../../../app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

storiesOf('Shared Components|Room', module)
  .add('Room 1', () => ({
    template: `
      <sw-room roomNumber="1"
               [selectedDefaults]="selectedDefaults"
               [selectedRoomValues]="selectedRoomValues"
               [roomProperty]="roomProperty"></sw-room>
    `,
    props: {
      selectedDefaults: {
        MaxAdults: 9,
        MinAdults: 1,
        MaxChildren: 4,
        MinChildren: 0,
      },
      selectedRoomValues: {
        RoomNo: 1,
        Adults: 2,
        ChildrenList: [],
      },
      roomProperty: {
        RoomNo: 1,
        ExpandPanel: true,
        EnableRemove: true,
        EnableEditSearch: true,
      },
    },
    moduleMetadata: {
      imports: [
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
    },
  }));
