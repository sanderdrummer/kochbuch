import {appConfig} from '../../config';
import axios from 'axios';
import {userService} from '../User/userService';

const listService = {

    getLists(){
        const token = userService.getToken();
        return axios.get(appConfig.url + 'list.json' + token);
    },

    updateList(list){
        const token = userService.getToken();
        return axios.patch(appConfig.url + 'list.json' + token,
            {[list.name]: list}
        );
    }

};

export default listService;