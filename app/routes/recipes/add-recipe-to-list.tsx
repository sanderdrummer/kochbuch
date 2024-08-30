import { PlusIcon } from "~/components/Icons";
import { LoadingButton } from "~/components/Inputs";
import { addItemsToList } from "~/resources/list";
import { type Recipe } from "~/resources/recipes";

export const AddRecipeToList = ({
  recipe,
  modifier = 1,
}: {
  recipe: Recipe;
  modifier?: number;
}) => {
  return (
    <LoadingButton
      message={`${recipe.title} zur Einkaufsliste hinzugefügt`}
      disabled={recipe === undefined}
      icon={<PlusIcon />}
      label={""}
      onClick={async () => {
        if (recipe) {
          await addItemsToList(
            recipe.ingredients.map((item) => {
              return {
                amount: item.amount ? `${Number(item.amount) * modifier}` : "",
                scale: item.scale,
                title: item.name,
              };
            })
          );
        }
      }}
    />
  );
};
