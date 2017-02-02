import {ProductModel} from './product.model';
export class ListModel {
  title:string;
  forBasket: ProductModel[];
  inBasket: ProductModel[];

  constructor(config:any) {
    this.title = config.title || 'Neue Liste';
    this.forBasket = config.forBasket || [];
    this.inBasket = config.inBasket || [];
  }
}
