import * as actions from './invoiceActions';

const reducer = (state = [], action) => {
    switch (action.type) {
        case actions.FETCH_INVOICES_SUCCESS:
            return handleFetchSuccess(state, action.payload);
        default: return state;
    }
};

const handleFetchSuccess = (state, payload) => {
    return payload ? payload : {};
};

export default reducer;