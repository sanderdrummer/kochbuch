import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  InputBase,
  IconButton,
  Divider,
  Drawer,
  Chip,
  Fade,
} from "@material-ui/core";
import { Clear, ArrowDownward, ArrowUpward } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "sticky",
      top: theme.spacing(1),
      zIndex: 1,
    },
    scrollWrapper: {
      maxHeight: "60vh",
      overflow: "auto",
    },
    inputWrapper: {
      background: theme.palette.background.paper,
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

export const RecipeFilter = ({
  query,
  setQuery,
  tags,
  filterTags,
  setFilterTags,
}: FilterProps) => {
  const classes = useStyles();
  const reset = () => {
    setQuery("");
  };
  const [open, setOpen] = useState(false);
  return (
    <Paper className={classes.root}>
      <div className={classes.inputWrapper}>
        <InputBase
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={classes.input}
          placeholder="was kochen ?"
        />
        <IconButton
          type="button"
          className={classes.iconButton}
          aria-label="Suche löschen"
          onClick={reset}
        >
          <Clear />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          type="button"
          color="primary"
          className={classes.iconButton}
          onClick={() => setOpen((open) => !open)}
        >
          {open ? <ArrowUpward /> : <ArrowDownward />}
        </IconButton>
      </div>
      <Fade in={open} mountOnEnter unmountOnExit>
        <div className={classes.scrollWrapper}>
          <RecipeTagFilter
            tags={tags}
            filterTags={filterTags}
            setFilterTags={setFilterTags}
          >
            <IconButton
              type="button"
              aria-label="tags zurücksetzen"
              onClick={() => {
                setOpen(false);
                setFilterTags([]);
              }}
            >
              <Clear />
            </IconButton>
          </RecipeTagFilter>
        </div>
      </Fade>
    </Paper>
  );
};

const useTagFilterStyles = makeStyles((theme) => ({
  grid: {
    display: "inline-flex",
    alignContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    flexWrap: "wrap",
  },
}));

export const RecipeTagFilter = ({
  filterTags,
  setFilterTags,
  tags,
  children,
}: Pick<FilterProps, "setFilterTags" | "filterTags" | "tags"> & {
  children?: React.ReactNode;
}) => {
  const classes = useTagFilterStyles();
  return (
    <div className={classes.grid}>
      {tags.sort().map((tag) => {
        const isActive = filterTags.includes(tag);
        return (
          <Chip
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
