import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AfrikpayPage } from './afrikpay.page';

describe('AfrikpayPage', () => {
  let component: AfrikpayPage;
  let fixture: ComponentFixture<AfrikpayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfrikpayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AfrikpayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
