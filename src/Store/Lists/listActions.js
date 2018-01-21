import listService from './listService';

export const START_ADD_LIST = 'START_ADD_LIST';
export const startAddList = (list) =>{
    return dispatch =>{
        listService.updateList(list).then(() =>
            dispatch(addList(list))
        )
    }
};

export const ADD_LIST = 'ADD_LIST';
export const addList = (list) =>{
    return {
        type: ADD_LIST,
        payload: list
    }
};

export const SELECT_LIST = 'SELECT_LIST';
export const selectList = (listId) =>{
    return {
        type: SELECT_LIST,
        payload: listId
    }
};

export const DELETE_LIST = 'DELETE_LIST';
export const deleteList = (listId) =>{
    return {
        type: DELETE_LIST,
        payload: listId
    }
};

export const START_FETCH_LISTS = 'START_FETCH_LISTS';
export const startFetchLists = () =>{
    return {
        type: START_FETCH_LISTS
    }
};

export const FETCH_LISTS = 'FETCH_LISTS';
export const fetchLists = () =>{
    return dispatch =>{
        listService.getLists().then(res =>{
            let lists = {};
            if (res.data) {
                lists = res.data;
            }
            dispatch(initLists(lists))
        }).catch(err =>{
            console.log(err);
            dispatch(listOperationFailed(err));
        });


    }
};

export const LIST_OPERATION_FAILED = 'LIST_OPERATION_FAILED';
export const listOperationFailed = (err) =>{
    return {
        type: LIST_OPERATION_FAILED,
        payload: err
    }
};

export const INIT_LISTS = 'INIT_LISTS';
export const initLists = (lists) =>{
    return {
        type: INIT_LISTS,
        payload: lists
    }
};