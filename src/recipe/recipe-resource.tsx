import { useEffect, useState } from "react";
import { get } from "../api";
import { useLocalStorage } from "../common/useLocalStorage";

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

const fetchRecipes = () => {
  return get<RecipeResponse>(
    "https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json"
  );
};

export type FetchStatus = "idle" | "done" | "fetching" | "error";
export const useRecipes = () => {
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [data, setData] = useLocalStorage<Recipe[]>("recipes-storage", []);
  const handleFetchRecipe = async () => {
    setStatus("fetching");
    try {
      const data = await fetchRecipes();
      setData(data);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    handleFetchRecipe();
  }, []);

  return { status, data, refetch: handleFetchRecipe };
};
