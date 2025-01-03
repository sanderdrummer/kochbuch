import Dexie, { Table } from 'dexie'

type RecipeResponse = Recipe[]

export type Recipe = {
  title: string
  ingredients: Ingredient[]
  description: string
  tags: string[]
}

export type Ingredient = {
  amount: string
  scale: string
  name: string
}

export type Favorite = {
  title: string
}

export const fetchRecipes = async () => {
  const res = await fetch(
    'https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json'
  )
  const recipes = await res.json()

  return recipes as RecipeResponse
}

class RecipeDatabase extends Dexie {
  recipes!: Table<Recipe, string>
  favorites!: Table<Favorite, string>

  constructor() {
    super('RecipeDatabase')
    this.version(4).stores({
      recipes: '&title',
      favorites: '&title',
    })
  }
}

const recipeDB = new RecipeDatabase()

export const initRecipes = async () => {
  const recipes = await fetchRecipes()
  await recipeDB.recipes.bulkPut(recipes)
}

const getFlatFavorites = async (): Promise<string[]> => {
  const favorites = await recipeDB.favorites.toArray()
  return favorites.map((favorites) => favorites.title)
}

export type RecipeListItem = Recipe & {
  isFavorite: boolean
}
export const getRecipes = async (): Promise<RecipeListItem[]> => {
  const recipes = await recipeDB.recipes.toArray()
  const favorites = await getFlatFavorites()
  return recipes.map((recipe) => {
    return {
      ...recipe,
      isFavorite: favorites.includes(recipe.title),
    }
  })
}

export const getRecipe = async (title: string) => {
  const recipe = await recipeDB.recipes.get(title)
  return recipe
}

export const getFavorite = async (title: string) => {
  const isFavorite = await recipeDB.favorites.get(title)
  return Boolean(isFavorite?.title)
}

export const setIsFavorite = async (title: string, isFavorite: boolean) => {
  if (isFavorite) {
    recipeDB.favorites.add({ title })
  } else {
    recipeDB.favorites.delete(title)
  }
  return 'ok'
}
