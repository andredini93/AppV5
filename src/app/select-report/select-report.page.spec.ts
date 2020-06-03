import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectReportPage } from './select-report.page';

describe('SelectReportPage', () => {
  let component: SelectReportPage;
  let fixture: ComponentFixture<SelectReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
