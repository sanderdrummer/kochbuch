import { Button } from "@sander/ui/button";
import { Content, FlexContainer, HeaderNav } from "@sander/ui/layout";
import { List, ListItem } from "@sander/ui/list";
import { H1, H2 } from "@sander/ui/typography";
import { AppFooter } from "../footer.tsx";
import { RecipeSearch } from "../recipes/recipe-search.tsx";
import { Link } from "../router.tsx";
import { useShoppingList } from "./use-list-items.tsx";

export const ShoppingListPage = () => {
	const { state, moveToDone, moveToTodo, clearDone } = useShoppingList();
	return (
		<FlexContainer>
			<HeaderNav>
				<RecipeSearch />
			</HeaderNav>
			<Content className="grid gap-6">
				<div>
					<H1>Einkaufsliste</H1>
					<Link className="text-2xl text-primary-950" to="list/add">
						Was fehlt noch?
					</Link>
				</div>
				{state.todo.length > 0 && (
					<div>
						<H2>Noch in den Korb</H2>
						<List>
							{state.todo.map((item) => (
								// biome-ignore lint/correctness/useJsxKeyInIterable: we always want to rerender the list fresh
								<ListItem
									onClick={() => {
										moveToDone(item);
									}}
								>
									{item.title}
								</ListItem>
							))}
						</List>
					</div>
				)}
				{state.done.length > 0 && (
					<div>
						<H2 className="mt-8">Schon dabei</H2>
						<List>
							{state.done.map((item) => (
								// biome-ignore lint/correctness/useJsxKeyInIterable: we always want to rerender the list fresh
								<ListItem
									onClick={() => {
										moveToTodo(item);
									}}
								>
									{item.title}
								</ListItem>
							))}
						</List>
					</div>
				)}
			</Content>
			<div className="p-4">
				<Button onClick={clearDone}>Neue Liste</Button>
			</div>

			<AppFooter />
		</FlexContainer>
	);
};
