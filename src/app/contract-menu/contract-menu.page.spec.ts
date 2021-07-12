import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContractMenuPage } from './contract-menu.page';

describe('ContractMenuPage', () => {
  let component: ContractMenuPage;
  let fixture: ComponentFixture<ContractMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContractMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
