import { useGetRecipes } from "@sander/storage/recipes";
import { Content, HeaderNav } from "@sander/ui/layout";
import { List, ListItem } from "@sander/ui/list";
import { H1 } from "@sander/ui/typography";
import { Link, navigate } from "../router";
import { RecipeSearch } from "./recipe-search.tsx";
import { Button } from "@sander/ui/button";
import { PlusIcon } from "@sander/ui/icons";
import { useShoppingList } from "../list/use-list-items.tsx";
import { AppFooter } from "../footer.tsx";

export const RecipePage = () => {
	return (
		<div className="container m-auto">
			<HeaderNav>
				<RecipeSearch />
			</HeaderNav>
			<Content>
				<H1>Rezepte</H1>
				<RecipeList />
			</Content>
			<AppFooter />
		</div>
	);
};
export const RecipeList = () => {
	const { data: recipes, isFetching } = useGetRecipes();
	const { bulkAdd } = useShoppingList()

	return (
		<List>
			{isFetching && <p>...lade Rezepte</p>}
			{recipes?.map((recipe) => (
				<ListItem className="flex justify-between" key={recipe.title}>
					<Link to={`/recipes/${recipe.title}`}>{recipe.title}</Link> <Button className="" aria-label={`Zutaten von ${recipe.title} zur Einkaufsliste hinzufügen`} onClick={() => {
						bulkAdd(recipe.ingredients.map(ingredient => ({ title: `${ingredient.amount}${ingredient.scale} ${ingredient.name}` })))
						navigate('list')
					}}><PlusIcon className="w-6 h-6" /></Button>
				</ListItem>
			))}
		</List>
	);
};
