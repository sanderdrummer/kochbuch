import { type Recipe, useGetRecipes } from "@sander/storage/recipes";
import { SearchInput } from "@sander/ui/data-list";
import { Content, HeaderNav } from "@sander/ui/layout";
import { List, ListItem } from "@sander/ui/list";
import { H1 } from "@sander/ui/typography";
import { useState } from "react";
import { AppFooter } from "../footer.tsx";
import { Link } from "../router";
import { AddRecipeToListButton } from "./add-recipe-to-list-button.tsx";

const getFilteredRecipes = (recipes: Recipe[], query: string) => {
	if (!query) {
		return recipes;
	}

	const queryLowerCase = query.toLowerCase();
	return recipes.filter((recipe) => {
		return recipe.title.trim().toLowerCase().includes(queryLowerCase);
	});
};
export const RecipePage = () => {
	const [query, setQuery] = useState("");
	const { data: recipes, isFetching } = useGetRecipes();
	const filteredRecipes = getFilteredRecipes(recipes ?? [], query);
	return (
		<div className="container m-auto">
			<HeaderNav>
				<SearchInput label="Suche Rezepte" value={query} onChange={setQuery} />
			</HeaderNav>
			<Content>
				<H1>Rezepte</H1>
				{isFetching && <p>...lade Rezepte</p>}
				{recipes && <RecipeList recipes={filteredRecipes} />}
			</Content>
			<AppFooter />
		</div>
	);
};
export const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
	return (
		<List>
			{recipes?.map((recipe) => (
				<ListItem
					className="grid grid-cols-[1fr_min-content] gap-2"
					key={recipe.title}
				>
					<Link to={`/recipes/${recipe.title}`}>{recipe.title}</Link>{" "}
					<AddRecipeToListButton
						title={recipe.title}
						ingredients={recipe.ingredients}
					/>
				</ListItem>
			))}
		</List>
	);
};
