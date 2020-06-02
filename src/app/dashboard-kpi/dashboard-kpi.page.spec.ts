import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardKPIPage } from './dashboard-kpi.page';

describe('DashboardKPIPage', () => {
  let component: DashboardKPIPage;
  let fixture: ComponentFixture<DashboardKPIPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardKPIPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardKPIPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
