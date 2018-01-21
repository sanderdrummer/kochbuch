import * as actions from './userActions';

const initialState = {
    isLoading:false,
    errorMessage: '',
    user: null,
};

function authStart(state){
    return {
        ...state,
        isLoading: true,
        user: null,
        errorMessage: ''
    }
}


function authSuccess(state, payload){
    console.log(payload);
    return {
        ...state,
        isLoading: false,
        user: payload,
        errorMessage: ''
    }
}

function authFail(state){
    return {
        ...state,
        isLoading: false,
        user: null,
        errorMessage: 'Fehler beim Anmelden'
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.START_AUTH: return authStart(state);
        case actions.AUTH_SUCCESS: return authSuccess(state, action.payload);
        case actions.AUTH_FAIL: return authFail(state);

        default: return state;
    }
};

export default reducer;