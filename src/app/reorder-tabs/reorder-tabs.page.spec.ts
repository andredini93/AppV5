import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReorderTabsPage } from './reorder-tabs.page';

describe('ReorderTabsPage', () => {
  let component: ReorderTabsPage;
  let fixture: ComponentFixture<ReorderTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReorderTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReorderTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
