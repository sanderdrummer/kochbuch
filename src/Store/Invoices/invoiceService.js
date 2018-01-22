import {appConfig} from '../../config';
import axios from 'axios';
import {userService} from '../User/userService';
import {dateService} from '../../Services/Date/dateService';

export const invoiceService = {

    fetchInvoices(date) {
        const token = userService.getToken();
        const url = dateService.getMonthYearUrl(date);
        return axios.get(appConfig.url + 'invoice/' + url + '.json' + token);
    },

    patchInvoice(invoice) {
        const token = userService.getToken();
        const url = dateService.getMonthYearUrl(new Date());
        return axios.post(appConfig.url + 'invoice/' + url + '.json' + token, invoice);
    }
};