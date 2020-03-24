import React from "react";

// @ts-ignore
import { useParams, useHistory } from "react-router-dom";
import { Delete } from "@material-ui/icons";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Form, Field } from "react-final-form";

import { BottomRightFab, OcrButton } from "../common";
import { Recipe, addRecipe, updateRecipe, deleteRecipe } from "../db";
import { useRecipeByTitle } from "./recipe-hooks";
import { getRecipeDetailPath } from ".";

import { RECIPES_PATH } from "../routes-config";

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
