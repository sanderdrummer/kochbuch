import {appConfig} from '../../config';
import axios from 'axios';
import {userService} from '../User/userService';

const listService = {

    getLists () {

        const token = userService.getToken();
        console.log(token);
        return axios.get(appConfig.url + 'list.json?auth=' + token);
    },

    updateList(list) {
        return axios.patch(appConfig.url + 'list.json',
         {[list.name]: list}
        );
    }

};

export default listService;