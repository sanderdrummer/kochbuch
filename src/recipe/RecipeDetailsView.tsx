import { useParams } from '@solidjs/router'
import { For, createSignal, JSX } from 'solid-js'
import { HeightWrapper } from '@kochbuch/components'

import { Recipe, recipeResource } from './RecipeResource'
import { AddRecipeToPlan } from './RecipeActions'

export const getAmount = (amount: string, modifier = 1) => {
  if (modifier === 1) return amount

  const [digit] = amount.match(/[0-9.]+/g) ?? []
  const [scale = ''] = amount.match(/[a-zA-Z]+/g) ?? []

  return digit ? `${Number(digit) * modifier}${scale}` : scale
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
                <span class="text-stone-400">
                  {getAmount(ingredient.amount, modifier())}
                </span>
                <span class="font-normal" > {ingredient.name} </span>
              </li>
            )}
          </For>
        </ul>
        <label>
          <span class="mx-2 text-stone-400">Menge:</span>
          <select
            class="bg-stone-800 text-stone-400 border-stone-800 focus:outline-none focus:border-stone-400 focus:ring-stone-400 focus:ring-1"
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
