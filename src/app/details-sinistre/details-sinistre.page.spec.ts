import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsSinistrePage } from './details-sinistre.page';

describe('DetailsSinistrePage', () => {
  let component: DetailsSinistrePage;
  let fixture: ComponentFixture<DetailsSinistrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSinistrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsSinistrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
