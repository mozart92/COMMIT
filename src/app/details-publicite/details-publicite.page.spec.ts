import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsPublicitePage } from './details-publicite.page';

describe('DetailsPublicitePage', () => {
  let component: DetailsPublicitePage;
  let fixture: ComponentFixture<DetailsPublicitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPublicitePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPublicitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
