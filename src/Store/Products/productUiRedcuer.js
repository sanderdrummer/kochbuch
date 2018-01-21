import * as actions from './productActions';
import * as listActions from '../Lists/listActions';

const initialState = {
    isLoading: true,
    errorMsg: '',
    filterString: '',
    selected: ''
};

const productUiReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.INIT_PRODUCTS:
            return {
                ...state,
                errorMsg: '',
                isLoading: false
            };
        case actions.UPDATE_PRODUCT_ERROR:
            return {
                ...state,
                errorMsg: action.payload,
                isLoading: false
            };
        case actions.UPDATE_PRODUCT_FILTER:
            return {
                ...state,
                filterString: action.payload
            };
        case actions.ADD_PRODUCT:
            return {
                ...state,
                selected: action.payload.name
            };
        case actions.SET_SELECTED:
            return {
                ...state,
                selected: action.payload

            };
        case listActions.ADD_LIST:
            return {
                ...state,
                errorMsg: '',
                filterString: '',
                selected: ''
            };
        default:
            return state;
    }
};

export default productUiReducer;