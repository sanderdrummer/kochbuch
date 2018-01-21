import {appConfig} from '../../config';
import axios from 'axios';

const productService = {

    getProducts () {
       return axios.get(appConfig.url + 'product.json')
    },

    updateProduct(product) {
        return axios.patch(appConfig.url + 'product/' + product.name + '.json', product);
    }

};

export default productService;