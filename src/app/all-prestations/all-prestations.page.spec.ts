import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllPrestationsPage } from './all-prestations.page';

describe('AllPrestationsPage', () => {
  let component: AllPrestationsPage;
  let fixture: ComponentFixture<AllPrestationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPrestationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllPrestationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
