import React from "react";
import { useHistory } from "react-router";

import { Skeleton } from "@material-ui/lab";
import { Add } from "@material-ui/icons";
import { List, ListItem, ListItemText, Button, Box } from "@material-ui/core";

import { SearchInput, BottomRightFab } from "../common";
import { getRecipeDetailPath, ADD_RECIPE_PATH } from ".";
import { useRecipes } from "./recipe-hooks";

export const ListLoader: React.FC = () => {
  return (
    <>
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
    </>
  );
};

export const RecipeList = () => {
  const { recipes, status, fetchRecipes, queryRecipes, hasMore } = useRecipes();
  const navigate = useHistory();

  React.useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SearchInput label="Rezepte suchen" onSubmit={queryRecipes} />
      <List>
        {recipes.map(recipe => (
          <ListItem
            button
            onClick={() => navigate.push(getRecipeDetailPath(recipe.title))}
            key={recipe.title}
          >
            <ListItemText primary={recipe.title} secondary={recipe.tags} />
          </ListItem>
        ))}
      </List>
      {hasMore && <Button onClick={fetchRecipes}>Load more</Button>}

      {status === "error" && (
        <Box>
          rezpete konnten nicht geladen werden{" "}
          <Button onClick={fetchRecipes}>nochmal versuchen</Button>
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
