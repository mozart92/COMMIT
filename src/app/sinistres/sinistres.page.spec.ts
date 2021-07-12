import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SinistresPage } from './sinistres.page';

describe('SinistresPage', () => {
  let component: SinistresPage;
  let fixture: ComponentFixture<SinistresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinistresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SinistresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
