import { createSignal, JSX } from 'solid-js'
import {  SpinnerIcon } from './Icons'

export const LoadingButton = (props: {
  disabled?: boolean
  onClick: () => Promise<void>
  label: JSX.Element
  icon?: JSX.Element
}) => {
  const [isLoading, setIsLoading] = createSignal(false)
  return (
    <button
      type="button"
      class="grid text-stone-300 gap-2 grid-flow-col content-center items-center"
      disabled={props.disabled || isLoading()}
      onClick={() => {
        setIsLoading(true)
        props.onClick().finally(() => setIsLoading(false))
      }}
    >
      <span>
        {isLoading() ? (
          <SpinnerIcon />
        ) : (
          props.icon
        )}
      </span>
      {props.label}
    </button>
  )
}
