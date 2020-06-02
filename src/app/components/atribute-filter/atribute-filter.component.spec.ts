import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtributeFilterComponent } from './atribute-filter.component';

describe('AtributeFilterComponent', () => {
  let component: AtributeFilterComponent;
  let fixture: ComponentFixture<AtributeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtributeFilterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtributeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
