import {appConfig} from '../../config';
import axios from 'axios';
import {userService} from '../User/userService';

export const invoiceService = {

    fetchInvoices() {
        const token = userService.getToken();
        return axios.get(appConfig.url + 'invoices.json' + token);
    },

    patchInvoice(invoice) {
        const token = userService.getToken();
        return axios.post(appConfig.url + 'invoices.json' + token, invoice);
    }
};