import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {apiUrl} from "./apiurl";

@Injectable()
export class ProductService {

  constructor(private http:Http) { }

  getProducts() {
    return this.http.get(apiUrl + 'product').map((configs) => configs.json());
  }
  addProduct(name){
    return this.http.get(apiUrl + 'product/create').map((configs) => configs.json());

  }

  addProductToList(amount, id_product, id_list) {
    return this.http.get(apiUrl + 'item/create').map((configs) => configs.json());

  }

  addNewProductToList(name, amount, id_list){
    return this.http.get(apiUrl + 'product/add').map((configs) => configs.json());

  }

  deleteProduct(id){
    return this.http.get(apiUrl + 'product/destroy').map((configs) => configs.json());
  }
}
