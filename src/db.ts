import Dexie from "dexie";

export interface ListItem {
  title: string;
}

export interface Recipe {
  title: string;
  tags: string;
  ingredients: string;
  description: string;
}

export const DEFAULT_PAGE_SIZE = 50;

export class ListDb extends Dexie {
  listItems: Dexie.Table<ListItem, string>;
  basketItems: Dexie.Table<ListItem, string>;
  recipes: Dexie.Table<Recipe, string>;
  constructor() {
    super("recipes-db-1");
    this.version(1).stores({
      basketItems: "title",
      listItems: "title",
      recipes: "title,tags"
    });
    this.listItems = this.table("listItems");
    this.basketItems = this.table("basketItems");
    this.recipes = this.table("recipes");
  }
}

const db = new ListDb();

export const getRecipeByName = async (title: string) => {
  const [recipe] = await db.recipes
    .where("title")
    .equals(title)
    .toArray();

  return recipe;
};

export const getRecipes = () => {
  return db.recipes.toArray();
};

export const getPagedRecipes = (offset = 0) => {
  return db.recipes
    .offset(offset)
    .limit(DEFAULT_PAGE_SIZE)
    .toArray();
};

export const queryPagedRecipes = (query = "") => {
  return db.recipes
    .where("title")
    .startsWithIgnoreCase(query)
    .or("tags")
    .startsWithIgnoreCase(query)
    .limit(200)
    .toArray();
};

export const getRecipesCount = () => {
  return db.recipes.count();
};
export const addRecipe = (recipe: Recipe) => {
  return db.recipes.add(recipe);
};
export const updateRecipe = (recipe: Recipe) => {
  return db.recipes.put(recipe);
};
export const deleteRecipe = (title: string) => {
  return db.recipes.delete(title);
};
export const bulkAddRecipes = (recipes: Recipe[]) => {
  return db.recipes.bulkPut(recipes);
};
export const getRecipesForExport = () => {
  return db.recipes.toArray();
};

export const getList = async () => {
  const basket = await db.basketItems.toArray();
  const list = await db.listItems.toArray();
  return { basket, list };
};

export const addListItem = (listItem: ListItem) => {
  return db.listItems.add(listItem);
};

export const checkListItem = async (listItem: ListItem) => {
  db.basketItems.add(listItem);
  db.listItems.delete(listItem.title);
};

export const unCheckListItem = async (listItem: ListItem) => {
  db.basketItems.delete(listItem.title);
  db.listItems.add(listItem);
};

export const addListItems = (listItems: string) => {
  return db.listItems.bulkPut(
    listItems.split("\n").map(title => ({
      title,
      inBasket: false
    }))
  );
};

export const clearList = () => {
  return db.basketItems.clear();
};
