import { describe, it, expect } from 'vitest'

import { parseListItem, parseStringToListItems } from './ListResource'

describe('parseLines', () => {
  it('parses empty', () => {
    const result = parseListItem('')
    expect(result).toEqual(null)
  })
  it('parses string only', () => {
    const result = parseListItem('some pepper')
    expect(result).toEqual({
      amount: '',
      scale: '',
      title: 'some pepper',
    })
  })
  it('parses number', () => {
    const result = parseListItem('10')
    expect(result).toEqual({
      amount: '10',
      scale: '',
      title: '',
    })
  })
  it('parses float', () => {
    const result = parseListItem('0.125l Beer')
    expect(result).toEqual({
      amount: '0.125',
      scale: 'l',
      title: 'Beer',
    })
  })
  it('parses string', () => {
    const result = parseListItem('200g Flour')
    expect(result).toEqual({
      amount: '200',
      scale: 'g',
      title: 'Flour',
    })
  })
  it('parses all caps', () => {
    const result = parseListItem('1EL Flour')
    expect(result).toEqual({
      amount: '1',
      scale: 'EL',
      title: 'Flour',
    })
  })
})

describe('parseStringToListItems', () => {
  it('parses empty string', () => {
    const result = parseStringToListItems('')
    expect(result).toEqual([])
  })
  it('parses single line string', () => {
    const result = parseStringToListItems('10g Flour')
    expect(result).toEqual([
      {
        amount: '10',
        scale: 'g',
        title: 'Flour',
      },
    ])
  })
  it('parses multi line string', () => {
    const result = parseStringToListItems(`10g Flour
some Pepper

1El Beer
0.125l Beer

2.5g Pepper
    `)
    expect(result).toEqual([
      {
        amount: '10',
        scale: 'g',
        title: 'Flour',
      },
      {
        amount: '',
        scale: '',
        title: 'some Pepper',
      },
      {
        amount: '1',
        scale: 'El',
        title: 'Beer',
      },
      {
        amount: '0.125',
        scale: 'l',
        title: 'Beer',
      },
      {
        amount: '2.5',
        scale: 'g',
        title: 'Pepper',
      },
    ])
  })
})
