import { RecipeCollection } from './state';
import { Reducer } from 'redux';
import { Actions, UpdateRecipe } from '../common/actions';
import * as types from '../common/constants';
import recipe from '../recipe/reducer';

const initialState: RecipeCollection = {};

const reducer: Reducer<RecipeCollection> = (state: RecipeCollection = initialState, action: Actions) => {
    switch (action.type) {
        case types.FETCH_COMPLETE: return fetchComplete(state, <RecipeCollection> action.payload);
        case types.UPDATE_COMPLETE: return updateRecipe(state, <UpdateRecipe> action);
        default: return state;
    }
};

function fetchComplete(state: RecipeCollection, recipes: RecipeCollection) {
    return {...state, ...recipes};
}

function updateRecipe(state: RecipeCollection, action: UpdateRecipe) {
    const title = action.payload.title;
    return {...state, [title]: recipe(state[title], action)};
}

export default reducer;