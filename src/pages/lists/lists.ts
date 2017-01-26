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
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public store: ListStore,
              af: AngularFire,
              public parser: ParserService,
              fb: FormBuilder) {

    this.lists$ = af.database.object('/lists');


    this.addListForm = fb.group({
      'listName': ['', Validators.required]
    });
  }

  ionViewWillLeave(){
    console.log('test' );
    this.listsSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.listsSubscription = this.lists$.subscribe((listObj) => {
      this.store.lists = [];
      this.parser.parseFireBaseObjToArray(listObj).forEach((listId) => {
        this.store.lists.push(new ListModel(listObj[listId]));
      });
    });
  }

  selectList(list:ListModel) {
    this.store.selectedList = list;
    this.navCtrl.push(ListsListPage);
  }

  addList(title:string) {

    const newList = {};
    newList[title] = new ListModel({title});
    this.lists$.update(newList);
    this.addListForm.reset();
  }
}
