import { storiesOf } from '@storybook/angular';
import { SharedModule } from '../shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


storiesOf('Shared Components|Datepicker', module)
  .add('default', () => ({
    template: `
      <sw-datepicker></sw-datepicker>
    `,
    moduleMetadata: {
      imports: [
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
    },
  }));
