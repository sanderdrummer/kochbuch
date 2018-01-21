import {appConfig} from '../../config';
import axios from 'axios';
import {userService} from '../User/userService';

const productService = {

    getProducts () {
        const token = userService.getToken();
        return axios.get(appConfig.url + 'product.json' + token)
    },

    updateProduct(product) {
        const token = userService.getToken();
        return axios.patch(appConfig.url + 'product/' + product.name + '.json' + token,
            product);
    }

};

export default productService;