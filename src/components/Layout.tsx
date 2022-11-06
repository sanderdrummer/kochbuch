import { CommonProps } from './CommonProps'

export const HeightWrapper = (props: CommonProps) => {
  return <div class={`min-h-screen ${props?.class ?? ''}`}>{props.children}</div>
}
