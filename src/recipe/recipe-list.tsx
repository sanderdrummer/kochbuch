import React from "react";

import { Skeleton } from "@material-ui/lab";
import { List, Button, Box } from "@material-ui/core";

import { SearchInput } from "../common";
import { Recipe, useRecipes } from "./recipe-resource";
import { RecipeDetails } from "./recipe-details";
import { usePlans } from "../plan/plan";

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
  const { data: recipes, status, refetch } = useRecipes();

  const [query, setQuery] = React.useState("");
  const [filtered, setFiltered] = React.useState<Recipe[]>(recipes ?? []);
  React.useEffect(() => {
    setFiltered(filterRecipes(recipes, query));
  }, [query, recipes]);
  const { addRecipe } = usePlans();

  return (
    <>
      <SearchInput label="was kochen ?" onSubmit={setQuery} />
      <List>
        {filtered.map((recipe) => (
          <RecipeDetails
            key={recipe.title}
            recipe={recipe}
            action={
              <Button onClick={() => addRecipe(recipe)}>zum Koch Plan</Button>
            }
          />
        ))}
      </List>
      {status === "fetching" && (
        <Skeleton aria-label="loading" data-testid="loader" />
      )}
      {status === "error" && (
        <Box>
          rezepte konnten nicht geladen werden
          <Button onClick={() => refetch()}>nochmal versuchen</Button>
        </Box>
      )}
    </>
  );
};
