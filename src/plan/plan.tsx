import React from "react";
import { Box, Button, Divider, Typography } from "@material-ui/core";
import { useLocalStorage } from "../common/useLocalStorage";
import { addListItems } from "../list/list-hooks";
import { RecipeDetails } from "../recipe/recipe-details";
import { Recipe } from "../recipe/recipe-resource";

interface Plan {
  isDone: boolean;
  recipe: Recipe;
}

export const usePlans = () => {
  const [plans, setPlans] = useLocalStorage<Record<string, Plan>>("plan", {});

  const completedPlans = Object.values(plans).filter((plan) => plan.isDone);
  const openPlans = Object.values(plans).filter((plan) => !plan.isDone);

  const togglePlan = (plan: Plan) => {
    setPlans({
      ...plans,
      [plan.recipe.title]: {
        ...plan,
        isDone: !plan.isDone,
      },
    });
  };

  const clearPlans = () => {
    setPlans(
      openPlans.reduce((plans, plan) => {
        return { ...plans, [plan.recipe.title]: plan };
      }, {} as Record<string, Plan>)
    );
  };

  const addRecipe = (recipe: Recipe) => {
    const nextPlans = {
      ...plans,
      [recipe.title]: {
        isDone: false,
        recipe: recipe,
      },
    };
    setPlans(nextPlans);
  };

  return { completedPlans, openPlans, clearPlans, addRecipe, togglePlan };
};

export const PlanView = () => {
  const { openPlans, completedPlans, clearPlans, togglePlan } = usePlans();
  return (
    <>
      <Typography variant="h5">Wir kochen</Typography>
      {openPlans.length === 0 && <Typography>Noch nichts :/</Typography>}
      {openPlans.map((plan) => (
        <>
          <RecipeDetails
            key={plan.recipe.title}
            recipe={plan.recipe}
            action={
              <Button
                onClick={() => {
                  togglePlan(plan);
                }}
              >
                Fertig gekocht
              </Button>
            }
          ></RecipeDetails>
        </>
      ))}
      <Box p={2} />
      {completedPlans.length > 0 && (
        <Typography variant="h5">Schon gekocht</Typography>
      )}
      {completedPlans.map((plan) => (
        <>
          <RecipeDetails
            key={plan.recipe.title}
            recipe={plan.recipe}
          ></RecipeDetails>
        </>
      ))}

      <Box p={2} />
      <Box display="flex" justifyContent="space-between">
        <Button
          onClick={() => {
            const items = openPlans.reduce<Recipe["ingredients"]>(
              (items, plan) => {
                return items.concat(plan.recipe.ingredients);
              },
              []
            );
            addListItems(items.map((item) => `${item.amount} ${item.name}`));
          }}
          color="primary"
        >
          Plan zur Einkaufsliste
        </Button>
        <Button onClick={clearPlans}>Plan löschen</Button>
      </Box>
    </>
  );
};
