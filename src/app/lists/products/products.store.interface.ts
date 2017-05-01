
import {ProductModel} from './product.model';
export interface ProductStateInterface {
  show: boolean,
  query: string,
  products: ProductModel[],
  selectedProduct: ProductModel,
  filteredProducts: ProductModel[]
}
