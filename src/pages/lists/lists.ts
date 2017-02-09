import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ListsListPage} from '../lists-list/lists-list';
import {ListStore} from '../../stores/list.store';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {Validators, FormBuilder} from '@angular/forms';
import {ListModel} from '../../models/list.model';
import {ParserService} from '../../providers/parser.service';

/*
 Generated class for the Lists page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {
  addListForm;
  lists$: FirebaseObjectObservable<any>;
  listsSubscription;
  loading:boolean;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public store: ListStore,
              fb: FormBuilder) {

    this.addListForm = fb.group({
      'listName': ['', Validators.required]
    });
  }

  ionViewWillLeave(){
    this.listsSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    // this.loading = true;
    this.listsSubscription = this.store.fetchLists();
  }

  selectList(list:ListModel) {
    this.store.selectList(list);
    this.navCtrl.push(ListsListPage);
  }

  addList(title:string) {
    this.addListForm.disable();
    this.store.addList(title).then(() => {
      this.addListForm.enable();
      this.addListForm.reset();
    });
  }
}
