import { createSignal, JSX } from 'solid-js'
import { SpinnerIcon } from './Icons'
import { Bubble } from './Layout'

export const LoadingButton = (props: {
  disabled?: boolean
  onClick: () => Promise<void>
  label: JSX.Element
  icon?: JSX.Element
  class?: string
  message?: string
}) => {
  const [isLoading, setIsLoading] = createSignal(false)
  const [bubbleOpen, setIsBubbleOpen] = createSignal(false)
  return (
    <>
      {props.message && <Bubble open={bubbleOpen()}>{props.message}</Bubble>}
      <button
        type="button"
        class={`p-3 pl-0 grid font-normal text-stone-400 gap-2 grid-flow-col content-center items-center ${
          props.class ?? ''
        }`}
        disabled={props.disabled || isLoading()}
        onClick={() => {
          setIsBubbleOpen(false)
          setIsLoading(true)
          props
            .onClick()
            .then(() => {
              setIsBubbleOpen(true)
            })
            .finally(() => {
              setIsLoading(false)
              setTimeout(() => {
                setIsBubbleOpen(false)
              }, 2500)
            })
        }}
      >
        <span class="fill-stone-400 h-5 w-5">
          {isLoading() ? <SpinnerIcon /> : props.icon}
        </span>
        {props.label}
      </button>
    </>
  )
}
