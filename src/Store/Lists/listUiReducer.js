import * as actions from './listActions';

const initialState = {
    isLoading: false,
    errorMessage: '',
    selected: '',
};

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actions.START_ADD_LIST:
            return {
                ...state,
                isLoading: true,
                errorMessage: ''
            };
        case actions.START_FETCH_LISTS:
            return {
                ...state,
                isLoading: true,
                errorMessage: ''
            };
        case actions.INIT_LISTS:
            return {
                ...state,
                isLoading: false,
                errorMessage: ''
            };
        case actions.LIST_OPERATION_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload.response && action.payload.response.data &&
                        action.payload.response.data.error ? action.payload.response.data.error : 'Serverfehler'
            };
        case actions.SELECT_LIST:
            return {
                ...state,
                selected: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;