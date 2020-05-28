import React from "react";

import { useParams, useHistory } from "react-router-dom";
import { Edit, MenuBook } from "@material-ui/icons";
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Button,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { BottomRightFab } from "../common";
import { getRecipeDetailEditPath } from ".";

import { LIST_PATH } from "../routes-config";
import { useRecipeByTitle } from "./recipe-resource";
import { addListItems } from "../list/list-hooks";

export const RecipeDetails: React.FC = () => {
  const navigate = useHistory();
  const { id } = useParams();
  const title = decodeURIComponent(id || "");
  const recipe = useRecipeByTitle(title);

  if (!recipe) {
    return <Skeleton height="12rem" />;
  }

  return (
    <Box mt={3}>
      <Card>
        <CardHeader
          title={recipe.title}
          subheader={recipe.tags}
          action={
            <Button
              startIcon={<MenuBook />}
              onClick={async () => {
                addListItems(recipe.ingredients);
                navigate.push(LIST_PATH);
              }}
            >
              zur Einkaufsliste
            </Button>
          }
        ></CardHeader>
      </Card>
      <BottomRightFab
        onClick={() => navigate.push(getRecipeDetailEditPath(recipe.title))}
        label="Rezept bearbeiten"
        children={<Edit />}
      />
      <Box mt={3}>
        <Card>
          <CardHeader subheader="Zutaten"></CardHeader>
          <CardContent>
            <Typography style={{ whiteSpace: "pre-wrap" }}>
              {recipe.ingredients}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt={3}>
        <Card>
          <CardHeader subheader="Zubereitung"></CardHeader>
          <CardContent>
            <Typography style={{ whiteSpace: "pre-wrap" }}>
              {recipe.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
