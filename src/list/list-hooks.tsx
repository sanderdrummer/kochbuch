import React from "react";

import { ListItem, getList } from "../db";

let listItemsCache: {
  list: ListItem[];
  basket: ListItem[];
} = { list: [], basket: [] };

export const useListItems = () => {
  const [list, setList] = React.useState<{
    list: ListItem[];
    basket: ListItem[];
  }>(listItemsCache);

  const fetchList = async () => {
    try {
      const result = await getList();
      listItemsCache = result;
      setList(result);
    } catch {}
  };

  return {
    list,
    fetchList
  };
};
