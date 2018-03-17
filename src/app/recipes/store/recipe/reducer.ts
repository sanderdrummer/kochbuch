import { Recipe } from './state';
import { Reducer } from 'redux';
import { Actions } from '../common/actions';
import * as types from '../common/constants';

const initialState: Recipe = {
    title: 'new recipe',
    description: '',
    products: []
};
const Recipe = typeof initialState;

const reducer: Reducer<Recipe> = (state: Recipe | undefined = initialState, action: Actions) => {
    switch (action.type) {
        case types.UPDATE_COMPLETE: return updateRecipe(state, <Recipe> action.payload);
        
        default: return state;
    }
};

function updateRecipe(state: Recipe, recipe: Recipe): Recipe {
    return {...state, ...recipe};
}

export default reducer;