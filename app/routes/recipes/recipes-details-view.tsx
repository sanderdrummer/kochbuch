import { type ReactNode, useId, useState } from 'react'
import { H1 } from '~/components/Header'
import { HeightWrapper } from '~/components/Layout'
import { type Recipe } from '~/resources/recipes'
import { FavoriteToggleButton } from './favorite-button'
import { AddRecipeToList } from './add-recipe-to-list'
import { useRecipeStore } from '~/resources/recipes-store'
import { useParams } from '@remix-run/react'

export default function RecipeDetailsView() {
  const { title } = useParams<{ title: string }>()
  const { getRecipeByTitle } = useRecipeStore()
  const recipe = getRecipeByTitle(title ?? '')
  return (
    <RecipeDetails recipe={recipe}>
      {recipe?.title && <FavoriteToggleButton title={recipe.title} />}
    </RecipeDetails>
  )
}

export const getAmount = (amount: string, modifier = 1) => {
  if (Number(amount) === 0) return ''
  if (modifier === 1) return amount

  return `${Number(amount) * modifier}`
}

export const RecipeDetails = ({
  children,
  recipe,
}: {
  children: ReactNode
  recipe?: Recipe
}) => {
  const [modifier, setModifier] = useState(1)
  const scales = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
  const id = useId()

  return (
    <HeightWrapper
      labeledBy={id}
      className="mx-auto container whitespace-pre-wrap px-5"
    >
      <H1 id={id}>{recipe?.title}</H1>
      <div className="mb-8 sm:grid-flow-col grid justify-between">
        <label className="mb-8 sm:mtb0 sm:order-2">
          <span className="mr-4 text-stone-400 font-normal">Menge:</span>
          <select
            className="rounded bg-stone-800 text-stone-400 border-stone-800 focus:outline-none focus:border-stone-400 focus:ring-stone-400 focus:ring-1"
            value={modifier}
            onChange={(e) => setModifier(Number(e.currentTarget.value))}
          >
            {scales.map((scale) => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </select>
        </label>
        <ul className="sm:order-1">
          {recipe?.ingredients.map((ingredient) => (
            <li key={ingredient.name}>
              <span className="text-stone-400">
                {getAmount(ingredient.amount, modifier)}
                {ingredient.scale}
              </span>
              <span className="font-normal"> {ingredient.name} </span>
            </li>
          ))}
        </ul>
      </div>
      <p>{recipe?.description}</p>

      <div className="mt-12 mb-8 flex gap-8">
        {children}
        {recipe && <AddRecipeToList recipe={recipe} modifier={modifier} />}
      </div>
    </HeightWrapper>
  )
}
