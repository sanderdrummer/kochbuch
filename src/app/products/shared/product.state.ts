import {ProductModel} from './product.model';
export class ProductState {
  products: ProductModel[];
  filteredProducts: ProductModel[];
  selectedProduct: ProductModel;

  constructor(config: any) {
    this.products = config.products;
    this.filteredProducts = this.products;
    this.selectedProduct = null;
  }
}
