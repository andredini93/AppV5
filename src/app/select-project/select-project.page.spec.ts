import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectProjectPage } from './select-project.page';

describe('SelectProjectPage', () => {
  let component: SelectProjectPage;
  let fixture: ComponentFixture<SelectProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProjectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
