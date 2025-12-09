import { useGetRecipes } from "@sander/storage/recipes";
import { Button } from "@sander/ui/button";
import { DataList } from "@sander/ui/data-list";
import { useState } from "react";
import { navigate } from "../router";

export const RecipeSearch = () => {
	const { data: recipes, isFetching } = useGetRecipes();
	const [query, setQuery] = useState("");

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				navigate(`/recipes/${formData.get("recipe")}`);
				return;
			}}
			className="grid grid-cols-[1fr_min-content] gap-4 items-center"
		>
			<DataList
				value={query}
				onChange={setQuery}
				label="Suche:"
				disabled={isFetching}
				name="recipe"
				items={recipes?.map((recipe) => recipe.title) ?? []}
			/>
			<Button type="submit">Suche</Button>
		</form>
	);
};
