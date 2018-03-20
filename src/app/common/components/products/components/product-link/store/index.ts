import { combineReducers } from 'redux';
import { createCollectionReducer, createUiReducer, UiState, CollectionState } from '../../../../..';
export const productLinkNameSpace = '[ProductLinks] ';

export const initialState = {
  id: '',
  productId: '',
  linkId: '',
  amount: '0',
  isActive: false
};

export type ProductLink = typeof initialState;

export type ProductLinkState = {
  collection: CollectionState<ProductLink>,
  ui: UiState
};

export const productLinks = combineReducers({
  collection: createCollectionReducer(productLinkNameSpace),
  ui: createUiReducer(productLinkNameSpace)
});