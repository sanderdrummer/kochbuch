import reducer from '../reducer';
import * as actions from '../../common/actions';
import * as mocks from './mocks';

describe('RecipeCollectionTests', () => {

    it('should init new collections', () => {
        expect(reducer({}, actions.fetchRecipesCompleted(mocks.collectionWithTwoItems()))).toMatchSnapshot();
    });

    it('should add a new recipe on update if needed', () => {
        
        expect(reducer(mocks.collectionWithOneItem(), actions.updateRecipe(mocks.item3()))).toMatchSnapshot();
    });
});