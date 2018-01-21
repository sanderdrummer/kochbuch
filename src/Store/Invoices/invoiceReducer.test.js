import reducer from './invoiceReducer';
import * as actions from './invoiceActions';
import {InvoiceModel} from './invoiceModel';

describe('invoiceReducer', () => {


    it ('should set fetched list', () => {
        let state = {};
        let payload = {'id': new InvoiceModel({})};
        const newState = reducer(state, {
            type:actions.FETCH_INVOICES_SUCCESS,
            payload: payload
        });

        expect(newState).toEqual(payload)
    });

    it ('should handle empty list', () => {
        let state = {};
        let payload = null;
        const newState = reducer(state, {
            type:actions.FETCH_INVOICES_SUCCESS,
            payload: payload
        });

        expect(newState).toEqual({})
    });

    it ('should not delete old items', () => {
        let state = {
            'id': new InvoiceModel({})
        };
        let payload = null;
        const newState = reducer(state, {
            type:actions.FETCH_INVOICES_SUCCESS,
            payload: payload
        });

        expect(newState).toEqual(state)
    });
});