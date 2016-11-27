import {Injectable} from '@angular/core';
import {ActionFactory} from '../shared/actionFactory';

@Injectable()
export class ListsActions {
  static SET = '[LISTS] SET';
  static INIT = '[LISTS] INIT';
  static RESET = '[LISTS] RESET';
  static ERROR = '[LISTS] ERROR';
  static SELECT = '[LISTS] SELECT';

  initLists = ActionFactory.create(ListsActions.INIT);
  setLists = ActionFactory.create(ListsActions.SET);
  selectLists = ActionFactory.create(ListsActions.SELECT);
  resetLists = ActionFactory.create(ListsActions.RESET);
  errorLists = ActionFactory.create(ListsActions.ERROR);
}
