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
  name: string
}

export type Plan = {
  id: number
  status: string
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
    this.version(3).stores({
      recipes: '&title',
      plans: '++id,status',
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
  return recipeDB.plans.add({ ...recipe, status: 'planing' })
}

const togglePlanStatus = (plan: Plan) => {
  switch (plan.status) {
    case 'done':
      return 'planing'
    default:
      return 'done'
  }
}

export const togglePlan = (plan: Plan) => {
  return recipeDB.plans.update(plan.id, { status: togglePlanStatus(plan) })
}

export const plansResource = () => {
  return createResource(getPlans)
}
