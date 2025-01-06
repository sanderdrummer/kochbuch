import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type ListItem = {
  id: string
  amount: string
  scale: string
  title: string
}

export type ShoppingList = {
  todo: ListItem[]
  done: ListItem[]
}

const mergeItems = (items: ListItem[]) => {
  return items.reduce<ListItem[]>((mergedItems, item) => {
    const index = mergedItems.findIndex(
      (maybeItem) =>
        maybeItem.title === item.title && maybeItem.scale === item.scale
    )
    const maybeItem = mergedItems[index]
    if (maybeItem) {
      const amount = Number(maybeItem.amount) ?? 1
      const itemAmount = Number(item.amount) ?? 1
      maybeItem.amount = (amount + itemAmount).toString()
      mergedItems[index] = maybeItem
      return mergedItems
    }

    return [...mergedItems, item]
  }, [])
}

export type ListStore = {
  todo: ListItem[]
  done: ListItem[]
  itemsToAdd: string
  setItemsToAdd: (items: string) => void
  clear: VoidFunction
  markAsTodo: (item: ListItem) => void
  markAsDone: (item: ListItem) => void
  addTodo: (items: ListItem[]) => void
}

export const useListStore = create(
  persist<ListStore>(
    (set, get) => ({
      todo: [],
      done: [],
      itemsToAdd: '',
      setItemsToAdd: (items: string) => {
        set({ itemsToAdd: items })
      },
      clear: () => {
        set({ done: [] })
      },
      markAsTodo: (item: ListItem) => {
        const { todo, done } = get()
        set({
          todo: [...todo, item],
          done: done.filter((doneItem) => doneItem !== item),
        })
      },
      markAsDone: (item: ListItem) => {
        const { todo, done } = get()
        set({
          done: [...done, item],
          todo: todo.filter((todoItem) => todoItem !== item),
        })
      },
      addTodo: (items: ListItem[]) => {
        const { todo } = get()
        set({ todo: mergeItems([...todo, ...items]) })
      },
    }),
    {
      name: 'list-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
