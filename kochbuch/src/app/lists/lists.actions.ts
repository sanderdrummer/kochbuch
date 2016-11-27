import {Injectable} from '@angular/core';
import {ActionFactory} from '../shared/actionFactory';

@Injectable()
export class ListsActions {
  static SET = '[LIST] SET';
  static INIT = '[LIST] INIT';
  static RESET = '[LIST] RESET';
  static ERROR = '[LIST] ERROR';

  initLists = ActionFactory.create(ListsActions.INIT);
  setLists = ActionFactory.create(ListsActions.SET);
  resetLists = ActionFactory.create(ListsActions.RESET);
  errorLists = ActionFactory.create(ListsActions.ERROR);
}
