import * as types from './constants';
import { Action } from '../../../common/store/action';
import { Recipe } from '../recipe/state';

export type UpdateRecipe = Action<Recipe>;
export const updateRecipe = (payload: Recipe): UpdateRecipe => ({
    type: types.UPDATE_COMPLETE,
    payload
});

export type FetchRecipesCompletedPayload = {[key: string]: Recipe};
export type FetchRecipesCompleted = Action<FetchRecipesCompletedPayload>;
export const fetchRecipesCompleted = (payload: FetchRecipesCompletedPayload): FetchRecipesCompleted => ({
    type: types.FETCH_COMPLETE,
    payload
});

export type Actions = UpdateRecipe | FetchRecipesCompleted;