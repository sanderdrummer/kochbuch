import React from "react";

import { Recipe } from "./recipe-resource";

const getAmount = (amount: string, modifier = 1) => {
  if (modifier === 1) return amount;

  const [digit = 0] = amount.match(/[0-9.]+/g) ?? [];
  const [scale = ""] = amount.match(/[a-zA-Z]+/g) ?? [];
  return `${Number(digit) * modifier}${scale}`;
};

export const RecipeDetails: React.FC<{
  recipe: Recipe;
  action?: React.ReactNode;
}> = ({ recipe, action }) => {
  const [unfold, setUnfold] = React.useState(false);
  const [modifier, setModifier] = React.useState(1);

  return (
    <>
      {!unfold && (
        <>
          <li
            selected={unfold}
            button
            onClick={() => setUnfold((unfold) => !unfold)}
            key={recipe.title}
          ></li>
        </>
      )}
      {unfold && (
        <div mt={3}>
          <div>
            <div
              title={
                <div onClick={() => setUnfold(false)}>{recipe?.title}</div>
              }
              action={action}
            ></div>
          </div>
          <>
            <div mt={3}>
              <div>
                <div
                  subheader="Zutaten"
                  action={
                    <div
                      select
                      value={modifier}
                      SelectProps={{ native: true }}
                      onChange={(e) => setModifier(Number(e.target.value))}
                    >
                      {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </div>
                  }
                ></div>

                <div>
                  {recipe?.ingredients.map((ingredient) => (
                    <div key={ingredient.name}>
                      {getAmount(ingredient.amount, modifier)} {ingredient.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div mb={3} mt={3}>
              <div>
                <div subheader="Zubereitung"></div>
                <div>
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {recipe?.description}
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={async () => {
                await navigator.share({
                  title: recipe.title,
                  text: recipe.description,
                });
              }}
            >
              teilen{" "}
            </div>
          </>
        </div>
      )}
    </>
  );
};
