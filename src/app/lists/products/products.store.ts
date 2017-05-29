import {Injectable} from '@angular/core';
import {Store} from '../../shared/store';
import {ParserService} from '../../shared/parser.service';
import {ProductModel} from './product.model';
import {ProductStateInterface} from './products.store.interface';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
/**
 * Created by Tobias on 09.02.2017.
 */
@Injectable()
export class ProductsStore extends Store<ProductStateInterface> {

  products$: FirebaseObjectObservable<any>;
  limit: number;
  baseUrl: string;

  constructor(private af: AngularFireDatabase, private parser: ParserService) {
    super();
    this.baseUrl = '/products';

    this.products$ = af.object('/products');
    this.limit = 25;
    this.init({
      show: false,
      query: '',
      products: [],
      selectedProduct: null,
      filteredProducts: []
    });

    this.fetchProducts();
  }

  fetchProducts() {
    this.products$.subscribe((productsObj) => {
      const products = [];
      this.parser.parseFireBaseObjToArray(productsObj).forEach((id) => {
        products.push(new ProductModel(productsObj[id]));
      });

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
    const newProduct = new ProductModel({title: product});
    const fireBaseEntry = {};

    fireBaseEntry[product] = newProduct;

    this.state$.next(Object.assign(this.state, {
      selectedProduct: newProduct,
      query: '',
    }));
    return this.products$.update(fireBaseEntry).then(() => {
      return newProduct;
    });
  }

  removeProduct(title) {
    this.state$.next(Object.assign(this.state, {selectedProduct: null}));
    return this.af.object(this.baseUrl + '/' + title).remove();
  }

}
