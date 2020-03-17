import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// @ts-ignore
import { useParams } from "react-router";

import { getRecipes, Recipe, addRecipe } from "../db";
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent,
  TextField,
  Button
} from "@material-ui/core";

const useRecipes = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [error, setError] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);
  const fetchRecipes = async () => {
    try {
      setIsPending(true);
      setError("");

      const recipes = await getRecipes();
      setRecipes(recipes);
      setIsPending(false);
    } catch {
      setIsPending(false);
      setError("failed to fetch recipes");
    }
  };
  React.useEffect(() => {
    fetchRecipes();
  }, []);

  return {
    recipes,
    error,
    isPending,
    fetchRecipes
  };
};

export const RecipeForm: React.FC<{
  onComplete: () => void;
}> = ({ onComplete }) => {
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
            const recipe: Recipe = {
              title: form.titleName.value,
              tags: form.tags.value.split(" "),
              ingredients: form.ingredients.value.split("\n"),
              description: form.description.value
            };
            try {
              setStatus("pending");

              await addRecipe(recipe);

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
            required
            label="Rezept Titel"
            name="titleName"
          />
          <TextField
            margin="normal"
            fullWidth
            required
            label="Tags"
            name="tags"
          />
          <TextField
            margin="normal"
            multiline
            fullWidth
            required
            label="Zutaten"
            name="ingredients"
          />
          <TextField
            margin="normal"
            multiline
            fullWidth
            required
            label="Zubereitung"
            name="description"
          />
          <Box mt={2}>
            <Button
              disabled={status === "pending"}
              color="primary"
              type="submit"
            >
              neues Rezept speichern
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

export const RecipeDetails: React.FC = () => {
  const { id } = useParams();
  let recipe: Recipe | undefined = undefined;

  if (!recipe) {
    return null;
  }

  return null;
  // <Card>
  //   <CardHeader
  //     title={recipe.title}
  //     subheader={recipe.tags.join(" | ")}
  //   ></CardHeader>
  //   <CardContent>
  //     {recipe.ingredients.map(ingredient => (
  //       <Typography key={ingredient}>{ingredient}</Typography>
  //     ))}
  //     <Typography style={{ whiteSpace: "pre-wrap" }}>
  //       {recipe.description}
  //     </Typography>
  //   </CardContent>
  // </Card>
  // );
};

export const RecipeList = () => {
  const { recipes, error, isPending, fetchRecipes } = useRecipes();
  const [selected, setSelected] = React.useState<Recipe>();

  const handleClearSelection = () => {
    setSelected(undefined);
  };

  React.useEffect(() => {
    window.addEventListener("popstate", handleClearSelection);
    return () => {
      window.removeEventListener("popstate", handleClearSelection);
    };
  }, []);

  if (error) {
    return <Box>{error}</Box>;
  }

  return (
    <>
      <RecipeForm onComplete={fetchRecipes} />
      <List>
        {recipes.map(recipe => (
          <ListItem onClick={() => {}} key={recipe.id}>
            <ListItemText
              primary={recipe.title}
              secondary={recipe.tags.join(" | ")}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
