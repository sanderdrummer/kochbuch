import * as mocks from './dataProvider';
import reducer from '../productReducer';
import * as actions from '../productActions';

describe('ProductReducerTests', ()=> {

    it('should return intial state on default', () => {
            expect(reducer(undefined, {type:''})).toEqual({});
    });

    it('should add a product on ADD_PRODUCT', () => {
        const state = reducer(
            mocks.initialState(), 
            actions.addProduct(mocks.defaultProductTwo())
        );

        expect(state).toEqual(mocks.stateWithTwoProducts());
    });

    it('should init products on INIT_PPRODUCTS', () => {
        const state = reducer({}, actions.initProducts(mocks.stateWithTwoProducts()));
        expect(state).toEqual(mocks.stateWithTwoProducts());
    });

});