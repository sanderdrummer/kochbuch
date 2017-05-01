import { Injectable } from '@angular/core';
import {FireBaseCrudService} from '../../shared/firabase-crud.service';

@Injectable()
export class ProductService {
  private baseUrl:string;

  constructor(private crudService:FireBaseCrudService) {
    this.baseUrl = 'products/';
  }

  readProducts() {

  }

  updateProdcut() {

  }

  createProduct() {

  }

  deleteProduct() {

  }

}
