import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ProductState} from './product.state';
import {Store} from '../../shared/store';
import {ProductService} from './product.service';
import {Injectable} from '@angular/core';
import {ProductModel} from './product.model';

@Injectable()
export class ProductStore extends Store<ProductState> {

  state$: BehaviorSubject<ProductState>;

  constructor(public productService: ProductService) {
    super();
    this.init(new ProductState({products: []}));
    this.initProducts();
  }

  initProducts() {
    this.productService.readProducts().subscribe(products => {
      this.update({
        products
      });
      this.setFilteredProducts('');
    });
  }

  setFilteredProducts(query: string) {
    const state = this.state$.getValue();
    const filteredProducts = this.productService.filterProducts(state.products, query);
    this.update({filteredProducts})
  }

  getFilteredProducts() {
    return this.state$.map(state => state.filteredProducts);
  }

}
