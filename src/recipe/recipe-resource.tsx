import React from "react";
import { get } from "../api";

export const mockResponse: RecipeResponse = [
  {
    title: "recipe2",
    ingredients: ["flour"],
    description: "describe",
  },
];

type RecipeResponse = Recipe[];

export type Recipe = {
  title: string;
  ingredients: string[];
  description: string;
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
  recipeResponse: RecipeResponse
): RecipeState => {
  const initialValue: Record<string, Recipe> = {};
  const recipes = recipeResponse.reduce((recipes, recipe) => {
    return { ...recipes, [recipe.title]: recipe };
  }, initialValue);
  const allRecipes = { ...state.recipes, ...recipes };
  return {
    ...state,
    isLoading: false,
    hasError: false,
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
    const data = await get(
      "https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json"
    );
    dispatch({ type: "DATA_FETCHED", data });
  } catch {
    dispatch({ type: "HAS_ERROR" });
  }
};

export const useRecipeByTitle = (title: string) => {
  const state = useRecipeState();
  return state.recipes[title];
};
