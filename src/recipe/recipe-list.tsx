import React from "react";

import { Skeleton } from "@material-ui/lab";
import { List, Button, Box } from "@material-ui/core";

import { RecipeDetails } from "./recipe-details";
import { usePlans } from "../plan/plan";
import { RecipeFilter, useFilteredRecipes } from "./recipe-filter";

export const ListLoader: React.FC = () => {
  return (
    <>
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
    </>
  );
};

export const RecipeList = () => {
  const { addRecipe } = usePlans();
  const { recipes, status, refetch, ...filterProps } = useFilteredRecipes();

  return (
    <>
      <RecipeFilter {...filterProps} />
      <List>
        {recipes.map((recipe) => (
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
