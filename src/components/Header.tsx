import { JSX } from 'solid-js'
import { CommonProps } from './CommonProps'

export const Header = (props: { children: JSX.Element }) => {
  return <header>{props.children}</header>
}

export const H1 = (props: CommonProps) => {
  return (
    <h1 class={`${props.class ?? ''} font-bold text-3xl mb-10 mt-4`}>
      {props.children}
    </h1>
  )
}
