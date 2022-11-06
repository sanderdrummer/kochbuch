import { CheckIcon, LoadingButton, PlusIcon } from '@kochbuch/components'

import { addRecipeToPlan, Plan, planIsDone, Recipe } from './RecipeResource'

export const AddRecipeToPlan = (props: {
  recipe?: Recipe
  compact?: boolean
}) => {
  return (
    <LoadingButton
      disabled={props.recipe === undefined}
      icon={<PlusIcon class="fill-stone-300 h-5 w-5" />}
      label={props.compact ? '' : 'Rezept kochen'}
      onClick={async () => {
        if (props.recipe) {
          await addRecipeToPlan(props.recipe)
        }
      }}
    />
  )
}

export const RemoveRecipeFromPlan = (props: {
  plan?: Plan
  onClick?: () => Promise<void>
}) => {
  return (
    <LoadingButton
      disabled={props.plan === undefined}
      icon={<CheckIcon class="fill-stone-300 h-5 w-5" />}
      label="Fertig"
      onClick={async () => {
        if (props.plan) {
          await planIsDone(props.plan)
          await props.onClick?.()
        }
      }}
    />
  )
}
