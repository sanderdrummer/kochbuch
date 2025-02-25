"use client";
import { SearchBar } from "@kochbuch/ui/search-bar";
import { RecipeList } from "./recipe-list";
import { Recipe } from "./recipes";
import { useRecipeStore } from "./recipe-store";
import { useEffect } from "react";

export const RecipeSearchList = ({ recipes }: { recipes: Recipe[] }) => {
  const { setRecipes, filter, filteredRecipes, setQuery, toggleOnlyFavorites } =
    useRecipeStore();
  useEffect(() => {
    setRecipes(recipes);
  }, [recipes, setRecipes]);

  return (
    <main className="font-sans min-h-screen">
      <div className="p-4 sticky top-0 grid grid-cols-[1fr_2rem] gap-2">
        <SearchBar
          placeholder="Was kochen?"
          query={filter.query}
          setQuery={setQuery}
        />
        {/* <FavoriteFilterButton */}
        {/*   isFavorite={filter.onlyFavorites} */}
        {/*   setIsFavorite={toggleOnlyFavorites} */}
        {/* /> */}
      </div>
      <RecipeList
        recipes={
          filter.query.length === 0 &&
          filter.onlyFavorites === false &&
          filteredRecipes().length === 0
            ? recipes
            : filteredRecipes()
        }
        emptyState="nichts gefunden :/"
      />
    </main>
  );
};
