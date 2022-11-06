import { useParams } from '@solidjs/router'
import { For, createSignal, JSX } from 'solid-js'
import { HeightWrapper } from '@kochbuch/components'

import {  Recipe, recipeResource } from './RecipeResource'
import { AddRecipeToPlan } from './RecipeActions'

export const getAmount = (amount: string, modifier = 1) => {
  if (modifier === 1) return amount

  const [digit] = amount.match(/[0-9.]+/g) ?? []
  const [scale = ''] = amount.match(/[a-zA-Z]+/g) ?? []

  return digit ? `${Number(digit) * modifier} ${scale}` : scale
}

export const RecipeDetails = (props: {
  children: JSX.Element
  recipe?: Recipe
}) => {
  const [modifier, setModifier] = createSignal(1)
  const scales = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

  return (
    <HeightWrapper class="mx-auto container whitespace-pre-wrap px-5">
      <h1 class="font-bold text-xl mb-10 mt-2">{props.recipe?.title}</h1>
      <div class="mb-8 grid-flow-col grid grid-auto-cols-auto justify-between">
        <ul>
          <For each={props.recipe?.ingredients}>
            {(ingredient) => (
              <li>
                {getAmount(ingredient.amount, modifier())} {ingredient.name}
              </li>
            )}
          </For>
        </ul>
        <label class="">
          <span class="mx-2">Menge:</span>
          <select
            value={modifier()}
            onChange={(e) => setModifier(Number(e.currentTarget.value))}
          >
            <For each={scales}>
              {(scale) => <option value={scale}>{scale}</option>}
            </For>
          </select>
        </label>
      </div>
      <p>{props.recipe?.description}</p>

      <div class="mt-12">{props.children}</div>
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
