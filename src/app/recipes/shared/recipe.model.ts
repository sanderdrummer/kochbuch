
import {ProductModel} from '../../lists/products/product.model';
import {CategoryModel} from '../recipe-categories/shared/category.model';
export class RecipeModel {
  title:string;
  products: ProductModel[];
  description:string;
  categories: CategoryModel[];

  constructor(config:any) {
    this.title = config.title || '';
    this.products = config.products || [];
    this.description = config.description || '';
    this.categories = config.categories || [];
  }
}
