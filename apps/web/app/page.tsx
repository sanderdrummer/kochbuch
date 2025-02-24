import { RecipeList } from "./recipes/recipe-list";
import { fetchRecipes } from "./recipes/recipes";

export default async function RecipeListPage() {
  const recipes = await fetchRecipes();
  return <RecipeList recipes={recipes} emptyState="Noch keine Rezpete" />;
}
