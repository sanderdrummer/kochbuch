import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import Dexie from 'dexie'
import { fetchRecipes, Recipe } from './recipes'

class MyDatabase extends Dexie {
  recipeStorage: Dexie.Table<{ key: string; value: string }, string>

  constructor() {
    super('MyDatabase')
    this.version(1).stores({
      recipeStorage: 'key',
    })
    this.recipeStorage = this.table('recipeStorage')
  }
}

const db = new MyDatabase()
const dexieStorage = {
  getItem: async (name: string) => {
    const record = await db.recipeStorage.get(name)
    return record ? JSON.parse(record.value) : null
  },
  setItem: async (name: string, value: any) => {
    await db.recipeStorage.put({ key: name, value: JSON.stringify(value) })
  },
  removeItem: async (name: string) => {
    await db.recipeStorage.delete(name)
  },
}

export type RecipeFilter = {
  query: string
  onlyFavorites: boolean
}
type RecipeStore = {
  recipes: Recipe[]
  filter: RecipeFilter
  filteredRecipes: () => Recipe[]
  refreshRecipes: () => Promise<void>
  favorites: Record<string, boolean>
  toggleFavorite: (title: string) => void
  setQuery: (query: string) => void
  toggleOnlyFavorites: VoidFunction
  getRecipeByTitle: (title: string) => Recipe | undefined
}

export const useRecipeStore = create(
  persist<RecipeStore>(
    (set, get) => ({
      recipes: [],
      filter: { query: '', onlyFavorites: false },
      refreshRecipes: async () => {
        const recipes = await fetchRecipes()
        set({ recipes })
      },
      filteredRecipes: () => {
        const { filter, recipes, favorites } = get()
        const favoritRecipes = filter.onlyFavorites
          ? recipes.filter((recipe) => favorites[recipe.title])
          : recipes

        return filter.query
          ? favoritRecipes.filter((recipe) =>
            recipe.title
              .toLocaleLowerCase()
              .includes(filter.query.toLocaleLowerCase())
          )
          : favoritRecipes
      },
      favorites: {},
      toggleFavorite: (title: string) => {
        const { favorites } = get()
        favorites[title] = !favorites[title]
        set({ favorites })
      },
      toggleOnlyFavorites: () => {
        const { filter } = get()
        set({ filter: { ...filter, onlyFavorites: !filter.onlyFavorites } })
      },
      setQuery: (query: string) => {
        const { filter } = get()
        set({ filter: { ...filter, query } })
      },
      getRecipeByTitle: (title: string) => {
        return get().recipes.find((recipe) => recipe.title === title)
      },
    }),
    {
      name: 'recipe-storage',
      storage: createJSONStorage(() => dexieStorage),
    }
  )
)
