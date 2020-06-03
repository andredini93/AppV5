import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReloadProjectPage } from './reload-project.page';

describe('ReloadProjectPage', () => {
  let component: ReloadProjectPage;
  let fixture: ComponentFixture<ReloadProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReloadProjectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReloadProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
