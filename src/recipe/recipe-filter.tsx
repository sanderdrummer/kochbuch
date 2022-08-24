import React, { useEffect, useState } from "react";
import { TextButton, TextInput } from "../common/inputs";
import { Recipe, useRecipes } from "./recipe-resource";

export const getTags = (recipes: Recipe[]): string[] => {
  const tags = recipes.reduce((tags, recipe) => {
    return tags.concat(recipe.tags);
  }, [] as string[]);
  return Array.from(new Set(tags));
};

const filterByQuery = (recipes: Recipe[], query = "") => {
  if (!query) {
    return recipes || [];
  }
  const lowerCaseQuery = query.toLowerCase();
  return recipes.filter((recipe) => {
    return recipe.title.toLowerCase().includes(lowerCaseQuery);
  });
};

const filterByTags = (recipes: Recipe[], tags: string[]) => {
  if (!tags.length) {
    return recipes;
  }
  return recipes.filter((recipe) =>
    recipe.tags.some((tag) => tags.includes(tag))
  );
};

const filterRecipes = (
  recipes: Recipe[] = [],
  {
    query,
    tags,
  }: {
    query: string;
    tags: string[];
  }
): Recipe[] => {
  const filteredByQuery = filterByQuery(recipes, query);
  return filterByTags(filteredByQuery, tags);
};

export const useFilteredRecipes = () => {
  const { data: recipes, status, refetch } = useRecipes();
  const [filtered, setFiltered] = useState<Recipe[]>(recipes ?? []);
  const [query, setQuery] = useState("");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const tags = getTags(recipes);

  useEffect(() => {
    setFiltered(filterRecipes(recipes, { query, tags: filterTags }));
  }, [query, recipes, filterTags]);

  return {
    recipes: filtered,
    refetch,
    status,
    query,
    setQuery,
    tags,
    filterTags,
    setFilterTags,
  };
};

export type FilterProps = Omit<
  ReturnType<typeof useFilteredRecipes>,
  "status" | "recipes" | "refetch"
>;

export const RecipeFilter = ({ query, setQuery }: FilterProps) => {
  const reset = () => {
    setQuery("");
  };
  return (
    <div
      css={{
        display: "grid",
        padding: "1rem",
        gridGap: "1rem",
        gridTemplateColumns: "1fr min-content",
      }}
    >
      <TextInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Was Kochen?"
      />
      <TextButton onClick={reset}>Neue Suche</TextButton>
    </div>
  );
};

export const RecipeTagFilter = ({
  filterTags,
  setFilterTags,
  tags,
  children,
}: Pick<FilterProps, "setFilterTags" | "filterTags" | "tags"> & {
  children?: React.ReactNode;
}) => {
  return (
    <div>
      {tags.sort().map((tag) => {
        const isActive = filterTags.includes(tag);
        return (
          <div
            key={tag}
            color="primary"
            variant={isActive ? "default" : "outlined"}
            onClick={() => {
              if (isActive) {
                setFilterTags((tags) =>
                  tags.filter((activeTag) => activeTag !== tag)
                );
              } else {
                setFilterTags((tags) => [tag, ...tags]);
              }
            }}
            label={tag}
          />
        );
      })}
      {children}
    </div>
  );
};
