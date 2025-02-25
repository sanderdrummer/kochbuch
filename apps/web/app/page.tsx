import { RecipeSearchList } from "./recipes/recipe-search-list";
import { fetchRecipes } from "./recipes/recipes";

export default async function RecipeListPage() {
  const recipes = await fetchRecipes();
  return <RecipeSearchList recipes={recipes} />;
}
