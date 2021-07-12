import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StripePaymentPage } from './stripe-payment.page';

describe('StripePaymentPage', () => {
  let component: StripePaymentPage;
  let fixture: ComponentFixture<StripePaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripePaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StripePaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
