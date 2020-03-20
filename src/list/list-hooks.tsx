import React from "react";

import { ListItem, getList } from "../db";

let listItemsCache: ListItem[] = [];

export const useListItems = () => {
  const [list, setList] = React.useState<ListItem[]>(listItemsCache);

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
