
const initialState = {
    query: '',
    isLoading: false,
    errorMessage: ''
};

const UPDATE_QUERY = 'UPDATE_QUERY';

export type UiState = typeof initialState;

export function createUiReducer(namespace: string) {
    return function uiReducer(state: UiState = initialState, action: UiActions) {
        switch (action.type) {
            case namespace + UPDATE_QUERY: return {
                ...state,
                query: action.payload
            };
            default: return state;
        }
    };
}

export const uiActions = {
    updateQuery: (namespace: string , payload: string) => ({
        type: namespace + UPDATE_QUERY,
        payload
    })
};

export type UiActions = { type: string, payload: string };