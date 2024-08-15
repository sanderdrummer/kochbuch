import {
  type ClientLoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "@remix-run/react";
import { type ReactNode, useState } from "react";
import { H1 } from "~/components/Header";
import { HeightWrapper } from "~/components/Layout";
import { getRecipe, Recipe } from "~/resources/recipes";

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const title = params.title;
  if (!title) {
    return redirect("/");
  }
  const recipe = getRecipe(title);
  return recipe;
}

export default function RecipeDetailsView() {
  const recipe = useLoaderData<typeof clientLoader>();
  return <RecipeDetails recipe={recipe}>hui</RecipeDetails>;
}

export const getAmount = (amount: string, modifier = 1) => {
  if (Number(amount) === 0) return "";
  if (modifier === 1) return amount;

  return `${Number(amount) * modifier}`;
};

export const RecipeDetails = (props: {
  children: ReactNode;
  recipe?: Recipe;
}) => {
  const [modifier, setModifier] = useState(1);
  const scales = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <HeightWrapper className="mx-auto container whitespace-pre-wrap px-5">
      <H1>{props.recipe?.title}</H1>
      <div className="mb-8 sm:grid-flow-col grid justify-between">
        <label className="mb-8 sm:mtb0 sm:order-2">
          <span className="mr-4 text-stone-400 font-normal">Menge:</span>
          <select
            className="rounded bg-stone-800 text-stone-400 border-stone-800 focus:outline-none focus:border-stone-400 focus:ring-stone-400 focus:ring-1"
            value={modifier}
            onChange={(e) => setModifier(Number(e.currentTarget.value))}
          >
            {scales.map((scale) => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </select>
        </label>
        <ul className="sm:order-1">
          {props.recipe?.ingredients.map((ingredient) => (
            <li key={ingredient.name}>
              <span className="text-stone-400">
                {getAmount(ingredient.amount, modifier)}
                {ingredient.scale}
              </span>
              <span className="font-normal"> {ingredient.name} </span>
            </li>
          ))}
        </ul>
      </div>
      <p>{props.recipe?.description}</p>

      <div className="mt-12 mb-8">{props.children}</div>
    </HeightWrapper>
  );
};
