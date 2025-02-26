import { fetchRecipes, getSafeTitle } from "../recipes";
import { RecipeDetails } from "./recipe-details";

export async function generateStaticParams() {
  const recipes = await fetchRecipes();

  return recipes.map((recipe) => ({
    id: getSafeTitle(recipe.title),
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
  const recipe = recipes.find((recipe) => getSafeTitle(recipe.title) === id);

  return <RecipeDetails recipe={recipe} />;
}
