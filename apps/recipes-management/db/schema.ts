import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipesTable = sqliteTable("recipes_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
});

export const ingredientsTable = sqliteTable("ingredients_table", {
  id: int().primaryKey({ autoIncrement: true }),
  recipeId: int(),
  amount: int().default(0),
  scale: text().default(""),
  name: text().notNull(),
});
