import { Component, OnInit } from '@angular/core';
import {FirebaseObjectObservable} from 'angularfire2';
import {ListStore} from '../shared/stores/list.store';
import {FormBuilder, Validators} from '@angular/forms';
import {ListModel} from '../shared/models/list.model';

@Component({
  selector: 'kb-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  addListForm;
  lists$: FirebaseObjectObservable<any>;
  listsSubscription;
  loading:boolean;
  constructor(
    public store: ListStore,
    fb: FormBuilder) {

    this.addListForm = fb.group({
      'listName': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.listsSubscription.unsubscribe();

  }

  selectList(list:ListModel) {
    this.store.selectList(list);
  }

  addList(title:string) {
    this.addListForm.disable();
    this.store.addList(title).then(() => {
      this.addListForm.enable();
      this.addListForm.reset();
    });
  }
}
