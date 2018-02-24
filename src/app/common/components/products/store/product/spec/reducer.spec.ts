import reducer, { initialState } from '../reducer';
import * as actions from '../../common/actions';
import * as mocks from './mocks';

describe('Products reducer tests', () => {
    it('should update for ON_UPDATE action', () => {
        expect(reducer(initialState, actions.update(mocks.getUpdatedProduct())))
        .toMatchSnapshot();
    });
});