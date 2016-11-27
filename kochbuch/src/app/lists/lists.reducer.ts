import {ListsActions} from './lists.actions';
import {Action} from '@ngrx/store';
import {ListsModel} from './lists.model';

const initialListState:ListsModel = {
  lists:[],
  selectedList: {},
  loading: true,
  error: ''
};

export const listsReducer = (state = initialListState, action:Action) => {
  switch (action.type) {

    case ListsActions.INIT:
      return state;
    case ListsActions.SET:
      //noinspection TypeScriptUnresolvedFunction
      return Object.assign({}, state, {loading:false, lists:action.payload});
    case ListsActions.RESET:
      return state;
    case ListsActions.SELECT:
      //noinspection TypeScriptUnresolvedFunction
      return Object.assign({}, state, {selectedList:action.payload});
    default:
      return state;
  }
};
