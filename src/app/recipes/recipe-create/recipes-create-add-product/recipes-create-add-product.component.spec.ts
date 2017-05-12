import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesCreateAddProductComponent } from './recipes-create-add-product.component';

describe('RecipesCreateAddProductComponent', () => {
  let component: RecipesCreateAddProductComponent;
  let fixture: ComponentFixture<RecipesCreateAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesCreateAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesCreateAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
