import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllDevisPage } from './all-devis.page';

describe('AllDevisPage', () => {
  let component: AllDevisPage;
  let fixture: ComponentFixture<AllDevisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDevisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllDevisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
