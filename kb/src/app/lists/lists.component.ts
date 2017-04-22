
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ListStore} from './shared/list.store';
import {ListModel} from './list/shared/list.model';
@Component({
  selector: 'kb-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  addListForm: FormGroup;
  loading: boolean;

  constructor(private router: Router,
              public store: ListStore,
              fb: FormBuilder) {

    this.addListForm = fb.group({
      'listName': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectList(list: ListModel):void {
    this.store.selectList(list);
    this.router.navigate(['list', list.title]);
  }

  addList(title: string):void {
    this.addListForm.disable();
    this.store.addList(title).then(() => {
      this.addListForm.enable();
      this.addListForm.reset();
    });
  }
}
