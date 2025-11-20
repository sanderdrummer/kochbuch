import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecipeDetails } from "./recipes/recipe-details-page.tsx";
import { RecipePage } from "./recipes/recipe-page.tsx";
import { Route, RouterView } from "./router.tsx";
import {ShoppingListProvider} from "./list/use-list-items.tsx";
import {ShoppingListPage} from "./list/list-page.tsx";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
            <ShoppingListProvider>
			<RouterView notFoundComponent={<RecipePage />}>
				<Route path="/recipes/:id">
					<RecipeDetails />
				</Route>
                <Route path="/list">
                    <ShoppingListPage />
                </Route>
			</RouterView>
            </ShoppingListProvider>
		</QueryClientProvider>
	);
}

export default App;
