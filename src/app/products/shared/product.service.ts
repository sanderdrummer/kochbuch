import {Injectable} from '@angular/core';
import {FireBaseCrudService} from '../../shared/firabase-crud.service';
import {ParserService} from '../../shared/parser.service';
import {ProductModel} from './product.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductService {
  private baseUrl: string;
  private listLimit: number;

  constructor(private crud: FireBaseCrudService,
              private parser: ParserService) {
    this.baseUrl = 'products/';
    this.listLimit = 50;
  }

  readProducts(): Observable<ProductModel[]> {
    return this.crud.read(this.baseUrl)
      .distinctUntilChanged()
      .map(productsObj => {
          const products = [];

          Object.keys(productsObj).forEach(key => {
            products.push(new ProductModel(productsObj[key]));
          });

          return products;
        }
      );
  }

  filterProducts(products, query: string): ProductModel[] {
    query = query.toLowerCase();
    const filtered = query ? products.filter((product) => {
      const title = product.title.toLowerCase();

      return title.indexOf(query) > -1;
    }) : products;
    return filtered.slice(0, this.listLimit);
  }

  readProduct() {

  }

  updateProdcut() {

  }

  createProduct(title: string): Promise<void> {
    const product = new ProductModel({title});
    const path = this.getPath(title);
    return this.crud.update(path, product);
  }

  deleteProduct(product: ProductModel): Promise<void> {
    const path = this.getPath(product.title);
    return this.crud.delete(path);
  }

  getPath(key: string): string {
    return this.baseUrl + key;
  }
}
