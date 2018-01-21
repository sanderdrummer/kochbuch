import {appConfig} from '../../config';
import axios from 'axios';

export const userService = {

    signUp(info) {
        return axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + appConfig.apiKey,
            info);
    },

    auth(info) {

        const params = {...info
        ,returnSecureToken: true
        };

        return axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + appConfig.apiKey,
            params);
    },

    getToken() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.idToken) {
            return '?auth=' + user.idToken;
        } else {
            return ''
        }
    }
};