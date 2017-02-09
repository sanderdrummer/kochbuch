import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {ListStore} from '../../stores/list.store';
import {FirebaseObjectObservable, AngularFire} from 'angularfire2';
import {ProductModel} from '../../models/product.model';
import {ParserService} from '../../providers/parser.service';
import {AddProductToListModalPage} from '../add-product-to-list-modal/add-product-to-list-modal';
import {FormControl, FormGroup} from '@angular/forms';
import {FocusDirective} from '../../app/shared/focus';

/*
 Generated class for the Products page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {
  @ViewChild('focus') focus:FocusDirective;

  newProductTitle: string;
  filteredProducts: ProductModel[];
  products$: FirebaseObjectObservable<any>;
  productsSubscription;
  searchForm: FormGroup;
  errorMsg: string;
  limit:number;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController,
              public store: ListStore, public af: AngularFire, public parser: ParserService) {

    this.searchForm = new FormGroup({
      input: new FormControl('')
    });

    this.products$ = af.database.object('/products');
    this.limit = 25;
    // get products list of productsObj from Firebase

  }


  ionViewWillEnter() {
    this.productsSubscription = this.products$.subscribe((productsObj) => {
      this.store.products = [];
      this.parser.parseFireBaseObjToArray(productsObj).forEach((id) => {
        this.store.products.push(new ProductModel(productsObj[id]));
      });
      // init filteredProducts
      this.resetFilter();
      this.focus.setFocus();
    });

    console.log(this.focus );
  }

  ionViewWillLeave() {
    this.productsSubscription.unsubscribe();
  }

  resetFilter() {
    this.searchForm.reset();
    this.filteredProducts = [...this.store.products].sort((a,b) => {
      return Number(b.popularity) - Number(a.popularity);
    });
    this.limitList();
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.filteredProducts = [...this.store.products];

    // set val to the value of the ev target
    const val = ev.target.value;
    this.newProductTitle = val;


    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filteredProducts = this.filteredProducts.filter((item) => {
        return (item && item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    this.limitList();
  }

  limitList() {

    if (this.filteredProducts.length > this.limit) {
      this.filteredProducts = this.filteredProducts.slice(0, this.limit);
    }
  }

  addNewArticleToProductList() {
    if (this.newProductTitle) {
      const newProduct = new ProductModel({title: this.newProductTitle});
      const fireBaseEntry = {};
      fireBaseEntry[this.newProductTitle] = newProduct;
      this.products$.update(fireBaseEntry);
      this.store.selectedProduct = newProduct;
      this.errorMsg = null;
      this.showAddProductToListModal();
      this.resetFilter();
    } else {
      this.errorMsg = 'Fehler beim Anlegen des neuen Produkts kein Name gewählt'
    }
  }

  selectArticleFromProductList(product: ProductModel) {
    product.popularity += 1;
    this.store.selectedProduct = product;
    this.af.database.object('/products/' + product.title).update(this.store.selectedProduct);
    this.resetFilter();
    this.showAddProductToListModal();

  }

  showAddProductToListModal() {
    const addProductToListModalCtrl = this.modalCtrl.create(AddProductToListModalPage);
    addProductToListModalCtrl.present();
  }

}
