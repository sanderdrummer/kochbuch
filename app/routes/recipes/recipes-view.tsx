import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import { SearchBar } from "~/components/SearchBar";
import { getRecipes } from "~/resources/recipes";
import { RecipeList } from "./recipe-list";
import { FavoriteFilterButton } from "./favorite-button";

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

export const useRecipes = () => { };

export default function Index() {
  const recipes = useLoaderData<typeof clientLoader>();
  const [query, setQuery] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const filteredRecipes = useMemo(() => {
    return (
      query.length > 0
        ? recipes.filter((recipe) => {
          return recipe.title.toLowerCase().includes(query.toLowerCase());
        })
        : recipes
    ).filter((recipe) => {
      return isFavorite ? recipe.isFavorite : true;
    });
  }, [query, recipes, isFavorite]);
  return (
    <main className="font-sans min-h-screen">
      <div className="p-4 sticky top-0 grid grid-cols-[1fr_2rem] gap-2">
        <SearchBar
          placeholder="Was kochen?"
          query={query}
          setQuery={setQuery}
        />
        <FavoriteFilterButton
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
        />
      </div>
      <RecipeList recipes={filteredRecipes} emptyState="nichts gefunden :/" />
    </main>
  );
}
