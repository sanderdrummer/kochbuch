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
    .where(
      query.length > 0 ? like(recipesTable.title, `%${query}%`) : undefined,
    );
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

const cleanIngredients = (recipeId: number) => {
  return db
    .delete(ingredientsTable)
    .where(eq(ingredientsTable.recipeId, recipeId));
};

const addIngredients = (ingredients: IngredientInsert[]) => {
  if (ingredients.length > 0) {
    return db.insert(ingredientsTable).values(ingredients);
  }
};

export const addRecipe = (recipe: RecipeInsert) => {
  return db.insert(recipesTable).values(recipe);
};

export const updateRecipe = async (recipe: RecipeInsert) => {
  if (recipe.id === undefined) {
    throw new Error("cannot identify recipe to update");
  } else {
    await db
      .update(recipesTable)
      .set(recipe)
      .where(eq(recipesTable.id, recipe.id));
  }
};

export type FullRecipe = {
  id: number;
  ingredients: IngredientInsert[];
} & RecipeInsert;
export const updateFullRecipe = async ({
  ingredients,
  ...recipe
}: FullRecipe) => {
  await updateRecipe(recipe);
  await cleanIngredients(recipe.id);
  await addIngredients(ingredients);
};
export const addFullRecipe = async ({ ingredients, ...recipe }: FullRecipe) => {
  await addRecipe(recipe);
  await addIngredients(ingredients);
};

export const getFullRecipe = async (
  id: number,
): Promise<FullRecipe | undefined> => {
  const recipe = await getRecipe(id);
  const ingredients = await getIngredients(id);
  return recipe
    ? {
      ...recipe,
      ingredients,
    }
    : undefined;
};

export const removeRecipe = (id: number) => {
  return db.delete(recipesTable).where(eq(recipesTable.id, id));
};

export const dropRecipes = async () => {
  await db.delete(recipesTable);
  await db.delete(ingredientsTable);
};
