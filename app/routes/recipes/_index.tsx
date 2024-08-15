import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import { SearchBar } from "~/components/SearchBar";
import { getRecipes } from "~/resources/recipes";

export const meta: MetaFunction = () => {
  return [
    { title: "Kochbuch" },
    { name: "description", content: "Rezepte und Einkaufsliste" },
  ];
};

export const clientLoader = async () => {
  const recipeList = await getRecipes();
  return recipeList;
};

export default function Index() {
  const recipes = useLoaderData<typeof clientLoader>();
  const [query, setQuery] = useState("");
  const filteredRecipes = useMemo(() => {
    return query.length > 0
      ? recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(query.toLowerCase());
      })
      : recipes;
  }, [query, recipes]);
  return (
    <main className="font-sans">
      <div className="min-h-screen">
        <div className="p-4 sticky top-0">
          <SearchBar
            placeholder="Was kochen?"
            query={query}
            setQuery={setQuery}
          />
        </div>
        <ul>
          {filteredRecipes.map((recipe) => (
            <li key={recipe.title}>
              <Link to={`recipes/${recipe.title}`}>{recipe.title}</Link>
              {recipe.isFavorite ? "FAV" : "NO"}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
