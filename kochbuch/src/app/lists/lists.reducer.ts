import {ListsActions} from './lists.actions';
import {Action} from '@ngrx/store';

const initialListState = {
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
      return state.lists = action.payload;
    case ListsActions.RESET:
      return state;
    default:
      return state;
  }
};
