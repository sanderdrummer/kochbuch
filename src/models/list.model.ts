import {ProductModel} from './product.model';
export class ListModel {
  title:string;
  forBasket: ProductModel[];
  inBasket: ProductModel[];

  constructor(config:any) {
    console.log(config );
    this.title = config.title || 'Neue Liste';
    this.forBasket = config.forBasket || [];
    this.inBasket = config.inBasket || [];
  }
}
