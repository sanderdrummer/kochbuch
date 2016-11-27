import {combineReducers} from '@ngrx/store';
import {listsReducer} from './lists/lists.reducer';
import {compose} from '@ngrx/core';

export const reducer = compose(combineReducers)({
  lists: listsReducer
});
