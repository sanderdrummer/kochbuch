import { combineReducers } from 'redux';
import { createUiReducer, UiState, CollectionState, createCollectionReducer } from '../../../';

export type Product = {
  id: string,
  popularity: number
};

export type Products = { collection: CollectionState<Product>, ui: UiState };
export const productUiNameSpace = '[Products] ';

const products = combineReducers({
  collection: createCollectionReducer(productUiNameSpace),
  ui: createUiReducer(productUiNameSpace)
});

export default products;