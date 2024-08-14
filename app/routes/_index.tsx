import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Navbar } from "~/components/Navbar";
import { getRecipes } from "~/resources/recipes";

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

export default function Index() {
  const recipes = useLoaderData<typeof clientLoader>();
  return (
    <main className="font-sans">
      <Navbar />
    </main>
  );
}
