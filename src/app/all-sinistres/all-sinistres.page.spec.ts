import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllSinistresPage } from './all-sinistres.page';

describe('AllSinistresPage', () => {
  let component: AllSinistresPage;
  let fixture: ComponentFixture<AllSinistresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSinistresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllSinistresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
