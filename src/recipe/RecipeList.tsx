import { A } from '@solidjs/router'
import { For, JSX } from 'solid-js'
import { Recipe } from './RecipeResource'

type RecipeProps<Item extends Recipe> = {
  recipes?: Item[]
  emptyState: string
  action: (item: Item) => JSX.Element
  getHref: (item: Item) => string
}

export const RecipeList = <Item extends Recipe>(props: RecipeProps<Item>) => {
  return (
    <div class="mx-auto container">
      <ul role="list" class="divide-y list-none divide-stone-800">
        <For
          each={props.recipes}
          fallback={
            <div class="p-3 font-extralight text-lg">{props.emptyState}</div>
          }
        >
          {(recipe) => (
            <li class="font-extralight text-lg grid grid-flow-col justify-between">
              <A class="p-3 no-underline " href={props.getHref(recipe)}>
                {recipe.title}
              </A>
              {props.action(recipe)}
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}
