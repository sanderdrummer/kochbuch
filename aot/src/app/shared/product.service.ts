import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {apiUrl} from "./apiurl";

@Injectable()
export class ProductService {

    constructor(private http: Http) {
    }

    getProducts() {
        return this.http.get(apiUrl + 'product').map((configs) => configs.json());
    }

    addProduct(name:string) {
        return this.http.get(apiUrl + 'product/create?name=' + name).map((configs) => configs.json());

    }

    addProductToList(amount:string, product_id:number, list_id:number) {
        const params: string = [
            `amount=${amount}`,
            `list_id=${list_id}`,
            `product_id=${product_id}`
        ].join('&');

        return this.http.get(apiUrl + 'item/create?' + params).map((configs) => configs.json());

    }

    addNewProductToList(name:string, amount:string = '1', list_id:number) {
        const params: string = [
            `name=${name}`,
            `amount=${amount}`,
            `list_id=${list_id}`
        ].join('&');

        return this.http.get(apiUrl + 'product/add?' + params).map((configs) => configs.json());

    }

    deleteProduct(id:number) {
        return this.http.get(apiUrl + 'product/destroy?id=' + id).map((configs) => configs.json());
    }
}
