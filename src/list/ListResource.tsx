import Dexie, { Table } from 'dexie'
import { createResource } from 'solid-js'

export type ListItem = {
  amount: string
  title: string
}

export type ShoppingList = {
  todo: ListItem[]
  done: ListItem[]
}

class ListDatabase extends Dexie {
  todo!: Table<ListItem, string>
  done!: Table<ListItem, string>

  constructor() {
    super('ListDatabase')
    this.version(1).stores({
      todo: '&title',
      done: '&title',
    })
  }
}

const listDB = new ListDatabase()

export const getShoppingList = async (): Promise<ShoppingList> => {
  const todo = await listDB.todo.toArray()
  const done = await listDB.done.toArray()

  return {
    todo,
    done,
  }
}

export const ListResource = () => {
  return createResource(getShoppingList)
}

export const parseStringToListItems = (value: string): ListItem[] => {
  const lines = value.split('\n').map((line) => {
    const items = line.split(' ')
    const maybeAmount = Number(items[0])
    if (isNaN(maybeAmount)) {
      return {
        amount: '0',
        title: line,
      }
    } else {
      const [, ...titleArray] = items
      return {
        amount: maybeAmount.toString(),
        title: titleArray.join(' '),
      }
    }
  })

  return lines
}

export const addItemsToList = async (items: ListItem[]) => {
  const promises = items.map(async item => {
    const existingItem = await listDB.todo.get(item.title)
    if (existingItem) {
      listDB.todo.update(item.title, {amount: Number(existingItem.amount) + Number(item.amount)})
    } else {
      listDB.todo.put(item)
    }
  })

  await Promise.all(promises)

}

export const markItemAsDone = async (item: ListItem) => {
  await listDB.todo.delete(item.title)
  await listDB.done.add(item)
}

export const markItemAsTodo = async (item: ListItem) => {
  await listDB.done.delete(item.title)
  await listDB.todo.add(item)
}

export const clearDone = async () => {
  await listDB.done.clear()
}
