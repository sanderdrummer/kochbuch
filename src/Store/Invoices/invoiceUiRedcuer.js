import * as actions from './invoiceActions';

const initialState = {
    isLoading: false,
    errorMessage: '',
    invoiceDone: '',
    filterDate: Date.now()
};

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actions.START_PATCH_INVOICE:
        case actions.START_FETCH_INVOICES:
            return {
                ...state,
                isLoading: true,
                errorMessage: '',
                invoiceDone: ''
            };
        case actions.FETCH_INVOICES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: '',
                invoiceDone: ''
            };
        case actions.PATCH_INVOICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: '',
                invoiceDone: action.payload
            };
        case actions.PATCH_INVOICE_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: 'Fehler beim Anlegen der Rechnung'
            };
        case actions.FETCH_INVOICES_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: 'Fehler beim Laden der Rechnungen'
            };
        case actions.UPDATE_INVOICE_FILTER:
            return {
                ...state,
                filterDate: action.payload
            };
        default:
            return state;
    }
};

export default reducer;