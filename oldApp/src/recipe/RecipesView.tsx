import { createEffect, createSignal } from 'solid-js'
import { SearchBar } from '@kochbuch/components'
import { RecipeList } from './RecipeList'
import { recipesResource } from './RecipeResource'
import { AddRecipeToPlan } from './RecipeActions'

export const RecipesView = () => {
  const [recipes, { refetch }] = recipesResource()

  const [query, setQuery] = createSignal('')
  const getFilteredRecipes = () => {
    const lowerCasedQuery = query().toLocaleLowerCase()
    return lowerCasedQuery.length > 1
      ? (recipes() ?? []).filter((recipe) => {
          return recipe.title.toLocaleLowerCase().includes(lowerCasedQuery)
        })
      : recipes()
  }
  createEffect(() => {
    if (recipes.state === 'ready' && recipes().length === 0) {
      refetch()
    }
  })

  return (
    <div class="min-h-screen">
      <div class="p-4 sticky top-0">
        <SearchBar
          placeholder="Was kochen?"
          query={query()}
          setQuery={setQuery}
        />
      </div>
      <RecipeList
        getHref={(recipe) => recipe.title}
        action={(recipe) => <AddRecipeToPlan compact recipe={recipe} />}
        emptyState="Leider kein Rezept gefunden"
        recipes={getFilteredRecipes()}
      />
    </div>
  )
}
