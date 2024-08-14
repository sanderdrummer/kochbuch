import { createResource } from 'solid-js'
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

export type Plan = {
  id: number
} & Recipe

const fetchRecipes = async () => {
  const res = await fetch(
    'https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json'
  )
  const recipes = await res.json()

  return recipes as RecipeResponse
}

class RecipeDatabase extends Dexie {
  recipes!: Table<Recipe, string>
  plans!: Table<Plan, number>

  constructor() {
    super('RecipeDatabase')
    this.version(4).stores({
      recipes: '&title',
      plans: '++id',
    })
  }
}

const recipeDB = new RecipeDatabase()

export const initRecipes = async () => {
  const recipes = await fetchRecipes()
  await recipeDB.recipes.bulkPut(recipes)
}

const getRecipes = async () => {
  const recipes = await recipeDB.recipes.toArray()
  return recipes
}
const getRecipe = async (title: string) => {
  const recipe = await recipeDB.recipes.get(title)
  return recipe
}
export const recipeResource = (title: string) => {
  return createResource(title, getRecipe)
}

export const recipesResource = () => {
  return createResource(getRecipes)
}

const getPlans = async () => {
  const plans = await recipeDB.plans.toCollection().sortBy('status')
  return plans
}

export const clearPlans = async () => {
  const plans = await recipeDB.plans.where('status').equals('done').toArray()
  return recipeDB.plans.bulkDelete(plans.map((plan) => plan.id))
}

export const addRecipeToPlan = (recipe: Recipe) => {
  // @ts-expect-error id is optional on add
  return recipeDB.plans.add(recipe)
}

export const planIsDone = (plan: Plan) => {
  return recipeDB.plans.delete(plan.id)
}

export const plansResource = () => {
  return createResource(getPlans)
}

const getPlan = async (id: number) => {
  const plan = await recipeDB.plans.get(id)
  return plan
}
export const planResource = (id: number) => {
  return createResource(id, getPlan)
}
