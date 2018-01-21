import {appConfig} from '../../config';
import axios from 'axios';

export const userService = {

    signUp(info) {
        return axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + appConfig.apiKey,
            info);
    },
    auth(info) {
        return axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key' + appConfig.apiKey,
            info);
    },

    getToken() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.idToken) {
            return user.idToken
        } else {
            return ''
        }
    }
};