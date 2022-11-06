import { createSignal } from "solid-js";
import { SearchBar } from "@kochbuch/components";
import { RecipeList } from "./RecipeList";
import { recipesResource } from "./RecipeResource";





export const RecipesView = () => {
  const [recipes] = recipesResource();

  const [query, setQuery] = createSignal("");
  const getFilteredRecipes = () => {
    const lowerCasedQuery = query().toLocaleLowerCase();
    return lowerCasedQuery.length > 3
      ? (recipes() ?? []).filter((recipe) => {
          return recipe.title.toLocaleLowerCase().includes(lowerCasedQuery);
        })
      : recipes();
  };

  return (
    <div class="min-h-screen">
      <div class="p-4 sticky top-0">
        <SearchBar query={query()} setQuery={setQuery} />
      </div>
      <RecipeList recipes={getFilteredRecipes()} />
    </div>
  );
};
