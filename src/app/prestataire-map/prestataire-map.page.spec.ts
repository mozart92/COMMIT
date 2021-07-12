import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrestataireMapPage } from './prestataire-map.page';

describe('PrestataireMapPage', () => {
  let component: PrestataireMapPage;
  let fixture: ComponentFixture<PrestataireMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestataireMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrestataireMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
