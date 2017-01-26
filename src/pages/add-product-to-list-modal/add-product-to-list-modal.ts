import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {ListStore} from '../../stores/list.store';
import {FormGroup, FormControl} from '@angular/forms';
import {ProductModel} from '../../models/product.model';

/*
  Generated class for the AddProductToListModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-product-to-list-modal',
  templateUrl: 'add-product-to-list-modal.html'
})
export class AddProductToListModalPage {
  amountsForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public store:ListStore, public viewCtrl: ViewController) {
    this.amountsForm = new FormGroup({
      amount: new FormControl('1')
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductToListModalPage');
  }

  addProductWithAmountToList(amount) {
    const listEntryProduct = new ProductModel(Object.assign(this.store.selectedProduct, amount));
    this.store.selectedList.forBasket.push(listEntryProduct);
    this.store.selectedFirebase$.update(this.store.selectedList);
    this.viewCtrl.dismiss();
  }

  closeModal() {
    this.navCtrl.pop();
  }
}
