import { CheckIcon, LoadingButton, PlusIcon } from '@kochbuch/components'
import { addItemsToList } from '@kochbuch/list'

import { addRecipeToPlan, Plan, planIsDone, Recipe } from './RecipeResource'

export const AddRecipeToList = (props: {
  plan?: Plan
  onClick: () => Promise<void>
}) => {
  return (
    <LoadingButton
      message={`${props.plan?.title} zur Einkaufsliste hinzugefügt`}
      disabled={props.plan === undefined}
      icon={<PlusIcon />}
      label={'Rezept einkaufen'}
      onClick={async () => {
        if (props.plan) {
          await addItemsToList(
            props.plan.ingredients.map((item) => {
              return {
                amount: item.amount,
                scale: item.scale,
                title: item.name,
              }
            })
          )
        }
      }}
    />
  )
}

export const AddRecipeToPlan = (props: {
  recipe?: Recipe
  compact?: boolean
}) => {
  return (
    <LoadingButton
      class={props.compact ? 'pl-3' : ''}
      message={`${props.recipe?.title} zum Kochplan hinzugefügt`}
      disabled={props.recipe === undefined}
      icon={<PlusIcon />}
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
      icon={<CheckIcon />}
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
