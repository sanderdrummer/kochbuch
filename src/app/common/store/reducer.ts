import { combineReducers, Reducer } from 'redux';
import { AppState } from './state';
import recipes from '../../recipes/store/reducer';

const reducer: Reducer<AppState> = combineReducers({
    recipes
});

export default reducer;