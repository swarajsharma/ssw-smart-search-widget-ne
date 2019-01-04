import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchWidgetAppComponent } from './search-widget-app.component';
xdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        SearchWidgetAppComponent,
      ],
    }).compileComponents();
  }));
  xit('should create the app', async(() => {
    const fixture = TestBed.createComponent(SearchWidgetAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
