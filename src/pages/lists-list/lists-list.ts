import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ListStore} from '../../stores/list.store';
import {ProductsPage} from '../products/products';
import {AngularFire} from 'angularfire2';
import {ParserService} from '../../providers/parser.service';
import {ListModel} from '../../models/list.model';

/*
 Generated class for the ListsList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-lists-list',
  templateUrl: 'lists-list.html'
})
export class ListsListPage {
  errorMsg:string;
  listSubscribtion;

  constructor(public navCtrl: NavController, public navParams: NavParams, public store: ListStore,
              public parser: ParserService, af:AngularFire) {
    if (this.store.selectedList && this.store.selectedList.title) {
      this.store.selectedFirebase$ = af.database.object(`/lists/${this.store.selectedList.title}`);
    } else {
      this.errorMsg = 'Keine Liste Ausgewählt!'
    }
  }

  ionViewWillEnter() {
    this.listSubscribtion = this.store.selectedFirebase$.subscribe((list) => {
      this.store.selectedList = new ListModel(list);
    });
  }

  ionViewWillLeave() {
    this.listSubscribtion.unsubscribe();
  }

  addProductsToList(){
    this.navCtrl.push(ProductsPage);
  }

  productToBasket(product, index, source, target) {
    if (this.store.selectedList[source]) {
      this.store.selectedList[source].splice(index, 1);
    }
    if (!this.store.selectedList[target]) {
      this.store.selectedList[target] = [];
    }

    this.store.selectedList[target].push(product);
    this.store.selectedFirebase$.update(this.store.selectedList);
  }

  removeProduct(index, source) {
    if (this.store.selectedList[source]) {
      this.store.selectedList[source].splice(index, 1);
    }

    this.store.selectedFirebase$.update(this.store.selectedList);

  }

  removeList() {
    this.store.selectedFirebase$.remove();
    this.navCtrl.push(this.navCtrl.first());
  }

  clearList(){
    this.store.selectedList.forBasket = [];
    this.store.selectedList.inBasket = [];
    this.store.selectedFirebase$.update(this.store.selectedList);
  }
}
