import { eq, like } from "drizzle-orm";
import { db } from ".";
import { ingredientsTable, recipesTable } from "./schema";

export type RecipeInsert = typeof recipesTable.$inferInsert;
export type IngredientInsert = typeof ingredientsTable.$inferInsert;
export type RecipeWithIngredients = {
  id: number;
  ingredients: Pick<IngredientInsert, "id" | "name" | "amount" | "scale">[];
} & Omit<RecipeInsert, "id">;

export const getRecipes = async (query: string) => {
  const items = await db
    .select()
    .from(recipesTable)
    .where(query.length ? like(recipesTable.title, `%${query}%`) : undefined);
  return items;
};

export const getRecipe = async (id: number) => {
  const [item] = await db
    .select()
    .from(recipesTable)
    .where(eq(recipesTable.id, id));
  return item;
};

const getIngredients = (id: number) => {
  return db
    .select({
      id: ingredientsTable.id,
      name: ingredientsTable.name,
      amount: ingredientsTable.amount,
      scale: ingredientsTable.scale,
    })
    .from(ingredientsTable)
    .where(eq(ingredientsTable.recipeId, id));
};

export const getRecipeWithIngredients = async (id: number) => {
  const recipe = await getRecipe(id);
  const ingredients = await getIngredients(id);
  return { ...recipe, ingredients };
};

const addIngredients = (ingredients: IngredientInsert[]) => {
  const batchInputs = ingredients.map((ingredient) =>
    db.insert(ingredientsTable).values(ingredient),
  );
  const test = db.insert(ingredientsTable).values(ingredients);

  db.batch([test]);
};

export const addRecipe = async (recipe: RecipeInsert) => {
  return await db.insert(recipesTable).values(recipe);
};

export const updateRecipe = async (recipe: RecipeInsert) => {
  if (recipe.id) {
    await db
      .update(recipesTable)
      .set(recipe)
      .where(eq(recipesTable.id, recipe.id));
  } else {
    throw new Error("cannot identify recipe to update");
  }
};

export const removeRecipe = async (id: number) => {
  await db.delete(recipesTable).where(eq(recipesTable.id, id));
};

export const dropRecipes = async () => {
  await db.delete(recipesTable);
};
