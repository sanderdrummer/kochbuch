import { Component, OnInit } from '@angular/core';
import {ListsModel} from './lists.model';
import {Router} from '@angular/router';
import {State} from '../shared/app.state.service';
import {ListsService} from '../lists.service';
import {ListModel} from '../list/list.model';
import {Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'kb-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.less']
})
export class ListsComponent implements OnInit {
  loading:boolean;
  addListForm;

  constructor(public state:State, public listsService:ListsService, private router:Router, fb:FormBuilder) {
    this.addListForm = fb.group({
      'listName' : ['', Validators.required]
    });
  }

  ngOnInit(){
    this.state.resetAlerts();

    if (!this.state.lists.length) {
      this.loading = true;
      this.listsService.getLists().toPromise().then((res) => {
        this.updateList(res);
      });
    }
  }


  addList(listName:string): void {
    this.state.setAlert('alert-info', `Liste ${listName} wird hinzugefügt`);
    this.listsService.addList(listName).toPromise().then((list) => {
      if (list) {
        this.state.setAlert('alert-success', `Liste ${listName} erfolgreich hinzugefügt`);
        this.state.lists.push(list);
        this.addListForm.reset();
      }
    }, () => {
      this.state.setAlert('alert-danger', `Fehler beim anlegen der Liste :(`);
    });
  }

  updateList(lists:ListModel[]) {
    this.state.lists = lists;
    this.loading = false;
  }

  selectList(list) {
    this.state.selectedList = list;
    this.router.navigate(['list', list.id]);
  }

  toSelection(){
    this.router.navigate(['']);
  }

}
