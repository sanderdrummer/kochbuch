import { CommonProps, WithClass } from './CommonProps'

export const HeightWrapper = (props: CommonProps) => {
  return (
    <div class={`min-h-screen ${props?.class ?? ''}`}>{props.children}</div>
  )
}

export const LinearProgress = (props: WithClass) => {
  return (
    <div class={`fixed inset-x-0 top-0 z-50 ${props.class ?? ""}`}>
      <div class="h-1 bg-blue-500"></div>
    </div>
  )
}
