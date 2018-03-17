import reducer from '../reducer';
import * as actions from '../../common/actions';
import { initialState, recipeWithUpdatedTitle } from './mocks';

describe('RecipeReducerTests', () => {

    it('should update a recipe on updateRecipe action', () => {
        expect(reducer(initialState(), actions.updateRecipe(recipeWithUpdatedTitle())))
            .toMatchSnapshot();
    });
});
