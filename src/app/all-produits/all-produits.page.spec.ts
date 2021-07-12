import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllProduitsPage } from './all-produits.page';

describe('AllProduitsPage', () => {
  let component: AllProduitsPage;
  let fixture: ComponentFixture<AllProduitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProduitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllProduitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
