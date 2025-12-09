import { useQuery } from "@tanstack/react-query";
import Dexie, { type Table } from "dexie";

type RecipeResponse = Recipe[];

export type Recipe = {
	title: string;
	ingredients: Ingredient[];
	description: string;
	tags: string[];
};

export type Ingredient = {
	amount: string;
	scale: string;
	name: string;
};

export type Plan = {
	id: number;
} & Recipe;

const fetchRecipes = async () => {
	const res = await fetch(
		"https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json",
	);
	const recipes = await res.json();

	return recipes as RecipeResponse;
};

class RecipeDatabase extends Dexie {
	recipes!: Table<Recipe, string>;
	plans!: Table<Plan, number>;

	constructor() {
		super("RecipeDatabase");
		this.version(4).stores({
			recipes: "&title",
			plans: "++id",
		});
	}
}

const recipeDB = new RecipeDatabase();

export const initRecipes = async () => {
	const recipes = await fetchRecipes();
	await recipeDB.recipes.bulkPut(recipes);
};

export const getRecipes = async (): Promise<Recipe[]> => {
	const recipes = await recipeDB.recipes.toArray();
	return recipes;
};
export const getRecipe = async (title: string) => {
	const recipe = await recipeDB.recipes.get(title);
	return recipe;
};

export const useRecipe = (title: string) => {
	return useQuery({
		queryKey: [`recipe/${title}`],
		queryFn: () => getRecipe(decodeURIComponent(title)),
	});
};

export const useGetRecipes = () => {
	return useQuery({
		queryKey: ["recipes"],
		queryFn: getRecipes,
	});
};

void initRecipes();
