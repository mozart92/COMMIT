import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestPrestationsPage } from './request-prestations.page';

describe('RequestPrestationsPage', () => {
  let component: RequestPrestationsPage;
  let fixture: ComponentFixture<RequestPrestationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPrestationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestPrestationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
