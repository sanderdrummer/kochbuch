import { Link } from "@remix-run/react";
import { type ReactNode } from "react";
import { type RecipeListItem } from "~/resources/recipes";
import { FavoriteToggleButton } from "./favorite-button";
import { AddRecipeToList } from "./add-recipe-to-list";

type RecipeListProps = {
  recipes: RecipeListItem[];
  emptyState: ReactNode;
};
export const RecipeList = ({ recipes, emptyState }: RecipeListProps) => {
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
            <Link className="p-3 no-underline " to={`/recipes/${recipe.title}`}>
              {recipe.title}
            </Link>
            <div className="flex gap-8">
              <FavoriteToggleButton
                title={recipe.title}
                isFavorite={recipe.isFavorite}
              />
              <AddRecipeToList recipe={recipe} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
