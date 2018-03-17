import { combineReducers } from 'redux';
import { createCollectionReducer } from '../../../../../index';
export const productUiNameSpace = '[ProductLinks] ';

const productLinks = combineReducers({
  collection: createCollectionReducer(productUiNameSpace)
});

export default productLinks;
