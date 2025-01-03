import type { MetaFunction } from '@remix-run/node'
import { SearchBar } from '~/components/SearchBar'
import { RecipeList } from './recipe-list'
import { FavoriteFilterButton } from './favorite-button'
import { LoadingButton } from '~/components/Inputs'
import { useRecipeStore } from '~/resources/recipes-store'

export const meta: MetaFunction = () => {
  return [
    { title: 'Kochbuch' },
    { name: 'description', content: 'Rezepte und Einkaufsliste' },
  ]
}

export const useRecipes = () => { }

export default function Index() {
  const {
    filter,
    filteredRecipes,
    refreshRecipes,
    setQuery,
    toggleOnlyFavorites,
  } = useRecipeStore()
  return (
    <main className="font-sans min-h-screen">
      <div className="p-4 sticky top-0 grid grid-cols-[1fr_2rem] gap-2">
        <SearchBar
          placeholder="Was kochen?"
          query={filter.query}
          setQuery={setQuery}
        />
        <FavoriteFilterButton
          isFavorite={filter.onlyFavorites}
          setIsFavorite={toggleOnlyFavorites}
        />
      </div>
      <RecipeList recipes={filteredRecipes()} emptyState="nichts gefunden :/" />
      <div className="mx-auto container my-6 flex justify-end">
        <LoadingButton label="neu laden" onClick={refreshRecipes} />
      </div>
    </main>
  )
}
