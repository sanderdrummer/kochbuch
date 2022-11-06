import { createResource } from "solid-js";
import Dexie, { Table } from "dexie";

type RecipeResponse = Recipe[];

export type Recipe = {
  title: string;
  ingredients: Ingredient[];
  description: string;
  tags: string[];
};

export type Ingredient = {
  amount: string;
  name: string;
};

export type Identify = {
  id?: number;
};

export type RecipeModel = Recipe & Identify;

const fetchRecipes = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json"
  );
  const recipes = await res.json();

  return recipes as RecipeResponse;
};


class RecipeDatabase extends Dexie {
  recipes!: Table<RecipeModel, string>;

  constructor() {
    super("RecipeDatabase");
    this.version(2).stores({
      recipes: "&title",
    });
  }
}

export const recipeDB = new RecipeDatabase();

export const initRecipes = async () => {
  const recipes = await fetchRecipes();
  await recipeDB.recipes.bulkPut(recipes)
};


const getRecipes = async () => {
  const recipes = await recipeDB.recipes.toArray()
  return recipes
}
const getRecipe = async (title:string) => {
  const recipe = await recipeDB.recipes.get(title)
  return recipe
}
export const recipeResource = (title:string) => {
  return createResource(title, getRecipe);
};

export const recipesResource = () => {
  return createResource(getRecipes);
};

