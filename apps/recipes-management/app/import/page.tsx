import { revalidatePath } from "next/cache";
import {
  dropRecipes,
  addFullRecipe,
  IngredientInsert,
} from "../../db/recipe-service";
import { redirect } from "next/navigation";

export type Recipe = {
  title: string;
  ingredients: Ingredient[];
  description: string;
  tags: string[];
  id: string;
};

export type Ingredient = {
  amount: string;
  scale: string;
  name: string;
};

type RecipeResponse = Recipe[];

const fetchRecipes = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/sanderdrummer/recipes-md/master/parsed-recipes.json",
  );
  const recipes = await res.json();

  return (recipes as RecipeResponse).map((recipe, id) => ({
    ...recipe,
    id: id.toString(),
  }));
};

export default async function ImportPage() {
  return (
    <div>
      <h1>Settings</h1>
      <form
        action={async () => {
          "use server";

          await dropRecipes();
          revalidatePath("/");
          redirect("/");
        }}
      >
        <h2>reset</h2>
        <button>RESET DB</button>
      </form>
      <form
        action={async () => {
          "use server";
          const recipes = await fetchRecipes();
          for (const recipe of recipes) {
            const ingredients: IngredientInsert[] =
              recipe.ingredients.map((ingredient) => ({
                amount: Number(ingredient.amount),
                scale: ingredient.scale,
                name: ingredient.name,
                recipeId: Number(recipe.id),
              })) ?? [];
            await addFullRecipe({
              id: Number(recipe.id),
              title: recipe.title,
              description: recipe.description,
              ingredients,
            });
          }
          revalidatePath("/");
          redirect("/");
        }}
      >
        <button>IMPORT</button>
      </form>
    </div>
  );
}
