import {Content, FlexContainer, FooterNav, HeaderNav} from "@sander/ui/layout";
import {RecipeSearch} from "../recipes/recipe-search.tsx";
import {useShoppingList} from "./use-list-items.tsx";
import {Button} from "@sander/ui/button";

export const ShoppingListPage = () => {
    const {state, bulkAdd, moveToDone, moveToTodo, clearDone} = useShoppingList();
    return <>
        <FlexContainer>
            <HeaderNav>
                <RecipeSearch />
            </HeaderNav>
            <Content>
                <Button onClick={() => {
                    bulkAdd([{
                        amount: "1",
                        title: "test"
                    }])
                }}>test</Button>
                {JSON.stringify(state)}
              hi there
            </Content>

            <FooterNav>
               hi there
            </FooterNav>
        </FlexContainer>
    </>
}