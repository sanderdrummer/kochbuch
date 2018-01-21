import {userService} from './userService';

export const START_AUTH = 'START_AUTH';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

export const startAuth = () => {
    return {
        type: START_AUTH
    }
};

export const doAuth = (info) => {
    return dispatch => {
        dispatch(startAuth());
        userService.auth(info).then((res) => {
            dispatch(authSuccess(res.data));
        }).catch(() => {
            dispatch(authFail());
        });
    }
};

export const authSuccess = (user) => {
    localStorage.setItem('user', JSON.stringify(user));

    return {
        type: AUTH_SUCCESS,
        payload: user
    }
};
export const authFail = () => {
    localStorage.removeItem('user');

    return {
        type: AUTH_FAIL
    }
};

export const checkAuth = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch(authSuccess(user));
        }
    }

};

export const logOut = () => {

    localStorage.removeItem('user');
    return {
        type: AUTH_SUCCESS,
        payload: null
    }
};