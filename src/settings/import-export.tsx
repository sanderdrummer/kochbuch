import React from "react";

import { Button, Snackbar } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import {
  updateRecipe,
  Recipe,
  useRecipeDispatch,
  useRecipeState,
} from "../recipe/recipe-resource";
const throttledUpdate = (dispatch: any, recipes: Recipe[]) => {
  recipes.forEach((recipe, index) => {
    setTimeout(async () => {
      try {
        updateRecipe(dispatch, recipe);
      } catch (e) {
        console.log(recipe, e);
      }
    }, 1500 * index);
  });
};
export const ImportRecipes = () => {
  const [recipes, setRecipes] = React.useState<Recipe[] | null>(null);
  const [status, setStatus] = React.useState<"pending" | "error" | "success">();
  const dispatch = useRecipeDispatch();
  const handleImportRecipes = (event: any) => {
    const onReaderLoad = (event: any) => {
      const recipes = JSON.parse(event.target.result);
      setRecipes(recipes);
    };

    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  return (
    <>
      <input type="file" onChange={handleImportRecipes} />
      <Button
        onClick={async () => {
          setStatus("pending");
          try {
            throttledUpdate(dispatch, recipes || []);
            setStatus("success");
          } catch {
            setStatus("error");
          }
        }}
        disabled={recipes === null || status === "pending"}
      >
        importieren
      </Button>
      <Snackbar
        autoHideDuration={4000}
        open={status === "error"}
        onClose={() => setStatus(undefined)}
        message="Oh nein der import hat leider nicht geklappt"
      ></Snackbar>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={status === "success"}
        onClose={() => setStatus(undefined)}
        message={`Import erfolgreich ${
          recipes?.length || 0
        } Rezepte hinzugefügt oder
        aktualisiert`}
      ></Snackbar>
    </>
  );
};

export const ExportRecipes = () => {
  const [href, updateHref] = React.useState("");
  const { recipes } = useRecipeState();

  React.useEffect(() => {
    if (recipes) {
      const data =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(Object.values(recipes)));
      updateHref(data);
    }
  }, [recipes]);

  if (!href) {
    return <Skeleton></Skeleton>;
  }

  return (
    <Button download="recipes" href={href}>
      exportieren
    </Button>
  );
};
