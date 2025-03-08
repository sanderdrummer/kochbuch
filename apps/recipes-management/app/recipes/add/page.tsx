import { H1 } from "@kochbuch/ui/header";
import { RecipeForm } from "../recipe-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addRecipe } from "../../../db/recipe-service";

export default async function AddRecipe() {
  return (
    <>
      <H1>Neues Rezept</H1>
      <RecipeForm
        action={async (data) => {
          "use server";
          await addRecipe({
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
