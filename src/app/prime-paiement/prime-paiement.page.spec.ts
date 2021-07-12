import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrimePaiementPage } from './prime-paiement.page';

describe('PrimePaiementPage', () => {
  let component: PrimePaiementPage;
  let fixture: ComponentFixture<PrimePaiementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimePaiementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrimePaiementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
