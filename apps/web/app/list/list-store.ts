"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v7 as uuid } from "uuid";
import Dexie from "dexie";

export type ListItem = {
  id: string;
  amount: string;
  scale: string;
  title: string;
};

export type ShoppingList = {
  todo: ListItem[];
  done: ListItem[];
};

class ListDataBase extends Dexie {
  listStorage: Dexie.Table<{ key: string; value: string }, string>;

  constructor() {
    super("ListDataBase");
    this.version(1).stores({
      listStorage: "key",
    });
    this.listStorage = this.table("listStorage");
  }
}
const database = new ListDataBase();
const dexieStorage = {
  getItem: async (name: string) => {
    const record = await database.listStorage.get(name);
    return record ? JSON.parse(record.value) : undefined;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem: async (name: string, value: any) => {
    await database.listStorage.put({
      key: name,
      value: JSON.stringify(value),
    });
  },
  removeItem: async (name: string) => {
    await database.listStorage.delete(name);
  },
};

const mergeItems = (items: ListItem[]) => {
  return items.reduce<ListItem[]>((mergedItems, item) => {
    const index = mergedItems.findIndex(
      (maybeItem) =>
        maybeItem.title === item.title && maybeItem.scale === item.scale,
    );
    const maybeItem = mergedItems[index];
    if (maybeItem) {
      const amount = Number(maybeItem.amount);
      const itemAmount = Number(item.amount);
      maybeItem.amount = (amount + itemAmount).toString();
      mergedItems[index] = maybeItem;
      return mergedItems;
    }

    return [...mergedItems, item];
  }, []);
};

export type ListStore = {
  todo: ListItem[];
  done: ListItem[];
  itemsToAdd: string;
  setItemsToAdd: (items: string) => void;
  clear: VoidFunction;
  markAsTodo: (item: ListItem) => void;
  markAsDone: (item: ListItem) => void;
  addTodo: (items: ListItem[]) => void;
};

export const useListStore = create(
  persist<ListStore>(
    (set, get) => ({
      todo: [],
      done: [],
      itemsToAdd: "",
      setItemsToAdd: (items: string) => {
        set({ itemsToAdd: items });
      },
      clear: () => {
        set({ done: [] });
      },
      markAsTodo: (item: ListItem) => {
        const { todo, done } = get();
        set({
          todo: [...todo, item],
          done: done.filter((doneItem) => doneItem !== item),
        });
      },
      markAsDone: (item: ListItem) => {
        const { todo, done } = get();
        set({
          done: [...done, item],
          todo: todo.filter((todoItem) => todoItem !== item),
        });
      },
      addTodo: (items: ListItem[]) => {
        const { todo } = get();
        set({ todo: mergeItems([...todo, ...items]) });
      },
    }),
    {
      name: "list-storage",
      storage: createJSONStorage(() => dexieStorage),
    },
  ),
);

export const parseListItem = (itemString: string): ListItem | undefined => {
  if (/^\d+/.test(itemString)) {
    const START_WITH_FLOAT = /^((\d*\.)?\d+)/;
    const [amount = ""] = itemString.match(START_WITH_FLOAT) ?? [];
    const scaleAndTitle = itemString.replace(amount, "");
    const [scale = "", title = ""] = scaleAndTitle.split(" ");
    return {
      id: uuid(),
      amount,
      scale,
      title,
    };
  } else if (itemString.trim().length > 0) {
    return {
      id: uuid(),
      amount: "",
      scale: "",
      title: itemString,
    };
  }
  return undefined;
};

export const parseStringToListItems = (value: string): ListItem[] => {
  return value.split("\n").reduce<ListItem[]>((items, item) => {
    const parsed = parseListItem(item);
    if (parsed) {
      items.push(parsed);
    }
    return items;
  }, []);
};
