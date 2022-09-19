import React from "react";

import { usePlans } from "../plan/plan";
import { RecipeFilter, useFilteredRecipes } from "./recipe-filter";
import { TextButton } from "../common/inputs";
import {Link} from "../common/link";

export const ListLoader: React.FC = () => {
  return <></>;
};

export const RecipeListItem = ({
  title,
  handleAction,
}: {
  title: string;
  handleAction: VoidFunction;
}) => {
  return (
    <li
      css={{
        padding: "1rem",
        display: "grid",
        gridTemplateColumns: "1fr min-content",
        alignItems: "center",
        borderBottom: "solid 1px var(--border)",
        transition: "background 0.5s",
        "&:hover": {
          background: "var(--componentBackgroundDark)",
        },
      }}
    >
      <Link to={title}>
      {title}
      </Link>
      <TextButton
        css={{ fontSize: "1.5rem", fontWeight: "lighter" }}
        onClick={handleAction}
      >
        +
      </TextButton>
    </li>
  );
};

export const RecipeList = () => {
  const { addRecipe } = usePlans();
  const { recipes, status, refetch, ...filterProps } = useFilteredRecipes();

  return (
    <>
      <RecipeFilter {...filterProps} />
      <ul css={{ padding: 0,marginTop:0, marginBottom: "4rem" }}>
        {recipes.map((recipe) => (
          <RecipeListItem
            key={recipe.title}
            title={recipe.title}
            handleAction={() => {
              addRecipe(recipe);
            }}
          />
        ))}
      </ul>
      {status === "error" && (
        <>
          rezepte konnten nicht geladen werden
          <button onClick={() => refetch()}>nochmal versuchen</button>
        </>
      )}
    </>
  );
};
