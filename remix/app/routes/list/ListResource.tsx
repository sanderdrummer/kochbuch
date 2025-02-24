import { v7 as uuid } from 'uuid'
import { type ListItem } from '~/resources/list'

export const parseListItem = (itemString: string): ListItem | null => {
  if (itemString.match(/^\d+/)) {
    const START_WITH_FLOAT = /^(([0-9]*[.])?[0-9]+)/
    const [amount = ''] = itemString.match(START_WITH_FLOAT) ?? []
    const scaleAndTitle = itemString.replace(amount, '')
    const [scale = '', title = ''] = scaleAndTitle.split(' ')
    return {
      id: uuid(),
      amount,
      scale,
      title,
    }
  } else if (itemString.trim().length > 0) {
    return {
      id: uuid(),
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
