import { fetchRecipes } from "../recipes";
import { RecipeDetails } from "./recipe-details";

export async function generateStaticParams() {
  const recipes = await fetchRecipes();

  return recipes.map((recipe) => ({
    id: recipe.id,
  }));
}

export default async function RecipeDetailsPage({
  params,
}: {
  params: Promise<Record<string, string>>;
}) {
  const resolvedParameters = await params;
  const id = resolvedParameters.id;
  const recipes = await fetchRecipes();
  const recipe = recipes.find((recipe) => recipe.id === id);

  return <RecipeDetails recipe={recipe} />;
}
