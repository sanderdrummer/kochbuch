import { useQuery, QueryClient } from "react-query";
import { get } from "../api";

export const queryClient = new QueryClient();

export const mockResponse: RecipeResponse = [
  {
    title: "recipe2",
    ingredients: [
      {
        name: "flour",
        amount: "2",
      },
    ],
    description: "describe",
  },
];

type RecipeResponse = Recipe[];

export type Recipe = {
  title: string;
  ingredients: Ingredient[];
  description: string;
};

interface Ingredient {
  amount: string;
  name: string;
}

export const useRecipes = () => {
  return useQuery<RecipeResponse>("recipes", async () => {
    const data = await get(
      "https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json"
    );
    return data ?? [];
  });
};
