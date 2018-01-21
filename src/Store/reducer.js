import listsReducer from './Lists/listRedcuer';
import listUiReducer from './Lists/listUiReducer';
import {combineReducers} from 'redux';
import productReducer from './Products/productReducer';
import productUiReducer from './Products/productUiRedcuer';
import invoiceReducer from './Invoices/invoiceReducer';
import invoiceUiReducer from './Invoices/invoiceUiRedcuer';
import userReducer from './User/userReducer';

const reducer = combineReducers({
    lists: listsReducer,
    listUi: listUiReducer,
    products: productReducer,
    productUi: productUiReducer,
    invoices: invoiceReducer,
    invoiceUi: invoiceUiReducer,
    user: userReducer
});

export default reducer;