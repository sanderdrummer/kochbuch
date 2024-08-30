import { PlusIcon } from "~/components/Icons";
import { LoadingButton } from "~/components/Inputs";
import { addItemsToList } from "~/resources/list";
import { type Recipe } from "~/resources/recipes";

export const AddRecipeToList = (props: { recipe: Recipe }) => {
  return (
    <LoadingButton
      message={`${props.recipe?.title} zur Einkaufsliste hinzugefügt`}
      disabled={props.recipe === undefined}
      icon={<PlusIcon />}
      label={""}
      onClick={async () => {
        if (props.recipe) {
          await addItemsToList(
            props.recipe.ingredients.map((item) => {
              return {
                amount: item.amount,
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
