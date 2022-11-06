import { A } from '@solidjs/router'
import { For } from 'solid-js'
import { Recipe } from './RecipeResource'

type RecipeProps = {
    recipes?: Recipe[]
}

export const RecipeList = (props: RecipeProps) => {
    return (
        <div class="mx-auto container">
            <ul role="list" class="divide-y list-none divide-stone-800">
                <For
                    each={props.recipes}
                    fallback={
                        <div class="p-3 font-extralight text-lg">
                            Leider nichts gefunden :/{' '}
                        </div>
                    }
                >
                    {(recipe) => (
                        <li class="p-3 font-extralight text-lg">
                            <A class="no-underline " href={recipe.title}>
                                {recipe.title}
                            </A>
                        </li>
                    )}
                </For>
            </ul>
        </div>
    )
}
