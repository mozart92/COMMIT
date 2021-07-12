import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateSinistrePage } from './update-sinistre.page';

describe('UpdateSinistrePage', () => {
  let component: UpdateSinistrePage;
  let fixture: ComponentFixture<UpdateSinistrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSinistrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateSinistrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
