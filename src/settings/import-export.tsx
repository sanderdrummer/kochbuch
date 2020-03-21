import React from "react";

import { Button, Snackbar } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { getRecipesForExport, bulkAddRecipes, Recipe } from "../db";

export const ImportRecipes = () => {
  const [recipes, setRecipes] = React.useState<Recipe[] | null>(null);
  const [status, setStatus] = React.useState<"pending" | "error" | "success">();
  const handleImportRecipes = (event: any) => {
    const onReaderLoad = (event: any) => {
      console.log(event.target.result);
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
            await bulkAddRecipes(recipes || []);
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
        message={`Import erfolgreich ${recipes?.length ||
          0} Rezepte hinzugefügt oder
        aktualisiert`}
      ></Snackbar>
    </>
  );
};

export const ExportRecipes = () => {
  const [href, updateHref] = React.useState("");

  const getData = async () => {
    const recipes = await getRecipesForExport();
    const data =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(recipes));
    updateHref(data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  if (!href) {
    return <Skeleton></Skeleton>;
  }

  return (
    <Button download="recipes.json" href={href}>
      exportieren
    </Button>
  );
};
