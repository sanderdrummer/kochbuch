import {ProductModel} from '../../products/product.model';
export class ListModel {
  title:string;
  forBasket: ProductModel[];
  inBasket: ProductModel[];

  constructor(config:any) {
    this.title = config.title || 'Neue Liste';
    this.forBasket = config.forBasket || [];
    this.inBasket = config.inBasket || [];
  }

  concatForBasket(products: any[]):void {
    this.forBasket = this.forBasket.concat(products);
  }

  addProductToForBasket(product:ProductModel):void{
    this.forBasket.push(product);
  }

  removeProductFromBasket(index:number, source:string = 'inBasket'):void{
    console.log(index, source, this[source] );
    if (this[source]) {
      this[source].splice(index, 1);
      console.log('ths' );
    }
  }

  swapProducts(product:ProductModel, index:number, source:string, target:string) {
    if (this[source]) {
      this[source].splice(index, 1);
    }

    if (this[target]) {
      this[target].push(product);
    }
  }

  clearBasket() {
    this.inBasket = [];
  }
}
