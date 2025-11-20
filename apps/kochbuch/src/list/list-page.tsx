import { Content, FlexContainer, FooterNav, HeaderNav } from "@sander/ui/layout";
import { RecipeSearch } from "../recipes/recipe-search.tsx";
import { useShoppingList } from "./use-list-items.tsx";
import { Button } from "@sander/ui/button";
import { List, ListItem } from "@sander/ui/list";
import { H1, H2 } from "@sander/ui/typography";
import { Link } from "../router.tsx";
import { AppFooter } from "../footer.tsx";

export const ShoppingListPage = () => {
    const { state, moveToDone, moveToTodo, clearDone } = useShoppingList();
    return <>
        <FlexContainer>
            <HeaderNav>
                <RecipeSearch />
            </HeaderNav>
            <Content className="grid gap-6">
                <H1>Einkaufsliste</H1>
                <Link className="text-2xl text-primary-950" to="list/add">Was fehlt noch?</Link>
                <H2>Noch in den Korb</H2>
                <List>
                    {state.todo.map(item => (

                        <ListItem key={item.title}><button onClick={() => {
                            moveToDone(item)
                        }} type="button">

                            {item.title}
                        </button>
                        </ListItem>
                    ))}
                </List>
                <H2 className="mt-8">Schon dabei</H2>
                <List>
                    {state.done.map(item => (
                        <ListItem key={item.title}><button onClick={() => {
                            moveToTodo(item)
                        }} type="button">

                            {item.title}
                        </button>
                        </ListItem>
                    ))}
                </List>
            </Content>
            <Button onClick={clearDone}>Neue Liste</Button>

            <AppFooter />
        </FlexContainer>
    </>
}


