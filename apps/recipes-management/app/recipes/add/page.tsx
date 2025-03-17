import { H1 } from "@kochbuch/ui/header";
import { RecipeForm } from "../recipe-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addFullRecipe } from "../../../db/recipe-service";

export default async function AddRecipe() {
  return (
    <>
      <H1>Neues Rezept</H1>
      <RecipeForm
        action={async (data) => {
          "use server";
          await addFullRecipe(data);
          revalidatePath("/");
          redirect("/");
        }}
      />
    </>
  );
}
