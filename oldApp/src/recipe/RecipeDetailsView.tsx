import { useParams } from '@solidjs/router'
import { For, createSignal, JSX } from 'solid-js'
import { H1, HeightWrapper } from '@kochbuch/components'

import { Recipe, recipeResource } from './RecipeResource'
import { AddRecipeToPlan } from './RecipeActions'

export const getAmount = (amount: string, modifier = 1) => {
  if (Number(amount) === 0) return ''
  if (modifier === 1) return amount

  return `${Number(amount) * modifier}`
}

export const RecipeDetails = (props: {
  children: JSX.Element
  recipe?: Recipe
}) => {
  const [modifier, setModifier] = createSignal(1)
  const scales = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

  return (
    <HeightWrapper class="mx-auto container whitespace-pre-wrap px-5">
      <H1>{props.recipe?.title}</H1>
      <div class="mb-8 sm:grid-flow-col grid justify-between">
        <label class="mb-8 sm:mtb0 sm:order-2">
          <span class="mr-4 text-stone-400 font-normal">Menge:</span>
          <select
            class="rounded bg-stone-800 text-stone-400 border-stone-800 focus:outline-none focus:border-stone-400 focus:ring-stone-400 focus:ring-1"
            value={modifier()}
            onChange={(e) => setModifier(Number(e.currentTarget.value))}
          >
            <For each={scales}>
              {(scale) => <option value={scale}>{scale}</option>}
            </For>
          </select>
        </label>
        <ul class="sm:order-1">
          <For each={props.recipe?.ingredients}>
            {(ingredient) => (
              <li>
                <span class="text-stone-400">
                  {getAmount(ingredient.amount, modifier())}
                  {ingredient.scale}
                </span>
                <span class="font-normal"> {ingredient.name} </span>
              </li>
            )}
          </For>
        </ul>
      </div>
      <p>{props.recipe?.description}</p>

      <div class="mt-12 mb-8">{props.children}</div>
    </HeightWrapper>
  )
}

export const RecipeDetailsView = () => {
  const params = useParams<{ id: string }>()
  const [recipe] = recipeResource(params.id)
  return (
    <RecipeDetails recipe={recipe()}>
      <AddRecipeToPlan recipe={recipe()} />
    </RecipeDetails>
  )
}
