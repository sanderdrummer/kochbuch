import * as actions from './listActions';




const initialState = {};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_LIST: return addList(state, action.payload);
        case actions.INIT_LISTS: return initLists(state, action.payload);
        default: return state;
    }
};

function addList(state, list){

    const newLists = {...state};
    if (list && list.name) {
        newLists[list.name] = list;
    }

    return newLists;
}

function initLists(state, lists){

    return {...state, ...lists}
}

export default reducer;