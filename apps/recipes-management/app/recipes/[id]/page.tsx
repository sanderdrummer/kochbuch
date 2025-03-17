import { H1 } from "@kochbuch/ui/header";
import { getFullRecipe, updateFullRecipe } from "../../../db/recipe-service";
import { RecipeForm } from "../recipe-form";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export default async function RecipeUpdateForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getFullRecipe(Number(id));
  if (!recipe) {
    return notFound();
  }
  return (
    <>
      <H1>{recipe.title} editieren</H1>
      <RecipeForm
        initialValues={recipe}
        action={async (data) => {
          "use server";
          await updateFullRecipe(data);
          revalidatePath("/");
          redirect("/");
        }}
      />
    </>
  );
}
