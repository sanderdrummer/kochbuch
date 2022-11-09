import { CommonProps, WithClass } from './CommonProps'

export const HeightWrapper = (props: CommonProps) => {
  return (
    <div class={`min-h-screen ${props?.class ?? ''}`}>{props.children}</div>
  )
}

export const LinearProgress = (props: WithClass) => {
  return (
    <div class={`fixed inset-x-0 top-0 z-50 ${props.class ?? ''}`}>
      <div class="h-1 bg-blue-500" />
    </div>
  )
}

export const Bubble = (props: CommonProps & { open: boolean }) => {
  return (
      <div
        style={{'display': props.open ? "block" : "none"}}
        class={`${props.class ?? ''} transition transition-opacity ${
          props.open ? 'opacity-100' : 'opacity-0'
        } shadow bg-stone-700 text-stone-400 font-normal fixed top-5 right-5 p-5 rounded`}
      >
        {props.children}
      </div>
  )
}
