import { storiesOf } from '@storybook/angular';
import { SharedModule } from '../../../../../../app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


storiesOf('Shared Components|ChildrenSelect', module)
  .add('Child1  age 12, max age 18', () => ({
    template: `
      <sw-children-select [selectedChildValues]="selectedChildValues" maxChildAge="18"></sw-children-select>
    `,
    props: {
      selectedChildValues: {
        ChildNo: 1,
        ChildAge: '12',
      },
    },
    moduleMetadata: {
      imports: [
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
    },
  }))
  .add('Child 2 age 7, max age 12', () => ({
    template: `
      <sw-children-select [selectedChildValues]="selectedChildValues" maxChildAge="12"></sw-children-select>
    `,
    props: {
      selectedChildValues: {
        ChildNo: 2,
        ChildAge: '7',
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
