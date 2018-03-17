import { createSelector } from 'reselect';
import { AppState, UiState, CollectionState as Collection } from '../../../';
import { Products, Product } from '../';

const get = (state: AppState) => state.products;
const getCollection = createSelector(get, (products: Products) => products.collection);
const getUi = createSelector(get, (products: Products) => products.ui);
const getQuery = createSelector(getUi, (ui: UiState) => ui.query);
const getCollectionAsList = createSelector(getCollection, (collection: Collection<Product>) => 
    Object.keys(collection).map(title => collection[title]));
const getFilteredCollectionAsList = createSelector(getCollectionAsList, getQuery, (products, query) => {
    if ( query ) {
      return products.filter(product => product.id.includes(query) );
    } else {
      return products;
    }
});

export default {
    get,
    getCollection,
    getCollectionAsList,
    getFilteredCollectionAsList
};