import { JSX } from 'solid-js'

export type WithChildren = {
  children: JSX.Element
}

export type WithClass = {
 class?: string
}

export type CommonProps = WithClass & WithChildren
