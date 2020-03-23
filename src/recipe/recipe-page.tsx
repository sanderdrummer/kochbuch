import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import {
  RecipeForm,
  RecipeList,
  RecipeDetails,
  RecipeEditForm
} from "./recipe-form";

import { RECIPES_PATH } from "../routes-config";

export const ADD_RECIPE_PATH = RECIPES_PATH + "/neues-rezept";
export const RECIPE_DETAILS_PATH = RECIPES_PATH + "/:id";
export const RECIPE_DETAILS_EDIT_PATH = RECIPE_DETAILS_PATH + "/bearbeiten";
export const getRecipeDetailPath = (title: string) =>
  RECIPES_PATH + "/" + title;
export const getRecipeDetailEditPath = (title: string) =>
  getRecipeDetailPath(title) + "/bearbeiten";

export const RecipePage = () => {
  const history = useHistory();

  return (
    <Switch>
      <Route exact path={RECIPES_PATH} component={RecipeList} />
      <Route
        path={ADD_RECIPE_PATH}
        render={() => (
          <RecipeForm
            onComplete={recipe => {
              history.push(getRecipeDetailPath(recipe.title));
            }}
          />
        )}
      />
      <Route exact path={RECIPE_DETAILS_PATH} component={RecipeDetails} />
      <Route path={RECIPE_DETAILS_EDIT_PATH} component={RecipeEditForm} />
    </Switch>
  );
};
