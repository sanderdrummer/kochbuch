import { H1 } from "@kochbuch/ui/header";
import { getRecipe, updateRecipe } from "../../../db/recipe-service";
import { RecipeForm } from "../recipe-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function RecipeUpdateForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(Number(id));
  if (!recipe) {
    return "not found";
  }
  return (
    <>
      <H1>{recipe.title} editieren</H1>
      <RecipeForm
        initialValues={{
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
        }}
        action={async (data) => {
          "use server";
          await updateRecipe({
            id: Number(data.get("id")),
            title: data.get("title")?.toString() ?? "",
            description: data.get("description")?.toString() ?? "",
          });
          revalidatePath("/");
          redirect("/");
        }}
      />
    </>
  );
}
