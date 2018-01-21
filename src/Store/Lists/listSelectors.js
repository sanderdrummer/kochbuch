import {createSelector} from 'reselect';
import ListModel from './listModel';

export const getLists = (state) => state.lists;

export const getListsArray = createSelector([getLists], (lists) =>{
    return Object.values(lists)
        .filter((value) => value && value.name)
        .map(config => new ListModel(config));
});

export const getSelectedListKey = (state) => state.listUi.selected;

export const getSelectedList = createSelector([getLists, getSelectedListKey], (lists, key) =>{
    return new ListModel(lists[key]);
});

