import { useReducer } from "react";
import { RecipeListItem } from "~/resources/recipes";

type RecipeDetails = {
  recipe: Recipe;
  isFavorite: boolean;
};
type RecipeState = {
  recipes: RecipeListItem[] | "pending";
  selectedRecipe: RecipeDetails | "pending";
};
type Action =
  | {
      type: "setRecipes";
      recipes: RecipeListItem;
    }
  | {
      type: "setRecipeDetails";
      selectedRecipe: RecipeDetails;
    }
  | {
      type: "recipesPending";
    }
  | { type: "selectedRecipesPending" }
  | { type: "refresh" };
const initialState: RecipeState = {
  recipes: "pending",
  selectedRecipe: "pending",
};
const recipeReducer = (state: RecipeState, action: Action): RecipeState => {
  switch (action.type) {
    default:
      return state;
  }
};

export const useRecipes = () => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
};
