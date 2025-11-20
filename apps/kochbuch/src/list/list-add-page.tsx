import { Content, FlexContainer, HeaderNav } from "@sander/ui/layout";
import { RecipeSearch } from "../recipes/recipe-search.tsx";
import { useShoppingList } from "./use-list-items.tsx";
import { Button } from "@sander/ui/button";
import { H1 } from "@sander/ui/typography";
import useLocalStorageState from "@sander/storage/storage";
import { TextArea } from "@sander/ui/input";
import { navigate } from "../router.tsx";
import { AppFooter } from "../footer.tsx";

export const ShoppingListAddPage = () => {
    const { bulkAdd } = useShoppingList();
    const [item, setItem] = useLocalStorageState('add-items', '')
    return <>
        <FlexContainer>
            <HeaderNav>
                <RecipeSearch />
            </HeaderNav>
            <Content className="flex flex-col gap-6">
                <H1>Was willst du einkaufen?</H1>
                <TextArea autoFocus value={item} onChange={e => setItem(e.target.value)} className="grow" placeholder="Äpfel..." />
                <Button onClick={() => {
                    const items = item.split('\n').filter(Boolean).map(item => ({ title: item }))
                    bulkAdd(items)
                    navigate('list')
                    setItem('')
                }}>Auf die Liste</Button>
            </Content>
            <AppFooter />
        </FlexContainer>
    </>
}


