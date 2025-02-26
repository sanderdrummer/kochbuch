"use client";

import { type ReactNode } from "react";
import { Recipe } from "./recipes";
import Link from "next/link";
import { AddRecipeToList } from "./add-recipe-to-list";
import { FavoriteToggleButton } from "./favorite-button";

type RecipeListProperties = {
  recipes: Recipe[];
  emptyState: ReactNode;
};
export const RecipeList = ({ recipes, emptyState }: RecipeListProperties) => {
  return (
    <div className="mx-auto container">
      <ul className="divide-y list-none divide-stone-800">
        {recipes?.length === 0 && (
          <div className="p-3 font-extralight text-lg">{emptyState}</div>
        )}
        {recipes.map((recipe) => (
          <li
            key={recipe.title}
            className="font-extralight text-lg grid grid-flow-col justify-between"
          >
            <Link className="p-3 no-underline " href={`/recipes/${recipe.id}`}>
              {recipe.title}
            </Link>
            <div className="flex gap-8">
              <FavoriteToggleButton title={recipe.title} />
              <AddRecipeToList recipe={recipe} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
