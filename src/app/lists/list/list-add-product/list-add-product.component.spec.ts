import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddProductComponent } from './list-add-product.component';

describe('ListAddProductComponent', () => {
  let component: ListAddProductComponent;
  let fixture: ComponentFixture<ListAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
