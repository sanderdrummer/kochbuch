import React from "react";

// @ts-ignore
import { useParams, useHistory } from "react-router-dom";
import { Add, Edit, Delete } from "@material-ui/icons";
import {
  Box,
  Card,
  CardHeader,
  Divider,
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
import { Form, Field } from "react-final-form";

import { BottomRightFab, OcrButton } from "../common";
import {
  Recipe,
  addRecipe,
  updateRecipe,
  addListItems,
  deleteRecipe
} from "../db";
import { useRecipeByTitle, useRecipes } from "./recipe-hooks";
import {
  getRecipeDetailPath,
  getRecipeDetailEditPath,
  ADD_RECIPE_PATH
} from ".";

import { RECIPES_PATH, LIST_PATH } from "../routes-config";

const validateRequired = (value: string) => (value ? undefined : "required");

const addUpdateRecipe = async (recipe: Recipe, isUpdate: boolean) => {
  if (isUpdate) {
    await updateRecipe(recipe);
  } else {
    await addRecipe(recipe);
  }

  return recipe;
};

export const RecipeForm: React.FC<{
  onComplete: (recipe: Recipe) => void;
  recipe?: Recipe;
}> = ({ onComplete, recipe }) => {
  return (
    <Card>
      <CardHeader title="Neues Rezept" />
      <CardContent>
        <Form<Recipe>
          initialValues={recipe}
          onSubmit={value => addUpdateRecipe(value, Boolean(recipe))}
        >
          {({ handleSubmit, submitting, invalid, form }) => (
            <form
              autoComplete="off"
              onSubmit={async e => {
                const recipe = await handleSubmit(e);
                if (recipe) {
                  form.reset();
                  onComplete(recipe as Recipe);
                }
              }}
            >
              <Field name="title" validate={validateRequired}>
                {props => (
                  <TextField
                    margin="normal"
                    fullWidth
                    error={props.meta.touched && props.meta.error}
                    label="Rezept Titel"
                    {...props.input}
                  />
                )}
              </Field>
              <Field name="tags">
                {props => (
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Tags"
                    name="tags"
                    {...props.input}
                  />
                )}
              </Field>

              <Field name="ingredients" validate={validateRequired}>
                {props => (
                  <Box mt={2}>
                    <TextField
                      margin="normal"
                      multiline
                      fullWidth
                      error={props.meta.touched && props.meta.error}
                      label="Zutaten"
                      {...props.input}
                    />
                    <OcrButton
                      onComplete={text => {
                        props.input.onChange(text);
                      }}
                    />
                  </Box>
                )}
              </Field>

              <Field name="description" validate={validateRequired}>
                {props => (
                  <Box mt={2}>
                    <TextField
                      margin="normal"
                      multiline
                      fullWidth
                      label="Zubereitung"
                      {...props.input}
                    />
                    <OcrButton
                      onComplete={text => {
                        props.input.onChange(text);
                      }}
                    />
                  </Box>
                )}
              </Field>

              <Box mt={2}>
                <Button
                  disabled={invalid || submitting}
                  color="primary"
                  type="submit"
                >
                  {recipe
                    ? `änderung an ${recipe.title} speichern`
                    : "neues Rezept speichern"}
                </Button>
              </Box>
            </form>
          )}
        </Form>
      </CardContent>
    </Card>
  );
};

export const RecipeEditForm: React.FC = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const title = decodeURIComponent(id || "");
  const { status, updateCache } = useRecipeByTitle(title);

  if (status === "" || status === "pending" || status === "error") {
    return <Skeleton height="12rem" />;
  }

  return (
    <>
      <RecipeForm
        onComplete={recipe => {
          updateCache(recipe);
          navigate.push(getRecipeDetailPath(recipe.title));
        }}
        recipe={status}
      />

      <BottomRightFab
        label="Rezept löschen"
        onClick={async () => {
          try {
            await deleteRecipe(status.title);
            navigate.push(RECIPES_PATH);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <Delete />
      </BottomRightFab>
    </>
  );
};

export const RecipeDetails: React.FC = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const title = decodeURIComponent(id || "");
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
          <Typography gutterBottom variant="h6" component="span">
            Zutaten:
          </Typography>
          <Typography style={{ whiteSpace: "pre-wrap" }}>
            {status.ingredients}
          </Typography>
          <Box mt={4} mb={4}>
            <Divider />
          </Box>
          <Typography style={{ whiteSpace: "pre-wrap" }}>
            {status.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={async () => {
              await addListItems(status.ingredients);
              navigate.push(LIST_PATH);
            }}
          >
            {status.title} zur Einkaufsliste hinzufügen
          </Button>
        </CardActions>
      </Card>
      <BottomRightFab
        onClick={() => navigate.push(getRecipeDetailEditPath(status.title))}
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
  const navigate = useHistory();

  React.useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <List>
        {recipes.map(recipe => (
          <ListItem
            onClick={() => navigate.push(getRecipeDetailPath(recipe.title))}
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
        onClick={() => navigate.push(ADD_RECIPE_PATH)}
        label="Rezept hinzufügen"
        children={<Add />}
      />
    </>
  );
};
