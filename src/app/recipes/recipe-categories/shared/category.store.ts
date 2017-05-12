import {Injectable} from '@angular/core';
import {Store} from '../../../shared/store';
import {CategoryState} from './category.state';
import {CategoryService} from './category.service';
@Injectable()
export class CategoryStore extends Store<CategoryState> {

  constructor(private categoryService: CategoryService) {
    super();
    this.init(new CategoryState());
    this.getCategories();
  }

  selectCategory(selectedCategory) {
    this.update({selectedCategory});
  }

  getCategories() {
    this.categoryService.readCategories().subscribe((categories) => {
      this.update({categories});
    });
  }
}
