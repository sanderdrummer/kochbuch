import { getRecipes } from "../db/recipe-service";
import { ItemList } from "@kochbuch/ui/list";
import { SearchForm } from "./search";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query ?? "";
  const items = await getRecipes(query);
  return (
    <div>
      <SearchForm defaultValue={query} />
      <ItemList
        path="/recipes/"
        actions={() => undefined}
        items={items}
        emptyState="Nichts gefunden"
      />
    </div>
  );
}
