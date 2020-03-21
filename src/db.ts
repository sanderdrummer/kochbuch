import Dexie from "dexie";

export interface ListItem {
  title: string;
  inBasket: boolean;
}

export interface Recipe {
  title: string;
  tags: string;
  ingredients: string[];
  description: string;
}

export const DEFAULT_PAGE_SIZE = 50;

export class ListDb extends Dexie {
  listItems: Dexie.Table<ListItem, string>;
  recipes: Dexie.Table<Recipe, string>;
  constructor() {
    super("ListDB6");
    this.version(1).stores({
      listItems: "title",
      recipes: "title,tags"
    });
    this.listItems = this.table("listItems");
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

export const getList = () => {
  return db.listItems.toArray();
};

export const addListItem = (listItem: ListItem) => {
  return db.listItems.add(listItem);
};

export const addListItems = (listItems: string[]) => {
  return db.listItems.bulkPut(
    listItems.map(title => ({
      title,
      inBasket: false
    }))
  );
};

export const updateListItem = (listItem: ListItem) => {
  return db.listItems.put(listItem);
};

export const clearList = () => {
  return db.listItems.clear();
};
