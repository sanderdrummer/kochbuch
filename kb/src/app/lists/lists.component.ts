import { Component, OnInit } from '@angular/core';
import {FirebaseObjectObservable} from 'angularfire2';
import {ListStore} from '../shared/stores/list.store';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ListModel} from '../shared/models/list.model';
import {Router} from '@angular/router';

@Component({
  selector: 'kb-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  addListForm:FormGroup;
  loading:boolean;
  constructor(
    private router:Router,
    public store: ListStore,
    fb: FormBuilder) {

    this.addListForm = fb.group({
      'listName': ['', Validators.required]
    });
  }

  ngOnInit() {}

  ngOnDestroy(){}

  selectList(list:ListModel) {
    this.store.selectList(list);
    this.router.navigate(['list', list.title]);
  }

  addList(title:string) {
    this.addListForm.disable();
    this.store.addList(title).then(() => {
      this.addListForm.enable();
      this.addListForm.reset();
    });
  }
}
