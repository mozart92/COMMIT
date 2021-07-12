import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrestationsPage } from './prestations.page';

describe('PrestationsPage', () => {
  let component: PrestationsPage;
  let fixture: ComponentFixture<PrestationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrestationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
