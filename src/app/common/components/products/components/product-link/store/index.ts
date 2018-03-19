import { combineReducers } from 'redux';
import { createCollectionReducer, createUiReducer, UiState, CollectionState } from '../../../../..';
export const productUiNameSpace = '[ProductLinks] ';

export const initialState = {
  id: '',
  productId: '',
  amount: '0',
  isActive: false
};

export type ProductLink = typeof initialState;

export type ProductLinkState = {
  collection: CollectionState<ProductLink>,
  ui: UiState
};

export const productLinks = combineReducers({
  collection: createCollectionReducer(productUiNameSpace),
  ui: createUiReducer(productUiNameSpace)
});