import React from "react";
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
      <h5 variant="h5">Wir kochen</h5>
      <div p={1} />
      {openPlans.length === 0 && <h5>Noch nichts :/</h5>}
      {openPlans.map((plan) => (
        <>
          <RecipeDetails
            key={plan.recipe.title}
            recipe={plan.recipe}
            action={
              <button
                onClick={() => {
                  togglePlan(plan);
                }}
              >
                Fertig gekocht
              </button>
            }
          ></RecipeDetails>
        </>
      ))}
      <div p={2} />
      {completedPlans.length > 0 && (
        <>
          <p variant="h5">Schon gekocht</p>
        </>
      )}
      {completedPlans.map((plan) => (
        <>
          <RecipeDetails
            key={plan.recipe.title}
            recipe={plan.recipe}
          ></RecipeDetails>
        </>
      ))}

      <div p={2} />
      <div display="flex" justifyContent="space-between">
        <button
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
        </button>
        <button onClick={clearPlans}>Plan löschen</button>
      </div>
    </>
  );
};
