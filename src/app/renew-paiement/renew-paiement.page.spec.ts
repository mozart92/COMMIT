import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RenewPaiementPage } from './renew-paiement.page';

describe('RenewPaiementPage', () => {
  let component: RenewPaiementPage;
  let fixture: ComponentFixture<RenewPaiementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewPaiementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RenewPaiementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
