import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {ListsActions} from './lists.actions';
import {ListsService} from '../lists.service';

@Injectable()
export class ListsEffects {

  constructor(private listsService:ListsService, private actions$:Actions) {}

  @Effect()
  lists$: Observable<Action> = this.actions$
    .ofType(ListsActions.INIT)
    .switchMap(() => this.listsService.getLists()
      .map(res => ({type: ListsActions.SET, payload: res}))
      .catch(() => Observable.of({type: ListsActions.ERROR, payload: {type: 'danger', message: 'Users not found!'}}))
    );
}
