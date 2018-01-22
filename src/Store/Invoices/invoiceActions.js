import {invoiceService} from './invoiceService';

export const START_FETCH_INVOICES = 'START_FETCH_INVOICES';
export const FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS';
export const FETCH_INVOICES_FAILED = 'FETCH_INVOICES_FAILED';

export const START_PATCH_INVOICE = 'START_PATCH_INVOICE';
export const PATCH_INVOICE_SUCCESS = 'PATCH_INVOICE_SUCCESS';
export const PATCH_INVOICE_FAILED = 'PATCH_INVOICE_FAILED';

export const UPDATE_INVOICE_FILTER = 'UPDATE_INVOICE_FILTER';


export const startFetchInvoices = () => {
    return {
        type: START_FETCH_INVOICES
    }
};

export const fetchInvoices = (date) => {
    return dispatch => {
        dispatch(startFetchInvoices());
        invoiceService.fetchInvoices(date).then((res) => {
            dispatch(fetchInvoicesSuccess(res.data));
        }).catch(() => {
            dispatch(fetchInvoicesFailed());
        });
    }
};

export const fetchInvoicesSuccess = (invoices) => {
    return {
        type: FETCH_INVOICES_SUCCESS,
        payload: invoices
    }
};

export const fetchInvoicesFailed = () => {
    return {
        type: FETCH_INVOICES_FAILED
    }
};

export const startPatchInvoice = () => {
    return {
        type: START_PATCH_INVOICE
    }
};

export const patchInvoice = (invoice) => {
    return dispatch => {
        dispatch(startPatchInvoice());
        invoiceService.patchInvoice(invoice).then((res) => {
            dispatch(patchInvoiceSuccess(res.data));
        }).catch(() => {
            dispatch(patchInvoiceFailed());
        });
    }
};

export const patchInvoiceSuccess = (invoice) => {
    return {
        type: PATCH_INVOICE_SUCCESS,
        payload: invoice
    }
};

export const patchInvoiceFailed = () => {
    return {
        type: PATCH_INVOICE_FAILED
    }
};


export const updateInvoiceFilter  = (filter) => {
    return {
        type: UPDATE_INVOICE_FILTER,
        payload: filter
    }
};