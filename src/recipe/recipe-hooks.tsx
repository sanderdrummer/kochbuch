import React from "react";

import {
  Recipe,
  getRecipeByName,
  getPagedRecipes,
  getRecipesCount,
  DEFAULT_PAGE_SIZE
} from "../db";

export type Status<T = "success"> = "" | "pending" | "error" | T;

const recipeTitleCache: Record<string, Recipe> = {};
let recipeListCache: Recipe[] = [];

export const useRecipeByTitle = (title: string) => {
  const [status, setStatus] = React.useState<Status<Recipe>>(
    recipeTitleCache[title] || ""
  );

  const updateCache = (recipe: Recipe) => {
    recipeTitleCache[recipe.title] = recipe;
  };

  const fetchRecipe = async (title: string) => {
    try {
      if (recipeTitleCache[title]) {
        setStatus(recipeTitleCache[title]);
        return;
      }
      setStatus("pending");
      const result = await getRecipeByName(title);
      setStatus(result);
      recipeTitleCache[title] = result;
    } catch {
      setStatus("error");
    }
  };
  React.useEffect(() => {
    fetchRecipe(title);
  }, [title]);

  return {
    status,
    retry: fetchRecipe,
    updateCache
  };
};

export const useRecipes = () => {
  const status = "";
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [hasMore, setHasMore] = React.useState(false);
  const offsetRef = React.useRef(0);

  const fetchRecipes = async () => {
    try {
      const result = await getPagedRecipes(offsetRef.current);
      if (result.length) {
        offsetRef.current += DEFAULT_PAGE_SIZE;
        const recipeListCache = [...recipes, ...result];
        setRecipes(recipeListCache);
        const count = await getRecipesCount();
        setHasMore(count !== recipeListCache.length);
      } else {
        setHasMore(false);
      }
    } catch {}
  };

  return {
    status,
    hasMore,
    recipes,
    fetchRecipes
  };
};
