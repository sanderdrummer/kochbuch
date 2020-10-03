import React from "react";
import { Switch, Route } from "react-router-dom";

import { RecipeList } from "./recipe-list";
import { RecipeDetails } from "./recipe-details";

import { RECIPES_PATH } from "../routes-config";

export const ADD_RECIPE_PATH = RECIPES_PATH + "/neues-rezept";
export const RECIPE_DETAILS_PATH = RECIPES_PATH + "/:id";
export const RECIPE_DETAILS_EDIT_PATH = RECIPE_DETAILS_PATH + "/bearbeiten";

export const getRecipeDetailPath = (title: string) =>
  RECIPES_PATH + "/" + title;

export const RecipePage = () => {
  return (
    <Switch>
      <Route exact path={RECIPES_PATH} component={RecipeList} />

      <Route exact path={RECIPE_DETAILS_PATH} component={RecipeDetails} />
    </Switch>
  );
};
