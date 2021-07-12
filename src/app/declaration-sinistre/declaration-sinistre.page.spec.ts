import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeclarationSinistrePage } from './declaration-sinistre.page';

describe('DeclarationSinistrePage', () => {
  let component: DeclarationSinistrePage;
  let fixture: ComponentFixture<DeclarationSinistrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationSinistrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeclarationSinistrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
