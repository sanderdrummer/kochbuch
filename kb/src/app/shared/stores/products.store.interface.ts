
import {ProductModel} from "../models/product.model";
export interface ProductsStoreInterface {
  show: boolean,
  query: string,
  products: ProductModel[],
  selectedProduct: ProductModel,
  filteredProducts: ProductModel[]
}
