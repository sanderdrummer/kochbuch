/**
 * Created by Tobias on 16.01.2017.
 */
export class ProductModel {
  title:string;
  amount:string;
  popularity:number;

  constructor(config) {
    this.title = config.title || 'Neues Produkt';
    this.amount = config.amount || '0';
    this.popularity = config.popularity || 0;
  }
}
