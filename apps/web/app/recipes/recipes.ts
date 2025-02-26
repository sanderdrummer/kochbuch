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

type RecipeResponse = Recipe[];

export const fetchRecipes = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json",
  );
  const recipes = await res.json();

  return recipes as RecipeResponse;
};

export const getSafeTitle = (title: string) => {
  return title.replaceAll(" ", "_");
};
