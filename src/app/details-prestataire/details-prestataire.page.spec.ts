import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsPrestatairePage } from './details-prestataire.page';

describe('DetailsPrestatairePage', () => {
  let component: DetailsPrestatairePage;
  let fixture: ComponentFixture<DetailsPrestatairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPrestatairePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPrestatairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
