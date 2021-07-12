import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsActualitePage } from './details-actualite.page';

describe('DetailsActualitePage', () => {
  let component: DetailsActualitePage;
  let fixture: ComponentFixture<DetailsActualitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsActualitePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsActualitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
