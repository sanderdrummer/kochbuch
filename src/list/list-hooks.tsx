import React from "react";

type ListItems = {
  list: string[];
  basket: string[];
};
const LIST_KEY = "LIST_KEY";
const getLocalStorageJson = (key: string) => {
  const json = localStorage.getItem(key);
  if (json) {
    return JSON.parse(json);
  }
  return undefined;
};
const saveLocalStorageJson = (key: string, item: any) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getList = (): ListItems => {
  const list = getLocalStorageJson(LIST_KEY);
  return list ? list : { basket: [], list: [] };
};

export const addListItem = (item: string) => {
  const listItems = getList();
  listItems.list.push(item);
  saveLocalStorageJson(LIST_KEY, listItems);
};

export const checkListItem = async (item: string) => {
  const listItems = getList();
  listItems.list = listItems.list.filter((listItem) => listItem !== item);
  listItems.basket.push(item);
  saveLocalStorageJson(LIST_KEY, listItems);
};

export const unCheckListItem = (item: string) => {
  const listItems = getList();
  listItems.basket = listItems.basket.filter((listItem) => listItem !== item);
  listItems.list.push(item);
  saveLocalStorageJson(LIST_KEY, listItems);
};

export const addListItems = (bulkList: string[]) => {
  const listItems = getList();
  listItems.list = [...listItems.list, ...bulkList];
  saveLocalStorageJson(LIST_KEY, listItems);
};

export const clearList = () => {
  const listItems = getList();
  listItems.basket = [];
  saveLocalStorageJson(LIST_KEY, listItems);
};

let listItemsCache: {
  list: string[];
  basket: string[];
} = { list: [], basket: [] };

export const useListItems = () => {
  const [list, setList] = React.useState<{
    list: string[];
    basket: string[];
  }>(listItemsCache);

  const fetchList = () => {
    const result = getList();
    listItemsCache = result;
    setList(result);
  };

  return {
    list,
    fetchList,
  };
};
