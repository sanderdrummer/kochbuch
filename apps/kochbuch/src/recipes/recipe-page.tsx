import { useGetRecipes } from "@sander/storage/recipes";
import { Content, FooterNav, HeaderNav } from "@sander/ui/layout";
import { List, ListItem } from "@sander/ui/list";
import { H1 } from "@sander/ui/typography";
import { Link } from "../router";
import { RecipeSearch } from "./recipe-search.tsx";

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
			<FooterNav>test</FooterNav>
		</div>
	);
};
export const RecipeList = () => {
	const { data: recipes, isFetching } = useGetRecipes();

	return (
		<List>
			{isFetching && <p>...lade Rezepte</p>}
			{recipes?.map((recipe) => (
				<ListItem key={recipe.title}>
					<Link to={`/recipes/${recipe.title}`}>{recipe.title}</Link>
				</ListItem>
			))}
		</List>
	);
};
