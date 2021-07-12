import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevisResultPage } from './devis-result.page';

describe('DevisResultPage', () => {
  let component: DevisResultPage;
  let fixture: ComponentFixture<DevisResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevisResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevisResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
