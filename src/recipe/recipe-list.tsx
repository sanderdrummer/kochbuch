import React from "react";
import { useHistory } from "react-router";

import { Skeleton } from "@material-ui/lab";
import { Add } from "@material-ui/icons";
import { List, ListItem, ListItemText, Button, Box } from "@material-ui/core";

import { SearchInput, BottomRightFab } from "../common";
import { getRecipeDetailPath, ADD_RECIPE_PATH } from ".";
import {
  useRecipeDispatch,
  useRecipeState,
  fetchRecipes,
} from "./recipe-resource";

export const ListLoader: React.FC = () => {
  return (
    <>
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
    </>
  );
};

export const RecipeList = () => {
  const navigate = useHistory();
  const { recipes, hasError, isLoading } = useRecipeState();
  const dispatch = useRecipeDispatch();

  return (
    <>
      <List>
        {Object.values(recipes).map((recipe) => (
          <ListItem
            button
            onClick={() => navigate.push(getRecipeDetailPath(recipe.title))}
            key={recipe.title}
          >
            <ListItemText primary={recipe.title} secondary={recipe.tags} />
          </ListItem>
        ))}
      </List>
      {isLoading && <Skeleton />}
      {hasError && (
        <Box>
          rezpete konnten nicht geladen werden{" "}
          <Button onClick={() => fetchRecipes(dispatch)}>
            nochmal versuchen
          </Button>
        </Box>
      )}
      <BottomRightFab
        onClick={() => navigate.push(ADD_RECIPE_PATH)}
        label="Rezept hinzufügen"
        children={<Add />}
      />
    </>
  );
};
