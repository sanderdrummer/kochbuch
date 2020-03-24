import React from "react";

import { useParams, useHistory } from "react-router-dom";
import { Edit, MenuBook } from "@material-ui/icons";
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Button
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { BottomRightFab } from "../common";
import { addListItems } from "../db";
import { useRecipeByTitle } from "./recipe-hooks";
import { getRecipeDetailEditPath } from ".";

import { LIST_PATH } from "../routes-config";

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
        <CardHeader
          title={status.title}
          subheader={status.tags}
          action={
            <Button
              startIcon={<MenuBook />}
              onClick={async () => {
                await addListItems(status.ingredients);
                navigate.push(LIST_PATH);
              }}
            >
              zur Einkaufsliste
            </Button>
          }
        ></CardHeader>
      </Card>
      <BottomRightFab
        onClick={() => navigate.push(getRecipeDetailEditPath(status.title))}
        label="Rezept bearbeiten"
        children={<Edit />}
      />
      <Box mt={3}>
        <Card>
          <CardHeader subheader="Zutaten"></CardHeader>
          <CardContent>
            <Typography style={{ whiteSpace: "pre-wrap" }}>
              {status.ingredients}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt={3}>
        <Card>
          <CardHeader subheader="Zubereitung"></CardHeader>
          <CardContent>
            <Typography style={{ whiteSpace: "pre-wrap" }}>
              {status.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
