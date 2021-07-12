import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductDevisPage } from './product-devis.page';

describe('ProductDevisPage', () => {
  let component: ProductDevisPage;
  let fixture: ComponentFixture<ProductDevisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDevisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDevisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
