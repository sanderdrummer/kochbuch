import { combineReducers, Reducer } from 'redux';
import { AppState } from './state';
import recipes from '../../recipes/store/reducer';
import productModule from '../components/products';

const reducer: Reducer<AppState> = combineReducers({
    recipes,
    products: productModule.reducer
});

export default reducer;