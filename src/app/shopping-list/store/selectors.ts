import { createSelector } from 'reselect';
import { AppState } from './../../common';

export const getListProducts = (state: AppState) => state.productLinks.collection;
export const getActiveItems = createSelector(getListProducts, (products) => {
  return Object.keys(products).filter(key => products[key].isActive).map(key => products[key]);
});
export const getInActiveItems = createSelector(getListProducts, (products) => {
  return Object.keys(products).filter(key => !products[key].isActive).map(key => products[key]);
});