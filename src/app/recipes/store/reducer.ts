import { combineReducers, Reducer } from 'redux';
import collection from './collection/reducer';
import { Recipes } from './state';

const reducer: Reducer<Recipes> = combineReducers({
    collection
});

export default reducer;