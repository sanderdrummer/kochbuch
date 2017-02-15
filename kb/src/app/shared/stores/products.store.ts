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
  state$:BehaviorSubject<ProductsState>;
  state:ProductsState;

  baseUrl:string;

  constructor(private af:AngularFire, private parser:ParserService) {

    this.baseUrl = '/products';

    this.products$ = af.database.object('/products');


    this.state = {
      products: [],
      selectedProduct: null
    };


    this.state$ = new BehaviorSubject(this.state);

    this.fetchProducts()
  }

  fetchProducts(){
    this.products$.subscribe((productsObj) => {
      const products = [];
      this.parser.parseFireBaseObjToArray(productsObj).forEach((id) => {
        products.push(new ProductModel(productsObj[id]));
      });

      this.state$.next(Object.assign(this.state, {products}));
    });
  }

  selectProduct(selectedProduct){
    this.state$.next(Object.assign(this.state, {selectedProduct}));
  }

  addProduct(product){

  }

  editProduct(){

  }

  deletProduct() {

  }

}

interface ProductsState {
  products: ProductModel[],
  selectedProduct:ProductModel
}
