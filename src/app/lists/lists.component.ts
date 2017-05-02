import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ListStore} from './shared/list.store';
import {ListService} from './shared/list.service';
import {ListModel} from './shared/list.model';

@Component({
  selector: 'kb-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent {
  addListForm: FormGroup;
  loading: boolean;

  constructor(private router: Router,
              public listStore: ListStore,
              public listService: ListService,
              fb: FormBuilder) {

    this.addListForm = fb.group({
      'listName': ['', Validators.required]
    });
  }

  selectList(list: ListModel): void {
    this.listStore.updateSelectedList(list);
    this.router.navigate(['list', list.title]);
  }

  addList(title: string): void {
    this.addListForm.disable();
    this.listService.createList(title).then(() => {
      this.addListForm.enable();
      this.addListForm.reset();
    });
  }

  deleteList(list) {
    this.loading = true;
    this.listService.deleteList(list).then(() => {
      this.loading = false;
    });
  }
}
