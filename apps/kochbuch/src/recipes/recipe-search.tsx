import { useGetRecipes } from "@sander/storage/recipes";
import { Button } from "@sander/ui/button";
import { DataList } from "@sander/ui/data-list";
import { navigate } from "../router";

export const RecipeSearch = () => {
	const { data: recipes, isFetching } = useGetRecipes();

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				navigate(`/recipes/${formData.get("recipe")}`);
				return;
			}}
			className="flex gap-4 items-center"
		>
			<DataList
				label="Suche:"
				disabled={isFetching}
				name="recipe"
				items={recipes?.map((recipe) => recipe.title) ?? []}
			/>
			<Button type="submit">Suche</Button>
		</form>
	);
};
