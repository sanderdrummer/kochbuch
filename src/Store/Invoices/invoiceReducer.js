import * as actions from './invoiceActions';

const reducer = (state = [], action) => {
    switch (action.type) {
        case actions.FETCH_INVOICES_SUCCESS:
            return action.payload;
        default: return state;
    }
};

export default reducer;