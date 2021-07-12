import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PosMapPage } from './pos-map.page';

describe('PosMapPage', () => {
  let component: PosMapPage;
  let fixture: ComponentFixture<PosMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PosMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
