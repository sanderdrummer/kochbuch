import { JSX } from 'solid-js'

export const Header = (props: { children: JSX.Element }) => {
    return <header>{props.children}</header>
}
