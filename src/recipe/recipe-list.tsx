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
  Recipe,
} from "./recipe-resource";

export const ListLoader: React.FC = () => {
  return (
    <>
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
    </>
  );
};

const filterRecipes = (
  recipes: Recipe[] = [],
  query: string = ""
): Recipe[] => {
  if (!query) {
    return recipes || [];
  }
  const lowerCaseQuery = query.toLowerCase();
  return recipes.filter((recipe) => {
    return recipe.title.toLowerCase().includes(lowerCaseQuery);
  });
};

export const RecipeList = () => {
  const navigate = useHistory();
  const { recipes, hasError, isLoading } = useRecipeState();
  const [query, setQuery] = React.useState("");
  const [filtered, setFiltered] = React.useState<Recipe[]>(
    Object.values(recipes)
  );
  React.useEffect(() => {
    setFiltered(filterRecipes(Object.values(recipes), query));
  }, [query, recipes]);

  const dispatch = useRecipeDispatch();

  return (
    <>
      <SearchInput label="was kochen ?" onSubmit={setQuery} />
      <List>
        {filtered.map((recipe) => (
          <ListItem
            button
            onClick={() => navigate.push(getRecipeDetailPath(recipe.title))}
            key={recipe.title}
          >
            <ListItemText primary={recipe.title} />
          </ListItem>
        ))}
      </List>
      {isLoading && <Skeleton aria-label="loading" data-testid="loader" />}
      {hasError && (
        <Box>
          rezepte konnten nicht geladen werden
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
