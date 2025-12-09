import type { Ingredient } from "@sander/storage/recipes";
import { Button } from "@sander/ui/button";
import { PlusIcon } from "@sander/ui/icons";
import { useShoppingList } from "../list/use-list-items.tsx";
import { navigate } from "../router.tsx";

export const AddRecipeToListButton = ({
	title,
	ingredients,
}: {
	title: string;
	ingredients: Ingredient[];
}) => {
	const { bulkAdd } = useShoppingList();
	return (
		<Button
			aria-label={`Zutaten von ${title} zur Einkaufsliste hinzufügen`}
			onClick={() => {
				bulkAdd(
					ingredients.map((ingredient) => ({
						title: `${ingredient.amount}${ingredient.scale} ${ingredient.name}`,
					})),
				);
				navigate("list");
			}}
		>
			<PlusIcon className="w-6 h-6" />
		</Button>
	);
};
