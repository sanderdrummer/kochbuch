import React from "react";

import { Skeleton } from "@material-ui/lab";
import { List, Button, Box } from "@material-ui/core";

import { SearchInput } from "../common";
import { Recipe, useRecipes } from "./recipe-resource";
import { RecipeDetails } from "./recipe-details";

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
  const { data: recipes, isLoading, isError, refetch } = useRecipes();

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
          <RecipeDetails key={recipe.title} recipe={recipe} />
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
