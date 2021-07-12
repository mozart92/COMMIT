import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SecondActivationPage } from './second-activation.page';

describe('SecondActivationPage', () => {
  let component: SecondActivationPage;
  let fixture: ComponentFixture<SecondActivationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondActivationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SecondActivationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
