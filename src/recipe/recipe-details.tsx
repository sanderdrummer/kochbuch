import React from "react";
import { useParams } from "react-router-dom";
import { TextButton } from "../common/inputs";
import { Link } from "../common/link";
import { Pane } from "../common/panes";
import { BASE_PATH } from "../routes-config";
import { Recipe, useRecipes } from "./recipe-resource";

const getAmount = (amount: string, modifier = 1) => {
  if (modifier === 1) return amount;

  const [digit = 0] = amount.match(/[0-9.]+/g) ?? [];
  const [scale = ""] = amount.match(/[a-zA-Z]+/g) ?? [];
  return `${Number(digit) * modifier}${scale}`;
};

export const RecipeDetails = () => {
  const { title } = useParams();
  const { data: recipes } = useRecipes();
  const [recipe] = recipes.filter((recipe) => recipe.title === title);
  return <RecipeDetailsSection recipe={recipe} />;
};

export const RecipeDetailsSection: React.FC<{
  recipe: Recipe;
  action?: React.ReactNode;
}> = ({ recipe, action }) => {
  const [modifier, setModifier] = React.useState(1);

  return (
    <>
      <Pane
        css={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          gridGap: "1rem",
        }}
      >
        <Link to={`/${BASE_PATH}/`}>&larr;</Link> {recipe.title}
      </Pane>
      <div css={{margin: '1rem'}}>

      <div
        css={{
          display: "grid",
        gridTemplateColumns: '1fr min-content'
        }}
      >
        <h2>Zutaten</h2>
        <label
          css={{
            display: "grid",
            alignItems: "center",
            gap: "0.5rem",
            gridAutoFlow: "column",
          }}
        >
          Anzahl:
          <select
            css={{
              border: "none",
              background: "transparent",
              color: "var(--text)",
              fontSize: "1rem",
            }}
            value={modifier}
            onChange={(e) => setModifier(Number(e.target.value))}
          >
            {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ul>
        {recipe?.ingredients.map((ingredient) => (
          <li css={{ marginBottom: ".5rem" }} key={ingredient.name}>
            {getAmount(ingredient.amount, modifier)} {ingredient.name}
          </li>
        ))}
      </ul>
      <h2>Zubereitung</h2>
      <div css={{ whiteSpace: "pre-wrap" }}>{recipe?.description}</div>
      <TextButton
        css={{ margin: "4rem 0" }}
        onClick={async () => {
          await navigator.share({
            title: recipe.title,
            text: recipe.description,
          });
        }}
      >
        teilen{" "}
      </TextButton>
      </div>
    </>
  );
};
