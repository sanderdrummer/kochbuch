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
  Button,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Form, Field } from "react-final-form";

import { BottomRightFab, Toast } from "../common";
import { getRecipeDetailPath } from ".";

import { RECIPES_PATH } from "../routes-config";
import {
  Recipe,
  updateRecipe,
  useRecipeDispatch,
  deleteRecipe,
  useRecipeByTitle,
} from "./recipe-resource";

const validateRequired = (value: string) => (value ? undefined : "required");

export const RecipeForm: React.FC<{
  onComplete: (recipe: Recipe) => void;
  recipe?: Recipe;
}> = ({ onComplete, recipe }) => {
  const dispatch = useRecipeDispatch();
  const [state, setState] = React.useState<"" | "loading" | "error">("");
  return (
    <Card>
      <CardHeader title="Neues Rezept" />
      <CardContent>
        <Form<Recipe>
          initialValues={recipe}
          onSubmit={async (recipe) => {
            setState("loading");
            try {
              await updateRecipe(dispatch, recipe);
              setState("");
              return recipe;
            } catch {
              setState("error");
            }
            return undefined;
          }}
        >
          {({ handleSubmit, submitting, invalid, form }) => (
            <form
              autoComplete="off"
              onSubmit={async (e) => {
                const recipe = await handleSubmit(e);
                if (recipe) {
                  form.reset();
                  onComplete(recipe as Recipe);
                }
              }}
            >
              <Field name="title" validate={validateRequired}>
                {(props) => (
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
                {(props) => (
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
                {(props) => (
                  <Box mt={2}>
                    <TextField
                      margin="normal"
                      multiline
                      fullWidth
                      error={props.meta.touched && props.meta.error}
                      label="Zutaten"
                      {...props.input}
                    />
                  </Box>
                )}
              </Field>

              <Field name="description" validate={validateRequired}>
                {(props) => (
                  <Box mt={2}>
                    <TextField
                      margin="normal"
                      multiline
                      fullWidth
                      error={props.meta.touched && props.meta.error}
                      label="Zubereitung"
                      {...props.input}
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
      <Toast
        open={state === "error"}
        severity="error"
        onClose={() => setState("")}
      >
        Das hat leider nicht geklappt
      </Toast>
    </Card>
  );
};

export const RecipeEditForm: React.FC = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const title = decodeURIComponent(id || "");
  const recipe = useRecipeByTitle(title);
  const dispatch = useRecipeDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  if (!recipe) {
    return <Skeleton height="12rem" />;
  }

  return (
    <>
      <RecipeForm
        onComplete={(recipe) => {
          updateRecipe(dispatch, recipe);

          navigate.push(getRecipeDetailPath(recipe.title));
        }}
        recipe={recipe}
      />

      <BottomRightFab
        label="Rezept löschen"
        isLoading={isLoading}
        onClick={async () => {
          setHasError(false);
          setIsLoading(true);
          try {
            await deleteRecipe(recipe);
            dispatch({ type: "REMOVE_RECIPE", recipe });
            navigate.push(RECIPES_PATH);
          } catch (e) {
            console.log(e);
            setHasError(true);
          }
          setIsLoading(false);
        }}
      >
        <Delete />
      </BottomRightFab>
      <Toast
        severity="error"
        open={hasError}
        onClose={() => setHasError(false)}
      >
        Das hat leider nicht geklappt
      </Toast>
    </>
  );
};
