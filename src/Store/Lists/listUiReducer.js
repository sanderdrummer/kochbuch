import * as actions from './listActions';

const initialState = {
    isLoading: false,
    errMsg: '',
    selected:'',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.START_ADD_LIST: return {
            ...state,
            isLoading: true,
            errMsg: ''
        };
        case actions.START_FETCH_LISTS: return {
            ...state,
            isLoading: true,
            errMsg: ''
        };
        case actions.INIT_LISTS: return {
            ...state,
            isLoading: false,
            errMsg: ''
        };
        case actions.LIST_OPERATION_FAILED: return {
            ...state,
            isLoading: false,
            errMsg: action.payload
        };
        case actions.SELECT_LIST: return {
            ...state,
            selected: action.payload,
        };
        default: return state;
    }
};

export default reducer;