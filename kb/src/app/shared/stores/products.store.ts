/**
 * Created by Tobias on 09.02.2017.
 */
import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {BehaviorSubject} from 'rxjs';
import {AngularFire} from 'angularfire2';
import {ParserService} from '../parser.service';
@Injectable()
export class ProductsStore {

  products$;
  state$: BehaviorSubject<ProductsState>;
  state: ProductsState;
  limit;
  baseUrl: string;

  constructor(private af: AngularFire, private parser: ParserService) {

    this.baseUrl = '/products';

    this.products$ = af.database.object('/products');
    this.limit = 25;

    this.state = {
      query:'',
      products: [],
      selectedProduct: null,
      filteredProducts: []
    };


    this.state$ = new BehaviorSubject(this.state);

    this.fetchProducts()
  }

  fetchProducts() {
    this.products$.subscribe((productsObj) => {
      const products = [];
      this.parser.parseFireBaseObjToArray(productsObj).forEach((id) => {
        products.push(new ProductModel(productsObj[id]));
      });

      // this.state.products = products;

      this.state$.next(Object.assign(this.state, {products}));
      this.updateFilteredProducts(this.state.query);
    });
  }

  filterProducts(query) {
    if (query && query.trim().length) {
      return this.state.products.filter((item) => {
        return (item && item.title.toLowerCase().indexOf(query.toLowerCase()) > -1);
      });
    } else {
      return this.state.products;
    }
  }

  updateFilteredProducts(query) {
    const limitedProducts = this.filterProducts(query);
    limitedProducts.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    this.state$.next(Object.assign(this.state, {filteredProducts: limitedProducts.slice(0, this.limit)}));
  }


  selectProduct(selectedProduct) {
    this.state$.next(Object.assign(this.state, {selectedProduct}));
  }

  addProduct(product) {

  }

  editProduct() {

  }

  deletProduct() {

  }

}

interface ProductsState {
  query:string,
  products: ProductModel[],
  selectedProduct: ProductModel,
  filteredProducts: ProductModel[]
}
