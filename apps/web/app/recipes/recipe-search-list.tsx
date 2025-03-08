"use client";

import { SearchBar } from "@kochbuch/ui/search-bar";
import { Recipe } from "./recipes";
import { useRecipeStore } from "./recipe-store";
import { useEffect } from "react";
import { FavoriteFilterButton, FavoriteToggleButton } from "./favorite-button";
import { AddRecipeToList } from "./add-recipe-to-list";
import { ItemList } from "@kochbuch/ui/list";

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
        <FavoriteFilterButton
          isFavorite={filter.onlyFavorites}
          setIsFavorite={toggleOnlyFavorites}
        />
      </div>
      <ItemList
        path="/recipes/"
        items={
          filter.query.length === 0 &&
          filter.onlyFavorites === false &&
          filteredRecipes().length === 0
            ? recipes
            : filteredRecipes()
        }
        emptyState="nichts gefunden :/"
        actions={(recipe) => (
          <>
            <FavoriteToggleButton title={recipe.title} />
            <AddRecipeToList recipe={recipe} />
          </>
        )}
      />
    </main>
  );
};
