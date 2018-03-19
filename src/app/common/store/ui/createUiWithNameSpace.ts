
const initialState = {
  query: '',
  isLoading: false,
  errorMessage: ''
};

const UPDATE_QUERY = 'UPDATE_QUERY';
const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING';
const UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE';

export type UiState = typeof initialState;

export function createUiReducer(namespace: string) {
  return function uiReducer(state: UiState = initialState, action: UiActions) {
    switch (action.type) {
      case namespace + UPDATE_QUERY: return {
        ...state,
        query: action.payload
      };
      case namespace + UPDATE_IS_LOADING: return {
        ...state,
        isLoading: action.payload
      };
      case namespace + UPDATE_ERROR_MESSAGE: return {
        ...state,
        errorMessage: action.payload
      };
      default: return state;
    }
  };
}

export const uiActions = {
  updateQuery: (namespace: string, payload: string) => ({
    type: namespace + UPDATE_QUERY,
    payload
  }),
  updateIsLoading: (namespace: string, payload: boolean) => ({
    type: namespace + UPDATE_IS_LOADING,
    payload
  }),
  updateErrorMessage: (namespace: string, payload: string) => ({
    type: namespace + UPDATE_ERROR_MESSAGE,
    payload
  }),
};

export type UiActions = { type: string, payload: string };