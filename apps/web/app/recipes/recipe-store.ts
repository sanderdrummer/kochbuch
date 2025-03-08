"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Dexie from "dexie";
import { Recipe } from "./recipes";

class RecipeDataBase extends Dexie {
  recipeStorage: Dexie.Table<{ key: string; value: string }, string>;

  constructor() {
    super("RecipeDataBase");
    this.version(1).stores({
      recipeStorage: "key",
    });
    this.recipeStorage = this.table("recipeStorage");
  }
}

const database = new RecipeDataBase();
const dexieStorage = {
  getItem: async (name: string) => {
    const record = await database.recipeStorage.get(name);
    return record ? JSON.parse(record.value) : undefined;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem: async (name: string, value: any) => {
    await database.recipeStorage.put({
      key: name,
      value: JSON.stringify(value),
    });
  },
  removeItem: async (name: string) => {
    await database.recipeStorage.delete(name);
  },
};

export type RecipeFilter = {
  query: string;
  onlyFavorites: boolean;
};
type RecipeStore = {
  recipes: Recipe[];
  filter: RecipeFilter;
  filteredRecipes: () => Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  favorites: Record<string, boolean>;
  toggleFavorite: (title: string) => void;
  setQuery: (query: string) => void;
  toggleOnlyFavorites: VoidFunction;
};

export const useRecipeStore = create(
  persist<RecipeStore>(
    (set, get) => ({
      recipes: [],
      filter: { query: "", onlyFavorites: false },
      setRecipes: (recipes: Recipe[]) => {
        set({ recipes });
      },
      filteredRecipes: () => {
        const { filter, recipes, favorites } = get();
        const favoritRecipes = filter.onlyFavorites
          ? recipes.filter((recipe) => favorites[recipe.title])
          : recipes;

        return filter.query
          ? favoritRecipes.filter((recipe) =>
              recipe.title
                .toLocaleLowerCase()
                .includes(filter.query.toLocaleLowerCase()),
            )
          : favoritRecipes;
      },
      favorites: {},
      toggleFavorite: (title: string) => {
        const { favorites } = get();
        favorites[title] = !favorites[title];
        set({ favorites });
      },
      toggleOnlyFavorites: () => {
        const { filter } = get();
        set({ filter: { ...filter, onlyFavorites: !filter.onlyFavorites } });
      },
      setQuery: (query: string) => {
        const { filter } = get();
        set({ filter: { ...filter, query } });
      },
    }),
    {
      name: "recipe-storage",
      storage: createJSONStorage(() => dexieStorage),
    },
  ),
);
