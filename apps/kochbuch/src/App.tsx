import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecipeDetails } from "./recipes/recipe-details-page.tsx";
import { RecipePage } from "./recipes/recipe-page.tsx";
import { Route, RouterView } from "./router.tsx";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterView notFoundComponent={<RecipePage />}>
				<Route path="/recipes/:id">
					<RecipeDetails />
				</Route>
			</RouterView>
		</QueryClientProvider>
	);
}

export default App;
