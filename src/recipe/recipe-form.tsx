import React from "react";

// @ts-ignore
import { useParams, useNavigate } from "react-router-dom";
import { Add, Edit } from "@material-ui/icons";
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CardActions
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { BottomRightFab } from "../common";
import { Recipe, addRecipe, updateRecipe, addListItems } from "../db";
import { useRecipeByTitle, useRecipes } from "./recipe-hooks";

export const RecipeForm: React.FC<{
  onComplete: (recipe: Recipe) => void;
  recipe?: Recipe;
}> = ({ onComplete, recipe }) => {
  const [status, setStatus] = React.useState<
    "" | "pending" | "error" | "success"
  >("");
  return (
    <Card>
      <CardHeader title="Neues Rezept" />
      <CardContent>
        <form
          autoComplete="off"
          onSubmit={async e => {
            const form = e.currentTarget;
            e.preventDefault();
            const nextRecipe: Recipe = {
              title: form.titleName.value,
              tags: form.tags.value || "",
              ingredients: form.ingredients.value.split("\n"),
              description: form.description.value
            };
            try {
              setStatus("pending");
              if (recipe) {
                await updateRecipe(nextRecipe);
              } else {
                await addRecipe(nextRecipe);
              }
              onComplete(nextRecipe);
              form.reset();
              setStatus("success");
            } catch (e) {
              console.log(e);
              setStatus("error");
            }
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            defaultValue={recipe?.title}
            required
            label="Rezept Titel"
            name="titleName"
          />
          <TextField
            margin="normal"
            fullWidth
            defaultValue={recipe?.tags}
            label="Tags"
            name="tags"
          />
          <TextField
            margin="normal"
            multiline
            fullWidth
            required
            defaultValue={recipe?.ingredients}
            label="Zutaten"
            name="ingredients"
          />
          <TextField
            margin="normal"
            multiline
            fullWidth
            required
            defaultValue={recipe?.description}
            label="Zubereitung"
            name="description"
          />
          <Box mt={2}>
            <Button
              disabled={status === "pending"}
              color="primary"
              type="submit"
            >
              {recipe
                ? `änderung an ${recipe.title} speichern`
                : "neues Rezept speichern"}
            </Button>
          </Box>
          <Box bgcolor="primary" mt="2">
            {status === "pending" && "erstelle Rezept"}
            {status === "error" && "oh oh da ist etwas schief gelaufen"}
            {status === "success" && "neues Rezept erstellt!"}
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export const RecipeEditForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const title = decodeURIComponent(id);
  const { status, updateCache } = useRecipeByTitle(title);

  if (status === "" || status === "pending" || status === "error") {
    return <Skeleton height="12rem" />;
  }

  return (
    <RecipeForm
      onComplete={recipe => {
        updateCache(recipe);
        navigate(`/recipes/${recipe.title}`);
      }}
      recipe={status}
    />
  );
};

export const RecipeDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const title = decodeURIComponent(id);
  const { status } = useRecipeByTitle(title);

  if (status === "" || status === "pending") {
    return <Skeleton height="12rem" />;
  }

  if (status === "error") {
    return <Box>rezpete konnten nicht geladen werden</Box>;
  }

  return (
    <Box mt={3}>
      <Card>
        <CardHeader title={status.title} subheader={status.tags}></CardHeader>
        <CardContent>
          {status.ingredients.map(ingredient => (
            <Typography key={ingredient}>{ingredient}</Typography>
          ))}
          <Typography style={{ whiteSpace: "pre-wrap" }}>
            {status.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={async () => {
              await addListItems(status.ingredients);
              navigate("/list");
            }}
          >
            {status.title} zur Einkaufsliste hinzufügen
          </Button>
        </CardActions>
      </Card>
      <BottomRightFab
        onClick={() => navigate("edit")}
        label="Rezept bearbeiten"
        children={<Edit />}
      />
    </Box>
  );
};

export const ListLoader: React.FC = () => {
  return (
    <>
      <Skeleton height="4rem" />
      <Skeleton height="4rem" />
    </>
  );
};

export const RecipeList = () => {
  const { recipes, status, fetchRecipes, hasMore } = useRecipes();
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <List>
        {recipes.map(recipe => (
          <ListItem
            onClick={() => navigate(`${recipe.title}`)}
            key={recipe.title}
          >
            <ListItemText primary={recipe.title} secondary={recipe.tags} />
          </ListItem>
        ))}
      </List>
      {hasMore && <Button onClick={fetchRecipes}>Load more</Button>}

      {status === "error" && (
        <Box>
          rezpete konnten nicht geladen werden{" "}
          <Button onClick={fetchRecipes}>nochmal versuchen</Button>
        </Box>
      )}
      <BottomRightFab
        onClick={() => navigate("add")}
        label="Rezept hinzufügen"
        children={<Add />}
      />
    </>
  );
};
