import {appConfig} from '../../config';
import axios from 'axios';

const listService = {

    getLists () {
        return axios.get(appConfig.url + 'list.json');
    },

    updateList(list) {
        return axios.patch(appConfig.url + 'list.json',
         {[list.name]: list}
        );
    }

};

export default listService;