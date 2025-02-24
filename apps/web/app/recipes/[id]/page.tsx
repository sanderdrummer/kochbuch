import { fetchRecipes } from "../recipes";

export async function generateStaticParams() {
  const recipes = await fetchRecipes();

  return recipes.map((recipe) => ({
    id: encodeURI(recipe.title),
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
  const recipe = recipes.find((recipe) => encodeURI(recipe.title) === id);

  return <div>{recipe?.title}</div>;
}
