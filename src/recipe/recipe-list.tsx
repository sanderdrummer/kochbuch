import React from "react";
import { useHistory } from "react-router";

import { Skeleton } from "@material-ui/lab";
import { List, ListItem, ListItemText, Button, Box } from "@material-ui/core";

import { SearchInput } from "../common";
import { getRecipeDetailPath } from ".";
import { Recipe, useRecipes } from "./recipe-resource";

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
  const {
    data: recipes,
    isLoading,
    isError,
    error,
    isLoadingError,
    refetch,
  } = useRecipes();

  const [query, setQuery] = React.useState("");
  const [filtered, setFiltered] = React.useState<Recipe[]>(recipes ?? []);
  React.useEffect(() => {
    setFiltered(filterRecipes(recipes, query));
  }, [query, recipes]);

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
      {isError && (
        <Box>
          rezepte konnten nicht geladen werden
          <Button onClick={() => refetch()}>nochmal versuchen</Button>
        </Box>
      )}
    </>
  );
};
