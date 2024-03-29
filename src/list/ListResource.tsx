import Dexie, { Table } from 'dexie'
import { createResource } from 'solid-js'

export type ListItem = {
  amount: string
  scale: string
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
    this.version(2).stores({
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

export const parseListItem = (itemString: string): ListItem | null => {
  if (itemString.match(/^\d+/)) {
    const START_WITH_FLOAT = /^(([0-9]*[.])?[0-9]+)/
    const [amount = ''] = itemString.match(START_WITH_FLOAT) ?? []
    const scaleAndTitle = itemString.replace(amount, '')
    const [scale = '', title = ''] = scaleAndTitle.split(' ')
    return {
      amount,
      scale,
      title,
    }
  } else if (itemString.trim().length > 0) {
    return {
      amount: '',
      scale: '',
      title: itemString,
    }
  }
  return null
}

export const parseStringToListItems = (value: string): ListItem[] => {
  return value.split('\n').reduce<ListItem[]>((items, item) => {
    const parsed = parseListItem(item)
    if (parsed) {
      items.push(parsed)
    }
    return items
  }, [])
}

export const addItemsToList = async (items: ListItem[]) => {
  const promises = items.map(async (item) => {
    const existingItem = await listDB.todo.get(item.title)
    if (existingItem) {
      listDB.todo.update(item.title, {
        amount: Number(existingItem.amount) + Number(item.amount),
      })
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
