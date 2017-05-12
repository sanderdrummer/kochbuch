import {CategoryModel} from './category.model';
export class CategoryState {

  categories:CategoryModel[];
  selectedCategory:CategoryModel;

  constructor(){
    this.categories = [];
    this.selectedCategory = null;
  }
}
