import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectAppPage } from './select-app.page';

describe('SelectAppPage', () => {
  let component: SelectAppPage;
  let fixture: ComponentFixture<SelectAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAppPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
