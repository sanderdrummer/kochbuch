import { Component, JSX } from 'solid-js'

export const Navbar: Component<{ children: JSX.Element; class?: string }> = (
  props
) => {
  return (
    <nav
      class={`w-full bg-stone-50 dark:bg-stone-700 sticky bottom-0 left-0 right-0`}
    >
      <div
        class={`p-2 grid justify-center gap-8 grid-flow-col ${
          props.class ?? ''
        }`}
      >
        {props.children}
      </div>
    </nav>
  )
}
