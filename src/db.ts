import Dexie from "dexie";

export interface ListItem {
  id?: string;
  title: string;
  inBasket: boolean;
}

export interface Recipe {
  id?: string;
  title: string;
  tags: string[];
  ingredients: string[];
  description: string;
}

export class ListDb extends Dexie {
  listItems: Dexie.Table<ListItem, string>;
  recipes: Dexie.Table<Recipe, string>;
  constructor() {
    super("ListDB2");
    this.version(1).stores({
      listItems: "++id,title,inBasket",
      recipes: "++id,title"
    });
    this.listItems = this.table("listItems");
    this.recipes = this.table("recipes");
  }
}

const db = new ListDb();

export const getRecipes = () => {
  return db.recipes.toArray();
};

export const addRecipe = (recipe: Recipe) => {
  return db.recipes.add(recipe);
};
