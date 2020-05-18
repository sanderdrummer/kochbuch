import React from "react";
import { get, post } from "../api";

export const mockResponse = {
  recipes: [
    {
      title: "recipe2",
      tags: "tag1",
      ingredients: "in1 in2 in3",
      description: "describe",
      image: "",
    },
  ],
  tags: ["tag1"],
};

type RecipeResponse = {
  recipes: Recipe[];
  tags: string[];
};

export type Recipe = {
  title: string;
  tags: string;
  ingredients: string;
  description: string;
  image: string;
};

export type RecipeState = {
  isLoading: boolean;
  hasError: boolean;
  recipes: Record<string, Recipe>;
  tags: string[];
};

export type RecipeAction =
  | { type: "START_LOADING" }
  | { type: "HAS_ERROR" }
  | { type: "DATA_FETCHED"; data: RecipeResponse }
  | { type: "REMOVE_RECIPE"; recipe: Recipe };
const initialState: RecipeState = {
  isLoading: false,
  tags: [],
  recipes: {},
  hasError: false,
};
const normalizeResponse = (
  state: RecipeState,
  data: RecipeResponse
): RecipeState => {
  const initialValue: Record<string, Recipe> = {};
  const recipes = data.recipes.reduce((recipes, recipe) => {
    return { ...recipes, [recipe.title]: recipe };
  }, initialValue);
  const allRecipes = { ...state.recipes, ...recipes };
  return {
    ...state,
    isLoading: false,
    hasError: false,
    tags: data.tags,
    recipes: allRecipes,
  };
};

const recipeReducer = (state: RecipeState, action: RecipeAction) => {
  switch (action.type) {
    case "DATA_FETCHED":
      return normalizeResponse(state, action.data);
    case "HAS_ERROR":
      return { ...state, hasError: true };
    case "START_LOADING":
      return { ...state, hasError: false, isLoading: true };
    case "REMOVE_RECIPE":
      const nextState = { ...state };
      delete nextState.recipes[action.recipe.title];
      return nextState;
    default:
      return state;
  }
};
type RecipeDispatch = React.Dispatch<RecipeAction>;
const RecipeDispatchContext = React.createContext<RecipeDispatch>(() => {});
const RecipeContext = React.createContext(initialState);

export const RecipeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(recipeReducer, initialState);

  React.useEffect(() => {
    fetchRecipes(dispatch);
  }, []);

  return (
    <RecipeDispatchContext.Provider value={dispatch}>
      <RecipeContext.Provider value={state}>{children}</RecipeContext.Provider>
    </RecipeDispatchContext.Provider>
  );
};

export const useRecipeDispatch = () => {
  return React.useContext(RecipeDispatchContext);
};

export const useRecipeState = () => {
  return React.useContext(RecipeContext);
};

export const fetchRecipes = async (dispatch: RecipeDispatch) => {
  dispatch({ type: "START_LOADING" });
  try {
    const data = await get("recipe");
    dispatch({ type: "DATA_FETCHED", data });
  } catch {
    dispatch({ type: "HAS_ERROR" });
  }
};

export const updateRecipe = async (
  dispatch: RecipeDispatch,
  recipe: Recipe
) => {
  await post("recipe", recipe);
  dispatch({
    type: "DATA_FETCHED",
    data: { recipes: [recipe], tags: recipe.tags.split(" ") },
  });
};

export const deleteRecipe = async (recipe: Recipe) => {
  return await post("delete-recipe", recipe);
};

export const useRecipeByTitle = (title: string) => {
  const state = useRecipeState();
  return state.recipes[title];
};
