import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoriesUpdateComponent } from './recipe-categories-update.component';

describe('RecipeCategoriesUpdateComponent', () => {
  let component: RecipeCategoriesUpdateComponent;
  let fixture: ComponentFixture<RecipeCategoriesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCategoriesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCategoriesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
